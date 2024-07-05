<template>
  <div :class="[b(),className]" :style="styleSizeName" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave" @dblclick="handleDblClick" ref="main" @click="handleClick">
    <div :style="styleChartName">
      <div :class="b('text',{'line':type==='line','circle':type==='circle'})">
        <p :style="styleSuffixName">{{dataChart.label}}</p>
        <p :style="styleName">
          {{dataChart.value}}
        </p>
      </div>
      <el-progress :color="color" :width="width" stroke-linecap="butt"
        :define-back-color="defineBackColor" :showText="false" :strokeWidth="strokeWidth"
        :percentage="dataChart.data" :type="type">
      </el-progress>
    </div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "progress",
  computed: {
    styleSuffixName() {
      return {
        fontWeight: this.option.suffixFontWeight || "normal",
        fontSize: (this.option.suffixFontSize || 40) + "px",
        color: this.option.suffixColor || "#333"
      };
    },
    styleName() {
      return {
        fontWeight: this.option.fontWeight || "normal",
        fontSize: (this.option.fontSize || 40) + "px",
        color: this.option.color || "#333"
      };
    },
    type() {
      return this.option.type || "line";
    },
    color() {
      return this.option.borderColor || "#333";
    },
    defineBackColor() {
      return this.option.defineBackColor || "#0e222e";
    },
    strokeWidth() {
      return this.option.strokeWidth || 14;
    }
  },
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


