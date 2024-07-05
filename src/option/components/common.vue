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
      <avue-highlight :height="500" v-model="main.activeObj.echartFormatter"></avue-highlight>
    </el-form-item>
    <el-form-item label-width="0" v-else>
      <avue-highlight :height="500" v-model="main.activeComponent.remoteContent"></avue-highlight>
    </el-form-item>
    <codeedit @submit="codeClose" title="Echart配置" v-model="code.obj" v-if="code.box"
      :type="code.type" v-model:visible="code.box"></codeedit>
    <el-dialog title="组件库" v-model="api.box" class="avue-dialog" width="70%">
      <component-list v-if="api.box" :activeName="1" @change="handleApiChange"
        :menu="false"></component-list>
    </el-dialog>
  </div>
</template>

<script>
import codeedit from '../../page/group/code.vue';
import componentList from '../../page/list/components.vue'
import { getObj } from '@/api/components'
export default {
  name: 'common',
  inject: ["main"],
  data() {
    return {
      api: {
        box: false,
        item: {}
      },
      code: {
        type: 'echartFormatter',
        box: false,
        obj: {},
      }
    }
  },
  components: {
    componentList,
    codeedit
  },
  methods: {
    handleApiChange(val) {
      this.api.item = val
      getObj(this.api.item.id).then(res => {
        const data = res.data.data;
        this.main.activeObj[this.code.type] = data.content
        this.api.box = false;
        this.api.item = {}
      })
    },
    codeClose(value) {
      this.main.activeObj[this.code.type] = value;
    },
    openCode() {
      this.code.obj = this.main.activeObj[this.code.type];
      this.code.box = true;
    },
  }
}
</script>

<style>
</style>