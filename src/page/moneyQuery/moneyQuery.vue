<template>
  <div class="moneyQuery" v-title data-title="资金划款查询">
    <template v-if = "storeStatus == 1">
   	<div class="selectTool">
      <div v-if="onlyOneShop == true" class="tool-name  arrow-info col888 arrow-info-grey">
        <span class="toolText textover" v-text="storeName"></span>
      </div>
      <div v-else class="tool-name arrow-info colblue" :class="[showStore?'arrow-info-blue-b':'arrow-info-blue-t']" @click="getStore">
        <span class="toolText textover" v-text="storeName"></span>
      </div>
      <template v-if="startDate==endDate">
          <div class="tool-time arrow-info colblue" :class="[showTime?'arrow-info-blue-b':'arrow-info-blue-t']" @click="changeTime">
            <span class="toolText textover" >{{startDate | formatDate }}</span>
          </div>
      </template>
      <template v-else>
          <div class="tool-time arrow-info colblue" :class="[showTime?'arrow-info-blue-b':'arrow-info-blue-t']" @click="changeTime">
            <template v-if="isMonth">
                  <span class="toolText textover" >{{startDate | formatMonth }}</span>
            </template>
            <template v-else>
                <span class="toolText textover" >
                  <p class="startDate">{{startDate | formatDate }}-</p>
                  <p class="endDate">{{endDate | formatDate }}</p>
                </span>
            </template>
          </div>
      </template> 
    </div>
	  <v-stores :showStore="showStore" v-on:changeStore="changeStore"></v-stores>
    <div class="time" v-show="showTime" >
		    <v-time :date="date" v-on:message="recieveMessage" ref="selectType" v-on:closeTime="closeTime"></v-time>
	  </div>
    <div class="content">
      <div class="bank">
        <mt-cell title="入账银行" class="border-title"></mt-cell>
                <div class="bankInfo redbg" v-if="bankName=='中信银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/中信银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo redbg" v-if="bankName=='中国银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/中国银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo redbg" v-if="bankName=='招商银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/招商银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo redbg" v-if="bankName=='华夏银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/华夏银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo redbg" v-if="bankName=='广东发展银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/广东发展银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo redbg" v-if="bankName=='北京银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/北京银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo redbg" v-if="bankName=='中国工商银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/中国工商银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo bluebg" v-if="bankName=='中国建设银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/中国建设银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo pupbg" v-if="bankName=='兴业银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/兴业银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo pupbg" v-if="bankName=='光大银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/光大银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo greenbg" v-if="bankName=='中国农业银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/中国农业银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo bluebg" v-if="bankName=='中国交通银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/中国交通银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo greenbg" v-if="bankName=='中国邮政储蓄银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/中国邮政储蓄银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo redbg" v-if="bankName=='中国民生银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/中国民生银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo bluebg" v-if="bankName=='浦东发展银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/浦东发展银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo orgbg" v-if="bankName=='上海银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/上海银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo redbg" v-if="bankName=='南京市商业银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/南京市商业银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo bluebg" v-if="bankName=='渤海银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/渤海银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo orgbg" v-if="bankName=='平安银行'">
            <div class="bankcard">
                 <img class="vm cardImg" src="../../assets/banklogo/平安银行.png" width="24" height="24">
                 <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo redbg" v-if="bankName=='南京银行'">
            <div class="bankcard">
                <img class="vm cardImg" src="../../assets/banklogo/南京银行.png" width="24" height="24">
                <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankInfo bluebg" v-if="bankName=='上海农商银行'">
            <div class="bankcard">
                <img class="vm cardImg" src="../../assets/banklogo/上海农商银行.png" width="24" height="24">
                <span class="vm">{{bankName}}（{{bankNameInfo}}）</span>
            </div>
            <p class="cardNum">
              <span>****</span><span>****</span><span>****</span>
              <span>{{bankNumber}}</span>
            </p>
        </div>
        <div class="bankwarn"><span class="mr5">•</span>实际入账时间以入账银行为准</div>
      </div> 
      <div class="datalist mt10 bgfff">
        <!-- <div class="title border-1px relative">6月份</div> -->
        <ul class="list" v-if="MoneyListStatus==1">
          <li class="border-1px" v-for="item in MoneyList">
            <div class="sale-l">
              <p class="font12 col999">日期</p>
              <p class="col666">{{item.settleDate}}</p>
            </div>
            <div class="sale-c">
              <p class="font12 col999">状态</p>
              <p class="col666">划款完成</p>
            </div>
            <div class="sale-r tal">
              <p class="font12 col999">金额（元）</p>
              <p class="col333 strong">+{{item.amount /100 | formatLength}} </p>
            </div>
          </li>
        </ul>
        <div v-if="MoneyListStatus==0" class="nodata">暂无数据</div>
      </div>
   	</div>
    </template>
    <template>
        <div v-if="storeStatus == 0" class="bankData">此账号旗下没有门店，暂无数据</div>
    </template>
  </div>
