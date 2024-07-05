<template>
  <div :class="[b(),className]" :style="styleSizeName">
    <div :ref="id" :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "../../create";

export default create({
  name: "bar",
  methods: {
    updateChart() {
      const optionData = this.deepClone(this.dataChart);
      const option = {
        title: this.getOptionTitle(),
        tooltip: this.getOptionTip({
          trigger: "axis",
        }),
        grid: this.getOptionGrid(),
        legend: this.getOptionLegend(),
        xAxis: {
          show: this.validData(this.option.xAxisShow, true),
          type: this.option.category ? "value" : "category",
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
          data: optionData.categories || [],
          inverse: this.validData(this.option.xAxisInverse, false),
          splitLine: {
            show: this.validData(this.option.xAxisSplitLineShow, false)
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
          type: this.option.category ? "category" : "value",
          name: this.option.yAxisName,
          nameTextStyle: {
            color: this.option.yAxisColor || "#fff",
            fontSize: this.option.yAxisFontSize || 14
          },
          data: optionData.categories || [],
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
            show: this.validData(this.option.yAxisSplitLineShow, false)
          }
        },
        series: (() => {
          const barColor = this.option.barColor || [];
          const list = (optionData.series || []).map((ele, index) => {
            return Object.assign(ele, {
              type: "bar",
              stack: ele.stack,
              barWidth: this.option.barWidth || 16,
              barMinHeight: this.option.barMinHeight || 0,
              itemStyle: this.getHasProp(!this.switchTheme, {
                color: this.getColor(index)
              }, { barBorderRadius: this.option.barRadius || 0 }),
              label: this.getOptionLabel({
                position: this.option.category ? "right" : "top",
              })
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
