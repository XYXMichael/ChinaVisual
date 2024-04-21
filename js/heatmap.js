var standard = 8

function getValueColor(value, minValue, maxValue) {
    // 将值从给定范围归一化到 0 到 1 之间
    const normalizedValue = (value - minValue) / (maxValue - minValue);

    // 计算红色和绿色的分量
    const red = Math.round(240 * normalizedValue);
    const green = Math.round(240 * (1 - normalizedValue));
    const blue = 0;  // 蓝色分量保持为0

    // 返回 RGB 颜色字符串
    return `rgb(${red}, ${green}, ${blue})`;
}

var heatmapOption = {
    title: {
        show: false
    },
    grid: [{
        width: '55%',
        top: '40',
        left: '1%'
    }, {
        width: '25%',
        top: '40',
        left: '66%'
    }
    ],
    tooltip:{
        show: true,
    },
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
            interval: 0,
            fontSize: '0.8rem'
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
        data: ['浙江省'],
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
        data: ['浙江省'],
        splitArea: {
            show: false
        },
        axisTick: false,
        axisLine: {
            show: false
        },
        axisLabel: {
            fontSize: '1rem',
            align: 'center'
        }
    }], series: [{
        type: 'custom',
        data: [],
        renderItem: function (params, api) {
            var group = []
            for (i = 0; i < 12; i++) {
                var item = []
                var categoryIndex = api.value(i);
                // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
                var startPoint = api.coord([i, params.dataIndex]);
                var endPoint = api.coord([i + 1, params.dataIndex]);

                var height = api.size([0, 1])[1];
                var width = api.size([0, 1])[0];

                var kk = parseInt(categoryIndex / standard) + 5
                var rgb = getValueColor(kk,5, 18)
                for (j = 0; j < kk; j++) {
                    item.push({
                        type: 'line',
                        rotation: 2 * j * Math.PI / kk,
                        originX: startPoint[0],
                        originY: startPoint[1],
                        shape: {
                            x1: startPoint[0],
                            y1: startPoint[1],
                            x2: startPoint[0] + (width / 2 - 2),
                            y2: startPoint[1],
                        },
                        style:{
                            stroke: rgb,
                            fill: rgb,
                            lineWidth: 2
                        }
                    }
                    )
                }
                group.push({ type: 'group', children: item })
            }
            return  {
                type: 'group',
                children: group
            }
        },
        tooltip: {
            position:'bottom',
            formatter: function (params) {
                console.log(params)
                return params.name + ':<br/>' + params.value
            }
        },
    }]
};

var standardValue = {
    'PM2.5': 7,
    'PM10': 15,
    'SO2': 15,
    'CO': 0.2,
    'O3': 15,
    'NO2': 8,
    'AQI': 15,
}

function setHotMap(year, type) {
    getAverageData_Province_month(year, type).then((result) => {
        var parentWidth = document.getElementById('heatmap').offsetWidth;
        const names = result.map(item => item.name);
        var height_one = 0.55 * parentWidth / 12 * names.length
        var heatmapChart = echarts.init(document.getElementById('heatmap'), null, {
            height: height_one + 100
        });
        standard = standardValue[type]
        heatmapChart.setOption(heatmapOption);

        heatmapChart.setOption({
            series: {
                data: result
            }, yAxis: [{
                type: 'category',
                data: names,
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
                data: names,
                splitArea: {
                    show: false
                },
                axisTick: false,
                axisLine: {
                    show: false
                }
            }], grid: [{
                height: height_one,
            }, {
                height: height_one,
            }
            ]
        })
    })
}


