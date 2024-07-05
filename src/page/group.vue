<template>
  <div style="padding:0 5px;">
    <el-button type="primary" style="margin:10px 0 10px 0;"
      @click="handleAddGroup()">新增大屏</el-button>
    <ul class="menu_ul">
      <li @click="contain.group=item.id" @dblclick="handleChangeName(item,index)"
        :class="['menu__item',{'is-active':contain.group==item.id}]"
        v-for="(item,index) in contain.config.group" :key="index">
        <span class="menu__icon">
          <i class="el-icon-c-scale-to-original"></i>
        </span>
        <span class="menu__label">
          <input type="text" @keyup.enter="item.isname=false" v-if="item.isname"
            v-model="item.name">
          <span v-else class="menu__name">{{item.name}}</span>
        </span>
        <span class="menu__menu">
          <i class="el-icon-plus" @click.stop="handleAddGroup(index)"></i>
          <i class="el-icon-delete" v-if="index!=0" @click.stop="handleDelGroup(item,index)"></i>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { uuid } from '@/utils/utils'
export default {
  inject: ["contain"],
  methods: {
    handleChangeName(item, index) {
      if (index !== 0) {
        item.isname = !item.isname
      }
    },
    handleAddGroup(index) {
      if (!this.contain.config.group) {
        this.contain.config.group = []
      }
      let obj = {
        name: '新增屏幕',
        id: uuid(),
        isname: true
      }
      if (!this.validatenull(index)) {
        this.contain.config.group.splice(index + 1, 0, obj)
      } else {
        this.contain.config.group.push(obj)
      }
    },
    handleDelGroup(item, index) {
      this.$confirm(`是否删除当前屏幕?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let i = 0; i < this.contain.nav.length; i++) {
          const ele = this.contain.nav[i], index = i;
          if (ele.group == this.contain.group) {
            this.contain.nav.splice(index, 1);
            i--
          }
        }
        this.contain.config.group.splice(index, 1)
        if (this.contain.group == item.id) {
          this.contain.group = index != 0 ? this.contain.config.group[index - 1].id : ''
        }
      })
    },
  }
}
</script>

<style>
</style>