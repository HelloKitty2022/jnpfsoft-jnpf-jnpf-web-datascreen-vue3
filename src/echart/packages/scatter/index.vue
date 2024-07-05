<template>
  <div :class="[b(),className]" :style="styleSizeName">
    <div :ref="id" :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "scatter",//散点图
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      const option = {
        title: this.getOptionTitle(),
        tooltip: this.getOptionTip(),
        grid: this.getOptionGrid(),
        xAxis: {
          show: this.validData(this.option.xAxisShow, true),
          name: this.option.xAxisName,
          nameTextStyle: {
            color: this.option.xAxisColor || "#fff",
            fontSize: this.option.xAxisFontSize || 14
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: this.option.xAxisLineColor || "#fff"
            }
          },
          inverse: this.validData(this.option.xAxisInverse, false),
          splitLine: {
            show: this.validData(this.option.xAxisSplitLineShow, true)
          },
          axisLabel: {
            interval: this.option.xAxisInterval || 'auto',
            rotate: this.option.xAxisRotate || 0,
            textStyle: {
              color: this.option.xAxisColor || "#fff",
              fontSize: this.option.xAxisFontSize || 14
            }
          }
        },
        yAxis: {
          show: this.validData(this.option.yAxisShow, true),
          name: this.option.yAxisName,
          nameTextStyle: {
            color: this.option.yAxisColor || "#fff",
            fontSize: this.option.yAxisFontSize || 14
          },
          axisLabel: {
            textStyle: {
              color: this.option.yAxisColor || "#fff",
              fontSize: this.option.yAxisFontSize || 14
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: this.option.yAxisLineColor || "#fff"
            }
          },
          inverse: this.validData(this.option.yAxisInverse, false),
          splitLine: {
            show: this.validData(this.option.yAxisSplitLineShow, true)
          }
        },
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = (optionData || []).map((ele, index) => {
            return Object.assign(ele, {
              type: "scatter",
              symbolSize: this.option.symbolSize || 10,
              itemStyle: {
                color: this.getColor(index)
              },
              label: this.getOptionLabel()
            });
          });
          return list;
        })()
      };
      this.myChart.resize();
      this.myChart.setOption(option, this.initialize);
    }
  }
});
</script>

