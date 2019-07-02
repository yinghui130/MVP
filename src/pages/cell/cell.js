import "@babel/polyfill"
import Vue from 'vue'
import ElementUI from 'element-ui'
import innerCell from './cell.vue'
import router from '../../router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { config } from '@/config/config.js'
import 'element-ui/lib/theme-chalk/index.css'
/*
fetch('/static/serverConfig.json').then(res => {
  res.json().then((r) => {
    Vue.prototype.$myconfig = r
    console.log('---fetch---')
    console.log(r)

    new Vue({
      el: '#app',
      router,
      components: { 'innerCell': innerCell },
      template: '<innerCell/>'
    })
  })
})
*/
Vue.use(ElementUI)
Vue.prototype.$myconfig = config
console.log('---cell.js---')
console.log(config)

new Vue({
  el: '#app',
  router,
  components: { 'innerCell': innerCell },
  template: '<innerCell/>'
})


