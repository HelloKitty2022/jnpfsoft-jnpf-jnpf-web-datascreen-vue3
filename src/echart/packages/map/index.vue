<template>
  <div :class="[b(),className]" :style="styleSizeName">
    <div :ref="id" :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "map",
  data() {
    return {
      bannerCount: 0,
      bannerCheck: "",
      centerData: [],
      zoomData: 1
    };
  },
  watch: {
    mapData() {
      this.updateChart();
    },
    dataChartLen() {
      this.setBanner();
    },
    bannerTime() {
      this.setBanner();
    },
    banner: {
      handler() {
        this.setBanner();
      },
      immediate: true
    },
    width() {
      this.updateData();
    },
    height() {
      this.updateData();
    },
    zoom: {
      handler() {
        this.zoomData = this.zoom;
      },
      immediate: true
    },
  },
  computed: {
    zoomShow() {
      return this.option.zoomShow || 1;
    },
    zoom() {
      return this.option.zoom || 1;
    },
    mapData() {
      return this.option.mapData || {};
    },
    borderWidth() {
      return this.option.borderWidth || 3;
    },
    borderColor() {
      return this.option.borderColor || "#389BB7";
    },
    areaColor() {
      return this.option.areaColor || "#0c162f";
    },
    empColor() {
      return this.option.empColor || "#fff";
    },
    empAreaColor() {
      return this.option.empAreaColor || "yellow";
    },
    color() {
      return this.option.color || "#fff";
    },
    roam() {
      return this.validData(this.option.roam, true)
    },
    fontSize() {
      return this.option.fontSize || 24;
    },
    bannerTime() {
      return this.option.bannerTime || 3000;
    },
    banner() {
      return this.option.banner;
    },
    locationData() {
      return (this.dataChart || []).map(ele => {
        ele.zoom = ele.zoom || 1;
        const zoomData = this.zoomData < 1 ? 1 : this.zoomData;
        return Object.assign(
          (() => {
            if (ele.zoom <= zoomData) {
              return {
                name: ele.name
              };
            }
            return {};
          })(),
          {
            value: [ele.lng, ele.lat, ele.value]
          }
        );
      });
    }
  },
  methods: {
    resetBanner() {
      this.$nextTick(() => {
        this.myChart.dispatchAction({
          type: "hideTip"
        });
        // this.myChart.dispatchAction({
        //   type: "downplay"
        // });
      });
    },
    setBanner() {
      clearInterval(this.bannerCheck);
      if (this.banner) {
        this.bannerCheck = setInterval(() => {
          const curr = this.bannerCount % this.dataChartLen;
          this.myChart.dispatchAction({
            type: "showTip",
            seriesIndex: "0",
            dataIndex: curr
          });
          this.myChart.dispatchAction({
            type: "downplay"
          });
          this.myChart.dispatchAction({
            type: "highlight",
            dataIndex: curr
          });
          this.bannerCount += 1;
        }, this.bannerTime);
      }
    },
    updateChart() {
      this.$axios(this.computedImgUrl(this.mapData)).then(res => {
        const data = res.data;
        const optionData = this.deepClone(data);
        window.echarts.registerMap("HK", optionData);
        const option = {
          tooltip: (() => {
            return Object.assign(
              (() => {
                if (this.formatter) {
                  return {
                    formatter: name => {
                      return this.formatter(name, this.dataChart);
                    }
                  };
                }
                return {};
              })(),
              {
                backgroundColor: this.option.tipBackgroundColor,
                textStyle: {
                  fontSize: this.option.tipFontSize,
                  color: this.option.tipColor
                }
              }
            );
          })(),
          geo: Object.assign(
            (() => {
              if (!this.validatenull(this.centerData)) {
                return {
                  center: this.centerData
                };
              }
              return {};
            })(),
            {
              map: "HK",
              label: {
                emphasis: {
                  show: false
                }
              },
              zoom: this.zoomData,
              layoutCenter: ["50%", "50%"],
              layoutSize: 1200,
              roam: this.roam,
              label: {
                show: true,
                fontSize: this.fontSize,
                color: this.color
              },
              left: this.option.gridX,
              top: this.option.gridY,
              right: this.option.gridX2,
              bottom: this.option.gridY2,
              emphasis: {
                label: {
                  color: this.empColor
                },
                itemStyle: {
                  areaColor: this.empAreaColor
                }
              },
              itemStyle: {
                borderWidth: this.borderWidth,
                borderColor: this.borderColor,
                areaColor: this.areaColor
              }
            }
          ),
          series: [
            {
              type: "effectScatter",
              coordinateSystem: "geo",
              showEffectOn: "emphasis",
              rippleEffect: {
                brushType: "fill",
                scale: 4
              },
              symbolSize: this.fontSize,
              hoverAnimation: true,
              data: this.locationData,
              label: {
                show: true,
                position: ["130%", "0"],
                fontSize: this.fontSize,
                color: this.color,
                formatter: params => {
                  return params.name;
                }
              },
              itemStyle: {
                color: this.color
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: this.fontSize + 20,
                  color: this.option.empColor
                },
                itemStyle: {
                  color: this.option.empColor
                }
              }
            }
          ]
        };
        this.myChart.off("mouseover");
        this.myChart.off("mouseout");
        this.myChart.off("georoam");

        this.myChart.on("mouseover", () => {
          clearInterval(this.bannerCheck);
          this.resetBanner();
        });
        this.myChart.on("mouseout", () => {
          this.bannerCount = 0;
          this.setBanner();
        });
        this.myChart.on("georoam", e => {
          const option = this.myChart.getOption();
          const geo = option.geo[0];
          this.centerData = geo.center;
          this.zoomData = geo.zoom;
          if (this.zoomData < 1) this.zoomData = 1;
        });

        this.myChart.resize();
        this.myChart.setOption(option, this.initialize);
      })

    }
  }
});
</script>



