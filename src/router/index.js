import Vue from 'vue'
import Router from 'vue-router'
import { MessageBox } from 'mint-ui';
import store from '../vuexstore/vuexState'
Vue.use(Router)
const router = new Router({ 
  routes : [
    {
      path: '/error',
      name: 'error',
      component: (resolve) => {
         require(['../page/error/error'], resolve)
      }
    },
    {
      path: '/',
      name: 'index',
      component: (resolve) => {
         require(['../page/index'], resolve)
      }
    },
    {
      path: '/message',
      name: 'message',
      component: (resolve) => {
         require(['../page/message/message'], resolve)
      }
    }
    // {
    //   path: '/bindingSuccess',
    //   name: 'bindingSuccess',
    //   meta: { 
    //      requireAuth: true
    //   },
    //   component: (resolve) => {
    //      require(['../page/bindingSuccess/bindingSuccess'], resolve)
    //   }
    // },
    // {
    //   path: '/myAccount',
    //   name: 'myAccount',
    //   meta: { 
    //      requireAuth: true
    //   },
    //   component: (resolve) => {
    //      require(['../page/myAccount/myAccount'], resolve)
    //   }
    // },
    // {
    //   path: '/transactionQuery',
    //   name: 'transactionQuery',
    //   meta: { 
    //      requireAuth: true
    //   },
    //   component: (resolve) => {
    //      require(['../page/transactionQuery/transactionQuery'], resolve)
    //   }
    // },
    // {
    //   path: '/moneyQuery',
    //   name: 'moneyQuery',
    //   meta: { 
    //      requireAuth: true
    //   },
    //   component: (resolve) => {
    //      require(['../page/moneyQuery/moneyQuery'], resolve)
    //   }
    // }
  ]
})



 //  判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
      if (store.state.token) {// 判断是否登录
        // alert(store.state.openId)
         next()
       }else {// 没登录则跳转到登录界面
        // alert("没有权限，跳转到登录页")
        // MessageBox({
        //   title: '未绑定账号',
        //   message: '暂时无法查看信息，去绑定?',
        //   showCancelButton: true
        // });
        MessageBox.alert('暂时无法查看信息，需先绑定账号?').then(action => {
          next({
            path: '/binding',
            query: {redirect: to.fullPath}
          })
          //window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxf5
        });
          
      }
    } else {
      next()
    }
})

export default router