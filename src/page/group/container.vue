<template>
  <div class="wrapper" :style="wrapperStyle">
    <div class="container" :style="containerStyle" id="container" @mousedown="dragMousedown"
      @mouseup="dragMouseup" @mousemove="dragMousemove" ref="container">
      <div class="refer-select" :style="selectStyle"></div>
      <div class="grade" v-if="gradeFlag || contain.config.gradeShow" :style="gradeLenStyle"></div>
      <subgroup ref="subgroup" :nav="contain.list"></subgroup>
    </div>
    <loading ref="loading"></loading>
  </div>
</template>

<script>
import loading from '@/page/group/loading.vue'
import subgroup from './subgroup.vue'
import { loadScript, uuid, getFunction } from '@/utils/utils'
import { config as defaultConfig } from '@/option/config'
import { getObj } from '@/api/visual'
import { getList } from '@/api/glob'
export default {
  name: 'contents',
  inject: ["contain"],
  props: {
    target: String,
    option: Object,
    id: [String, Number]
  },
  provide() {
    return {
      contain: this.contain,
      container: this
    };
  },
  components: {
    subgroup,
    loading
  },
  data() {
    return {
      select: {
        startX: '',
        startY: '',
        endX: '',
        endY: '',
        show: false
      },
      wrapperStyle: {},
      gradeFlag: false,
    }
  },
  computed: {
    selectStyle() {
      let x = this.select.endX - this.select.startX;
      let y = this.select.endY - this.select.startY;
      return {
        top: this.setPx(y > 0 ? this.select.startY : this.select.endY),
        left: this.setPx(x > 0 ? this.select.startX : this.select.endX),
        width: this.setPx(Math.abs(x)),
        height: this.setPx(Math.abs(y)),
        display: this.select.show ? 'block' : 'none'
      }
    },
    stepScale() {
      let result = Number(100 / (this.contain.scale * 100))
      return result
    },
    //计算中央可视化大屏比例
    containerStyle() {
      const widthVal = (this.contain.width / this.contain.config.width)
      const heightVal = (this.contain.height / this.contain.config.height)
      let scaleX = widthVal, scaleY = widthVal;
      if (!this.isBuild) {
        let screen = this.contain.config.screen;
        if (screen == 'x') {
          this.contain.viewStyle = {
            'overflow-y': 'auto'
          }
        } else if (screen == 'y') {
          scaleX = heightVal;
          scaleY = heightVal;
          this.contain.viewStyle = {
            'overflow-x': 'auto'
          }
        } else if (screen == 'xy') {
          scaleX = widthVal;
          scaleY = heightVal;
        }
      } else {
        scaleX = 1;
        scaleY = 1;
      }
      this.wrapperStyle = {
        width: this.setPx(this.contain.config.width * scaleX),
        height: this.setPx(this.contain.config.height * scaleY),
      }
      return Object.assign({
        transform: `scale(${scaleX}, ${scaleY})`,
        width: this.setPx(this.contain.config.width),
        height: this.setPx(this.contain.config.height),
        backgroundColor: this.contain.config.backgroundColor
      }, (() => {
        if (this.contain.config.backgroundImage) {
          return {
            background: `url(${this.computedImgUrl(this.contain.config.backgroundImage)}) 0% 0% / 100% 100% rgb(3, 12, 59)`,
          }
        }
        return
      })())
    },
    gradeLenStyle() {
      return {
        backgroundSize: `${this.setPx(this.contain.config.gradeLen)} ${this.setPx(this.contain.config.gradeLen)},${this.setPx(this.contain.config.gradeLen)} ${this.setPx(this.contain.config.gradeLen)}`
      }
    },
    isBuild() {
      return this.$route ? this.$route.name === 'build' : false;
    }
  },
  created() {
    this.initGlob();
  },
  mounted() {
    this.initData();
    this.initFun();
    window.onresize = () => {
      this.setScale()
    }
  },
  methods: {
    transfer(list, refList, params) {
      list.forEach(ele => {
        if (ele.type == 'params' || ele.type == 'data') {
          let p = {};
          ele.child.forEach(item => {
            p[item.name] = params[item.value]
          })
          if (!this.validatenull(p)) {
            ele.index.forEach(item => {
              refList[item].updateData(p);
            })
          }
        } else if (ele.type == 'group') {
          window.$glob.group = ele.group
        } else if (ele.type == 'display') {
          ele.index.forEach(item => {
            let styleObj = refList[item].$el.style
            if (ele.displayType == '') {
              if (styleObj.display == 'block' || styleObj.display == '') {
                styleObj.display = 'none'
              } else {
                styleObj.display = 'block'
              }
            } else {
              styleObj.display = ele.displayType
            }
          })
        }
      })
    },
    dragMousedown(e) {
      if (this.contain.isKeysCtrl) {
        this.contain.handleInitActive()
        let rect = e.currentTarget.getBoundingClientRect();
        let offsetX = (e.clientX - rect.left) * this.stepScale;
        let offsetY = (e.clientY - rect.top) * this.stepScale;
        this.select.startX = offsetX
        this.select.startY = offsetY
        this.select.endX = this.select.startX
        this.select.endY = this.select.startY
        this.select.show = true
        e.stopPropagation()
      }
    },
    dragMousemove(e) {
      if (!this.select.show) return
      let rect = e.currentTarget.getBoundingClientRect();
      let offsetX = (e.clientX - rect.left) * this.stepScale;
      let offsetY = (e.clientY - rect.top) * this.stepScale;
      this.select.endX = offsetX
      this.select.endY = offsetY
    },
    dragMouseup(e) {
      if (this.select.show) {
        let selectIndex = []
        this.contain.list.forEach(ele => {
          let x = ele.left >= this.select.startX && ele.left <= this.select.endX
          let y = ele.top >= this.select.startY && ele.top <= this.select.endY
          if (x && y) selectIndex.push(ele.index)
        })
        this.contain.selectNav(selectIndex)
      }
      this.select.show = false
    },
    getTargetDom() {
      let target = this.target || (this.isBuild ? '#section' : 'body')
      return document.querySelector(target)
    },
    initFun() {
      ['handleRefresh', 'getListRef', 'getItemRef'].forEach(ele => {
        this[ele] = this.$refs.subgroup[ele]
      });
    },
    initGlob() {
      getList({
        current: 1,
        size: 100,
      }).then(res => {
        let list = res.data.data.records
        list.forEach(ele => {
          window.$glob[ele.globalKey] = ele.globalValue
        })
      })
    },
    //初始化数据
    initData() {
      this.setScale();
      this.$refs.loading.show()
      const query = (this.$route && this.$route.query) || {}
      const id = this.id || query.id || (this.$route && this.$route.params.id)
      this.contain.id = id;
      const src = query.src
      let contain;
      let config;
      const draw = () => {
        const next = () => {
          this.contain.setGlobParams()
          this.contain.nav = contain.component
          this.$refs.loading.hide()
        }
        if (this.validatenull(this.contain.config.group)) {
          this.contain.config.group = [{
            name: '主屏幕',
            id: '',
            isname: false
          }]
        }
        let mark = this.contain.config.mark;
        if (mark.show && !this.isBuild) {
          this.watermark(Object.assign(mark, {
            fontSize: mark.fontSize + 'px'
          }));
        }
        this.calcData();
        this.setScale();
        //赋值属性
        let before = this.contain.config.before
        if (before) {
          let beforeFun = getFunction(before)(this.contain.config)
          beforeFun.then(() => {
            next()
          }).catch(err => {
            console.log(err)
            next()
          })
        } else {
          next()
        }
      }
      if (src) {
        axios({
          url: src,
          method: 'get',
        }).then(res => {
          let data = res.data.replace('const option = ', '');
          let config = JSON.parse(data)
          contain = {
            config: config.detail || {},
            component: config.component || []
          }
          document.title = this.$website.title + '-' + contain.config.name;
          this.contain.config = Object.assign({}, defaultConfig, config.detail);
          draw();
        })
      } else if (id) {
        getObj(id).then(res => {
          const data = res.data.data;
          this.contain.obj = data;
          config = data.config;
          contain = {
            config: JSON.parse(config.detail) || {},
            component: JSON.parse(config.component) || []
          }
          this.contain.config = Object.assign({}, defaultConfig, contain.config);
          this.contain.visual = data.visual;
          document.title = this.$website.title + '-' + data.visual.title
          if (!this.isBuild) {
            const password = this.contain.visual.password
            const status = this.contain.visual.status
            if (status == 0) {
              this.$alert('大屏还没有发布，晚一点再来吧！', '提示', {
                showClose: false,
                center: true,
                showConfirmButton: false,

              });
            } else if (!this.validatenull(password)) {
              this.$prompt('请输入密码', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                showClose: false,
                closeOnClickModal: false,
                inputPattern: new RegExp(password),
                inputErrorMessage: '密码不正确，请重新输入'
              }).then(() => {
                draw();
              })
            } else {
              draw();
            }
          } else {
            draw();
          }
        }).catch((err) => {
          console.log(err)
          contain = {
            config: defaultConfig,
            component: []
          }
          this.contain.config = Object.assign({}, defaultConfig, contain.config);
          draw();
        })
      } else if (this.option) {
        config = this.option;
        contain = {
          config: config.detail || {},
          component: config.component || []
        }
        document.title = this.$website.title + '-' + contain.config.name;
        this.contain.config = Object.assign({}, defaultConfig, config.detail);
        draw();
      } else {
        this.setScale();
      }
    },
    //计算比例
    setScale(width) {
      const thick = this.contain.thick || 0
      this.contain.canvasWidth = this.contain.config.width;
      this.contain.canvasHeight = this.contain.config.height;
      this.contain.width = this.getTargetDom().offsetWidth - thick
      this.contain.height = this.getTargetDom().offsetHeight - thick
      this.contain.scale = this.contain.width / this.contain.config.width - 0.02
      this.$nextTick(() => {
        this.contain.initSize && this.contain.initSize()
      })
    },
    calcData() {
      if (!this.contain.config.mark) this.contain.config.mark = {}
      if (!this.contain.config.query) this.contain.config.query = {}
    },
  }
}
</script>

<style lang="scss">
@import "@/styles/echart.scss";
@import "@/styles/style.scss";
</style>