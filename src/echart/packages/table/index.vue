<template>
  <div :class="[b(),className]" :style="styleSizeName" @mouseenter="handleMouseEnter"
    @mouseover="handleMouseOver" @mouseleave="handleMouseLeave">
    <el-table :style="styleChartName" ref="table" @cell-click="cellClick"
      @cell-dblclick="cellDblClick" :data="dataChart" :height="height" :border="option.border"
      :cellStyle="cellStyle" :row-style="rowStyle" :show-header="showHeader"
      :header-row-style="headerRowStyle" :header-cell-style="headerCellStyle">
      <el-table-column type="index" label="#" header-align="center" align="center"
        v-if="option.index" width="60">
        <template #="{$index}">
          <span>{{$index+1}}</span>
        </template>
      </el-table-column>
      <template v-for="(item,index) in option.column">
        <el-table-column v-if="item.hide!==true" show-overflow-tooltip :key='index'
          :prop="item.prop" :label="item.label" :width="item.width">
          <template #="{row}">
            <span v-html="getFormatter(item,row)" v-if="item.formatter&&reload"></span>
            <span v-else>{{row[item.prop]}}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import create from "../../create";
import { getFunction } from '@/utils/utils';
export default create({
  name: "table",
  data() {
    return {
      reload: true,
      headerHeight: '',
      scrollCheck: "",
    };
  },
  watch: {
    'option.column'() {
      this.reload = false
      this.$nextTick(() => {
        this.reload = true
      })
    },
    scrollSpeed() {
      this.setTime();
    },
    scroll: {
      handler() {
        this.setTime();
      },
    }
  },
  computed: {
    showHeader() {
      return this.option.showHeader
    },
    scrollTime() {
      return this.option.scrollTime
    },
    scrollSpeed() {
      return this.option.scrollSpeed || 1
    },
    scroll() {
      return this.option.scroll
    },
    cellHeight() {
      return parseInt((this.height - this.headerHeight) / this.option.count)
    }
  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  created() {
    this.$nextTick(() => {
      this.headerHeight = this.$refs.table.$refs.headerWrapper ? parseInt(this.$refs.table.$refs.headerWrapper.clientHeight) : 0
      setTimeout(() => {
        this.setTime();
      }, this.scrollTime)
    })
  },
  methods: {
    getFormatter(item, row) {
      return getFunction(item.formatter)(item, row)
    },
    handleMouseOver() {
      clearInterval(this.scrollCheck);
    },
    handleMouseLeave() {
      this.handleCommonBind(null, null, 'mouseLeaveFormatter')
      this.setTime()
    },
    cellClick(row, column, cell, event) {
      this.handleCommonBind(row, column, 'clickFormatter')
    },
    cellDblClick(row, column, cell, event) {
      this.handleCommonBind(row, column, 'dblClickFormatter')
    },
    setTime() {
      clearInterval(this.scrollCheck);
      this.headerHeight = this.$refs.table.$refs.headerWrapper ? parseInt(this.$refs.table.$refs.headerWrapper.clientHeight) : 0
      const table = this.$refs.table
      const divData = table.$refs.bodyWrapper.querySelector('.el-scrollbar__wrap')
      const speed = this.scrollSpeed
      let top = 0
      if (this.scroll) {
        this.scrollCheck = setInterval(() => {
          top = top + speed
          divData.scrollTop += speed;
          if (divData.clientHeight + divData.scrollTop == divData.scrollHeight) {
            divData.scrollTop = 0
          }
          if (top >= this.cellHeight && this.scrollTime) {
            divData.scrollTop = divData.scrollTop - (top - this.cellHeight)
            clearInterval(this.scrollCheck);
            setTimeout(() => {
              this.setTime()
            }, this.scrollTime)
          }
        }, 20)
      } else {
        divData.scrollTop = 0
      }
    },
    cellStyle({ row, column, rowIndex, columnIndex }) {
      return {
        padding: 0,
        height: this.setPx(this.cellHeight),
        fontSize: this.setPx(this.option.bodyFontSize),
        color: this.option.bodyColor,
        textAlign: column.type == 'index' ? 'center' : this.option.bodyTextAlign,
        backgroundColor: rowIndex % 2 == 0 ? this.option.othColor : this.option.nthColor,
      }
    },
    rowStyle({ rowIndex }) {
      return {
        backgroundColor: 'transparent'
      }
    },
    headerRowStyle() {
      return {
        backgroundColor: this.option.headerBackground
      }
    },
    headerCellStyle({ row, column, rowIndex, columnIndex }) {
      return {
        fontSize: this.setPx(this.option.headerFontSize),
        backgroundColor: this.option.headerBackground,
        color: this.option.headerColor,
        textAlign: column.type == 'index' ? 'center' : this.option.headerTextAlign
      }
    }
  }
});
</script>


