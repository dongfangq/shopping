<template>
    <div class="container">
        <mt-navbar>
       <mt-tab-item id="1"><router-link to="index">首页</router-link></mt-tab-item>
        <mt-tab-item id="2"><router-link to="biye">毕业季</router-link></mt-tab-item>
        <mt-tab-item id="3"><router-link to="shopcar">我的购物车</router-link></mt-tab-item>
         <mt-tab-item id="4" data-toggle="abc"><div @click="tiaozhuan" id="login">{{inner}}</div></mt-tab-item>
        </mt-navbar>

  <mt-tab-container class="page-tabbar-container" v-model="active">
        <mt-tab-container-item id="message">
                 <div class="wider">
    <div class="product" v-for="item of this.list" :key="item.id">
        <img :src=item.pic alt="">
        <div class="product_detail">
            <div class="product_name">{{item.lname}}</div>
            <div class="product_price">￥{{item.price}}</div>
            <div class="product_count">数量：{{item.count}}</div>
            <div class="sum">总计：{{item.price*item.count}}</div>
        </div>
    </div>
  </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="me">
         <div class="container1">
             <span>用户名：{{user_info.uname}}</span>
         </div>
         <div class="telphone">
             联系方式：
             {{user_info.telphone}}
         </div>
         <div class="address">
             地址：
             {{user_info.address}}
         </div>
         <mt-button type="primary" size="large" @click="update">点击修改个人信息</mt-button>
        </mt-tab-container-item>
      </mt-tab-container>


    <mt-tabbar v-model="active" fixed>
        <mt-tab-item id="message" @click.native="changeState(0)"  >
         <tabbaricon
          :selectedImage="require('../assets/d_n.png')"
          :normalImage="require('../assets/d.png')"
          :focused="currentIndex[0].isSelect" @change="abc">
         </tabbaricon>
         待收货  
        </mt-tab-item>
        
         <mt-tab-item id="me" @click.native="changeState(1)" >
         <tabbaricon
          :selectedImage="require('../assets/w_c.png')"
          :normalImage="require('../assets/w.png')"
          :focused="currentIndex[1].isSelect">
         </tabbaricon>
         我的 
        </mt-tab-item>
      </mt-tabbar>
    </div>
</template>
<script>
import TabBarIcon from "./TabBarIcon.vue"
export default {
    data(){
        return{
            active:"message",
            currentIndex:[
        {isSelect:true},
        {isSelect:false}
      ],
      list:"",
      inner:"登录/注册",
      user_info:""
        }
    },
       created(){
       this.load()
       this.load1()
    },
    methods:{
        update(){
            this.$router.push({
                path:"/update_userinfo"
            })
        },
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
             load1(){
                 var uid=sessionStorage.getItem("uid")
                console.log("我在哪")
                console.log(uid)
                if(uid!=null){
                    this.inner="我的中心"
                }
            },
        load(){
            var url="http://127.0.0.1:3000/shouhuo"
            this.axios.get(url).then(result=>{
                console.log(result.data.data)
                this.list=result.data.data
            }).catch(err=>{
                console.log(err)
            })
            var url="http://127.0.0.1:3000/user_info"
            this.axios.get(url).then(result=>{
                console.log(result.data.data)
                this.user_info=result.data.data[0]
            })
        },
          changeState(n){
      //函数功能:将当前参数下标
      //对应数组值修改true其它修改false
      //1:创建循环,循环数组中内容
      for(var i=0;i<this.currentIndex.length;i++){
       //2:判断如果循环下标与n相等 20
       if(n==i){
        //3:当前下标元素true 10:22
        this.currentIndex[i].isSelect=true;
       }else{
        //4:其它元素修改false
        this.currentIndex[i].isSelect=false;
       }       
      }
    },
    
abc(){
    console.log(123)
},

    },
  
    components:{
        "tabbaricon":TabBarIcon
    }
}
</script>
<style scoped>
    .container1{
        width: 100%;
        height: 50px;
        /* border:1px solid red; */
        border-bottom:1px solid orange
        /* margin-top: 20px; */
    }
    .container1 img{
        height: 100%;
        width: auto;
        border-radius: 50%;
        padding: 10px;
    }
    .container1 span{
        position: absolute;
        top: 2%  !important;
        left: 6% !important;
    }
    .telphone{
        width: 100% !important;
        border-bottom: 1px solid orange;
        height: 50px;
        padding-left: 19px;
        line-height: 50px;    
    }
    .address{
        width: 100% !important;
        border-bottom: 1px solid orange;
        height: 50px;
        padding-left: 22px !important;
        line-height: 50px !important; 
        margin-left: -3px !important; 
    }
    .container{
        margin-left: 0 !important;
        margin-top: 0 !important;
    }
   
</style>


