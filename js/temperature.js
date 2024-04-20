var tempData = [];
let flag = 1;
var chinaMap = echarts.init(document.getElementById("box2"));
var temButton = document.getElementById("temperature");
var humButton = document.getElementById("humidity");
var windButton = document.getElementById("wind");
var pressureButton = document.getElementById("pressure");
var pm25Button = document.getElementById("donut1");
var pm10Button = document.getElementById("donut2");
var so2Button = document.getElementById("donut3");
var no2Button = document.getElementById("donut4");
var coButton = document.getElementById("donut5");
var o3Button = document.getElementById("donut6");
var aqiButton = document.getElementById("aqi");
var dataIndex = [
  {
    name: "PM2.5",
    index: 0,
    color: [
      "#ae00ff",
      "#a100e9",
      "#9400d4",
      "#8700be",
      "#7a00a9",
      "#6d0093",
      "#60007e",
      "#530068",
      " #460053",
      "#39003d",
    ],
    min: 0,
    max: 100,
  },
  {
    name: "PM10",
    index: 1,
    color: [],
    min: 0,
    max: 100,
  },
  {
    name: "SO2",
    index: 2,
    color: [],
    min: 0,
    max: 100,
  },
  {
    name: "NO2",
    index: 3,
    color: [],
    min: 0,
    max: 100,
  },
  {
    name: "CO",
    index: 4,
    color: [],
    min: 0,
    max: 100,
  },
  {
    name: "O3",
    index: 5,
    color: [],
    min: 0,
    max: 100,
  },
  {
    name: "TEMP",
    index: 8,
    color: [
      "#313695",
      "#4575b4",
      "#74add1",
      "#abd9e9",
      "#e0f3f8",
      "#ffffbf",
      "#fee090",
      "#fdae61",
      "#f46d43",
      "#d73027",
      "#a50026",
    ],
    min: 230,
    max: 300,
  },
  {
    name: "RH",
    index: 9,
    color: [
      "#00b3ff",
      "#00a2e9",
      "#0090d4",
      "#007fbe",
      "#006ea9",
      "#005c93",
      "#004b7e",
      "#003a68",
      "#002853",
      "#00173d",
    ],
    min: 0,
    max: 100,
  },
  {
    name: "PSFC",
    index: 10,
    color: [],
    min: 0,
    max: 100,
  },
  {
    name: "AQI",
    index: 17,
    color: [],
    min: 0,
    max: 100,
  },
];
const provinceToEnglish = {
  北京: "beijing",
  天津: "tianjin",
  河北: "hebei",
  山西: "shanxi",
  内蒙古: "inner mongolia",
  辽宁: "liaoning",
  吉林: "jilin",
  黑龙江: "heilongjiang",
  上海: "shanghai",
  江苏: "jiangsu",
  浙江: "zhejiang",
  安徽: "anhui",
  福建: "fujian",
  江西: "jiangxi",
  山东: "shandong",
  河南: "henan",
  湖北: "hubei",
  湖南: "hunan",
  广东: "guangdong",
  广西: "guangxi",
  海南: "hainan",
  重庆: "chongqing",
  四川: "sichuan",
  贵州: "guizhou",
  云南: "yunnan",
  西藏: "tibet",
  陕西: "shaanxi",
  甘肃: "gansu",
  青海: "qinghai",
  宁夏: "ningxia",
  新疆: "xinjiang",
  香港: "hongkong",
  澳门: "aomen",
  台湾: "taiwan",
};
/**
 * 根据对应的按钮属性绘制对应的中国热力地图
 *
 * @param attr 地图属性
 * @param date 日期
 */
function drawMap(attr, date) {
  let data = [];
  let index = 0;
  for (let i = 0; i < dataIndex.length; i++) {
    if (dataIndex[i].name == attr) {
      index = dataIndex[i].index;
    }
  }
  // 使用 Promise.all 等待所有数据加载完成
  Promise.all([
    fetch(`../dataset/CN-Reanalysis-daily-2013010100.csv`).then((response) =>
      response.text()
    ),
    fetch("china.json").then((response) => response.json()),
  ]).then(([csvData, chinaGeoJson]) => {
    chinaMap.clear();
    var rows = csvData.split("\n");
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i].split(",");
      data.push([
        parseFloat(row[12]), // longitude
        parseFloat(row[11]), // latitude
        parseFloat(row[index]), // temperature
      ]);
    }
    // 绘制地图
    echarts.registerMap("china", chinaGeoJson); // 注册地图数据

    chinaMap.setOption(getOption(attr, data));
    chinaMap.on("click", function (item) {
      flag = 0;
      province_name = item.name;
      fetch(`province_map/${province_name}.json`)
        .then(function (res) {
          return res.json();
        })
        .then(function (provinceGeoJson) {
          // console.log(provinceToEnglish[province_name]);
          // 绘制地图
          echarts.registerMap(
            provinceToEnglish[province_name],
            provinceGeoJson
          ); // 注册地图数据
          chinaMap.clear();
          chinaMap.setOption({
            series: [
              {
                type: "map",
                map: provinceToEnglish[province_name], // 使用注册的地图数据
                roam: true, // 允许缩放和平移漫游
                // 设置缩放的比例
                zoom: 1.2,
                // 设置缩放的限制
                scaleLimit: {
                  min: 1,
                  max: 10,
                },
              },
            ],
          });
        });
    });
  });
  change_button.addEventListener("click", function () {
    if (flag == 0) {
      flag = 1;
      fetch("china.json")
        .then(function (res) {
          return res.json();
        })
        .then(function (chinaGeoJson) {
          // 隐藏加载动画
          chinaMap.hideLoading();
          chinaMap.clear();

          // 绘制地图
          echarts.registerMap("china", chinaGeoJson); // 注册地图数据
          chinaMap.setOption(getOption(attr, data));
        });
    }
  });
}
function getOption(attr, data) {
  let min = 0;
  let max = 0;
  let color = [];
  for (let i = 0; i < dataIndex.length; i++) {
    if (dataIndex[i].name == attr) {
      color = dataIndex[i].color;
      min = dataIndex[i].min;
      max = dataIndex[i].max;
    }
  }
  var option = {
    backgroundColor: "#404a59",

    title: {
      text: attr,
      show: true,
      top: 20, // 将标题距离顶部 20 像素
      textStyle: {
        fontSize: 18,
        color: "#fff", // 设置标题文字颜色为白色
      },
    },
    geo: {
      map: "china",
      label: {
        show: false,
        color: "#4a4a4a", // 调整省份标签的颜色
      },
      itemStyle: {
        borderColor: "#fff", // 边界线条颜色
        borderWidth: 1, // 边界线条宽度
      },
    },
    visualMap: {
      min: min,
      max: max,
      calculable: true,
      orient: "vertical",
      left: "left",
      top: "bottom",
      inRange: {
        color: color,
      },
    },
    series: [
      {
        type: "heatmap",
        coordinateSystem: "geo",
        roam: true, // 允许缩放和平移漫游
        // 设置缩放的比例
        zoom: 1.2,
        // 设置缩放的限制
        scaleLimit: {
          min: 1,
          max: 10,
        },
        data: data,
        pointSize: 1,
        blurSize: 4,
      },
    ],
  };
  return option;
}
drawMap("TEMP", "20130101");
temButton.addEventListener("click", function () {
  drawMap("TEMP", "20130101");
});
humButton.addEventListener("click", function () {
  drawMap("RH", "20130101");
});
pm25Button.addEventListener("click", function () {
  drawMap("PM2.5", "20130101");
});
