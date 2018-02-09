<template>
    <div id="myChart" :style="{width: '300px', height: '300px'}"></div>
</template>

<script>
    export default {
        name: 'hello',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            drawLine(){
                var data1 = [];
                var data2 = [];
                var data3 = [];

                var random = function (max) {
                    return (Math.random() * max).toFixed(3);
                };

                for (var i = 0; i < 500; i++) {
                    data1.push([random(15), random(10), random(1)]);
                    data2.push([random(10), random(10), random(1)]);
                    data3.push([random(15), random(10), random(1)]);
                }
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                // 绘制图表
                myChart.setOption({
                    animation: false,
                    legend: {
                        data: ['scatter', 'scatter2', 'scatter3']
                    },
                    tooltip: {
                    },
                    xAxis: {
                        type: 'value',
                        min: 'dataMin',
                        max: 'dataMax',
                        splitLine: {
                            show: true
                        }
                    },
                    yAxis: {
                        type: 'value',
                        min: 'dataMin',
                        max: 'dataMax',
                        splitLine: {
                            show: true
                        }
                    },
                    dataZoom: [
                        {
                            type: 'slider',
                            show: true,
                            xAxisIndex: [0],
                            start: 1,
                            end: 35
                        },
                        {
                            type: 'slider',
                            show: true,
                            yAxisIndex: [0],
                            left: '93%',
                            start: 29,
                            end: 36
                        },
                        {
                            type: 'inside',
                            xAxisIndex: [0],
                            start: 1,
                            end: 35
                        },
                        {
                            type: 'inside',
                            yAxisIndex: [0],
                            start: 29,
                            end: 36
                        }
                    ],
                    series: [
                        {
                            name: 'scatter',
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    opacity: 0.8
                                }
                            },
                            symbolSize: function (val) {
                                return val[2] * 40;
                            },
                            data: data1
                        },
                        {
                            name: 'scatter2',
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    opacity: 0.8
                                }
                            },
                            symbolSize: function (val) {
                                return val[2] * 40;
                            },
                            data: data2
                        },
                        {
                            name: 'scatter3',
                            type: 'scatter',
                            itemStyle: {
                                normal: {
                                    opacity: 0.8,
                                }
                            },
                            symbolSize: function (val) {
                                return val[2] * 40;
                            },
                            data: data3
                        }
                    ]
                });
            }
        }
    }
</script>
