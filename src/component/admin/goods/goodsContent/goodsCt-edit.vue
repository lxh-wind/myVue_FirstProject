<template>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="内容标题" prop="title" style="width:500px">
            <el-input v-model="ruleForm.title"></el-input>
        </el-form-item>
        <el-form-item label="副标题" prop="sub_title" style="width:500px">
            <el-input v-model="ruleForm.sub_title"></el-input>
        </el-form-item>
        <el-form-item label="所属类别">
            <el-select v-model="ruleForm.category_id" placeholder="请选择活动区域">
                <el-option v-for="itme in dataChannel" :key="itme.title" :label="itme.title" :value="itme.category_id">
                    <span>
                         <!-- option标签内可以嵌套子标签, 但是option的label属性不能删掉 -->
                        <span v-if="itme.class_layer != 1"> |--</span>
                        <span>{{ itme.title }}</span>
                    </span>
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="是否发布">
            <el-switch v-model="ruleForm.status"></el-switch>
        </el-form-item>
        <el-form-item label="推荐类型">
            <el-switch v-model="ruleForm.is_slide"></el-switch>轮播图
            <el-switch v-model="ruleForm.is_top"></el-switch>置顶
            <el-switch v-model="ruleForm.is_hot"></el-switch>推荐
        </el-form-item>
        <el-form-item label="上传封面" prop="imgList" >
            <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg"
                 :file-list="ruleForm.imgList" list-type="picture" :on-success='imgListDemoTo' :on-remove='removeFile'>
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="上传附件">
            <el-upload class="upload-demo" action="http://localhost:8899/admin/article/uploadimg"
                 :file-list="ruleForm.fileList" :on-success="fileListDemoTo">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="商品货号" prop="goods_no" style="width:400px">
            <el-input v-model="ruleForm.goods_no"></el-input>
        </el-form-item>
        <el-form-item label="库存数量" prop="stock_quantity" style="width:400px" >
            <el-input v-model="ruleForm.stock_quantity"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="market_price" style="width:400px">
            <el-input v-model="ruleForm.market_price"></el-input>
        </el-form-item>
        <el-form-item label="销售价格" prop="sell_price" style="width:400px">
            <el-input v-model="ruleForm.sell_price"></el-input>
        </el-form-item>
        <el-form-item label="内容摘要">
            <el-input type="textarea" v-model="ruleForm.zhaiyao"></el-input>
        </el-form-item>
        <el-form-item label="详细内容">
            <quill-editor v-model="ruleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交保存</el-button>
            <el-button >返回上一页</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'

export default {
    //使用富文本
    components: {
        quillEditor
    },
    data() {
        function validateImg(rule, value, callback) {
            if (value === '' || value.length == 0) {
                callback(new Error('请上传一张封面图'));
            } else {
                callback();
            }
        };
        return {
            // 获取商品的id
            id:'',
            // 用于存储显示上传图片显示  和上传附件显示的数据
            fileList: [],
            // 用于存储商品的详细信息
            ruleForm:{
                title:"",
                sub_title:"",
                goods_no:"",
                category_id:"",
                stock_quantity:'',
                market_price:'',
                sell_price:'',
                status:'',
                is_slide:'',
                is_top:'',
                is_hot:'',
                zhaiyao:"",
                content:"",
                imgList:[],
                fileList:[]
            },
            //存储分类数据
            dataChannel:[],
            //用于表单验证的验证规则
            rules:{
                title:[
                    { required: true, message: '请输入内容标题', trigger: 'blur' },
                    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                ],
                sub_title:[
                    { required: true, message: '请输入副标题', trigger: 'blur' },
                    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
                ],
                goods_no:[
                    { required: true, message: '请输入商品货号', trigger: 'blur' },
                    { pattern: /\w{4,10}/, message: '长度在 3 到 30 个字符', trigger: 'blur' }
                ],
                stock_quantity:[
                    { required: true, message: '请输入库存数量', trigger: 'blur' },
                    { pattern: /^\d{1,10}$/, message: '长度在 1 到 10 个数字', trigger: 'blur' }
                ],
                market_price:[
                    { required: true, message: '请输入市场价', trigger: 'blur' },
                    { pattern: /^\d{1,10}$/, message: '长度在 1 到 10 个数字', trigger: 'blur' }
                ],
                sell_price:[
                    { required: true, message: '请输入销售价', trigger: 'blur' },
                    { pattern: /^\d{1,10}$/, message: '长度在 1 到 10 个数字', trigger: 'blur' }
                ],
                imgList:[
                    { validator: validateImg, trigger: 'submit' }
                ]
            }
        };
    },
    created(){
        if(this.$route.params.id != 'xz'){
            this.getDatails();
        }
        this.getChannel();
    },
    methods:{
        // 获取分类数据
        getChannel(){
            this.$http.get(this.$api.ctList+'goods').then(res=>{
                this.dataChannel = res.data.message;
                console.log(this.dataChannel);
            });
        },
        //通过id拿到详细数据
        getDatails(){
            this.$http.get(this.$api.gsDetail+this.$route.params.id).then(res=>{
                this.ruleForm = res.data.message;
                //注意我名字在实现分类数据回显的时候  发现 分类的id和拿到的商品id类型不一样
                // 所以需要把商品id转成number类型
                this.ruleForm.category_id = +res.data.message.category_id;
                this.id = this.$route.params.id;
            });
        },
        //获取上传图片成功数据  保存到ruleForm 0用于预览
        imgListDemoTo(response, file, fileList){
            // console.log(1);
            this.ruleForm.imgList = [];
            this.ruleForm.imgList.push(response);
        },
        //获取上传附件成功数据 保存到到 ruleForm 里 用于预览
        fileListDemoTo(response, file, fileList){
            this.ruleForm.fileList.push(response);
        },
        removeFile(file, fileList){
            this.ruleForm.imgList = this.ruleForm.imgList.filter(v=>v.name != file.name);
        },
        //发送编辑商品的请求
        setEidtUrl(){
            this.$http.post(this.$api.gsEdit+this.id,this.ruleForm).then(res=>{
                if(res.data.status == 0){
                    this.$alert('商品编辑成功 将返回内容管理！', '编辑', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/admin/goods/content/list');
                        }
                    })
                }
            });
        },
        //新增商品的请求
        setAddUrl(){
            this.$http.post(this.$api.gsAdd,this.ruleForm).then(res=>{
                if(res.data.status == 0){
                    this.$alert('商品新增成功 将返回内容管理！', '新增', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$router.push('/admin/goods/content/list');
                        }
                    })
                }
            });
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //判断当前是编辑还是新增   然后决定发送什么请求
                    if(this.$route.params.id != 'xz'){
                        // 编辑
                        this.setEidtUrl();
                    }else{
                        // 新增
                        this.setAddUrl();
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
        
    }
};
</script>
<style>
.el-form-item.is-required .el-form-item__label:before{
    content:'';
    /* overflow-x: scroll */
}
/* 让富文本插件出现滚动条 */
.ql-editor{
    height: 350px;
    overflow-y: scroll;
}
</style>