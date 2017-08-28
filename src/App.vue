<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import './js/fastclick.js';
export default {
  name: 'app',
  data () {
    return {
      status:0,
      links:""
    }
  },
  created: function() {
  	  this.links = window.location.href;  //页面url
      this.getWXjdk();
  },
  methods:{
  	getWXjdk:function(){ 
      this.$ajax({
      	  url:this.api + '/wx/getWxSdkConfig',
          method:'get',
          params:{
            "url":this.links
          }
      }).then(response=>{
          if(response.data.code == 200){
           	let _model = response.data.model;
           	wx.config({
      			      debug: false, 
      			      appId: _model.appid,
      			      timestamp: _model.timestamp,
      			      nonceStr: _model.noncestr,
      			      signature: _model.signature,
      			      jsApiList: [
      			        'hideMenuItems'
      			      ]
      			}); 
      			wx.ready(function () {  
      			    wx.hideMenuItems({//禁用一些功能
      			        menuList: [
      			        	"menuItem:share:appMessage",
      			        	"menuItem:share:timeline",
      			        	"menuItem:share:qq",
      			        	"menuItem:share:weiboApp",
      			        	"menuItem:share:QZone"
      			        ]
      			    }) 
      			});
          }else{
           	alert("请求错误")
          }
      })
    }
    }
}
</script>
<style>
@import '../node_modules/mint-ui/lib/style.css';
@import './style/style.css';
</style>
