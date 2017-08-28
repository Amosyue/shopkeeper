<template lang="html">
    <div class="relative tar time-header" >
        <ul class="dataType border-1px relative">
           <li class="near" @click="near">最近30天</li>
        	<li @click="dateTime" :class="{'curent':index==1}">日</li>
        	<li @click="weekTime" :class="{'curent':index==2}">周</li>
        	<li @click="monthTime" :class="{'curent':index==3}">月</li>

        </ul>
  <!--  <div style="position:absolute;left:0"><input type="text"  v-model="date"></div> {{startDate}}{{endDate}} -->
  <keep-alive>
      <v-calendar
          :show="show"
          v-on:closeTime="closeTime"
          @close="show = 0">
      </v-calendar>
    </keep-alive>  

    <keep-alive>
    	<v-weekcalendar
          :show="showweek"
          v-on:closeTime="closeTime"
          @close="showweek = 0">
      </v-weekcalendar>
    </keep-alive>  

    <keep-alive>  
      <v-monthcalendar
          :show="showmonth"
          v-on:closeTime="closeTime"
          @close="showmonth = 0">
      </v-monthcalendar>
    </keep-alive>  
</div>
</template>
<script>
import Calendar from './day'
import weekcalendar from './week'
import monthcalendar from './month'
import { mapState } from 'vuex'
import Vue from 'vue'
export default {
    data() {
        return {
            show: 0,
            showweek: 0,
            showmonth: 0,
            index:1
        }
    },
   computed:{
    ...mapState([
         'date',
         'startDate',
         'endDate'
    ])
  }, 
  watch:{
      date:function(){
         this.$emit('message', this.date);
      }
  },
    methods: {
    	dateTime:function(){
    		this.show=1;
        this.index=1;
    		this.showweek=0;
    		this.showmonth=0;
    	},
    	weekTime:function(){
    		this.show=0;
        this.index=2;
    		this.showweek=1;
    		this.showmonth=0;
    	},
    	monthTime:function(){
    		this.show=0;
        this.index=3;
    		this.showweek=0;
    		this.showmonth=1;
    	},
      selectBtn:function(){
          let index=localStorage.getItem("curindex");
          if(index==1){
             this.dateTime()
          }else if(index==2){
             this.weekTime()
          }else{
            this.monthTime()
          }
      },
      closeTime:function(){
          this.$emit('closeTime')
      },
      near:function(){
         var today=new Date(); // 获取今天时间
         var beforeDay = new Date();
         var begin;
         var endTime;
         beforeDay.setTime(today.getTime()-30*24*3600*1000);
         endTime = today.getFullYear() + this.completion(today.getMonth()+1)+this.completion(today.getDate())
        begin=beforeDay.getFullYear() + this.completion(beforeDay.getMonth()+1)+this.completion(beforeDay.getDate())
         this.$store.state.startDate=begin
         this.$store.state.endDate=endTime
         this.$store.state.date=begin
         this.$parent.closeTime()
         localStorage.setItem("curindex", "1")//没有最近30栏目，此处定义初始状态为日
      },
      completion(data) {
         return data < 10 ? ('0' + data) : data
      }
    },
    components: {
        'v-calendar': Calendar,
        'v-weekcalendar':weekcalendar,
        'v-monthcalendar':monthcalendar
    }
}
</script>
<style scoped>
.dataType{
      padding-top: 8px;
      width:100%;
      height:40px;
      overflow: hidden;
      background: #fff
  }
  .dataType li{
    display: inline-block;
    width:60px;
    line-height: 30px;
    margin-left: 10px;
    height:30px;
    color:#333;
    text-align: center;
    position: relative;
    z-index: 10;
    font-size: 14px;
  }
    .dataType li:last-child{
        margin-right: 10px;
    }
   .dataType .curent{
        color:#fff;
        border-radius:15px;
        background: #06c1ae
    }
   .dataType .near{
        width:80px;
        padding-left: 12px;
        text-align: left;
        /*float: right*/
    }
</style>
