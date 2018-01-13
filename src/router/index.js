// 引入登录  和 注册的   组件
import Login from '../component/login/Login.vue'
import Register from '../component/register/Register.vue'

//把路由规则暴露出去
export default{
    routes: [
        { name: 'login', path:'/login',component:Login },
        { name: 'register', path: '/register', component: Register }
    ]
}