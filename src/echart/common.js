import { setPx, validatenull, addParam, loadFont } from './util';
import { markRaw } from 'vue'
import config from './config';
import * as mqtt from 'mqtt/dist/mqtt.min';
import commonOption from './option'
import { getFunction, funEval, uuid } from '@/utils/utils';
import COMMON from '@/config'
export default (() => {
  return {
    props: {
      dataFormatterStr: String,
      clickFormatterStr: String,
      dblClickFormatterStr: String,
      mouseEnterFormatterStr: String,
      mouseLeaveFormatterStr: String,
      dataBeforeFormatterStr: String,
      dataAfterFormatterStr: String,
      echartFormatterStr: String,
      labelFormatterStr: String,
      stylesFormatterStr: String,
      formatterStr: String,
      titleFormatter: Function,
      sqlFormatter: Function,
      recordFormatter: Function,
      transfer: Function,
      dataQueryType: String,
      dataQuery: String,
      dataHeader: String,
      fontFamily: String,
      initialize: {
        type: Boolean,
        default: true
      },
      width: {
        type: [Number, String],
        default: 600
      },
      height: {
        type: [Number, String],
        default: 600
      },
      theme: {
        type: String
      },
      child: {
        type: Object,
        default: () => {
          return {};
        }
      },
      record: {
        type: String
      },
      public: {
        type: String
      },
      sql: {
        type: String
      },
      time: {
        type: Number,
        default: 0
      },
      proxy: {
        type: Boolean
      },
      url: {
        type: String
      },
      wsUrl: {
        type: String
      },
      mqttUrl: {
        type: String
      },
      mqttConfig: {
        type: Object,
        default: () => {
          return {};
        }
      },
      disabled: {
        type: Boolean,
        default: true
      },
      dataType: {
        type: Number,
        default: 0
      },
      dataMethod: {
        type: String,
        default: 'get'
      },
      id: {
        type: String,
        default: 'main_' + uuid()
      },
      data: {
        type: [Object, String, Array]
      },
      component: {
        type: Object,
        default: () => {
          return {};
        }
      },
      option: {
        type: Object,
        default: () => {
          return {};
        }
      }
    },
    mixins: [commonOption],
    data() {
      return {
        headerHeight: '',
        checkChart: '',
        myChart: '',
        dataOldChart: [],
        dataResultChart: [],
        dataChart: [],
        dataAxios: {},
        dataParams: {},
        refList: [],
        wsClient: {},
        mqClient: {},
        styles: {},
        appendCheck: {},
        appendObj: {},
        appendList: [],
        className: ''
      };
    },
    watch: {
      data() {
        this.updateData()
      },
      dataAppend(val) {
        this.appendObj = {};
        this.appendList = []
        if (!val) {
          this.appendCheck = clearInterval(this.appendCheck)
        } else {
          this.dataChart = []
        }
        this.updateData()
      },
      echartFormatter(val) {
        this.updateChart();
      },
      width() {
        this.$nextTick(() => {
          this.updateChart();
        })
      },
      height() {
        this.$nextTick(() => {
          this.updateChart();
        })
        this.updateChart();
      },
      theme() {
        this.myChart.dispose();
        this.init();
      },
      option: {
        handler() {
          this.updateChart();
        },
        deep: true
      }
    },
    computed: {
      dataFormatter() {
        return getFunction(this.dataFormatterStr)
      },
      clickFormatter() {
        return getFunction(this.clickFormatterStr, true)
      },
      dblClickFormatter() {
        return getFunction(this.dblClickFormatterStr, true)
      },
      mouseEnterFormatter() {
        return getFunction(this.mouseEnterFormatterStr, true)
      },
      mouseLeaveFormatter() {
        return getFunction(this.mouseLeaveFormatterStr, true)
      },
      dataBeforeFormatter() {
        return getFunction(this.dataBeforeFormatterStr, true)
      },
      dataAfterFormatter() {
        return getFunction(this.dataAfterFormatterStr, true)
      },
      echartFormatter() {
        return getFunction(this.echartFormatterStr)
      },
      labelFormatter() {
        return getFunction(this.labelFormatterStr)
      },
      stylesFormatter() {
        return getFunction(this.stylesFormatterStr)
      },
      formatter() {
        return getFunction(this.formatterStr)
      },
      count() {
        return this.option.count;
      },
      dataAppend() {
        return this.option.dataAppend;
      },
      dataChartLen() {
        return (this.dataChart || []).length;
      },
      switchTheme() {
        return this.validData(this.option.switchTheme, false);
      },
      name() {
        let className = this.$el.className.split(' ')[0]
        const result = className.replace(config.name, '');
        return result;
      },
      minWidth() {
        const val = this.option.minWidth;
        if (val > this.width) return val;

      },
      styleChartName() {
        const obj = {
          fontFamily: loadFont(this.component.fontFamily),
          width: setPx(this.minWidth || this.width),
          height: setPx(this.height),
          opacity: this.component.opacity || 1,
          transformOrigin: '0px 0px',
          transform: `scale(${this.component.scale || 1}) perspective(${this.component.perspective || 500}px) rotateX(${this.component.rotateX || 0}deg) rotateY(${this.component.rotateY || 0}deg) rotateZ(${this.component.rotateZ || 0}deg)`
        };
        return obj;
      },
      styleSizeName() {
        return Object.assign({
          width: setPx(this.width),
          height: setPx(this.height),
        }, (() => {
          if (this.minWidth) {
            return {
              overflowX: 'auto',
              overflowY: 'hidden'
            };
          }
          return {};
        })(), this.styles);
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.refList = this.getItemRefs()
        this.className = `animated ${this.component.animated || ''}`
        const main = this.$refs[this.id];
        if (main) {
          // 判断是否图表去初始化
          const isChart = config.echart.includes(this.name);
          if (isChart) this.myChart = markRaw(window.echarts.init(main, this.theme));
        }
        this.updateChart();
        this.updateData()
      },
      getItemRefs() {
        let refList = this.$parent.$parent.$refs;
        let result = {}
        Object.keys(refList).forEach(ele => {
          if (ele.indexOf(COMMON.NAME) !== -1) {
            result[ele.replace(COMMON.NAME, '')] = refList[ele][0]
          }
        })
        return result;
      },
      updateChart() {

      },
      updateClick(params) {
        let refList = this.getItemRefs();
        let indexList = this.child.index;
        let paramName = this.child.paramName;
        let paramValue = this.child.paramValue || 'value';
        let paramList = this.child.paramList || []
        let p = {};
        if (!validatenull(paramName) && !validatenull(paramValue)) {
          p[paramName] = params[paramValue]
        }
        if (!validatenull(p)) {
          indexList.forEach(ele => {
            refList[ele].updateData(p);
          })
        }
        this.transfer && this.transfer(paramList, refList, params)
      },
      updateAppend(result) {
        if (this.validatenull(this.appendObj)) {
          this.appendList = result
          this.appendObj = result[0]
        } else {
          let appendList = [];
          for (let i = 0; i < result.length; i++) {
            const ele = result[i]
            if (ele.id === this.appendObj.id) break
            else appendList.push(ele)
          }
          this.appendObj = result[0]
          appendList.reverse().forEach(ele => {
            this.appendList.unshift(ele);
          })
        }
        if (this.validatenull(this.appendCheck)) {
          this.appendCheck = setInterval(() => {
            let length = this.appendList.length - 1;
            if (length >= 0) {
              let obj = this.appendList.splice(length, 1)[0]
              this.dataChart.unshift(obj);
              let len = this.dataChart.length;
              if (len > this.count) {
                this.appendList.splice(len - 1, 1)
              }
            }
          }, 2000)
        }
      },
      bindEvent() {
        if (this.myChart) {
          [{
            name: 'click',
            event: 'handleClick'
          }, {
            name: 'dblclick',
            event: 'handleDblClick'
          }, {
            name: 'mouseover',
            event: 'handleMouseEnter'
          }, {
            name: 'mouseout',
            event: 'handleMouseLeave'
          }].forEach(ele => {
            this.myChart.off(ele.name);
            this.myChart.on(ele.name, e => this[ele.event](e, e.dataIndex));
          })
        }
      },
      // 更新数据核心方法
      updateData(p = {}) {
        let record, key = false;
        let isRecord = this.dataType === 4;
        let isPublic = this.dataType === 5
        this.dataParams = Object.assign(this.dataParams, p)
        return new Promise((resolve, reject) => {
          this.resetData && this.resetData();
          if (key) return;
          key = true;
          let safe = this
          const formatter = (data, params) => {
            this.dataOldChart = data;
            if (isRecord) {
              const dataFormatter = getFunction(safe.dataFormatter)
              if (typeof dataFormatter == 'function') {
                data = dataFormatter(data)
              }
            }
            if (typeof this.dataFormatter === 'function') {
              try {
                data = this.dataFormatter(data, params, this.getItemRefs());
              } catch (err) {
                console.log(new Error(err))
                data = err + ''
              }
            }
            this.handleCommonBind(data, -1, 'dataAfterFormatter')
            return data
          }
          const getData = () => {
            this.handleCommonBind({}, -1, 'dataBeforeFormatter')
            safe = record || this
            key = false;
            let isApi = safe.dataType === 1;
            let isSql = safe.dataType === 2;
            let isWs = safe.dataType === 3;
            let isMqtt = safe.dataType == 6;
            this.closeClient()
            const bindEvent = () => {
              this.updateChart();
              this.bindEvent()
              if (typeof this.stylesFormatter === 'function') {
                this.styles = this.stylesFormatter(this.dataChart, this.dataParams, this.getItemRefs()) || {};
              }
              resolve({
                news: this.dataChart,
                old: this.dataOldChart
              });
            }
            if (isApi) {
              let url = safe.url;
              if (this.validatenull(url)) return
              let dataQuery = getFunction(safe.dataQuery)
              dataQuery = typeof (dataQuery) === 'function' && dataQuery(url) || {}
              let dataHeader = getFunction(safe.dataHeader)
              dataHeader = typeof (dataHeader) === 'function' && dataHeader(url) || {}
              let params = Object.assign(dataQuery, this.dataParams);
              let axiosParams = {}
              if (safe.proxy) dataHeader.proxy = true;
              if (['post', 'put'].includes(safe.dataMethod)) {
                axiosParams.data = params
                if (safe.dataQueryType == 'form') {
                  if (safe.proxy) dataHeader.form = true
                  let formData = []
                  Object.keys(params).forEach(ele => {
                    formData.push(`${ele}=${params[ele]}`)
                  })
                  axiosParams.data = formData.join('&')
                }
              } else if (['get', 'delete'].includes(safe.dataMethod)) {
                axiosParams.params = params
              }
              this.$axios({
                ...{
                  method: safe.dataMethod,
                  url: url,
                  headers: dataHeader,
                },
                ...axiosParams
              }).then(res => {
                this.dataAxios = res;
                let result = res.data;
                result = formatter(result, params)
                if (this.dataAppend) {
                  this.updateAppend(result)
                } else {
                  this.dataChart = result;
                }
                bindEvent();
              });
            } else if (isWs) {
              let url = safe.wsUrl
              if (this.validatenull(url)) return
              let dataQuery = getFunction(safe.dataQuery)
              dataQuery = typeof (dataQuery) === 'function' && dataQuery(url) || {}
              let params = Object.assign(dataQuery, this.dataParams);
              url = url + addParam(params)
              this.wsClient = new WebSocket(url)
              this.wsClient.onmessage = (msgEvent = {}) => {
                let result = JSON.parse(msgEvent.data)
                this.dataChart = formatter(result, this.dataParams)
                bindEvent();
              }
            } else if (isSql) {
              let sql = JSON.parse(safe.sql);
              let data, result;
              try {
                sql.sql = funEval(sql.sql)(this.dataParams)
                data = JSON.stringify(sql);
              } catch (error) {
                data = safe.sql;
              }
              this.sqlFormatter(data).then(res => {
                result = res.data.data;
                this.dataChart = formatter(result, this.dataParams)
                bindEvent();
              })
            } else if (isMqtt) {
              let url = safe.mqttUrl
              let dataMqttConfig = JSON.parse(safe.mqttConfig)
              dataMqttConfig.clientId = 'mqttjs_' + (this.index || uuid());
              this.mqClient = mqtt.connect(url, dataMqttConfig)
              this.mqClient.on('connect', () => {
                this.mqClient.subscribe(dataMqttConfig.topic.name, { qos: dataMqttConfig.topic.qos || 0 }, (error, res) => {
                  console.log('Subscribe to topics res', res, error)
                  bindEvent()
                })
              })
              this.mqClient.on('message', (topic, message) => {
                let defaultTopic = dataMqttConfig.topic
                if (topic === defaultTopic.name) {
                  let result = JSON.parse(message)
                  this.dataChart = formatter(result, this.dataParams)
                }
              })
            } else if (isPublic) {
              let refList = this.getItemRefs();
              let result = refList[this.public].dataChart
              this.dataChart = formatter(result, this.dataParams)
              this.dataResultChart = this.deepClone(result);
              bindEvent();
            } else {
              let result = safe.data;
              if (isRecord) {
                result = funEval(result)
              }
              this.dataChart = formatter(result, this.dataParams)
              bindEvent();
            }
          };
          const sendData = () => {
            this.$nextTick(() => {
              getData();
              clearInterval(this.checkChart);
              if (isPublic) {
                this.checkChart = setInterval(() => {
                  let refList = this.getItemRefs();
                  let result = refList[this.public].dataChart
                  if (JSON.stringify(result) == JSON.stringify(this.dataResultChart)) return
                  this.dataResultChart = result
                  getData();
                }, 100);
              }
              if (this.time !== 0 && this.disabled) {
                this.checkChart = setInterval(() => {
                  getData();
                }, this.time);
              }
            });
          }
          if (isRecord) {
            this.recordFormatter(this.record).then(res => {
              const data = res.data.data;
              record = {
                ...data,
                sql: data.data
              }
              sendData()
            })
          } else {
            sendData()
          }
        })
      },
      // 绑定点击事件
      handleCommonBind(item, index, type) {
        if (type == 'clickFormatter') {
          this.updateClick(item || this.dataChart);
        }
        let params = {}
        if (!this.validatenull(index)) {
          params = {
            item,
            index,
            data: this.dataChart
          }
          if (item && item.value) params.value = item.value
        } else {
          params = item || this.dataChart
        }
        this[type] && this[type](params, this.getItemRefs());
      },
      handleClick(item, index) {
        this.handleCommonBind(item, index, 'clickFormatter')
      },
      handleDblClick(item, index) {
        this.handleCommonBind(item, index, 'dblClickFormatter')
      },
      handleMouseEnter(item, index) {
        this.handleCommonBind(item, index, 'mouseEnterFormatter')
      },
      handleMouseLeave(item, index) {
        this.handleCommonBind(item, index, 'mouseLeaveFormatter')
      },
      // 下面俩都是chart的公共的方法,就放这里面共用
      getColor(index, first) {
        const barColor = this.option.barColor || [];
        if (barColor[index]) {
          const color1 = barColor[index].color1;
          const color2 = barColor[index].color2;
          const postion = (barColor[index].postion || 0.9) * 0.01;
          if (first) return color1;
          if (color2) {
            return {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [{
                offset: 0,
                color: color1 // 0% 处的颜色
              }, {
                offset: postion,
                color: color2 // 100% 处的颜色
              }],
              global: false // 缺省为 false
            };
          }
          return color1;
        }
      },
      getHasProp(isHas, propObj, staticObj = {}) {
        return Object.assign((() => {
          return isHas ? propObj : {};
        })(), staticObj);
      },
      closeClient() {
        this.wsClient.close && this.wsClient.close()
        this.mqClient.end && this.mqClient.end()
        this.mqClient.close && this.mqClient.close()
      }
    },
    beforeDestroy() {
      clearInterval(this.checkChart);
      this.closeClient()
    }
  };
})();
