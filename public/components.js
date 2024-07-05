const testComponents = {
  template: `
  <div :style="[styleSizeName,styleName]"
    :class="className">
    <div :style="styleChartName">
      <h2>自定义组件</h2><br />
      <h3>我是参数:{{dataParams}}</h3><br />
      <h3>data:{{dataChart}}</h3><br />
      <h3>params:{{dataAxios.config}}</h3><br />
    </div>
  </div>
`,
  name: 'test',
  props: {
    option: Object,
    component: Object
  },
  computed: {
    styleName () {
      return {
        fontSize: this.fontSize,
        color: this.color
      }
    },
    color () {
      return this.option.color || '#fff'
    },
    fontSize () {
      return (this.option.fontSize || 30) + 'px'
    }
  }
}

const testOption = {
  template: `
  <div>
    <el-form-item label="字体大小">
      <avue-input-number v-model="main.activeOption.fontSize"></avue-input-number>
    </el-form-item>
    <el-form-item label="字体颜色">
      <avue-input-color v-model="main.activeOption.color"></avue-input-color>
    </el-form-item>
  </div>
`,
  name: 'test',
  inject: ["main"]
}
