<template>
  <div :class="[b(),className]" :style="styleSizeName">
    <div :ref="id" :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "funnel",
  computed: {
    x2() {
      return this.option.gridX2 || 20;
    },
    fontSize() {
      return this.option.fontSize || 14;
    }
  },
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      const option = {
        tooltip: this.getOptionTip(),
        grid: this.getOptionGrid(),
        legend: this.getOptionLegend(),
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = [
            {
              type: "funnel",
              left: '10%',
              top: 60,
              bottom: 60,
              width: '80%',
              min: 0,
              max: 100,
              minSize: '0%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: this.getOptionLabel({
                position: this.option.position ? 'inside' : ''
              }),
              data: optionData,
              emphasis: {
                label: {
                  fontSize: 20
                }
              },
              itemStyle: this.getHasProp(!this.switchTheme, {
                color: params => this.getColor(params.dataIndex)
              })
            }
          ];
          return list;
        })()
      };
      this.myChart.resize();
      this.myChart.setOption(option, this.initialize);
    }
  }
});
</script>



