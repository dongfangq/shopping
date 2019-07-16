<template>
    <div class="app-goodslist">
            
  <!-- 顶部导航栏 没有实现-->
  <!-- 怎样实现点击跳转 -->
   <mt-navbar fixed>
        <mt-tab-item id="1"><router-link to="/index">首页</router-link></mt-tab-item>
        <mt-tab-item id="2"><router-link to="/biye">毕业季</router-link></mt-tab-item>
        <mt-tab-item id="3"><router-link to="/shopcar">
            我的购物车
         </router-link></mt-tab-item>
         <mt-tab-item id="4" data-toggle="abc"><div @click="tiaozhuan" id="login">{{inner}}</div></mt-tab-item>
      </mt-navbar>
      <mt-header class="header" title="手机列表"></mt-header>
        <div class="app-goodlist">
        <!-- 商品列表两行两列 -->
        <div class="goods-item" v-for="(item,i) of list" :key="i">
            <!-- 1.1商品图片 
            点击实现跳转
            <router-link to="/commodityphone">-->
            
                <img :src=item.pic alt="">
            
            <!-- 1.2商品名称 -->
            <p id="p1">{{item.lname}}</p>
            <!-- 1.3商品价格 -->
           <p id="p2">￥{{item.price}}</p>
           <mt-button type="primary" class="details" :data-toggle=item.lid @click="abc">查看详情</mt-button>
       <!-- </router-link> -->
        </div>
        <mt-button class="btnmore"  @click=loadMore>加载更多</mt-button>
        
    </div>
    </div>
</template>
<script>
    import {Toast} from "mint-ui"
export default({
    data(){
        return{
            // 接收服务器返回商品数组
            list:[],
            pno:1,
            hasMore:true,
            inner:"登录/注册"
            
        }     
    },
    // 组件声明周期
    created(){
        // 用于接收参数
        var pid=this.$route.query.id
        // console.log(pid)
        // 输出也是undefined
        // console.log(pid)
        // console.log(123)测试  成功
        //1. 创建变量，保存URL地址
        var url="http://127.0.0.1:3000/getGoodListphone"
        // 2.发送ajax请求，无参数
        this.axios.get(url).then(result=>{
            // 3.接收数据库返回商品数组
           
        this.list=result.data.data;
        console.log(this.list)
        })       
        // 4.保存list
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
        abc(e){
            /* 通过e可以来获取商品的lid */
            console.log(e.target.dataset.toggle)
            var lid=e.target.dataset.toggle
            this.$router.push({path: '../commodityphone', query: {lid: lid}})
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
                var url="http://127.0.0.1:3000/getGoodListphone?pno="+pno
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
            },
            // 下面是用户点击查看详情的页面      
        }
})
</script>
<style scoped> 
.app-goodslist .header{
    margin-top: 46px;
}
   /* 外层子元素 */
    .app-goodlist{
        /* 弹性布局 */
         display:flex;
         /* 子元素换行 */
         flex-wrap:wrap;
         /* 两端对齐 */
         justify-content:space-between;
         padding:4px;
         
    }
    .app-goodlist .goods-item{
        width:49%;
        padding:4px;
        margin:2px 0;
        display: flex;/*弹性布局*/
        flex-direction: column;/*排列方式*/
        /* height:35%; */
    }
    .app-goodlist .goods-item img{
        width:100%;
        height:auto;
        display:block;
    }
    /* 详情按钮 */
    .app-goodlist .goods-item .details{
         width:40%;
         display: flex;
         /* height:100%;   */
         font-size:10px;
         margin-left: 29%
    } 
    .app-goodlist .btnmore{
        background:#007aff;
        color:black;
        margin-left: 35%;
        margin-top: 5%;
    }
    /* 图片下面的商品名称和价格 */
    .app-goodslist .app-goodlist p{
        font-size: 15px;
        font-weight: 400;
        text-align: center;
    }
    .app-goodslist .app-goodlist #p2{
        color:red;
        margin-top:-6px;
        margin-bottom:5px;
    }
    .app-goodslist .app-goodlist #p1{
        color:black;
        margin-top:7px;
    }
</style>