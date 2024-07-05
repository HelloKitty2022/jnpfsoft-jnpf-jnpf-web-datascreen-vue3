<!-- 组合配置 -->
<template>
  <div>
    <el-form-item label="缩放">
      <avue-slider :min="0.1"
                   :step="0.1"
                   :max="10"
                   v-model="main.activeComponent.scale"></avue-slider>
    </el-form-item>
    <el-form-item label="其他大屏">
      <avue-switch v-model="main.activeOption.remote"></avue-switch>
    </el-form-item>
    <el-form-item label="大屏ID"
                  v-if="main.activeOption.remote">
      <el-input v-model="main.activeOption.id"
                placeholder="请输入">
      </el-input>
    </el-form-item>
    <template v-if="!main.activeOption.remote">
      <el-form-item label="配置">
        <el-button type="primary"
                   @click="openCode">编辑</el-button>
      </el-form-item>
      <el-form-item label-width="0">
        <avue-highlight :height="500"
                        v-model="main.activeOption.content"></avue-highlight>
      </el-form-item>
    </template>
    <codeedit @submit="codeClose"
              title="组件代码"
              :rules="false"
              v-model="code.obj"
              v-if="code.box"
              :type="code.type"
              language="javascript"
              v-model:visible="code.box"></codeedit>

  </div>
</template>

<script>
import codeedit from '../../page/group/code.vue';
export default {
  name: 'group',
  inject: ["main"],
  components: {
    codeedit
  },
  data () {
    return {
      loading: false,
      code: {
        type: 'content',
        box: false,
        obj: {},
      }
    }
  },
  methods: {
    codeClose (value) {
      this.main.activeOption[this.code.type] = value;
    },
    openCode () {
      this.code.obj = this.main.activeOption[this.code.type];
      this.code.box = true;
    },
  }
}
</script>

<style>
</style>