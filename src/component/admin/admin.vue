<template>
    <el-container id="admin">
        <el-aside width="200px">
            <Aside></Aside>
        </el-aside>
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
            <el-main>Main</el-main>
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
.el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
}
.el-aside {
    background-color: #D3DCE6;
    color: #333;
}
.el-main {
    background-color: #E9EEF3;
    color: #333;
}
</style>