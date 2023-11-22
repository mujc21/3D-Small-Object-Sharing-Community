import os
import os.path as osp
from typing import Tuple, Dict

import ipdb
import torch
import tqdm

from geotransformer.engine.base_trainer import BaseTrainer
from geotransformer.utils.torch import to_cuda
from geotransformer.utils.summary_board import SummaryBoard
from geotransformer.utils.timer import Timer
from geotransformer.utils.common import get_log_string
import numpy as np

# TODO: point threshold
th_pointN = 800  # 500  # old: 600
# th_pointN = 600

class EpochBasedTrainer(BaseTrainer):
    # step into 0：父类初始化
    def __init__(
        self,
        cfg,
        max_epoch,
        parser=None,
        cudnn_deterministic=True,
        autograd_anomaly_detection=False,
        save_all_snapshots=True,
        run_grad_check=False,
        grad_acc_steps=1,
    ):
        # step into 0.1 父类初始化
        super().__init__(
            cfg,
            parser=parser,
            cudnn_deterministic=cudnn_deterministic,
            autograd_anomaly_detection=autograd_anomaly_detection,
            save_all_snapshots=save_all_snapshots,
            run_grad_check=run_grad_check,
            grad_acc_steps=grad_acc_steps,
        )
        self.max_epoch = max_epoch

    def before_train_step(self, epoch, iteration, data_dict) -> None:
        pass

    def before_val_step(self, epoch, iteration, data_dict) -> None:
        pass

    def after_train_step(self, epoch, iteration, data_dict, output_dict, result_dict) -> None:
        pass

    def after_val_step(self, epoch, iteration, data_dict, output_dict, result_dict) -> None:
        pass

    def before_train_epoch(self, epoch) -> None:
        pass

    def before_val_epoch(self, epoch) -> None:
        pass

    def after_train_epoch(self, epoch) -> None:
        pass

    def after_val_epoch(self, epoch) -> None:
        pass

    def train_step(self, epoch, iteration, data_dict) -> Tuple[Dict, Dict]:
        pass

    def val_step(self, epoch, iteration, data_dict) -> Tuple[Dict, Dict]:
        pass

    def after_backward(self, epoch, iteration, data_dict, output_dict, result_dict) -> None:
        pass

    def check_gradients(self, epoch, iteration, data_dict, output_dict, result_dict):
        if not self.run_grad_check:
            return
        if not self.check_invalid_gradients():
            self.logger.error('Epoch: {}, iter: {}, invalid gradients.'.format(epoch, iteration))
            torch.save(data_dict, 'data.pth')
            torch.save(self.model, 'model.pth')
            self.logger.error('Data_dict and model snapshot saved.')
            ipdb.set_trace()

    def train_epoch_empty(self):
        for iteration, data_dict in enumerate(self.train_loader):
            # data_dict = to_cuda(data_dict)

            torch.cuda.empty_cache()
            print(iteration, '::', data_dict['points'][0].shape)

    def filter_dataset(self):
        for iteration, data_dict in enumerate(self.train_loader):
            # data_dict = to_cuda(data_dict)

            torch.cuda.empty_cache()
            print(iteration, '::', data_dict['points'][0].shape)

    # add
    def find_max_rmse(self):
        skipped = 0
        for iteration, data_dict in enumerate(self.train_loader):
            # if iteration<4000:
            #     print('''skipped {} : {}'''.format(skipped, data_dict['_index']))
            #     skipped = skipped + 1
            #     continue
            if data_dict['lengths'][3][0] > th_pointN or data_dict['lengths'][3][1] > th_pointN:
                print('''skipped {} : {}'''.format(skipped, data_dict['_index']))
                skipped = skipped + 1
                continue
            self.inner_iteration = iteration + 1
            self.iteration += 1
            data_dict = to_cuda(data_dict)
            self.train_step(self.epoch, self.inner_iteration, data_dict)

    # run into 1 :训练一轮
    def train_epoch(self):
        if self.distributed:  # 默认-1
            self.train_loader.sampler.set_epoch(self.epoch)
        # 留一个接口，此处pass
        self.before_train_epoch(self.epoch)
        self.optimizer.zero_grad()  # 梯度清零

        total_iterations = len(self.train_loader)

        # add
        loss_number = []
        loss_iter = []
        rre_number = []
        rre_iter = []
        rte_number = []
        rte_iter = []
        rr_number = []
        rr_iter = []

        skipped = 0
        # TODO: skip large point cloud
        for iteration, data_dict in enumerate(self.train_loader):
            # print(data_dict['_index'], '::')

            if data_dict['lengths'][3][0] > th_pointN or data_dict['lengths'][3][1] > th_pointN:
                print('''skipped {} : {}'''.format(skipped, data_dict['_index']))
                skipped = skipped + 1
                # torch.cuda.empty_cache()
                continue
            self.inner_iteration = iteration + 1
            self.iteration += 1
            data_dict = to_cuda(data_dict)
            self.before_train_step(self.epoch, self.inner_iteration, data_dict)  # 没有重载pass
            self.timer.add_prepare_time()
            # forward
            output_dict, result_dict = self.train_step(self.epoch, self.inner_iteration, data_dict)
            # backward & optimization
            result_dict['loss'].backward()
            self.after_backward(self.epoch, self.inner_iteration, data_dict, output_dict, result_dict)
            self.check_gradients(self.epoch, self.inner_iteration, data_dict, output_dict, result_dict)
            self.optimizer_step(self.inner_iteration)
            # after training
            self.timer.add_process_time()
            self.after_train_step(self.epoch, self.inner_iteration, data_dict, output_dict, result_dict)
            result_dict = self.release_tensors(result_dict)  # 转换成numpy格式
            self.summary_board.update_from_result_dict(result_dict)  # 这个是用来计数的数据结构
            # logging
            if self.inner_iteration % self.log_steps == 0:  # 每一些iter会输出一次

                # add
                loss_iter.append(iteration)
                loss_number.append(result_dict['loss'])
                rre_iter.append(iteration)
                rre_number.append(result_dict['RRE'])
                rte_iter.append(iteration)
                rte_number.append(result_dict['RTE'])
                rr_iter.append(iteration)
                rr_number.append(result_dict['RR'])

                summary_dict = self.summary_board.summary()
                # run into 1.1 : 获取log字符串
                message = get_log_string(
                    result_dict=summary_dict,
                    epoch=self.epoch,
                    max_epoch=self.max_epoch,
                    iteration=self.inner_iteration,
                    max_iteration=total_iterations,
                    lr=self.get_lr(),
                    timer=self.timer,
                )
                self.logger.info(message)
                self.write_event('train', summary_dict, self.iteration)
            # torch.cuda.empty_cache()

        # add
        filename = osp.join(self.benchmark_dir, f'train-{self.epoch}')
        if not osp.exists(filename):
            os.makedirs(filename)
        np.save(osp.join(filename, f'loss_number'), loss_number)
        np.save(osp.join(filename, f'loss_iter'), loss_iter)
        np.save(osp.join(filename, f'rre_number'), rre_number)
        np.save(osp.join(filename, f'rre_iter'), rre_iter)
        np.save(osp.join(filename, f'rte_number'), rte_number)
        np.save(osp.join(filename, f'rte_iter'), rte_iter)
        np.save(osp.join(filename, f'rr_number'), rr_number)
        np.save(osp.join(filename, f'rr_iter'), rr_iter)

        self.after_train_epoch(self.epoch)
        message = get_log_string(self.summary_board.summary(), epoch=self.epoch, timer=self.timer)
        self.logger.critical(message)

        # add
        summary_dict = self.summary_board.summary()
        self.train_loss.append(summary_dict['loss'])
        np.save(osp.join(self.benchmark_dir, f'train_loss'), np.array(self.train_loss))
        self.train_rre.append(summary_dict['RRE'])
        np.save(osp.join(self.benchmark_dir, f'train_rre'), np.array(self.train_rre))
        self.train_rte.append(summary_dict['RTE'])
        np.save(osp.join(self.benchmark_dir, f'train_rte'), np.array(self.train_rte))
        self.train_rr.append(summary_dict['RR'])
        np.save(osp.join(self.benchmark_dir, f'train_rr'), np.array(self.train_rr))

        # scheduler
        if self.scheduler is not None:
            self.scheduler.step()
        # snapshot
        # run into 1.2 : snapshot？？？好像是保留了各步训练的模型信息
        self.save_snapshot(f'epoch-{self.epoch}.pth.tar')
        if not self.save_all_snapshots:
            last_snapshot = f'epoch-{self.epoch - 1}.pth.tar'
            if osp.exists(last_snapshot):
                os.remove(last_snapshot)

    def inference_epoch(self):
        self.set_eval_mode()
        self.before_val_epoch(self.epoch)
        summary_board = SummaryBoard(adaptive=True)
        timer = Timer()

        total_iterations = len(self.val_loader)
        pbar = tqdm.tqdm(enumerate(self.val_loader), total=total_iterations)
        print('validation:', th_pointN)
        for iteration, data_dict in pbar:
            if data_dict['lengths'][3][0] > th_pointN or data_dict['lengths'][3][1] > th_pointN:
                print('''skipped {} : {}'''.format(1, data_dict['_index']))
                # skipped = skipped + 1
                # torch.cuda.empty_cache()
                continue
            self.inner_iteration = iteration + 1
            data_dict = to_cuda(data_dict)
            self.before_val_step(self.epoch, self.inner_iteration, data_dict)
            timer.add_prepare_time()
            output_dict, result_dict = self.val_step(self.epoch, self.inner_iteration, data_dict)
            torch.cuda.synchronize()
            timer.add_process_time()
            self.after_val_step(self.epoch, self.inner_iteration, data_dict, output_dict, result_dict)
            result_dict = self.release_tensors(result_dict)
            summary_board.update_from_result_dict(result_dict)
            message = get_log_string(
                result_dict=summary_board.summary(),
                epoch=self.epoch,
                iteration=self.inner_iteration,
                max_iteration=total_iterations,
                timer=timer,
            )
            pbar.set_description(message)
            torch.cuda.empty_cache()
        self.after_val_epoch(self.epoch)
        summary_dict = summary_board.summary()

        # add
        self.val_loss.append(summary_dict['loss'])
        np.save(osp.join(self.benchmark_dir, f'val_loss'), np.array(self.val_loss))
        self.val_rre.append(summary_dict['RRE'])
        np.save(osp.join(self.benchmark_dir, f'val_rre'), np.array(self.val_rre))
        self.val_rte.append(summary_dict['RTE'])
        np.save(osp.join(self.benchmark_dir, f'val_rte'), np.array(self.val_rte))
        self.val_rr.append(summary_dict['RR'])
        np.save(osp.join(self.benchmark_dir, f'val_rr'), np.array(self.val_rr))

        message = '[Val] ' + get_log_string(summary_dict, epoch=self.epoch, timer=timer)
        self.logger.critical(message)
        self.write_event('val', summary_dict, self.epoch)
        self.set_train_mode()




    # 核心函数，开始训练
    def run(self):
        assert self.train_loader is not None
        assert self.val_loader is not None

        if self.args.resume:  # 默认是false，“恢复训练”
            self.load_snapshot(osp.join(self.snapshot_dir, 'snapshot.pth.tar'))
        elif self.args.snapshot is not None:  # 默认是None
            self.load_snapshot(self.args.snapshot)
        self.set_train_mode()  # 这里开启训练模式，并且下文默认求导


        while self.epoch < self.max_epoch:
            self.epoch += 1
            # run into 1 :训练一轮
            # add
            # self.find_max_rmse()
            self.train_epoch()
            # self.train_epoch_empty()
            self.inference_epoch()