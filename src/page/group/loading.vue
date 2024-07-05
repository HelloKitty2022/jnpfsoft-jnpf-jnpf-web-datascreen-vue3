<template>
  <div class="loading-wrapper"
       v-if="reload">
    <div class="loading-box">
      <span>AVUE-DATA</span>
      <span>大</span>
      <span>屏</span>
      <span>设</span>
      <span>计</span>
      <span>器</span>
    </div>
    <div class="loading_title">加载中…</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      reload: false
    }
  },
  methods: {
    show () {
      this.reload = true;
    },
    hide () {
      this.reload = false;
    }
  }
}
</script>

<style>
.loading-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  background-color: #151a26;
}

.loading-wrapper .loading-box {
  position: fixed;
  left: calc(50% - 250px);
  top: calc(50% - 100px);
  margin: 0 auto;
  width: 500px;
  height: 200px;
  text-align: center;
  vertical-align: center;
  font-weight: bold;
  color: #87888e;
  font-size: 35px;
}

.loading-wrapper .loading-box > span {
  opacity: 0.4;
  display: inline-block;
  animation: bouncingLoader 1s infinite alternate;
}

.loading-wrapper .loading-box > span:nth-child(2) {
  animation-delay: 0.1s;
}

.loading-wrapper .loading-box > span:nth-child(3) {
  animation-delay: 0.2s;
}

.loading-wrapper .loading-box > span:nth-child(4) {
  animation-delay: 0.3s;
}

.loading-wrapper .loading-box > span:nth-child(5) {
  animation-delay: 0.4s;
}

.loading-wrapper .loading-box > span:nth-child(6) {
  animation-delay: 0.5s;
}

.loading-wrapper .loading-box > span:nth-child(7) {
  animation-delay: 0.6s;
}

@keyframes bouncingLoader {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(25px);
  }

  100% {
    transform: translateY(0);
  }
}

.loading-wrapper .loading_title {
  font-weight: bold;
  z-index: 1002;
  position: absolute;
  top: 50%;
  margin-top: 15px;
  color: #87888e;
  font-size: 18px;
  width: 100%;
  height: 30px;
  text-align: center;
  opacity: 0.4;
  line-height: 30px;
}
</style>