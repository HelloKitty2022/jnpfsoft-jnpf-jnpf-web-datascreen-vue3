<!-- 通用形配置 -->
<template>
  <div>
    <el-form-item label="远程组件">
      <avue-switch v-model="main.activeOption.remote"></avue-switch>
    </el-form-item>
    <el-form-item label="组件地址" v-if="main.activeOption.remote">
      <avue-input type="textarea" v-model="main.activeOption.src"></avue-input>
    </el-form-item>
    <el-form-item v-else label="配置">
      <el-button type="primary" @click="openCode">编辑</el-button>
      <el-button type="primary" @click="api.box=true" icon="el-icon-search"></el-button>
    </el-form-item>
    <el-form-item label-width="0" v-if="!main.activeOption.remote">
      <avue-highlight :height="500" v-model="main.activeOption.content"></avue-highlight>
    </el-form-item>
    <el-form-item label-width="0" v-else>
      <avue-highlight :height="500" v-model="main.activeComponent.remoteContent"></avue-highlight>
    </el-form-item>
    <codeedit @submit="codeClose" title="配置列表" :rules="false" v-model="code.obj" v-if="code.box"
      :type="code.type" language="javascript" v-model:visible="code.box"></codeedit>
    <el-dialog title="组件库" v-model="api.box" class="avue-dialog" width="70%">
      <component-list v-if="api.box" :activeName="0" @change="handleApiChange"
        :menu="false"></component-list>
    </el-dialog>
  </div>
</template>

<script>
import codeedit from '../../page/group/code.vue';
import componentList from '../../page/list/components.vue'
import { getObj } from '@/api/components'
export default {
  name: 'vue',
  inject: ["main"],
  components: {
    componentList,
    codeedit
  },
  data() {
    return {
      api: {
        box: false,
        item: {}
      },
      code: {
        type: 'content',
        box: false,
        obj: {},
      }
    }
  },
  methods: {
    handleApiChange(val) {
      this.api.item = val
      getObj(this.api.item.id).then(res => {
        const data = res.data.data;
        this.main.activeOption[this.code.type] = data.content
        this.api.box = false;
        this.api.item = {}
      })
    },
    codeClose(value) {
      this.main.activeOption[this.code.type] = value;
    },
    openCode() {
      this.code.obj = this.main.activeOption[this.code.type];
      this.code.box = true;
    },
  }
}
</script>

<style>
</style>