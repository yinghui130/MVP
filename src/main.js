// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "@babel/polyfill"
import Vue from 'vue'
import App from './index.vue'
import router from './router'
import { config } from '@/config/config.js'
Vue.prototype.$myconfig = config
/* eslint-disable no-new */
console.log('---index.js---')
//var t = getConfig()
console.log(Vue.prototype.$myconfig)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
