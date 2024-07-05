<template>
  <div :class="[b(),className]" :style="styleSizeName">
    <div :ref="id" :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "pictorialbar",
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      const symbol = this.validatenull(this.option.symbol)
        ? ""
        : "image://" + this.option.symbol;
      const color = this.option.color || "#fff";
      const fontSize = this.option.fontSize || 20;
      var maxData = 0;
      optionData.forEach(ele => {
        if (ele.value > maxData) maxData = ele.value;
      });
      const option = {
        tooltip: this.getOptionTip(),
        grid: this.getOptionGrid(),
        xAxis: {
          max: maxData,
          splitLine: { show: false },
          offset: 10,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            margin: 10,
            textStyle: {
              color: this.option.color || "#fff",
              fontSize: this.option.fontSize || 20
            }
          }
        },
        yAxis: {
          inverse: true,
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: {
            margin: 10,
            textStyle: {
              color: this.option.color || "#fff",
              fontSize: this.option.fontSize || 20
            }
          },
          data: (optionData || []).map(ele => {
            return ele.name;
          }),
        },
        series: [
          {
            type: "pictorialBar",
            symbol: symbol,
            symbolRepeat: "fixed",
            symbolMargin: "5%",
            symbolClip: true,
            symbolSize: this.option.symbolSize || 30,
            symbolBoundingData: maxData,
            data: (optionData || []).map(ele => {
              return ele.value;
            })
          },
          {
            type: "pictorialBar",
            itemStyle: {
              normal: {
                opacity: 0.2
              }
            },
            label: {
              normal: {
                show: true,
                position: "right",
                offset: [10, 0],
                textStyle: {
                  color: this.option.labelColor,
                  fontSize: this.option.labelFontSize
                }
              }
            },
            animationDuration: 0,
            symbol: symbol,
            symbolRepeat: "fixed",
            symbolMargin: "5%",
            symbolSize: 30,
            symbolBoundingData: maxData,
            data: (() => {
              return (Array.isArray(optionData) ? optionData : []).map(ele => {
                return ele.value;
              });
            })()
          }
        ]
      };

      this.myChart.resize();
      this.myChart.setOption(option, this.initialize);
    }
  }
});
</script>

