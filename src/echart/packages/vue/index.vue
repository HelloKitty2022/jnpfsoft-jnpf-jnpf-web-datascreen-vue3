<template>
  <div :class="[b(), className]" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave"
    @dblclick="handleDblClick" element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255,255,255,0)" v-loading="loading" :style="[styleSizeName]">
    <component ref="main" :style="styleChartName" :is="dynamicComponent" @click.self="handleClick"
      :refList="refList" :dataChart="dataChart">
    </component>
  </div>
</template>

<script>
import { defineAsyncComponent, shallowRef } from "vue";
import create from "../../create";
export default create({
  name: "vue",
  data() {
    return {
      loading: false,
      timeout: null,
      template: '',
      dynamicComponent: null,
    };
  },
  watch: {
    src() {
      this.debounce(this.initVue)()
    },
    remote() {
      this.initVue()
    },
    content() {
      this.initVue();
    },
  },
  computed: {
    src() {
      return this.option.src;
    },
    content() {
      return this.option.content;
    },
    remote() {
      return this.option.remote;
    }
  },
  created() {
    this.initVue();
  },
  methods: {
    debounce(func, wait = 600) {
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
    getTemplate() {
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
    initVue() {
      this.getTemplate().then(res => {
        this.$emit('remote-change', {
          id: this.component,
          content: res
        })
        this.template = res;
        let template = this.getSource("template");
        if (!template) return
        let script = this.getSource("script");
        if (script) {
          script = script.replace(/export default/, "return");
        }
        let styleCss = this.getSource("style");
        let styleId = 'style-' + this.id;
        if (document.getElementById(styleId)) {
          document.getElementById(styleId).remove()
        }
        let style = document.createElement("style");
        style.id = styleId
        style.innerHTML = styleCss;
        document.head.appendChild(style);
        let obj = new Function(script)();
        obj.template = template;
        obj.props = {
          dataChart: Object,
          refList: [Array, Object]
        }
        this.dynamicComponent = shallowRef(obj);
        this.loading = false
      })
    },
    getSource(type) {
      const reg = new RegExp(`<${type}[^>]*>`);
      let content = this.template;
      let matches = content.match(reg);
      if (matches) {
        let start = content.indexOf(matches[0]) + matches[0].length;
        let end = content.lastIndexOf(`</${type}`);
        return content.slice(start, end);
      }
    },
  },
});
</script>
