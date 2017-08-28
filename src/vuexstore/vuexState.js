import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)
const state = {
  startDate:'',
  endDate:'',
  date:"",
  openId:"",
  storeId:"",//门店id
  onlyOneShop:true,
  storeName:'',
  enterPage:0 //1: 绑定账号，2：我的账户 3：绑定成功 4：资金查询 5：交易查询
}

const mutations={//修改存储state里面的值
    mutationsOpenId:function(state,value){
      state.openId+=value
    },
    stateStoreName:function(state,value){//结束时间
      state.storeName = value
    },
    mutationsStoreId:function(state,value){//结束时间
      state.storeId = value
    }
}

const actions={//actions总是执行mutation里面的函数
  saveOpenId:function(context,value){
    context.commit('mutationsOpenId',value)
  },
  saveStoreId:function(context,value){
    context.commit('mutationsStoreId',value)
  },
  saveStoreName:function(context,value){
    context.commit('stateStoreName',value)
  }
}


export default new Vuex.Store({
  state,
  actions,
  mutations
})


