<template>
  <div class="head">
    <div class="head_actions head_left">
      <div class="head_btn" :class="{ 'head_btn--active': contain.menuShow }"
        @click="handleFlag('menuShow')">
        <el-tooltip effect="dark" content="图层" placement="top">
          <el-icon>
            <el-icon-operation></el-icon-operation>
          </el-icon>
        </el-tooltip>
      </div>
      <div class="head_btn" :class="{ 'head_btn--active': contain.paramsShow }"
        @click="handleFlag('paramsShow')">
        <el-tooltip effect="dark" content="操作" placement="top">
          <el-icon>
            <el-icon-setting></el-icon-setting>
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    <div class="head_info">
      <el-icon>
        <el-icon-data-analysis></el-icon-data-analysis>
      </el-icon>
      <span>JNPFData-{{ contain.visual.title }}</span>
    </div>
    <div class="head_actions">
      <div class="head_btn" @click="handleBuild">
        <el-tooltip effect="dark" content="保存" placement="top">
          <i class="iconfont icon-build"></i>
        </el-tooltip>
      </div>

      <div class="head_btn" @click="handleClear">
        <el-tooltip effect="dark" content="清空画布" placement="top">
          <el-icon>
            <el-icon-delete></el-icon-delete>
          </el-icon>
        </el-tooltip>
      </div>
      <div class="head_btn" @click="handleKeys">
        <el-tooltip effect="dark" content="快捷键" placement="top">
          <el-icon>
            <el-icon-eleme></el-icon-eleme>
          </el-icon>
        </el-tooltip>
      </div>
      <div class="head_btn" @click="handleGlob">
        <el-tooltip effect="dark" content="全局变量" placement="top">
          <el-icon>
            <el-icon-opportunity></el-icon-opportunity>
          </el-icon>
        </el-tooltip>
      </div>
      <div class="head_btn" @click="handleImg">
        <el-tooltip effect="dark" content="导出图片" placement="top">
          <el-icon>
            <el-icon-camera></el-icon-camera>
          </el-icon>
        </el-tooltip>
      </div>
      <div class="head_btn" @click="handleView" v-show="contain.menuFlag">
        <el-tooltip effect="dark" content="预览" placement="top">
          <i class="iconfont icon-view"></i>
        </el-tooltip>
      </div>
      <div class="head_btn" @click="handleReset" v-show="!contain.menuFlag">
        <el-tooltip effect="dark" content="还原" placement="top">
          <i class="iconfont icon-reset"></i>
        </el-tooltip>
      </div>
      <div class="head_btn" @click="$refs.result.show = true">
        <el-tooltip effect="dark" content="导入导出" placement="top">
          <el-icon>
            <el-icon-download></el-icon-download>
          </el-icon>
        </el-tooltip>
      </div>
      <div class="head_btn" @click="handleShare">
        <el-tooltip effect="dark" content="分享" placement="top">
          <el-icon>
            <el-icon-share></el-icon-share>
          </el-icon>
        </el-tooltip>
      </div>
      <div class="head_btn" :disabled="!contain.canUndo" @click="contain.editorUndo">
        <el-tooltip effect="dark" content="后退" placement="top">
          <el-icon class="nav__icon">
            <el-icon-arrow-left></el-icon-arrow-left>
          </el-icon>
        </el-tooltip>
      </div>
      <div class="head_btn" :disabled="!contain.canRedo" @click="contain.editorRedo">
        <el-tooltip effect="dark" content="前进" placement="top">
          <el-icon class="nav__icon">
            <el-icon-arrow-right></el-icon-arrow-right>
          </el-icon>
        </el-tooltip>
      </div>
      <div class="head_btn" @click="handleGoIndex">
        <el-tooltip effect="dark" content="主页" placement="top">
          <el-icon>
            <el-icon-home-filled></el-icon-home-filled>
          </el-icon>
        </el-tooltip>
      </div>
    </div>
    <result ref="result"></result>
    <share ref="share"></share>
    <keys ref="keys"></keys>
    <glob ref="glob"></glob>
  </div>
</template>

