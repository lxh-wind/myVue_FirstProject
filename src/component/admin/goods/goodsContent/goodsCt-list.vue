<template>
    <div>
        <!-- //面包屑效果栏 -->
        <el-breadcrumb separator-class="el-icon-arrow-right" 
        style="padding-bottom:10px;border-bottom:1px solid #e5e5e5;border-radius: 0px;">
            <el-breadcrumb-item>购物商场</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 按钮  新增  全选  删除 -->
        <div style="padding: 10px 10px;border:1px solid #e5e5e5;
        border-radius: 10px;margin-top:10px" >
            <el-button plain size='mini' icon='el-icon-plus'>
                <router-link :to="{name:'GoodsContentEdit',params:{id:'xz'}}">新增</router-link>
            </el-button>
            <el-button plain size='mini' icon='el-icon-check' @click="selectAll">全选</el-button>
            <el-button plain size='mini' icon='el-icon-delete' @click="selectDel">删除</el-button>
            <!-- 搜索框 -->
            <el-input size='mini' placeholder="请输入内容" suffix-icon="el-icon-search" 
            style="width:150px;float:right" v-model="gsListQuery.searchvalue" @blur="goodsGetlist"></el-input>
        </div>
        <!-- //列表部分 -->
        <el-table max-height='420' ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
            @selection-change="selectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="标题" >
                <template slot-scope="scope">
                    <el-tooltip placement="right">
                        <div slot="content">
                            <img style="width:200px" :src="'http://localhost:8899/'+scope.row.img_url" alt="">
                        </div>
                        <router-link :to="{name:'GoodsContentEdit',params:{id:scope.row.id}}">{{ scope.row.title }}</router-link>
                    </el-tooltip>
                </template>
            </el-table-column>
            <el-table-column prop="categoryname" label="所属类别" width="120"></el-table-column>
            <el-table-column prop="stock_quantity" label="库存" width="120"></el-table-column>
            <el-table-column prop="market_price" label="市场价" width="120"></el-table-column>
            <el-table-column prop="sell_price" label="销售价" width="120"></el-table-column>
            <el-table-column prop="address" label="属性" width="120">
                <template slot-scope="scope">
                    <!-- 三个小图标 点击切换状态  myIconStatus  方法中需要三个属性  id  当前修改的属性   新的状态-->  
                    <i :class="['el-icon-picture',scope.row.is_slide?'active':'']" @click='myIconStatus(scope.row.id,"is_slide",scope.row.is_slide==1?false:true)'></i>
                    <i :class="['el-icon-upload2',scope.row.is_top?'active':'']" @click='myIconStatus(scope.row.id,"is_top",scope.row.is_slide==1?false:true)'></i>
                    <i :class="['el-icon-star-on',scope.row.is_hot?'active':'']" @click='myIconStatus(scope.row.id,"is_hot",scope.row.is_slide==1?false:true)'></i>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <router-link :to="{name:'GoodsContentEdit',params:{id:scope.row.id}}">修改</router-link>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- 
            @size-change用来监听每页数量变化时的事件 -->
       <!-- @current-change用来监听页码变化时的事件 -->
        <!-- current-page用来指定当前页, page-sizes用来指定每页数量的下拉菜单 -->
       <!-- page-size用来指定当前每页的数量, total用来指定总数量 -->
        <el-pagination
            @size-change='SizeChange' @current-change='currenthange'
            :current-page="gsListQuery.pageIndex" :page-sizes="page.pageSizes"
            :page-size="gsListQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
    </div>
</template>

<script>
    export default {
    data() {
      return {
        tableData: [
            {
                id: 103,        
                title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
                is_top: 1,
                is_hot: 1,
                is_slide: 1,      
                categoryname: "男装",
                img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
                imgurl:"http://139.199.192.48:6060/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
                goods_no: "NZ0000000002",
                stock_quantity: 200,
                market_price: 1000,
                sell_price: 800   
            }
        ],

        //请求接口所需要的字符串
        gsListQuery:{
            pageIndex:1,
            pageSize:10,
            searchvalue:''
        },

        // 分页的数据
        page:{
            pageSizes:[10,20,30,40],
            //总的数据
            total:50
        },
        
        // 存储要删除商品的id
        selectId:''
      }
    },
    created(){
        this.goodsGetlist();
    },
    methods: {
        del(){
            var ids = this.selectId;
            this.$http.get(this.$api.gsDel+ids).then(res=>{
                if(res.data.status == 0){
                    this.goodsGetlist();
                    // 在完成删除后要清空存储id的容器selectId  方便下次删除
                    this.selectId = [];
                    // 删除成功后的提示
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }
            });
        },
        //删除
        selectDel(){ 
            console.log(this.selectId);
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.del();
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        // 全选
        selectAll(){
            document.querySelector('.el-checkbox__inner').click();
            console.log(this.selectId);
        },
        // 获取要删除商品的id
        selectionChange(selection){
            this.selectId = selection.map(v=>v.id).join(',');
        },
        // 监听每一页的数量
        SizeChange(pageSize){
            this.gsListQuery.pageSizes =pageSize;
            this.goodsGetlist();
        },
        // 监听页码的变化
        currenthange(pageIndex){
             this.gsListQuery.pageIndex = pageIndex; 
            this.goodsGetlist();
        },
        // 点击图标改变
        myIconStatus(id,type,newStatus){
            this.tableData.filter(item=>item.id == id)[0][type]=newStatus;
        },
        // 获取商品内容数据
        goodsGetlist(){
            this.$http.get(this.$api.gsList,{params:this.gsListQuery}).then(res=>{
                this.page.total = res.data.totalcount;
                this.tableData = res.data.message;
            });
        },
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        }
    }
  }
</script>

<style scoped lang='less'>
//class  以什么什么开头
    [class^=el-icon].active{
        color: aqua
    }
</style>