<template>
  <div style="padding:0 5px;">
    <el-button type="primary" style="margin:10px 0 10px 0;"
      @click="handleAddGroup()">新增大屏</el-button>
    <ul class="menu_ul">
      <li @click="contain.group=item.id" @dblclick="handleChangeName(item,index)"
        :class="['menu__item',{'is-active':contain.group==item.id}]"
        v-for="(item,index) in contain.config.group" :key="index">
        <el-tooltip class="item" effect="dark" @click="handleCopy(item)" :content="item.id"
          placement="left">
          <span class="menu__icon">
            <el-icon>
              <el-icon-scale-to-original />
            </el-icon>
          </span>
        </el-tooltip>
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
    handleCopy(item) {
      this.$Clipboard({
        text: item.id
      }).then(() => {
        this.$message.success('复制成功')
      }).catch(() => {
        this.$message.error('复制失败')
      });
    },
    handleChangeName(item, index) {
      if (index !== 0) {
        item.isname = !item.isname
      }
    },
    handleAddGroup(index) {
      if (!this.contain.config.group) {
        this.contain.config.group = []
      }
      let id = uuid();
      let item = this.contain.config.group[index] || {};
      let obj = {
        name: '新增屏幕',
        id: id,
        isname: true
      }
      const callback = () => {
        if (!this.validatenull(index)) {
          this.contain.config.group.splice(index + 1, 0, obj)
        } else {
          this.contain.config.group.push(obj)
        }
      }
      if (!index) {
        callback();
        return
      }
      this.$confirm('是否复制当前内容?', '提示', {
        confirmButtonText: '复制',
        cancelButtonText: '不复制',
        type: 'warning'
      }).then(() => {
        let list = this.deepClone(this.contain.nav.filter(ele => ele.group == item.id))
        const findEle = (result) => {
          result.forEach(ele => {
            ele.id = uuid()
            ele.group = id;
            if (ele.children) findEle(ele.children)
          })
        }
        findEle(list);
        this.contain.nav = this.contain.nav.concat(list);
        callback()
      }).catch(() => {
        callback()
      });
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