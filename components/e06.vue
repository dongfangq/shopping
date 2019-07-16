<template>
    <div>
        <h4>接收参数</h4>
        <mt-button @click=tiaozhuan>点击跳转</mt-button>
    </div>
    
</template>
<script>
export default {
    data(){
        return{
            pid:0,
        }
    },
    created() {
        var pid=
        this.$route.query.pid;
        console.log(pid)
      
    },
    methods:{
        tiaozhuan(){
            this.$router.push("/GoodList?id=19")
        }    }
}
</script>
<style>
</style>