let standard = 8;
let standardValue = {
  "PM2.5": 7,
  PM10: 15,
  SO2: 15,
  CO: 0.2,
  O3: 15,
  NO2: 8,
  AQI: 15,
};
// 地图变量
let heatmapChart;
// y轴排序
let sortedKeys;
let parentWidth = document.getElementById("heatmap").offsetWidth;
let height_one = ((0.55 * parentWidth) / 12) * 33;

function getValueColor(value, minValue, maxValue) {
  // 将值从给定范围归一化到 0 到 1 之间
  const normalizedValue = (value - minValue) / (maxValue - minValue);
  // 计算红色和绿色的分量
  const red = Math.round(240 * normalizedValue);
  const green = Math.round(240 * (1 - normalizedValue));
  const blue = 0; // 蓝色分量保持为0
  // 返回 RGB 颜色字符串
  return `rgb(${red}, ${green}, ${blue})`;
}

let heatmapOption = {
  title: {
    show: false,
  },
  grid: [
    {
      width: "55%",
      top: "40",
      left: "1%",
    },
    {
      width: "25%",
      top: "40",
      left: "72%",
    },
  ],
  tooltip: {
    show: true,
  },
  xAxis: [
    {
      type: "category",
      data: months,
      splitArea: {
        show: true,
      },
      position: "top",
      axisTick: false,
      axisLine: {
        show: false,
      },
      axisLabel: {
        interval: 0,
        fontSize: "1rem",
      },
    },
    {
      gridIndex: 1,
      type: "value",
      splitArea: {
        show: true,
      },
      position: "top",
      axisLabel: {
        interval: 0,
        fontSize: "1rem",
      },
    },
  ],
  yAxis: [
    {
      type: "category",
      data: [
        "内蒙古自治区",
        "台湾省",
        "宁夏回族自治区",
        "甘肃省",
        "新疆维吾尔自治区",
        "云南省",
        "青海省",
        "西藏自治区",
        "陕西省",
        "北京市",
        "福建省",
        "海南省",
        "辽宁省",
        "黑龙江省",
        "山西省",
        "广东省",
        "四川省",
        "香港特别行政区",
        "广西壮族自治区",
        "浙江省",
        "吉林省",
        "江西省",
        "河北省",
        "贵州省",
        "湖南省",
        "湖北省",
        "重庆市",
        "安徽省",
        "江苏省",
        "河南省",
        "上海市",
        "天津市",
        "山东省",
      ],
      splitArea: {
        show: false,
      },
      show: false,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    {
      gridIndex: 1,
      type: "category",
      data: [
        "内蒙古自治区",
        "台湾省",
        "宁夏回族自治区",
        "甘肃省",
        "新疆维吾尔自治区",
        "云南省",
        "青海省",
        "西藏自治区",
        "陕西省",
        "北京市",
        "福建省",
        "海南省",
        "辽宁省",
        "黑龙江省",
        "山西省",
        "广东省",
        "四川省",
        "香港特别行政区",
        "广西壮族自治区",
        "浙江省",
        "吉林省",
        "江西省",
        "河北省",
        "贵州省",
        "湖南省",
        "湖北省",
        "重庆市",
        "安徽省",
        "江苏省",
        "河南省",
        "上海市",
        "天津市",
        "山东省",
      ],
      splitArea: {
        show: false,
      },
      axisTick: false,
      axisLine: {
        show: false,
      },
      axisLabel: {
        fontSize: "1rem",
        align: "center",
        margin: 75,
      },
    },
  ],
  series: [
    {
      type: "custom",
      data: [],
      renderItem: function (params, api) {
        var group = [];
        for (i = 0; i < 12; i++) {
          var item = [];
          var categoryIndex = api.value(i);
          // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
          var startPoint = api.coord([i, params.dataIndex]);

          var width = api.size([0, 1])[0];

          var kk = parseInt(categoryIndex / standard) + 5;
          var rgb = getValueColor(kk, 5, 18);
          for (j = 0; j < kk; j++) {
            item.push({
              type: "line",
              rotation: (2 * j * Math.PI) / kk,
              originX: startPoint[0],
              originY: startPoint[1],
              shape: {
                x1: startPoint[0],
                y1: startPoint[1],
                x2: startPoint[0] + (width / 2 - 2),
                y2: startPoint[1],
              },
              style: {
                stroke: rgb,
                fill: rgb,
                lineWidth: 2,
              },
              enterFrom: {
                style: { opacity: 0 },
              },
              updateAnimation: {
                duration: 500,
                easing: "quarticIn",
              },
              animation: {
                duration: 300,
                easing: "quarticIn",
              },
              transition: "all",
            });
          }
          group.push({
            type: "group",
            children: item,
            silent: false,

          });
        }
        return {
          type: "group",
          children: group,
          silent: false,
        };
      },
      tooltip: {
        position: "bottom",
        formatter: function (params) {
          return date.slice(0, 4) + "年 " + params.name + " " + current_attr + "：<br/>" + params.value;
        },
      },
    },
    {
      type: "bar",
      data: [100],
      yAxisIndex: 1,
      xAxisIndex: 1,
      itemStyle: {
        normal: {
          color: function (params) {
            if (params.data < 75) {
              return "rgba(0, 128, 0, 0.5)"; // shallow green
            } else if (params.data <= 100) {
              return "rgba(255, 255, 0, 0.5)"; // shallow yellow
            } else if (params.data <= 200) {
              return "rgba(255, 165, 0, 0.5)"; // orange
            } else {
              return "rgba(255, 0, 0, 0.5)"; // shallow red
            }
          },
        },
      },
      tooltip: {
        position: "bottom",
        formatter: function (params) {
          return date + " " + params.name + " AQI：" + params.value;
        },
      },
    },
  ],
};

heatmapChart = echarts.init(document.getElementById("heatmap"), null, {
  height: height_one + 50,
});
heatmapChart.setOption(heatmapOption);

// 设置线圈图
function setHotMap(date, type, province = null) {
  heatmapChart.setOption({
    series: {
      data: [],
    },
  });
  if (!is_province) {
    getAverageData_Province_month(date.slice(0, 4), type).then((result) => {
      standard = standardValue[type];

      result.sort((a, b) => {
        const nameA = a.name;
        const nameB = b.name;
        if (sortedKeys.indexOf(nameA) < sortedKeys.indexOf(nameB)) return -1;
        else if (sortedKeys.indexOf(nameA) > sortedKeys.indexOf(nameB))
          return 1;
        return 0;
      });
      heatmapChart.setOption({
        series: {
          data: result,
        },
      });
    });
  } else {
    get_city_month(province, date.slice(0, 4), type).then((result) => {
      standard = standardValue[type];

      result.sort((a, b) => {
        const nameA = a.name;
        const nameB = b.name;
        if (sortedKeys.indexOf(nameA) < sortedKeys.indexOf(nameB)) return -1;
        else if (sortedKeys.indexOf(nameA) > sortedKeys.indexOf(nameB))
          return 1;
        return 0;
      });
      heatmapChart.setOption({
        series: {
          data: result,
        },
      });
    });
  }
}

async function setBarChart(date) {
  await getOneAverageData_province_day(date, "AQI").then((result) => {
    const keys = Object.keys(result);
    sortedKeys = keys.slice().sort((a, b) => result[a] - result[b]);
    const values = keys.map((key) => result[key]);
    values.sort((a, b) => a - b);
    heatmapChart.setOption({
      grid: [
        {
          height: height_one,
        },
        {
          height: height_one,
        },
      ],
      yAxis: [
        {
          data: sortedKeys,
        },
        {
          data: sortedKeys,
        },
      ],
      series: [
        {},
        {
          data: values,
        },
      ],
    });
  });
}

async function setTogether(date, type) {
  result1 = await getAverageData_Province_month(date.slice(0, 4), type);
  result2 = await getOneAverageData_province_day(date, "AQI");
  height_one = ((0.55 * parentWidth) / 12) * 33;

  standard = standardValue[type];
  const keys = Object.keys(result2);
  sortedKeys = keys.slice().sort((a, b) => result2[a] - result2[b]);
  const values = keys.map((key) => result2[key]);
  values.sort((a, b) => a - b);

  result1.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;
    if (sortedKeys.indexOf(nameA) < sortedKeys.indexOf(nameB)) return -1;
    else if (sortedKeys.indexOf(nameA) > sortedKeys.indexOf(nameB)) return 1;
    return 0;
  });

  heatmapChart.setOption({
    grid: [
      {
        height: height_one,
      },
      {
        height: height_one,
      },
    ],
    yAxis: [
      {
        data: sortedKeys,
      },
      {
        data: sortedKeys,
      },
    ],
    series: [
      { data: result1 },
      {
        data: values,
      },
    ],
  });
}

async function setProvinceTogether(province, date, type) {
  result1 = await get_city_month(province, date.slice(0, 4), type);
  result2 = await get_city_average_daily(province, date, "AQI");

  height_one = ((0.55 * parentWidth) / 12) * (result1.length + 1);

  standard = standardValue[type];
  const keys = Object.keys(result2);
  sortedKeys = keys.slice().sort((a, b) => result2[a] - result2[b]);
  const values = keys.map((key) => result2[key]);
  values.sort((a, b) => a - b);

  result1.sort((a, b) => {
    const nameA = a.name;
    const nameB = b.name;
    if (sortedKeys.indexOf(nameA) < sortedKeys.indexOf(nameB)) return -1;
    else if (sortedKeys.indexOf(nameA) > sortedKeys.indexOf(nameB)) return 1;
    return 0;
  });
  heatmapChart.setOption({
    grid: [
      {
        height: height_one,
      },
      {
        height: height_one,
      },
    ],
    yAxis: [
      {
        data: sortedKeys,
      },
      {
        data: sortedKeys,
      },
    ],
    series: [
      { data: result1 },
      {
        data: values,
      },
    ],
  });
}
