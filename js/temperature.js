var tempData = [];
var tempMap = echarts.init(document.getElementById("box2"));
// 使用 Promise.all 等待所有数据加载完成
Promise.all([
  fetch("exampledata.csv").then((response) => response.text()),
  fetch("china.json").then((response) => response.json()),
]).then(([csvData, chinaGeoJson]) => {
  var rows = csvData.split("\n");
  for (var i = 1; i < rows.length; i++) {
    var row = rows[i].split(",");
    tempData.push([
      parseFloat(row[12]), // longitude
      parseFloat(row[11]), // latitude
      parseFloat(row[8])-273.15, // temperature
    ]);
  }
  console.log(tempData)
  // 绘制地图
  echarts.registerMap("china", chinaGeoJson); // 注册地图数据
  var option = {
	innerWidth: 100, // 调整热力图大小
	innerHeight: 100,
    backgroundColor: "#404a59",
	title: {
	  text: "温度热力图",
	  left: "center",
	},
	geo: {
	  map: "china",
	  label: {
		show: false,
		color: '#4a4a4a' // 调整省份标签的颜色
	  },
	  itemStyle: {
		borderColor: '#fff', // 边界线条颜色
		borderWidth: 1 // 边界线条宽度
	  }
	},
	tooltip: {
	  trigger: 'item',
	  formatter: '{b}<br/>温度: {c} °C'
	},
	visualMap: {
	  min: -50,
	  max: 50,
	  calculable: true,
	  orient: "vertical",
	  left: "left",
	  top: "bottom",
	  inRange: {
		color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
	  },
	},
	series: [
	  {
		type: "heatmap",
		coordinateSystem: "geo",
		data: tempData,
		pointSize: 1,
          blurSize: 4
	  },
	],
  };
  tempMap.setOption(option);
});
