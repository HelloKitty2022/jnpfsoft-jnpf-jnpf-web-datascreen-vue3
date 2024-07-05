<template>
  <el-container class="list">
    <el-header class="content__header">
      <el-button type="primary" icon="el-icon-plus" @click="$refs.crud.rowAdd()">新增</el-button>
    </el-header>
    <el-main class="content">
      <avue-crud ref='crud' :option="option" v-model="form" @row-save="rowSave"
        @row-update="rowUpdate" @row-del="rowDel" :before-open="beforeOpen"
        :data="data"></avue-crud>
    </el-main>
  </el-container>
</template>

<script>
import { getList, getObj, addObj, delObj, updateObj } from '@/api/category'
export default {
  data() {
    return {
      loading: false,
      form: {},
      data: [],
      option: {
        height: 'auto',
        calcHeight: 40,
        header: false,
        index: true,
        align: 'center',
        headerAlign: 'center',
        column: [
          {
            label: '模块名',
            prop: 'categoryKey',
            rules: [{
              required: true,
              message: "请输入模块名",
              trigger: "blur"
            }]
          },
          {
            label: '模块值',
            prop: 'categoryValue',
            type: 'number',
            rules: [{
              required: true,
              message: "请输入模块值",
              trigger: "blur"
            }]
          }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    validData(id) {
      return [0, 1, 2].includes(id)
    },
    beforeOpen(done, type) {
      if (type == 'edit') {
        getObj(this.form.id).then(res => {
          const data = res.data.data;
          this.form = data
          done()
        })
      } else {
        done()
      }
    },
    rowDel(row, index) {
      if (this.validData(index) && this.$website.isDemo) {
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
      if (this.validData(index) && this.$website.isDemo) {
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
        current: 1,
        size: 100,
      }).then(res => {
        this.loading = false
        const data = res.data.data;
        this.data = data;
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>