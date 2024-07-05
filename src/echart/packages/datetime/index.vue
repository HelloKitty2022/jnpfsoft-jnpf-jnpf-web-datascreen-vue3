<template>
  <div :class="[b(),className]" :style="styleSizeName" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave" @dblclick="handleDblClick" ref="main" @click="handleClick">
    <p :style="[styleChartName,styleName]">{{nowDate}}</p>
  </div>
</template>

<script>
import dayjs from "dayjs";
import create from "../../create";
export default create({
  name: "datetime",
  data() {
    return {
      date: new Date(),
      weekday: ["天", "一", "二", "三", "四", "五", "六"]
    };
  },
  computed: {
    nowDate() {
      if (this.option.format === "day") {
        return "星期" + this.weekday[dayjs().$W];
      }
      const format = (this.option.format || "yyyy-MM-dd hh:mm:ss")
        .replace("dd", "DD")
        .replace("yyyy", "YYYY");
      return dayjs(this.date).format(format);
    },
    styleName() {
      return {
        width: "100%",
        height: "100%",
        textAlign: this.option.textAlign,
        letterSpacing: this.setPx(this.option.split),
        textIndent: this.setPx(this.option.split),
        backgroundColor: this.option.backgroundColor,
        fontWeight: this.option.fontWeight || "normal",
        fontSize: (this.option.fontSize || 30) + "px",
        color: this.option.color || "#333"
      };
    }
  },
  created() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
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


