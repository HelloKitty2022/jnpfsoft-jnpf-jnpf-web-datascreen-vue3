<template>
  <el-form label-width="120px" label-position="left">
    <el-form-item label="传递子组件">
      <avue-select multiple v-model="contain.activeObj.child.index" :dic="contain.list"
        :props="{label: 'name',value: 'index'}">
      </avue-select>
    </el-form-item>
    <el-form-item label="传递参数名称">
      <avue-input placeholder="传递时参数名" v-model="contain.activeObj.child.paramName"></avue-input>
    </el-form-item>
    <el-form-item label="传递映射字段">
      <avue-input v-model="contain.activeObj.child.paramValue"
        placeholder="传递时取值，默认为value"></avue-input>
    </el-form-item>
    <el-form-item label-width="0px">
      <el-button type="primary" icon="el-icon-edit" @click="open()">编辑交互事件</el-button>
    </el-form-item>
    <div class="transfer__menu menu_ul">
      <div class="menu__item" @click="open(index)"
        v-for="(item,index) in contain.activeObj.child.paramList" :key="index">
        <div class="menu__label">{{index+1}}.{{getTypeLabel(item.type)}}</div>
        <div class="menu__menu" @click.stop="delParamsList(index)">
          <i class="el-icon-close"></i>
        </div>
      </div>
    </div>

    <el-dialog v-model="box" :close-on-click-modal="false" class="avue-dialog" title="交互编辑器"
      width="80%">
      <el-button type="primary" icon="el-icon-plus" @click="handleTabsAdd()">
        新增交互事件
      </el-button>
      <br /> <br />
      <el-tabs class="menu__tabs" v-if="box" closable @edit="handleTabsEdit"
        @tab-click="handleTabClick" v-model="tabs">
        <template #addIcon>
          <el-icon>
            <el-icon-plus />
          </el-icon>
        </template>
        <template v-for="(item,index) in contain.activeObj.child.paramList" :key="index">
          <el-tab-pane :name="index+''">
            <template #label>
              <span>{{index+1}}-{{getTypeLabel(item.type)}}</span>
            </template>
          </el-tab-pane>
        </template>
      </el-tabs>
      <template v-for="(item,index) in contain.activeObj.child.paramList" :key="index">
        <div class="transfer__list avue-flex" v-if="index==tabs">
          <div class="transfer__menu menu_ul">
            <div class="menu__item" @click="item.type=citem.value"
              :class="{'is-active':citem.value==item.type}" v-for="(citem,cindex) in dic.type"
              :key="cindex">
              <div class="menu__label">{{citem.label}}</div>
            </div>
          </div>
          <div style="flex:1">
            <el-form-item label-width="0" :key="index">
              <template v-if="item.type=='params'">
                <el-form-item label="子组件">
                  <avue-select multiple v-model="item.index" :dic="contain.list"
                    :props="{label: 'name',value: 'index'}">
                  </avue-select>
                </el-form-item>
                <el-form-item label="" label-width="0">
                  <el-button type="primary" icon="el-icon-plus"
                    @click="item.child.push({})">新增参数</el-button>
                </el-form-item>
                <template v-for="(citem,cindex) in item.child" :key="cindex">
                  <el-form-item label="参数名称">
                    <el-input v-model="citem.name" placeholder="参数名称">
                      <template #append>
                        <el-button type="danger" icon="el-icon-delete"
                          @click="item.child.splice(cindex,1)"></el-button>
                      </template>
                    </el-input>
                  </el-form-item>
                  <el-form-item label="映射字段">
                    <avue-input v-model="citem.value" placeholder="映射字段"></avue-input>
                  </el-form-item>
                  <br />
                </template>
              </template>
              <template v-if="item.type=='group'">
                <el-form-item label="跳转大屏">
                  <avue-select :dic="contain.config.group" size="mini" v-model="item.group"
                    placeholder="请选择大屏对象" :props="{label:'name',value:'id'}">
                  </avue-select>
                </el-form-item>
              </template>
              <template v-if="item.type=='href'">
                <el-form-item label="新窗口">
                  <avue-switch v-model="item.target"></avue-switch>
                </el-form-item>
                <el-form-item label="跳转大屏">
                  <avue-input v-model="item.src" placeholder="请输入跳转地址">
                  </avue-input>
                </el-form-item>
              </template>
              <template v-if="item.type=='display'">
                <el-form-item label="子组件">
                  <avue-select multiple v-model="item.index" :dic="contain.list"
                    :props="{label: 'name',value: 'index'}">
                  </avue-select>
                </el-form-item>
                <el-form-item label="操作">
                  <avue-select v-model="item.displayType" :dic="dic.displayType">
                  </avue-select>
                </el-form-item>
              </template>
            </el-form-item>
            <template v-if="item.type=='data'">
              <el-form-item label="子组件">
                <avue-select multiple v-model="item.index" :dic="contain.list"
                  :props="{label: 'name',value: 'index'}">
                </avue-select>
              </el-form-item>
            </template>
          </div>
        </div>

      </template>

    </el-dialog>

  </el-form>
</template>

<script>
export default {
  inject: ["contain"],
  data() {
    return {
      tabs: 0,
      box: false,
      dic: {
        displayType: [{
          label: '隐藏',
          value: 'none'
        }, {
          label: '请求数据',
          value: 'data'
        }, {
          label: '显示',
          value: 'block'
        }, {
          label: '显示/隐藏',
          value: ''
        }],
        type: [{
          label: '传参',
          value: 'params'
        }, {
          label: '跳转链接',
          value: 'href'
        }, {
          label: '跳转大屏',
          value: 'group'
        }, {
          label: '显隐',
          value: 'display'
        }]
      }
    }
  },
  methods: {
    open(index = 0) {
      this.tabs = index + ''
      this.box = true;
    },
    close() {
      this.box = false;
    },
    getTypeLabel(value) {
      return (this.dic.type.find(ele => ele.value == value) || {}).label
    },
    handleTabsAdd() {
      this.addParamsList()
      this.tabs = this.contain.activeObj.child.paramList.length - 1 + ''
    },
    handleTabsEdit(targetName, action) {
      console.log(targetName, action)
      if (action === 'add') {
        this.addParamsList()
        this.tabs = this.contain.activeObj.child.paramList.length - 1 + ''
      } else if (action === 'remove') {
        this.delParamsList(targetName)
        let index = targetName - 1 + ''
        this.tabs = index < 0 ? '0' : index
      }
    },
    delParamsList(index) {
      this.contain.activeObj.child.paramList.splice(index, 1)
    },
    addParamsList() {
      if (!this.contain.activeObj.child.paramList) {
        this.contain.activeObj.child.paramList = []
      }
      this.contain.activeObj.child.paramList.push({
        index: [],
        type: '',
        child: []
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.transfer__list {
  padding-top: 10px;
  align-items: flex-start;
  .menu_ul {
    padding-left: 0;
    padding-right: 20px;
    padding-top: 10px;
    width: 200px;
    border-right: 1px solid #161618;
  }
}
.transfer__menu {
  padding: 0 10px;
  .menu__item {
    padding: 10px;
    border: 1px solid #232323;
    background-color: #2a2a2b;
  }
}
</style>