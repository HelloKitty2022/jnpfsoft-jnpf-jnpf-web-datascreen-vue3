<template>
  <el-container class="list">
    <el-header class="content__header">
      <el-button type="primary" icon="el-icon-plus" @click="$refs.crud.rowAdd()">新增</el-button>
    </el-header>
    <el-main class="content">
      <avue-crud ref="crud" :option="option" v-model="form" v-model:page="page" @row-save="rowSave"
        @row-update="rowUpdate" @row-del="rowDel" @on-load="getList" :before-close="beforeClose"
        :before-open="beforeOpen" :data="data">
        <template #content-form="{}">
          <template v-if="isStatic">
            <el-form-item label="数据值" label-position="top">
              <monaco-editor v-model="form.data" language="javascript" height="100"></monaco-editor>
              <br />
              <el-upload :show-file-list="false" :auto-upload="false" style="display:inline-block"
                accept=".xls,.xlsx" :on-change="handleImport">
                <el-button icon="el-icon-upload" type="success">导入数据(Excel)</el-button>
              </el-upload>

            </el-form-item>
          </template>
          <template v-else-if="isSql">
            <el-form-item label="数据源选择">
              <avue-select :dic="DIC.sql" v-model="form.dbId"></avue-select>
            </el-form-item>

            <el-form-item label="SQL语句" label-position="top">
              <monaco-editor v-model="form.dbSql" language="sql" height="100"></monaco-editor>
            </el-form-item>
          </template>
          <template v-else-if="isApi">
            <el-form-item label="接口地址">
              <avue-input v-model="form.url"></avue-input>
            </el-form-item>
            <el-form-item label="开启跨域">
              <avue-switch v-model="form.proxy" @click="handleRes"></avue-switch>
            </el-form-item>
            <el-form-item label="请求方式">
              <avue-select v-model="form.dataMethod" :dic="DIC.method"></avue-select>
            </el-form-item>
          </template>
          <template v-else-if="isWs">
            <el-form-item label="WS地址">
              <el-input v-model="form.wsUrl">
              </el-input>
            </el-form-item>
          </template>
          <template v-else-if="isMqtt">
            <el-form-item label="MQTT地址">
              <el-input v-model="form.mqttUrl">
              </el-input>
            </el-form-item>
            <el-form-item label="MQTT配置">
              <monaco-editor v-model="form.mqttConfig" height="250"></monaco-editor>
            </el-form-item>
          </template>
          <el-form-item label="请求配置" v-if="isWs || isApi">
            <el-tabs class="menu__tabs" v-model="tabs">
              <el-tab-pane label="请求参数（Body）" name="0">
                <template v-if="tabs==0">
                  <el-radio-group size="mini" v-if="['post','put'].includes(form.dataMethod)"
                    v-model="form.dataQueryType">
                    <el-radio label="json">JSON数据</el-radio>
                    <el-radio label="form">FORM表单</el-radio>
                  </el-radio-group>
                  <monaco-editor v-model="form.dataQuery" language="javascript"
                    height="100"></monaco-editor>
                </template>
              </el-tab-pane>
              <el-tab-pane label="请求头（Headers）" v-if="isApi" name="1">
                <template v-if="tabs==1">
                  <monaco-editor v-model="form.dataHeader" language="javascript"
                    height="100"></monaco-editor>
                </template>
              </el-tab-pane>
            </el-tabs>
          </el-form-item>
          <el-form-item label="过滤器">
            <monaco-editor v-model="form.dataFormatter" height="100"></monaco-editor>
          </el-form-item>
          <el-form-item label="响应数据">
            <monaco-editor v-model="result" disabled height="100"></monaco-editor>
          </el-form-item>
        </template>
        <template #menu-form>
          <el-button @click="handleRes" icon="el-icon-upload" type="primary">刷新数据</el-button>
        </template>
      </avue-crud>
    </el-main>
  </el-container>
</template>

