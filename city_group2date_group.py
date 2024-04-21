import os
import pandas as pd

# Set the root directory where all the province folders are located
root_dir = '/home/chen/Downloads/ChinaVisual/city_data_group'
output_dir = '/home/chen/Downloads/ChinaVisual/province_city_groupbydate'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)
    
# Loop through all the province folders
for province_folder in os.listdir(root_dir):
    province_folder_path = os.path.join(root_dir, province_folder)
    if not os.path.isdir(province_folder_path):
        continue
    output_dir_province = os.path.join(output_dir, province_folder)
    if not os.path.exists(output_dir_province):
        os.makedirs(output_dir_province)
    # Loop through all the CSV files in the province folder
    for csv_file in os.listdir(province_folder_path):
        if csv_file.endswith('.csv'):
            
            csv_file_path = os.path.join(province_folder_path, csv_file)
            # Read the CSV file using pandas
            df = pd.read_csv(csv_file_path)
            # Loop through each row in the CSV file
            for index, row in df.iterrows():
                # Create a new CSV file with the date as the filename
                date = row['date']
                new_csv_file_path = os.path.join(output_dir_province, f'{date}.csv')
                # Write the row to the new CSV file
                if os.path.exists(new_csv_file_path) and pd.read_csv(new_csv_file_path, nrows=1).shape[1] > 0:
                    # If the file exists and has a header row, write the row without a header
                    pd.DataFrame([row]).to_csv(new_csv_file_path, mode='a', header=False, index=False)
                else:
                    # If the file doesn't exist or doesn't have a header row, write the row with a header
                    pd.DataFrame([row]).to_csv(new_csv_file_path, mode='w', header=True, index=False)