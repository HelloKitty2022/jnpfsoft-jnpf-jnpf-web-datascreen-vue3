<template>
  <div :class="[b(),className]"
       :style="styleSizeName"
       ref="main">
    <i class="iconfont icon-text"></i>
  </div>
</template>

<script>
import create from "../../create";
export default create({
  name: "data",
  data () {
    return {

    };
  },
  computed: {

  },
  watch: {

  },
  created () { },
  mounted () {

  },
  methods: {

  },
  props: {
    option: {
      type: Object,
      default: () => {
        return {};
      }
    }
  }
});
</script>

