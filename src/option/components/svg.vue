<!-- svg配置 -->
<template>
  <div>
    <el-form-item label="颜色">
      <avue-input-color v-model="main.activeOption.color"></avue-input-color>
    </el-form-item>
    <el-form-item label="图标库">
      <p>
        <a href="https://www.iconfont.cn/" target="_blank">iconfont库</a>
      </p>
    </el-form-item>
    <el-form-item label="配置">
      <el-button type="primary" @click="openCode">编辑</el-button>
    </el-form-item>
    <el-form-item label-width="0">
      <avue-highlight :height="500" v-model="main.activeOption.content"></avue-highlight>
    </el-form-item>
    <codeedit @submit="codeClose" title="SVG图标" :rules="false" v-if="code.box" :type="code.type"
      language="html" v-model="code.obj" v-model:visible="code.box"></codeedit>
  </div>
</template>

<script>
import codeedit from '../../page/group/code.vue';
export default {
  name: 'svg',
  inject: ["main"],
  components: {
    codeedit
  },
  data() {
    return {
      code: {
        type: 'content',
        box: false,
        obj: {},
      }
    }
  },
  methods: {
    codeClose(value) {
      this.main.activeOption[this.code.type] = value;
    },
    openCode() {
      this.code.obj = this.main.activeOption[this.code.type];
      this.code.box = true;
    }
  }
}
</script>

<style>
</style>