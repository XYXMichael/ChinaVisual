import math
import pandas as pd
import os

# Set the directory path where your CSV files are located
dir_path = 'D:\ChinaVisual\province_data_group'

# Create a list to store the aggregated data
aggregated_data = []

# Iterate over all CSV files in the directory
for root, dirs, files in os.walk(dir_path):
    for filename in files:
        # # Read the CSV file
        print(filename)
        df = pd.read_csv(os.path.join(root, filename))

        df['date'] = pd.to_datetime(df['date'])
        # # Extract the month from the date column
        df['month'] = df['date'].dt.strftime('%Y-%m')
        # # Group the data by province and month, and calculate the mean of AQI
        grouped_df = df.groupby(['province', 'month'])[
            'AQI', 'PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3'].mean().round(2).reset_index()

        grouped_df['AQI'] = grouped_df['AQI'].apply(lambda x: math.ceil(x))
        # # Calculate the AQI rank based on the average AQI value
        grouped_df['AQI_rank'] = grouped_df['AQI'].apply(
            lambda x: '一级' if x <= 50 else '二级' if x <= 100 else '三级' if x <= 150 else '四级' if x <= 200 else '五级')
        print(grouped_df)

        # # Append the aggregated data to the list
        aggregated_data.append(grouped_df)

        # Concatenate the aggregated data into a single DataFrame
        aggregated_df = pd.concat(aggregated_data)
        aggregated_df['month'] = pd.to_datetime(aggregated_df['month'])

        # Write the aggregated data to new CSV files, one for each year
        for year in aggregated_df['month'].dt.year.unique():
            year_df = aggregated_df[aggregated_df['month'].dt.year == year]
            year_df['month'] = year_df['month'].dt.strftime('%Y-%m')
            year_df.to_csv(f'{year}.csv', index=False, columns=[
                           'province', 'month', 'PM2.5', 'PM10', 'SO2', 'NO2', 'CO', 'O3', 'AQI', 'AQI_rank'])
