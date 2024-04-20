// 基于准备好的dom，初始化echarts实例
var heatmapChart = echarts.init(document.getElementById('heatmap'));

// 指定图表的配置项和数据（热力图）
var heatmapOption = {
    title: {
        text: '热力图示例',
        show: false
    },
    grid: [{
        width: '55%',
        height: '55%vh',
        top: '40',
        left: '1%'
    }, {
        width: '20%',
        height: '90',
        top: '40',
        left: '65%'
    }
    ],
    xAxis: [{
        type: 'category',
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
        splitArea: {
            show: true
        },
        position: 'top',
        axisTick: false,
        axisLine: {
            show: false
        },
        axisLabel: {
            interval: 0
        }
    },
    {
        gridIndex: 1,
        type: 'value',
        splitArea: {
            show: true
        },
        position: 'top'
    }
    ],
    yAxis: [{
        type: 'category',
        data: ['浙江省', '河北省', '山东省'],
        splitArea: {
            show: false
        },
        show: false,
        axisLine: {
            show: false
        }
    }, {
        gridIndex: 1,
        type: 'category',
        data: ['浙江省', '河北省', '山东省'],
        splitArea: {
            show: false
        },
        axisTick: false,
        axisLine: {
            show: false
        }
    }],

    series: [{
        type: 'custom',
        data: [[1, 2, 3, 4, 5, 6, 7, 10, 1, 2, 3, 1, 11], [12, 12, 32, 12, 312, 3, 23, 2, 1, 1, 12, 12]],
        renderItem: function (params, api) {
            // console.log(params)
            var group = []
            for (i = 0; i < 12; i++) {
                var categoryIndex = api.value(i);
                // console.log(categoryIndex)
                // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
                var startPoint = api.coord([i, 2 - params.dataIndex]);
                var endPoint = api.coord([i + 1, 2 - params.dataIndex]);

                var height = api.size([0, 1])[1];
                var width = api.size([0, 1])[0];

                group.push({
                    type: 'line',
                    rotation: Math.PI / 2,
                    originX: startPoint[0],
                    originY: startPoint[1],
                    shape: {

                        x1: startPoint[0],
                        y1: startPoint[1],
                        x2: startPoint[0] + (width / 2 - 2),
                        y2: startPoint[1],
                    },
                }, {
                    type: 'line',
                    rotation: Math.PI,
                    originX: startPoint[0],
                    originY: startPoint[1],
                    shape: {

                        x1: startPoint[0],
                        y1: startPoint[1],
                        x2: startPoint[0] + (width / 2 - 2),
                        y2: startPoint[1],
                    },
                }, {
                    type: 'line',
                    rotation: Math.PI * 3 / 2,
                    originX: startPoint[0],
                    originY: startPoint[1],
                    shape: {

                        x1: startPoint[0],
                        y1: startPoint[1],
                        x2: startPoint[0] + (width / 2 - 2),
                        y2: startPoint[1],
                    },
                }, {
                    type: 'line',
                    rotation: Math.PI * 2,
                    originX: startPoint[0],
                    originY: startPoint[1],
                    shape: {

                        x1: startPoint[0],
                        y1: startPoint[1],
                        x2: startPoint[0] + (width / 2 - 2),
                        y2: startPoint[1],
                    },
                })
            }
            return {
                type: 'group',
                children: group
            };
        }
    }]
};



window.onload = function () {
    var parentWidth = document.getElementById('heatmap').offsetWidth;
    var parentHeight = document.getElementById('heatmap').offsetHeight;
    console.log(parentHeight)

    heatmapOption.grid = [{
        width: 0.55 * parentWidth,
        height: '55%vh',
        top: '40',
        left: '1%'
    }, {
        width: '20%',
        height: '90',
        top: '40',
        left: '65%'
    }
    ]

    heatmapChart.setOption(heatmapOption);
}