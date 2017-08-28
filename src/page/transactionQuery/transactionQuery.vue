<template>
  <div class="transactionQuery"  v-title data-title="交易查询">
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

  <div class="content" v-if="status==1">
    <div style="background: #fff">
        <div class="title border-1px relative col666">交易总额&nbsp;<b class="colblue">{{totalPirce | formatLength}}</b>&nbsp;元，共 <b>{{totalNum}}</b> 笔</div>
        <ul class="list" v-infinite-scroll="loadMore" infinite-scroll-disabled="allLoaded" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
            <li class="border-1px" v-for="item in transactionList">
              <div class="sale-l">
                <span v-if="item.processType==1" class="income">收</span>
                <span v-else class="refund">退</span>
              </div>
              <div class="sale-c">
                <p>{{item.paySourceId==101?'百味云点餐':'百味云扫码付款'}}</p>
                <p class="font12 col888">{{item.processTime}}</p>
              </div>
              <div class="sale-r tar">
                <p class="font12 col888">{{item.payType==1?'微信':'支付宝'}}</p>
                <p class="strong">{{item.processType==1?'+':'-'}}{{item.payPrice/100 | formatLength}}</p>
              </div>
            </li>
        </ul>
        <p v-if="alldata" class="tac col999 mt10 font12 padb10">已加载全部数据</p>
        <p v-show="loading" class="page-infinite-loading loading">
          <mt-spinner type="fading-circle"></mt-spinner>
          加载中...
        </p>
    </div>
  </div>
  <div v-if="status==0" class="blank">暂无数据</div>
    </template>
    <template>
        <div v-if="storeStatus == 0" class="bankData">此账号没有绑定门店，暂无数据</div>
    </template>
  </div>
</template>
<script>
import vstores from '../../components/store/storeslist.vue';
import vtime from '../../components/date/time.vue';
import '../../js/common.js';
import { Toast } from 'mint-ui';
import { mapState } from 'vuex';
export default {
    name: 'transactionQuery',
    data () {
        return {
          storeStatus:null,
          status:null,
          showStore: false,
          showTime:false,
          transactionList:[],
          totalNum:0,
          totalPirce:0,
          isMonth:false,//日期是否是月
          alldata:false,
          allLoaded: false,
          bottomStatus: '',
          nowPage:1,//当前页数
          totalPage:1,//总页数
          loading: false //下拉加载图标状态
        }
    },
    created: function() {
      this.checkStore();//判断是否存在门店
    },
    components: {
        'vStores': vstores,
        'vTime':vtime
    },
    computed:{
      ...mapState([
          'openId',
          'storeId',
          'storeName',
          'date',
          'startDate',
          'endDate',
          'onlyOneShop'
      ])
    }, 
    methods:{
      loadMore:function(){
        this.alldata= false;
        this.allLoaded=true;
        this.loading=true
        setTimeout(() => {
          this.getTransactionList(this.nowPage + 1)
        }, 1000);
      },
      checkStore:function(){//判断是否存在门店,1存在，0不存在
         if(this.storeId != '' && this.storeId != null && this.storeId != undefined){
            this.getDate()
            this.storeStatus = 1;
            localStorage.setItem("curindex", "1");
         }else{
            this.storeStatus = 0
         }
      },
      getDate:function(){
        let time = new Date();
        let year = time.getFullYear();
        let month = time.getMonth()+1;
        let day = time.getDate();
        if(month<10) month = "0" + month
        if(day<10) day = "0" + day
        this.$store.state.startDate=year + month + day
        this.$store.state.endDate=year + month + day
        this.recieveMessage(year +"-"+ month +"-"+ day) 
      },
      getStore:function(){
          this.showStore = !this.showStore;
          this.showTime = false;
      },
      changeStore:function(){
          this.showStore = false;
          this.reset();
      },
      getTransactionList:function(page){
        this.$ajax({
            url:this.api+'/money/queryStatistics',
            method:'get',
            params:{
               "openId":this.openId,
               "storeId":this.storeId,
               "startDate":this.startDate,
               "endDate":this.endDate,
               "page":page
            }
          }).then(response=>{
              if(response.data.code == 200){
                let _model = response.data.model;
                this.nowPage = _model.nowPage; //当前页数
                this.totalNum = _model.totalNum; //成交总单数
                this.totalPirce = _model.totalPirce / 100; //总价单位为分，所以除以100
                this.totalPage = parseInt(_model.totalNum / 20) + 1; //总页数，每页20条数据
                if(_model.list){
                  for(let i = 0; i < _model.list.length; i++){
                      this.transactionList.push(_model.list[i])
                  }
                  this.status = 1;//数据列表显示
                }
                else{
                  this.status = 0;//数据列表隐藏，空数据div显示
                }
                this.loading=false;//加载图标隐藏
                if(this.nowPage < this.totalPage){
                  this.allLoaded = false //allLoaded若为真，则无限滚动不会被触发
                }else{
                   this.allLoaded=true;
                   this.alldata= true;
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
             this.isMonth =true;
           }else{
             this.isMonth =false;
           }
           this.reset();
        },
        changeTime:function(){
            this.showTime =!this.showTime;
            this.showStore = false;
            this.$refs.selectType.selectBtn();
        },
        closeTime:function(){
            this.showTime = false;
            this.showStore = false;
        },
        reset:function(){
           this.nowPage=1;//初始化当前页数
           this.totalPage=1;//初始化总页数
           this.alldata = false;
           this.transactionList=[];
           this.getTransactionList(1);
        }
    }
}
</script>
<style scoped>
@import './transactionQuery.css'
</style>
