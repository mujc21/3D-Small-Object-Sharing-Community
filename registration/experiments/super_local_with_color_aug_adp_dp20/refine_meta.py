import copy
import os.path
import random


def load_meta(meta_path='/home/lirenjie/GeoTransformer/mydata/raw/meta.txt', sampleN=-1):

    # meta_path = './data/sampled/meta.txt'

    # sampleN = 40
    eps = 0.1
    with open(meta_path, 'r') as fin:
        meta = fin.readlines()
        meta = meta[:sampleN]
        meta = map(lambda x: x.split(','), meta)
        # meta = [(x[0], x[2], x[3], x[4]) for x in meta]
    print(meta)
    # meta = meta[:sampleN]
    # meta_path = meta_path[:1000]
    return meta


def main():
    meta_folder = '/home/lirenjie/GeoTransformer/mydata/raw'
    meta_filename = 'meta.txt'
    meta_path = os.path.join(meta_folder, meta_filename)
    meta = load_meta(meta_path)
    new_meta = []
    for meta_frame in meta:
        # print(len(meta_frame))

        new_meta.append((
            meta_frame[0],
            meta_frame[2],
            meta_frame[3],
            meta_frame[4],
            '''{:07d}_0_dp.npy'''.format(int(meta_frame[0])),
            '''{:07d}_1_dp.npy'''.format(int(meta_frame[0])),
            meta_frame[1],
            meta_frame[5],
            meta_frame[6]
        ))
        # pass
    with open(os.path.join(meta_folder, 'dp_meta.txt'), 'w') as fout:
        for meta_frame in new_meta:
            fout.write('''{}\n'''.format(','.join(meta_frame).strip()))

def write_meta(path, meta):
    with open(path, 'w') as fout:
        for meta_frame in meta:
            fout.write('''{}\n'''.format(','.join(meta_frame).strip()))

def load_dp_meta(meta_path='/home/lirenjie/GeoTransformer/mydata/raw/dp_meta.txt', sampleN = -1):

    # meta_path = './data/sampled/meta.txt'

    # sampleN = 1000
    # sampleN = 40
    eps = 0.1
    with open(meta_path, 'r') as fin:
        meta = fin.readlines()
        meta = meta[:sampleN]
        meta = list(map(lambda x: tuple(y.strip() for y in x.split(',')), meta))

        # meta = [(x[0], x[2], x[3], x[4]) for x in meta]
    print(meta)
    meta = meta[:sampleN]
    return meta

def split_data():
    meta_folder = '/home/lirenjie/data/3DMatchNPY/raw'
    meta_filename = 'dp_meta.txt'
    meta_path = os.path.join(meta_folder, meta_filename)
    meta = load_dp_meta(meta_path, sampleN=7300)
    meta = list(meta)
    meta_train = []
    meta_val = []
    meta_test = []

    N = len(meta)
    indexes = list(range(N))
    random.shuffle(indexes)
    n1 = int(N * 0.7)
    n2 = int(N * 0.8)

    id_train = copy.deepcopy(indexes[:n1])
    id_val = copy.deepcopy(indexes[n1: n2])
    id_test = copy.deepcopy(indexes[n2:])

    id_train.sort()
    id_val.sort()
    id_test.sort()

    for k in id_train:
        meta_train.append(meta[k])
    for k in id_val:
        meta_val.append(meta[k])
    for k in id_test:
        meta_test.append(meta[k])

    write_meta(os.path.join(meta_folder, 'meta_train.txt'), meta_train)
    write_meta(os.path.join(meta_folder, 'meta_val.txt'), meta_val)
    write_meta(os.path.join(meta_folder, 'meta_test.txt'), meta_test)


    pass

if __name__ == '__main__':
    split_data()