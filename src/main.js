import { createApp } from 'vue'
import axios from './axios';
import router from './router/';
import ElementPlus from 'element-plus'
import createIcon from './icon';
import 'virtual:svg-icons-register';
import SvgIcon from "./icons/index.vue";
import 'element-plus/dist/index.css'
import DataVVue3 from '@kjgl77/datav-vue3'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Avue from '@smallwei/avue';
import { website } from '@/config.js'
import '@smallwei/avue/lib/index.css';
import draggable from '@/page/components/draggable.vue'
import highlight from '@/page/components/highlight.vue'
import { loadScript } from '@/utils/utils'
import error from './error';
import App from './App.vue'
import './styles/common.scss'
import '@/utils/es6'
import hljs from 'highlight.js' //导入代码高亮文件
import 'highlight.js/styles/atom-one-dark.css'  //导入代码高亮样
import { computedUrl } from './utils/utils'
const app = createApp(App)
window.axios = axios;
window.$loadScript = loadScript;
document.title = website.title
createIcon(app);
app.directive('highlight', function (el) {
  let highlight = el.querySelectorAll('pre code');
  highlight.forEach((block) => {
    hljs.highlightBlock(block)
  })
});
app.config.globalProperties.$component = app.component
app.config.globalProperties.$website = website;
const $loadingParams = {};
$loadingParams['element-loading-text'] = "加载中..."
$loadingParams['element-loading-background'] = "rgba(32,32,35, 0.8)"
app.config.globalProperties.$loadingParams = $loadingParams
app.config.globalProperties.computedImgUrl = (imgUri) => {
  return computedUrl(process.env.NODE_ENV === 'development' ? "/dev" : '', imgUri, router.options.base)
};
app.use(DataVVue3)
app.use(error);
app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.use(Avue, { axios })
app.component('avue-draggable', draggable)
app.component('avue-highlight', highlight)
app.component("svg-icon", SvgIcon)
app.mount('#app')
