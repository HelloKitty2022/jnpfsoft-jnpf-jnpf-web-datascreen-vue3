// 查看页面和编辑页面公用的参数和方法
import common from '@/config'
import { config } from '@/option/config'
import container from '@/page/group/container.vue'
import { getFunction } from '@/utils/utils'
import { getList } from '@/api/map'
import { url } from '@/config';

export default {
  components: {
    container
  },
  provide() {
    return {
      main: this,
      contain: this
    };
  },
  data() {
    return {
      id: '',
      render: false,
      DIC: {
        MAP: []
      },
      canvasWidth: 0,
      canvasHeight: 0,
      width: 0,
      height: 0,
      config: config,
      group: '',
      obj: {},
      visual: {},
      nav: [],
      common: common,
      active: [],
      activeIndex: null,
      activeOverIndex: null,
      configData: ['header', 'query', 'before', 'style']
    }
  },
  watch: {
    config: {
      handler(val) {
        this.setGlobParams(val)
      },
      deep: true,
      immediate: true
    },
  },
  computed: {
    list() {
      let result = [];
      const detail = (list) => {
        list.forEach(item => {
          result.push(item)
          if (item.children) detail(item.children);
        })
      }
      detail(this.nav);
      const len = result.length - 1;
      result.forEach((ele, index) => ele.zIndex = len - index)
      result = result.filter(ele => {
        if (this.validatenull(ele.group)) return true
        return ele.group == this.group
      })
      return result
    }
  },
  created() {
    this.init();
  },
  methods: {
    //初始化字典
    init() {
      Object.defineProperty(window.$glob, 'group', {
        set: (val) => {
          this.group = val;
        }
      })
      getList({
        current: 1,
        size: 100,
      }).then(res => {
        const data = res.data.data;
        this.DIC.MAP = data.records.map(ele => {
          return {
            label: ele.name,
            value: url + '/map/data?id=' + ele.id
          }
        });
      })
    },
    findnav(id) {
      let result = {}
      const detail = (list, parent, parentIndex, deep) => {
        list.forEach((item, index) => {
          if (id === item.index) {
            result = {
              index: item.index,
              deep: deep,
              item: item,
              itemIndex: index,
              itemLen: list.length - 1,
              itemList: list,
              parent: parent,
              parentIndex: parentIndex
            }
          } else if (item.children) {
            detail(item.children, item, index, deep + 1)
          }
        })
      }
      detail(this.nav, this.nav, 0, 0)
      return result
    },
    findList(index) {
      return this.list.find(ele => ele.index == index) || {}
    },
    handleInitActive() {
      this.keys.ctrl = false
      this.active = []
      this.activeIndex = null
    },
    setGlobParams(val) {
      val = val || this.config
      const styleEl = document.createElement('style');
      styleEl.innerHTML = val.style
      document.head.appendChild(styleEl);
      this.configData.forEach(ele => {
        let result = getFunction(val[ele], true)
        window.$glob[ele] = typeof result === 'function' && result() || {}
        delete window.$glob[ele]['']
      })
      window.$glob.url = val.url
      this.render = true
    }
  }
}
