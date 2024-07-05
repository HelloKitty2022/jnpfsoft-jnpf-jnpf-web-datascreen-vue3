<template>
  <div class="build">
    <contentmenu ref="contentmenu"></contentmenu>
    <imglist ref="imglist" @change="handleSetimg"></imglist>
    <headers ref="headers"></headers>
    <top ref="top"></top>
    <div class="app" :class="{ 'app--none': !menuFlag }">
      <div class="menu" :style="{ width: setPx(this.menuParams.menuWidth) }"
        v-show="menuFlag && menuShow" @click.stop="handleInitActive">
        <div class="menu__drag" ref="menuDrag" @mousedown="handleDrag($event, 'menu')"></div>
        <div class="menu_header title">
          <div class="title_box">
            图层
            <div class="title_menu">
              <div class="head_btn" :class="{ 'head_btn--active': layerType == 0 }"
                @click="layerType = 0">
                <el-icon>
                  <el-icon-monitor />
                </el-icon>
              </div>
              <div class="head_btn" :class="{ 'head_btn--active': layerType == 1 }"
                @click="layerType = 1">
                <el-icon>
                  <el-icon-coin />
                </el-icon>
              </div>
            </div>
          </div>
        </div>
        <el-scrollbar class="menu__scrollbar">
          <layer ref="layer" :type="layerType" style="padding: 0 5px" :nav="nav"
            @updateNav="updateNav"></layer>
        </el-scrollbar>
      </div>
      <!-- 中间区域 -->
      <div ref="sectionRef" id="section" :class="{ 'screens-drag': dragFlag }"
        @mousedown="dragMousedown" @mouseup="dragMouseup" @mousemove="dragMousemove"
        @contextmenu.prevent="() => {}" class="section">
        <sketch-rule :thick="thick" :scale="scale" :width="width" :height="height" :startX="startX"
          :startY="startY" :palette="palette" :shadow="shadow" :horLineArr="lines.h"
          :verLineArr="lines.v" />
        <div ref="screensRef" class="screens" @wheel="handleWheel" @scroll="handleScroll">
          <div ref="containerRef" class="screen-container">
            <div class="canvas" ref="canvasRef" :style="canvasStyle">
              <container ref="container"></container>
            </div>
          </div>
        </div>
      </div>
      <div class="menu params" :style="{ width: setPx(this.menuParams.paramsWidth) }"
        v-show="menuFlag && paramsShow">
        <div class="menu__drag" ref="paramsDrag" @mousedown="handleDrag($event, 'params')"
          :style="{ left: '-4px' }"></div>
        <div class="menu_header">
          <el-tabs v-if="isMain" class="menu__tabs" @tab-click="handleTabClick" stretch
            v-model="menuTabs">
            <el-tab-pane name="0">
              <template #label>
                <el-icon>
                  <el-icon-setting />
                </el-icon>
                <span>配置</span>
              </template>
            </el-tab-pane>
            <!-- 数据配置 -->
            <el-tab-pane name="1" v-if="validProp('dataList')">
              <template #label>
                <el-icon>
                  <el-icon-document-copy />
                </el-icon>
                <span>数据</span>
              </template>
            </el-tab-pane>
            <!-- 交互配置 -->
            <el-tab-pane name="2" v-if="validProp('eventList')">
              <template #label>
                <el-icon>
                  <el-icon-edit />
                </el-icon>
                <span>交互</span>
              </template>
            </el-tab-pane>
            <!-- 其他事件配置 -->
            <el-tab-pane name="3" v-if="!isFolder">
              <template #label>
                <el-icon>
                  <el-icon-mouse />
                </el-icon>
                <span>事件</span>
              </template>
            </el-tab-pane>
            <!-- 基本参数配置 -->
            <el-tab-pane name="4">
              <template #label>
                <el-icon>
                  <el-icon-folder />
                </el-icon>
                <span>参数</span>
              </template>
            </el-tab-pane>
          </el-tabs>
          <p class="title" v-if="isMain">{{activeObj.title}}（{{activeObj.name}}）</p>
        </div>
        <el-scrollbar class="menu__scrollbar" :style="scrollStyleName">
          <template v-if="menuTabs == 0">
            <el-form label-width="110px" label-position="left">
              <!-- 多选配置选项 -->
              <template v-if="isSelectActive">
                <el-form-item label="水平对齐">
                  <ul class="menu__button">
                    <li @click="$refs.contentmenu.handlePostionSelect('left')">
                      <el-tooltip content="左对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos1" />
                        </el-button>
                      </el-tooltip>
                    </li>
                    <li @click="$refs.contentmenu.handlePostionSelect('center')">
                      <el-tooltip content="水平对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos5" />
                        </el-button>
                      </el-tooltip>
                    </li>
                    <li @click="$refs.contentmenu.handlePostionSelect('right')">
                      <el-tooltip content="右对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos3" />
                        </el-button>
                      </el-tooltip>
                    </li>
                  </ul>
                </el-form-item>
                <el-form-item label="垂直对齐">
                  <ul class="menu__button">
                    <li @click="$refs.contentmenu.handlePostionSelect('top')">
                      <el-tooltip content="顶部对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos4" />
                        </el-button>
                      </el-tooltip>
                    </li>
                    <li @click="$refs.contentmenu.handlePostionSelect('middle')">
                      <el-tooltip content="垂直对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos2" />
                        </el-button>
                      </el-tooltip>
                    </li>
                    <li @click="$refs.contentmenu.handlePostionSelect('bottom')">
                      <el-tooltip content="底部对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos6" />
                        </el-button>
                      </el-tooltip>
                    </li>
                  </ul>
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button type="primary" class="block" @click="handleFolder">成组</el-button>
                </el-form-item>
                <el-form-item label-width="0">
                  <el-button type="danger" class="block" @click="handleDeleteSelect">删除</el-button>
                </el-form-item>
                <el-form-item label="" label-width="0px">
                  <monaco-editor v-model="activeObjList" disabled
                    @click="handleCopy(JSON.stringify(activeObjList,null,4))" language="javascript"
                    height="400"></monaco-editor>
                </el-form-item>
              </template>
              <!-- 组件配置 -->
              <template v-else-if="activeIndex">
                <el-form-item label="图层名称">
                  <avue-input v-model="activeObj.name"></avue-input>
                </el-form-item>
                <template v-if="!isFolder">
                  <el-form-item label="隐藏">
                    <avue-switch v-model="activeObj.display"></avue-switch>
                  </el-form-item>
                  <el-form-item label="锁定">
                    <avue-switch v-model="activeObj.lock"></avue-switch>
                  </el-form-item>
                </template>
                <template v-if="validProp('colorList')">
                  <el-form-item label="系统配色">
                    <avue-switch v-model="activeOption.switchTheme"></avue-switch>
                  </el-form-item>
                </template>
                <component :is="activeComponent.prop + 'Option'"></component>
                <main-option></main-option>
              </template>
              <!-- 主屏的配置项 -->
              <template v-else>
                <el-tabs class="menu__tabs" stretch v-model="mainTabs">
                  <el-tab-pane label="配置" name="0">
                    <el-form-item label="大屏大小">
                      <div class="flex">
                        <avue-input-number v-model="config.width"></avue-input-number>
                        &nbsp;x&nbsp;
                        <avue-input-number v-model="config.height"></avue-input-number>
                      </div>
                    </el-form-item>
                    <el-form-item label="大屏简介">
                      <avue-input v-model="config.info" type="textarea" :min-rows="5"></avue-input>
                    </el-form-item>
                    <el-form-item label="背景颜色">
                      <avue-input-color v-model="config.backgroundColor"></avue-input-color>
                    </el-form-item>
                    <el-form-item label="背景图片">
                      <img :src="config.backgroundImage"
                        @click="handleOpenImg('config.backgroundImage','background')" alt=""
                        style="width:100%;" />
                      <el-input clearable v-model="config.backgroundImage">
                        <template #append>
                          <div @click="handleOpenImg('config.backgroundImage','background')">
                            <i class="iconfont icon-img"></i>
                          </div>
                        </template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="适配方式">
                      <el-radio-group v-model="config.screen" size="mini">
                        <el-radio-button label="x">
                          <el-tooltip effect="dark" content="X轴铺满，Y轴自适应滚动" placement="top">
                            <svg-icon icon-class="fix2" />
                          </el-tooltip>
                        </el-radio-button>
                        <el-radio-button label="y">
                          <el-tooltip effect="dark" content="Y轴铺满，X轴自适应滚动" placement="top">
                            <svg-icon icon-class="fix3" />
                          </el-tooltip>
                        </el-radio-button>
                        <el-radio-button label="xy">
                          <el-tooltip effect="dark" content="强行拉伸画面，填充所有视图" placement="top">
                            <svg-icon icon-class="fix4" />
                          </el-tooltip>
                        </el-radio-button>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label-width="0">
                      <el-button type="primary" class="block"
                        @click="$refs.glob.box=true">更多设置</el-button>
                    </el-form-item>
                  </el-tab-pane>
                  <el-tab-pane label="屏幕" name="1">
                    <group></group>
                  </el-tab-pane>
                </el-tabs>
              </template>
            </el-form>
          </template>
          <template v-else-if="menuTabs == 1">
            <el-form label-width="120px" label-position="left">
              <el-form-item label="数据类型">
                <avue-select v-model="activeObj.dataType" :dic="dicOption.dataType"></avue-select>
              </el-form-item>
              <template v-if="isStatic">
                <el-form-item label="数据值" label-position="top">
                  <el-button type="primary" icon="el-icon-edit"
                    @click="openCode('data', '数据值')">编辑</el-button>
                </el-form-item>
              </template>
              <template v-if="isSql">
                <el-form-item label="数据源选择">
                  <avue-select :dic="DIC.sql" v-model="db"></avue-select>
                </el-form-item>
                <el-form-item label="SQL语句" label-position="top">
                  <monaco-editor v-model="sql" language="sql" height="100"></monaco-editor>
                </el-form-item>
              </template>
              <template v-else-if="isApi">
                <el-form-item label="开启跨域">
                  <avue-switch v-model="activeObj.proxy" @click="handleRefresh"></avue-switch>
                </el-form-item>
                <el-form-item label="请求方式">
                  <avue-select v-model="activeObj.dataMethod" placeholder="请选择请求方式"
                    :dic="dicOption.dataMethod"></avue-select>
                </el-form-item>
                <el-form-item label="接口地址">
                  <avue-input v-model="activeObj.url"></avue-input>
                </el-form-item>
              </template>
              <template v-else-if="isWs">
                <el-form-item label="WS地址">
                  <el-input v-model="activeObj.wsUrl"> </el-input>
                </el-form-item>
              </template>
              <template v-else-if="isRecord">
                <el-form-item label="数据集选择">
                  <avue-select :dic="DIC.record" v-model="activeObj.record"></avue-select>
                </el-form-item>
              </template>
              <template v-else-if="isPublic">
                <el-form-item label="公共数据集选择">
                  <avue-select :dic="DIC.public" v-model="activeObj.public"></avue-select>
                </el-form-item>
              </template>
              <template v-else-if="isMqtt">
                <el-form-item label="MQTT地址">
                  <el-input v-model="activeObj.mqttUrl"> </el-input>
                </el-form-item>
                <el-form-item label="MQTT配置">
                  <monaco-editor v-model="activeObj.mqttConfig" height="250"></monaco-editor>
                </el-form-item>
              </template>
              <el-form-item label="刷新时间" v-if="!isStatic && !isPublic">
                <el-input v-model="activeObj.time" placeholder="0">
                  <template #append>
                    <span>毫秒</span>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item label-width="0">
                <el-button type="primary" class="block" @click="handleSetting">更多设置</el-button>
              </el-form-item>
              <el-form-item label="返回数据" label-width="100">
                <div class="avue-flex" style="justify-content: flex-end;">
                  <el-button size="small" type="primary" icon="el-icon-edit"
                    @click="openCode('dataFormatter','编辑过滤器')">编辑过滤器</el-button>
                  <el-button size="small" type="primary" @click="handleRes">请求数据</el-button>
                </div>
              </el-form-item>
              <el-form-item label-width="0">
                <el-tabs class="menu__tabs" style="padding:0 10px;" v-model="resTabs">
                  <el-tab-pane label="处理后数据" name="0">
                    <avue-highlight v-model="dataRes" height="300"></avue-highlight>
                  </el-tab-pane>
                  <el-tab-pane label="原始数据" name="1">
                    <avue-highlight v-model="dataOldRes" height="300"></avue-highlight>
                  </el-tab-pane>
                </el-tabs>
              </el-form-item>
            </el-form>
          </template>
          <template v-else-if="menuTabs == 2">
            <transfer ref="transfer"></transfer>
          </template>
          <template v-else-if="menuTabs == 3">
            <event ref="event"></event>
          </template>
          <template v-else-if="menuTabs == 4">
            <el-form label-width="90px" label-position="left" v-if="menuTabs == 4">
              <el-form-item label="序号">
                <avue-input readonly @click="handleCopy(activeIndex)" v-model="activeIndex">
                </avue-input>
              </el-form-item>
              <el-form-item label="分组">
                <div class="avue-flex">
                  <el-select v-model="newGroup">
                    <el-option :key="index" :label="item.name" v-for="(item,index) in config.group"
                      :value="item.id"></el-option>
                  </el-select>
                  &nbsp;
                  <el-button type="primary" @click="handleMoveGroup">移动</el-button>
                </div>
              </el-form-item>
              <template v-if="!isFolder">
                <el-form-item label="水平对齐">
                  <ul class="menu__button">
                    <li @click="$refs.contentmenu.handlePostionSelect('left')">
                      <el-tooltip content="左对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos1" />
                        </el-button>
                      </el-tooltip>
                    </li>
                    <li @click="$refs.contentmenu.handlePostionSelect('middle')">
                      <el-tooltip content="水平对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos5" />
                        </el-button>
                      </el-tooltip>
                    </li>
                    <li @click="$refs.contentmenu.handlePostionSelect('right')">
                      <el-tooltip content="右对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos3" />
                        </el-button>
                      </el-tooltip>
                    </li>
                  </ul>
                </el-form-item>
                <el-form-item label="垂直对齐">
                  <ul class="menu__button">
                    <li @click="$refs.contentmenu.handlePostionSelect('top')">
                      <el-tooltip content="顶部对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos4" />
                        </el-button>
                      </el-tooltip>
                    </li>
                    <li @click="$refs.contentmenu.handlePostionSelect('center')">
                      <el-tooltip content="垂直对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos2" />
                        </el-button>
                      </el-tooltip>
                    </li>
                    <li @click="$refs.contentmenu.handlePostionSelect('bottom')">
                      <el-tooltip content="底部对齐" placement="top">
                        <el-button size="mini">
                          <svg-icon icon-class="pos6" />
                        </el-button>
                      </el-tooltip>
                    </li>
                  </ul>
                </el-form-item>
                <el-form-item label="进入动画">
                  <avue-select filterable allow-create v-model="activeComponent.animated"
                    :dic="dicOption.animated"></avue-select>
                  <div>
                    <a href="https://www.dowebok.com/demo/2014/98/" target="_blank">点击查看动画类型</a>
                  </div>
                </el-form-item>
                <el-form-item label="位置">
                  <div class="flex">
                    <avue-input-number style="width: 130px"
                      v-model="activeObj.left"></avue-input-number>
                    &nbsp;x&nbsp;
                    <avue-input-number style="width: 130px"
                      v-model="activeObj.top"></avue-input-number>
                  </div>
                </el-form-item>
                <el-form-item label="尺寸">
                  <div class="flex">
                    <avue-input-number style="width: 130px"
                      v-model="activeComponent.width"></avue-input-number>
                    &nbsp;x&nbsp;
                    <avue-input-number style="width: 130px"
                      v-model="activeComponent.height"></avue-input-number>
                  </div>
                </el-form-item>
                <el-form-item label="字体">
                  <avue-input v-model="activeComponent.fontFamily" placeholder="输入字体库的url">
                  </avue-input>
                </el-form-item>
                <el-form-item label="缩放">
                  <avue-input-number v-model="activeComponent.scale"></avue-input-number>
                </el-form-item>
                <el-form-item label="透视">
                  <avue-slider v-model="activeComponent.perspective" :max="1000"></avue-slider>
                </el-form-item>
                <el-form-item label="透明度">
                  <avue-slider :step="0.1" v-model="activeComponent.opacity" :max="1"></avue-slider>
                </el-form-item>
                <el-form-item label="X旋转度">
                  <avue-slider v-model="activeComponent.rotateX" :min="-360"
                    :max="360"></avue-slider>
                </el-form-item>
                <el-form-item label="Y旋转度">
                  <avue-slider v-model="activeComponent.rotateY" :min="-360"
                    :max="360"></avue-slider>
                </el-form-item>
                <el-form-item label="Z旋转度">
                  <avue-slider v-model="activeComponent.rotateZ" :min="-360"
                    :max="360"></avue-slider>
                </el-form-item>
              </template>
              <el-form-item label="" label-width="0px">
                <monaco-editor v-model="activeObj" disabled
                  @click="handleCopy(JSON.stringify(activeObj,null,4))" language="javascript"
                  height="100"></monaco-editor>
              </el-form-item>
            </el-form>
          </template>
        </el-scrollbar>
      </div>
    </div>
    <codeedit @submit="closeCode" v-if="code.box" :title="code.title" :type="code.type"
      v-model="code.obj" v-model:visible="code.box"></codeedit>
    <glob ref="glob"></glob>
    <database ref="database"></database>
  </div>
