<!-- 刻度盘配置 -->
<template>
  <div>
    <el-form-item label="刻度值">
      <avue-switch v-model="main.activeOption.axisLabelShow"></avue-switch>
    </el-form-item>
    <el-form-item label="刻度字号"
                  v-if="main.activeOption.axisLabelShow">
      <avue-input-number v-model="main.activeOption.axisLabelFontSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="刻度粗度">
      <avue-input-number v-model="main.activeOption.lineSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="刻度颜色">
      <avue-input-color v-model="main.activeOption.lineColor"></avue-input-color>
    </el-form-item>
    <el-form-item label="指标字体大小">
      <avue-input-number v-model="main.activeOption.nameFontSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="指标单位">
      <avue-input v-model="main.activeOption.unit"></avue-input>
    </el-form-item>

  </div>
</template>

<script>
export default {
  name: 'gauge',
  inject: ["main"]
}
</script>

<style>
</style>