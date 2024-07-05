<template>
  <div :class="b({'active':((active || overActive)&&!readonly),'move':moveActive,'click':disabled})"
    @mousedown.stop="handleMove" @mouseover.stop="handleOver" @mouseout.stop="handleOut"
    :style="styleName">
    <el-input ref="input" :class="b('focus')" v-model="value"></el-input>
    <div :class="b('wrapper')" ref="wrapper">
      <template v-if="(active || overActive || moveActive)&&!readonly&&line">
        <div :style="styleLineName" :class="b('line',['left'])"></div>
        <div :style="styleLineName" :class="b('line',['top'])"></div>
        <div :class="b('line',['label'])" :style="styleLabelName">x:{{baseLeft}} y:{{baseTop}}</div>
      </template>
      <template v-for="(item,index) in rangeList">
        <div :class="b('range',[item.classname])" :key="index" v-if="active&&!readonly&&range"
          :style="[styleRangeName,getRangeStyle(item.classname)]"
          @mousedown.stop="rangeMove($event,item.classname)"></div>
      </template>
      <div :class="b('menu')" :style="styleMenuName" v-show="active || overActive">
        <slot name="menu" :zIndex="zIndex" :index="index"></slot>
      </div>
      <div :class="b('item')" ref="item">
        <slot></slot>
      </div>
      <div :class="b('mask')" v-if="!disabled && mask"></div>
    </div>
  </div>
</template>

