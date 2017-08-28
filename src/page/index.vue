<template>
  <div>
      <v-binding v-if="enterPage == 1"></v-binding>
      <v-myAccount v-if="enterPage == 2"></v-myAccount>
      <v-bindingSuccess v-if="enterPage == 3"></v-bindingSuccess>
      <v-moneyQuery v-if="enterPage == 4"></v-moneyQuery>
      <v-transactionQuery v-if="enterPage == 5"></v-transactionQuery>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import binding from './binding/binding.vue';
import myAccount from './myAccount/myAccount.vue';
import bindingSuccess from './bindingSuccess/bindingSuccess.vue';
import moneyQuery from './moneyQuery/moneyQuery.vue';
import transactionQuery from './transactionQuery/transactionQuery.vue';
export default {
  name: 'pageone',
  data () {
    return {
        code:"",
        type:null
    }
  },
  computed:{
    ...mapState([
      'enterPage',
      'openId',
      'onlyOneShop',
      'storeId',
      'storeName'
    ])
  },  
  created:function(){
     this.code = this.$utils.getUrlKey("code");
     this.type = this.$utils.getUrlKey("type");
     this.getStatus();
  },
  methods:{
    getStatus:function(){
      this.$ajax({
        url:this.api+'/bd/checkBindingStatus',
        method:'get',
        params:{
           "code":this.code
        }
      }).then(response=>{
        //type值 1: 绑定账号 2：我的账户 3：绑定成功 4：资金查询 5：交易查询 6 消息入口
      if(response.data.code == 200){
        let type = this.type;
        let _model = response.data.model;
        let _state = this.$store.state;
        _state.openId = _model.openId;
        _state.onlyOneShop = _model.onlyOneShop;
        if(response.data.model.bingdingStatus == true){
          let _firstShop = _model.firstShop;
          if(_firstShop != null && _firstShop != undefined && _firstShop != ''){
              _state.storeId = _firstShop.fsshopguid;
              _state.storeName = _firstShop.fsshopname;
          }
          if(type == 4 ){//资金查询
              _state.enterPage = 4;
          }else if(type == 5){ //交易查询
              _state.enterPage = 5;
          }else{
              _state.enterPage = 2;//我的账户
          }
        }else{
          _state.enterPage = 1;//没有绑定，跳转到绑定账号页面
        }
      }else{
        alert(response.data.message)
      }
      })
    }
  },
  components: {
    'vBinding' : binding,
    'vMyAccount' : myAccount,
    'vBindingSuccess' : bindingSuccess,
    'vMoneyQuery' : moneyQuery,
    'vTransactionQuery' : transactionQuery
  }
}
</script>