</template>
<script>
import MonacoEditor from "@/page/components/monaco-editor";
import layer from "./group/layer.vue";
import top from "./group/top.vue";
import glob from './group/glob.vue'
import event from './group/event.vue'
import transfer from './group/transfer.vue'
import database from './group/database.vue'
import headers from "./group/header.vue";
import imglist from "./group/imglist.vue";
import group from './group/group.vue'
import contentmenu from "./group/contentmenu.vue";
import codeedit from "./group/code.vue";
import { dicOption } from "@/option/config";
import init from "@/mixins/";
import { createFile, uuid } from "@/utils/utils";
import components from "@/option/components";
import { SketchRule } from "vue3-sketch-ruler";
import "vue3-sketch-ruler/lib/style.css";
import { getList as getDbList } from "@/api/db";
import { getList as getRecordList } from "@/api/record";

export default {
  mixins: [init, components],
  data() {
    return {
      newGroup: '',
      layerType: 0,
      currentHistoryIndex: -1,
      menuId: "avue-data-menu",
      menuShow: true,
      paramsShow: true,
      cacheList: {
        timer: null,
        nav: null,
        copy: null,
        history: [],
      },
      keys: {
        ctrl: false,
        space: false
      },
      dataRes: "",
      dataOldRes: "",
      db: "",
      sql: "",
      nav: [],
      DIC: {
        sql: [],
        record: [],
        public: [],
      },
      loading: "",
      key: "",
      menuParams: {
        menuWidth: 200,
        paramsWidth: 330,
      },
      menuFlag: true,
      code: {
        title: "",
        box: false,
        type: "",
        obj: "",
      },
      form: {},
      dicOption: dicOption,
      mainTabs: '0',
      menuTabs: "0",
      dataTabs: "0",
      resTabs: "0",
      //拖拽
      dragFlag: false,
      dragEvent: null,
      dragStartX: null,
      dragStartY: null,
      // 标尺
      width: document.body.clientWidth,
      height: document.body.clientHeight,
      scale: 1,
      startX: 0,
      startY: 0,
      palette: {
        bgColor: "#202023",
        longfgColor: "#BABBBC",
        shortfgColor: "#9C9C9C",
        fontColor: "#919398",
        shadowColor: "#18181c",
        lineColor: "#2681ff",
        borderColor: "#B5B5B5",
        cornerActiveColor: "#fff",
      },
      lines: {
        h: [],
        v: [],
      },
      thick: 20,
    };
  },
  components: {
    MonacoEditor,
    imglist,
    layer,
    event,
    transfer,
    codeedit,
    top,
    glob,
    database,
    headers,
    group,
    contentmenu,
    SketchRule,
  },
  computed: {
    activeObjList() {
      let list = []
      this.active.forEach(index => {
        let item = this.findnav(index);
        list.push(item.item)
      })
      return list;
    },
    isMain() {
      return this.isActive && !this.isSelectActive;
    },
    scrollStyleName() {
      let calc = this.setPx(!this.isMain ? 2 : 85)
      return { paddingTop: calc }
    },
    shadow() {
      return {
        x: 0,
        y: 0,
        width: this.width,
        height: this.height,
      };
    },
    // 能否撤销
    canUndo() {
      return this.currentHistoryIndex > 0;
    },
    canRedo() {
      return this.cacheList.history.length > this.currentHistoryIndex + 1;
    },
    isKeysCtrl() {
      return this.keys.ctrl == true;
    },
    isStatic() {
      return this.activeObj.dataType == 0;
    },
    isApi() {
      return this.activeObj.dataType == 1;
    },
    isSql() {
      return this.activeObj.dataType == 2;
    },
    isWs() {
      return this.activeObj.dataType === 3;
    },
    isRecord() {
      return this.activeObj.dataType == 4;
    },
    isPublic() {
      return this.activeObj.dataType == 5;
    },
    isMqtt() {
      return this.activeObj.dataType == 6;
    },
    isFolder() {
      return this.activeObj.children;
    },
    isActive() {
      return this.activeIndex;
    },
    isSelectActive() {
      return this.active.length > 1;
    },
    activeComponent() {
      return this.activeObj.component || {};
    },
    activeOption() {
      return this.activeObj.option || {};
    },
    activeObj() {
      let item = this.findList(this.activeIndex) || {};
      if (!item.child) item.child = {};
      return item;
    },
    activeList() {
      let result = [];
      this.active.forEach((ele) => {
        let item = this.findnav(ele);
        result.push(item.item);
      });
      return result;
    },
    publicList() {
      return this.list
        .filter((ele) => {
          return ele.component.prop == "data";
        })
        .map((ele) => {
          return {
            label: ele.name,
            value: ele.index,
          };
        });
    },
    canvasStyle() {
      return {
        width: this.setPx(this.canvasWidth),
        height: this.setPx(this.canvasHeight),
        transform: `scale(${this.scale})`,
      };
    },
  },
  watch: {
    publicList(list) {
      this.DIC.public = list;
    },
    nav: {
      handler(val) {
        this.recordHistoryCache(val);
      },
      deep: true,
    },
    activeObj: {
      handler() {
        this.newGroup = this.group
        if (this.activeObj.sql && this.isSql) {
          let mode = JSON.parse(this.activeObj.sql);
          this.db = mode.id;
          this.sql = mode.sql;
        } else {
          this.db = "";
          this.sql = "";
        }
      },
      deep: true,
    },
    "activeObj.dataType"() {
      this.dataTabs = "0";
      this.resTabs = "0";
    },
    activeOverIndex(n, o) {
      [o, n].forEach((ele, index) => {
        if (!ele) return;
        this.setActive(ele, index === 1, "setOverActive");
      });
    },
    active(n, o) {
      [o, n].forEach((ele, index) => {
        ele.forEach((item) => {
          this.setActive(item, index === 1, "setActive");
        });
      });
      // 初始化选项卡
      this.menuTabs = "0";
    },
  },
  created() {
    this.initDataList();
  },
  mounted() {
    setTimeout(() => {
      this.initFun();
      this.initSize();
      this.listenKey();
    });
  },
  methods: {
    handleMoveGroup() {
      this.$confirm(`是否移动到对应屏幕?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let { itemList, itemIndex } = this.findnav(this.activeIndex);
        let obj = itemList.splice(itemIndex, 1)[0];
        if (obj.children) {
          obj.children.forEach(ele => {
            ele.group = this.newGroup;
          })
        }
        obj.group = this.newGroup;
        this.nav.unshift(obj);
        this.handleInitActive()
        this.mainTabs = '1';
      })
    },
    dragMousedown(e) {
      this.handleInitActive();
      this.dragFlag = true;
      this.dragEvent = e;
      this.dragStartX = this.$refs.screensRef.scrollLeft;
      this.dragStartY = this.$refs.screensRef.scrollTop;
    },
    dragMouseup() {
      this.dragFlag = false;
    },
    dragMousemove(e) {
      if (this.dragFlag) {
        let x = e.clientX - this.dragEvent.clientX;
        let y = e.clientY - this.dragEvent.clientY;
        this.$refs.screensRef.scrollLeft = this.dragStartX - x;
        this.$refs.screensRef.scrollTop = this.dragStartY - y;
      }
    },
    handleDrag(e, name) {
      let resize = this.$refs[name + "Drag"];
      if (!resize) return;
      let startX = e.clientX;
      document.onmousemove = (e) => {
        let endX = e.clientX;
        let moveLen = endX - startX;
        startX = endX;
        this.menuParams[name + "Width"] +=
          name == "params" ? -moveLen : moveLen;
        this.$refs.headers.handleSet(false);
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
      };
      return false;
    },
    handleCopy(data) {
      this.$Clipboard({
        text: data,
      })
        .then(() => {
          this.$message.success("复制成功");
        })
        .catch(() => {
          this.$message.error("复制失败");
        });
    },
    handleTabClick(tab) {
      if (tab.index == "1") {
        this.handleRes(false);
      }
    },
    handleRefresh() {
      this.dataRes = ''
      this.dataOldRes = ''
      return this.$refs.container.handleRefresh();
    },
    handleRes(tip = true) {
      this.dataRes = ''
      this.dataOldRes = ''
      if (this.isSql) {
        this.activeObj.sql = JSON.stringify({
          id: this.db,
          sql: this.sql,
        });
      }
      this.handleRefresh().then(({ news, old } = res) => {
        this.dataRes = !this.validatenull(news)
          ? JSON.stringify(news, null, 4)
          : news;
        this.dataOldRes = !this.validatenull(old)
          ? JSON.stringify(old, null, 4)
          : old;
        if (tip) this.$message.success("请求数据成功");
      });
    },
    handleParams(type, obj) {
      const deepList = (list, flag) => {
        list.forEach((ele) => {
          ele[type] = flag;
          if (ele.children) deepList(ele.children, flag);
        });
      };
      if (obj) {
        obj[type] = !obj[type];
        deepList([obj], obj[type]);
      } else {
        this.active.forEach((ele) => {
          let { item } = this.findnav(ele);
          item[type] = !item[type];
          deepList([item], item[type]);
        });
      }
      this.handleInitActive();
    },
    handleSetting() {
      this.dataTabs = "0";
      this.resTabs = "0";
      this.dataRes = "";
      this.dataOldRes = "";
      this.handleRes(false);
      this.$refs.database.box = true;
    },
    initDataList() {
      getDbList({
        current: 1,
        size: 100,
      }).then((res) => {
        const data = res.data.data;
        this.DIC.sql = data.records.map((ele) => {
          return {
            label: ele.name,
            value: ele.id,
          };
        });
      });
      getRecordList({
        current: 1,
        size: 100,
      }).then((res) => {
        const data = res.data.data;
        this.DIC.record = data.records.map((ele) => {
          return {
            label: ele.name,
            value: ele.id,
          };
        });
      });
    },
    closeCode(value) {
      if (this.configData.includes(this.code.type)) {
        this.config[this.code.type] = value;
      } else {
        this.activeObj[this.code.type] = value;
      }
      this.handleRes(false);
    },
    openCode(type, title) {
      this.code.type = type;
      this.code.title = title;
      if (this.configData.includes(type)) {
        this.code.obj = this.config[type];
      } else {
        this.code.obj = this.activeObj[type];
      }
      this.code.box = true;
    },
    initFun() {
      ["setScale"].forEach((ele) => {
        this[ele] = this.$refs.container[ele];
      });
    },
    // 右键菜单
    handleContextMenu(item = {}, done) {
      if (!item.index || this.isKeysCtrl) return;
      else if (!this.isSelectActive) {
        this.active = [item.index];
        this.activeIndex = item.index;
      }
      done();
    },
    //监听键盘的按键
    listenKey() {
      let sectionRef = this.$refs.sectionRef;
      sectionRef.onkeydown = (e) => {
        const keyCode = e.keyCode;
        e.preventDefault();
        if (keyCode == 76 && this.isKeysCtrl) {
          if (!this.activeObj) return;
          this.handleParams("lock");
        } else if (keyCode == 67 && this.isKeysCtrl) {
          if (!this.activeObj) return;
          this.$refs.contentmenu.handleCopy((fn) => {
            this.cacheList.copy = fn;
            this.$message.success("复制组件成功");
          });
        } else if (keyCode == 86 && this.isKeysCtrl) {
          if (!this.cacheList.copy) return;
          let active = [];
          let { itemList } = this.findnav(this.activeIndex);
          this.cacheList.copy.forEach((ele) => {
            active = active.concat(ele(itemList));
          });
          setTimeout(() => this.selectNav(active));
          this.$message.success("粘贴组件成功");
        } else if (keyCode == 8 || keyCode == 46) {
          this.$refs.contentmenu.handleDel();
        }
      }
      sectionRef.onkeyup = (e) => {
        const keyCode = e.keyCode;
      }
      document.onkeydown = (e) => {
        const keyCode = e.keyCode;
        var elm = e.srcElement || e.target;
        const validElm = (elm.tagName.toLowerCase() == "input" && elm.type.toLowerCase() == "text" || elm.tagName.toLowerCase() == "textarea") && elm.parentNode.className !== 'el-input avue-draggable__focus'
        if (keyCode == 32) {
          this.keys.space = true
          if (validElm) return;
          e.preventDefault()
        } else if (keyCode == 17 || keyCode == 91) {
          this.keys.ctrl = true
          if (validElm) return;
        } else if (keyCode == 90 && this.isKeysCtrl) {
          if (validElm) return;
          this.editorUndo();
          e.preventDefault()
        } else if (keyCode == 89 && this.isKeysCtrl) {
          if (validElm) return;
          this.editorRedo();
          e.preventDefault()
        } else if (keyCode == 83 && this.isKeysCtrl) {
          if (validElm) return;
          this.$refs.headers.handleBuild();
          e.preventDefault()
        }
      };
      document.onkeyup = (e) => {
        const keyCode = e.keyCode;
        if (keyCode == 32) {
          this.keys.space = false
        } else if (keyCode == 17 || keyCode == 91) {
          this.keys.ctrl = false;
        };
      }
    },
    setActive(val, result, fun) {
      const obj = this.$refs.container.getListRef(val);
      if (obj) obj[fun](result);
    },
    //批量成组
    handleFolder() {
      let folder = createFile();
      folder.group = this.group
      this.active.forEach((index) => {
        let { itemList, itemIndex } = this.findnav(index);
        let obj = itemList.splice(itemIndex, 1)[0];
        folder.children.push(obj);
      });
      this.nav.push(folder);
      this.handleInitActive();
    },
    //批量删除
    handleDeleteSelect() {
      this.$confirm(`是否批量删除所选图层?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.active.forEach((index) => {
          let { itemList, itemIndex } = this.findnav(index);
          itemList.splice(itemIndex, 1);
        });
        this.handleInitActive();
      });
    },
    validProp(name) {
      return this.dicOption[name].includes(this.activeComponent.prop);
    },
    formatTooltip(val) {
      return parseInt(val);
    },
    //打开图库
    handleOpenImg(item, type) {
      this.$refs.imglist.openImg(item, type);
    },
    //图库框回调赋值
    handleSetimg(val, type) {
      let params = type.split(".")[1];
      if (type.includes("config")) {
        this.config[params] = val;
      } else if (type.includes("activeObj.data.value")) {
        this.activeObj.data.value = val;
      } else if (type.includes("activeObj.data")) {
        this.activeObj.data = val;
      } else if (type.includes("activeObj")) {
        this.activeObj[params] = val;
      } else if (type.includes("activeOption")) {
        this.activeOption[params] = val;
      }
    },
    handleScroll() {
      this.$nextTick(() => {
        const screensRect = this.$refs.screensRef.getBoundingClientRect();
        const canvasRect = this.$refs.canvasRef.getBoundingClientRect();
        // 标尺开始的刻度
        const startX =
          (screensRect.left + this.thick - canvasRect.left) / this.scale;
        const startY =
          (screensRect.top + this.thick - canvasRect.top) / this.scale;
        this.startX = startX >> 0;
        this.startY = startY >> 0;
      });
    },
    // 控制缩放值
    handleWheel(e) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const nextScale = parseFloat(
          Math.max(0.2, this.scale - e.deltaY / 500).toFixed(2)
        );
        this.scale = nextScale;
      }
      this.$nextTick(() => {
        this.handleScroll();
      });
    },
    // 初始化标尺数值
    initSize() {
      // 滚动居中
      let containerRect = this.$refs.containerRef.getBoundingClientRect();
      this.$refs.screensRef.scrollLeft =
        containerRect.width / 2 - this.thick * 2;
      this.$refs.screensRef.scrollTop =
        containerRect.height / 2 - this.thick * 2;
      this.$nextTick(() => {
        this.handleScroll();
      });
    },
    selectNav(item) {
      if (this.isKeysCtrl) {
        if (Array.isArray(item)) {
          this.active = this.active.concat(item);
        } else {
          this.active.push(item);
        }
      }
      if (Array.isArray(item)) {
        this.active = item;
        this.activeIndex = item[item.length - 1];
      } else if (this.active.includes(item)) {
        this.activeIndex = item;
      } else {
        this.active = [item];
        this.activeIndex = item;
      }
    },
    recordHistoryCache(val) {
      const debounce = (func, delay) => {
        return () => {
          let context = this;
          let args = arguments;
          clearTimeout(this.cacheList.timer);
          this.cacheList.timer = setTimeout(() => {
            func.apply(context, args);
          }, delay);
        };
      };
      const callback = () => {
        let nav = JSON.stringify(val);
        if (nav != this.cacheList.nav) {
          this.cacheList.nav = nav;
          this.addHistoryCache(val);
        }
      };
      debounce(callback, 300)();
    },
    addHistoryCache(val) {
      if (this.currentHistoryIndex + 1 < this.cacheList.history.length) {
        this.cacheList.history.splice(this.currentHistoryIndex + 1);
      }
      this.cacheList.history.push({
        nav: this.deepClone(val),
      });
      this.cacheList.history.splice(100);
      this.currentHistoryIndex++;
    },
    editorUndo() {
      if (!this.canUndo) return;
      this.currentHistoryIndex--;
      this.recoveryHistoryCache();
    },
    editorRedo() {
      if (!this.canRedo) return;
      this.currentHistoryIndex++;
      this.recoveryHistoryCache();
    },
    recoveryHistoryCache() {
      const prevState = this.cacheList.history[this.currentHistoryIndex];
      this.nav = this.deepClone(prevState.nav);
      this.cacheList.nav = JSON.stringify(prevState.nav);
    },
    updateNav(data) {
      this.nav = data;
    },
  },
};
</script>
<style lang="scss">
@import "@/styles/style.scss";
@import "@/styles/list.scss";
</style>
