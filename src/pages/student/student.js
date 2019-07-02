import "@babel/polyfill"
import Vue from 'vue'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import axios from 'axios'
import student from './student.vue'
import router from '../../router'
import { config } from '@/config/config.js'
import 'element-ui/lib/theme-chalk/index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

Vue.use(ElementUI)
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        logInFlag: false,
        logInUrl: ''
    },
    getters: {
        isLogIn(state) {
            if (!state.logInFlag) {
                var flag = sessionStorage.getItem('logInFlag')
                if (flag != null)
                    state.logInFlag = flag == 'true'
            }
            return state.logInFlag
        },
        getLogInUrl(state) {
            if (state.logInUrl == '') {
                var logInUrl = sessionStorage.getItem('logInUrl')
                if (logInUrl != null)
                    state.logInUrl = logInUrl
            }
            return state.logInUrl
        }
    },
    mutations: {
        setLogInFlag(state, flag) {
            state.logInFlag = flag
            sessionStorage.setItem('logInFlag', flag)
        },
        setLogInUrl(state, url) {
            state.logInUrl = url
            sessionStorage.setItem('logInUrl', url)
        }
    },
    actions: {
        setLogInFlag(context, flag) {
            context.commit('setLogInFlag', flag)
        },
        setLogInUrl(context,url){
            context.commit('setLogInUrl',url)
        }
    }
});
Vue.prototype.$myconfig = config
Vue.prototype.$axios = axios
new Vue({
    el: '#app',
    router,
    store,
    components: { 'student': student },
    template: '<student/>'
})


