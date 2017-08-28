<template>
  <div class="myAccount" v-title data-title="我的账号">
    <!-- <div class="mt10 bgfff">
      <mt-cell title="品牌名称" class="border-title">
        <span>{{brandList.length>0?brandList.length+'个品牌':'暂无品牌'}}</span>
      </mt-cell>
      <mt-cell title="品牌名称" v-for="item in brandList" :title='item.fsshopname' class="brand">
        <img slot="icon" v-if="item.fslogo" :src="item.fslogo" width="40" height="40">
        <img slot="icon" v-else src="../../assets/banklogo.png" width="40" height="40">
      </mt-cell>
    </div> -->
    <div class="mt10 bgfff">
      <mt-cell title="门店名称" class="border-title">
        <span>{{shopList.length>0?shopList.length+'个门店':'暂无门店'}}</span>
      </mt-cell>
      <mt-cell class="ellipsis" v-for='item in shopList' :title='item.fsshopname'></mt-cell>
    </div>
    <div class="unbundling">
      <div class="pdl15 pdr15 mt15" @click="unbundling">
          <mt-button size="large" :disabled="disabled">我要解绑</mt-button>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Toast } from 'mint-ui';
import { mapState } from 'vuex'
export default {
  name: 'myAccount',
  data () {
    return {
      shopList:[],
      brandList:[],
      userId:"",
      disabled:false
    }
  },
  computed:{
    ...mapState([
        'enterPage',
        'openId'
    ])
  }, 
  created:function(){
     this.getData();
  },
  methods:{
    getData:function(){ //获取数据
      this.$ajax({
          url:this.api+'/bd/my',
          method:'get',
          params:{
             "openId":this.openId
          }
      }).then(response=>{
          if(response.data.code == 200){
            let _model=response.data.model;
            this.shopList = _model.shopList;//门店列表
            // this.brandList = _model.brandList;//品牌列表
            this.userId = _model.userId //用户id，解绑时候会用到
          }else{
            Toast({
              message: response.data.message,
              position: 'middle'
            })
          }
      })
    },
    unbundling:function(){ //解除绑定
        MessageBox.confirm("确定解除账号绑定？","解绑账号").then(action => {
          this.$ajax({
            url:this.api+'/bd/unbinding',
            method:'get',
            params:{
               "openId":this.openId,
               "userId":this.userId
            }
          }).then(response=>{
              if(response.data.model==true){
                this.disabled = true;//解绑按钮禁用
                Toast({message: "解除绑定成功",position: 'middle'})
                setTimeout(()=>{
                  this.$store.state.enterPage = 1 //解绑后显示注册页面
                },3000)
              }else{
                Toast({message: response.data.message,position: 'middle'})
              }
          })
        })
    }
  }
}
</script>
<style scoped>
@import './myAccount.css'
</style>
