<template>
  <div :class="[b(),className]" :style="styleSizeName" @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave" @dblclick="handleDblClick" ref="main" @click="handleClick">
    <div :style="styleChartName" ref="box" :class="b('box')">
      <component :is="componentName" ref="text" :class="b('text')" :href="linkHref"
        :style="styleName" :target="linkTarget" v-html="dataChart.value"></component>
    </div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "text",
  data() {
    return {
      check: "",
      date: new Date(),
      left: 0,
    };
  },
  computed: {
    componentName() {
      return this.option.link ? 'a' : 'span'
    },
    scroll() {
      return this.validData(this.option.scroll, false);
    },
    linkHref() {
      return this.option.linkHref;
    },
    linkTarget() {
      return this.option.linkTarget || "_self";
    },
    step() {
      return this.option.step || 5;
    },
    speed() {
      return this.option.speed || 100;
    },
    lineHeight() {
      return this.option.lineHeight || 40;
    },
    fontSize() {
      return this.option.fontSize || 30;
    },
    split() {
      return this.option.split;
    },
    textWidth() {
      const textLen = (this.dataChart.value || '').length;
      return textLen * this.fontSize;
    },
    styleName() {
      return Object.assign({
        width: this.scroll ? this.setPx(this.textWidth) : 'auto',
        transform: "translateX(" + this.left + "px)",
        textAlign: this.option.textAlign,
        letterSpacing: this.setPx(this.split),
        textIndent: this.setPx(this.split),
        backgroundColor: this.option.backgroundColor,
        fontWeight: this.option.fontWeight || "normal",
        fontFamily: this.option.fontFamily,
        fontSize: this.fontSize + "px",
        lineHeight: this.lineHeight + "px",
        color: this.option.color || "#333"
      }, this.styles);
    }
  },
  watch: {
    scroll() {
      this.move();
    },
    speed() {
      this.move();
    }
  },
  created() {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  },
  mounted() {
    this.move();
  },
  methods: {
    move() {
      clearInterval(this.check);
      if (this.scroll) {
        this.check = setInterval(() => {
          if (this.left < -this.textWidth) {
            this.left = this.width;
          }
          this.left = this.left - this.step;
        }, this.speed);
      } else {
        this.left = 0;
      }
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


