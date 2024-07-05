/** 
 * 自定义组件参考文档
 * https://cn.vuejs.org/v2/guide/components-registration.html
*/
import { website } from '@/config.js'
import $Echart from '../echart/common';
import { KEY_COMPONENT_NAME } from '../echart/variable';
export default (() => {
  let components = {}
  const mixins = [$Echart]

  const requireComponent = import.meta.globEager('./**/**/*.vue')
  Object.keys(requireComponent).forEach(fileName => {
    if (fileName.includes('index.vue')) {
      const cmp = requireComponent[fileName].default
      cmp.mixins = mixins
      components[`${KEY_COMPONENT_NAME}${cmp.name}`] = cmp
    }
  })

  website.componentsList.map(ele => ele.component).forEach(cmp => {
    try {
      cmp = eval(cmp)
      cmp.mixins = mixins
      components[`${KEY_COMPONENT_NAME}${cmp.name}`] = cmp
    } catch (err) {
      console.log(err)
    }
  })

  return components
})()
