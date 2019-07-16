<template>
 <div class="app-index"> 

<!-- 头部加一个搜索框 ,图片放在服务器端，没有放在数据库中 -->
<mt-header title="首页"></mt-header>
<!-- <img class="logo" src="http://127.0.0.1:3000/img/logo.png" alt=""> -->
   

<!-- 轮播图 ,哈哈哈，成功了,en....把路径写在了服务区并且从前台成功获取-->
<div class="slide">
<mt-swipe :auto="3000">
    <mt-swipe-item class="slide1" v-for="item of imgs">
        <img :src="item.img_url" alt="">
    </mt-swipe-item>
  </mt-swipe>
</div>
<!-- 导航栏-->
<mt-navbar>
       <mt-tab-item id="1"><router-link to="index">首页</router-link></mt-tab-item>
        <mt-tab-item id="2"><router-link to="biye">毕业季</router-link></mt-tab-item>
        <mt-tab-item id="3"><router-link to="shopcar">我的购物车</router-link></mt-tab-item>
        <mt-tab-item id="4" data-toggle="abc"><div @click="tiaozhuan" id="login">{{inner}}</div></mt-tab-item>
</mt-navbar>

<!-- 使用mui组件，实现九宫格 -->
<div class="mui-content">
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"   ><a href="#">
                <!-- <router-link to="/GoodList"> -->
                    <router-link to="GoodListphone"><img  class="mui-icon mui-icon-home" src="http://127.0.0.1:3000/img/liebiao_xiaomi5c.jpg" alt=""></router-link>
                <!-- </router-link> -->
                    <div class="mui-media-body">手机 电话卡</div></a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
               
                <!-- <router-link to="/GoodList"> -->
                    <router-link to="GoodListcomputer"> <img  class="mui-icon mui-icon-home" src="http://127.0.0.1:3000/img/pinpai5.png" alt="">
                  
                    <div class="mui-media-body">笔记本 平板</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                <!-- <router-link to="/GoodList"> -->
                <router-link to="GoodListappliance"> 
                    <img  class="mui-icon mui-icon-home" src="http://127.0.0.1:3000/img/pms_1510020567.64467830!200x200.jpg" alt="">
                <!-- </router-link> -->
                    <div class="mui-media-body">家电</div>
                </router-link>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               
                <!-- <router-link to="/GoodList"> -->
                    <router-link to="GoodList_out"> <img  class="mui-icon mui-icon-home" src="http://127.0.0.1:3000/img/T1PXhgBbdT1RXrhCrK!200x200.jpg" alt=""></router-link>
                    <div class="mui-media-body">出行</div></a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"   ><a href="#">
               
                    <router-link to="router"> <img  class="mui-icon mui-icon-home" src="http://127.0.0.1:3000/img/pms_1531132647.86213611!200x200.jpg" alt=""></router-link>
                
                    <div class="mui-media-body">路由器</div></a>
            </li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
               
                <!-- <router-link to="/GoodList"> -->
                    <router-link to="dianyuan"> <img  class="mui-icon mui-icon-home" src="http://127.0.0.1:3000/img/pms_1481269289.59498154!200x200.jpg" alt=""></router-link>
                    <div class="mui-media-body">电源 配件</div></a>
            </li>
        </ul>  
</div>
</div>  
</template>
<script>
    import {Toast} from "mint-ui"
    export default({
        
        data(){
            return{
                imgs:[],/*轮播图片*/
                list1:[],
                list:[],//接收服务器返回数据数组
                 pno:1,//当前页数
                 hasMore:true,//是否有下一页数据
                 inner:"登录/注册"
            }
        },
        // 组件声明周期
        created(){
            // 请求轮播图的图片
            var url="http://127.0.0.1:3000/imglist"
            this.axios.get(url).then(result=>{
                this.imgs=result.data.data
                console.log(this.imgs)
            })
            var url2="http://127.0.0.1:3000/getGoodList1"
            this.axios.get(url2).then(result=>{
                this.list1=result.data.data
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
            // 实现跳转网页
            jump(){
                this.$router.push("/e06?pid=5")
            },
            
            // 加载更多按钮
            loadMore(){
                // 判断用户有没有登录
               
                // 如果没有下一页的数据，提示停止执行
                if(this.hasMore==false){
                    Toast("已经是最后一页了");
                    return;
                }
                 var pno=++this.pno;

                 //加载更多，判断当前是否是最后一页，是的话提示 “已是最后一页”
               
                // 1.创建一个变量放URL，
                 var url="http://127.0.0.1:3000/getGoodList?pno="+pno
                
                // 2.发送ajax请求，用axios组件（用前需要先引入）
                this.axios.get(url).then(result=>{
                    // .concat:可以实现两个数组的合并
                    this.list=this.list.concat(result.data.data)
                    if(pno>=result.data.pageCount){
                     this.hasMore=false
                 }
                })
                // 3.保存服务器传回来的数据
                // 4.将数据显示在页面上
            }
        }       
    })
</script>
<style scoped>
li div{
    font-size: 15px
}

/* 九宫格样式 */
.app-index .mui-grid-9{
    background-color: white !important;
    margin-top: 0px !important;
}
.mui-content .mui-table-view .mui-table-view-cell img{
     width:60px;
    height:60px;  
    background-color: white;
      /* width:100%;   */
    /* border-radius: 50% */
}



    /* 图片样式 */
    .logo{
        margin-top: 2%;
    }
/* 搜索框滴样式 */
input[type='search']{
    /* margin-top:vhpx; */
     height:11px !important; 
     
}
.mint-searchbar{
    width:50%;   
    height:100%;
    left:16%;
    top:-10%;
}
.mint-search{
    /* width:100%;
    height: 5vh!important; */
    display: inline;
}
    /* 下面是轮播图样式 */
.slide {
  height: 200px !important;
  color: #fff;
  /* font-size: vhpx; */
  text-align: center;
}
.slide1,.slide2,.slide3,.slide4 {
  color: #fff;
}
.slide img{
    width:100%
} 
/* 下面是导航栏和商品列表之间的商品分类圆圈 */
.category{
    display: flex;
    padding:4px;
    flex-wrap: wrap;
}
.category .category-item{
    width: 30%;
    display:flex;
    margin:2px 6px;
    justify-content: space-between;
    flex-direction: column;
    padding:3%;
    text-align: center;

}
.category .category-item img{
    width:100%;
    border-radius: 50%;
}
/* 下面是首页商品列表的样式 */
.app-goodlist{
    display: flex;
    padding: 4px;
    flex-wrap: wrap;

}
.app-goodlist .goods-item{
    width:49%;
    padding: 4px;
    margin: 2px 0;
    display: flex;
    flex-direction: column;

}
.app-goodlist .goods-item img{
    width: 100%;
}

</style>