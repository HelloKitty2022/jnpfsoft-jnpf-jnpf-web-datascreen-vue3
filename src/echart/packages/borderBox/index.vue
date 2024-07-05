<template>
  <div :class="[b(),className]" :style="styleSizeName" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave" @dblclick="handleDblClick" @click="handleClick">
    <component :is="isName" :ref="id" :dur="dur" :backgroundColor="backgroundColor" :color="color"
      v-if="reload" :style="styleChartName">
      {{dataChart.value}}
    </component>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "borderBox",
  data() {
    return {
      reload: false
    }
  },
  computed: {
    isName() {
      return 'dvBorderBox' + this.option.type
    },
    dur() {
      return this.option.dur
    },
    backgroundColor() {
      return this.option.backgroundColor
    },
    color() {
      let result = [], color1 = this.option.color1, color2 = this.option.color2
      if (color1) result.push(color1)
      if (color2) result.push(color2)
      return result
    },
  },
  methods: {
    updateChart() {
      this.reload = false;
      this.$nextTick(() => {
        this.reload = true;
      })
    }
  }
});
</script>



