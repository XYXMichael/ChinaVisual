/**
 * 获取所有省份一年内每月平均数据
 * @param {*} year
 * @param {*} type
 * @returns
 */
async function getAverageData_Province_month(year, type) {
  const res = await fetch(`data/province_month/${year}.csv`);
  const csvContent = await res.text();
  var rows = csvContent.split("\n");
  var result_1 = {};
  var columns = rows[0].split(",");
  var index = 0;
  for (index = 0; index < columns.length; index++) {
    if (columns[index] == type) break;
  }
  for (var i = 1; i < rows.length - 1; i++) {
    var row = rows[i];

    var columns = row.split(",");
    var province = columns[0];
    if (province == "海外") continue;
    var need_col = parseFloat(columns[index]);
    if (!result_1[province]) {
      result_1[province] = [];
    }
    result_1[province].push(need_col);
  }
  const dataArray = [];
  Object.keys(result_1).forEach((key) => {
    dataArray.push({ name: key, value: result_1[key] });
  });

  return dataArray;
}

/**
 * 获取某一个省份内所有城市在一年内每月平均数据
 * @param {*} year
 * @param {*} type
 * @returns
 */
async function get_city_month(province, year, type) {
  const res = await fetch(`data/city_month/${province}/${year}.csv`);
  const csvContent = await res.text();
  var rows = csvContent.split("\n");
  var result_1 = {};
  var columns = rows[0].split(",");
  var index = 0;
  for (index = 0; index < columns.length; index++) {
    if (columns[index] == type) break;
  }
  for (var i = 1; i < rows.length - 1; i++) {
    var row = rows[i];

    var columns = row.split(",");
    var city = columns[1];
    var need_col = parseFloat(columns[index]);
    if (!result_1[city]) {
      result_1[city] = [];
    }
    result_1[city].push(need_col);
  }
  const dataArray = [];
  Object.keys(result_1).forEach((key) => {
    dataArray.push({ name: key, value: result_1[key] });
  });
  return dataArray;
}

get_city_month("北京市", "2013", "AQI");

/**
 * 获取某一天某个省份的平均数据
 * @param {*} date 日期
 * @param {*} province 省
 * @returns
 */
async function getAverageData_Province_day(date, province) {
  const res = await fetch(`data/province_daily/${province}/${province}.csv`);
  const csvContent = await res.text();
  var rows = csvContent.split("\n");

  for (var i = 1; i < rows.length - 1; i++) {
    var row = rows[i];
    var columns = row.split(",");
    if (columns[1] === date) {
      return columns;
    }
  }
}

/**
 * 获取某一年某个省份的某个指标的平均数据
 * @param {*} date 日期
 * @param {*} province 省
 * @returns
 */
async function getTypeData_Province_year(province, year, type) {
  const res = await fetch(`data/province_daily/${province}/${province}.csv`);
  const csvContent = await res.text();
  var rows = csvContent.split("\n");
  var columns = rows[0].split(",");
  let index = 0

  for (let i = 0; i < columns.length; i++) {
    if (type == columns[i]) {
      index = i;
    }
  }
  let data = []
  for (var i = 1; i < rows.length - 1; i++) {
    var row = rows[i];
    var columns = row.split(",");
    if (columns[1].slice(0, 4) === year) {
      data.push([columns[1], columns[index]])
    } else if (data.length != 0) {
      break;
    }

  }
  // console.log(data)
  return data;

}



/**
 * 获取某一天某个省份的平均数据
 * @param {*} date 日期
 * @param {*} province 省
 * @returns
 */
async function getAverageData_City_day(date, province, city) {
  const res = await fetch(`data/province_city_daily/${province}/${city}.csv`);
  const csvContent = await res.text();
  var rows = csvContent.split("\n");
  var columns = rows[0].split(",");
  for (var i = 1; i < rows.length - 1; i++) {
    var row = rows[i];
    var columns = row.split(",");
    if (columns[2] === date) {
      return columns;
    }
  }
}

/**
 * 获取每天省份的一项平均数据
 * @param {*} date
 * @param {*} type
 * @returns
 */
async function getOneAverageData_province_day(date, type) {
  const res = await fetch(`data/daily_province_average/${date}.csv`);
  const csvContent = await res.text();

  var rows = csvContent.split("\n");
  var result_1 = {};
  var columns = rows[0].split(",");
  var index = 0;
  for (index = 0; index < columns.length; index++) {
    if (columns[index] == type) break;
  }
  for (var i = 1; i < rows.length - 1; i++) {
    var row = rows[i];

    var columns = row.split(",");
    var province = columns[0];
    if (province == "海外") continue;
    var need_col = parseFloat(columns[index]);
    result_1[province] = need_col;
  }

  return result_1;
}

/**
 * 获取某省份所有城市的某一天的一项平均数据
 * @param {*} date
 * @param {*} type
 * @returns
 */
async function get_city_average_daily(province, date, type) {
  const res = await fetch(`data/province_daily_city/${province}/${date}.csv`);
  const csvContent = await res.text();

  var rows = csvContent.split("\n");
  var result1 = {};
  var columns = rows[0].split(",");
  var index = 0;
  for (index = 2; index < columns.length; index++) {
    if (columns[index] == type) break;
  }
  for (var i = 1; i < rows.length - 1; i++) {
    var row = rows[i];
    var columns = row.split(",");
    var city = columns[1];
    var need_col = parseFloat(columns[index]);
    result1[city] = need_col;
  }

  return result1;
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

function calculateAverageValues(date, province) {
  fetch(`data/origin/CN-Reanalysis-daily-${date}00.csv`)
    .then(function (res) {
      return res.text();
    })
    .then(function (csvContent) {
      const data = csvContent
        .trim()
        .split("\n")
        .map((line) => line.split(","));

      const averageValues = {};
      const key = Object.fromEntries(data[0].map((key) => [key, key]));
      data.forEach((row) => {
        const provinceName = row[13];
        if (provinceName === province) {
          Object.keys(key).forEach((key, index) => {
            if (index < 11) {
              // 跳过省份、城市、区县、日期列
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

      Object.keys(averageValues).forEach((key) => {
        averageValues[key] =
          averageValues[key].reduce((a, b) => a + b, 0) /
          averageValues[key].length;
      });

      return averageValues;
    });
}

function calculateAverageValuesbyCity(date, city) {
  fetch(`data/origin/CN-Reanalysis-daily-${date}00.csv`)
    .then(function (res) {
      return res.text();
    })
    .then(function (csvContent) {
      const data = csvContent
        .trim()
        .split("\n")
        .map((line) => line.split(","));

      const averageValues = {};
      const key = Object.fromEntries(data[0].map((key) => [key, key]));
      data.forEach((row) => {
        const provinceName = row[14];
        if (provinceName === city) {
          Object.keys(key).forEach((key, index) => {
            if (index < 11) {
              // 跳过省份、城市、区县、日期列
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

      Object.keys(averageValues).forEach((key) => {
        averageValues[key] =
          averageValues[key].reduce((a, b) => a + b, 0) /
          averageValues[key].length;
      });

      return averageValues;
    });
}
