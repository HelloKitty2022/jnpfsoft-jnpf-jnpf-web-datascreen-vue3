<template>
  <div class="list">
    <div class="item">
      <div class="label">组件：
        <el-tooltip content="需要操作其他大屏对象，选择后会拿到对应的对象id"
                    placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <div class="value">
        <avue-select :dic="contain.list"
                     size="mini"
                     @change="handleCopy1"
                     v-model="select1"
                     placeholder="请选择大屏对象"
                     :props="{label:'name',value:'index'}">
        </avue-select>
      </div>
    </div>
    <div class="item">
      <div class="label">屏幕：
        <el-tooltip content="需要操作大屏屏幕，选择后拿到对应的id"
                    placement="top">
          <i class="el-icon-info"></i>
        </el-tooltip>
      </div>
      <div class="value">
        <avue-select :dic="contain.config.group"
                     size="mini"
                     @change="handleCopy2"
                     v-model="select2"
                     placeholder="请选择大屏对象"
                     :props="{label:'name',value:'id'}">
        </avue-select>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  inject: ["contain"],
  data () {
    return {
      select1: '',
      select2: ''
    }
  },
  methods: {
    handleCopy1 (val) {
      this.handleCopy(val, 0)
    },
    handleCopy2 (val) {
      this.handleCopy(val, 1)
    },
    handleCopy (val, type) {
      if (!val.value) return
      let text
      if (type == 0) {
        text = `refs['${val.value}']`
      } else {
        text = `$glob.group=${val.value}`
      }
      this.$Clipboard({
        text: text,
      }).then(() => {
        this.$message.success(text + '复制成功')
      }).catch(() => {
        this.$message.error(text + '复制失败')
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.list {
  display: flex;
  padding: 0 25px 15px 25px;
  .item {
    margin-right: 10px;
    font-size: 12px;
    display: flex;
    align-items: center;
    color: #fff;
  }
  .label {
    margin-right: 5px;
    display: flex;
    align-items: center;
  }
}
</style>