<template>
  <div :class="[b(),className]" :style="styleSizeName">
    <div :ref="id" :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "line",
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
          type: "category",
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
          type: "value",
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
          const list = (optionData.series || []).map((ele, index) => {
            return {
              ...ele,
              ...{
                type: "line",
                smooth: this.validData(this.option.smooth, true),
                showSymbol: this.validData(this.option.symbolShow, false),
                symbolSize: this.option.symbolSize || 10,
                areaStyle: (() => {
                  if (this.option.areaStyle) {
                    return {
                      opacity: 0.7
                    };
                  }
                })(),
                lineStyle: {
                  width: this.option.lineWidth || 1
                },
                itemStyle: this.getHasProp(!this.switchTheme, {
                  color: this.getColor(index)
                }),
                label: this.getOptionLabel({
                  position: "top"
                })
              }
            }
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
