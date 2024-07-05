<template>
  <div>
    <el-dialog append-to-body @open="open" title="导入导出" :close-on-click-modal="false" v-model="show"
      width="60%">
      <monaco-editor v-model="json" height="400" language="javascript"></monaco-editor>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="openScreen" type="primary">导入其他大屏组件</el-button>
          <el-button @click="openBlock" type="success">导入组件</el-button>
          <el-button @click="importData" type="danger">导入配置</el-button>
          <el-button @click="exportData" type="success">导出配置</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog append-to-body @open="open" class="avue-dialog" title="导入其他大屏组件"
      :close-on-click-modal="false" v-model="show2" width="60%">
      <el-input v-model="search" placeholder="请输入大屏的ID">
        <template #prepend>
          <avue-select :dic="contain.config.group" v-model="group" style="width:100px"
            placeholder="请选择大屏对象" :props="{label:'name',value:'id'}" />
        </template>
        <template #append>
          <el-button icon="el-icon-search" @click="handleSearch">搜索</el-button>
        </template>
      </el-input>
      <avue-crud :table-loading="loading" @selection-change="selectionChange" :option="option"
        :data="data">
      </avue-crud>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="importScreen" type="primary">导入组件</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog append-to-body @open="open" class="avue-dialog" title="导入组件(支持数组/对象)"
      :close-on-click-modal="false" v-model="show1" width="30%">
      <monaco-editor v-model="json1" height="200" language="javascript"></monaco-editor>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="importBlock" type="primary">导入组件</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import MonacoEditor from '@/page/components/monaco-editor'
import { getObj } from '@/api/visual'
export default {
  components: { MonacoEditor },
  inject: ["contain"],
  data() {
    return {
      show: false,
      show1: false,
      show2: false,
      json: {},
      json1: '',
      search: '',
      group: '',
      selection: [],
      option: {
        tip: false,
        header: false,
        selection: true,
        loading: false,
        delBtn: false,
        disabled: true,
        editBtnText: '查看',
        updateBtn: false,
        column: [{
          label: '组件类型',
          prop: 'title'
        }, {
          label: '组件名称',
          prop: 'name'
        }, {
          label: '代码',
          hide: true,
          span: 24,
          rows: 8,
          type: 'textarea',
          prop: 'code'
        }]
      },
      data: []
    }
  },
  methods: {
    selectionChange(list) {
      this.selection = list;
    },
    handleSearch() {
      this.loading = true;
      this.data = [];
      getObj(this.search).then(res => {
        this.loading = false;
        const data = res.data.data
        if (data && data.config && data.config.component) {
          let list = JSON.parse(data.config.component)
          list.forEach(ele => {
            ele.code = JSON.stringify(this.deepClone(ele), null, 4)
          })
          this.data = list;
        } else {
          this.data = []
        }
      })
    },
    open() {
      this.json = {
        detail: this.contain.config,
        component: this.contain.nav
      }
      this.json1 = ''
    },
    importBlock() {
      try {
        let json = typeof (this.json1) == 'string' ? JSON.parse(this.json1) : this.json1
        if (Array.isArray(json)) {
          json.forEach(ele => {
            ele.group = this.contain.group
            this.contain.nav.unshift(ele)
          })
        } else {
          json.group = this.contain.group
          this.contain.nav.unshift(json)
        }
        this.show = false
        this.show1 = false
        this.$message.success('导入组件成功')
      } catch (err) {
        this.$message.error('导入数据错误')
      }
    },
    openBlock() {
      this.show1 = true
    },
    importScreen() {
      this.selection.forEach(ele => {
        const column = this.deepClone(ele)
        column.group = this.group || this.contain.group
        delete column.$index
        delete column.code
        delete column.$cellEdit
        this.contain.nav.unshift(column)
      })
      this.show = false
      this.show2 = false
    },
    openScreen() {
      this.data = []
      this.selection = []
      this.search = ''
      this.show2 = true
    },
    importData() {
      try {
        let json = typeof (this.json) == 'string' ? JSON.parse(this.json) : this.json
        this.contain.config = json.detail
        this.contain.nav = json.component
        this.show = false;
        this.$message.success('数据导入成功')
      } catch (err) {
        this.$message.error('导入数据错误')
      }
    },
    exportData() {
      var zip = new window.JSZip();
      zip.file("data.txt", this.json);
      zip.generateAsync({ type: "base64" })
        .then((content) => {
          this.downFile("data:application/zip;base64," + content, 'data.zip')
        });
    }
  }
}
</script>

<style>
</style>