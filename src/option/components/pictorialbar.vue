 <!-- 象形图配置 -->
<template>
  <div>
    <el-form-item label="标题颜色">
      <avue-input-color v-model="main.activeOption.color"></avue-input-color>
    </el-form-item>
    <el-form-item label="标题大小">
      <avue-input-number v-model="main.activeOption.fontSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="数值颜色">
      <avue-input-color v-model="main.activeOption.labelColor"></avue-input-color>
    </el-form-item>
    <el-form-item label="数值大小">
      <avue-input-color v-model="main.activeOption.labelFontSize"></avue-input-color>
    </el-form-item>
    <el-form-item label="图标">
      <img v-if="main.activeOption.symbol" :src="main.activeOption.symbol" alt=""
        style="width:100%;" />
      <el-input v-model="main.activeOption.symbol">
        <template #append>
          <div @click="main.handleOpenImg('activeOption.symbol','source')">
            <i class="iconfont icon-img"></i>
          </div>
        </template>

      </el-input>
    </el-form-item>
    <el-form-item label="图标大小">
      <avue-input-number v-model="main.activeOption.symbolSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="间距">
      <avue-slider v-model="main.activeOption.split"></avue-slider>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'pictorialbar',
  inject: ["main"]
}
</script>

<style>
</style>