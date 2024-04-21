var tempData = [];
let flag = 1;
var chinaMap = echarts.init(document.getElementById("box2"));
var pName = "";
var temIndex = 0;
let tempdata = [];
let temattr = "TEMP";
let currentDate = "2013-01-01";

var option_map = {
  backgroundColor: "#404a59",
  title: {
    text: "TEMP",
    show: true,
    top: 20, // 将标题距离顶部 20 像素
    textStyle: {
      fontSize: 18,
      color: "#fff", // 设置标题文字颜色为白色
      fontSize:'3rem'

    },
  },
  geo: {
    map: "china",
    label: {
      show: false,
      color: "#0a0a0a", // 调整省份标签的颜色
      fontSize: "1rem",
    },
    itemStyle: {
      borderColor: "#0a0a0a", // 边界线条颜色
      borderWidth: 1, // 边界线条宽度
    },
  },
  visualMap: {
    min: 0,
    max: 300,
    calculable: true,
    orient: "vertical",
    left: "left",
    top: "bottom",
    inRange: {
      color: ["#f7fcf0", "#e0f3db", "#ccebc5", "#a8ddb5", "#7bccc4"],
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
      data: [],
      pointSize: 1,
      blurSize: 4,
    },
  ],
};

const option_diff = {
  "PM2.5": {
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
    max: 150,
  },
  "PM10": {
    name: "PM10",
    index: 1,
    color: [
      "#fff700",
      "#e9e200",
      "#d4ce00",
      "#beb900",
      "#a8a400",
      "#939000",
      "#7d7b00",
      "#676600",
    ],
    min: 0,
    max: 250,
  },
  "SO2": {
    name: "SO2",
    index: 2,
    color: [
      "#e0e0e0",
      "#e900a0",
      "#be0085",
      "#7e005b",
    ],
    min: -10,
    max: 200,
  },
  "NO2": {
    name: "NO2",
    index: 3,
    color: [
      "#ffa200",
      "#e99700",
      "#d28c00",
      "#bc8000",
      "#a67500",
      "#8f6a00",
      "#795f00",
      "#635300",
      "#4c4800",
      "#363d00",
    ],
    min: 0,
    max: 180,
  },
  "CO": {
    name: "CO",
    index: 4,
    color: [
      "#00fbff",
      "#12eae3",
      "#23d9c6",
      "#35c9aa",
      "#46b88e",
      "#58a771",
      "#699655",
      "#7b8639",
      "#8c751c",
      "#9e6400",
    ],
    min: 0,
    max: 8,
  },
  "O3": {
    name: "O3",
    index: 5,
    color: [
      "#ffffff",
      "#e3f7e4",
      "#c6eec9",
      "#aae6ae",
      "#8edd93",
      "#71d578",

    ],
    min: 0,
    max: 215,
  },
  "TEMP": {
    name: "TEMP",
    index: 8,
    color: [
      "#313695",
      "#4575b4",
      "#74add1",
      "#abd9e9",
      "#e0f3f8",
      "#fdae61",
      "#f46d43",
    ],
    min: 250,
    max: 300,
  },
  "RH": {
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
  "PSFC": {
    name: "PSFC",
    index: 10,
    color: [
      "#59ff00",
      "#50e900",
      "#46d400",
      "#3dbe00",
      "#33a900",
      "#2a9300",
      "#207e00",
    ],
    min: 35000,
    max: 110000,
  },
  "AQI": {
    name: "AQI",
    index: 17,
    color: [
      "#00ff59",
      "#1cea57",
      "#38d655",
      "#54c153",
      "#70ad51",
      "#8b984e",
      "#a7844c",
      "#c36f4a",
      "#df5b48",
      "#fb4646",
    ],
    min: 10,
    max: 300,
  },
}

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
// 初始化全国地图，这里是异步！！！所以不能直接在这里加载地图
fetch("china.json").then((response) => response.json()).then((data) => {
  echarts.registerMap("china", data); // 注册地图数据
  drawMap("TEMP", "2013-01-01");

})

function drawProvinceMap(province_name, attr) {

  Promise.all([
    fetch(`province_map/${province_name}.json`).then((res) => res.json()),
    fetch(`dataset/CN-Reanalysis-daily-${currentDate.replace('-', '').replace('-', '')}00.csv`).then((response) =>
      response.text()
    ),
  ]).then(([provinceGeoJson, csvData]) => {
    var rows = csvData.split("\n");
    var provinceData = [];
    let index = option_diff[attr].index;

    for (let i = 1; i < rows.length - 1; i++) {
      var row = rows[i].split(",");
      if (row[13].includes(province_name)) {
        provinceData.push([
          parseFloat(row[12]), // longitude
          parseFloat(row[11]), // latitude
          parseFloat(row[index]),
        ]);
      }
    }

    echarts.registerMap(provinceToEnglish[province_name], provinceGeoJson); // 注册地图数据
    option_map.series[0].blurSize = 10
    option_map.series[0].pointSize = 5
    option_map.series[0].data = provinceData
    option_map.title.text = attr
    option_map.geo.map = provinceToEnglish[province_name]
    option_map.visualMap.min = option_diff[attr].min;
    option_map.visualMap.max = option_diff[attr].max;
    option_map.visualMap.inRange.color = option_diff[attr].color;
    chinaMap.setOption(option_map);

    chinaMap.on("click", function (item) {
      console.log(item)
      pName = item.name;
      console.log(pName)

      setControllor(currentDate, pName);
    });
  });
}

function drawMap(attr, date) {
  if(attr == null){
    attr = temattr
  }
  currentDate = date
  fetch(`dataset/CN-Reanalysis-daily-${date.replace('-', '').replace('-', '')}00.csv`).then((response) =>
    response.text()
  ).then((csvData) => {
    let data = [];
    let index = option_diff[attr].index;
    let temIndex = option_diff[attr].temIndex;
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
    option_map.series[0].data = data;
    option_map.series[0].blurSize = 1
    option_map.series[0].pointSize = 1
    option_map.title.text = attr
    option_map.visualMap.inRange.color = option_diff[attr].color
    option_map.visualMap.min = option_diff[attr].min;
    option_map.visualMap.max = option_diff[attr].max;
    option_map.geo.map = "china"
    chinaMap.setOption(option_map);
    /**
     * 设置地图省份下钻点击事件
     */
    chinaMap.on("dblclick", function (item) {
      flag = 0;
      pName = item.name;
      drawProvinceMap(pName, attr, temIndex);
    });

    chinaMap.on("click", function (item) {
      pName = item.name;
      setControllor(currentDate, pName);
    });
  });
}


const buttonMapping = {
  temperature: "TEMP",
  humidity: "RH",
  wind: "WIND", // 假设有一个风速属性"WIND"，请根据实际情况调整
  pressure: "PSFC",
  donut1: "PM2.5",
  donut2: "PM10",
  donut3: "SO2",
  donut4: "NO2",
  donut5: "CO",
  donut6: "O3",
  aqi: "AQI",
};

Object.keys(buttonMapping).forEach((key) => {
  document.getElementById(key).addEventListener("click", function () {
    if (flag == 1) {
      drawMap(buttonMapping[key], currentDate);
      temattr = buttonMapping[key];
    } else {
      drawProvinceMap(pName, buttonMapping[key]);
      temattr = buttonMapping[key];
    }
  });
});

document.getElementById("change").addEventListener("click", function () {
  if (flag == 0) {
    flag = 1;
    drawMap(temattr, date);
  }
});

