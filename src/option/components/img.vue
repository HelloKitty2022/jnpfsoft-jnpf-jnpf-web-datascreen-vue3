<!-- 图片配置 -->
<template>
  <div>
    <el-form-item label="开启旋转">
      <avue-switch v-model="main.activeOption.rotate"></avue-switch>
    </el-form-item>
    <el-form-item label="透明度">
      <el-slider v-model="main.activeOption.opacity" :max="1" :step="0.1"></el-slider>
    </el-form-item>
    <el-form-item label="边框圆角">
      <el-input v-model="main.activeOption.borderRadius">
        <template #append>
          <span>px</span>
        </template>
      </el-input>
    </el-form-item>
    <template v-if="main.activeOption.rotate">
      <el-form-item label="旋转时间">
        <avue-input-number v-model="main.activeOption.duration"></avue-input-number>
      </el-form-item>
    </template>
    <el-form-item label="图片地址">
      <img v-if="main.activeObj.data.value" :src="computedImgUrl(main.activeObj.data.value)" alt=""
        style="width:100%;" />
      <el-input v-model="main.activeObj.data.value">
        <template #append>
          <div @click="main.handleOpenImg('activeObj.data.value','source')">
            <i class="iconfont icon-img"></i>
          </div>
        </template>

      </el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'img',
  inject: ["main"]
}
</script>

<style>
</style>