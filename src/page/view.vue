<template>
  <div class="build views" :style="viewStyle">
    <container :id="id" :target="target" :option="option" ref="container"></container>
  </div>
</template>
<script>
import init from '@/mixins/'
import { getUrlParam } from "../utils/utils";
export default {
  props: {
    target: String,
    option: Object,
    id: [String, Number]
  },
  mixins: [init],
  data() {
    return {
      viewStyle: {}
    }
  },
  created() {
    const token = getUrlParam('token') || ''
    if (token) localStorage.setItem('token', token)
  },
}
</script>