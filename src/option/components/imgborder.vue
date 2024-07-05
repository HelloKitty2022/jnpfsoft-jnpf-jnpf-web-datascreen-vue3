<!-- 图片框配置 -->
<template>
  <div>
    <el-form-item label="背景色">
      <avue-input-color v-model="main.activeOption.backgroundColor"></avue-input-color>
    </el-form-item>
    <el-form-item label="图片透明度">
      <avue-slider v-model="main.activeOption.opacity"></avue-slider>
    </el-form-item>
    <el-form-item label="图片地址">
      <img v-if="main.activeObj.data" :src="computedImgUrl(main.activeObj.data)" alt=""
        style="width:100%;" />
      <el-input v-model="main.activeObj.data">
        <template #append>
          <div @click="main.handleOpenImg('activeObj.data','border')">
            <i class="iconfont icon-img"></i>
          </div>
        </template>

      </el-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'imgborder',
  inject: ["main"]
}
</script>

<style>
</style>