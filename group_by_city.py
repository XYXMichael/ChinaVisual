import pandas as pd
import os


# 指定文件夹路径
root_dir = 'D:\ChinaVisual\dataset'
output_dir = 'D:\ChinaVisual\province_data_group'
if not os.path.exists(output_dir):
    os.makedirs(output_dir)


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


def calculateAQI(current_data, calculateAQI_by_24H: bool = False):
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

    current_IAQI = 0
    i = j = k = 0
    AQI = 0
    AQI_rank = "一级"
    # 遍历每个污染物
    for i in range(len(Idata)):
        current_standard = Idata[i]
        # 遍历每一种污染物的一列数据
        # 判断属于哪一个级别
        for k in range(1, len(current_standard)):
            if current_standard[k] > current_data[i]:
                break
        if k == (len(current_standard)-1) and current_standard[k] < current_data[i]:
            current_IAQI = current_standard[k]
        else:
            current_IAQI = int(round((((qua[k]-qua[k-1])/(current_standard[k]-current_standard[k-1]))*(
                current_data[i]-current_standard[k-1])+qua[k-1])+0.5))
        if current_IAQI > AQI:
            AQI = current_IAQI
            AQI_rank = aqi_level(current_IAQI)

    return AQI, AQI_rank


# 遍历所有 CSV 文件
for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.csv'):
            file_path = os.path.join(root, file)
            print(f"Processing file: {file_path}")

            # 读取 CSV 文件
            df = pd.read_csv(file_path)

            df.loc[df['province'].isin(
                ['天津市', '北京市', '上海市', '重庆市']), 'city'] = df['district']
            # 去除 district、AQI、AQI_rank 列
            df = df.drop(['lat', 'lon', 'district', 'AQI',
                         'AQI_rank', 'city'], axis=1)

            # 按照 province 和 city 列聚合
            grouped_df = df.groupby(
                ['province', 'date']).mean().round(2).reset_index()

            for index, row in grouped_df.iterrows():
                province = row['province']
                filename = f"{province}/"
                AQI, AQI_rank = calculateAQI(
                    [row['PM2.5'], row['PM10'], row['SO2'], row['NO2'], row['CO'], row['O3']], True)

                row['AQI'] = AQI
                row['AQI_rank'] = AQI_rank
                if not os.path.exists(os.path.join(output_dir, filename)):
                    os.makedirs(os.path.join(output_dir, filename))
                filename = f"{province}/{province}.csv"

                # Check if the file exists
                if os.path.exists(os.path.join(output_dir, filename)):
                    # Append to the existing file
                    with open(os.path.join(output_dir, filename), 'a', newline='', encoding='utf8') as f:
                        writer = pd.DataFrame([row]).to_csv(
                            f, header=False, index=False)
                else:
                    with open(os.path.join(output_dir, filename), 'w+', newline='', encoding='utf8') as f:
                        writer = pd.DataFrame([row]).to_csv(
                            f, header=True, index=False)
