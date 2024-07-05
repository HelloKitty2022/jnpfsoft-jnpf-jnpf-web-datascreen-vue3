<template>
  <div class="contentmenu" id="avue-data-menu">
    <div class="contentmenu__item" @click="contain.handleParams('lock')">
      <el-icon>
        <el-icon-lock />
      </el-icon>
      {{contain.activeObj.lock?'解锁':'锁定'}}
    </div>
    <div class="contentmenu__item" @click="contain.handleParams('display')">
      <el-icon>
        <el-icon-view />
      </el-icon>
      {{contain.activeObj.display?'显示':'隐藏'}}
    </div>
    <div class="contentmenu__item" @click="contain.isFolder?handleLogout():handleCompose()">
      <el-icon>
        <el-icon-document-copy />
      </el-icon>
      {{contain.isFolder?'解散':'组合'}}
    </div>
    <template v-if="false">
      <div class="contentmenu__item" @click="handlePostionSelect('left')">
        <svg-icon icon-class="pos1" />
        左对齐
      </div>
      <div class="contentmenu__item" @click="handlePostionSelect('center')">
        <svg-icon icon-class="pos5" />
        水平对齐
      </div>
      <div class="contentmenu__item" @click="handlePostionSelect('right')">
        <svg-icon icon-class="pos3" />
        右对齐
      </div>
      <div class="contentmenu__item" @click="handlePostionSelect('top')">
        <svg-icon icon-class="pos4" />
        顶部对齐
      </div>
      <div class="contentmenu__item" @click="handlePostionSelect('middle')">
        <svg-icon icon-class="pos2" />
        垂直对齐
      </div>
      <div class="contentmenu__item" @click="handlePostionSelect('bottom')">
        <svg-icon icon-class="pos6" />
        底部对齐
      </div>
    </template>
    <div class="contentmenu__item" @click="handleDel()">
      <el-icon>
        <el-icon-delete />
      </el-icon>
      删除
    </div>
    <div class="contentmenu__item" @click="handleCopy()">
      <el-icon>
        <el-icon-money />
      </el-icon>
      复制
    </div>
    <div class="contentmenu__item" @click="handleTop()">
      <el-icon>
        <el-icon-arrow-up />
      </el-icon>
      置顶
    </div>
    <div class="contentmenu__item" @click="handleBottom()">
      <el-icon>
        <el-icon-arrow-down />
      </el-icon>
      置底
    </div>
    <div class="contentmenu__item" @click="handleStepTop()">
      <el-icon>
        <el-icon-arrow-up />
      </el-icon>
      上移
    </div>
    <div class="contentmenu__item" @click="handleStepBottom()">
      <el-icon>
        <el-icon-arrow-down />
      </el-icon>
      下移
    </div>
  </div>
</template>

