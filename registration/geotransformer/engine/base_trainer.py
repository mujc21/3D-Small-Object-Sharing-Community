import sys
import argparse
import os.path as osp
import time
import json
import abc
from collections import OrderedDict

import torch
import torch.nn as nn
import torch.distributed as dist
from torch.utils.tensorboard import SummaryWriter
import ipdb

from geotransformer.utils.summary_board import SummaryBoard
from geotransformer.utils.timer import Timer
from geotransformer.utils.torch import all_reduce_tensors, release_cuda, initialize
from geotransformer.engine.logger import Logger


def inject_default_parser(parser=None):
    if parser is None:
        parser = argparse.ArgumentParser()
    parser.add_argument('--resume', action='store_true', help='resume training')  # store_true就是默认是false
    # add
    parser.add_argument('--snapshot', default=None, help='load from snapshot')
    parser.add_argument('--epoch', type=int, default=None, help='load epoch')
    parser.add_argument('--log_steps', type=int, default=10, help='logging steps')
    # 分布式训练详解：dp是DataParallel数据并行，单机多卡，一个进程多线程
    # DDP是distributedDP，支持单机多卡、多机多卡，一般是每张卡一个GPU模型（一个进程）
    # world-size是全局进程数，rank是当前进程的进程号，local-rank是每台机器的进程的序号一般就是local-rank=rank
    parser.add_argument('--local_rank', type=int, default=-1, help='local rank for ddp')
    return parser


