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



// // 加载地图数据
// myChart.showLoading(); // 显示加载动画
// fetch("china.json")
//   .then(function (res) {
//     return res.json();
//   })
//   .then(function (chinaGeoJson) {
//     // 隐藏加载动画
//     myChart.hideLoading();

//     // 绘制地图
//     echarts.registerMap("china", chinaGeoJson); // 注册地图数据
//     myChart.setOption({
//       series: [
//         {
//           type: "map",
//           map: "china", // 使用注册的地图数据
//           roam: true, // 允许缩放和平移漫游
//           // 设置缩放的比例
//           zoom: 1.2,
//           // 设置缩放的限制
//           scaleLimit: {
//             min: 1,
//             max: 10,
//           },
//         },
//       ],
//     });
//   });

// myChart.on("click", function (item) {
//   flag = 0;
//   province_name = item.name;
//   getData();
//   fetch(`province_map/${province_name}.json`)
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (provinceGeoJson) {
//       // console.log(provinceToEnglish[province_name]);
//       // 绘制地图
//       echarts.registerMap(provinceToEnglish[province_name], provinceGeoJson); // 注册地图数据
//       myChart.clear()
//       myChart.setOption({
//         series: [
//           {
//             type: "map",
//             map: provinceToEnglish[province_name], // 使用注册的地图数据
//             roam: true, // 允许缩放和平移漫游
//             // 设置缩放的比例
//             zoom: 1.2,
//             // 设置缩放的限制
//             scaleLimit: {
//               min: 1,
//               max: 10,
//             },
//           },
//         ],
//       });
//     });
// });

