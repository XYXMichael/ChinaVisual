import pandas as pd
import numpy as np
import os


def aqi_level(aqi_value):
    if aqi_value <= 50:
        return "一级"  # 优
    elif aqi_value <= 100:
        return "二级"  # 中等
    elif aqi_value <= 150:
        return "三级"  # 对敏感人群不健康
    elif aqi_value <= 200:
        return "四级"  # 不健康
    elif aqi_value <= 300:
        return "五级"  # 极不健康
    else:
        return "六级"  # 危险


def calculateAQI(input_file: str, output_file: str, calculateAQI_by_24H: bool = False):
    qua = [0, 50, 100, 150, 200, 300, 400, 500]

    if calculateAQI_by_24H:
        Idata = [
            [0, 35, 75, 115, 150, 250, 350, 500],  # PM2.5
            [0, 50, 150, 250, 350, 420, 500, 600],  # (PM10)
            [0, 50, 150, 475, 800, 1600, 2100, 2620],  	# (SO2)
            [0, 40, 80, 180, 280, 565, 750, 940],  		# (no2)
            [0, 2, 4, 14, 24, 36, 48, 60],  			# (CO)
            [0, 100, 160, 215, 265, 800, 1000, 1200]  			# (O3)
        ]
    else:
        Idata = [
            [0, 35, 75, 115, 150, 250, 350, 500],  	# PM2.5 24小时平均
            [0, 50, 150, 250, 350, 420, 500, 600],  	# (PM10)24小时平均
            [0, 150, 500, 650, 800], 			# (so2)
            [0, 100, 200, 700, 1200, 2340, 3090, 3840],  # no2
            [0, 5, 10, 35, 60, 90, 120, 150],			# co
            [0, 160, 200, 300, 400, 800, 1000, 1200]		# o3
        ]

    csv_data = pd.read_csv(input_file)
    # columns = csv_data.columns.tolist()
    # csv_data.drop(columns=columns[-1], axis=1, inplace=True)

    AQI = list(np.zeros(len(csv_data)))
    AQI_rank = list(np.zeros(len(csv_data)))
    # 上为24hAQI计算中需要用到的Idata
    current_IAQI = 0
    i = j = k = 0

    # 遍历每个污染物
    for i in range(len(Idata)):
        current_data = csv_data.iloc[:, i]
        current_standard = Idata[i]
        # 遍历每一种污染物的一列数据
        for j in range(len(current_data)):
            # 判断属于哪一个级别
            for k in range(1, len(current_standard)):
                if current_standard[k] > current_data[j]:
                    break
            if k == (len(current_standard)-1) and current_standard[k] < current_data[j]:
                current_IAQI = current_standard[k]
            else:
                current_IAQI = int(round((((qua[k]-qua[k-1])/(current_standard[k]-current_standard[k-1]))*(
                    current_data[j]-current_standard[k-1])+qua[k-1])+0.5))
            if current_IAQI > AQI[j]:
                AQI[j] = current_IAQI
                AQI_rank[j] = aqi_level(current_IAQI)

    csv_data['AQI'] = AQI
    csv_data['AQI_rank'] = AQI_rank
    csv_data.to_csv(output_file, index=False, na_rep='')


if __name__ == '__main__':
    """此为1h的AQI计算代码 24h的只需要更换Idata即可"""
    root_dir = 'D:\ChinaVisual\question_data'
    # root_dir = 'D:\ChinaVisual\dataset'

    root_dir2 = 'D:\ChinaVisual\dataset'
    if not os.path.exists(root_dir2):
        os.makedirs(root_dir2)
    # 读取 CSV 文件

    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.csv'):
                print(os.path.join(root, file))
                df = pd.read_csv(os.path.join(root, file))

                # 去除所有空格
                df = df.apply(lambda x: x.str.replace(' ', '')
                              if x.dtype == 'object' else x)

                # 保存结果
                df.to_csv(os.path.join(root, file), index=False, na_rep='')
                calculateAQI(os.path.join(root, file),
                             os.path.join(root_dir2, file), True)

    # input_filename="/home/Documents/CN-Reanalysis-daily-2013010100.csv"
    # output_filename="./test.csv"
