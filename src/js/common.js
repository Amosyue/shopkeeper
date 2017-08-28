import Vue from 'vue'
Vue.filter("formatDate", function(value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    return value.substring(0,4)+"年"+value.substring(4,6)+"月"+value.substring(6,8)+"日"
});
Vue.filter("formatMonth", function(value) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
    return value.substring(0,4)+"年"+value.substring(4,6)+"月"
});
Vue.filter("formatLength", function(value) {   //千分位
    value = parseFloat((value + '').replace(/[^\d\.-]/g, '')).toFixed(2) + '';
    var l = value.split('.') [0].split('').reverse(),
        r = value.split('.') [1];
    var  t = '';
    for (var i = 0; i < l.length; i++)
    {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + r;
});