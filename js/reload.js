// 基于准备好的dom，初始化echarts实例
var heatmapChart = echarts.init(document.getElementById('heatmap'));
var barChart = echarts.init(document.getElementById('barChart'));

// 指定图表的配置项和数据（热力图）
var heatmapOption = {
    title: {
        text: '热力图示例',
        show: false
    },
    tooltip: {
        position: 'top'
    },
    animation: false,
    grid: {
        width: '500',
        height: '50%',
        top: '20%'
    },
    xAxis: {
        type: 'category',
        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
        splitArea: {
            show: true
        },
        position: 'top'
    },
    yAxis: {
        type: 'category',
        data: ['早', '中', '晚'],
        splitArea: {
            show: true
        }
    },
    visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'horizontal',
        left: 'center',
        bottom: '15%',
        show: false
    },
    series: [{
        name: '热度',
        type: 'heatmap',
        data: [[0, 0, 5], [0, 1, 1], [0, 2, 0], [1, 0, 7], [1, 1, 0], [1, 2, 3], [2, 0, 0], [2, 1, 3], [2, 2, 4], [3, 0, 7], [3, 1, 3], [3, 2, 5], [4, 0, 4], [4, 1, 2], [4, 2, 4], [5, 0, 7], [5, 1, 6], [5, 2, 5], [6, 0, 5], [6, 1, 3], [6, 2, 9]],
        label: {
            show: true
        },
        emphasis: {
            itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        }
    }]
};

// 指定图表的配置项和数据（柱状图）
var barOption = {
    title: {
        text: '柱状图示例'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        type: 'value'
    },
    yAxis: {
        type: 'category',
        data: ['早', '中', '晚']
    },
    series: [{
        name: '数量',
        type: 'bar',
        data: [10, 20, 30],
        markPoint: {
            data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
            ]
        },
        markLine: {
            data: [
                { type: 'average', name: '平均值' }
            ]
        }
    }]
};

// 使用刚指定的配置项和数据显示图表。
heatmapChart.setOption(heatmapOption);
barChart.setOption(barOption);

echarts.connect([heatmapChart, barChart])