// 引入登录  和 注册的   组件
import Login from '../component/login/Login.vue'
import Admin from '../component/admin/Admin.vue'

//商品内容管理页面组件
import GoodsContentList from '../component/admin/goods/goodsContent/goodsCt-list.vue'
import GoodsContentEdit from '../component/admin/goods/goodsContent/goodsCt-edit.vue'

// 商品分类管理页面组件
import GoodsCategoryList from '../component/admin/goods/goodsCategory/goodsCg-list.vue'
import GoodsCategoryEdit from '../component/admin/goods/goodsCategory/goodsCg-edit.vue'
import GoodsCategoryAdd from '../component/admin/goods/goodsCategory/goodsCg-add.vue'

// admin子路由
let adminChildren = [
    //商品内容管理页面
    { name: 'GoodsContentList', path: 'goods/content/list', component: GoodsContentList},
    { name: 'GoodsContentEdit', path: 'goods/content/edit/:id', component: GoodsContentEdit},

    // 商品分类管理页面
    { name: 'GoodsCategoryList', path: 'goods/content/list', component: GoodsCategoryList},
    { name: 'GoodsCategoryEdit', path: 'goods/content/list', component: GoodsCategoryEdit},
    { name: 'GoodsCategoryAdd', path: 'goods/content/list', component: GoodsCategoryAdd}
]
//把路由规则暴露出去
export default{
    routes: [
        {path:'/',redirect:'/login'},
        { name: 'login', path:'/login',component:Login },
        { name: 'admin', path: '/admin', component: Admin, children: adminChildren}
    ]
}