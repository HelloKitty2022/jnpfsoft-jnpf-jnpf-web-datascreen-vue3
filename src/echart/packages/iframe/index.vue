<template>
  <div :class="[b(),className]" :style="styleSizeName" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave" @dblclick="handleDblClick" ref="main" @click="handleClick">
    <iframe :style="styleChartName" :src="dataChart.value" draggable="false"></iframe>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "iframe",
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
});
</script>


