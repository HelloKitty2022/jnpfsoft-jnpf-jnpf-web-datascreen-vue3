<template>
  <div v-if="reload"
       class="avue-code"
       :style="styleName">
    <pre v-highlight>
          <code class="javascript" >{{modelValue}}</code>
      </pre>
  </div>

</template>

<script>
export default {
  props: {
    modelValue: String,
    height: [String, Number]
  },
  data () {
    return {
      reload: true
    }
  },
  computed: {
    styleName () {
      return {
        maxHeight: this.height + 'px',
        overflow: 'auto'
      }
    }
  },
  watch: {
    modelValue: {
      handler () {
        this.reload = false;
        this.$nextTick(() => {
          this.reload = true;
        })
      },
      deep: true
    },
  }
}
</script>

<style lang="scss">
.avue-code {
  width: 100%;
  code {
    min-height: 50px;
    margin-top: -20px;
    font-size: 12px;
    line-height: 20px;
  }
}
</style>