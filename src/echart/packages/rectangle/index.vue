<template>
  <div :class="[b(),className]" :style="styleSizeName">
    <div :ref="id" :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "rectangle",
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      const option = {
        tooltip: this.getOptionTip(),
        series: {
          type: 'treemap',
          data: optionData,
          label: this.getOptionLabel()
        }
      };
      this.myChart.resize();
      this.myChart.setOption(option, this.initialize);
    }
  }
});

</script>



