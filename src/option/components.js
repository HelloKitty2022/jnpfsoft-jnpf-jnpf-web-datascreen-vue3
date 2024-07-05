
import { website } from '@/config.js'

let requireComponent = import.meta.globEager('./components/**/*.vue')
let components = {}
const key = "Option"

Object.keys(requireComponent).forEach(fileName => {
  const cmp = requireComponent[fileName].default
  components[cmp.name + key] = cmp
})

requireComponent = import.meta.globEager('../components/**/*.vue')


Object.keys(requireComponent).forEach(fileName => {
  if (fileName.includes('option.vue')) {
    const cmp = requireComponent[fileName].default
    components[cmp.name + key] = cmp
  }
})

website.componentsList.map(ele => ele.option).forEach(cmp => {
  try {
    cmp = eval(cmp)
    components[cmp.name + key] = cmp
  } catch (err) {
    console.log(err)
  }

})

export default {
  components: components
}