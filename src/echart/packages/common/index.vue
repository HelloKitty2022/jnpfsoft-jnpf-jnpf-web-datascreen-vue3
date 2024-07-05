<template>
  <div :class="[b(),className]" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255,255,255,0)" v-loading="loading" :style="styleSizeName">
    <div :ref="id" :style="styleChartName"></div>
  </div>
</template>

<script>
import create from "../../create";
import { getFunction } from '@/utils/utils';
export default create({
  name: "common",
  data() {
    return {
      loading: false,
      timeout: null
    }
  },
  computed: {
    src() {
      this.debounce(this.updateChart)()
    },
    remote() {
      return this.option.remote;
    }
  },
  watch: {
    src() {
      this.updateChart()
    },
    remote() {
      this.updateChart()
    }
  },
  methods: {
    debounce(func, wait = 600) {
      let that = this;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(that.timeout);
        that.timeout = setTimeout(function () {
          func.apply(context, args);
        }, wait);
      };
    },
    updateChart() {
      const optionData = this.deepClone(this.dataChart) || [];
      let option
      const callback = (res) => {
        this.loading = false;
        this.myChart.resize();
        this.myChart.setOption(option, this.initialize);
        this.bindEvent()
      }
      if (this.remote && this.src) {
        this.loading = false;
        this.$axios.get(this.src).then(res => {
          let result = getFunction(res.data)
          option = result && result(optionData, this.dataParams);
          this.$emit('remote-change', {
            id: this.component,
            content: option
          })
          callback()
        }).catch(() => {
          this.loading = false;
        })
      } else {
        option = this.echartFormatter && this.echartFormatter(optionData, this.dataParams);
        callback()
      }
    }
  }
});
</script>



