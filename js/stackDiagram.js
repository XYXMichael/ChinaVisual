var stackChart = echarts.init(document.getElementById("stackChart"));
var stackOption = {
  // backgroundColor: "#404a59",
  color: [
    "#A34343",
    "#E9C874",
    "#FF3BF0",
    "#C0D6E8",
    "#5BBCFF",
    "#FFD1E3",
  ],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      label: {
        backgroundColor: "#6a7985",
      },
    },
    fontStyle: {
      fontSize: '1rem'
    },
    formatter: function (params) {
      let res = params[0].axisValue + " " + current_province 
      if(is_province){
        res = params[0].axisValue + " " + current_province + current_city
      }
      
      for (let i = 0; i < params.length; i++) {
        let series = params[i];
        res += "<br/>" + series.marker + series.seriesName + ": " + series.data;
      }
      return res;
    },
  },
  legend: {
    data: ["PM2.5", "PM10", "CO", "NO2", "SO2", "O3"],
    orient: "vertical",
    top: "15%",
    left: "1%",
    textStyle: {
      // color: '#fff',
      fontSize: '1rem'
    },
  },
  grid: {
    innerHeight:'100%',
    left: "8%",
    right: "3%",
    bottom: "20%",
    top: "5%",
    containLabel: true,
  },
  xAxis: [
    {
      type: "category",
      data: [],
      axisLabel: {
        // color: "#fff",
        fontSize: '0.8rem'

      }
    },
  ],
  yAxis: [
    {
      type: "value",
      max: function (value) {
        return Math.ceil(value.max); // 设置最高高度为最大值的 1.2 倍
      },
      axisLabel: {
        // color: "#fff",
        fontSize: '0.8rem'

      }
    },
  ],
  
  dataZoom: [
    {
      type: 'inside',
      left:'8%',
      start: 0,
      end: 10,
    },
    {
      left:'8%',
      start: 0,
      end: 10,
    }
  ],
  series: [
    {
      name: "PM2.5",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: "rgb(96, 0, 174)",
        //   },
        //   {
        //     offset: 1,
        //     color: "rgb(135, 150, 150)",
        //   },
        // ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [],
    },
    {
      name: "PM10",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: "rgb(254, 195, 37)",
        //   },
        //   {
        //     offset: 1,
        //     color: "rgb(85, 20, 34)",
        //   },
        // ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [],
    },
    {
      name: "CO",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: "rgb(233,0,160)",
        //   },
        //   {
        //     offset: 1,
        //     color: "rgb(152, 56, 53)",
        //   },
        // ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [],
    },
    {
      name: "NO2",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: "rgb(143,106,0)",
        //   },
        //   {
        //     offset: 1,
        //     color: "rgb(92, 119, 129)",
        //   },
        // ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [],
    },
    {
      name: "SO2",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: "rgb(53,201,170)",
        //   },
        //   {
        //     offset: 1,
        //     color: "rgb(14, 33, 170)",
        //   },
        // ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [],
    },
    {
      name: "O3",
      type: "line",
      stack: "Total",
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        //   {
        //     offset: 0,
        //     color: "rgb(113,213,120)",
        //   },
        //   {
        //     offset: 1,
        //     color: "rgb(218, 222, 61)",
        //   },
        // ]),
      },
      emphasis: {
        focus: "series",
      },
      data: [],
    },
  ],
};
setStackChart("上海");

stackChart.setOption(stackOption);

/**
 * 设置堆叠图表
 *
 * @param province 省份名称
 */
function setStackChart(province) {
  // stackChart.clear();
  var name = provinceSimp2All[province];
  fetch(`data/province_daily/${name}/${name}.csv`)
    .then((response) => response.text())
    .then((data) => {
      /**
       * 获取数据
       */
      var dataArray = data.split("\n");
      var dateArray = [];
      var pm25Array = [];
      var pm10Array = [];
      var so2Array = [];
      var no2Array = [];
      var coArray = [];
      var o3Array = [];
      for (let i = 1; i < dataArray.length; i++) {
        var row = dataArray[i].split(",");
        dateArray.push(row[1]);
        pm25Array.push(parseInt(row[2]));
        pm10Array.push(parseFloat(row[3]));
        so2Array.push(parseFloat(row[4]));
        no2Array.push(parseFloat(row[5]));
        coArray.push(parseFloat(row[6]));
        o3Array.push(parseFloat(row[7]));
      }
      stackOption.xAxis[0].data = dateArray
      stackOption.series[0].data = pm25Array
      stackOption.series[1].data = pm10Array
      stackOption.series[2].data = so2Array
      stackOption.series[3].data = no2Array
      stackOption.series[4].data = coArray
      stackOption.series[5].data = o3Array

      stackChart.setOption(stackOption);
    });
}
/**
 * 绘制省份市区堆叠图
 * @param {*} province 省份
 * @param {*} city 市区
 */
function setCityStackChart(province,city) {
  // stackChart.clear();
  var name = provinceSimp2All[province];
  fetch(`data/province_city_daily/${province}/${city}.csv`)
    .then((response) => response.text())
    .then((data) => {
      /**
       * 获取数据
       */
      var dataArray = data.split("\n");
      var dateArray = [];
      var pm25Array = [];
      var pm10Array = [];
      var so2Array = [];
      var no2Array = [];
      var coArray = [];
      var o3Array = [];
      for (let i = 1; i < dataArray.length; i++) {
        var row = dataArray[i].split(",");
        dateArray.push(row[2]);
        pm25Array.push(parseInt(row[3]));
        pm10Array.push(parseFloat(row[4]));
        so2Array.push(parseFloat(row[5]));
        no2Array.push(parseFloat(row[6]));
        coArray.push(parseFloat(row[7]));
        o3Array.push(parseFloat(row[8]));
      }
      stackOption.xAxis[0].data = dateArray
      stackOption.series[0].data = pm25Array
      stackOption.series[1].data = pm10Array
      stackOption.series[2].data = so2Array
      stackOption.series[3].data = no2Array
      stackOption.series[4].data = coArray
      stackOption.series[5].data = o3Array

      stackChart.setOption(stackOption);
    });
}
