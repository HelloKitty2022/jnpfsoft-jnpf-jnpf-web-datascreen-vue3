<template>
  <el-container class="list">
    <el-header class="content__header">
      <el-button type="primary" icon="el-icon-plus" @click="$refs.crud.rowAdd()">新增</el-button>
    </el-header>
    <el-main class="content">
      <avue-crud ref="crud" :option="option" :data="data" v-model:page="page"
        :before-open="beforeOpen" v-model="form" @row-update="rowUpdate" @row-save="rowSave"
        @row-del="rowDel" @refresh-change="refreshChange" @on-load="onLoad">
        <template #menu-form>
          <el-button type="primary" @click="handleTest()">测试连接</el-button>
        </template>
        <template #menu="{row,size}">
          <el-button icon="el-icon-check" type="primary" :size="size" text
            @click="handleTest(row)">测试连接</el-button>
        </template>
      </avue-crud>
    </el-main>
  </el-container>
</template>

<script>
import { getList, getDetail, add, update, remove, dbTest } from "@/api/db";
export default {
  data() {
    return {
      loading: false,
      form: {},
      page: {
        pageSize: 10,
        currentPage: 1,
        total: 0
      },
      option: {
        height: 'auto',
        calcHeight: 40,
        header: false,
        index: true,
        copyBtn: true,
        labelWidth: 110,
        menuWidth: 320,
        column: [
          {
            label: "名称",
            prop: "name",
            width: 120,
            rules: [{
              required: true,
              message: "请输入数据源名称",
              trigger: "blur"
            }]
          },
          {
            label: "驱动类",
            prop: "driverClass",
            type: 'select',
            dicData: [
              {
                label: 'com.mysql.cj.jdbc.Driver',
                value: 'com.mysql.cj.jdbc.Driver',
              }, {
                label: 'org.postgresql.Driver',
                value: 'org.postgresql.Driver',
              }, {
                label: 'oracle.jdbc.OracleDriver',
                value: 'oracle.jdbc.OracleDriver',
              }, {
                label: 'com.microsoft.sqlserver.jdbc.SQLServerDriver',
                value: 'com.microsoft.sqlserver.jdbc.SQLServerDriver'
              }
            ],
            width: 200,
            rules: [{
              required: true,
              message: "请输入驱动类",
              trigger: "blur"
            }]
          },
          {
            label: "用户名",
            prop: "username",
            width: 120,
            rules: [{
              required: true,
              message: "请输入用户名",
              trigger: "blur"
            }]
          },
          {
            label: "密码",
            prop: "password",
            type: 'password',
            hide: true,
            rules: [{
              required: true,
              message: "请输入密码",
              trigger: "blur"
            }]
          },
          {
            label: "连接地址",
            prop: "url",
            type: 'textarea',
            span: 24,
            rules: [{
              required: true,
              message: "请输入连接地址",
              trigger: "blur"
            }]
          },
          {
            label: "备注",
            prop: "remark",
            span: 24,
            minRows: 3,
            hide: true,
            type: "textarea"
          },
        ]
      },
      data: []
    };
  },
  methods: {
    validData(id) {
      return [0, 1, 2, 3].includes(id)
    },
    rowSave(row, done, loading) {
      add(row).then(() => {
        this.onLoad();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        done();
      }).catch(err => {
        loading()
      });
    },
    rowUpdate(row, index, done, loading) {
      if (this.validData(index) && this.$website.isDemo) {
        this.$message.error(this.$website.isDemoTip)
        done();
        return false;
      }
      update(row).then(() => {
        done();
        this.onLoad();
        this.$message({
          type: "success",
          message: "操作成功!"
        });
      }).catch(err => {
        loading()
      });
    },
    rowDel(row, index) {
      if (this.validData(index) && this.$website.isDemo) {
        this.$message.error(this.$website.isDemoTip)
        return false;
      }
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          return remove(row.id);
        })
        .then(() => {
          this.onLoad();
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });

    },
    beforeOpen(done, type) {
      if (["edit", "view"].includes(type)) {
        getDetail(this.form.id).then(res => {
          this.form = res.data.data;
        });
      }
      done();
    },
    refreshChange() {
      this.onLoad();
    },
    handleTest(form) {
      form = form || this.form
      const callback = () => {
        dbTest({
          driverClass: form.driverClass,
          url: form.url,
          username: form.username,
          password: form.password
        }).then(res => {
          if (res.data && res.data.code == 200) return this.$message.success((res.data && res.data.msg) || "连接成功")
          this.$message.error((res.data && res.data.msg) || '连接失败，请检查相关配置参数')
        })
      }
      if (this.$refs.crud.validate) {
        this.$refs.crud.validate((valid, done, msg) => {
          if (valid) {
            done()
            callback()
          } else {
            return false;
          }
        })
      } else {
        callback()
      }
    },
    onLoad() {
      this.loading = true
      getList({
        current: this.page.currentPage,
        size: this.page.pageSize,
      }).then(res => {
        this.loading = false
        const data = res.data.data;
        this.page.total = data.total;
        this.data = data.records;
      });
    }
  }
};
</script>

<style>
</style>