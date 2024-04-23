var stackChart = echarts.init(document.getElementById("stackChart"));
setStackChart("上海");
/**
 * 设置堆叠图表
 *
 * @param province 省份名称
 */
function setStackChart(province) {
  stackChart.clear();
  console.log(province);
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
      var stackOption = {
        color: [
          "#6000ae",
          "#fec325",
          "#e900a0",
          "#8f6a00",
          "#35c9aa",
          "#71d578",
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
        },
        legend: {
          data: ["PM2.5", "PM10", "CO", "NO2", "SO2", "O3"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: dateArray,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(96, 0, 174)",
                },
                {
                  offset: 1,
                  color: "rgb(135, 150, 150)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: pm25Array,
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(254, 195, 37)",
                },
                {
                  offset: 1,
                  color: "rgb(85, 20, 34)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: pm10Array,
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(233,0,160)",
                },
                {
                  offset: 1,
                  color: "rgb(152, 56, 53)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: coArray,
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(143,106,0)",
                },
                {
                  offset: 1,
                  color: "rgb(92, 119, 129)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: no2Array,
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(53,201,170)",
                },
                {
                  offset: 1,
                  color: "rgb(14, 33, 170)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: so2Array,
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(113,213,120)",
                },
                {
                  offset: 1,
                  color: "rgb(218, 222, 61)",
                },
              ]),
            },
            emphasis: {
              focus: "series",
            },
            data: o3Array,
          },
        ],
      };
      stackChart.setOption(stackOption);
    });
}
