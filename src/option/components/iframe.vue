<!-- iframe配置 -->
<template>
  <div>
    <el-form-item label="地址">
      <avue-input type="textarea"
                  v-model="main.activeObj.data.value"></avue-input>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'iframe',
  inject: ["main"]
}
</script>

<style>
</style>