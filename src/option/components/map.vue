<!-- 地图配置 -->
<template>
  <div>
    <el-form-item label="地图选择">
      <avue-select :dic="main.DIC.MAP"
                   v-model="main.activeOption.mapData"
                   placeholder="请选择地图"></avue-select>
    </el-form-item>
    <el-form-item label="地图比例">
      <avue-slider v-model="main.activeOption.zoom"
                   :max="5"
                   :step="0.1"></avue-slider>
    </el-form-item>
    <el-form-item label="地图缩放">
      <avue-switch v-model="main.activeOption.roam"></avue-switch>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="轮播设置">
        <el-form-item label="开启轮播">
          <avue-switch v-model="main.activeOption.banner"></avue-switch>
        </el-form-item>
        <template v-if="main.activeOption.banner">
          <el-form-item label="轮播时间">
            <avue-input v-model="main.activeOption.bannerTime"></avue-input>
          </el-form-item>
        </template>
      </el-collapse-item>
      <el-collapse-item title="基本设置">
        <el-form-item label="字体大小">
          <avue-input-number v-model="main.activeOption.fontSize"></avue-input-number>
        </el-form-item>
        <el-form-item label="字体高亮颜色">
          <avue-input-color v-model="main.activeOption.empColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="字体颜色">
          <avue-input-color v-model="main.activeOption.color"></avue-input-color>
        </el-form-item>
        <el-form-item label="边框颜色">
          <avue-input-color v-model="main.activeOption.borderColor"></avue-input-color>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="区域设置">
        <el-form-item label="区域线">
          <avue-input-number v-model="main.activeOption.borderWidth"></avue-input-number>
        </el-form-item>
        <el-form-item label="区域颜色">
          <avue-input-color v-model="main.activeOption.areaColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="区域高亮颜色">
          <avue-input-color v-model="main.activeOption.empAreaColor"></avue-input-color>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="提示设置">
        <el-form-item label="背景色">
          <avue-input-color v-model="main.activeOption.tipBackgroundColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="文字颜色">
          <avue-input-color v-model="main.activeOption.tipColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="文字大小">
          <avue-input-color v-model="main.activeOption.tipFontSize"></avue-input-color>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'map',
  inject: ["main"]
}
</script>

<style>
</style>