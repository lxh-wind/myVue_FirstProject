//注意这里是个js 没有组件  所有不能直接用this.$http和this.$api   需要单独引入
import Axios from 'axios'
import Api from '../js/Api.js'

export default (to, from, next) => {
    //这里我们验证是否登录用的是一个验证是否登录的接口  虽然可以用cookie来验证  
    // 但是cookie有时会不准确  而这里刚好有接口
    // 定义一个标识   用于判定是否是登陆
    var loginStatus = false;
    Axios.get(Api.islogin).then(res => {
        // 判断当前是否登陆   ，满足把标识改为true
        if (res.data.code == 'logined') {
            loginStatus = true;
        }

        //判断条件  当前为登陆  并且  已登陆  那么跳转到admin
        if (to.name == 'login' && loginStatus) {
            next('admin');
        } else if (to.name != 'login' && !loginStatus) {
            //当前不是登陆页  并且没有登陆  那么跳到login   并记录当前的地址存到$route  中
            // 在login中得到记录的地址  实现效果  从哪来回哪里
            next({
                name: 'login',
                query:{
                    nextLogin: to.fullPath
                }
            });
        } else {
            next();
        }
    });
}