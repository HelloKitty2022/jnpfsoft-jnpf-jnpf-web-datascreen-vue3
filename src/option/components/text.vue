<!-- 文字配置 -->
<template>
  <div>
    <el-form-item label="文本内容">
      <avue-input type="textarea" v-model="main.activeObj.data.value"></avue-input>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="字体设置">
        <el-form-item label="字体类型">
          <avue-select filterable allow-create v-model="main.activeOption.fontFamily"
            :dic="dicOption.fontFamily"></avue-select>
        </el-form-item>
        <el-form-item label="字体大小">
          <avue-input-number v-model="main.activeOption.fontSize" :max="200"></avue-input-number>
        </el-form-item>
        <el-form-item label="字体颜色">
          <avue-input-color v-model="main.activeOption.color"></avue-input-color>
        </el-form-item>
        <el-form-item label="字体间距">
          <avue-input-number v-model="main.activeOption.split"></avue-input-number>
        </el-form-item>
        <el-form-item label="字体行高">
          <avue-input-number v-model="main.activeOption.lineHeight"></avue-input-number>
        </el-form-item>
        <el-form-item label="字体背景">
          <avue-input-color v-model="main.activeOption.backgroundColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="文字粗细">
          <avue-select v-model="main.activeOption.fontWeight" :dic="dicOption.fontWeight">
          </avue-select>
        </el-form-item>
        <el-form-item label="对齐方式">
          <avue-select v-model="main.activeOption.textAlign" :dic="dicOption.textAlign">
          </avue-select>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="跑马灯设置">
        <el-form-item label="开启">
          <avue-switch v-model="main.activeOption.scroll"></avue-switch>
        </el-form-item>
        <template v-if="main.activeOption.scroll">
          <el-form-item label="滚动速度">
            <avue-input v-model="main.activeOption.speed"></avue-input>
          </el-form-item>
        </template>
      </el-collapse-item>
      <el-collapse-item title="超链设置">
        <el-form-item label="开启">
          <avue-switch v-model="main.activeOption.link"></avue-switch>
        </el-form-item>
        <template v-if="main.activeOption.link">
          <el-form-item label="打开方式">
            <avue-radio v-model="main.activeOption.linkTarget" :dic="dicOption.target">
            </avue-radio>
          </el-form-item>
          <el-form-item label="超链地址">
            <avue-input v-model="main.activeOption.linkHref"></avue-input>
          </el-form-item>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { dicOption } from '@/option/config'
export default {
  name: 'text',
  data() {
    return {
      dicOption: dicOption
    }
  },
  inject: ["main"]
}
</script>

<style>
</style>