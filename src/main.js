// 兼容 IE
// https://github.com/zloirock/core-js/blob/master/docs/2019-03-19-core-js-3-babel-and-a-look-into-the-future.md#babelpolyfill
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Spi } from './api/api'

Vue.prototype.$Spi = Spi
import _ from 'lodash'

Vue.prototype._ = _

import Const from './utils/const'

Vue.prototype.myConst = Const

// 设置 js中可以访问 $cdn
import { $cdn } from '@/config'

Vue.prototype.$cdn = $cdn

// 全局引入按需引入UI库 vant
import '@/plugins/vant'
// 引入全局样式
import '@/assets/css/index.scss'
// 移动端适配
import 'lib-flexible/flexible.js'

// filters
import './filters'

Vue.config.productionTip = false

Vue.prototype.$isAndroid = window.navigator.appVersion.match(/android/gi)
Vue.prototype.$isIphone = window.navigator.appVersion.match(/iphone/gi)

//地图
import VueAMap from 'vue-amap'

Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: '300b50711517e0c54b02fae841ff233f',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
})
// import BaiduMap from 'vue-baidu-map'
// Vue.use(BaiduMap, {
//   // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
//   ak: 'dP17j7dXXGwGBnvNvi9iiBNakinYmRtr'
// })
import pdf from 'vue-pdf'

Vue.component('pdf', pdf)//全局自定义组件
import echarts from 'echarts'

Vue.prototype.$echarts = echarts

Vue.prototype.$getRealPX = function(px) {
  if (!px) {
    return px
  }
  const rem = px / 3840
  const htmlWidth = document.documentElement.clientWidth || document.body.clientWidth
  return htmlWidth * 100 * rem
}


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