<script>
import * as mqtt from 'mqtt/dist/mqtt.min';
import { addParam } from '@/echart/util';
import { getFunction, funEval } from '@/utils/utils'
import MonacoEditor from '@/page/components/monaco-editor'
import { getList, getObj, addObj, delObj, updateObj } from '@/api/record'
import { getList as getDbList, dynamicSql } from "@/api/db";
import { dicOption } from '@/option/config'
dicOption.dataType.splice(4, 1)
const dataType = dicOption.dataType
export default {
  components: {
    MonacoEditor,
  },
  data() {
    return {
      loading: false,
      tabs: 0,
      box: false,
      client: {},
      DIC: {
        method: dicOption.dataMethod,
        sql: []
      },
      result: {},
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
        labelWidth: 130,
        index: true,
        align: 'center',
        headerAlign: 'center',
        column: [
          {
            label: '名称',
            prop: 'name',
            rules: [{
              required: true,
              message: "请输入名称",
              trigger: "blur"
            }]
          },
          {
            label: '类型',
            prop: 'dataType',
            type: 'select',
            dicData: dataType,
            rules: [{
              required: true,
              message: "请选择类型",
              trigger: "blur"
            }]
          },
          {
            label: '',
            prop: 'content',
            hide: true,
            labelWidth: 0,
            span: 24,
          }
        ]
      }
    }
  },
  computed: {
    isStatic() {
      return this.form.dataType === 0
    },
    isApi() {
      return this.form.dataType == 1
    },
    isSql() {
      return this.form.dataType == 2
    },
    isWs() {
      return this.form.dataType === 3
    },
    isMqtt() {
      return this.form.dataType == 6
    }
  },
  watch: {
    'form.dataType'() {
      this.result = ''
      this.tabs = '0'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getDbList({
        current: 1,
        size: 100,
      }).then(res => {
        const data = res.data.data;
        this.DIC.sql = data.records.map(ele => {
          return {
            label: ele.name,
            value: ele.id
          }
        })
      });
    },
    getSql(row) {
      return JSON.stringify({
        id: row.dbId,
        sql: row.dbSql
      })
    },
    handleClose() {
      this.client.close && this.client.close()
    },
    handleRes(tip = true) {
      this.result = '';
      const formatter = (data) => {
        const dataFormatter = getFunction(this.form.dataFormatter)
        if (tip) this.$message.success('数据刷新成功')
        if (typeof dataFormatter == 'function') {
          return dataFormatter(data)
        }

        return data
      }
      if (this.isStatic) {
        let result = funEval(this.form.data)
        this.result = formatter(result);
      } else if (this.isApi) {
        let dataQuery = getFunction(this.form.dataQuery)
        dataQuery = typeof (dataQuery) === 'function' && dataQuery(this.form.url) || {}
        let dataHeader = getFunction(this.form.dataHeader)
        dataHeader = typeof (dataHeader) === 'function' && dataHeader(this.form.url) || {}
        let params = dataQuery;
        let axiosParams = {}, method = this.form.dataMethod
        if (this.form.proxy) dataHeader.proxy = true;
        if (['post', 'put'].includes(method)) {
          axiosParams.data = dataQuery
          if (this.form.dataQueryType == 'form') {
            if (this.form.proxy) dataHeader.form = true
            let formData = []
            Object.keys(params).forEach(ele => {
              formData.push(`${ele}=${params[ele]}`)
            })
            axiosParams.data = formData.join('&')
          }
        } else if (['get', 'delete'].includes(method)) {
          axiosParams.params = dataQuery
        }
        this.$axios({
          ...{
            method: this.form.dataMethod,
            url: this.form.url,
            headers: dataHeader
          },
          ...axiosParams
        }).then(res => {
          this.result = formatter(res.data)
        })
      } else if (this.isSql) {
        dynamicSql(this.getSql(this.form)).then(res => {
          this.result = formatter(res.data.data)
        })
      } else if (this.isWs) {
        this.handleClose()
        let dataQuery = this.form.dataQuery ? getFunction(this.form.dataQuery)() : {}
        let url = this.form.wsUrl + addParam(dataQuery)
        this.client = new WebSocket(url)
        this.client.onmessage = (msgEvent = {}) => {
          const data = JSON.parse(msgEvent.data)
          this.result = formatter(data)
        }
      } else if (this.isMqtt) {
        this.handleClose()
        console.log(this.form)
        let url = this.form.mqttUrl
        let dataMqttConfig = JSON.parse(this.form.mqttConfig)
        dataMqttConfig.clientId = 'mqttjs_' + new Date().getTime()
        this.mqClient = mqtt.connect(url, dataMqttConfig)
        this.mqClient.on('connect', () => {
          this.mqClient.subscribe(dataMqttConfig.topic.name, { qos: dataMqttConfig.topic.qos || 0 }, (error, res) => {
            console.log('Subscribe to topics res', res, error)
          })
        })
        this.mqClient.on('message', (topic, message) => {
          let defaultTopic = dataMqttConfig.topic
          if (topic === defaultTopic.name) {
            let data = JSON.parse(message)
            this.result = formatter(data)
          }
        })
      }
    },
    handleImport(file, fileLis) {
      this.$Export.xlsx(file.raw)
        .then(data => {
          this.form.data = data.results;
          this.$message.success('导入成功')
        })
    },
    validData(id) {
      return [0, 1, 2].includes(id)
    },
    beforeClose(done) {
      this.handleClose()
      done()
    },
    beforeOpen(done, type) {
      this.result = '';
      if (type == 'edit') {
        getObj(this.form.id).then(res => {
          const data = res.data.data;
          this.form = data
          if (this.isSql) {
            let mode = JSON.parse(this.form.data);
            this.form.dbId = mode.id;
            this.form.dbSql = mode.sql;
          }
          this.handleRes(false)
          done()
        })
      } else {
        done()
      }
      this.form.dataFormatter = this.form.dataFormatter || "(data)=>{\n    return {\n        data\n    }\n}"
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
      if (this.isSql) row.data = this.getSql(row)
      updateObj(row).then(() => {
        done();
        this.$message.success('修改成功');
        this.getList()
      }).catch(err => {
        loading()
      })
    },
    rowSave(row, done, loading) {
      if (this.isSql) row.data = this.getSql(row)
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