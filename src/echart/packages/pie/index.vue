<template>
  <div :class="[b(),className]" :style="styleSizeName">
    <div :class="b('title')" v-html="titleFormatter && titleFormatter(dataChart)"></div>
    <div :ref="id" :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "pie",
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart) || [];
      const option = {
        title: this.getOptionTitle(),
        tooltip: this.getOptionTip(),
        grid: this.getOptionGrid(),
        legend: this.getOptionLegend(),
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = [
            {
              type: "pie",
              roseType: this.option.roseType ? "radius" : "",
              radius: this.option.radius ? ["40%", "55%"] : "50%",
              center: ["50%", "60%"],
              animationType: "scale",
              animationEasing: "elasticOut",
              animationDelay: function (idx) {
                return Math.random() * 200;
              },
              label: this.getOptionLabel({
                formatter: '{b}:{c}\n{d}%'
              }),
              data: (() => {
                let list = optionData;
                if (this.option.notCount) {
                  list = list.filter(ele => ele.value !== 0 && ele.value);
                }
                if (this.option.sort) {
                  list.sort((a, b) => a.value - b.value);
                }
                return list;
              })(),
              itemStyle: this.getHasProp(!this.switchTheme, {
                color: params => this.getColor(params.dataIndex)
              }, {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }),
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



