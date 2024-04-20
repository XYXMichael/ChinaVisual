function calculateAverageValues(date, province) {
    fetch(`dataset2/CN-Reanalysis-daily-${date}00.csv`)
        .then(function (res) {
            return res.text();
        })
        .then(function (csvContent) {
            const data = csvContent.trim().split('\n').map(line => line.split(','))

            const averageValues = {};
            const key = Object.fromEntries(data[0].map((key) => [key, key]));
            data.forEach(row => {
                const provinceName = row[13];
                if (provinceName === province) {
                    Object.keys(key).forEach((key, index) => {
                        if (index < 11) { // 跳过省份、城市、区县、日期列
                            const value = parseFloat(row[index]);
                            if (!averageValues[key]) {
                                averageValues[key] = [value];
                            } else {
                                averageValues[key].push(value);
                            }
                        }
                    });
                }
            });

            Object.keys(averageValues).forEach(key => {
                averageValues[key] = averageValues[key].reduce((a, b) => a + b, 0) / averageValues[key].length;
            });

            console.log(averageValues)
            return averageValues;
        }
        );
}

function calculateAverageValuesbyCity(date, city) {
    fetch(`dataset2/CN-Reanalysis-daily-${date}00.csv`)
        .then(function (res) {
            return res.text();
        })
        .then(function (csvContent) {
            const data = csvContent.trim().split('\n').map(line => line.split(','))

            const averageValues = {};
            const key = Object.fromEntries(data[0].map((key) => [key, key]));
            data.forEach(row => {
                const provinceName = row[14];
                if (provinceName === city) {
                    Object.keys(key).forEach((key, index) => {
                        if (index < 11) { // 跳过省份、城市、区县、日期列
                            const value = parseFloat(row[index]);
                            if (!averageValues[key]) {
                                averageValues[key] = [value];
                            } else {
                                averageValues[key].push(value);
                            }
                        }
                    });
                }
            });

            Object.keys(averageValues).forEach(key => {
                averageValues[key] = averageValues[key].reduce((a, b) => a + b, 0) / averageValues[key].length;
            });

            console.log(averageValues)
            return averageValues;
        }
        );
}


async function getAverageData_Province_month(year, type) {
    const res = await fetch(`province_data_group/${year}.csv`);
    const csvContent = await res.text();
    var rows = csvContent.split('\n');
    var result_1 = {};
    var columns = rows[0].split(',');
    var index = 0;
    for (index = 0; index < columns.length; index++) {
        if (columns[index] == type)
            break;
    }
    for (var i = 1; i < rows.length - 1; i++) {
        var row = rows[i];
        var columns = row.split(',');
        var province = columns[0];
        var need_col = parseFloat(columns[index]);
        if (!result_1[province]) {
            result_1[province] = [];
        }
        result_1[province].push(need_col);
    }
    const dataArray = [];
    Object.keys(result_1).forEach(key => {
        dataArray.push({ name: key, value: result_1[key] });
    });

    return dataArray
}


function getAllData_city(date, city) {


    return data;
}



/**
 * 返回一项数据的经纬度、值，用于绘图
 * @param {string} date 日期
 * @param {string} province 省份，如果为空则返回全国数据
 * @param {string} type 统计类型 
 */
function getOneForMap(date, province, type) {

    return data;
}

/**
 * 返回一项数据的当天平均值，用于绘图
 * @param {string} date 日期
 * @param {string} province 省份，如果为空则返回每个省数据，否则返回对应省的数据
 * @param {string} type 统计类型 
 */
function getOne(date, province, type) {

    return data;
}


