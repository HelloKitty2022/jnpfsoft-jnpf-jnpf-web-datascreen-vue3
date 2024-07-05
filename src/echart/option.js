export default {
  methods: {
    getOptionTitle() {
      return {
        show: this.validData(this.option.titleShow, false),
        text: this.option.title,
        subtext: this.option.subtext || '',
        textStyle: {
          color: this.option.titleColor || '#333',
          fontSize: this.option.titleFontSize || 16
        },
        left: this.option.titlePosition || 'auto',
        subtextStyle: {
          color: this.option.subTitleColor || '#aaa',
          fontSize: this.option.subTitleFontSize || 14
        }
      }
    },
    getOptionGrid() {
      return {
        height: Number(this.option.split) * 10,
        left: this.option.gridX || 20,
        top: this.option.gridY || 60,
        right: this.option.gridX2 || 20,
        bottom: this.option.gridY2 || 60
      }
    },
    getOptionTip(prop = {}) {
      return {
        ...{
          show: this.validData(this.option.tipShow, true),
          formatter: this.formatter && (() => {
            return params => this.formatter(params, this.dataChart)
          })(),
          backgroundColor: this.option.tipBackgroundColor || "rgba(0,0,0,0.5)",
          textStyle: {
            fontSize: this.option.tipFontSize || 20,
            color: this.option.tipColor || "#fff"
          }
        },
        ...prop
      }
    },
    getOptionLegend(data) {
      return {
        type: 'scroll',
        show: this.validData(this.option.legend, false),
        orient: this.option.legendOrient || "horizontal",
        x: this.option.legendPosition || "right",
        textStyle: {
          fontSize: this.option.legendFontSize || 12
        },
        data: (data || this.dataChart.series || (Array.isArray(this.dataChart) ? this.dataChart : []) || []).map((ele, index) => {
          return {
            name: ele.name,
            textStyle: this.getHasProp(!this.switchTheme, {
              color: this.getColor(index, true)
            })
          };
        })
      }
    },

    getOptionLabel(prop = {}) {
      return {
        ...{
          show: this.validData(this.option.labelShow, false),
          formatter: this.labelFormatter && (() => {
            return params => this.labelFormatter(params, this.dataChart)
          })(),
          textStyle: {
            fontSize: this.option.labelShowFontSize || 14,
            color: this.option.labelShowColor || "inherit",
            fontWeight: this.option.labelShowFontWeight || 500
          },
          ...prop
        }
      }
    },
  }
}