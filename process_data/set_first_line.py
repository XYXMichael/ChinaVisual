import os

# 指定文件夹路径
root_dir = 'D:\ChinaVisual\dataset'
out_dir = 'D:\ChinaVisual\dataset1'
# 固定字符串
fixed_header = 'PM2.5,PM10,SO2,NO2,CO,O3,U,V,TEMP,RH,PSFC,lat,lon,province,city,district,date,AQI,AQI_rank'

# 遍历所有 CSV 文件
for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.csv'):
            file_path = os.path.join(root, file)
            out_path = os.path.join(out_dir, file)
            print(f"Processing file: {file_path}")

            # 读取文件内容
            with open(file_path, 'r', encoding='utf8') as f:
                content = f.readlines()

            # 重写第一行为固定字符串
            content[0] = fixed_header + '\n'

            # 重新写入文件内容
            with open(out_path, 'w', encoding='utf8') as f:
                f.writelines(content)
