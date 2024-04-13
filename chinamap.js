// 初始化Echarts实例
var myChart = echarts.init(document.getElementById("box2"));
var province = document.getElementById("province");
var province_name = "北京"
var date = '2013-01-01';
var data = [];
var option = {
  series: [
    {
      type: 'gauge',
      center: ['50%', '45%'],
      startAngle: 210,
      endAngle: -30,
      min: 0,
      max: 60,
      splitNumber: 12,
      itemStyle: {
        color: function (params) {
          console.log(params)
          var max = 80; // 最大值
          var value = params.value;
          var ratio = value / max;
          var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
          var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
          var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0
          console.log(`rgb(${r}, ${g}, ${b})`);
          return `rgb(${r}, ${g}, ${b})`;
        }
      },
      progress: {
        show: true,
        width: 5,
        roundCap: true,
      },
      pointer: {
        show: false
      },
      axisLine: {
        roundCap: true,
        lineStyle: {
          width: 5,
          cap: 'square',
          join: 'round'
        },
        show: true,

      },
      axisTick: {
        show: false
      },
      splitLine: {
        show: false
      },
      axisLabel: {
        show: false
      },
      anchor: {
        show: false
      },
      title: {
        show: true,
        fontSize: 8,
        offsetCenter: [0, '85%'],

      },
      detail: {
        valueAnimation: true,
        width: '60%',
        lineHeight: 40,
        borderRadius: 8,
        offsetCenter: [0, '-1%'],
        fontSize: 8,
        fontWeight: 'bolder',
        formatter: '{value}',
        color: 'inherit'
      },
      data: [
        {
          value: 20,
          name: 'Grade Rating'
        }
      ]
    }
  ]
};


let donutChart1 = echarts.init(document.getElementById("donut1"));
let donutChart2 = echarts.init(document.getElementById("donut2"));
let donutChart3 = echarts.init(document.getElementById("donut3"));
let donutChart4 = echarts.init(document.getElementById("donut4"));
let donutChart5 = echarts.init(document.getElementById("donut5"));
let donutChart6 = echarts.init(document.getElementById("donut6"));

donutChart1.setOption(option)
donutChart2.setOption(option)
donutChart3.setOption(option)
donutChart4.setOption(option)
donutChart5.setOption(option)
donutChart6.setOption(option)

function calculateWindDirection(u, v) {
  var windAngle = Math.atan2(u, v) * (180 / Math.PI);
  windAngle = (windAngle + 360) % 360; // 转换为0-360度范围内的角度
  console.log(u)
  // 返回风向的字符串描述
  if (windAngle >= 337.5 || windAngle < 22.5) {
    return "北风";
  } else if (windAngle >= 22.5 && windAngle < 67.5) {
    return "东北风";
  } else if (windAngle >= 67.5 && windAngle < 112.5) {
    return "东风";
  } else if (windAngle >= 112.5 && windAngle < 157.5) {
    return "东南风";
  } else if (windAngle >= 157.5 && windAngle < 202.5) {
    return "南风";
  } else if (windAngle >= 202.5 && windAngle < 247.5) {
    return "西南风";
  } else if (windAngle >= 247.5 && windAngle < 292.5) {
    return "西风";
  } else if (windAngle >= 292.5 && windAngle < 337.5) {
    return "西北风";
  } else {
    return "";
  }
}


