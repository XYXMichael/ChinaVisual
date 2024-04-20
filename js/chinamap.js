// 初始化Echarts实例
var myChart = echarts.init(document.getElementById("box2"));
var province = document.getElementById("province");
var province_name = "北京";
var change_button = document.getElementById("change");
var date = "2013-01-01";
var data = [];

var option = {
  series: [
    {
      type: "gauge",
      center: ["50%", "45%"],
      startAngle: 210,
      endAngle: -30,
      min: 0,
      max: 60,
      splitNumber: 12,
      itemStyle: {
        color: function (params) {
          var max = 80; // 最大值
          var value = params.value;
          var ratio = value / max;
          var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
          var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
          var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0

          return `rgb(${r}, ${g}, ${b})`;
        },
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
        fontSize: 8,
        offsetCenter: [0, "85%"],
      },
      detail: {
        valueAnimation: true,
        width: "60%",
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, "-1%"],
        fontSize: "0.9rem",
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

