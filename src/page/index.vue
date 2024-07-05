<template>
  <div class="index">
    <div class="header">
      <img class="bg" :src="`${publicPath}img/nav-img.png`" alt="" />
      <div class="title">
        <img :src="`${publicPath}img/jnpf.png`" class="header-logo" />
      </div>
      <navs @change="handleChange"></navs>
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/glob'
import navs from "./nav/index.vue";
import { getUrlParam } from "../utils/utils";
export default {
  name: "index",
  components: {
    navs,
  },
  data() {
    return {
      publicPath: import.meta.env.VITE_APP_BASE,
    };
  },
  created() {
    const token = getUrlParam("token") || "";
    if (token) localStorage.setItem("token", token);
    this.initGlob();
  },
  methods: {
    initGlob() {
      getList({
        current: 1,
        size: 100,
      }).then(res => {
        let list = res.data.data.records
        list.forEach(ele => {
          window.$glob[ele.globalKey] = ele.globalValue
        })
      })
    },
    handleChange(item, index) {
      this.$router.push({ path: item.path });
    },
  },
};
</script>
<style lang="scss">
@import "@/styles/list.scss";
.index {
  height: 100%;
  .header {
    position: relative;
    height: 180px;
    .bg {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }

    .nav {
      margin: 0 20px;
      width: 100%;
      position: absolute;
      bottom: 10px;
      border: none;
      .el-menu-item {
        background-color: rgba(0, 0, 0, 0) !important;
      }
    }
    .title {
      position: absolute;
      top: 45px;
      left: 40px;
      font-size: 36px;
      color: #b0dafd;
      display: flex;
      align-items: center;
      line-height: 36px;

      .header-logo {
        width: auto;
        height: 32px;
        margin-right: 10px;
      }
    }
    .title small {
      font-size: 18px;
      color: #9cb4c2;
    }
  }
  .main {
    width: 100%;
    height: calc(100% - 180px);
  }
  .content {
    overflow-x: hidden;
  }
  .logo {
    position: absolute;
    top: 30px;
    left: 20px;
  }
}
</style>
