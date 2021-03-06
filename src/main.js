// 导入默认初始样式
import 'normalize.css'
// 导入全局样式
import './less/index.css'

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
// 我们是跨域请求的接口, 默认不会携带cookie等信息, 后端需要这些信息来判断登陆状态, 所以要设为true
Axios.defaults.withCredentials = true;
//Axios  默认有个属性  可以加上域名
Axios.defaults.baseURL = 'http://localhost:8899'
// Axios.defaults.baseURL = 'http://111.230.109.42:8899'
Vue.prototype.$http = Axios;

//配置一个api文件  方便使用请求路径
import Api from './js/Api.js';
Vue.prototype.$api = Api;

//我们需要实现登录验证逻辑
import beforeEachs from './router/beforeEach.js';
const router = new VueRouter(routerConfig);
router.beforeEach(beforeEachs);


//将根组件渲染到视图
new Vue({
    el:'#app',
    render: function (createElement) {
        return createElement(App);
    },
    // 挂载路由
    router
});