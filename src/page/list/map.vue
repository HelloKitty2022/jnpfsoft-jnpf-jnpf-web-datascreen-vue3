<template>
  <el-container class="list">
    <el-header class="content__header">
      <el-button type="primary" icon="el-icon-plus" @click="$refs.crud.rowAdd()">新增</el-button>
      <el-button type="primary" icon="el-icon-add-location">
        <a class="title" target="_blank"
          href="https://datav.aliyun.com/tools/atlas/#&lat=33.521903996156105&lng=104.29849999999999&zoom=4">
          添加更多地图
        </a>
      </el-button>
    </el-header>
    <el-main class="content">
      <avue-crud ref="crud" :option="option" v-model="form" v-model:page="page" @row-save="rowSave"
        @row-update="rowUpdate" @row-del="rowDel" @on-load="getList" :before-open="beforeOpen"
        :data="data">
        <template #menu-left="{size}">
          <el-button type="primary" :size="size" icon="el-icon-add-location">
            <a class="title" target="_blank"
              href="https://datav.aliyun.com/tools/atlas/#&lat=33.521903996156105&lng=104.29849999999999&zoom=4">
              添加更多地图
            </a>
          </el-button>
        </template>
      </avue-crud>
    </el-main>
  </el-container>
</template>

<script>
import { getList, getObj, addObj, delObj, updateObj } from '@/api/map'
export default {
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
        calcHeight: 40,
        header: false,
        labelWidth: 100,
        index: true,
        align: 'center',
        headerAlign: 'center',
        column: [
          {
            label: '地图名称',
            prop: 'name',
            row: true,
            rules: [{
              required: true,
              message: "请输入地图名称",
              trigger: "blur"
            }]
          },
          {
            label: '地图数据',
            prop: 'data',
            span: 24,
            hide: true,
            type: 'textarea',
            minRows: 20
          }
        ]
      }
    }
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
          this.form.data = JSON.stringify(JSON.parse(this.form.data), null, 4)
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
    rowUpdate(row, index, done) {
      if (this.validData(index) && this.$website.isDemo) {
        done();
        this.$message.error(this.$website.isDemoTip)
        return false;
      }
      updateObj(row).then(() => {
        done();
        this.$message.success('修改成功');
        this.getList()

      })
    },
    rowSave(row, done) {
      addObj(row).then(() => {
        this.$message.success('新增成功');
        this.getList()
        done();
      })
    },
    getList() {
      this.loading = true;
      getList({
        current: this.page.currentPage,
        size: this.page.pageSize,
      }).then(res => {
        this.loading = false;
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