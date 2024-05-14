var radarChart = echarts.init(document.getElementById("radarChart"));
setRadar("北京", "2013-01-01");
var radarOption = {
  // backgroundColor: "#404a59",
  tooltip: {
    triger: "axis",
    position: 'right',
    extraCssText: 'width:150px;height:auto;background-color:rgba(0,0,0,0.3);color:#fff',
   formatter: function (params) {
     //params[0].name表示x轴数据
     let str = params.data[6] +'    '+params.data[7]+ '<br/>'
     //设置浮层图形的样式跟随图中展示的颜色
       str += "<span style='display:inline-block;width:10px;height:10px;border-radius:10px;background-color:gold;'></span>" + "\t" + "AQI : " + params.data[0].toString() + "<br/>";
       str += "<span style='display:inline-block;width:10px;height:10px;border-radius:10px;background-color:gold;'></span>" + "\t" + "PM2.5 : " + params.data[1].toString() + "<br/>";
       str += "<span style='display:inline-block;width:10px;height:10px;border-radius:10px;background-color:gold;'></span>" + "\t" + "PM10 : " + params.data[2].toString() + "<br/>";
       str += "<span style='display:inline-block;width:10px;height:10px;border-radius:10px;background-color:gold;'></span>" + "\t" + "SO2 : " + params.data[3].toString() + "<br/>";
       str += "<span style='display:inline-block;width:10px;height:10px;border-radius:10px;background-color:gold;'></span>" + "\t" + "NO2 : " + params.data[4].toString() + "<br/>";
       str += "<span style='display:inline-block;width:10px;height:10px;border-radius:10px;background-color:gold;'></span>" + "\t" + "CO : " + params.data[5].toString() + "<br/>";
     return str
   },
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
      fontSize: '0.8rem',
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
    splitLine: {
      lineStyle: {
        color: 'rgba(211, 253, 250, 0.8)'
      }
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
      emphasis: {
        lineStyle: {
          width: 3
        }
      },
      data: [],
      symbol: "none",
      itemStyle: {
        color: "#F9713C",
      },
      // areaStyle: {
      //   opacity: 0,
      // },
    },
  ],
};

function setRadar(province, date) {
  radarChart.setOption(
    {
      series: [{
        data: []
      }]
    }
  );
  var name = provinceSimp2All[province];
  fetch(`data/province_daily/${name}/${name}.csv`)
    .then((response) => response.text())
    .then((data) => {
      /**
       * 获取数据
       */
      var dataArray = data.split("\n");
      var chartData = [];
      var maxValues = [0, 0, 0, 0, 0, 0]; // 存储每个指标的最大值

      for (let i = 1; i < dataArray.length - 1; i++) {
        var row = dataArray[i].split(",");

        if (row[1].slice(0, 10) == date.slice(0, 10)) {
          for( let j = 0; j < 6; j++ ) {
            row = dataArray[i+j].split(",");
            var values = [
              parseInt(row[13]),
              parseFloat(row[2]),
              parseFloat(row[3]),
              parseFloat(row[4]),
              parseFloat(row[5]),
              parseFloat(row[6]),
              row[0],
              row[1],
            ];
            chartData.push(values);
  
            // 更新每个指标的最大值
            for (let j = 0; j < values.length; j++) {
              if (values[j] > maxValues[j]) {
                maxValues[j] = values[j] * 1.2;
              }
            }
          }
          console.log(row[1].slice(0, 9));
          
        }
      }

      // 更新 indicator 的 max 属性
      for (let i = 0; i < radarOption.radar.indicator.length; i++) {
        radarOption.radar.indicator[i].max = maxValues[i];
      }

      radarOption.series[0].name = province;
      radarOption.series[0].data = chartData;
      radarChart.setOption(radarOption);
    });
}
