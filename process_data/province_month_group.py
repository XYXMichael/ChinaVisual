import math
import pandas as pd
import os

# Set the directory path where your CSV files are located
dir_path = '/home/chen/Downloads/ChinaVisual/province_city'
out_dir = '/home/chen/Downloads/ChinaVisual/city_group_month'

if(not os.path.exists(out_dir)):
    os.mkdir(out_dir)
    
# Create a list to store the aggregated data

# Iterate over all CSV files in the directory
for root, dirs, files in os.walk(dir_path):
    out_dir1 = os.path.join(out_dir,os.path.basename(root)) 
    aggregated_data = []
        
    for filename in files:
        if not filename.endswith('.csv'):
            continue
        if not os.path.exists(out_dir1):
            os.mkdir(out_dir1)
        print(filename)
        df = pd.read_csv(os.path.join(root, filename))

        df['date'] = pd.to_datetime(df['date'])
        df['month'] = df['date'].dt.strftime('%Y-%m')
        grouped_df = df.groupby(['province', 'city', 'month'])[['AQI', 'PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3']].mean().round(2).reset_index()

        grouped_df['AQI'] = grouped_df['AQI'].apply(lambda x: math.ceil(x))
        grouped_df['AQI_rank'] = grouped_df['AQI'].apply(
            lambda x: '一级' if x <= 50 else '二级' if x <= 100 else '三级' if x <= 150 else '四级' if x <= 200 else '五级')

        aggregated_data.append(grouped_df)

        aggregated_df = pd.concat(aggregated_data)
        aggregated_df['month'] = pd.to_datetime(aggregated_df['month'])
        print(aggregated_df)

        for year in aggregated_df['month'].dt.year.unique():
            year_df = aggregated_df[aggregated_df['month'].dt.year == year]
            year_df['month'] = year_df['month'].dt.strftime('%Y-%m')
            print(os.path.join(out_dir1,f'{year}.csv'))
            year_df.to_csv(os.path.join(out_dir1,f'{year}.csv'), index=False, columns=[
                           'province','city', 'month', 'PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'AQI', 'AQI_rank'])
