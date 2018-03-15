// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'

import MyHeader from '@/components/MyHeader'
Vue.component('MyHeader', MyHeader)
import Footer from '@/components/Footer'
Vue.component('Footer', Footer)

//导入 util.js 
import util from './assets/js/util'
//通过全局方法 Vue.use() 来使用插件
Vue.use(util);
import log from './assets/js/log'
Vue.use(log);

import "./assets/css/base.css"
import "./assets/css/bs.css"

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App}
})
