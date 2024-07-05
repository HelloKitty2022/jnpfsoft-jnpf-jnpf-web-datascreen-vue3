import view from './view.vue'
import { website } from '@/config.js'
export default {
  install (Vue, opt) {
    Vue.config.globalProperties.$component = Vue.component
    Vue.config.globalProperties.$website = website;
    Vue.component('avue-data', view)
  }
}