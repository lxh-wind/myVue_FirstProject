//引入vue库
import Vue from 'vue'

//引入根组件App
import App from './component/App.vue'               

//将根组件渲染到视图
new Vue({
    el:'#app',
    render: function (createElement) {
        return createElement(App);
    }
});