<!-- 雷达图配置 -->
<template>
  <div>
    <el-form-item label="区域透明度">
      <avue-slider v-model="main.activeOption.areaOpacity"
                   :max="1"
                   :step="0.1">
      </avue-slider>
    </el-form-item>
    <el-form-item label="文字大小">
      <avue-input-number v-model="main.activeOption.fontSize">
      </avue-input-number>
    </el-form-item>
    <el-form-item label="文字颜色">
      <avue-input-color v-model="main.activeOption.color">
      </avue-input-color>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'radar',
  inject: ["main"]
}
</script>

<style>
</style>