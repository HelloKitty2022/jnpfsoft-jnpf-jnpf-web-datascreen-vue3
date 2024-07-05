<template>
  <div :class="[b(),className]" :style="styleSizeName">
    <div :style="styleChartName" :class="b('list')">
      <div v-for="(item,index) in listData" :key="index" @click="handleClick(item,index)"
        @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @dblclick="handleDblClick"
        :class="b('item')" :style="getItemsStyle">
        <div v-if="isWhole"
          :style="[getItemStyle,{backgroundColor:item.backgroundColor || option.backgroundColor}]">
          <div :style="prefixStyle">{{item.prefixText}}</div>
          <avue-count-up :decimals="decimals" :key="index" :end="item.value"></avue-count-up>
          <div :style="suffixStyle">{{item.suffixText}}</div>
        </div>
        <div v-else :class="b('box')">
          <div :style="prefixStyle">{{item.prefixText}}</div>
          <div :class="b('number')">
            <div v-for="(citem,cindex) in item.value.split('')" :key="cindex"
              :style="[getItemStyle,{backgroundColor:item.backgroundColor || option.backgroundColor}]">
              <avue-count-up :decimals="decimals" :key="cindex" :end="citem"></avue-count-up>
            </div>
          </div>
          <div :style="suffixStyle">{{item.suffixText}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "flop",
  data() {
    return {
      active: 0,
      statusDIC: [".", ","]
    };
  },
  computed: {
    decimals() {
      return this.option.decimals || 0
    },
    listData() {
      if (Array.isArray(this.dataChart)) {
        return this.dataChart;
      } else {
        return [this.dataChart];
      }
    },
    isWhole() {
      return this.option.whole
    },
    isBorder() {
      return this.option.border == true;
    },
    getItemsStyle() {
      return {
        minWidth: this.setPx(this.option.width),
        minHeight: this.setPx(this.option.height)
      }
    },
    getItemStyle() {
      return Object.assign((() => {
        if (this.isBorder) {
          return {
            borderImageSlice: '10 16 15 10 fill',
            borderImageSource: `url(${this.option.backgroundBorder})`,
            backgroundColor: this.option.backgroundColor,
            borderWidth: this.setPx(this.option.borderWidth),
            borderColor: this.option.borderColor,
            borderStyle: 'solid',
          }
        }
        return {}
      })(), {
        marginTop: this.setPx(this.option.marginTop),
        marginBottom: this.setPx(this.option.marginTop),
        marginLeft: this.setPx(this.option.marginLeft),
        marginRight: this.setPx(this.option.marginLeft),
        paddingTop: this.setPx(this.option.paddingTop),
        paddingBottom: this.setPx(this.option.paddingTop),
        paddingLeft: this.setPx(this.option.paddingLeft),
        paddingRight: this.setPx(this.option.paddingLeft),
        fontSize: this.setPx(this.option.fontSize),
        color: this.option.color,
        fontWeight: this.option.fontWeight,
        textAlign: this.option.textAlign
      })
    },
    prefixStyle() {
      return {
        display: this.option.prefixInline ? 'inline-block' : 'block',
        textAlign: this.option.prefixTextAlign,
        color: this.option.prefixColor || "#fff",
        fontSize: this.setPx(this.option.prefixFontSize || 24),
        lineHeight: this.setPx(this.option.prefixLineHeight)
      };
    },
    suffixStyle() {
      return {
        display: this.option.suffixInline ? 'inline-block' : 'block',
        textAlign: this.option.suffixTextAlign,
        color: this.option.suffixColor || "#fff",
        fontSize: this.setPx(this.option.suffixFontSize || 24),
        lineHeight: this.setPx(this.option.suffixLineHeight)
      };
    },
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created() { },
  methods: {
    handleClick(item, index) {
      this.active = index;
      this.handleCommonBind(item, index, 'clickFormatter')
      if (item.href) window.open(item.href, item.target)
    }
  }
});
</script>