var chartDom = document.getElementById("heatChart");
var heatChart = echarts.init(chartDom);

var heatChart_option = {
  // backgroundColor: "#404a59",
  tooltip: {
    position: "top",
    formatter: function (params) {
      // console.log(params)
      let res = ''
      let series = params;
      res += series.marker + series.seriesName + " " + (series.data[1] + 1) + "月" + series.data[0] + "日" + "：" + series.data[2];

      return res;
    },
  },
  grid: {
    height: "85%",
    right: "5%",
    top: "5%",
    left: "15%",
  },
  xAxis: {
    type: "category",
    data: days,
    splitArea: {
      show: true,
    },
    // axisLabel: {
    //   color: "#fff",
    // },
  },
  yAxis: {
    type: "category",
    data: months,
    splitArea: {
      show: true,
    },
    // axisLabel: {
    //   color: "#fff",
    // },
  },
  series: [
    {
      name: "Punch Card",
      type: "heatmap",
      data: [],
      label: {
        show: false,
      },
      itemStyle: {
        normal: {
          color: function (params) {
            if (params.data[2] < 50) {
              return "rgba(80, 200, 80, 0.4)"; // shallow green
            } else if (params.data[2] <= 100) {
              return "rgba(20, 169, 20, 0.4)"; // shallow yellow
            } else if (params.data[2] <= 150) {
              return "rgba(255, 165, 60, 0.5)"; // orange
            } else if (params.data[2] <= 200) {
              return "rgba(255, 165, 0, 0.7)"; // orange
            } else if (params.data[2] <= 300) {
              return "rgba(255, 70, 70, 0.7)"; // shallow red
            } else if (params.data[2] <= 400) {
              return "rgba(255, 0, 0, 0.8)"; // red
            } else {
              return "rgba(255, 0, 0, 1)"; // red
            }
          },
        },
      },
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};
heatChart.setOption(heatChart_option);

async function setheatChart(place, type) {
  let result = await getTypeData_Province_year(
    place,
    current_date.slice(0, 4),
    type
  );
  result = result.map(function (item) {
    return [
      parseInt(item[0].slice(8, 10)) - 1,
      parseInt(item[0].slice(5, 7)) - 1,
      item[1] || "-",
    ];
  });
  heatChart_option.series[0].data = result;
  heatChart_option.series[0].name = place;

  heatChart.setOption(heatChart_option);
}

setheatChart(current_province, "AQI");
