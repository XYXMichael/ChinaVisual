var chinaMap = echarts.init(document.getElementById("box2"));
let temIndex = 0;

function getPointSize(value) {
  if (value > 40000) return 1;
  else if (value > 10000) return 3;
  else if (value > 5000) return 3;
  else if (value > 3000) return 4;
  else if (value > 2000) return 5;
  else if (value > 1000) return 7;
  else if (value > 500) return 8;
  else if (value > 400) return 9;
  else if (value > 200) return 6;
  else if (value > 100) return 2;
  else return 24
}
function getBlurSize(value) {
  if (value > 40000) return 4;
  else if (value > 10000) return 3;
  else if (value > 5000) return 5;
  else if (value > 3000) return 5;
  else if (value > 2000) return 5;
  else if (value > 1000) return 5;
  else if (value > 500) return 4;
  else if (value > 400) return 6;
  else if (value > 200) return 4;
  else if (value > 100) return 2;
  else return 15

}

var option_map = {
  backgroundColor: "#404a59",
  title: {
    text: "TEMP",
    show: true,
    top: 20, // 将标题距离顶部 20 像素
    textStyle: {
      fontSize: 18,
      color: "#fff", // 设置标题文字颜色为白色
      fontSize: "3rem",
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
    zoom: 1,
    scaleLimit: {
      max: 2,
      min: 0.5,
    },
    roam: false,
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
      colorAlpha: 0.9,
    },
    precision: 2,
  },
  series: [
    {
      type: "heatmap",
      coordinateSystem: "geo",
      zoom: 1,
      data: [],
      pointSize: 1,
      blurSize: 4,
      minOpacity: 0.1,
      maxOpacity: 0.8,
    },
  ],
};

const option_diff = {
  "PM2.5": {
    name: "PM2.5",
    index: 0,
    color: [
      "#ffffff",
      "#b499d4",
      "#a766c0",
      "#7a33b0",
      "#6000ae",
      "#400090",
      "#200070",
    ],
    min: -2,
    max: 350,
  },
  PM10: {
    name: "PM10",
    index: 1,
    color: [
      "#ffffff",
      "#e4dedd",
      "#dfd795",
      "#ebde6f",
      "#fee725",
      "#fec325",
      "#fea925",
      "#fe5825",
    ],
    min: -10,
    max: 350,
  },
  SO2: {
    name: "SO2",
    index: 2,
    color: [
      "#ffffff",
      "#f5cce0",
      "#f0aad0",
      "#e055b0",
      "#e900a0",
      "#be0085",
      "#7e005b",
    ],
    min: -10,
    max: 200,
  },
  NO2: {
    name: "NO2",
    index: 3,
    color: [
      "#ffffff",
      "#e9e7da",
      "#d2aca7",
      "#bc8055",
      "#a67522",
      "#8f6a00",
      "#795f00",
      "#635300",
      "#363d00",
    ],
    min: -1,
    max: 180,
  },
  CO: {
    name: "CO",
    index: 4,
    color: [
      "#ffffff",
      "#72faf3",
      "#23d9c6",
      "#35c9aa",
      "#699655",
      "#8c751c",
      "#9e6400",
    ],
    min: -0.5,
    max: 16,
  },
  O3: {
    name: "O3",
    index: 5,
    color: ["#ffffff", "#e3f7e4", "#c6eec9", "#aae6ae", "#8edd93", "#71d578"],
    min: 0,
    max: 215,
  },
  TEMP: {
    name: "TEMP",
    index: 8,
    color: ["#313695", "#4575b4", "#74add1", "#abd9e9", "#fdae61", "#f46d43"],
    min: 230,
    max: 320,
  },
  RH: {
    name: "RH",
    index: 9,
    color: [
      "#aac3ff",
      "#88b2e9",
      "#77a0d4",
      "#558fbe",
      "#337ea9",
      "#116c93",
      "#004b7e",
      "#003a68",
    ],
    min: 0,
    max: 100,
  },
  PSFC: {
    name: "PSFC",
    index: 10,
    color: ["#b9ffdd", "#a0e9bb", "#86d4aa", "#7dbe66", "#53a944", "#2a9322"],
    min: 35000,
    max: 110000,
  },
  AQI: {
    name: "AQI",
    index: 17,
    color: ["#daffd9", "#8ceaa7", "#94c153", "#f0ad51", "#ff5b48", "#ff3646"],
    min: 0,
    max: 300,
  },
};

