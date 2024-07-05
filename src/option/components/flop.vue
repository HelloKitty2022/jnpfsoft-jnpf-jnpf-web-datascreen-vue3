<!-- 翻牌器配置 -->
<template>
  <div>
    <el-form-item label="整体">
      <avue-switch v-model="main.activeOption.whole">
      </avue-switch>
    </el-form-item>
    <el-form-item label="精度">
      <avue-input-number v-model="main.activeOption.decimals">
      </avue-input-number>
    </el-form-item>
    <el-form-item label="长宽">
      <avue-input-number v-model="main.activeOption.width">
      </avue-input-number>
      <avue-input-number v-model="main.activeOption.height">
      </avue-input-number>
    </el-form-item>
    <el-form-item label="外边距">
      <avue-input-number v-model="main.activeOption.marginTop"
                         :max="1000"></avue-input-number>
      <avue-input-number v-model="main.activeOption.marginLeft"
                         :max="1000"></avue-input-number>
    </el-form-item>
    <el-form-item label="内边距">
      <avue-input-number v-model="main.activeOption.paddingTop"
                         :max="1000"></avue-input-number>
      <avue-input-number v-model="main.activeOption.paddingLeft"
                         :max="1000"></avue-input-number>
    </el-form-item>
    <el-form-item label="边框">
      <avue-switch v-model="main.activeOption.border">
      </avue-switch>
    </el-form-item>
    <template v-if="main.activeOption.border">
      <el-form-item label="边框颜色">
        <avue-input-color v-model="main.activeOption.borderColor"></avue-input-color>
      </el-form-item>
      <el-form-item label="边框宽度">
        <avue-input-number v-model="main.activeOption.borderWidth">
        </avue-input-number>
      </el-form-item>
      <el-form-item label="图片地址">
        <img v-if="main.activeOption.backgroundBorder"
             :src="main.activeOption.backgroundBorder"
             alt=""
             style="width:100%;" />
        <el-input v-model="main.activeOption.backgroundBorder">
          <template #append>
            <div @click="main.handleOpenImg('activeOption.backgroundBorder','border')">
              <i class="iconfont icon-img"></i>
            </div>
          </template>
        </el-input>
      </el-form-item>
    </template>
    <el-form-item label="背景颜色">
      <avue-input-color v-model="main.activeOption.backgroundColor"></avue-input-color>
    </el-form-item>
    <el-collapse accordion>
      <el-collapse-item title="内容设置">
        <el-form-item label="内容">
          <avue-input v-model="main.activeObj.data.value"></avue-input>
        </el-form-item>
        <el-form-item label="字体大小">
          <avue-input-number v-model="main.activeOption.fontSize"
                             :max="200"></avue-input-number>
        </el-form-item>
        <el-form-item label="字体颜色">
          <avue-input-color v-model="main.activeOption.color"></avue-input-color>
        </el-form-item>
        <el-form-item label="文字粗细">
          <avue-select v-model="main.activeOption.fontWeight"
                       :dic="dicOption.fontWeight">
          </avue-select>
        </el-form-item>
        <el-form-item label="对其方式">
          <avue-select v-model="main.activeOption.textAlign"
                       :dic="dicOption.textAlign">
          </avue-select>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="前缀设置">
        <el-form-item label="不换行">
          <avue-switch v-model="main.activeOption.prefixInline"></avue-switch>
        </el-form-item>
        <el-form-item label="前缀内容">
          <avue-input v-model="main.activeObj.data.prefixText"></avue-input>
        </el-form-item>
        <el-form-item label="对其方式">
          <avue-select v-model="main.activeOption.prefixTextAlign"
                       :dic="dicOption.textAlign">
          </avue-select>
        </el-form-item>
        <el-form-item label="颜色">
          <avue-input-color v-model="main.activeOption.prefixColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="字体大小">
          <avue-input-number v-model="main.activeOption.prefixFontSize"
                             :max="200">
          </avue-input-number>
        </el-form-item>
        <el-form-item label="字体行高">
          <avue-input-number v-model="main.activeOption.prefixLineHeight"
                             :max="200">
          </avue-input-number>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="后缀设置">
        <el-form-item label="不换行">
          <avue-switch v-model="main.activeOption.suffixInline"></avue-switch>
        </el-form-item>
        <el-form-item label="后缀内容">
          <avue-input v-model="main.activeObj.data.suffixText"></avue-input>
        </el-form-item>
        <el-form-item label="对其方式">
          <avue-select v-model="main.activeOption.suffixTextAlign"
                       :dic="dicOption.textAlign">
          </avue-select>
        </el-form-item>
        <el-form-item label="颜色">
          <avue-input-color v-model="main.activeOption.suffixColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="字体大小">
          <avue-input-number v-model="main.activeOption.suffixFontSize"
                             :max="200">
          </avue-input-number>
        </el-form-item>
        <el-form-item label="字体行高">
          <avue-input-number v-model="main.activeOption.suffixLineHeight"
                             :max="200">
          </avue-input-number>
        </el-form-item>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { dicOption } from '@/option/config'
export default {
  name: 'flop',
  data () {
    return {
      dicOption: dicOption
    }
  },
  inject: ["main"]
}
</script>

<style>
</style>