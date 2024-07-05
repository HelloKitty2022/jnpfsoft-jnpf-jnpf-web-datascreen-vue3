import AvueData from './page/view';

const install = (Vue, ops) => {
  Vue.component('avue-data', AvueData)
}

// 如果是直接引入的
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}