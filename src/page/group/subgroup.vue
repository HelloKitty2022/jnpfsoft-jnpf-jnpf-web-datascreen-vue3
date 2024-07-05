<template>
  <template v-for="item in nav" :key="item.index">
    <div v-if="!item.children"
      v-contextmenu="{id:contain.menuId,event:contain.handleContextMenu,value:item}">
      <avue-draggable v-bind="item" :range="!contain.isSelectActive" :line="!contain.isSelectActive"
        :scale="container.stepScale" :disabled="!contain.menuFlag" :step="container.stepScale"
        :width="item.component.width" :height="item.component.height"
        :ref="common.DEAFNAME+item.index" :id="common.DEAFNAME+item.index"
        :active-flag="contain.active.includes(item.index)" v-show="getDisplay(item)"
        @move="handleMove" @over="handleOver" @focus="handleFocus" @blur="handleBlur">
        <component :ref="common.NAME+item.index" :id="common.NAME+item.index"
          :is="common.COMPNAME+item.component.name" v-bind="item" :component="item.component"
          :transfer="container.transfer" :initialize="container.isBuild"
          :data-formatter-str="item.dataFormatter" :click-formatter-str="item.clickFormatter"
          :dbl-click-formatter-str="item.dblClickFormatter"
          :mouse-enter-formatter-str="item.mouseEnterFormatter"
          :mouse-leave-formatter-str="item.mouseLeaveFormatter"
          :data-before-formatter-str="item.dataBeforeFormatter"
          :data-after-formatter-str="item.dataAfterFormatter"
          :echart-formatter-str="item.echartFormatter" :label-formatter-str="item.labelFormatter"
          :styles-formatter-str="item.stylesFormatter" :formatter-str="item.formatter"
          :sql-formatter="sqlFormatter" :record-formatter="recordFormatter"
          :width="item.component.width" :height="item.component.height"
          :disabled="!contain.menuFlag" :scale="container.stepScale" @remote-change="remoteChange"
          title="" />
      </avue-draggable>
      <subgroup :nav="item.children"></subgroup>
    </div>
    <folder v-else :item="item" :ref="common.NAME+item.index"></folder>
  </template>
</template>

<script>
//注册自定义组件
import components from '@/components/';
import folder from './folder.vue'
import { dynamicSql } from '@/api/db'
import { getObj as getRecordObj } from '@/api/record'
import common from '@/config'
import echartComponents from '../../echart/'
export default {
  name: 'subgroup',
  inject: ["contain", 'container'],
  provide() {
    return {
      contain: this.contain,
      container: this.container
    };
  },
  components: Object.assign(components, {
    folder
  }),
  props: {
    nav: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      sqlFormatter: dynamicSql,
      recordFormatter: getRecordObj,
      common: common,
    }
  },
  created() {
    this.init()
  },
  methods: {
    remoteChange(params) {
      params.id.remoteContent = params.content
    },
    init() {
      Object.keys(echartComponents).map(ele => {
        let component = echartComponents[ele];
        this.$component(component.name, component);
      });
    },
    //刷新数据
    handleRefresh() {
      let result = this.getItemRef()
      if (result) {
        return result.updateData()
      }
      return Promise.resolve()
    },
    getItemRef(index) {
      index = index || this.contain.activeIndex
      let ref = this.$refs[`${this.common.NAME}${index}`] || []
      return ref[0]
    },
    getListRef(index) {
      let ref = this.$refs[`${this.common.DEAFNAME}${index}`] || []
      return ref[0]
    },
    getDisplay(item) {
      if (!this.container.isBuild && ['time', 'data'].includes(item.component.prop)) {
        return false
      }
      return !item.display
    },
    handleMove({ index, left, top }) {
      if (this.contain.activeIndex !== index) return
      this.contain.activeList.forEach(item => {
        if (this.contain.activeIndex === item.index) return
        item.left = item.left + left;
        item.top = item.top + top
      })
    },
    handleOver({ index }) {
      this.contain.activeOverIndex = index;
    },
    handleFocus({ index }) {
      this.container.gradeFlag = true;
      this.contain.selectNav(index);
    },
    handleBlur({ index, left, top, width, height }) {
      if (index !== this.contain.activeIndex) return
      this.container.gradeFlag = false;
      this.contain.activeObj.component.width = width
      this.contain.activeObj.component.height = height
      this.contain.activeObj.left = left
      this.contain.activeObj.top = top
    },
  }
}
</script>