// 初始化全国地图，这里是异步！！！所以不能直接在这里加载地图
fetch("china.json")
  .then((response) => response.json())
  .then((data) => {
    echarts.registerMap("china", data); // 注册地图数据
    drawMap(current_attr, current_date);
  });

function drawProvinceMap(province_name, attr) {
  console.log(province_name, attr)
  Promise.all([
    fetch(`province_map/${province_name}.json`).then((res) => res.json()),
    fetch(
      `data/origin/CN-Reanalysis-daily-${current_date
        .replace("-", "")
        .replace("-", "")}00.csv`
    ).then((response) => response.text()),
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
    option_map.series[0].blurSize = getBlurSize(provinceData.length);
    option_map.series[0].pointSize = getPointSize(provinceData.length);
    option_map.series[0].data = provinceData;
    option_map.title.text = attr;
    option_map.geo.map = provinceToEnglish[province_name];
    option_map.visualMap.min = option_diff[attr].min;
    option_map.visualMap.max = option_diff[attr].max;
    option_map.visualMap.inRange.color = option_diff[attr].color;
    chinaMap.setOption(option_map);
    chinaMap.off("click");
    chinaMap.off("dblclick");
    chinaMap.on("click", function (item) {
      current_city = item.name;
      setControllor(current_date, current_city);
    });
  });
}

function drawMap(attr, date) {
  if (attr == null) {
    attr = current_attr;
  }
  current_date = date;
  fetch(
    `data/origin/CN-Reanalysis-daily-${date
      .replace("-", "")
      .replace("-", "")}00.csv`
  )
    .then((response) => response.text())
    .then((csvData) => {
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
      // console.log(data.length);
      // 绘制地图
      option_map.series[0].data = data;
      option_map.series[0].blurSize = getBlurSize(data.length);
      option_map.series[0].pointSize = getPointSize(data.length);
      option_map.title.text = attr;
      option_map.visualMap.inRange.color = option_diff[attr].color;
      option_map.visualMap.min = option_diff[attr].min;
      option_map.visualMap.max = option_diff[attr].max;
      option_map.geo.map = "china";
      chinaMap.setOption(option_map);
      /**
       * 设置地图省份下钻点击事件
       */

      chinaMap.on("dblclick", function (item) {
        is_province = true;
        current_province_abbr = item.name;
        drawProvinceMap(current_province_abbr, attr, temIndex);
        setProvinceTogether(
          provinceSimp2All[current_province_abbr],
          current_date,
          "AQI"
        );
        current_city =
          province2Capitals[provinceSimp2All[current_province_abbr]];
        setControllor(date, current_city);
      });

      chinaMap.on("click", function (item) {
        current_province_abbr = item.name;
        setControllor(current_date, current_province_abbr);
        setStackChart(current_province_abbr);
        setheatChart(current_province, "AQI")
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
    if (is_province == 0) {
      drawMap(buttonMapping[key], current_date);
      current_attr = buttonMapping[key];
    } else {
      drawProvinceMap(current_province_abbr, buttonMapping[key]);
      current_attr = buttonMapping[key];
    }
  });
});

document.getElementById("change").addEventListener("click", function () {
  if (is_province == true) {
    is_province = false;
    drawMap(current_attr, date);
    setTogether(current_date, current_attr);
    setControllor(date, current_province_abbr);
  }
});
