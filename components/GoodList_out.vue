<template>
    <div class="app-appliance">
            <mt-navbar fixed>
                    <mt-tab-item id="1"><router-link to="/index">首页</router-link></mt-tab-item>
                    <mt-tab-item id="2"><router-link to="/biye">毕业季</router-link></mt-tab-item>
                    <mt-tab-item id="3"><router-link to="/shopcar">我的购物车</router-link></mt-tab-item>
        <mt-tab-item id="4" data-toggle="abc"><div @click="tiaozhuan" id="login">{{inner}}</div></mt-tab-item>
            </mt-navbar>
        <mt-header class="header" title="家电"></mt-header>
        <!-- 页面图片信息 -->
        <div class="app-items" v-for="item of list">
        
        <img :src=item.pic alt="">
        <p>{{item.lname}}</p>
        <p id="price1">￥{{item.price}}</p>
        <button @click="btn1"  :data-lid=item.lid id="btn1">查看详情</button>
    </div>
    <mt-button type="primary" class="btn1" @click=loadMore>加载更多</mt-button>
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
        created() {
            var url="http://127.0.0.1:3000/GoodList_out"
            this.axios.get(url).then(result=>{
                this.list=result.data.data;
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
                console.log(e.target.dataset)
                var lid=e.target.dataset.lid
                this.$router.push({
                    path:"/GoodList_out_details",
                    query:{lid:lid}
                })
            },
            loadMore(){
            if(this.hasMore==false){
                    Toast("已经是最后一页了")
                    return
                }
                // console.log(1123)测试成功
                // 加载下一页数据
                // 1.创建URL请求地址
               var pno=++this.pno
                var url="http://127.0.0.1:3000/GoodList_out?pno="+pno
                // 2.添加参数
                // 3.发送ajax请求
                this.axios.get(url).then(result=>{
                    this.list=this.list.concat(result.data.data)
                    if(pno>=result.data.pageCount){
                        this.hasMore=false
                    }
                })
                // 4.获取服务器返回数据
                // 将返回数据保存list
            
            }
        }      
    }
</script>
<style scoped>
    .app-appliance{
        justify-content: space-between;
        display: flex;
        flex-wrap: wrap;
        background:rgb(246,170,48)
    }
 .app-appliance .app-items{
     background:white;
     margin:5px;
     width: 47%;
        /* width:49% */
    }
    .app-appliance .app-items p{
        font-size: 15px;
        color:black;
        font-weight: 400;
        text-align: center;
    }
    .app-appliance .header{
       margin-top:46px;
       /* position: fixed; */
       width: 100%
    }
   
    .app-appliance .app-items img{
         /* width:60px;
        height: 60px; */
        width: 100%; 
        height: auto;
        /* justify-content: space-between; */

    }
    /* 按钮 */
    .app-appliance .btn1{
        margin-left: 35%
    }
    #price1{
        color: #ea625b;
    }
    #btn1{
        margin-left:51px;
        margin-top:-7px;
        margin-bottom:8px;
    }
</style>