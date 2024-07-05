<template>
  <draggable ghost-class="menu__ghost" class="menu_ul" :class="{ 'menu_ul--simple': type == 1 }"
    :group="{ name: 'layer' }" v-model="innerNav" item-key="index">
    <template #item="{ element }">
      <div :key="element.index" v-show="validGroup(element)" class="menu__folder"
        :ref="common.NAME + element.index" @click.stop="handleSetActive(element,false)"
        @mouseover.stop="mouseOver(element)" @mouseout.stop="mouseOut(element)"
        v-if="element.children">
        <div v-contextmenu="{
            id: contain.menuId,
            event: contain.handleContextMenu,
            value: element,
          }" :class="[
            'menu__item--folder',
            { 'is-active': contain.activeIndex == element.index },
          ]">
          <i class="iconfont icon-fold" @click.stop="openFolder(element)"
            :class="{ 'is-active': element.menu }"></i>
          <i class="iconfont icon-folder" @click.stop="handleSetActive(element)"></i>
          <input type="text" @keyup.enter="element.isname = false" v-if="element.isname"
            v-model="element.name" />
          <span v-else @dblclick="handleChangeName(element)"
            class="menu__name">{{ element.name }}</span>
          <span class="menu__menu">
            <el-icon :class="{ 'is-active': element.display !== true }"
              @click.stop="contain.handleParams('display', element)">
              <el-icon-view />
            </el-icon>
            <el-icon :class="{ 'is-active': element.lock === true }"
              @click.stop="contain.handleParams('lock', element)">
              <el-icon-lock />
            </el-icon>
          </span>
        </div>
        <div :key="'list' + element.index" class="menu__list" v-show="element.menu">
          <layer :count="count + 1" :type="type" :key="element.index" :nav="element.children">
          </layer>
        </div>
      </div>
      <div v-else v-show="validGroup(element)" :key="element.index" v-contextmenu="{
          id: contain.menuId,
          event: contain.handleContextMenu,
          value: element,
        }" @click.stop="handleSetActive(element)" :class="[
          'menu__item',
          {
            'is-active': handleGetActive(element),
            'is-over': contain.activeOverIndex === element.index,
          },
        ]" @mouseover.stop="mouseOver(element)" @mouseout.stop="mouseOut(element)">
        <span class="menu__icon">
          <i :class="'iconfont ' + element.icon"></i>
        </span>
        <input type="text" @keyup.enter="element.isname=false" v-if="element.isname"
          v-model="element.name">
        <span v-else @dblclick="handleChangeName(element)"
          class="menu__label">{{element.name}}</span>
        <span class="menu__menu">
          <el-icon :class="{ 'is-active': element.display !== true }"
            @click.stop="contain.handleParams('display', element)">
            <el-icon-view />
          </el-icon>
          <el-icon :class="{ 'is-active': element.lock === true }"
            @click.stop="contain.handleParams('lock', element)">
            <el-icon-lock />
          </el-icon>
        </span>
      </div>
    </template>
  </draggable>
</template>

<script>
import vuedraggable from "vuedraggable";
import common from "@/config";
export default {
  name: "layer",
  inject: ["contain"],
  provide() {
    return {
      contain: this.contain,
    };
  },
  components: {
    draggable: vuedraggable,
  },
  props: {
    type: {
      type: Number,
      default: 1,
    },
    count: {
      type: Number,
      default: 1,
    },
    nav: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      common,
      innerNav: [],
    };
  },
  watch: {
    nav: {
      handler(val) {
        this.innerNav = val;
      },
      immediate: true,
      deep: true,
    },
    innerNav: {
      handler(val) {
        this.$emit("updateNav", val);
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    validGroup(item) {
      if (this.validatenull(item.group)) return true
      return item.group == this.contain.group
    },
    mouseOver(item) {
      if (item.children) {
        this.contain.$refs.container.getItemRef(item.index).setActive(true);
      } else {
        this.contain.activeOverIndex = item.index;
      }
    },
    mouseOut(item) {
      if (item.children) {
        this.contain.$refs.container.getItemRef(item.index).setActive(false);
      } else {
        this.contain.activeOverIndex = undefined;
      }
    },
    handleGetActive(item) {
      return this.contain.active.includes(item.index);
    },
    handleSetActive(item, type = true) {
      if (item.children && type) {
        let active = [];
        const deepList = (list) => {
          list.forEach((ele) => {
            if (ele.children) deepList(ele.children);
            else active.push(ele.index);
          });
        };
        deepList(item.children);
        this.contain.selectNav(active);
      } else {
        this.contain.selectNav(item.index);
      }
    },
    handleChangeName(item) {
      item.isname = !item.isname;
    },
    openFolder(item) {
      item.menu = !item.menu;
      item.isname = false;
    },
  },
};
</script>

<style></style>
