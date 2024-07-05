<!-- 通用形配置 -->
<template>
  <div>
    <el-form-item label="在线文档">
      <a href="http://datav.jiaminghi.com/guide/" target="_blank">点击查看</a>
    </el-form-item>
    <el-form-item label="模块名称">
      <avue-input v-model="main.activeOption.is"></avue-input>
    </el-form-item>
    <el-form-item label="配置">
      <el-button type="primary" @click="openCode">编辑</el-button>
    </el-form-item>
    <el-form-item label-width="0">
      <avue-highlight :height="500" v-model="main.activeOption.content"></avue-highlight>
    </el-form-item>
    <codeedit @submit="codeClose" title="datv配置" v-model="code.obj" v-if="code.box"
      :type="code.type" v-model:visible="code.box"></codeedit>
  </div>
</template>

<script>
import codeedit from '../../page/group/code.vue';
export default {
  name: 'datav',
  inject: ["main"],
  data() {
    return {
      code: {
        box: false,
        obj: {},
      }
    }
  },
  components: {
    codeedit
  },
  methods: {
    codeClose(value) {
      this.main.activeObj[this.code.type] = value;
    },
    openCode() {
      this.code.type = 'echartFormatter';
      this.code.obj = this.main.activeObj[this.code.type];
      this.code.box = true;
    },
  }
}
</script>

<style>
</style>