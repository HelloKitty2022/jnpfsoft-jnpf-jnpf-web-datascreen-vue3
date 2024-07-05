const baseUrl = '/api/blade-visual'
window.$website = {
  isDemo: false,
  isDemoTip: '演示环境不允许操作',
  title: 'JNPF数据大屏',
  name: '智慧可视化大屏',
  subName: '可视化数据大屏',
  url: baseUrl,
  autoSave: false,
  autoSaveTime: 60000,
  tabsList: [0, 1, 2, 3, 4, 5, 6, 7],
  componentsList: [{
    name: 'test',
    component: 'testComponents',
    option: 'testOption',
    data: true
  }],
  baseList: [{
    label: '图表',
    icon: 'icon-bar',
    children: [{
      label: ' 自定义echart',
      option: {
        name: "自定义echart",
        title: "自定义echart",
        icon: 'icon-echart',
        img: '/img/assets/text5.png',
        dataType: 1,
        "dataMethod": 'get',
        data: {
          "categories": [
            "苹果",
            "三星",
            "小米",
            "oppo",
            "vivo"
          ],
          "series": [{
            name: "手机品牌",
            data: [
              1000879,
              3400879,
              2300879,
              5400879,
              3400879
            ]
          }]
        },
        echartFormatter: "function (data,params){\n    data={\n        \"中国\": \"/asset/get/s/data-1527045631990-r1dZ0IM1X.json\",\n        \"上海\": \"/asset/get/s/data-1482909900836-H1BC_1WHg.json\",\n        \"河北\": \"/asset/get/s/data-1482909799572-Hkgu_yWSg.json\",\n        \"山西\": \"/asset/get/s/data-1482909909703-SyCA_JbSg.json\",\n        \"内蒙古\": \"/asset/get/s/data-1482909841923-rkqqdyZSe.json\",\n        \"辽宁\": \"/asset/get/s/data-1482909836074-rJV9O1-Hg.json\",\n        \"吉林\": \"/asset/get/s/data-1482909832739-rJ-cdy-Hx.json\",\n        \"黑龙江\": \"/asset/get/s/data-1482909803892-Hy4__J-Sx.json\",\n        \"江苏\": \"/asset/get/s/data-1482909823260-HkDtOJZBx.json\",\n        \"浙江\": \"/asset/get/s/data-1482909960637-rkZMYkZBx.json\",\n        \"安徽\": \"/asset/get/s/data-1482909768458-HJlU_yWBe.json\",\n        \"福建\": \"/asset/get/s/data-1478782908884-B1H6yezWe.json\",\n        \"江西\": \"/asset/get/s/data-1482909827542-r12YOJWHe.json\",\n        \"山东\": \"/asset/get/s/data-1482909892121-BJ3auk-Se.json\",\n        \"河南\": \"/asset/get/s/data-1482909807135-SJPudkWre.json\",\n        \"湖北\": \"/asset/get/s/data-1482909813213-Hy6u_kbrl.json\",\n        \"湖南\": \"/asset/get/s/data-1482909818685-H17FOkZSl.json\",\n        \"广东\": \"/asset/get/s/data-1482909784051-BJgwuy-Sl.json\",\n        \"广西\": \"/asset/get/s/data-1482909787648-SyEPuJbSg.json\",\n        \"海南\": \"/asset/get/s/data-1482909796480-H12P_J-Bg.json\",\n        \"四川\": \"/asset/get/s/data-1482909931094-H17eKk-rg.json\",\n        \"贵州\": \"/asset/get/s/data-1482909791334-Bkwvd1bBe.json\",\n        \"云南\": \"/asset/get/s/data-1482909957601-HkA-FyWSx.json\",\n        \"西藏\": \"/asset/get/s/data-1482927407942-SkOV6Qbrl.json\",\n        \"陕西\": \"/asset/get/s/data-1482909918961-BJw1FyZHg.json\",\n        \"甘肃\": \"/asset/get/s/data-1482909780863-r1aIdyWHl.json\",\n        \"青海\": \"/asset/get/s/data-1482909853618-B1IiOyZSl.json\",\n        \"宁夏\": \"/asset/get/s/data-1482909848690-HJWiuy-Bg.json\",\n        \"新疆\": \"/asset/get/s/data-1482909952731-B1YZKkbBx.json\",\n        \"北京\": \"/asset/get/s/data-1482818963027-Hko9SKJrg.json\",\n        \"天津\": \"/asset/get/s/data-1482909944620-r1-WKyWHg.json\",\n        \"重庆\": \"/asset/get/s/data-1482909775470-HJDIdk-Se.json\",\n        \"香港\": \"/asset/get/s/data-1461584707906-r1hSmtsx.json\",\n        \"澳门\": \"/asset/get/s/data-1482909771696-ByVIdJWBx.json\"\n    }\n    const myChart = this.myChart;\n    function loadMap(mapCode, name){\n        axios.get(data[mapCode]).then(res=>{\n            echarts.registerMap(name, res.data);\n            let option = {\n                tooltip: {\n                    triggerOn: \"click\",\n                    formatter: function(e, t, n) {\n                        return .5 == e.value ? e.name + \"：有疑似病例\" : e.seriesName + \"<br />\" + e.name + \"：\" + e.value\n                    }\n                },\n                visualMap: {\n                    min: 0,\n                    max: 1000,\n                    left: 26,\n                    bottom: 40,\n                    showLabel: !0,\n                    text: [\"高\", \"低\"],\n                    pieces: [{\n                        gt: 100,\n                        label: \"> 100 人\",\n                        color: \"#7f1100\"\n                    }, {\n                        gte: 10,\n                        lte: 100,\n                        label: \"10 - 100 人\",\n                        color: \"#ff5428\"\n                    }, {\n                        gte: 1,\n                        lt: 10,\n                        label: \"1 - 9 人\",\n                        color: \"#ff8c71\"\n                    }, {\n                        gt: 0,\n                        lt: 1,\n                        label: \"疑似\",\n                        color: \"#ffd768\"\n                    }, {\n                        value: 0,\n                        color: \"#ffffff\"\n                    }],\n                    show: !0\n                },\n                geo: {\n                    map: name,\n                    roam: !1,\n                    scaleLimit: {\n                        min: 1,\n                        max: 2\n                    },\n                    zoom: 1.23,\n                    top: 120,\n                    label: {\n                        normal: {\n                            show: !0,\n                            fontSize: \"14\",\n                            color: \"rgba(0,0,0,0.7)\"\n                        }\n                    },\n                    itemStyle: {\n                        normal: {\n                            //shadowBlur: 50,\n                            //shadowColor: 'rgba(0, 0, 0, 0.2)',\n                            borderColor: \"rgba(0, 0, 0, 0.2)\"\n                        },\n                        emphasis: {\n                            areaColor: \"#f2d5ad\",\n                            shadowOffsetX: 0,\n                            shadowOffsetY: 0,\n                            borderWidth: 0\n                        }\n                    }\n                },\n                series: [{\n                    name: \"确诊病例\",\n                    type: \"map\",\n                    geoIndex: 0,\n                    data: [{\n                    name: \"南海诸岛\",\n                    value: 0\n                },\n                {\n                    name: '北京',\n                    value: 54\n                },\n                {\n                    name: '天津',\n                    value: 13\n                },\n                {\n                    name: '上海',\n                    value: 40\n                },\n                {\n                    name: '重庆',\n                    value: 75\n                },\n                {\n                    name: '河北',\n                    value: 13\n                },\n                {\n                    name: '河南',\n                    value: 83\n                },\n                {\n                    name: '云南',\n                    value: 11\n                },\n                {\n                    name: '辽宁',\n                    value: 19\n                },\n                {\n                    name: '黑龙江',\n                    value: 15\n                },\n                {\n                    name: '湖南',\n                    value: 69\n                },\n                {\n                    name: '安徽',\n                    value: 60\n                },\n                {\n                    name: '山东',\n                    value: 39\n                },\n                {\n                    name: '新疆',\n                    value: 4\n                },\n                {\n                    name: '江苏',\n                    value: 31\n                },\n                {\n                    name: '浙江',\n                    value: 104\n                },\n                {\n                    name: '江西',\n                    value: 36\n                },\n                {\n                    name: '湖北',\n                    value: 1052\n                },\n                {\n                    name: '广西',\n                    value: 33\n                },\n                {\n                    name: '甘肃',\n                    value: 7\n                },\n                {\n                    name: '山西',\n                    value: 9\n                },\n                {\n                    name: '内蒙古',\n                    value: 7\n                },\n                {\n                    name: '陕西',\n                    value: 22\n                },\n                {\n                    name: '吉林',\n                    value: 4\n                },\n                {\n                    name: '福建',\n                    value: 18\n                },\n                {\n                    name: '贵州',\n                    value: 5\n                },\n                {\n                    name: '广东',\n                    value: 98\n                },\n                {\n                    name: '青海',\n                    value: 1\n                },\n                {\n                    name: '西藏',\n                    value: 0\n                },\n                {\n                    name: '四川',\n                    value: 44\n                },\n                {\n                    name: '宁夏',\n                    value: 4\n                },\n                {\n                    name: '海南',\n                    value: 22\n                },\n                {\n                    name: '台湾',\n                    value: 3\n                },\n                {\n                    name: '香港',\n                    value: 5\n                },\n                {\n                    name: '澳门',\n                    value: 5\n                }\n            ]\n                }]\n            }\n         myChart.setOption(option);\n        })\n            \n    }\n    loadMap('中国','china')\n    var timeFn = null;\n    setTimeout(()=>{\n\n        //单击切换到省级地图，当mapCode有值,说明可以切换到下级地图\n        myChart.on('click', function(params) {\n            clearTimeout(timeFn);\n            //由于单击事件和双击事件冲突，故单击的响应事件延迟250毫秒执行\n            timeFn = setTimeout(function() {\n                var name = params.name; //地区name\n                var mapCode = data[name]; //地区的json数据\n                loadMap(name, name);\n            }, 250);\n        });\n\n\n        // 绑定双击事件，返回全国地图\n        myChart.on('dblclick', function(params) {\n            //当双击事件发生时，清除单击事件，仅响应双击事件\n            clearTimeout(timeFn);\n            \n            //返回全国地图\n            loadMap('中国', 'china');\n        });\n    },0)\n    return {}\n}",
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        url: "",
        option: {
          remote: false,
          src: '/echart-remote-temp.js'
        },
        component: {
          width: 660,
          height: 560,
          name: "common",
          prop: "common",
          remoteContent: ''
        },
      }
    }, {
      label: 'datav',
      option: {
        name: "datav",
        title: "datav",
        icon: 'icon-datav',
        img: '/img/assets/text6.png',
        dataType: 0,
        "dataMethod": 'get',
        data: {
          value: 66
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        echartFormatter: "(data,params)=>{\n  console.log(data);\n  return {\n    config:{\n\t    data: [66] \n\t  }\n  }\n}",
        component: {
          width: 150,
          height: 200,
          name: "datav",
          prop: "datav",
        },
        option: {
          is: 'dv-water-level-pond'
        }
      }
    }, {
      label: '柱形图',
      option: {
        name: "柱状图",
        title: "柱状图",
        icon: 'icon-bar',
        img: '/img/assets/bar.png',
        data: {
          categories: [
            "苹果",
            "三星",
            "小米",
            "oppo",
            "vivo"
          ],
          series: [{
            name: "手机品牌",
            data: [
              1000879,
              3400879,
              2300879,
              5400879,
              3400879
            ]
          }]
        },
        dataType: 0,
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 600,
          height: 300,
          name: "bar",
          prop: "bar",
        },
        option: {
          gridX: 90,
          gridY: 47,
          gridX2: 43,
          gridY2: 25,
          legend: true,
          tipShow: true,
          xAxisShow: true,
          yAxisShow: true,
          barWidth: 30,
          barRadius: 8,
          barColor: [{
            color1: "#83bff6",
            color2: "#188df0",
            postion: 90
          }, {
            color1: "#23B7E5",
            color2: "#564AA3",
            postion: 50,
          }],
          barMinHeight: 2
        }
      }
    }, {
      label: '折线图',
      option: {
        name: "折线图",
        title: "折线图",
        icon: 'icon-line',
        img: '/img/assets/line.png',
        data: {
          categories: [
            "苹果",
            "三星",
            "小米",
            "oppo",
            "vivo"
          ],
          series: [{
            name: "手机品牌",
            data: [
              1000879,
              3400879,
              2300879,
              5400879,
              3400879
            ]
          }]
        },
        dataType: 0,
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 600,
          height: 300,
          name: "line",
          prop: "line",
        },
        option: {
          gridX: 84,
          gridY: 35,
          gridX2: 26,
          gridY2: 31,
          legend: true,
          tipShow: true,
          xAxisShow: true,
          yAxisShow: true,
          barColor: [{
            color1: "#83bff6",
            color2: "#188df0",
            postion: 90
          }, {
            color1: "#23B7E5",
            color2: "#564AA3",
            postion: 50
          }],
          symbolShow: true,
          symbolSize: 6,
          smooth: true,
        }
      }
    }, {
      label: '饼图',
      option: {
        name: "饼图",
        title: "饼图",
        icon: 'icon-pie',
        img: '/img/assets/pie.png',
        data: [{
          name: "苹果",
          value: 1000879,
          url: "http://www.baidu.com"
        }, {
          name: "三星",
          value: 3400879,
          url: "http://www.baidu.com"
        }, {
          name: "小米",
          value: 2300879,
          url: "http://www.baidu.com"
        }, {
          name: "oppo",
          value: 5400879,
          url: "http://www.baidu.com"
        }, {
          name: "大疆",
          value: 3000,
          url: "http://www.baidu.com"
        }],
        dataType: 0,
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 600,
          height: 300,
          name: "pie",
          prop: "pie",
        },
        option: {
          legend: true,
          labelShow: true,
          barColor: [
            {
              color1: "#83bff6"
            },
            {
              color1: "#23B7E5"
            },
            {
              color1: "rgba(154, 168, 212, 1)"
            },
            {
              color1: "#188df0"
            },
            {
              color1: "#564AA3"
            }
          ]
        }
      }
    }, {
      label: '象形图',
      option: {
        title: "象形图",
        name: "象形图",
        icon: "icon-pictorialBar",
        img: '/img/assets/bar2.png',
        data: [{
          name: "苹果",
          value: 1000879,
        }, {
          name: "三星",
          value: 3400879,
        }, {
          name: "小米",
          value: 2300879,
        }, {
          name: "oppo",
          value: 5400879,
        }, {
          name: "大疆",
          value: 3000,
        }, {
          name: "抖音",
          value: 2000,
        }],
        dataType: 0,
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 600,
          height: 300,
          name: "pictorialbar",
          prop: "pictorialbar",
        },
        option: {
          symbolSize: 30,
          split: 30,
          symbol: 'img/source/source256.png',
          labelFontSize: '24',
          labelColor: '#4dffff',
          fontSize: 20,
          color: '#fff',
          gridX: 76,
          gridY: 4,
          gridX2: 127,
          gridY2: 0
        }
      }
    }, {
      label: '雷达图',
      option: {
        title: "雷达图",
        name: "雷达图",
        icon: "icon-radar",
        img: '/img/assets/radar.png',
        dataType: 0,
        data: {
          indicator: [{
            name: '销售',
            max: 6500
          },
          {
            name: '管理',
            max: 16000
          },
          {
            name: '信息技术',
            max: 30000
          },
          {
            name: '客服',
            max: 38000
          },
          {
            name: '研发',
            max: 52000
          },
          {
            name: '市场',
            max: 25000
          }
          ],
          series: [{
            data: [{
              value: [4300, 10000, 28000, 35000, 50000, 19000],
              name: '预算分配（Allocated Budget）'
            },
            {
              value: [5000, 14000, 28000, 31000, 42000, 21000],
              name: '实际开销（Actual Spending）'
            }
            ]
          }]
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 970,
          height: 400,
          name: "radar",
          prop: "radar",
        },
        option: {
          width: '100%',
          height: 600,
          color: '#fff',
          fontSize: 18,
          areaOpacity: 0.3,
          legend: true,
          tipShow: true,
          barColor: [{
            color1: "#564AA3",
          },
          {
            color1: "#188df0",
          }]
        },
      }
    }, {
      label: '散点图',
      option: {
        title: "散点图",
        name: "散点图",
        icon: "icon-scatter",
        img: '/img/assets/scatter.png',
        dataType: 0,
        data: [{
          data: [
            [1, 8.04],
            [2, 6.95]
          ]
        },
        {
          data: [
            [1, 4.04],
            [2, 3.95]
          ]
        }],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 600,
          height: 300,
          name: "scatter",
          prop: "scatter",
        },
        option: {
          gridX: 26,
          gridY: 12,
          gridX2: 14,
          gridY2: 30,
          lineSize: 25,
          tipShow: true,
          labelShow: true,
          legend: true,
          xAxisSplitLineShow: true,
          yAxisSplitLineShow: true,
          barColor: [{
            postion: 0.2,
            color1: '#91c7ae'
          },
          {
            postion: 0.8,
            color1: '#63869e'
          },
          {
            postion: 1,
            color1: '#c23531'
          }]
        }
      }
    }, {
      label: '漏斗图',
      option: {
        title: "漏斗图",
        name: "漏斗图",
        icon: "icon-funnel",
        img: '/img/assets/funnel.png',
        dataType: 0,
        data: [
          { value: 60, name: 'Visit' },
          { value: 40, name: 'Inquiry' },
          { value: 20, name: 'Order' },
          { value: 80, name: 'Click' },
          { value: 100, name: 'Show' }
        ],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 450,
          height: 350,
          name: "funnel",
          prop: "funnel",
        },
        option: {
          legend: true,
          labelShow: true,
          tipShow: true,
          barColor: [{
            color1: "#83bff6",
          },
          {
            color1: "#23B7E5",
          },
          {
            color1: "rgba(154, 168, 212, 1)",
          },
          {
            color1: "#188df0",
          },
          {
            color1: "#564AA3",
          }]
        }
      }
    }, {
      label: '地图',
      option: {
        name: "地图",
        title: "地图",
        icon: "icon-map",
        img: '/img/assets/map.png',
        dataType: 0,
        data: [
          {
            name: "测试坐标1",
            value: 1,
            lng: 118.30078125,
            lat: 36.91915611148194,
            zoom: 1
          },
          {
            name: "测试坐标2",
            value: 1,
            lng: 112.21435546875,
            lat: 37.965854128749434,
            zoom: 1
          }
        ],
        formatter: "(name,data)=>{\n  return '名称:'+name.data.name+name.data.value\n}",
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 800,
          height: 607,
          name: "map",
          prop: "map",
        },
        option: {
          tipBackgroundColor: "rgba(13, 255, 255, .5)",
          tipColor: "rgba(217, 38, 10, 1)",
          tipFontSize: "30",
          borderWidth: 1,
          scale: 87,
          type: 0,
          borderColor: "#0dffff",
          areaColor: "rgba(6, 29, 51, 0.59)",
          banner: true,
          bannerTime: 3000,
          fontSize: 14,
          zoom: 0.5,
          roam: true,
          empAreaColor: "rgba(35, 183, 229, 0.42)",
          empColor: "rgba(217, 38, 10, 1)",
          index: "894edc1d-d2f0-4616-962c-8e61083ada71",
          mapData: "https://data.bladex.vip/blade-visual/map/data?id=1235103352843448322",
          color: "rgba(13, 255, 255, 1)",
        }
      }
    }, {
      label: '矩形图',
      option: {
        name: "矩形图",
        title: "矩形图",
        icon: 'icon-juxing',
        img: '/img/assets/rectangle.png',
        data: [
          {
            name: "分类 1",
            value: 560
          },
          {
            name: "分类 2",
            value: 500
          },
          {
            name: "分类 3",
            value: 150
          },
          {
            name: "分类 4",
            value: 140
          },
          {
            name: "分类 5",
            value: 115
          },
          {
            name: "分类 6",
            value: 95
          },
          {
            name: "分类 7",
            value: 90
          },
          {
            name: "分类 8",
            value: 75
          },
          {
            name: "分类 9",
            value: 98
          },
          {
            name: "分类 10",
            value: 60
          },
          {
            name: "分类 11",
            value: 45
          },
          {
            name: "分类 12",
            value: 40
          },
          {
            name: "分类 13",
            value: 40
          },
          {
            name: "分类 14",
            value: 35
          },
          {
            name: "分类 15",
            value: 40
          },
          {
            name: "分类 16",
            value: 40
          },
          {
            name: "分类 17",
            value: 40
          },
          {
            name: "分类 18",
            value: 30
          },
          {
            name: "分类 19",
            value: 28
          },
          {
            name: "分类 20",
            value: 16
          }
        ],
        dataType: 0,
        component: {
          width: 754,
          height: 377,
          name: "rectangle",
          prop: "rectangle",
        },
        option: {
          tipShow: true,
          labelShow: true,
          labelShowColor: '#fff',
          labelShowFontSize: 14
        }
      }
    }]
  }, {
    label: '文字',
    icon: 'icon-text',
    children: [{
      label: '文本框',
      option: {
        title: "文本框",
        name: "文本框",
        icon: 'icon-text',
        img: '/img/assets/text.png',
        dataType: 0,
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        child: {
          index: [],
          paramName: ""
        },
        data: {
          value: '文本框'
        },
        component: {
          width: 100,
          height: 40,
          name: "text",
          prop: "text"
        },
        option: {
          textAlign: "center",
          fontSize: 26,
          fontWeight: "normal",
          color: "#fff"
        },
      },
    }, {
      label: '跑马灯',
      option: {
        title: "跑马灯",
        name: "跑马灯",
        icon: 'icon-scroll',
        img: '/img/assets/text2.png',
        top: 0,
        left: 0,
        dataType: 0,
        data: {
          value: "跑马灯"
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 100,
          height: 50,
          name: "text",
          prop: "text"
        },
        option: {
          scroll: true,
          speed: 70,
          textAlign: "center",
          fontSize: 26,
          fontWeight: "normal",
          color: "#fff"
        },
      },
    }, {
      label: '超链接',
      option: {
        title: "超链接",
        name: "超链接",
        icon: 'icon-link',
        img: '/img/assets/text3.png',
        top: 0,
        left: 0,
        data: {
          value: "超链接"
        },
        dataType: 0,
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 100,
          height: 50,
          name: "text",
          prop: "text"
        },
        option: {
          link: true,
          linkHref: 'http://avue.top',
          linkTarget: '_self',
          textAlign: "center",
          fontSize: 26,
          fontWeight: "normal",
          color: "#fff"
        },
      },
    }, {
      label: '实时时间',
      option: {
        name: "实时时间",
        title: "实时时间",
        icon: 'icon-datetime',
        img: '/img/assets/datetime.png',
        top: 78,
        left: 1604,
        component: {
          width: 250,
          height: 50,
          name: "datetime",
          prop: "datetime",
        },
        option: {
          format: 'yyyy-MM-dd hh:mm:ss',
          color: "#fff",
          textAlign: 'left',
          fontSize: 24,
          fontWeight: "normal"
        }
      },
    }]
  }, {
    label: '媒体',
    icon: 'icon-img',
    children: [{
      label: '图片',
      option: {
        title: "图片",
        name: "图片",
        icon: 'icon-img',
        img: '/img/assets/img.png',
        top: 0,
        left: 0,
        dataType: 0,
        data: {
          value: 'img/img-default.png'
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 180,
          height: 120,
          name: 'img',
          prop: 'img',
        },
        option: {
          duration: '1000',
        }
      }
    }, {
      label: '图片框',
      option: {
        title: "图片框",
        name: "图片框",
        icon: 'icon-imgborder',
        img: '/img/assets/imgborder.png',
        top: 0,
        left: 0,
        dataType: 0,
        data: "img/border/border1.png",
        component: {
          width: 140,
          height: 140,
          name: "imgborder",
          prop: "imgborder",
        },
        option: {
          backgroundColor: 'rgba(180, 181, 198, 0.1)',
        }
      }
    }, {
      label: 'SVG',
      option: {
        title: "SVG",
        name: "SVG",
        icon: 'icon-svg',
        img: '/img/assets/svg.png',
        top: 0,
        left: 0,
        dataType: 0,
        data: "img/border/border1.png",
        component: {
          width: 100,
          height: 100,
          name: "svg",
          prop: "svg",
        },
        option: {
          content: ''
        }
      }
    }, {
      label: '轮播图',
      option: {
        title: "轮播图",
        name: "轮播图",
        icon: 'icon-banner',
        img: '/img/assets/swiper.png',
        top: 0,
        left: 0,
        dataType: 0,
        data: [{
          value: 'https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg',
        }, {
          value: 'https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg',
        }, {
          value: 'http://www.w3school.com.cn/i/movie.ogg'
        }],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 670,
          height: 370,
          name: "swiper",
          prop: "swiper"
        },
        option: {
          type: '',
          interval: 5000,
          opacity: 100,
          indicator: 'none',
          autoplay: true,
          controls: true,
          loop: true
        },
      }
    }, {
      label: 'iframe',
      option: {
        title: "iframe",
        name: "iframe",
        icon: 'icon-iframe',
        img: '/img/assets/iframe.png',
        top: 0,
        left: 0,
        component: {
          width: 670,
          height: 370,
          option: {},
          name: "iframe",
          prop: "iframe"
        },
        dataType: 0,
        data: {
          value: 'https://avuejs.com'
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        option: {},
      }
    }, {
      label: 'video播放器',
      option: {
        title: "video",
        name: "video",
        icon: 'icon-video',
        img: '/img/assets/video.png',
        top: 0,
        left: 0,
        dataType: 0,
        data: {
          value: 'http://www.w3school.com.cn/i/movie.ogg'
        },
        option: {
          autoplay: false,
          controls: true,
          loop: true,
          poster: ''
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 670,
          height: 370,
          name: "video",
          prop: "video"
        },
      }
    }, {
      label: 'hls播放器',
      option: {
        title: "hls",
        name: "hls",
        icon: 'icon-video',
        img: '/img/assets/video.png',
        top: 0,
        left: 0,
        dataType: 0,
        data: {
          value: 'https://open.ys7.com/v3/openlive/E10668433_1_1.m3u8?expire=1664027961&id=363444666731335680&t=346b970f0d5cb5d5b5e4734d966275a61fb9efd5038c7a75b7435423c5716908&ev=100'
        },
        option: {
          autoplay: true
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 670,
          height: 370,
          option: {},
          name: "clapper",
          prop: "clapper"
        },
      }
    }]
  }, {
    label: '指标',
    icon: 'icon-flop',
    children: [{
      label: '翻牌器',
      option: {
        title: "翻牌器",
        name: "翻牌器",
        icon: 'icon-flop',
        img: '/img/assets/flop.png',
        top: 0,
        left: 0,
        dataType: 0,
        child: {
          index: [],
          paramName: ""
        },
        data: {
          value: '12345'
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 445.6,
          height: 86.56,
          name: "flop",
          prop: "flop",
        },
        option: {
          textAlign: 'center',
          paddingLeft: 10,
          marginLeft: 10,
          border: true,
          borderColor: "#fff",
          borderWidth: 10,
          backgroundBorder: "img/border/border1.png",
          fontSize: 50,
          color: "#afdef2",
          backgroundColor: "#132d4f"
        },
      }
    }, {
      label: '颜色块',
      option: {
        title: "颜色块",
        name: "颜色块",
        icon: 'icon-flop',
        img: '/img/assets/flop2.png',
        "child": {
          "index": [],
          "paramName": ""
        },
        top: 0,
        left: 0,
        dataType: 0,
        data: [{
          backgroundColor: '#67C23A',
          prefixText: "某某某总人数",
          value: '12345',
          suffixText: '人',
        }, {
          backgroundColor: '#409EFF',
          prefixText: "某某某总人数",
          value: '12345',
          suffixText: '人',
        }, {
          backgroundColor: '#E6A23C',
          prefixText: "某某某总人数",
          value: '12345',
          suffixText: '人',
        }, {
          backgroundColor: '#F56C6C',
          prefixText: "某某某总人数",
          value: '12345',
          suffixText: '人',
        }, {
          backgroundColor: '#7232dd',
          prefixText: "某某某总人数",
          value: '12345',
          suffixText: '人',
        }, {
          backgroundColor: 'blue',
          prefixText: "某某某总人数",
          value: '12345',
          suffixText: '人',
        }],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 543.04,
          height: 196.28,
          name: "flop",
          prop: "flop",
        },
        option: {
          width: 180,
          whole: true,
          fontSize: 28,
          prefixFontSize: 13,
          backgroundColor: "#F56C6C",
          suffixFontSize: 18,
          marginTop: 10,
          marginLeft: 5,
          paddingTop: 10,
          paddingLeft: 30,
          color: "#fff",
          suffixInline: true,
          fontWeight: "bolder"
        },
      }
    }, {
      label: '环形图',
      option: {
        title: "环形图",
        name: "环形图",
        icon: 'icon-circle',
        img: '/img/assets/progress.png',
        top: 0,
        left: 0,
        dataType: 0,
        data: {
          label: "人数增涨",
          value: 40,
          data: 80
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 300,
          height: 300,
          name: "progress",
          prop: "progress"
        },
        option: {
          type: "circle",
          color: "#60d3da",
          fontSize: 25,
          suffixColor: "#60d3da",
          strokeWidth: 20,
          fontWeight: "normal",
          borderColor: "#60d3da",
          suffixFontSize: 30,
          FontWeight: "normal"
        },
      }
    }, {
      label: '进度条',
      option: {
        title: "进度条",
        name: "进度条",
        icon: 'icon-progress',
        img: '/img/assets/progress2.png',
        top: 0,
        left: 0,
        data: {
          label: "人数增涨",
          value: 40,
          data: 80
        },
        dataType: 0,
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 500,
          height: 100,
          name: "progress",
          prop: "progress"
        },
        option: {
          type: "line",
          color: "#60d3da",
          fontSize: 25,
          suffixColor: "#60d3da",
          strokeWidth: 10,
          fontWeight: "normal",
          borderColor: "#60d3da",
          suffixFontSize: 30,
          FontWeight: "normal"
        },
      }
    }, {
      label: '仪表盘',
      option: {
        title: "仪表盘",
        icon: 'icon-gauge',
        img: '/img/assets/gauge.png',
        name: "仪表盘",
        dataType: 0,
        data: {
          value: 4
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 390,
          height: 314,
          name: "gauge",
          prop: "gauge"
        },
        option: {
          lineSize: 15,
          axisLabelShow: true,
          axisLabelFontSize: 15,
          nameFontSize: 40,
          lineColor: "#eee",
          barColor: [
            {
              color1: "rgba(154, 168, 212, 1)",
              postion: "0.2",
            },
            {
              color1: "#23B7E5",
              postion: "0.8",
            },
            {
              color1: "#564AA3",
              postion: "1",
            }
          ]
        },
      },
    }, {
      label: '字符云',
      option: {
        title: "字符云",
        name: "字符云",
        icon: "icon-wordCloud",
        img: '/img/assets/wordcloud.png',
        top: 0,
        left: 0,
        dataType: 0,
        data: [{
          name: '三星',
          value: '1'
        }, {
          name: '小米',
          value: '10'
        }, {
          name: '华为',
          value: '20'
        }, {
          name: 'oppo',
          value: '30'
        }, {
          name: '抖音',
          value: '40'
        }, {
          name: '快手',
          value: '50'
        }, {
          name: '淘宝',
          value: '60'
        }, {
          name: '百度',
          value: '70'
        }, {
          name: '京东',
          value: '80'
        }, {
          name: '天猫',
          value: '100'
        }, {
          name: '字符1',
          value: '110'
        }, {
          name: '字符1',
          value: '200',
          textStyle: {
            color: 'red'
          }
        }],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          name: "wordcloud",
          prop: "wordcloud",
          width: 600,
          height: 300,
        },
        option: {
          minFontSize: 30,
          maxFontSize: 80,
          split: 30,
          rotate: true,
        }
      }
    }]
  }, {
    label: '表格',
    icon: 'icon-table',
    children: [{
      label: '表格',
      option: {
        title: "表格",
        name: "表格",
        icon: 'icon-table',
        img: '/img/assets/table.png',
        top: 0,
        left: 0,
        dataType: 0,
        data: [{
          type1: '数据1',
          type2: '数据1'
        }, {
          type1: '数据2',
          type2: '数据2'
        }, {
          type1: '数据3',
          type2: '数据3'
        }, {
          type1: '数据4',
          type2: '数据4'
        }],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 700,
          height: 350,
          name: "table",
          prop: "table",
        },
        option: {
          showHeader: true,
          columnShow: true,
          columnViews: true,
          headerBackground: "#050e18",
          headerColor: "#69bfe7",
          headerTextAlign: "center",
          nthColor: "#09192c",
          bodyBackground: "rgba(0, 0, 0, 0.01)",
          bodyColor: "#69bfe7",
          bodyTextAlign: "center",
          align: "center",
          headerAlign: "center",
          header: false,
          scrollSpeed: 1,
          fontSize: 15,
          count: 4,
          index: true,
          column: [
            {
              label: "列1",
              prop: "type1",
              $index: 0
            },
            {
              label: "列2",
              prop: "type2",
              $index: 1
            },
            {
              label: "列3",
              prop: "type3",
              $index: 2
            },
            {
              label: "列4",
              prop: "type4",
              $index: 3
            }
          ],
          othColor: "#142a40",
          headerFontSize: 20,
          bodyFontSize: 18
        }
      }
    }, {
      label: '选项卡',
      option: {
        title: "选项卡",
        name: "选项卡",
        icon: "icon-tabs",
        img: '/img/assets/tabs.png',
        child: {
          index: [],
          paramName: ""
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        dataType: 0,
        data: [
          {
            label: "选项卡1",
            value: "1"
          },
          {
            label: "选项卡2",
            value: "2"
          }
        ],
        component: {
          width: 356,
          height: 46,
          name: "tabs",
          prop: "tabs"
        },
        option: {
          type: 'tabs',
          color: "#eee",
          empColor: "#4dffff",
          fontSize: 20,
          split: 8,
          empBackgroundImage: "img/banner/banner5.png",
          backgroundImage: "img/banner/banner4.png"
        },
      },
    },]
  }, {
    label: '神器',
    icon: 'icon-vue',
    children: [{
      label: '自定义Vue组件',
      option: {
        name: "自定义Vue组件",
        title: "自定义Vue组件",
        icon: 'icon-vue',
        img: '/img/assets/text4.png',
        dataType: 0,
        data: {
          name: "avue"
        },
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 800,
          height: 500,
          name: "vue",
          prop: "vue",
          remoteContent: ''
        },
        option: {
          remote: false,
          content: "<template>\n    <div class=\"test\">\n        <h1 @click=\"handleClick\">{{dataChart}}<h1>\n    </div>\n</template>\n<script>\nexport default{\n    data(){\n        return{\n            \n        }\n    },\n    created(){\n        console.log(this.refList);\n    },\n    methods:{\n        handleClick(){\n            this.$message.success(this.dataChart.name)\n        }\n    }\n}\n</script>\n<style>\n    .test{\n        text-align:center;\n        color:red;\n        font-size:40px;\n    }\n</style>",
          src: '/vue-remote-temp.js'
        }
      }
    }, {
      label: '组件融合',
      option: {
        name: "组件融合",
        title: "组件融合",
        icon: 'icon-group',
        img: '/img/assets/group.png',
        dataType: 0,
        data: [],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          scale: 0.5,
          width: 500,
          height: 500,
          name: "group",
          prop: "group",
        },
        option: {
          remote: false,
          content: "[{\n    \"title\": \"文本框\",\n    \"name\": \"文本框\",\n    \"icon\": \"icon-text\",\n    \"img\": \"/img/assets/text.png\",\n    \"dataType\": 0,\n    \"dataFormatter\": \"\",\n    \"dataHeader\": \"\",\n    \"dataQuery\": \"\",\n    \"stylesFormatter\": \"\",\n    \"child\": {\n        \"index\": [],\n        \"paramList\": []\n    },\n    \"data\": {\n        \"value\": \"文本框\"\n    },\n    \"component\": {\n        \"width\": 100,\n        \"height\": 40,\n        \"name\": \"text\",\n        \"prop\": \"text\",\n        \"perspective\": 0,\n        \"opacity\": 0,\n        \"rotateX\": 0,\n        \"rotateY\": 0,\n        \"rotateZ\": 0\n    },\n    \"option\": {\n        \"textAlign\": \"center\",\n        \"fontSize\": 26,\n        \"fontWeight\": \"normal\",\n        \"color\": \"#fff\"\n    },\n    \"left\": 0,\n    \"top\": 0,\n    \"index\": \"eba3a6c8-f48e-471d-b9b0-829e34565365\",\n    \"display\": false,\n    \"lock\": false,\n    \"group\": \"\",\n    \"zIndex\": 1\n}]",
          id: ''
        }
      }
    }, {
      label: 'html自定义',
      option: {
        name: "html自定义",
        title: "html自定义",
        icon: 'icon-html',
        img: '/img/assets/html.png',
        dataType: 0,
        data: [],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 500,
          height: 500,
          name: "html",
          prop: "html",
          remoteContent: ''
        },
        option: {
          remote: false,
          src: '/html-remote-temp.js',
          content: '<div style=\"color:red;font-size:80px\">自定义HTML标题</div>',
        }
      }
    }, {
      label: '定时器',
      option: {
        name: "定时器",
        title: "定时器",
        icon: 'icon-datetime',
        img: '/img/assets/time.png',
        echartFormatter: "(refs)=>{\n    console.log(refs)\n}",
        component: {
          width: 100,
          height: 100,
          name: 'time',
          prop: 'time',
        },
        option: {
          time: 0
        }
      }
    }, {
      label: '数据集',
      option: {
        name: "数据集",
        title: "数据集",
        icon: 'icon-public',
        img: '/img/assets/public.png',
        dataType: 0,
        data: {},
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        component: {
          width: 100,
          height: 100,
          name: 'data',
          prop: 'data',
        },
        option: {

        }
      }
    }, {
      label: '全屏组件',
      option: {
        name: "全屏组件",
        title: "全屏组件",
        icon: 'icon-fullscreen',
        img: '/img/assets/fullscreen.png',
        dataType: 0,
        data: [],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 100,
          height: 50,
          name: "fullscreen",
          prop: "fullscreen",
        },
        option: {
          color: '#fff',
          fontSize: '14'
        }
      }
    }, {
      label: '自定义源码组件',
      option: {
        name: "自定义源码组件",
        title: "自定义源码组件",
        icon: 'icon-vue',
        img: '/img/assets/test.png',
        dataType: 0,
        data: [],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 800,
          height: 500,
          name: "test",
          prop: "test",
        },
        option: {
          fontSize: 20,
        }
      }
    }]
  }, {
    label: '边框',
    icon: 'icon-biankuang',
    children: [{
      label: '边框1',
      option: {
        title: "边框1",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_01.gif',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 1,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }, {
      label: '边框2',
      option: {
        title: "边框2",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_02.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 2,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }, {
      label: '边框3',
      option: {
        title: "边框3",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_03.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 3,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }, {
      label: '边框4',
      option: {
        title: "边框4",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_04.png',
        top: 0,
        left: 0,
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 4,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }, {
      label: '边框5',
      option: {
        title: "边框5",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_05.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 5,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }, {
      label: '边框6',
      option: {
        title: "边框6",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_06.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 6,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }, {
      label: '边框7',
      option: {
        title: "边框7",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_07.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 7,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }, {
      label: '边框8',
      option: {
        title: "边框8",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_08.gif',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 8,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }, {
      label: '边框9',
      option: {
        title: "边框9",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_09.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 9,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }, {
      label: '边框10',
      option: {
        title: "边框10",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_10.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 10,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }, {
      label: '边框11',
      option: {
        title: "边框11",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_11.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 11,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }, {
      label: '边框12',
      option: {
        title: "边框12",
        name: "datav",
        icon: 'icon-biankuang',
        img: '/img/assets/borderBox/borderBox_12.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 300,
          height: 150,
          name: "borderBox",
          prop: "borderBox"
        },
        option: {
          type: 12,
          color1: '#83bff6',
          color2: '#00CED1',
          dur: undefined
        }
      }
    }]
  }, {
    label: '装饰',
    icon: 'icon-jianzhuzhuangshi',
    children: [{
      label: '装饰1',
      option: {
        title: "装饰1",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_01.gif',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 670,
          height: 370,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 1,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }, {
      label: '装饰2',
      option: {
        title: "装饰2",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_02.gif',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 670,
          height: 370,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 2,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }, {
      label: '装饰3',
      option: {
        title: "装饰3",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_03.gif',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 670,
          height: 370,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 3,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }, {
      label: '装饰4',
      option: {
        title: "装饰4",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_04.gif',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 670,
          height: 370,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 4,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }, {
      label: '装饰5',
      option: {
        title: "装饰5",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_05.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 670,
          height: 370,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 5,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }, {
      label: '装饰6',
      option: {
        title: "装饰6",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_06.gif',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 670,
          height: 370,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 6,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }, {
      label: '装饰7',
      option: {
        title: "装饰7",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_07.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 670,
          height: 370,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 7,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }, {
      label: '装饰8',
      option: {
        title: "装饰8",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_08.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 670,
          height: 370,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 8,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }, {
      label: '装饰9',
      option: {
        title: "装饰9",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_09.gif',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 440.5,
          height: 377.65,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 9,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }, {
      label: '装饰10',
      option: {
        title: "装饰10",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_10.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 670,
          height: 370,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 10,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }, {
      label: '装饰11',
      option: {
        title: "装饰11",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_11.png',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 670,
          height: 370,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 11,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }, {
      label: '装饰12',
      option: {
        title: "装饰12",
        name: "datav",
        icon: 'icon-jianzhuzhuangshi',
        img: '/img/assets/decorate/decorate_12.gif',
        top: 0,
        left: 0,
        data: {},
        component: {
          width: 430,
          height: 430,
          name: "decoration",
          prop: "decoration"
        },
        option: {
          type: 12,
          color1: '#00CED1',
          color2: '#FAD400',
          dur: undefined
        }
      }
    }]
  }, {
    label: '二次开发',
    icon: 'el-icon-info',
    children: [{
      label: '滚动选项卡',
      option: {
        name: "滚动选项卡",
        title: "滚动选项卡",
        icon: 'icon-vue',
        img: '/img/assets/text4.png',
        dataType: 0,
        data: [{
          text: '领导调研',
          list: [
            "https://img.alicdn.com/tfs/TB1v28TC8v0gK0jSZKbXXbK2FXa-1880-640.jpg",
            "https://img.alicdn.com/tfs/TB1uevcCrj1gK0jSZFuXXcrHpXa-1880-640.jpg"
          ]
        }, {
          text: '先进事件',
          list: [
            "https://img.alicdn.com/imgextra/i1/O1CN01NAnI6W1Vf1kZScscd_!!6000000002679-0-tps-2880-1070.jpg",
            "https://img.alicdn.com/imgextra/i2/O1CN011FMQT21RF8u1nHsem_!!6000000002081-0-tps-2880-1070.jpg"
          ]
        }],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 800,
          height: 400,
          name: "imgTabs",
          prop: "imgTabs",
        },
        option: {
          direction: 'horizontal',
          interval: 3000,
          time: 3000,
          autoplay: true
        }
      }
    }, {
      label: '滚动列表',
      option: {
        name: "滚动列表",
        title: "滚动列表",
        icon: 'icon-vue',
        img: '/img/assets/text4.png',
        dataType: 0,
        data: [
          {
            name: "smallwei",
            time: "11:26",
            color: "#7c324c",
            date: "2022-05-22",
            dept: "设计部",
            img: "https://oss.bladex.vip/caster/upload/20220522/6f2a92d95b64efeb42c131489abaff2f.webp"
          },
          {
            name: "smallwei",
            time: "11:26",
            color: "#6b6230",
            date: "2022-05-22",
            dept: "设计部",
            img: "https://oss.bladex.vip/caster/upload/20220522/6f2a92d95b64efeb42c131489abaff2f.webp"
          },
          {
            name: "smallwei",
            time: "11:26",
            date: "2022-05-22",
            color: "#274d86",
            dept: "设计部",
            img: "https://oss.bladex.vip/caster/upload/20220522/6f2a92d95b64efeb42c131489abaff2f.webp"
          }
        ],
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 800,
          height: 500,
          name: "imgList",
          prop: "imgList",
        },
        option: {
          step: 1,
          direction: 1,
          hoverStop: true,
        }
      }
    }, {
      label: '倒计时',
      option: {
        name: "倒计时",
        title: "倒计时",
        icon: "icon-vue",
        img: "/img/assets/text4.png",
        dataType: 0,
        data: {},
        dataFormatter: "",
        dataHeader: "",
        dataQuery: "",
        stylesFormatter: "",
        component: {
          width: 800,
          height: 45,
          name: "vue",
          prop: "vue"
        },
        option: {
          content: "<template>\n  <div class=\"datetime\">\n    {{datetime}}\n  </div>\n</template>\n<script>\nexport default {\n  data () {\n    return {\n      interval:null,\n      datetime: ''\n    }\n  },\n  created () {\n    this.countdown('2024-02-13T23:59:59', '%d天 %h小时 %m分钟 %s秒');\n  },\n  methods: {\n    setTime(deadline,format){\n        var now = new Date().getTime();\n        var distance = deadline - now;\n        if (distance < 0) {\n          clearInterval(this.interval);\n          return;\n        }\n        var days = Math.floor(distance / (1000 * 60 * 60 * 24));\n        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));\n        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));\n        var seconds = Math.floor((distance % (1000 * 60)) / 1000);\n        var output = format.replace('%d', days)\n          .replace('%h', hours)\n          .replace('%m', minutes)\n          .replace('%s', seconds);\n        this.datetime = output\n    },\n    countdown (date, format) {\n      deadline = new Date(date).getTime();\n      this.setTime(deadline,format);\n      this.interval = setInterval(() => {\n        this.setTime(deadline,format)\n      }, 1000);\n    }\n  }\n}\n</script>\n<style>\n.datetime {\n  font-size: 30px;\n  color: #fff;\n  text-align: center;\n}\n</style>",
        },
        left: 0,
        top: 0,
        display: false,
        lock: false,
        group: "",
        child: {
          index: [],
          paramList: []
        }
      }
    }]
  }]
}