<template>
  <el-dialog append-to-body
             title="全局变量"
             class="avue-dialog"
             :close-on-click-modal="false"
             v-model="box"
             width="70%">
    <glob :menu="false"></glob>
    <span class="avue-dialog__footer avue-dialog__footer--right">
      <el-button type="danger"
                 icon="el-icon-close"
                 @click="box=false">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import glob from '@/page/list/glob.vue'
export default {
  inject: ["contain"],
  components: {
    glob
  },
  data () {
    return {
      box: false
    }
  }
}
</script>

<style>
</style>