</template>
<script>
import vstores from '../../components/store/storeslist.vue';
import vtime from '../../components/date/time.vue';
import '../../js/common.js';
import { Toast } from 'mint-ui';
import { mapState } from 'vuex'
export default {
  name: 'moneyQuery',
  data () {
    return {
      storeStatus:null,
      showStore: false,
      showTime:false,
      isMonth:false,//日期是否是月
      bankName:"",
      bankNameInfo:"",
      bankNumber:"",
      MoneyList:[],
      MoneyListStatus:null//只要不是1和2其它值都行
    }
  },
  created: function() {
    this.checkStore()//判断是否存在门店
  },
  computed:{
    ...mapState([
        'openId',
        'storeId',
        'storeName',
        'onlyOneShop',
        'date',
        'startDate',
        'endDate'
    ])
  }, 
  components: {
    'vStores' : vstores,
    'vTime' : vtime
  },
  methods:{
    getDate:function(){
        let time = new Date();
        let year = time.getFullYear();
        let month = time.getMonth()+1;
        let day = time.getDate();
        if(month<10) month = "0" + month;
        if(day<10) day = "0" + day;
        this.$store.state.startDate=year + month + day
        this.$store.state.endDate=year + month + day
        this.recieveMessage(year +"-"+ month +"-"+ day)  
    },
  	getStore:function(){
  		this.showStore=!this.showStore;
  		this.showTime=false
  	},
  	changeStore:function(name){
  		this.showStore=false;
      this.reset()
  	},
    checkStore:function(){//判断是否存在门店,1存在，0不存在
       if(this.storeId != '' && this.storeId != null && this.storeId != undefined){
          this.getDate()
          this.getbank()
          this.storeStatus = 1;
          localStorage.setItem("curindex", "1");
       }else{
          this.storeStatus = 0
       }
    },
    // getInfo:function(){ //获取首次银行卡信息以及头部餐厅名称
    //   this.$ajax({
    //       url:this.api + '/money/queryMixInfo',
    //       method:'get',
    //       params:{
    //         "openId":this.openId,
    //       }
    //   }).then(response=>{
    //       if(response.data.code == 200){
    //         let _model = response.data.model;
    //         let _bankCard = _model.bankCard;
    //         this.bankNumber = _bankCard.bankCardNo.substring(12);
    //         this.bankName = _bankCard.bankName;
    //         this.bankNameInfo = _bankCard.subBankName;
    //       }else{
    //         Toast({
    //           message: response.data.message,
    //           position: 'middle'
    //         })
    //       }
    //   })
    // },
    getbank:function(){ //切换门店时获取该门店的银行卡信息
      this.$ajax({
          url:this.api + '/money/queryBankInfo',
          method:'get',
          params:{
            "openId":this.openId,
            "storeId":this.storeId
          }
      }).then(response=>{
          if(response.data.code == 200){
            let _model = response.data.model;
            this.bankNumber = _model.bankCardNo.substring(12);
            this.bankName = _model.bankName;
            this.bankNameInfo = _model.subBankName;
          }else{
            Toast({
              message: response.data.message,
              position: 'middle'
            })
          }
      })
    },
  	getMoneyList:function(){//获取划款数据
  		this.$ajax({
          url:this.api+'/money/queryMoenyFlow',
          method:'get',
          params:{
             "openId":this.openId,
             "storeId":this.storeId,
             "startDate":this.startDate,
             "endDate":this.endDate
          }
      }).then(response=>{
          if(response.data.code == 200){
            let _model = response.data.model;
            this.MoneyList = _model.list;
            if(_model.list.length > 0){
              this.MoneyListStatus = 1
            }else{
               this.MoneyListStatus = 0
            }
          }else{
            Toast({
              message: response.data.message,
              position: 'middle'
            })
          }
      })
  	},
  	recieveMessage: function (text) {//改变头部日期
       this.$store.state.date=text;
       let curindex = localStorage.getItem("curindex");
       if(curindex == 3){
         this.isMonth =true
       }else{
         this.isMonth =false
       }
       this.getMoneyList()
    },
    changeTime:function(){
    	this.showTime = !this.showTime;
    	this.showStore = false;
    	this.$refs.selectType.selectBtn();
    },
    closeTime:function(){
    	this.showTime = false;
    	this.showStore = false;
    },
    reset:function(){
       this.bankName = "";
       this.bankNameInfo = "";
       this.bankNumber = "";
       this.MoneyListStatus = null;
       this.MoneyList = [];
       this.getbank();
       this.getMoneyList();
    }
  }
}
</script>
<style scoped>
@import './moneyQuery.css'
</style>
