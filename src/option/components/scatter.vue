<!-- 散点图配置 -->
<template>
  <div>
    <el-form-item label="点的大小">
      <avue-slider v-model="main.activeOption.symbolSize">
      </avue-slider>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'scatter',
  inject: ["main"]
}
</script>

<style>
</style>