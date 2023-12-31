import open3d as o3d
import numpy as np
import utility_reg
import crop_png

def take_png(vis):
    vis.capture_screen_image("screenshot.png")
    crop_png.crop_png_save("screenshot.png")
    vis.destroy_window()
    return False

def launch_scene(filepath):

    pcd = np.load(filepath)
    pcd = utility_reg.n2o(pcd)
    # 创建一个可视化器
    vis = o3d.visualization.VisualizerWithKeyCallback()
    # 添加点云到可视化器
    vis.create_window(window_name="请为发布的三维模型截取预览图，按P截图")
    vis.add_geometry(pcd)
    # 添加键盘回调函数
    vis.register_key_callback(ord("P"), take_png)

    # 运行可视化器
    vis.run()

if __name__ == '__main__':
    filepath = '../pcds/my_src_740.npy'
    launch_scene(filepath)