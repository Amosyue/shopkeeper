<template>
    <div class="storeName border-t-1px relative" v-show="showStore">
      <ul>
        <li v-for='(item,index) in shopList' @click="getStoreName(item.fsshopguid,item.fsshopname)">
          <a class="name textover">{{item.fsshopname}}</a>
        </li>
      </ul>
    </div>
</template>
<script>
import { mapState , mapActions} from 'vuex'
export default {
  props: ['showStore'],
  data () {
    return {
      shopList:""
    }
  },
  created:function(){
    let openId = this.openId;
    let urlOpenId = this.$utils.getUrlKey("openId");
    if(openId != "" && openId != null && openId != undefined){
      this.getData(openId)
    }else{
      this.getData(urlOpenId)
    }
  },
  computed:{
    ...mapState([
        'openId'
    ])
  },
  methods:{
    ...mapActions([
       'saveStoreId',
       'saveStoreName'
    ]),
    getStoreName:function(id,name){
      this.saveStoreId(id)
      this.saveStoreName(name)
      this.$emit("changeStore",name)
    },
    getData:function(openId){//获取数据
      this.$ajax({
          url:this.api+'/bd/my',
          method:'get',
          params:{
            "openId":openId
          }
      }).then(response=>{
          if(response.data.code=='200'){
            let _model = response.data.model;
            this.shopList = _model.shopList;
          }
      })
    }
  }
}
</script>
<style scoped>
.storeName{
    position: fixed;
    top:44px;
    z-index: 11;
    width: 100%;
    background: #fff;
}
.storeName:after{
    content: "";
    position: fixed;
    width:100%;
    height:100%;
    background: rgba(0,0,0,.5)
}
.storeName ul{
    padding-left: 13px;
}
.storeName ul li{
    height:44px;
    line-height: 44px;
    color:#666;
    font-size: 14px;
    position: relative;
}
.storeName ul li a{
    display: block;
}
.storeName ul li a:active,.storeName ul li a:hover{
    color:red;
    background: blue
}
.storeName ul li:after{
  content: " ";
  width: 200%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  -webkit-transform: scale(0.5);
          transform: scale(0.5);
  -webkit-transform-origin: 0 0;
          transform-origin: 0 0;
  box-sizing: border-box;
}
.storeName .name{
    display: block;
     width:80%;
}
</style>
