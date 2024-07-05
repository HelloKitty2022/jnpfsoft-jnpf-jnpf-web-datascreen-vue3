<template>
  <svg :class="svgClass"
       aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
 
<script>
export default {
  name: 'svgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    }
  },
  computed: {
    svgClass () {   //svg 的class
      if (this.className) {
        return `svg-icon ${this.className}`;
      } else {
        return 'svg-icon'
      }
    },
    iconName () {  //svg xlink-href 指向的文件名
      return `#icon-${this.iconClass}`;
    }
  }
}
</script>
 
<style scoped>
.svg-icon {
  width: 16px;
  height: 16px;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
