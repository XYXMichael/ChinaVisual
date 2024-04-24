var date = "2013-01-01";
// 初始化Echarts实例
var myChart = echarts.init(document.getElementById("box2"));
var province_div = document.getElementById("province");
var province_name = "北京";
var current_province = "北京市";
var data = [];

// 日期修改
document.getElementById("date_title").addEventListener("change", function () {
  date = document.getElementById("date_title").children[0].value;
  if (is_province) {
    setControllor(date, current_province);
    setProvinceTogether(current_province, date, "AQI");
    // console.log(current_city);
    drawProvinceMap(current_city, "AQI");
  } else {
    setControllor(date, province_name);
    setTogether(date, "AQI");
    drawMap(null, date);
  }
});

// 设置圆环图配置
var option = {
  tooltip: {
    show: true,
    trigger: 'item'
  },
  series: [
    {
      type: "gauge",
      center: ["50%", "45%"], //中心位置
      startAngle: 210,
      endAngle: -30,
      min: 0,
      max: 60,
      splitNumber: 12,
      itemStyle: {
        color: function (params) {
          var max = 80;
          var value = params.value;
          var ratio = value / max;
          var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
          var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
          var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0
          return `rgb(${r}, ${g}, ${b})`;
        },
      },
      tooltip: {
      },
      progress: {
        show: true,
        width: 5,
        roundCap: true,
      },
      pointer: {
        show: false,
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 5,
          cap: "square",
          join: "round",
        },
        show: true,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      anchor: {
        show: false,
      },
      title: {
        show: true,
        fontSize: "1.2rem",
        offsetCenter: [0, "85%"],
      },
      detail: {
        valueAnimation: true,
        width: "60%",
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, "-1%"],
        fontSize: "1rem",
        fontWeight: "bolder",
        formatter: "{value}",
        color: "inherit",
      },
      data: [
        {
          value: 20,
          name: "Grade Rating",
        },
      ],
    },
  ],
};

// 初始化 设置参数
let donutChart1 = echarts.init(document.getElementById("donut1"));
let donutChart2 = echarts.init(document.getElementById("donut2"));
let donutChart3 = echarts.init(document.getElementById("donut3"));
let donutChart4 = echarts.init(document.getElementById("donut4"));
let donutChart5 = echarts.init(document.getElementById("donut5"));
let donutChart6 = echarts.init(document.getElementById("donut6"));

// 设置点击事件
document.getElementById("aqi").addEventListener("click", function () {
  setHotMap(date, "AQI", current_province);
});
document.getElementById("donut1").addEventListener("click", function () {
  setHotMap(date, "PM2.5", current_province);
});
document.getElementById("donut2").addEventListener("click", function () {
  setHotMap(date, "PM10", current_province);
});
document.getElementById("donut3").addEventListener("click", function () {
  setHotMap(date, "SO2", current_province);
});
document.getElementById("donut4").addEventListener("click", function () {
  setHotMap(date, "NO2", current_province);
});
document.getElementById("donut5").addEventListener("click", function () {
  setHotMap(date, "CO", current_province);
});
document.getElementById("donut6").addEventListener("click", function () {
  setHotMap(date, "O3", current_province);
});

donutChart1.setOption(option);
donutChart2.setOption(option);
donutChart3.setOption(option);
donutChart4.setOption(option);
donutChart5.setOption(option);
donutChart6.setOption(option);

// 从风速获取风向
function calculateWindDirection(u, v) {
  var windAngle = Math.atan2(u, v) * (180 / Math.PI);
  windAngle = (windAngle + 360) % 360; // 转换为0-360度范围内的角度
  // 返回风向的字符串描述
  if (windAngle >= 337.5 || windAngle < 22.5) {
    return "北风";
  } else if (windAngle >= 22.5 && windAngle < 67.5) {
    return "东北风";
  } else if (windAngle >= 67.5 && windAngle < 112.5) {
    return "东风";
  } else if (windAngle >= 112.5 && windAngle < 157.5) {
    return "东南风";
  } else if (windAngle >= 157.5 && windAngle < 202.5) {
    return "南风";
  } else if (windAngle >= 202.5 && windAngle < 247.5) {
    return "西南风";
  } else if (windAngle >= 247.5 && windAngle < 292.5) {
    return "西风";
  } else if (windAngle >= 292.5 && windAngle < 337.5) {
    return "西北风";
  } else {
    return "";
  }
}

