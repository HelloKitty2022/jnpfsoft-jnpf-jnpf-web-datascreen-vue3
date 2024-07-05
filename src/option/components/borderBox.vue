<!-- iframe配置 -->
<template>
  <div>
    <el-form-item label="装饰类型">
      <avue-select v-model="main.activeOption.type"
                   :dic="dic">
      </avue-select>
    </el-form-item>
    <el-form-item label="主颜色">
      <avue-input-color v-model="main.activeOption.color1">
      </avue-input-color>
    </el-form-item>
    <el-form-item label="副颜色">
      <avue-input-color v-model="main.activeOption.color2">
      </avue-input-color>
    </el-form-item>
    <el-form-item label="背景色">
      <avue-input-color v-model="main.activeOption.backgroundColor">
      </avue-input-color>
    </el-form-item>
    <el-form-item label="动画时长">
      <avue-input-number v-model="main.activeOption.dur">
      </avue-input-number>
    </el-form-item>
  </div>
</template>

<script>
export default {
  name: 'borderBox',
  inject: ["main"],
  computed: {
    dic () {
      let result = new Array(12).fill('')
      return result.map((ele, index) => {
        index = index + 1;
        return {
          label: "边框" + index,
          value: index
        }
      })
    }
  }
}
</script>

<style>
</style>