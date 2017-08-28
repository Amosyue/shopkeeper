import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './vuexstore/vuexState'
import './vuexstore/https'
import './directive/directive.js'
import utils from './js/utils'     //获取url参数
import { Field } from 'mint-ui'
import { Button } from 'mint-ui'
import { Cell } from 'mint-ui'
import { Spinner } from 'mint-ui'
import { Loadmore } from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'
Vue.use(InfiniteScroll);
Vue.component(Loadmore.name, Loadmore)
Vue.component(Spinner.name, Spinner)
Vue.component(Cell.name, Cell)
Vue.component(Field.name, Field)
Vue.component(Button.name, Button)
Vue.prototype.$utils=utils        //注册全局方法
Vue.prototype.$ajax = axios
Vue.prototype.api = '/gio'
Vue.config.productionTip = false
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