function updateControl(data) {
  let aqi = data[0];
  let wind = data[1];
  let temperature = data[2];
  let humidity = data[3];
  let pressure = data[4];
  let pm25 = data[5];
  let pm10 = data[6];
  let so2 = data[7];
  let no2 = data[8];
  let co = data[9];
  let o3 = data[10];
  let name = data[11];

  province_div.textContent = name;
  document.getElementById("aqi").textContent =
    "AQI " + aqi.toString().slice(0, 6);
  document.getElementById("wind").textContent =
    wind.toString().slice(0, 8) + "m/s";
  document.getElementById("temperature").textContent =
    temperature.toString().slice(0, 5) + " ℃";
  document.getElementById("humidity").textContent =
    humidity.toString().slice(0, 6) + " %";
  document.getElementById("pressure").textContent =
    pressure.toString().slice(0, 6).replace(".", "") + " Pa";

  donutChart1.setOption({
    series: [
      {
        max: 300,
        data: [
          {
            value: pm25.toString().slice(0, 6),
            name: "PM2.5",
          },
        ],
        itemStyle: {
          color: function (params) {
            var max = 300; // 最大值
            var value = params.value;
            var ratio = value / max;
            var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
            var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
            var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0
            return `rgb(${r}, ${g}, ${b})`;
          },
        },
      },
    ],
  });

  donutChart2.setOption({
    series: [
      {
        max: 300,
        data: [
          {
            value: pm10.toString().slice(0, 6),
            name: "PM10",
          },
        ],
        itemStyle: {
          color: function (params) {
            var max = 300; // 最大值
            var value = params.value;
            var ratio = value / max;
            var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
            var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
            var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0
            return `rgb(${r}, ${g}, ${b})`;
          },
        },
      },
    ],
  });

  donutChart3.setOption({
    series: [
      {
        max: 1200,
        data: [
          {
            value: so2.toString().slice(0, 6),
            name: "SO2",
          },
        ],
        itemStyle: {
          color: function (params) {
            var max = 1200; // 最大值
            var value = params.value;
            var ratio = value / max;
            var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
            var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
            var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0
            return `rgb(${r}, ${g}, ${b})`;
          },
        },
      },
    ],
  });

  donutChart4.setOption({
    series: [
      {
        max: 470,
        data: [
          {
            value: no2.toString().slice(0, 6),
            name: "NO2",
          },
        ],
        itemStyle: {
          color: function (params) {
            var max = 470; // 最大值
            var value = params.value;
            var ratio = value / max;
            var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
            var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
            var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0
            return `rgb(${r}, ${g}, ${b})`;
          },
        },
      },
    ],
  });

  donutChart5.setOption({
    series: [
      {
        max: 30,
        data: [
          {
            value: co.toString().slice(0, 6),
            name: "CO",
          },
        ],
      },
    ],
  });

  donutChart6.setOption({
    series: [
      {
        max: 400,
        data: [
          {
            value: o3.toString().slice(0, 6),
            name: "O3",
          },
        ],
        itemStyle: {
          color: function (params) {
            var max = 400; // 最大值
            var value = params.value;
            var ratio = value / max;
            var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
            var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
            var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0

            return `rgb(${r}, ${g}, ${b})`;
          },
        },
      },
    ],
  });
}

function setControllor(date1, name) {
  date = date1;
  const textElement = document.getElementById("province");
  if (name.length > 6) {
    textElement.classList.add("long");
  } else {
    textElement.classList.remove("long");
  }
  if (name in provinceSimp2All) {
    current_province = provinceSimp2All[name];
    getAverageData_Province_day(date1, current_province).then((row) => {
      data = [];
      data.push(row[13] + " " + row[14]);
      data.push(
        calculateWindDirection(row[8], row[9]) +
        "  " +
        Math.sqrt(row[9] * row[9], row[8] * row[8])
      );
      data.push(row[10] - 272.15);
      data.push(row[11]);
      data.push(row[12]);
      data.push(row[2]);
      data.push(row[3]);
      data.push(row[4]);
      data.push(row[5]);
      data.push(row[6]);
      data.push(row[7]);
      data.push(name);
      updateControl(data);
    });
  } else {
    getAverageData_City_day(date, current_province, name).then(function (row) {
      data = [];
      data.push(row[14] + " " + row[15]);
      data.push(
        calculateWindDirection(row[10], row[9]) +
        "  " +
        Math.sqrt(row[9] * row[9], row[10] * row[10])
      );
      data.push(row[11] - 272.15);
      data.push(row[12]);
      data.push(row[13]);
      data.push(row[3]);
      data.push(row[4]);
      data.push(row[5]);
      data.push(row[6]);
      data.push(row[7]);
      data.push(row[8]);
      data.push(name);
      updateControl(data);
    });
  }
}

setControllor("2013-01-01", "上海");