<script>
function getFixed(val = 0, len = 0) {
  return Number(val.toFixed(len));
}
const name = "avue-draggable"
export default {
  name: name,
  props: {
    line: {
      type: Boolean,
      default: true
    },
    range: {
      type: Boolean,
      default: true
    },
    index: {
      type: [String, Number],
    },
    mask: {
      type: Boolean,
      default: true
    },
    scale: {
      type: Number,
      default: 1
    },
    readonly: {
      type: Boolean,
      default: false
    },
    resize: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    lock: {
      type: Boolean,
      default: false
    },
    step: {
      type: Number,
      default: 1
    },
    zIndex: {
      type: [Number, String],
      default: 1
    },
    left: {
      type: Number,
      default: 0
    },
    top: {
      type: Number,
      default: 0
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  data() {
    return {
      keyList: {
        shift: false
      },
      first: true,
      value: '',
      baseWidth: 0,
      baseHeight: 0,
      baseLeft: 0,
      baseTop: 0,
      children: {},
      moveActive: false,
      overActive: false,
      rangeActive: false,
      active: false,
      rangeList: [
        {
          classname: "left",
        },
        {
          classname: "right",
        },
        {
          classname: "top",
        },
        {
          classname: "bottom",
        },
        {
          classname: "top-left",
        },
        {
          classname: "top-right",
        },
        {
          classname: "bottom-left",
        },
        {
          classname: "bottom-right",
        }
      ]
    };
  },
  computed: {
    scaleVal() {
      return this.scale;
    },
    styleMenuName() {
      return {
        transformOrigin: "0 0",
        transform: `scale(${this.scaleVal})`
      };
    },
    styleLineName() {
      return {
        borderWidth: this.setPx(this.scaleVal)
      };
    },
    styleRangeName() {
      const calc = 5 * this.scaleVal;
      return {
        width: this.setPx(calc),
        height: this.setPx(calc)
      };
    },
    styleLabelName() {
      return {
        fontSize: this.setPx(14 * this.scaleVal)
      };
    },
    styleName() {
      return Object.assign(
        (() => {
          if (this.active) {
            return Object.assign(
              {
                zIndex: 9999
              },
              this.styleLineName
            );
          }
          return { zIndex: this.zIndex };
        })(),
        {
          top: this.setPx(this.baseTop),
          left: this.setPx(this.baseLeft),
          width: this.setPx(this.baseWidth),
          height: this.setPx(this.baseHeight)
        }
      );
    }
  },
  watch: {
    active(val) {
      this.handleKeydown()
    },
    width(val) {
      this.baseWidth = getFixed(val) || this.children.offsetWidth;
    },
    height(val) {
      this.baseHeight = getFixed(val) || this.children.offsetHeight;
    },
    left(val) {
      this.baseLeft = getFixed(val);
    },
    top(val) {
      this.baseTop = getFixed(val);
    },
    baseWidth(val) {
      this.$refs.wrapper.style.width = this.setPx(val);
      if (this.resize && this.children.style) {
        this.children.style.width = this.setPx(val);
      }
    },
    baseHeight(val) {
      this.$refs.wrapper.style.height = this.setPx(val);
      if (this.resize && this.children.style) {
        this.children.style.height = this.setPx(val);
      }
    },
    baseLeft(n, o) {
      if (this.first) return
      this.setMove(n - o, 0);
    },
    baseTop(n, o) {
      if (this.first) return
      this.setMove(0, n - o);
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    b(el, mods) {
      const ELEMENT = '__';
      const MODS = '--';
      const join = (name, el, symbol) => el ? name + symbol + el : name;
      const prefix = (name, mods) => {
        if (typeof mods === 'string') {
          return join(name, mods, MODS);
        }

        if (Array.isArray(mods)) {
          return mods.map(item => prefix(name, item));
        }

        const ret = {};
        Object.keys(mods || {}).forEach(key => {
          ret[name + MODS + key] = mods[key];
        });
        return ret;
      };
      const { name } = this.$options;
      if (el && typeof el !== 'string') {
        mods = el;
        el = '';
      }
      el = join(name, el, ELEMENT);

      return mods ? [el, prefix(el, mods)] : el;
    },
    init() {
      this.children = this.$refs.item.firstChild;
      this.baseWidth = getFixed(this.width) || this.children.offsetWidth;
      this.baseHeight = getFixed(this.height) || this.children.offsetHeight;
      this.baseLeft = getFixed(this.left);
      this.baseTop = getFixed(this.top);
      this.$nextTick(() => {
        this.first = false
      })
    },
    setMove(left, top) {
      this.$emit('move', {
        index: this.index,
        left: left,
        top: top
      })
    },
    setLeft(left) {
      this.baseLeft = left;
    },
    setTop(top) {
      this.baseTop = top;
    },
    getRangeStyle(postion) {
      const calc = (5 * this.scaleVal) / 2;
      let result = {};
      let list = postion.split("-");
      list.forEach(ele => {
        result[ele] = this.setPx(-calc);
      });
      return result;
    },
    setOverActive(val) {
      this.overActive = val;
    },
    setActive(val) {
      this.active = val;
      this.$refs.input.focus()
    },
    rangeMove(e, position) {
      if (this.disabled || this.lock) return
      //移动的方向
      let x, y;
      //移动的位置
      let xp, yp;
      //移动的正负
      let xc, yc;
      this.rangeActive = true;
      this.handleMouseDown();
      let disX = e.clientX;
      let disY = e.clientY;
      document.onmousemove = e => {
        this.moveActive = true;
        if (position === "right") {
          x = true;
          y = false;
        } else if (position === "left") {
          x = true;
          xp = true;
          xc = true;
          y = false;
        } else if (position === "top") {
          x = false;
          y = true;
          yp = true;
          yc = true;
        } else if (position === "bottom") {
          x = false;
          y = true;
        } else if (position === "bottom-right") {
          x = true;
          y = true;
        } else if (position === "bottom-left") {
          x = true;
          y = true;
          xp = true;
          xc = true;
        } else if (position === "top-right") {
          x = true;
          y = true;
          yp = true;
          yc = true;
        } else if (position === "top-left") {
          x = true;
          y = true;
          xp = true;
          xc = true;
          yp = true;
          yc = true;
        }
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        disX = e.clientX;
        disY = e.clientY;
        if (x) {
          let calc = left * this.step;
          if (xc) calc = -calc;
          if (xp) this.baseLeft = getFixed(this.baseLeft - calc);
          this.baseWidth = getFixed(this.baseWidth + calc);
        }
        if (y) {
          let calc = top * this.step;
          if (yc) calc = -calc;
          if (yp) this.baseTop = getFixed(this.baseTop - calc);
          this.baseHeight = getFixed(this.baseHeight + calc);
        }
      };
      this.handleClear()

    },
    handleOut() {
      this.overActive = false
      this.$emit("out", {
        index: this.index,
        width: this.baseWidth,
        height: this.baseHeight,
        left: this.baseLeft,
        top: this.baseTop
      });
    },
    handleOver() {
      if (this.disabled) return
      this.overActive = true
      this.$emit("over", {
        index: this.index,
        width: this.baseWidth,
        height: this.baseHeight,
        left: this.baseLeft,
        top: this.baseTop
      });
    },
    handleMove(e) {
      if (this.disabled || this.lock) return
      this.active = true;
      this.handleMouseDown();
      let disX = e.clientX;
      let disY = e.clientY;
      let timer;
      function debounce(func, delay) {
        // 设置定时器标识
        // 难点返回事件绑定函数
        return function () {
          // func指定this
          let context = this;
          // func参数
          let args = arguments;
          // 先清除定时器
          clearTimeout(timer);
          //设置定时器
          timer = setTimeout(() => {
            // 调用函数
            func.apply(context, args);
          }, delay);
        }
      }
      function numCor(num) {
        if (num <= 0) return -num
        return num
      }
      let direction;
      document.onmousemove = (e) => {
        let left = e.clientX - disX;
        let top = e.clientY - disY;
        if (this.keyList.shift) {
          if (!direction) {
            let newTop = numCor(top), newLeft = numCor(left)
            if (newLeft > newTop) {
              direction = 'x'
            } else if (newLeft < newTop) {
              direction = 'y'
            }
          }
          if (direction == 'x') {
            top = 0
            disX = e.clientX;
          } else if (direction == 'y') {
            left = 0
            disY = e.clientY;
          }
          debounce(() => {
            direction = undefined
          }, 500)()
        } else {
          disX = e.clientX;
          disY = e.clientY;
        }
        this.baseLeft = getFixed(this.baseLeft + left * this.step);
        this.baseTop = getFixed(this.baseTop + top * this.step);
      };
      this.handleClear()
      setTimeout(() => {
        this.$refs.input.focus()
      })
    },
    handleClear() {
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        this.handleMouseUp();
      }
    },
    handleKeydown() {
      this.$el.onkeyup = () => {
        this.keyList.shift = false
      }
      this.$el.onkeydown = (event) => {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        let step = 1 * this.step;
        const keyCode = e.keyCode
        if (keyCode == 16) {
          this.keyList.shift = true
        } else if ([37, 38, 39, 40].includes(keyCode)) {
          if (keyCode == 37) {//左
            this.baseLeft = getFixed(this.baseLeft - step)
          } else if (keyCode == 38) {//上
            this.baseTop = getFixed(this.baseTop - step)
          } else if (keyCode == 39) {//右
            this.baseLeft = getFixed(this.baseLeft + step)
          } else if (keyCode == 40) {//下
            this.baseTop = getFixed(this.baseTop + step)
          }
          event.stopPropagation()
          event.preventDefault();
          this.$emit("blur", {
            index: this.index,
            width: this.baseWidth,
            height: this.baseHeight,
            left: this.baseLeft,
            top: this.baseTop
          });
        }
      };
    },
    handleMouseDown(e) {
      this.moveActive = true;
      this.$emit("focus", {
        index: this.index,
        width: this.baseWidth,
        height: this.baseHeight,
        left: this.baseLeft,
        top: this.baseTop
      });
    },
    handleMouseUp() {
      this.moveActive = false;
      this.rangeActive = false;
      this.$emit("blur", {
        index: this.index,
        width: this.baseWidth,
        height: this.baseHeight,
        left: this.baseLeft,
        top: this.baseTop
      });
    }
  }
};
</script>
<style lang="scss">
.avue-draggable {
  $active__color: rgba(115, 170, 229, 0.5);
  padding: 10px;
  position: absolute;
  cursor: move;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  &__focus {
    opacity: 0;
    position: absolute !important;
    top: 0;
    left: 0;
    z-index: -1024;
  }
  &__mask {
    width: 100%;
    height: 100%;
    border: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
  }
  &--active {
    cursor: move;
    border: 1px solid #09f;
    border-radius: 5px;
    background-color: $active__color;
  }
  &--move {
    opacity: 0.6;
    background-color: $active__color;
  }
  &--click {
    cursor: pointer;
  }
  &__line {
    &--left {
      position: absolute;
      border-top: 1px dashed #09f;
      width: 10000px;
      height: 0;
      top: 0;
      transform: translateX(-100%);
    }
    &--top {
      position: absolute;
      border-left: 1px dashed #09f;
      width: 0;
      height: 10000px;
      left: 0;
      transform: translateY(-100%);
    }
    &--label {
      top: -5px;
      left: -8px;
      position: absolute;
      padding: 5px;
      transform: translate(-100%, -100%);
      color: #09f;
      font-size: 14px;
      white-space: nowrap;
      cursor: move;
    }
  }
  &__menu {
    position: absolute;
    top: 0px;
    left: 0px;
    background-color: #409eff;
    font-size: 25px;
    color: #fff;
    z-index: 1024;
    cursor: pointer;
  }
  &__range {
    $calcheight: -6px;
    position: absolute;
    width: 10px;
    height: 10px;
    z-index: 1024;
    background-color: #09f;
    border-radius: 0;
    &--left,
    &--right {
      &:hover {
        cursor: ew-resize;
      }
      top: 50%;
      transform: translateY(-50%);
    }
    &--left {
      left: $calcheight;
    }
    &--right {
      right: $calcheight;
    }
    &--top,
    &--bottom {
      &:hover {
        cursor: ns-resize;
      }
      left: 50%;
      transform: translateX(-50%);
    }
    &--top {
      top: $calcheight;
    }
    &--bottom {
      bottom: $calcheight;
    }
    &--bottom-right,
    &--top-left {
      &:hover {
        cursor: nwse-resize;
      }
    }
    &--bottom-left,
    &--top-right {
      &:hover {
        cursor: nesw-resize;
      }
    }
    &--top-right {
      top: $calcheight;
      right: $calcheight;
    }
    &--top-left {
      top: $calcheight;
      left: $calcheight;
    }
    &--bottom-right {
      bottom: $calcheight;
      right: $calcheight;
    }
    &--bottom-left {
      bottom: $calcheight;
      left: $calcheight;
    }
  }
}
</style>