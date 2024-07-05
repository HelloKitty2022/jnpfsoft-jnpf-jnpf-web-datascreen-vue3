<template>
  <div class="top-nav">
    <el-menu class="nav" mode="horizontal" background-color="#212528" text-color="#909399"
      active-text-color="#409EFF" @mousedown="contain.handleInitActive">
      <el-sub-menu :index="index+''" v-for="(item,index) in baseList" :key="index">
        <template #title>
          <el-tooltip effect="dark" :content="item.label" placement="top">
            <i :class="'nav__icon iconfont '+item.icon"></i>
          </el-tooltip>
        </template>
        <div style="width:390px">
          <el-menu-item v-for="(citem,cindex) in item.children"
            @click="handleAdd(citem.option,true)" :key="cindex" class="menu-inline"
            :index="`${index}-${cindex}`">
            <div class="usehove">
              <img :src="computedImgUrl(citem.option.img)" class="inside-img">
              <div class="bottom-text">{{citem.label}}</div>
            </div>
          </el-menu-item>
        </div>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script>
import { uuid } from '@/utils/utils'
import { website } from '@/config.js'
export default {
  inject: ["contain"],
  provide() {
    return {
      contain: this.contain
    };
  },
  data() {
    return {
      baseList: website.baseList
    }
  },
  methods: {
    handleAdd(option, first = false) {
      let obj = this.deepClone(option);
      let index = uuid()
      obj.left = 0;
      obj.top = 0
      obj.index = index;
      obj.display = false;
      obj.lock = false;
      obj.group = this.contain.group
      if (first) {
        this.contain.nav.unshift(obj);
      } else {
        this.contain.nav.push(obj);
      }
      setTimeout(() => this.contain.selectNav(index))
    }
  }
}
</script>

<style lang='scss'>
.top-nav {
  .nav {
    height: 45px;
    line-height: 45px;
    overflow: hidden;
    border-color: #333;
  }
  .nav__icon {
    margin-right: 5px;
  }
  .nav .el-submenu .el-submenu__title,
  .nav .el-menu-item {
    height: 45px;
    line-height: 45px;
    font-size: 12px;
  }

  .el-menu-item {
    height: 100px !important;
  }
}
.el-menu--horizontal {
  border: none;
  .menu-inline {
    text-align: center;
    display: inline-block !important;
  }
  .bottom-text {
    color: #b1b1b1;
  }
  .inside-img {
    width: 110px;
    height: 70px;
    border: 2px solid transparent;
    box-sizing: border-box;
    border-radius: 5px;
  }
  .inside-img:hover {
    border-color: #006eff;
  }
  .usehove:hover {
    .bottom-text {
      color: #fff;
      font-weight: bold;
    }
  }
}
</style>