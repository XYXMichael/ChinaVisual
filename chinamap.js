// 初始化Echarts实例
var myChart = echarts.init(document.getElementById("box2"));
var province = document.getElementById("province");

// 加载地图数据
myChart.showLoading(); // 显示加载动画
fetch("china.json")
  .then(function (res) {
    return res.json();
  })
  .then(function (chinaGeoJson) {
    // 隐藏加载动画
    myChart.hideLoading();

    // 绘制地图
    echarts.registerMap("china", chinaGeoJson); // 注册地图数据
    myChart.setOption({
      series: [
        {
          type: "map",
          map: "china", // 使用注册的地图数据
          roam: true, // 允许缩放和平移漫游
          // 设置缩放的比例
          zoom: 1.2,
          // 设置缩放的限制
          scaleLimit: {
            min: 1,
            max: 10,
          },
        },
      ],
    });
  });
myChart.on("click", function (item) {
  province.textContent = item.name;
  let donutChart = echarts.init(document.getElementById("donut"));
  fetch(`province_year/${item.name}/2013.csv`)
    .then(function (res) {
      return res.text();
    })
    .then(function (csvContent) {
        let Pm_25 = convert(csvContent, 3);
        let Pm_10 = convert(csvContent, 4);
        let SO2 = convert(csvContent, 5);
        let NO2 = convert(csvContent, 6);
        let CO = convert(csvContent, 7);
        let O3 = convert(csvContent, 8);
        // 使用ECharts生成六个环状图
let donutChart = echarts.init(document.getElementById("donut"));
donutChart.hideLoading();
console.log(Pm_25[0])
donutChart.setOption({
    title:[{
        text:"PM2.5",
    }
        
    ],
  series: [
    {
      name: "Pm_2.5",
      type: "pie",
      radius: ["30%", "40%"],
      center: ["50%", "50%"],
      data: [
        { value: Pm_25[0].pm25, name: "1" },
        { value: Pm_25[1].pm25, name: "2" },
      ],
    }
  ]
});
    });
});
/**
 * 将csv文件里面的内容转换为对象数组
 * @param {*} Content
 */
function convert(Content,index) {
  var dataCollection = [];
  var rows = Content.split("\n");

  // 遍历每一行并解析数据
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i].split(",");
    var date = row[1]; // 日期列的索引为1
    var pm25 = parseFloat(row[index]); // PM2.5列的索引为3

    // 创建一个对象来存储日期和PM2.5数据
    var dataEntry = {
      date: date,
      pm25: pm25,
    };

    // 将数据对象添加到集合中
    dataCollection.push(dataEntry);
  }
  return dataCollection;
}