<script>
import { createFile, uuid } from '@/utils/utils'
export default {
  name: 'contentmenu',
  inject: ["contain"],
  data() {
    return {
      selectCount: {
        x1: null,
        x2: null,
        y1: null,
        y2: null
      },
    }
  },
  methods: {
    handlePostionSelect(postion) {
      if (this.contain.isSelectActive) {
        this.contain.activeIndex = null
        this.handleCalcPostionSelect();
      } else {
        this.selectCount = {
          x1: 1,
          x2: this.contain.config.width - 20,
          y1: 1,
          y2: this.contain.config.height - 20
        }
      }
      const x1 = this.selectCount.x1;
      const x2 = this.selectCount.x2;
      const y1 = this.selectCount.y1;
      const y2 = this.selectCount.y2;
      if (postion === 'left') {
        this.handleMoveSelectList(x1, undefined, true, postion);
      } else if (postion === 'center') {
        this.handleMoveSelectList(undefined, y1 + (y2 - y1) / 2, true, postion);
      } else if (postion === 'right') {
        this.handleMoveSelectList(x2, undefined, true, postion);
      } else if (postion === 'top') {
        this.handleMoveSelectList(undefined, y1, true, postion);
      } else if (postion === 'middle') {
        this.handleMoveSelectList(x1 + (x2 - x1) / 2, undefined, true, postion);
      } else if (postion === 'bottom') {
        this.handleMoveSelectList(undefined, y2, true, postion);
      }
    },
    handleMoveSelectList(left, top, type, postion) {
      this.contain.active.forEach(ele => {
        let item = this.contain.findList(ele)
        const component = item.component;
        //水平情况
        if (left) {
          let baseLeft = Number(type ? left : (item.left + left).toFixed(2));
          if (postion === 'right') {
            baseLeft = baseLeft - component.width
          }
          else if (postion === 'center') {
            const obj_center = item.left + component.width / 2;
            baseLeft = item.left + (left - obj_center)
          }
          item.left = baseLeft
        }
        //垂直情况
        if (top) {
          let baseTop = Number(type ? top : (item.top + top).toFixed(2));
          if (postion === 'bottom') {
            baseTop = baseTop - component.height
          }
          else if (postion === 'middle') {
            const obj_middle = item.top + component.height / 2;
            baseTop = item.top + (top - obj_middle)
          }
          item.top = baseTop
        }
      })
    },
    //计算多选状态下的最大边界值
    handleCalcPostionSelect() {
      this.selectCount = {
        x1: null,
        x2: null,
        y1: null,
        y2: null
      }
      this.contain.active.forEach(ele => {
        ele = this.contain.findList(ele)
        const left = ele.left;
        const top = ele.top;
        const width = ele.component.width;
        const height = ele.component.height;
        if (!this.selectCount.x1) {
          this.selectCount = {
            x1: left,
            x2: left + width,
            y1: top,
            y2: top + height
          }
        }
        if (this.selectCount.x1 > left) this.selectCount.x1 = left;
        if (this.selectCount.x2 < left + width) this.selectCount.x2 = left + width;
        if (this.selectCount.y1 > top) this.selectCount.y1 = top;
        if (this.selectCount.y2 < top + height) this.selectCount.y2 = top + height;
      })
    },
    handleStepBottom() {
      this.handleCommon(false, true);
    },
    handleStepTop() {
      this.handleCommon(true, true);
    },
    //文件夹成组逻辑
    handleCompose() {
      this.$confirm(`是否组合所选择的图层?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let folder = createFile()
        folder.group = this.contain.group
        let navList;
        this.contain.active.forEach(ele => {
          let { itemList, itemIndex } = this.contain.findnav(ele);
          let obj = itemList.splice(itemIndex, 1)[0];
          folder.children.push(obj);
          navList = itemList;
        });
        navList.unshift(folder);

      }).catch(() => { })
    },
    //文件夹解散逻辑
    handleLogout() {
      let ele = this.contain.activeObj
      this.$confirm(`是否解散${ele.name}图层?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let { itemList, itemIndex } = this.contain.findnav(ele.index);
        const list = this.deepClone(ele.children)
        itemList.splice(itemIndex, 1);
        list.forEach(item => itemList.push(item));
        this.contain.handleInitActive();
      }).catch(() => { })
    },
    //删除组件的方法
    handleDel() {
      this.$confirm(`是否删除所选图层?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.contain.active.forEach(ele => {
          const { itemList, itemIndex } = this.contain.findnav(ele);
          itemList.splice(itemIndex, 1);
        });
        this.contain.handleInitActive();
      }).catch(() => { })
    },
    //复制组件的方法
    handleCopy(fn) {
      let active = []
      let fnList = []
      const setIndex = (list = []) => {
        list.forEach(ele => {
          let index = uuid();
          ele.index = index;
          active.push(index)
          if (ele.children) {
            ele.menu = false
            setIndex(ele.children)
          }
        })
      }
      this.contain.active.forEach(ele => {
        const { item, itemList } = this.contain.findnav(ele);
        let obj;
        if (fn) {
          fnList.push((parentList) => {
            active = []
            obj = this.deepClone(item);
            setIndex([obj])
            if (!parentList) parentList = itemList
            parentList.unshift(obj)
            return active
          })
        } else {
          obj = this.deepClone(item);
          setIndex([obj])
          itemList.unshift(obj)
        }
      });
      if (fn) {
        fn(fnList)
        return
      }
      setTimeout(() => this.contain.selectNav(active))
    },
    // 图层的上下移动方法 
    handleCommon(top = false, step = false) {
      this.contain.active.forEach(ele => {
        let { itemList, itemIndex } = this.contain.findnav(ele);
        let obj = itemList.splice(itemIndex, 1)[0];
        if (step) {
          itemList.splice(top ? (itemIndex - 1) : (itemIndex + 1), 0, obj)
        } else {
          itemList[top ? 'unshift' : 'push'](obj)
        }
      })
    },
    handleTop() {
      this.handleCommon(true);
    },
    handleBottom() {
      this.handleCommon();
    }
  }
}
</script>

<style>
.contentmenu {
  width: 180px;
  display: none;
  z-index: 99999;
  list-style: none;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 0;
  background: #232324;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.82);
  border-radius: 10px;
}
.contentmenu__item {
  z-index: 10000;
  list-style: none;
  padding: 6px 12px;
  cursor: pointer;
  position: relative;
  font-size: 14px;
}
.contentmenu__item:hover {
  background-color: rgba(0, 192, 222, 0.1);
}
.contentmenu__item i {
  margin-right: 5px;
}
.contentmenu__item :first-child {
  padding-top: 5px;
}
</style>