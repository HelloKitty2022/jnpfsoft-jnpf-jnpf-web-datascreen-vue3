import { website } from '@/config.js'
//基本配置
export const config = {
  width: 1920,
  height: 1080,
  query: "function(){\n    return window.$glob.params || {}\n}",
  header: "function(){\n    return window.$glob.params || {}\n}",
  screen: 'x',
  mark: {
    show: false,
    text: '',
    fontSize: 20,
    color: 'rgba(100,100,100,0.2)',
    degree: -20
  },
  scale: 1,
  backgroundImage: `/img/bg/bg.png`,
  url: '',
  group: [],
  style: '',
  before: '',
  gradeShow: false,
  gradeLen: 30,
};
// 颜色的配置
export const colorOption = {
  menuWidth: 150,
  refreshBtn: false,
  columnBtn: false,
  labelWidth: 100,
  column: [{
    label: '颜色1',
    prop: 'color1',
    type: 'color',
  }, {
    label: '渐变色',
    prop: 'color2',
    type: 'color',
  }, {
    label: '位置',
    prop: 'postion',
    type: 'number'
  }]
}
// 表格的列配置
export const tableOption = {
  menuWidth: 150,
  refreshBtn: false,
  columnBtn: false,
  labelWidth: 100,
  column: [{
    label: '名称',
    prop: 'label',
  }, {
    label: 'key值',
    prop: 'prop',
  }, {
    label: '宽度',
    prop: 'width',
    hide: true,
  }, {
    label: '状态',
    prop: 'hide',
    type: 'switch',
    hide: true,
    value: false,
    dicData: [{
      label: '隐藏',
      value: true
    }, {
      label: '显示',
      value: false
    },]
  }, {
    label: '格式化',
    prop: 'formatter',
    span: 24,
    hide: true,
  }]
}
//一些字典的配置
export const dicOption = {
  line: [{ label: '线条', value: 'line' }, { label: '圆环', value: 'circle' }],
  fontWeight: [{ label: 'normal', value: 'normal' }, { label: 'bold', value: 'bold' }, { label: 'bolder', value: 'bolder' }, { label: 'ligter', value: 'ligter' }],
  border: [{ label: '无边框', value: '' }, { label: '内置图片', value: 'img' }, { label: '内置边框', value: 'border' }],
  textAlign: [{ label: '居中', value: 'center' }, { label: '左对齐', value: 'left' }, { label: '右对齐', value: 'right' }],
  dataType: [{ label: '静态数据', value: 0 }, { label: 'API接口数据', value: 1 }, { label: 'SQL数据库数据', value: 2 }, { label: 'WebScoket', value: 3 }, { label: 'Record数据集', value: 4 }, { label: 'Public共用数据', value: 5 }, { label: 'MQTT数据', value: 6 }],
  orientList: [{ label: '竖排', value: 'vertical' }, { label: '横排', value: 'horizontal' }],
  dataMethod: [{ label: 'GET', value: 'get' }, { label: 'DELETE', value: 'delete' }, { label: 'POST', value: 'post' }, { label: 'PUT', value: 'put' }],
  eventList: ['data', 'vue', 'common', 'datav', 'text', 'wordcloud', 'img', 'tabs', 'map', 'video', 'clapper', 'pie', 'pictorialbar', 'iframe', 'swiper', 'flop', 'bar', 'line', 'progress', 'table', 'gauge', 'funnel', 'scatter', 'radar', 'img', 'imgborder', 'imgList', 'imgTabs', 'rectangle'].concat(website.componentsList.filter(ele => ele.data === true).map(ele => ele.name)),
  dataList: ['data', 'vue', 'common', 'datav', 'text', 'wordcloud', 'img', 'tabs', 'map', 'video', 'clapper', 'pie', 'pictorialbar', 'iframe', 'swiper', 'flop', 'bar', 'line', 'progress', 'table', 'gauge', 'funnel', 'scatter', 'radar', 'img', 'imgborder', 'imgList', 'imgTabs', 'rectangle'].concat(website.componentsList.filter(ele => ele.data === true).map(ele => ele.name)),
  barList: ['bar', 'line', 'scatter'],
  titleList: ['bar', 'pie', 'line'],
  labelList: ['bar', 'line', 'pie', 'rectangle', 'funnel', 'radar', 'scatter'],
  legendList: ['bar', 'pie', 'line', 'radar', 'funnel'],
  colorList: ['bar', 'pie', 'line', 'gauge', 'funnel', 'scatter', 'radar'],
  tipList: ['bar', 'pie', 'line', 'rectangle', 'funnel', 'scatter', 'radar'],
  positionList: ['bar', 'line', 'pictorialbar', 'scatter'],
  labelFormatterList: ['bar', 'map', 'line', 'pie', 'gauge', 'funnel', 'scatter', 'radar', 'rectangle'],
  tabsTypeList: [{
    label: '选项卡',
    value: 'tabs',
  }, {
    label: '选择框',
    value: 'select',
  }],
  mapType: [{
    label: '原生',
    value: 0
  }],
  target: [{ label: '本窗口', value: '_self' }, { label: '新窗口', value: '_blank', }],
  swiperType: [{ label: '普通', value: '' }, { label: '立体', value: 'card' }],
  swiperIndicator: [{ label: '外部', value: 'indicator' }, { label: '不显示', value: 'none' }],
  format: [{ label: '日期', value: 'yyyy-MM-dd' }, { label: '日期+时分', value: 'yyyy-MM-dd hh:mm' }, { label: '日期+时分秒', value: 'yyyy-MM-dd hh:mm:ss' }, { label: '日期(无年)', value: 'MM-dd' }, { label: '时分', value: 'hh:mm' }, { label: '时分秒', value: 'hh:mm:ss' }, { label: '星期', value: 'day' }],
  fontFamily: [{ label: '宋体', value: 'SimSun' }, { label: '新宋体', value: 'NSimSun' }, { label: '黑体', value: 'SimHei' }, { label: '楷体', value: 'KaiTi_GB2312' }, { label: '微软雅黑', value: 'Microsoft YaHei' }, { label: '幼园', value: 'YouYuan' }, { label: '华文细黑', value: 'STXihei' }, { label: '细明体', value: 'MingLiU' }, { label: '新细明体', value: 'PMingLiU' }],
  animated: ['bounce', 'bounceIn', 'fadeInDownBig', 'fadeInLeftBig', 'fadeInRightBig', 'fadeInUpBig', 'flip', 'flipInX', 'flipInY'].map(ele => { return { label: ele, value: ele } })
}


function concat(prop, count, type, extend = [], defaults) {
  let list = [];
  for (let i = 1; i <= count; i++) {
    list.push({
      label: prop + i,
      value: `/img/${prop}/${prop}${i}.${extend.includes(i) ? defaults : type}`
    })
  }
  return list;
}