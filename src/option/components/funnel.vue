<!-- 漏斗图配置 -->
<template>
  <div>
    <el-form-item label="文字内部">
      <avue-switch v-model="main.activeOption.position"></avue-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'funnel',
  inject: ["main"]
}
</script>

<style>
</style>