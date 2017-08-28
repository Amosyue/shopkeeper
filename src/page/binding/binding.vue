<template>
  <div class="binding" v-title data-title="绑定账号">
    <mt-field label="账号" placeholder="请输入手机号" :attr="{ maxlength: 11 }" type="tel" v-model="phone"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <div class="pdl15 pdr15 bindingbtn">
      <mt-spinner type="fading-circle" :size="22"  color="#fff" v-show="loading"></mt-spinner>
      <mt-button  size="large" :disabled="disabled"  @click="binding" :class="{active: phone.length>0}">绑定</mt-button>
    </div>
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { mapState } from 'vuex'
export default {
  name: 'binding',
  data () {
    return {
      phone:"",
      password:"",
      type:"",
      toast:false,//是否出现了提示框
      loading:false//加载状态
    }
  },
  computed:{
    ...mapState([
        'enterPage',
        'onlyOneShop',
        'openId',
        'storeId',
        'storeName'
    ]),
    disabled:function(){
      return this.phone.length <= 0 || this.toast == true
    }
  },
  created:function(){
     this.type = this.$utils.getUrlKey("type");
  },
  methods:{
    binding:function(){
      let phonereg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
      if(!phonereg.test(this.phone)) { 
          let instance = Toast('请输入有效的手机号码！');
          this.toast=true;
          setTimeout(() => {
            instance.close();
            this.toast=false
          }, 3000);
          return false;
      } 
      if(this.password.length < 1){
        let instance = Toast('密码不能为空！');
        this.toast=true;
        setTimeout(() => {
            instance.close();
            this.toast=false;
        }, 3000);
        return false;
      }
      this.loading = true;//显示按钮上的加载状态
      this.$ajax({
          url:this.api+'/bd/binding',
          method:'get',
          params:{
             "openId":this.openId,
             "mobile":this.phone,
             "password":this.password
          }
        }).then(response=>{
          if(response.data.code == 200){
            let type = this.type;
            let _state = this.$store.state;
            let _model = response.data.model;
            let shopList = _model.shopList[0];
            _state.onlyOneShop = _model.onlyOneShop;
            if(shopList != null && shopList != undefined && shopList != ""){
              _state.storeId = _model.shopList[0].fsshopguid;//门店id
              _state.storeName = _model.shopList[0].fsshopname;//第一个门店名称
            }
            if(type == 4){//资金查询
                  _state.enterPage = 4;
              }else if(type == 5){ //交易查询
                  _state.enterPage = 5;
              }else if(type == 1){ //从绑定入口进入，显示绑定成功
                  _state.enterPage = 3;
              }else{
                  _state.enterPage = 2;//我的账户
              }
            }else{
              let instance = Toast(response.data.message);
              this.toast=true;
              setTimeout(() => {
                  instance.close();
                  this.toast=false;
              }, 3000);
            }
            this.loading = false;//隐藏显示按钮上的加载状态
        })
    }
  }
}
</script>
<style scoped>
@import './binding.css'
</style>