function updateControl(data) {
  let aqi = data[0];
  let wind = data[1];
  let temperature = data[2];
  let humidity = data[3];
  let pressure = data[4];

  let pm25 = data[5];
  let pm10 = data[6];
  let so2 = data[7];
  let no2 = data[8];
  let co = data[9];
  let o3 = data[10];

  let name = data[11];

  province.textContent = name;
  document.getElementById("aqi").textContent = "AQI " + aqi.toString().slice(0, 6);
  document.getElementById("wind").textContent = wind.toString().slice(0, 6) + "m/s";
  document.getElementById("temperature").textContent = temperature.toString().slice(0, 5) + " ℃";
  document.getElementById("humidity").textContent = humidity.toString().slice(0, 6) + " %";
  document.getElementById("pressure").textContent = pressure.toString().slice(0, 5) + " Pa";

  donutChart1.setOption({
    series: [{
      max: 300,
      data: [
        {
          value: pm25.toString().slice(0, 6),
          name: 'PM2.5'
        }
      ], itemStyle: {
        color: function (params) {
          var max = 300; // 最大值
          var value = params.value;
          var ratio = value / max;
          var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
          var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
          var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0
          console.log(`rgb(${r}, ${g}, ${b})`);
          return `rgb(${r}, ${g}, ${b})`;
        }
      },
    }]
  });

  donutChart2.setOption({
    series: [{
      max: 300,
      data: [
        {
          value: pm10.toString().slice(0, 6),
          name: 'PM10'
        }
      ],
      itemStyle: {
        color: function (params) {
          var max = 300; // 最大值
          var value = params.value;
          var ratio = value / max;
          var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
          var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
          var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0
          console.log(`rgb(${r}, ${g}, ${b})`);
          return `rgb(${r}, ${g}, ${b})`;
        }
      },
    }]
  });

  donutChart3.setOption({
    series: [{
      max: 1200,
      data: [
        {
          value: so2.toString().slice(0, 6),
          name: 'SO2'
        }
      ], itemStyle: {
        color: function (params) {
          var max = 1200; // 最大值
          var value = params.value;
          var ratio = value / max;
          var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
          var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
          var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0
          console.log(`rgb(${r}, ${g}, ${b})`);
          return `rgb(${r}, ${g}, ${b})`;
        }
      },
    }]
  });

  donutChart4.setOption({
    series: [{
      max: 470,
      data: [
        {
          value: no2.toString().slice(0, 6),
          name: 'NO2'
        }
      ],
      itemStyle: {
        color: function (params) {
          var max = 470; // 最大值
          var value = params.value;
          var ratio = value / max;
          var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
          var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
          var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0
          console.log(`rgb(${r}, ${g}, ${b})`);
          return `rgb(${r}, ${g}, ${b})`;
        }
      },
    }]
  });

  donutChart5.setOption({
    series: [{
      max: 30,
      data: [
        {
          value: co.toString().slice(0, 6),
          name: 'CO'
        }
      ]
    }]
  });

  donutChart6.setOption({
    series: [{
      max: 400,
      data: [
        {
          value: o3.toString().slice(0, 6),
          name: 'O3'
        }
      ], itemStyle: {
        color: function (params) {
          var max = 400; // 最大值
          var value = params.value;
          var ratio = value / max;
          var r = Math.floor(255 * ratio); // 红色分量从0过渡到255
          var g = Math.floor(205 * (1 - ratio)); // 绿色分量从255过渡到0
          var b = Math.floor(0 * (1 - ratio)); // 蓝色分量从204过渡到0
          console.log(`rgb(${r}, ${g}, ${b})`);
          return `rgb(${r}, ${g}, ${b})`;
        }
      },
    }]
  });
}

function getData() {
  fetch(`province_year/${province_name}/${date.slice(0, 4)}.csv`)
    .then(function (res) {
      return res.text();
    })
    .then(function (csvContent) {
      var rows = csvContent.split("\n");
      for (var i = 1; i < rows.length; i++) {
        var row = rows[i].split(",");
        if (row[1] === date) {
          data = []
          data.push(row[16]);
          data.push(calculateWindDirection(row[9], row[10]) + Math.sqrt(row[9] * row[9], row[10] * row[10]));
          data.push(row[11] - 272.15);
          data.push(row[12]);
          data.push(row[13]);
          data.push(row[3]);
          data.push(row[4]);
          data.push(row[5]);
          data.push(row[6]);
          data.push(row[7]);
          data.push(row[8]);
          data.push(province_name);

          updateControl(data)
          break;
        }
      }
    });
};

document.getElementById("date_title").addEventListener("change", function () {
  date = document.getElementById("date_title").children[0].value;
  getData();
});


getData()

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
  province_name = item.name
  getData()
  // console.log(data)
  // updateControl(data)
});

/**
 * 将csv文件里面的内容转换为对象数组
 * @param {*} Content
 */
function convert(Content, index) {
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
