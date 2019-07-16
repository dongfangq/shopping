<template>
    <div class="app-computer">
        <mt-header title="毕业不散场"></mt-header>
        <mt-navbar fixed>
        <mt-tab-item id="1"><router-link to="/index">首页</router-link></mt-tab-item>
        <mt-tab-item id="2"><router-link to="/biye">毕业季</router-link></mt-tab-item>
        <mt-tab-item id="3"><router-link to="/shopcar">
            我的购物车
         </router-link></mt-tab-item>
        <mt-tab-item id="4" data-toggle="abc"><div @click="tiaozhuan" id="login">{{inner}}</div></mt-tab-item>

      </mt-navbar>
        <div class="computers-item" v-for="item of list">
            <img :src="item.pic" alt="" :data-lid="item.lid" @click="btn1">
            
            
        </div>
        <mt-button class="btn" type="primary" @click=loadMore>加载更多</mt-button>
    </div>
</template>
<script>
    import {Toast} from "mint-ui"
    export default{
        data(){
            return{
                list:[],
                pno:1,
                hasMore:true,
                inner:"登录/注册"

            }
        },
        created(){
            // 使用ajax访问后台数据
            var url="http://127.0.0.1:3000/biye"
            this.axios.get(url).then(result=>{
                this.list=result.data.data
            })
            this.load()
        },
        methods:{
               tiaozhuan(){
                var inner=document.getElementById("login").innerHTML
                console.log(inner)
                if(inner=="登录/注册"){
                    this.$router.push({
                        path:"/user_login"
                    })
                }else if(inner=="我的中心"){
                    this.$router.push({
                        path:"/own_center"
                    })
                }

            },
            load(){
                 var uid=sessionStorage.getItem("uid")
                console.log("我在哪")
                console.log(uid)
                if(uid!=null){
                    this.inner="我的中心"
                }
            },
              btn1(e){
            /* 通过e可以来获取商品的lid */
            console.log(e.target.dataset.lid)
            var lid=e.target.dataset.lid
            this.$router.push({path: '/biye_details', query: {lid: lid}})
        },
            loadMore(){
                if(this.hasMore==false){
                    Toast("已经是最后一页了");
                    return
                }
                var pno=++this.pno
                var url="http://127.0.0.1:3000/biye?pno="+pno
                this.axios.get(url).then(result=>{
                    this.list=this.list.concat(result.data.data)
                    if(pno>=result.data.pageCount){
                        this.hasMore=false;
                    }
                })
            }
        }
    }
</script>
<style scoped>
    .app-computer .computers-item{
        width:99%;
        padding:4px;
        margin:2px 0;
        display: flex;/*弹性布局*/
        flex-direction: column;/*排列方式*/
        text-align: center;
    }
    .app-computer .computers-item img{
        width:100%;
    }
    .app-computer .btn{
        margin-left: 35%
    }
    .app-computer mt-header{
        margin-top:50px !important;
    }
    .mint-header{
        margin-top:50px;

    }
  
</style>