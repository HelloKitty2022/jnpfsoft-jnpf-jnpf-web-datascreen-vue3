<!-- 表格配置 -->
<template>
  <div>
    <el-form-item label="开启排名">
      <avue-switch v-model="main.activeOption.index"></avue-switch>
    </el-form-item>
    <el-form-item label="边框">
      <avue-switch v-model="main.activeOption.border">
      </avue-switch>
    </el-form-item>
    <el-form-item label="追加模式">
      <avue-switch v-model="main.activeOption.dataAppend">
      </avue-switch>
    </el-form-item>
    <el-form-item label="开启滚动">
      <avue-switch v-model="main.activeOption.scroll">
      </avue-switch>
    </el-form-item>
    <template v-if="main.activeOption.scroll">
      <el-form-item label="滚动间隔">
        <avue-input-number v-model="main.activeOption.scrollTime">
        </avue-input-number>
      </el-form-item>
      <el-form-item label="滚动速度">
        <avue-input-number v-model="main.activeOption.scrollSpeed">
        </avue-input-number>
      </el-form-item>
    </template>
    <el-collapse accordion>
      <el-collapse-item title="表头设置">
        <el-form-item label="显示">
          <avue-switch v-model="main.activeOption.showHeader">
          </avue-switch>
        </el-form-item>
        <el-form-item label="字体大小">
          <avue-input-number v-model="main.activeOption.headerFontSize">
          </avue-input-number>
        </el-form-item>
        <el-form-item label="背景颜色">
          <avue-input-color type="textarea"
            v-model="main.activeOption.headerBackground"></avue-input-color>
        </el-form-item>
        <el-form-item label="字体颜色">
          <avue-input-color type="textarea"
            v-model="main.activeOption.headerColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="对其方式">
          <avue-select v-model="main.activeOption.headerTextAlign" :dic="dicOption.textAlign">
          </avue-select>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="表格设置">
        <el-form-item label="显示行数">
          <avue-input-number v-model="main.activeOption.count">
          </avue-input-number>
        </el-form-item>
        <el-form-item label="字体大小">
          <avue-input-number v-model="main.activeOption.bodyFontSize">
          </avue-input-number>
        </el-form-item>
        <el-form-item label="对其方式">
          <avue-select v-model="main.activeOption.bodyTextAlign" :dic="dicOption.textAlign">
          </avue-select>
        </el-form-item>
        <el-form-item label="文字颜色">
          <avue-input-color type="textarea"
            v-model="main.activeOption.bodyColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="奇行颜色">
          <avue-input-color type="textarea" v-model="main.activeOption.nthColor"></avue-input-color>
        </el-form-item>
        <el-form-item label="偶行颜色">
          <avue-input-color type="textarea" v-model="main.activeOption.othColor"></avue-input-color>
        </el-form-item>
      </el-collapse-item>
      <el-collapse-item title="表格列设置">
        <avue-crud :option="tableOption" :data="main.activeOption.column" v-model="form"
          @row-save="rowSave" @row-del="rowDel" @row-update="rowUpdate">
          <template #formatter-form="{}">
            <monaco-editor v-model="form.formatter" language="javascript" disabled
              height="100"></monaco-editor>
            <el-button type="primary" icon="el-icon-edit"
              @click="openCode('formatter','格式化')">编辑</el-button>
          </template>
          <template #menu-left="{}">
            <el-button icon="el-icon-operation" @click="openCode('column','表格列设置')"
              type="primary">编辑数据</el-button>
          </template>
        </avue-crud>
      </el-collapse-item>
    </el-collapse>
    <codeedit @submit="codeClose" :title="code.title" v-model="code.obj" v-if="code.box"
      :type="code.type" v-model:visible="code.box"></codeedit>
  </div>
</template>

<script>
import MonacoEditor from '@/page/components/monaco-editor'
import { tableOption, dicOption } from '@/option/config'
import codeedit from '../../page/group/code.vue';
export default {
  name: 'table',
  data() {
    return {
      form: {},
      dicOption: dicOption,
      tableOption: tableOption,
      code: {
        box: false,
        type: '',
        obj: {},
      }
    }
  },
  inject: ["main"],
  components: {
    codeedit,
    MonacoEditor
  },
  methods: {
    rowSave(row, done) {
      if (row.type === 'button') {
        row.buttonConfig = this.createButtonConfig(row);
      }

      this.main.activeOption.column.push(this.deepClone(row));
      done()
    },
    rowDel(row, index) {
      this.main.activeOption.column.splice(index, 1);
    },
    rowUpdate(row, index, done) {
      if (row.type === 'button') {
        row.buttonConfig = this.createButtonConfig(row);
      }

      this.main.activeOption.column.splice(index, 1, this.deepClone(row));
      done()
    },

    createButtonFormatter(row) {
      return `(value, row, index) => {
        return {
          type: 'button',
          text: '${row.buttonText || "点击"}',
          click: () => {
            if (typeof this.main.${row.buttonClick} === 'function') {
              this.main.${row.buttonClick}(row, index);
            }
          }
        };
      }`;
    },


    codeClose(value) {
      if (this.code.type == 'formatter') {
        this.form.formatter = value;
      } else {
        this.main.activeOption.column = value;
      }

    },
    openCode(type, title) {
      this.code.title = title;
      this.code.type = type;
      if (type == 'formatter') {
        this.code.obj = this.form.formatter
      } else {
        this.code.obj = this.main.activeOption.column
      }
      this.code.box = true;
    },
  }
}
</script>

<style>
</style>