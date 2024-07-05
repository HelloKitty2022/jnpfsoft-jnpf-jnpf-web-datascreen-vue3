// import { Loading } from 'element-ui';
import { checkUrl } from '@/utils/utils'
import axios from 'axios';
import { ElMessage } from 'element-plus';
import { url as configUrl } from "@/config";
window.$glob = {
  url: '',
  group: '',
  params: {},
  query: {},
  header: {}
};
var query = window.location.search.substring(1);
if (query != '') {
  query = query.split("&");
  query.forEach(ele => {
    var pair = ele.split("=");
    window.$glob.params[pair[0]] = pair[1]
  })
}
axios.defaults.timeout = 10000;
//返回其他状态吗
axios.defaults.validateStatus = function (status) {
  return status >= 200 && status <= 500; // 默认的
};
//跨域请求，允许保存cookie
// let loadingInstance = '';
// axios.defaults.withCredentials = true;
axios.interceptors.request.use(config => {
  // loadingInstance = Loading.service({
  //   text: '拼命加载中',
  //   background: 'rgba(0,0,0,0)',
  //   spinner: 'el-icon-loading'
  // });
  let url = config.url;
  var glob_params = url.match(/\$\{(.+?)\}/g);
  (glob_params || []).forEach(ele => {
    let key = ele.replace('${', '').replace('}', '')
    url = url.replace(ele, window.$glob[key])
  })
  config.url = url;
  if (!checkUrl(config.url)) config.url = window.$glob.url + config.url;
  let header = window.$glob.header || {};
  config.headers = Object.assign(config.headers, header);
  let data = window.$glob.query || {}
  let key;
  if (['get', 'delete'].includes(config.method)) {
    key = "params"
  } else if (['post', 'put'].includes(config.method)) {
    key = "data"
  }
  if (typeof (config[key]) === 'object') {
    config[key] = Object.assign(config[key] || {}, data)
  }
  if (config.headers.proxy) {
    let headers = {}
    for (let ele in config.headers) {
      if (typeof (config.headers[ele]) !== 'object') headers[ele] = config.headers[ele]
    }
    let form = {
      url: config.url,
      method: config.method,
      headers: headers
    }
    form[key] = config[key]
    config.url = configUrl + '/visual/proxy'
    config.method = 'post';
    config.data = form
  }
  const token = localStorage.getItem("token") || ''
  config.headers['Authorization'] = config.headers['Authorization'] ? config.headers['Authorization'] : token
  return config
}, error => {
  return Promise.reject(error)
});
//HTTPrequest拦截
axios.interceptors.response.use(config => {
  // loadingInstance.close();
  const res = config.data
  if (res && res.code && res.code !== 200) {
    ElMessage({
      message: res.msg || '请求出错，请重试',
      type: 'error',
      duration: 1500
    })
    return Promise.reject(new Error(res.msg || 'Error'))
  }
  return config;
}, error => {
  // loadingInstance.close();
  return Promise.reject(new Error(error));
})

export default axios;
