<template>
  <el-container class="list">
    <el-header class="content__header">
      <el-button type="primary" icon="el-icon-plus" v-if="menu"
        @click="$refs.crud.rowAdd()">新增</el-button>
    </el-header>
    <el-main class="content">
      <avue-crud ref="crud" :option="option" v-model="form" @row-click="handleRowClick"
        v-model:page="page" @row-save="rowSave" @row-update="rowUpdate" @row-del="rowDel"
        @on-load="getList" v-loading="loading" v-bind="$loadingParams" :data="data">
      </avue-crud>
    </el-main>
  </el-container>
</template>

<script>
import { getList, getObj, addObj, delObj, updateObj } from '@/api/glob'
export default {
  props: {
    menu: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      form: {},
      data: [],
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      option: {
        height: 'auto',
        calcHeight: 360,
        header: false,
        labelWidth: 130,
        index: true,
        align: 'center',
        headerAlign: 'center',
        menu: this.menu,
        column: [
          {
            label: '名称',
            prop: 'globalName',
            rules: [{
              required: true,
              message: "请输入名称",
              trigger: "blur"
            }]
          },
          {
            label: '变量',
            prop: 'globalKey',
            tip: "提示:url中使用${xxx}，js语法中使用window.$glob['xxx']",
            rules: [{
              required: true,
              message: "请输入变量",
              trigger: "blur"
            }]
          },
          {
            label: '数值',
            prop: 'globalValue',
            type: 'textarea',
            overHidden: true,
            span: 24,
            rules: [{
              required: true,
              message: "请输入类型",
              trigger: "blur"
            }]
          }
        ]
      }
    }
  },
  methods: {
    handleRowClick(row, event, column) {
      const data = '${' + row.globalKey + '}'
      this.$Clipboard({
        text: data
      }).then(() => {
        this.$message.success(data + '变量复制成功')
      })
    },
    vaildData(id) {
      return [0, 1, 2].includes(id)
    },
    rowDel(row, index) {
      if (this.vaildData(index) && this.$website.isDemo) {
        this.$message.error(this.$website.isDemoTip)
        return false;
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delObj(row.id).then(() => {
          this.$message.success('删除成功');
          this.getList()
        })
      }).catch(() => {

      });

    },
    rowUpdate(row, index, done, loading) {
      if (this.vaildData(index) && this.$website.isDemo) {
        done();
        this.$message.error(this.$website.isDemoTip)
        return false;
      }
      updateObj(row).then(() => {
        done();
        this.$message.success('修改成功');
        this.getList()
      }).catch(err => {
        loading()
      })
    },
    rowSave(row, done, loading) {
      addObj(row).then(() => {
        this.$message.success('新增成功');
        this.getList()
        done();
      }).catch(err => {
        loading()
      })
    },
    getList() {
      this.loading = true
      getList({
        current: this.page.currentPage,
        size: this.page.pageSize,
      }).then(res => {
        this.loading = false
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>