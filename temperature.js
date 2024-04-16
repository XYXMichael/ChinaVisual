// 初始化地图
var map = new ol.Map({
	target: 'box3',
	layers: [
	  new ol.layer.Tile({
		source: new ol.source.OSM()
	  })
	],
	view: new ol.View({
	  center: ol.proj.fromLonLat([108.55, 34.32]), // 海南省的大致中心点
	  zoom: 3
	})
  });

  // 准备热力图数据
  var features = [];
  var csvData = "exampledata.csv"; // 这里应该是从文件读取的数据
  fetch(csvData).then((response) => response.text())
	.then((data) => {
	  var lines = data.split('\n');
	  lines.forEach(function(line) {
		var parts = line.split(',');
		  var lon = parseFloat(parts[12]);
		  var lat = parseFloat(parts[11]);
		  var value = parseFloat(parts[8]-273.3); 
		  var feature = new ol.Feature({
			geometry: new ol.geom.Point(ol.proj.fromLonLat([lon, lat])),
			weight: value // 热力图的权重
		  });
		  features.push(feature);
	  });
	  // 创建热力图图层
	  var heatMapLayer = new ol.layer.Heatmap({
		source: new ol.source.Vector({
		  features: features
		}),
		blur: 5,
		radius: 5,
		gradient: ['#0000ff', '#0044ff', '#0088ff', '#00ccff', '#00ffff', '#00ffcc', '#00ff88', '#00ff44', '#00ff00', '#44ff00', '#88ff00', '#ccff00', '#ffff00', '#ffcc00', '#ff8800', '#ff4400', '#ff0000']
	  });

	  // 将热力图图层添加到地图上
	  map.addLayer(heatMapLayer);
	});