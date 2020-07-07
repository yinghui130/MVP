import "@babel/polyfill"
import Vue from 'vue'
import Router from 'vue-router'
/* import HelloWorld from '@/components/HelloWorld'
import cell from '@/components/cell'
import studentInfo from '@/components/StudentInfo'
import logIn from '@/components/LogIn'
import uploadFile from '@/components/UploadFile'
import { resolve } from 'path'; */
Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   //component: HelloWorld
    //   component: (resolve) => require(['@/components/HelloWorld'], resolve)
    // },
    // {
    //   path: '/cell',
    //   name: 'cell',
    //   //component: cell
    //   component: (resolve) => require(['@/components/cell'], resolve)
    // },
    {
      path: "/doc",
      name: 'doc',
      //component: studentInfo
      component: (resolve) => require(['@/components/StudentDoc'], resolve)
    },
    {
      path: "/student",
      name: 'student',
      //component: studentInfo
      component: (resolve) => require(['@/components/StudentInfo'], resolve)
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   //component: logIn
    //   component: (resolve) => require(['@/components/LogIn'], resolve)
    // },
    {
      path: '/uploadFile',
      name: 'uploadFile',
      //component: uploadFile
      component: (resolve) => require(['@/components/UploadFile'], resolve)
    },
    {
      path: '/exam',
      name: 'exam',
      //component: uploadFile
      component: (resolve) => require(['@/components/ExamInfo'], resolve)
    },
    {
      path: '/newlogin/:type',
      name: 'newlogin',
      //component: uploadFile
      component: (resolve) => require(['@/components/NewLogIn'], resolve)
    },
    {
      path: '/examCheck',
      name: 'examCheck',
      //component: uploadFile
      component: (resolve) => require(['@/components/ExamCheck'], resolve)
    },
  ]
})
