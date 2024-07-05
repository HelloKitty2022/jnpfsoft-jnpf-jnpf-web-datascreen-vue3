<template>
  <div class="refer-select folder" :style="getStyleName(item)"></div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      active: false,
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    }
  },
  methods: {
    getStyleName(item) {
      let leftMinList = [], topMinList = []
      let leftMaxList = [], topMaxList = []
      let key = 20;
      this.deepItem((ele) => {
        if (!ele.children) {
          leftMinList.push(ele.left - key)
          topMinList.push(ele.top - key)
          leftMaxList.push(ele.left + ele.component.width + 2 * key)
          topMaxList.push(ele.top + ele.component.height + 2 * key)
        }
      })
      this.startX = Math.min.apply(null, leftMinList);
      this.endX = Math.max.apply(null, leftMaxList);
      this.startY = Math.min.apply(null, topMinList);
      this.endY = Math.max.apply(null, topMaxList);
      return {
        display: this.active ? 'block' : 'none',
        left: this.setPx(this.startX),
        top: this.setPx(this.startY),
        width: this.setPx(this.endX - this.startX),
        height: this.setPx(this.endY - this.startY)
      }
    },
    deepItem(fn) {
      const deepList = (list) => {
        list.forEach(ele => {
          fn & fn(ele)
          if (ele.children) deepList(ele.children)
        })
      }
      deepList([this.item])
    },
    setActive(flag) {
      this.active = flag;
    },
    setLock(flag) {
      this.deepItem((ele) => {
        ele.lock = flag
      })
    },
    setDisplay(flag) {
      this.deepItem((ele) => {
        ele.display = flag
      })
    },
  }
}
</script>

<style lang="scss">
.folder {
  position: absolute;
  z-index: 1;
}
</style>