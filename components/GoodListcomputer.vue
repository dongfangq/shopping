<template>
    <div class="app-computer">
            <mt-navbar fixed>
                    <mt-tab-item id="1"><router-link to="/index">首页</router-link></mt-tab-item>
                    <mt-tab-item id="2"><router-link to="/biye">毕业季</router-link></mt-tab-item>
                    <mt-tab-item id="3"><router-link to="/shopcar">我的购物车</router-link></mt-tab-item>
        <mt-tab-item id="4" data-toggle="abc"><div @click="tiaozhuan1" id="login">{{inner}}</div></mt-tab-item>
            </mt-navbar>
        <mt-header class="header" title="电脑 平板"></mt-header>

       
      
        <div class="computer" v-for="(item,i) of list" :key="i">
            <img :src=item.pic alt="">
            <div id="abc">
                <h4 id="lname">{{item.lname}}</h4>
                <h4 id="price1">￥{{item.price}}</h4>
                <button  :data-lid=item.lid @click="tiaozhuan" id="btn1">查看详情</button>
            </div>
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
            // 在服务器中找端口
            var url="http://127.0.0.1:3000/GoodListcomputer"
            // 发送ajax请求
            this.axios.get(url).then(result=>{
                // 请求成功
                // console.log(123) 测试 成功
                this.list=result.data.data;
                
            })
            this.load()
        },
        methods:{
              tiaozhuan1(){
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
            
            tiaozhuan(e){
                console.log(e.target.dataset.lid)
                var lid=e.target.dataset.lid
                this.$router.push({path:'/computer_details',query:{lid:lid}})
            },
            loadMore(){
                if(this.hasMore==false){
                    Toast("已经是最后一页了")
                    return;
                }
                var pno=++this.pno;
                var url="http://127.0.0.1:3000/GoodListcomputer?pno="+pno
                this.axios.get(url).then(result=>{
                    this.list=this.list.concat(result.data.data)
                    var pc=result.data.pageCount;
                if(pno>=pc){
                    this.hasMore=false;
                }
                })
               
            }
        }
    }
</script>
<style>
#btn1{
    margin-left:138px;
    margin-bottom:5px;
    background: rgb(234, 98, 91);
    color:white
}
    .app-computer .header{
       margin-top:46px;
       /* position: fixed; */
       width: 100%
    }
    .app-computer .computer{
        background-color: rgb(40, 112, 187);
        padding:5px;
    }
    .app-computer .computer #abc{
        background:#fff;
        margin-top:-15px;
        margin-left:6px;
        width:97%;
    }
    /* 页面图片 */
    .app-computer .computer img{
        width:100%;
        padding:5px;
    }
    /* 图片下的商品名称和价钱 */
    .app-computer .computer h4{
        text-align: center;
    }
    .app-computer .computer #price1{
         text-align: center;
        color: rgb(234, 98, 91);
        padding-bottom:7px;
    }
    .app-computer .computer #lname{
       padding-top:10px;

    }
    /* 加载按钮 */
    .app-computer .btn1{
        margin-left:35%;
    } 
</style>