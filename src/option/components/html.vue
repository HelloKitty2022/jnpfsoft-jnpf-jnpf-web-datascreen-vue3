<!-- 通用形配置 -->
<template>
  <div>
    <el-form-item label="远程组件">
      <avue-switch v-model="main.activeOption.remote"></avue-switch>
    </el-form-item>
    <el-form-item label="组件地址"
                  v-if="main.activeOption.remote">
      <avue-input type="textarea"
                  v-model="main.activeOption.src"></avue-input>
    </el-form-item>
    <el-form-item label="配置"
                  v-else>
      <el-button type="primary"
                 @click="openCode">编辑</el-button>

    </el-form-item>
    <el-form-item label-width="0"
                  v-if="!main.activeOption.remote">
      <avue-highlight :height="500"
                      v-model="main.activeOption.content"></avue-highlight>
    </el-form-item>
    <el-form-item label-width="0"
                  v-else>
      <avue-highlight :height="500"
                      v-model="main.activeComponent.remoteContent"></avue-highlight>
    </el-form-item>
    <codeedit @submit="codeClose"
              title="html源码自定义配置"
              :rules="false"
              v-model="code.obj"
              v-if="code.box"
              :type="code.type"
              language="html"
              v-model:visible="code.box"></codeedit>

  </div>
</template>

<script>
import codeedit from '../../page/group/code.vue';
export default {
  name: 'html',
  inject: ["main"],
  components: {
    codeedit
  },
  data () {
    return {
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