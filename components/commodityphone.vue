<template>
    <div class="commodity-details">
        <!-- <h3>商品详情</h3> -->
     
         <!-- 返回图标 -->
        <router-link to="/GoodListphone"> <a class="active"><span class="mui-icon-extra         mui-icon-extra-arrowleftcricle"></span></a>
        </router-link>
     <div class="commodity" v-for="item of list">
           
           <!-- 轮播图 -->
        <div class="slide">
           <mt-swipe>
                <mt-swipe-item>
                    <img :src=item.pic1>
                </mt-swipe-item>
                <mt-swipe-item>
                    <img :src=item.pic1>
                </mt-swipe-item>
                <mt-swipe-item>
                    <img :src=item.pic2>
                </mt-swipe-item>
                <mt-swipe-item>
                    <img :src=item.pic3>
                </mt-swipe-item>
            </mt-swipe>
        </div>

            <!-- <img :src=item.pic1 alt=""> -->
           


            <div class="yuyue">
                <span>预约中</span>
                <span class="span1">你猜距预约结束还有多久</span>
            </div>
            <p class="p1">{{item.lname}}</p>
            <p class="p4">{{item.subtitle}}</p>
            <p class="p2">{{item.spec}}</p>

            <p class="p3">￥{{item.price}}</p>       
         
        
        <div class="mui-card" >
			<div class="mui-card-content">
                <div id="a"></div>
                <div @click="shouye">
                    <img src="http://127.0.0.1:3000/img/shouye.png" alt=""/>
                    <div id="a"></div>
                    <span>首页</span>
                </div>
                  <div @click="addShopCar">
                    <img src="http://127.0.0.1:3000/img/shopcar (1).png" alt=""/>
                    <div id="a"></div>
                    <span>购物车</span>
                </div>
				<div class="mui-card-content-inner" :data-toggle="item.lid" @click="shopcar">
                            加入购物车
				</div>
			</div>
		</div>
      </div>
    </div>
</template>
<script>
 import {Toast} from "mint-ui"
    export default({
        data(){
            return{
                lid:1,
                list:[],//接收服务器传回来的参数
            }

        },
        created() {
            // 获取当前点击的商品id号
            // 这应该用到了组件之间的参数传递了吧。。。。。。
            // console.log(1)测试 成功
            // var pid=this.$route.query.id
            // console.log(pid);
            this.loadMore()
            
        },
     
        methods: {
            //用户点击购物车同样要判断用户有没有登录
            //用户登录成功后，点击购物车直接跳转到购物车组件
            addShopCar(){
                var uid=sessionStorage.getItem("uid")
                if(uid==null){
                    Toast({
                        message: '请先登录',
                        position: 'bottom',
                        duration: 1000
                    }); 
                    return              
                }
                this.$router.push({path:"/shopcar"})
            },
            //用户点击加入购物车按钮,
            //首先判断用户有没有登录，如果为登录，则提示用户登录，
            //如果用户已登录，则显示已登录用户的购物车
            shopcar(e){
                var uid=sessionStorage.getItem("uid")
                console.log(uid)
                if(uid==null){
                    Toast({
                        message: '请先登录',
                        position: 'bottom',
                        duration: 1000
                    });  
                    return;             
                }
                //1.获取该商品的id，用自定义属性
                console.log(e.target.dataset)
                var lid1=e.target.dataset.toggle
                console.log("获取的商品编号"+lid1)
                //2.向后台发送axios请求
                var url="http://127.0.0.1:3000/addProduct?lid="+lid1
                //3.查询成功
                this.axios.get(url).then(result=>{
                    console.log(result.data.code)
                    var a=result.data.code
                    if(a==2){
                        Toast({
                        message: '购物车中已有该商品',
                        position: 'bottom',
                        duration: 1000
                    }); 
                    }else if(a==1){
                        Toast({
                        message: '加入购物车成功',
                        position: 'bottom',
                        duration: 1000
                    }); 
                    }
                })
                

            },
            shouye(){
                this.$router.push({path: '/index'})
            },
            loadMore(){
                
                // console.log("我是loadMore") 测试 成功
                //var lid=this.lid;
                var lid=this.$route.query.lid
                console.log(lid)
                var url="http://127.0.0.1:3000/phoneDetails?lid="+lid
                this.axios.get(url).then(result=>{
                    this.list=result.data.data
                    console.log(this.list)

                })
            }
            
        },
// 在这里面怎样嵌套js代码



    })
</script>
<style scoped>
.commodity-details{
    height:800px;
}
    .commodity-details .commodity .yuyue{
        background-color: #f56600;
        width:100%;
        height:50px;
   
    } 
    .commodity-details .commodity .yuyue span{
        color:white;
        text-align: center;
        line-height: 50px;
        margin-left:5%;
    }
    .commodity-details .commodity .yuyue .span1{
        margin-left:35%;
        font-size: 80%;
    }
    .commodity-details .commodity .p1{
        margin-left: 3%;
        margin-top:3%;
        font-size:100%;
        color: black
    }
    .commodity-details .commodity .p2{
        margin-left: 3%;
        
    }
    .commodity-details .commodity .p3{
        color:#f56600;
        font-size: 180%;
        margin-top: 4%;
    }
    .commodity-details .commodity .p4{
        font-size: 80%;
        color:rgb(255, 74, 0);
        margin-bottom:1px;

    }
    .commodity-details .foot{
        background: transparent;
        padding: 0.16rem 0.16rem
    }
    .commodity-details .mui-card{
        border-radius: 5%;
         /* position: fixed;  */
       
    }
    .commodity-details .mui-card img{
        width:31px;
        height:auto;
        margin-left:10px;
        margin-top:4px;
        margin-bottom:-6px;
    }
    .commodity-details .mui-card span{
        margin-left:10px;
    }
    .commodity-details .active{  
        position: absolute;
        top: -49%;
        margin-left: 15px;
        margin-top: 93%;
        z-index: 2;
       
    }
    .commodity-details .active .mui-icon-extra{
         font-size:40px !important;
         color: gray;
    }
    /* 轮播图样式 */
    .slide{
        width: 100%;
        height: 400px !important;
    }
    .slide img{
        width:100%;
    }
    .commodity-details .mui-card .mui-card-content .mui-card-content-inner{
        width:104px;
        height:30px;
        line-height:3px;
        margin-top:12px;
        margin-left:135px;
        color:white;
        background:#ff6700;
        border-radius:.32rem;

    }
    .commodity-details .mui-card .mui-card-content{
        height:55px;
        width:358px;
        left:0;
        position:fixed;
        top:91%;
        margin-left:8px;
        background:white;
        display:flex;
    }
    .commodity-details .mui-card .mui-card-content #a{
        clear:both
    }

</style>