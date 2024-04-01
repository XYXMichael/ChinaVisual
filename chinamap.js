
// 初始化Echarts实例
var myChart = echarts.init(document.getElementById('box2'));

// 加载地图数据
myChart.showLoading(); // 显示加载动画
fetch('china.json')
    .then(function (res) {
        return res.json();
    })
    .then(function (chinaGeoJson) {
        // 隐藏加载动画
        myChart.hideLoading();

        // 绘制地图
        echarts.registerMap('china', chinaGeoJson); // 注册地图数据
        myChart.setOption({
            series: [{
                type: 'map',
                map: 'china', // 使用注册的地图数据
                roam: true, // 允许缩放和平移漫游
                // 设置缩放的比例
                zoom: 1.2,
                // 设置缩放的限制
                scaleLimit: {
                    min: 1,
                    max: 10
                }
            }]
        });
    });
