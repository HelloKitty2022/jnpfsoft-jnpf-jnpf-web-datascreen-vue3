<template>
  <div :class="[b(),className]"
       @mouseenter="handleMouseEnter"
       @mouseleave="handleMouseLeave"
       @dblclick="handleDblClick"
       @click="handleClick"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(255,255,255,0)"
       v-loading="loading"
       :style="[styleSizeName]">
    <div v-html="template"></div>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "html",
  data () {
    return {
      loading: false,
      timeout: null,
      template: '',
    };
  },
  watch: {
    src () {
      this.debounce(this.initHtml)()
    },
    remote () {
      this.initHtml()
    },
    content () {
      this.initHtml()
    }
  },
  computed: {
    src () {
      return this.option.src;
    },
    content () {
      return this.option.content;
    },
    remote () {
      return this.option.remote;
    }
  },
  mounted () {
    this.initHtml()
  },
  methods: {
    debounce (func, wait = 600) {
      let that = this;
      return function () {
        const context = this;
        const args = arguments;
        clearTimeout(that.timeout);
        that.timeout = setTimeout(function () {
          func.apply(context, args);
        }, wait);
      };
    },
    getTemplate () {
      return new Promise((resolve, reject) => {
        if (this.remote && this.src) {
          this.loading = true
          this.$axios.get(this.src).then(res => {
            resolve(res.data)
          }).catch(() => {
            resolve()
          })
        } else {
          resolve(this.content)
        }
      })
    },
    initHtml () {
      this.getTemplate().then(res => {
        this.loading = false
        this.$emit('remote-change', {
          id: this.component,
          content: res
        })
        this.template = res
      })
    },
  }
});
</script>

