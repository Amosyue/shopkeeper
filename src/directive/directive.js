import Vue from 'vue';
//修改标题
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
})
//input只能输入字母和数字
// Vue.directive('example', {
//     bind: function () {
//     	alert("1110")
//         this.handler = function () {
//             this.el.value = this.el.value.replace(/\D+/, '')
//         }.bind(this)
//         this.el.addEventListener('input', this.handler)
//     },
//     unbind: function () {
//         this.el.removeEventListener('input', this.handler)
//     }
// })