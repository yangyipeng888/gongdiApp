// 按需全局引入 vant组件
import Vue from 'vue'
import vant from 'vant';
import 'vant/lib/index.css';
import {Lazyload} from 'vant';
// options 为可选参数，无则不传
Vue.use(Lazyload);
Vue.use(vant);
