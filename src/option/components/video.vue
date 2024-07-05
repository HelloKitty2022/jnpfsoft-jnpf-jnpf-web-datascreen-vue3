<!-- video配置 -->
<template>
  <div>
    <el-form-item label="地址">
      <avue-input type="textarea" v-model="main.activeObj.data.value"></avue-input>
    </el-form-item>
    <el-form-item label="封面">
      <img v-if="main.activeOption.poster" :src="main.activeOption.poster" alt=""
        style="width:100%;" />
      <el-input v-model="main.activeOption.poster">
        <template #append>
          <div @click="main.handleOpenImg('activeOption.poster','screenShot')">
            <i class="iconfont icon-img"></i>
          </div>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="自动播放">
      <avue-switch v-model="main.activeOption.autoplay"></avue-switch>
    </el-form-item>
    <el-form-item label="控制台">
      <avue-switch v-model="main.activeOption.controls"></avue-switch>
    </el-form-item>
    <el-form-item label="循环">
      <avue-switch v-model="main.activeOption.loop"></avue-switch>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'video',
  inject: ["main"]
}
</script>

<style>
</style>