<template>
  <div ref="main">
    <span @click="fullscreenToggel()"
          :style="styleName">{{flag?'退出全屏':'全屏'}}</span>
  </div>
</template>

<script>
import { fullscreenToggel, fullscreenEnable } from './util.js'
export default {
  name: "fullscreen",
  data () {
    return {
      flag: false
    };
  },
  computed: {
    styleName () {
      return {
        color: this.option.color,
        fontSize: this.setPx(this.option.fontSize)
      }
    }
  },
  created () {
    this.flag = fullscreenEnable()
  },
  mounted () {

  },
  methods: {
    fullscreenToggel () {
      fullscreenToggel()
      setTimeout(() => {
        this.flag = fullscreenEnable()
      }, 100)
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
};
</script>