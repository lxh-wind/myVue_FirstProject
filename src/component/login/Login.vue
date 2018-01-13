<template>
    <div class="login">
        <h3>后台管理系统</h3>
        <el-form label-position="left" label-width="80px" :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item label="用户名" prop="uname">
                <el-input v-model="ruleForm.uname" ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="upwd">
                <el-input type='password' v-model="ruleForm.upwd"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                // 表单校验数据
                ruleForm:{
                    uname:'admin',
                    upwd:'123456'
                },
                //表单验证规则  总体上是一个对象   
                rules:{
                    // 以字段名为key    数组为val
                    uname: [ 
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { pattern: /\w{4,18}/, message: '长度在 4 到 18 个字符, 且只能为字母或数字', trigger: 'blur' }
                    ],
                    upwd: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { pattern: /.{6,18}/, message: '长度在 6 到 18 个字符', trigger: 'blur' }
                    ]
                }
            };
        },
        created(){       
        },
        methods:{
            //登录的请求函数
            login(){
                this.$http.post(this.$api.login,this.ruleForm)
                        .then(res=>{
                            console.log(res);
                            if(res.data.status == 0){
                                alert('登录成功');
                            }else{
                                alert(res.data.message);
                            }
                        });
            },
            // 提交
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.login();
                    } else {
                        alert('请重新输入账号或密码！！');
                        return false;
                    }
                });
            },
            // 重置
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style>
.login{
    width: 350px;
    height: 180px;
    border: 1px solid #fff;
    border-radius: 10px;
    padding: 20px;
    margin: 0 auto;
    /* text-align: center; */
    position: relative;
    top: 50%;
    transform: translateY(-50%); 
}
.login h3{
    position: absolute;
    top: -80px;
    left: 0;
    font-size: 30px;
    color: #fff;
    text-align: center;
    width: 100%;
}
.el-form-item__label{
    color: #fff;
    font-size: 18px;
    font-weight: bold;
}
.el-form-item.is-required .el-form-item__label:before{
    content: ''
}
</style>