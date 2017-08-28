<template>
  <div class="bindingSuccess" v-title data-title="绑定成功">
      <div class="bgfff tac success">
        <img id="successpng" src="../../assets/success.png"/> 
        <p class="font20 colblue warninfo">绑定成功</p>
      </div>
     <!--  <div class="mt10 bgfff">
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
  </div>
</template>
<script>
import { Toast } from 'mint-ui';
import { MessageBox } from 'mint-ui';
import { mapState } from 'vuex'
export default {
  name: 'bindingSuccess',
  data () {
    return {
      shopList:[],
      brandList:[]
    }
  },
  computed:{
    ...mapState([
      'openId'
    ])
  }, 
  created:function(){
    this.getData()
  },
  methods:{
    getData:function(){
      this.$ajax({
          url:this.api+'/bd/my',
          method:'get',
          params:{
             "openId":this.openId
          }
      }).then(response=>{
          if(response.data.code== 200){
            let _model=response.data.model;
            this.shopList = _model.shopList;//门店列表
            // this.brandList = _model.brandList;//品牌列表
          }else{
            Toast({
              message: response.data.message,
              position: 'middle'
            })
          }
      })
    }
  }
}
</script>
<style scoped>
@import '../myAccount/myAccount.css'
</style>
