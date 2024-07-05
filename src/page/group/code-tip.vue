<template>
  <el-dialog v-model="box" :close-on-click-modal="false" append-to-body modal-append-to-body
    class="avue-dialog" title="说明" width="70%">
    <div class="avue-tip">
      <div class="item">
        <div class="header">
          window.$glob全局参数说明
        </div>
        <div class="content" v-highlight>
          <pre><code>
             window.$glob.params //接受url中的参数
             window.$glob.query //发送全局的url参数
             window.$glob.header //发送全局的header参数
             window.$glob.group //当前显示屏幕，显示那个屏，就把对应id复制给它
             window.$glob['xxx'] //全局变量
             </code>
           </pre>
        </div>
      </div>
      <div class="item">
        <div class="header">
          文件夹内置事件说明
        </div>
        <div class="content" v-highlight>
          <pre><code>
              setDisplay() //隐藏文件夹全部内容，false-显示 true-隐藏
              refs['文件夹Id'].setDisplay(false)
             </code>
           </pre>
        </div>
      </div>
      <div class="item" v-if="type=='content'">
        <div class="header">
          Vue自定义组件说明
        </div>
        <div class="content" v-highlight>
          <pre><code>
              //window.$loadScript远程加载三方包
              @param {*} type 资源类型js/css
              @param {*} url 三方包的地址
              window.$loadScript(type,url).then(res=>{
                  console.log('加载完成')
              })
              created(){
                //触发点击事件和其他组件交互,需要回调click事件
                this.$emit('click',xxx)
                //this.dataChart-数据交互返回的数据值
                console.log(this.dataChart)
                //this.refList-大屏对象的ref集合
                console.log(this.refList)
                //原生组件ref
                console.log(this.refList[id])
                //自定义Vue组件ref
                console.log(this.refList[id].$refs.main)
              }
                 </code> </pre>
        </div>
      </div>
      <div class="item" v-if="type=='echart'">
        <div class="header">
          Echart自定义组件说明
        </div>
        <div class="content" v-highlight>
          <pre><code>
            @param {*} data 数据交互返回的数据值
            @param {*} params 其他组件交互传递的参数
            function (data,params){
              //this.myChart-为Echart实例对象
              console.log(this.myChart)
              //this.refList-大屏对象的ref集合
              console.log(this.refList)
              //原生组件ref
              console.log(this.refList[id])
              //自定义Vue组件ref
              console.log(this.refList[id].$refs.main)
              //如果是异步调用用setOption方法
              this.myChart.setOption(option,true)
              //option为echart的配置直接return返回即可
              return option
            }
         </code> 
         </pre>
        </div>
      </div>
      <div class="item" v-if="type=='echart'">
        <div class="header">
          Time定时器组件说明
        </div>
        <div class="content" v-highlight>
          <pre><code>
            @param {*} refs 大屏对象的ref集合
            function (data){
              //原生组件ref
              console.log(refs[id])
              //自定义Vue组件ref
              console.log(refs[id].$refs.main)
              //修改组件样式
              refs[id].styles.xxxx=xxx;
              //组件赋值
              refs[id].dataChart=xxxx
            }
         </code> 
         </pre>
        </div>
      </div>
      <div class="item" v-if="type=='dataFormatter'">
        <div class="header">
          过滤器说明
        </div>
        <div class="content" v-highlight>
          <pre><code>
            @param {*} data 数据交互返回的数据值
            @param {*} params 其他组件交互传递的参数
            @param {*} refs 大屏对象的ref集合
            //原始数据用JS函数处理成组件需要的数据格式
            function (data,params,refs){
              //原生组件ref
              console.log(refs[id])
              //自定义Vue组件ref
              console.log(refs[id].$refs.main)
              //例如修改组件样式和赋值
              refs[id].styles.xxxx=xxx;
              refs[id].dataChart=xxxx
            }
         </code> 
         </pre>
        </div>
      </div>
      <div class="item"
        v-if="['clickFormatter', 'dblClickFormatter', 'mouseEnterFormatter', 'mouseLeaveFormatter'].includes(type)">
        <div class="header">
          事件说明
        </div>
        <div class="content" v-highlight>
          <pre><code>
            @param {*} params 其他组件交互传递的参数
            @param {*} refs 大屏对象的ref集合
            function (params,refs){
              //原生组件ref
              console.log(refs[id])
              //自定义Vue组件ref
              console.log(refs[id].$refs.main)
              //例如修改组件样式和赋值
              refs[id].styles.xxxx=xxx;
              refs[id].dataChart=xxxx
            }
         </code> 
         </pre>
        </div>
      </div>
      <div class="item" v-if="type=='stylesFormatter'">
        <div class="header">
          样式说明
        </div>
        <div class="content" v-highlight>
          <pre><code>
            @param {*} data 数据交互返回的数据值
            @param {*} params 其他组件交互传递的参数
            @param {*} refs 大屏对象的ref集合
            function (data,params,refs){
              //原生组件ref
              console.log(refs[id])
              //自定义Vue组件ref
              console.log(refs[id].$refs.main)
              //例如修改组件样式和赋值
              refs[id].styles.xxxx=xxx;
              return 返回最终的style样式对象
            }
         </code> 
         </pre>
        </div>
      </div>
      <div class="item" v-if="['query', 'header', 'dataQuery', 'dataHeader'].includes(type)">
        <div class="header">
          参数说明
        </div>
        <div class="content" v-highlight>
          <pre><code>
            @param {*} data 数据交互返回的数据值
            function (data){
              //全局函数,可以获取url里面传递参数
              console.log(window.$glob)
            }
         </code> 
         </pre>
        </div>
      </div>
      <div class="item" v-if="['labelFormatter', 'formatter'].includes(type)">
        <div class="header">
          参数说明
        </div>
        <div class="content" v-highlight>
          <pre><code>
            @param {*} name 当前选中组件的子对象
            @param {*} data 数据交互返回的数据值
            function (name,data){

            }
         </code> 
         </pre>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    type: String
  },
  data() {
    return {
      box: false
    }
  },
  methods: {
    open() {
      this.box = true
    }
  }
}
</script>
