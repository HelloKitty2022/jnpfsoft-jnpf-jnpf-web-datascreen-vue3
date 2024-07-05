<template>
  <div class="document">
    <div class="item">
      <p class="avue-tip-title">大屏轮播</p>
      <el-input placeholder="请输入大屏ID多个大屏用','间隔" v-model="value1">
        <template #append>
          <span @click="goMenu2">预览大屏</span>
        </template>
      </el-input>
    </div>
    <div class="item">
      <p class="avue-tip-title">HTML页面</p>
      <el-input placeholder="请输入大屏ID" v-model="value">
        <template #append>
          <span @click="goMenu1">预览大屏</span>
        </template>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      value1: "",
    };
  },
  methods: {
    goMenu1() {
      if (!this.value) return this.$message.error("请输入大屏ID");
      window.open(
        "/DataV/view.html?id=" +
          this.value +
          "&token=" +
          localStorage.getItem("token") +
          "&isDev=" +
          (process.env.NODE_ENV === "development" ? "1" : "")
      );
    },
    goMenu2() {
      if (!this.value1) {
        this.$message.error('请输入大屏ID多个大屏用", "间隔');
        return;
      }
      window.open(
        "/DataV/swiper.html?id=" +
          this.value1 +
          "&token=" +
          localStorage.getItem("token") +
          "&isDev=" +
          (process.env.NODE_ENV === "development" ? "1" : "")
      );
    },
  },
};
</script>

<style lang="scss">
.document {
  padding: 0 30px;
  .item {
    margin-bottom: 20px;
  }
  .avue-tip-title {
    font-size: 18px;
    margin-bottom: 5px;
  }
}
</style>
