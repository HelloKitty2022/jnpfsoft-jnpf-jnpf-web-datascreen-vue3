<template>
  <el-form label-width="120px"
           class="event"
           label-position="left">
    <el-form-item label-width="0px">
      <el-button type="primary"
                 icon="el-icon-edit"
                 @click="open()">编辑组件基础事件</el-button>
    </el-form-item>

    <template v-for="(item,index) in list">
      <div :key="index"
           v-if="item.prop?contain.validProp('labelFormatterList'):true">
        <div class="event__content">
          <avue-highlight height="300"
                          :model-value="'//'+item.label+'\n'+(contain.activeObj[item.value] || '')"></avue-highlight>
        </div>
      </div>
    </template>
    <el-dialog v-model="box"
               :close-on-click-modal="false"
               class="avue-dialog"
               title="事件编辑器"
               width="80%">
      <other-list>
        <div class="item">
          <el-button type="primary"
                     size="mini"
                     @click="$refs.codeTip.open()"
                     icon="el-icon-notebook">说明</el-button>
        </div>
      </other-list>
      <el-tabs class="menu__tabs"
               v-if="box"
               @tab-click="handleTabClick"
               stretch
               v-model="tabs">
        <template v-for="(item,index) in list">
          <el-tab-pane :name="index"
                       v-if="item.prop?contain.validProp('labelFormatterList'):true"
                       :key="index">
            <template #label>
              <span>{{item.label}}</span>
            </template>
          </el-tab-pane>
        </template>
      </el-tabs>
      <br />
      <monaco-editor v-model="text[type]"
                     height="200"
                     language="javascript"></monaco-editor>
      <span class="avue-dialog__footer avue-dialog__footer--right">
        <el-button @click="close()">取 消</el-button>
        <el-button type="primary"
                   @click="submit">确 定</el-button>
      </span>
      <code-tip ref="codeTip"
                :type="type"></code-tip>
    </el-dialog>
  </el-form>
</template>

<script>
import { funEval } from '@/utils/utils'
import otherList from './other-list.vue'
import MonacoEditor from '@/page/components/monaco-editor'
import codeTip from './code-tip.vue'
export default {
  inject: ["contain"],
  components: { MonacoEditor, codeTip, otherList },
  provide () {
    return {
      contain: this.contain,
    };
  },
  data () {
    return {
      text: {},
      list: [{
        label: '点击事件',
        value: 'clickFormatter',
        temp: 'temp'
      }, {
        label: '双击事件',
        value: 'dblClickFormatter',
        temp: 'temp'
      }, {
        label: '移出事件',
        value: 'mouseEnterFormatter',
        temp: 'temp'
      }, {
        label: '移入事件',
        value: 'mouseLeaveFormatter',
        temp: 'temp'
      }, {
        label: '数据渲染前事件',
        value: 'dataBeforeFormatter',
        temp: 'temp'
      }, {
        label: '数据渲染后事件',
        value: 'dataAfterFormatter',
        temp: 'temp'
      }, {
        label: '提示事件',
        value: 'formatter',
        prop: 'labelFormatterList',
        temp: 'temp1'
      }, {
        label: '标题事件',
        value: 'labelFormatter',
        prop: 'labelFormatterList',
        temp: 'temp1'
      }],
      temp: `(params,refs)=>{
    console.log(params,refs)
}`,
      temp1: `(name,data)=>{
    console.log(name,data)
    return ''
}`,
      box: false,
      type: '',
      tabs: ''
    }
  },
  methods: {
    submit () {
      let label, type;
      try {
        this.list.forEach(ele => {
          type = ele.value
          label = ele.label;
          let value = this.text[type];
          if (value) {
            try {
              funEval(value);
              this.contain.activeObj[type] = value
            } catch (err) {
              throw Error(err)
            }
          }
        })
        this.close()
      } catch (error) {
        console.log(error);
        this.$message.error(`${label}${type}-格式校验有误`)
      }
    },
    handleTabClick (tab) {
      let index = tab.index
      let obj = this.list[index]
      this.type = obj.value;
      let value = this.contain.activeObj[obj.value] || this[obj.temp]
      this.text[obj.value] = value;
    },
    open () {
      this.type = this.list[0].value;
      let index = this.list.findIndex(ele => ele.value == this.type)
      this.tabs = index;
      let obj = this.list.find(ele => ele.value == this.type)
      let value = this.contain.activeObj[obj.value] || this[obj.temp]
      this.text[obj.value] = value;
      this.box = true;
    },
    close () {
      this.text = []
      this.box = false;
    }
  }
}
</script>
<style lang="scss" scoped>
.event {
  &__menu {
    margin-bottom: 10px;
    padding-right: 10px;
  }
  &__label {
    width: 100%;
    padding: 5px 10px 10px 10px;
    box-sizing: border-box;
    font-size: 13px;
    color: #fff;
  }
  &__content {
    position: relative;
    padding: 0 10px;
    box-sizing: border-box;
  }
}
</style>