function (data, params) {
  console.log(data);
  const myChart = this.myChart;
  return {
    title: {
      textStyle: {
        fontWeight: 'normal',
        color: '#fff'
      },
      text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
      data: ['销量'],
      textStyle: {
        fontWeight: 'normal',
        color: '#fff'
      },
    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [{
      name: '销量',
      type: 'line',
      data: [5, 20, 36, 10, 10, 20],
      textStyle: {
        fontWeight: 'normal',
        color: '#fff'
      },
    }]
  };
}