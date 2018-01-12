<template>
    <div>
        登录页面
    </div>
</template>

<script>
    export default {
        data(){
            return {
                
            };
        },
        created(){
            this.$http.get(this.$domain+this.$api.islogin)
            .then(res=>{
                console.log(res);
            })         
        }
    }
</script>

<style>

</style>