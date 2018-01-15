<template>
    <el-dropdown split-button type="primary" id="headerRight">
        你好，{{name}}
        <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>修改密码</el-dropdown-item>
            <!-- 这里记住  我们用的是别人的组件  所有用原本的v-on可能无法加事件  那么我们需要用修饰符  native
            绑定原生dom事件 -->
            <el-dropdown-item @click.native='openFullScreen'>退出</el-dropdown-item>
        </el-dropdown-menu>
    </el-dropdown>
</template>

<script>
    export default {
        data(){
            return{
                name:'admin'
            };
        },
        methods: {
            //模拟加载中 方法
            openFullScreen() {
                const loading = this.$loading({
                    lock: true,
                    text: '拼命加载中...',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });
                setTimeout(() => {
                    loading.close();
                    //调用请求函数
                    this.loginout();
                }, 1000);
            },
            //用户退出函数
            loginout(){
               this.$http.get(this.$api.logout).then(res=>{
                   console.log(res);
                   if(res.data.status == 0){
                       this.$router.push('/login');
                   }else{
                       this.$alert('服务器响应失败，请重试！');
                   }
               });
            }
        }
    }
</script>

<style scoped>
#headerRight{
    position: absolute;
    right: 10px;
    top: 8px;
}
</style>