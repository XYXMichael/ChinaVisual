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
var change_button = document.getElementById("change");
var pName = "";
var temIndex = 0;
let tempdata = [];
let temattr = [];
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
    color: [
      "#fff700",
      "#e9e200",
      "#d4ce00",
      "#beb900",
      "#a8a400",
      "#939000",
      "#7d7b00",
      "#676600",
      "#525200",
      "#3c3d00",
    ],
    min: 0,
    max: 200,
  },
  {
    name: "SO2",
    index: 2,
    color: [
      "#ff00ae",
      "#e900a0",
      "#d40092",
      "#be0085",
      "#a90077",
      "#930069",
      "#7e005b",
      "#68004e",
      "#530040",
      "#3d0032",
    ],
    min: 0,
    max: 200,
  },
  {
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
    max: 100,
  },
  {
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
    max: 2,
  },
  {
    name: "O3",
    index: 5,
    color: [
      "#ffffff",
      "#e3f7e4",
      "#c6eec9",
      "#aae6ae",
      "#8edd93",
      "#71d578",
      "#55cc5d",
      "#39c442",
      "#1cbb27",
      "#00b30c",
    ],
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
  {
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
    max: 380,
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
function drawProvinceMap(province_name, attr) {
  chinaMap.clear();
  Promise.all([
    fetch(`../province_map/${province_name}.json`).then((res) => res.json()),
    fetch("../dataset/CN-Reanalysis-daily-2013010100.csv").then((response) =>
      response.text()
    ),
  ]).then(([provinceGeoJson, csvData]) => {
    var rows = csvData.split("\n");
    var provinceData = [];
    let index = 0;
    for (let i = 0; i < dataIndex.length; i++) {
      if (dataIndex[i].name == attr) {
        index = dataIndex[i].index;
      }
    }
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
    tempdata = provinceData;
    console.log(attr);
    console.log("省份数据：", provinceData);
    echarts.registerMap(provinceToEnglish[province_name], provinceGeoJson); // 注册地图数据
    chinaMap.setOption(
      getOption(provinceToEnglish[province_name], attr, provinceData)
    );
  });
}

function drawMap(attr, date) {
  let data = [];
  let index = 0;
  for (let i = 0; i < dataIndex.length; i++) {
    if (dataIndex[i].name == attr) {
      index = dataIndex[i].index;
      temIndex = index;
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
    temattr = attr;
    tempdata = data;
    // 绘制地图
    echarts.registerMap("china", chinaGeoJson); // 注册地图数据

    chinaMap.setOption(getOption("china", attr, data));
    /**
     * 设置地图省份下钻点击事件
     */
    chinaMap.on("dblclick", function (item) {
      flag = 0;
      console.log(item);
      pName = item.name;
      setControllor("2013-01-01", pName);
      drawProvinceMap(pName, attr, temIndex);
    });

    chinaMap.on("click", function (item) {
      flag = 0;
      pName = item.name;
      setControllor("2013-01-01", pName);
    });
  });
}
change_button.addEventListener("click", function () {
  if (flag == 0) {
    flag = 1;
    drawMap(temattr, date);
  }
});
/**
 * 根据对应的属性和数据设置option
 * @param {*} attr
 * @param {*} data
 * @returns
 */
function getOption(name, attr, data) {
  let min = 0;
  let max = 0;
  let blur = 0;
  let pointsize = 0;
  let color = [];
  for (let i = 0; i < dataIndex.length; i++) {
    if (dataIndex[i].name == attr) {
      color = dataIndex[i].color;
      min = dataIndex[i].min;
      max = dataIndex[i].max;
    }
  }
  if (name == "china") {
    blur = 4;
    pointsize = 1;
  } else {
    blur = 10;
    pointsize = 5;
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
      map: name,
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
        pointSize: pointsize,
        blurSize: blur,
      },
    ],
  };
  return option;
}
drawMap("TEMP", "20130101");
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
    chinaMap.clear();
    if (flag == 1) {
      drawMap(buttonMapping[key], "20130101");
      temattr = buttonMapping[key];
    } else {
      drawProvinceMap(pName, buttonMapping[key]);
      temattr = buttonMapping[key];
    }
  });
});
