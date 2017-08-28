import axios from 'axios'
import store from './vuexState'
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
axios.defaults.timeout = 5000
// http请求拦截器
axios.interceptors.request.use(config => {
    // Indicator.open('加载中...');
    return config
}, error => {
    // Indicator.close();
    Toast({ message: '加载超时',position: 'middle',});
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {// 响应成功关闭loading
    // Indicator.close();
    return data
}, error => {
    // Indicator.close();
    Toast({ message: '加载失败',position: 'middle',});
    // router.go('error');
    return Promise.reject(error)
})
export default axios
