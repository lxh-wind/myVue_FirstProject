<template>
    <el-container id="admin">
        <el-aside width="196px">
            <Aside></Aside>
        </el-aside>
        <el-container>
            <el-header style="height: 56px;">
                <Header></Header>
            </el-header>
            <el-main><router-view></router-view></el-main>
        </el-container>
    </el-container>
</template>

<script>
    import Aside from './common/Aside.vue'
    import Header from './common/Header.vue'

    export default {
        components:{
            //创建子组件  下面使用了   es6的语法
            Header,
            Aside
        }
    }
</script>

<style scoped>

#admin{
    height: 100%;
}
.el-header,.el-footer {
    background-color: #EBECEE;
    color: #333;
    
}
.el-aside {
    background-color: #409EFF;
    color: #333;
}
.el-main {
    background-color: #fff;
    color: #333;
}
</style>