<script>
import { dataURLtoFile } from "@/utils/utils";
import result from "./result.vue";
import { uploadImg, updateComponent } from "@/api/visual";
import share from "./share.vue";
import keys from "./keys.vue";
import glob from './glob-params.vue'
export default {
  inject: ["contain"],
  provide() {
    return {
      contain: this.contain,
    };
  },
  data() {
    return {
      minWidth: 0,
      maxWidth: 0
    };
  },
  components: {
    result,
    share,
    keys,
    glob
  },
  created() {
    if (this.$website.autoSave) {
      setInterval(() => {
        this.handleBuild(undefined, false, false);
      }, this.$website.autoSaveTime);
    }
  },
  methods: {
    handleGlob() {
      this.$refs.glob.box = true
    },
    handleGoIndex() {
      this.$router.push({ path: "/" });
    },
    handleClear() {
      this.$confirm("此操作将清空画布, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.contain.nav = [];
      });
    },
    handleKeys() {
      this.$refs.keys.show = true;
    },
    handleReset() {
      this.contain.menuFlag = true;
      this.handleSet();
    },
    handleFlag(name) {
      this.contain[name] = !this.contain[name];
      this.handleSet();
    },
    handleView() {
      this.contain.menuFlag = false;
      this.handleSet();
    },
    handleSet(select = true) {
      this.$nextTick(() => {
        if (select) this.contain.handleInitActive();
        const screensRect =
          this.contain.$refs.screensRef.getBoundingClientRect();
        this.contain.setScale(screensRect.width);
      });
    },
    handleBuild(fn, tip, first = false) {
      let isFun = typeof fn === "function";
      if (!isFun && this.$route.params.id <= 100 && this.$website.isDemo) {
        this.$message.error(this.$website.isDemoTip);
        return;
      }
      if (first) this.contain.handleInitActive();
      let loading;
      if (tip !== false) {
        loading = this.$loading({
          lock: true,
          text: "正在保存配置，请稍后",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)",
        });
      }
      const save = (url) => {
        const formdata = {
          visual: {
            id: this.contain.visual.id,
            backgroundUrl: url || this.contain.visual.backgroundUrl
          },
          config: {
            id: this.contain.obj.config.id,
            visualId: this.contain.visual.id,
            detail: JSON.stringify(this.contain.config),
            component: JSON.stringify(this.contain.nav),
          },
        }
        updateComponent(formdata).then(() => {
          loading && loading.close();
          if (isFun) {
            fn()
          } else if (tip !== false) {
            this.$message.success('大屏配置保存成功');
          }
        }).catch(err => {
          this.$message.error('大屏配置保存失败，请检查服务端配置')
          loading && loading.close();
        })
      }
      this.$nextTick(() => {
        this.exportImg().then(canvas => {
          if (canvas) {
            var file = dataURLtoFile(canvas.toDataURL('image/jpeg', 0.1), this.contain.visual.title + '.jpg');
            var formdata = new FormData();
            formdata.append('file', file)
            uploadImg(formdata).then(res => {
              const data = res.data.data;
              const url = data.link;
              save(url)
            })
          } else {
            save()
          }
        }).catch(err => {
          save()
          console.log(err);
          loading && loading.close();
        })
      })
    },
    exportImg() {
      return new Promise((resolve, reject) => {
        html2canvas(document.querySelector('.canvas'), {
          useCORS: true,
          backgroundColor: null,
          logging: false,
          allowTaint: true
        }).then(canvas => {
          resolve(canvas)
        }).catch(err => {
          reject(error)
        })
      })
    },
    handleImg() {
      this.$confirm("是否导出大屏图片？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.exportImg().then(canvas => {
            this.downFile(canvas.toDataURL("image/jpeg", 0.8), this.contain.visual.title + '.jpg');
            this.$message.success('图片导出成功')
          }).catch(() => {
            this.$message.error('图片导出失败')
          });
        });
    },
    handleShare() {
      this.$refs.share.handleShow();
    },
  },
};
</script>

<style lang="scss">
.head {
  position: relative;
  height: 41px;
  padding-right: 8px;
  display: flex;
  z-index: 100;
  align-items: center;
  user-select: none;
  color: var(--datav-gui-font-color-base);
  border-bottom: var(--datav-border-dark);
  background: #1d1e1f;
  &_actions {
    position: absolute;
    top: 0;
    right: 8px;
    width: 300px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 40px;
  }
  &_left {
    left: 8px;
    justify-content: flex-start;
  }
  &_btn {
    margin-left: 4px;
    width: 40px;
    height: 24px;
    line-height: 26px;
    text-align: center;
    cursor: pointer;
    background: #303640;
    transition: 0.2s;
    i {
      color: #fff;
    }
    &--active {
      background-color: #2681ff;
    }
  }
  &_info {
    position: absolute;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    text-align: center;
    cursor: default;
    font-size: 14px;
    max-width: 500px;
    font-weight: bold;
    color: #fff;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    align-items: center;
    i {
      margin-right: 8px;
      font-size: 20px;
    }
  }
}
</style>
<style>
.head_btn {
  box-shadow: inset 0 0 0 1px rgb(255 235 235 / 10%), 0 0 0 1px #181818;
}
</style>