class BaseTrainer(abc.ABC):
    # step into 0.1 :最终基类，是一个抽象类
    def __init__(
        self,
        cfg,
        parser=None,
        cudnn_deterministic=True,
        autograd_anomaly_detection=False,
        save_all_snapshots=True,
        run_grad_check=False,
        grad_acc_steps=1,
    ):
        # parser

        parser = inject_default_parser(parser)
        self.args = parser.parse_args()

        # logger
        log_file = osp.join(cfg.log_dir, 'train-{}.log'.format(time.strftime('%Y%m%d-%H%M%S')))
        # 在终端上打字的
        self.logger = Logger(log_file=log_file, local_rank=self.args.local_rank)

        # command executed
        message = 'Command executed: ' + ' '.join(sys.argv)
        self.logger.info(message)

        # print config
        message = 'Configs:\n' + json.dumps(cfg, indent=4)  # 参数缩进4方便阅读
        self.logger.info(message)

        # tensorboard
        self.writer = SummaryWriter(log_dir=cfg.event_dir)
        self.logger.info(f'Tensorboard is enabled. Write events to {cfg.event_dir}.')

        # cuda and distributed
        if not torch.cuda.is_available():
            raise RuntimeError('No CUDA devices available.')
        # 在torch的分布式训练中习惯默认一个rank对应着一个GPU，因此local_rank可以当作GPU号
        self.distributed = self.args.local_rank != -1  # local_rank不是-1他就是true
        if self.distributed:  # 分布式训练
            torch.cuda.set_device(self.args.local_rank)
            dist.init_process_group(backend='nccl')
            self.world_size = dist.get_world_size()
            self.local_rank = self.args.local_rank
            self.logger.info(f'Using DistributedDataParallel mode (world_size: {self.world_size})')  # 全局进程总数
        else:  # 单卡训练
            if torch.cuda.device_count() > 1:  # 可用GPU数量
                self.logger.warning('DataParallel is deprecated. Use DistributedDataParallel instead.')
            self.world_size = 1
            self.local_rank = 0
            self.logger.info('Using Single-GPU mode.')
        # 这是什么？？？
        self.cudnn_deterministic = cudnn_deterministic
        self.autograd_anomaly_detection = autograd_anomaly_detection
        self.seed = cfg.seed + self.local_rank
        initialize(  # 设置随机数种子方便复现以及设置是否使用cudnn算法（花费一些时间寻找最优卷积），是否开启异常检测
            seed=self.seed,
            cudnn_deterministic=self.cudnn_deterministic,
            autograd_anomaly_detection=self.autograd_anomaly_detection,
        )

        # basic config
        self.snapshot_dir = cfg.snapshot_dir

        # add
        self.benchmark_dir = cfg.benchmark_dir
        self.val_loss = []
        self.val_rre = []
        self.val_rte = []
        self.val_rr = []
        self.train_loss = []
        self.train_rre = []
        self.train_rte = []
        self.train_rr = []

        self.log_steps = self.args.log_steps
        self.run_grad_check = run_grad_check
        self.save_all_snapshots = save_all_snapshots

        # state
        self.model = None
        self.optimizer = None
        self.scheduler = None
        self.epoch = 0
        self.iteration = 0
        self.inner_iteration = 0

        self.train_loader = None
        self.val_loader = None
        # step into 0.1.1 ：summary_board
        self.summary_board = SummaryBoard(last_n=self.log_steps, adaptive=True)
        # step into 0.1.2 ：timer
        self.timer = Timer()
        self.saved_states = {}

        # training config
        self.training = True
        self.grad_acc_steps = grad_acc_steps
    # run into 1.2 : snapshot？？？好像是保留了各步训练的模型信息
    def save_snapshot(self, filename):
        if self.local_rank != 0:
            return

        model_state_dict = self.model.state_dict()
        # Remove '.module' prefix in DistributedDataParallel mode.
        if self.distributed:
            model_state_dict = OrderedDict([(key[7:], value) for key, value in model_state_dict.items()])

        # save model
        filename = osp.join(self.snapshot_dir, filename)
        state_dict = {
            'epoch': self.epoch,
            'iteration': self.iteration,
            'model': model_state_dict,
        }
        torch.save(state_dict, filename)
        self.logger.info('Model saved to "{}"'.format(filename))

        # save snapshot
        snapshot_filename = osp.join(self.snapshot_dir, 'snapshot.pth.tar')
        state_dict['optimizer'] = self.optimizer.state_dict()
        if self.scheduler is not None:
            state_dict['scheduler'] = self.scheduler.state_dict()
        torch.save(state_dict, snapshot_filename)
        self.logger.info('Snapshot saved to "{}"'.format(snapshot_filename))

    # 这个还没有看，初步迭代没有进入此函数
    def load_snapshot(self, snapshot, fix_prefix=True):
        self.logger.info('Loading from "{}".'.format(snapshot))
        state_dict = torch.load(snapshot, map_location=torch.device('cpu'))

        # Load model
        model_dict = state_dict['model']
        if fix_prefix and self.distributed:
            model_dict = OrderedDict([('module.' + key, value) for key, value in model_dict.items()])
        self.model.load_state_dict(model_dict, strict=False)

        # log missing keys and unexpected keys
        snapshot_keys = set(model_dict.keys())
        # model_keys = set(self.model.model_dict().keys())
        model_keys = set(self.model.state_dict().keys())
        missing_keys = model_keys - snapshot_keys
        unexpected_keys = snapshot_keys - model_keys
        if self.distributed:
            missing_keys = set([missing_key[7:] for missing_key in missing_keys])
            unexpected_keys = set([unexpected_key[7:] for unexpected_key in unexpected_keys])
        if len(missing_keys) > 0:
            message = f'Missing keys: {missing_keys}'
            self.logger.warning(message)
        if len(unexpected_keys) > 0:
            message = f'Unexpected keys: {unexpected_keys}'
            self.logger.warning(message)
        self.logger.info('Model has been loaded.')

        # Load other attributes
        if 'epoch' in state_dict:
            self.epoch = state_dict['epoch']
            self.logger.info('Epoch has been loaded: {}.'.format(self.epoch))
        if 'iteration' in state_dict:
            self.iteration = state_dict['iteration']
            self.logger.info('Iteration has been loaded: {}.'.format(self.iteration))
        if 'optimizer' in state_dict and self.optimizer is not None:
            self.optimizer.load_state_dict(state_dict['optimizer'])
            self.logger.info('Optimizer has been loaded.')
        if 'scheduler' in state_dict and self.scheduler is not None:
            self.scheduler.load_state_dict(state_dict['scheduler'])
            self.logger.info('Scheduler has been loaded.')
    # step into 3 ：处理模型
    def register_model(self, model):
        r"""Register model. DDP is automatically used."""
        if self.distributed:  # 这个值默认是-1，除非特意更改
            local_rank = self.local_rank
            model = nn.parallel.DistributedDataParallel(model, device_ids=[local_rank], output_device=local_rank)
        self.model = model
        message = 'Model description:\n' + str(model)
        self.logger.info(message)
        return model

    # step into 4：注册优化器？？？
    def register_optimizer(self, optimizer):
        r"""Register optimizer. DDP is automatically used."""
        if self.distributed:
            for param_group in optimizer.param_groups:
                param_group['lr'] = param_group['lr'] * self.world_size
        self.optimizer = optimizer

    def register_scheduler(self, scheduler):
        r"""Register LR scheduler."""
        self.scheduler = scheduler

    def register_loader(self, train_loader, val_loader):
        r"""Register data loader."""
        self.train_loader = train_loader
        self.val_loader = val_loader

    def get_lr(self):
        return self.optimizer.param_groups[0]['lr']

    def optimizer_step(self, iteration):
        if iteration % self.grad_acc_steps == 0:
            self.optimizer.step()
            self.optimizer.zero_grad()

    def save_state(self, key, value):
        self.saved_states[key] = release_cuda(value)

    def read_state(self, key):
        return self.saved_states[key]

    def check_invalid_gradients(self):
        for param in self.model.parameters():
            if torch.isnan(param.grad).any():
                self.logger.error('NaN in gradients.')
                return False
            if torch.isinf(param.grad).any():
                self.logger.error('Inf in gradients.')
                return False
        return True

    def release_tensors(self, result_dict):
        r"""All reduce and release tensors."""
        if self.distributed:
            result_dict = all_reduce_tensors(result_dict, world_size=self.world_size)
        result_dict = release_cuda(result_dict)  # 转换成numpy格式
        return result_dict

    def set_train_mode(self):
        self.training = True
        # 启用 Batch Normalization 和 Dropout等
        self.model.train()
        torch.set_grad_enabled(True)

    def set_eval_mode(self):
        self.training = False
        # 不启用 Batch Normalization 和 Dropout等
        self.model.eval()
        torch.set_grad_enabled(False)

    def write_event(self, phase, event_dict, index):
        r"""Write TensorBoard event."""
        if self.local_rank != 0:
            return
        for key, value in event_dict.items():
            self.writer.add_scalar(f'{phase}/{key}', value, index)

    @abc.abstractmethod
    def run(self):
        raise NotImplemented