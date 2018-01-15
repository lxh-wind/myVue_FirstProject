<template>
    <el-menu default-active="2" class="el-menu-vertical-demo " @open="handleOpen" @close="handleClose" 
    background-color="#409EFF" text-color="#fff" active-text-color="#ffd04b" >
        <el-submenu v-for="item in asideList" :key="item.title" :index="item.title">
            <template slot="title">
                <i class="el-icon-loading"></i>
                <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="items in item.submenu" :key="items.text" :index="items.text">
                <router-link :to="items.path" style="color:#fff">{{items.text}}</router-link>
            </el-menu-item>
        </el-submenu>
    </el-menu>
</template>

<script>
export default {
    data(){
        return {
            //侧栏菜单的数据   
            asideList: [
                { title: '学员问题', submenu:
                    [
                        { text: '内容管理', path: '/' },
                        { text: '类别管理', path: '/' },
                        { text: '评论管理', path: '/' },
                    ]
                },
                { title: '前端技术', submenu:
                    [
                        { text: '内容管理', path: '/' },
                        { text: '类别管理', path: '/' },
                        { text: '评论管理', path: '/' },
                    ]
                },
                { title: '难点答疑', submenu:
                    [
                        { text: '内容管理', path: '/' },
                        { text: '类别管理', path: '/' },
                        { text: '评论管理', path: '/' },
                    ]
                },
                { title: '资源下载', submenu:
                    [
                        { text: '内容管理', path: '/' },
                        { text: '类别管理', path: '/' },
                        { text: '评论管理', path: '/' },
                    ]
                },
                { title: '商品管理', submenu:
                    [
                        { text: '内容管理', path: '/admin/goods/content/list' },
                        { text: '类别管理', path: '/' },
                        { text: '评论管理', path: '/' },
                    ]
                },
                { title: '订单管理', submenu:
                    [
                        { text: '订单列表', path: '/' },
                    ]
                },
            ]
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
};
</script>

<style scoped>
a{
    text-decoration: none;
}
.el-menu{
    border: none
}
</style>