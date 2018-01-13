// 导入默认初始样式
import 'normalize.css'
//引入vue相关的第三方包
import Vue from 'vue';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//使用插件
Vue.use(VueRouter);
Vue.use(ElementUI);
//引入根组件App
import App from './component/App.vue';

//导入路由配置
import routerConfig from './router/index.js';             

//引入axios    一个http库    并加到vue的protoType上  方便使用
import Axios from 'axios';
Vue.prototype.$http = Axios;

//配置一个api文件  方便使用请求路径
import Api from './js/Api.js';
Vue.prototype.$api = Api;
//请求的域加到Vue的prototype上
Vue.prototype.$domain = 'http://157.122.54.189:9095';


//将根组件渲染到视图
new Vue({
    el:'#app',
    render: function (createElement) {
        return createElement(App);
    },
    // 挂载路由
    router: new VueRouter(routerConfig)
});