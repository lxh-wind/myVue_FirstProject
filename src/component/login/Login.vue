<template>
    <div>
        Rate评分
        <!-- element-ui   评分组件   -->
        <el-rate   
            v-model="value"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate>
        <!-- <el-rate
            v-model="value4"
            :icon-classes="['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']"
            void-icon-class="icon-rate-face-off"
            :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
        </el-rate> -->
    </div>
</template>

<script>
    export default {
        data(){
            return {
                //这里的value设置的是Rate评分的默认值
                value:3,
                value4:null
            };
        },
        created(){
            this.$http.get(this.$domain+this.$api.logout)
            .then(res=>{
                console.log(res);
            })         
        }
    }
</script>

<style>

</style>