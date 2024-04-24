var radarChart = echarts.init(document.getElementById("radarChart"));
setRadar("北京", "2013-01-01");
var radarOption = {
  backgroundColor: "#404a59",
  tooltip: {
    triger: "item",
    position:'right',
  },
  radar: {
    indicator: [
      { name: "AQI", max: 300 },
      { name: "PM2.5", max: 250 },
      { name: "PM10", max: 300 },
      { name: "SO2", max: 100 },
      { name: "NO2", max: 200 },
      { name: "CO", max: 5 },
    ],
    shape: "circle",
    splitNumber: 10,
    axisName: {
      fontSize: 8,
      color: "rgb(238, 197, 102)",
    },
    splitLine: {
      lineStyle: {
        color: [
          "rgba(238, 197, 102, 0.1)",
          "rgba(238, 197, 102, 0.2)",
          "rgba(238, 197, 102, 0.4)",
          "rgba(238, 197, 102, 0.6)",
          "rgba(238, 197, 102, 0.8)",
          "rgba(238, 197, 102, 1)",
        ].reverse(),
      },
    },
    splitArea: {
      show: false,
    },
    axisLine: {
      lineStyle: {
        color: "rgba(238, 197, 102, 0.5)",
      },
    },
  },
  series: [
    {
      name: "Beijing",
      type: "radar",
      lineStyle: {
        width: 1,
        opacity: 0.5,
      },
      data: [],
      symbol: "none",
      itemStyle: {
        color: "#F9713C",
      },
      areaStyle: {
        opacity: 0.1,
      },
    },
  ],
};
function setRadar(province, date) {
  radarChart.clear();
  var name = provinceSimp2All[province];
  fetch(`data/province_daily/${name}/${name}.csv`)
    .then((response) => response.text())
    .then((data) => {
      /**
       * 获取数据
       */
      var dataArray = data.split("\n");
      var chartData = [];
      for (let i = 1; i < dataArray.length - 1; i++) {
        var row = dataArray[i].split(",");

        if (row[1].slice(0, 7) == date.slice(0, 7)) {
          chartData.push([
            parseInt(row[13]),
            parseFloat(row[2]),
            parseFloat(row[3]),
            parseFloat(row[4]),
            parseFloat(row[5]),
            parseFloat(row[6]),
          ]);
        }
      }
      radarOption.series[0].name = province;
      radarOption.series[0].data = chartData;
      radarChart.setOption(radarOption);
    });
}
