<template>
  <div :class="[b(),className]" :style="styleSizeName">
    <div :ref="id" :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "../../create";

export default create({
  name: "radar",
  x2() {
    return this.option.gridX2 || '80%';
  },
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      let series = optionData.series || []
      series = series[0] || {}
      series = series.data || []
      const option = {
        title: this.getOptionTitle(),
        tooltip: this.getOptionTip(),
        grid: this.getOptionGrid(),
        legend: this.getOptionLegend(series),
        radar: {
          name: {
            fontSize: this.option.fontSize || 12,
            color: this.option.color || '#fff'
          },
          indicator: optionData.indicator || [],
          shape: this.option.shape || 'polygon',
          radius: this.option.radius || '75%',
          triggerEvent: true
        },
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = [
            {
              type: "radar",
              barWidth: this.option.barWidth || 16,
              barMinHeight: this.option.barMinHeight || 0,
              itemStyle: {
                barBorderRadius: this.option.barRadius || 0
              },
              data: series.map((ele, index) => {
                return {
                  name: ele.name,
                  value: ele.value,
                  label: this.getOptionLabel(),
                  areaStyle: {
                    opacity: this.option.areaOpacity || 0.9,
                  }
                };
              })
            }
          ];
          return list;
        })()
      }
      this.myChart.resize();
      this.myChart.setOption(option, this.initialize);
    }
  }
});

</script>



