// 初始化Echarts实例
var myChart = echarts.init(document.getElementById("box2"));
var province = document.getElementById("province");
var province_name = "北京";
var change_button = document.getElementById("change");
let flag = 1;
var date = "2013-01-01";
var data = [];
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
  flag = 0;
  province_name = item.name;
  setControllor(date, province_name)
  fetch(`province_map/${province_name}.json`)
    .then(function (res) {
      return res.json();
    })
    .then(function (provinceGeoJson) {
      // console.log(provinceToEnglish[province_name]);
      // 绘制地图
      echarts.registerMap(provinceToEnglish[province_name], provinceGeoJson); // 注册地图数据
      myChart.clear()
      myChart.setOption({
        series: [
          {
            type: "map",
            map: provinceToEnglish[province_name], // 使用注册的地图数据
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
});
change_button.addEventListener("click", function () {
  if (flag == 0) {
    flag = 1;
    fetch("china.json")
      .then(function (res) {
        return res.json();
      })
      .then(function (chinaGeoJson) {
        // 隐藏加载动画
        // myChart.hideLoading();
        myChart.clear()

        // 绘制地图
        echarts.registerMap("china", chinaGeoJson); // 注册地图数据
        myChart.setOption({
          series: [
            {
              type: "map",
              // center: ["50%", "45%"],

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
  }
});
