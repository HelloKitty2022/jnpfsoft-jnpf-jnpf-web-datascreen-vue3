<!-- 自定义配置 -->
<template>
  <div>
    <el-form-item label="字体颜色">
      <avue-input-color v-model="main.activeOption.color"></avue-input-color>
    </el-form-item>
    <el-form-item label="字体大小">
      <avue-input-number v-model="main.activeOption.fontSize"></avue-input-number>
    </el-form-item>
  </div>
</template>
<script>
export default {
  name: 'fullscreen',
  inject: ["main"],
  data () {
    return {

    }
  }
}
</script>

<style>
</style>