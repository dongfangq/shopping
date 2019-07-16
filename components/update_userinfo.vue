<template>
    <div class="container">
        <mt-navbar fixed>
                    <mt-tab-item id="1"><router-link to="/index">首页</router-link></mt-tab-item>
                    <mt-tab-item id="2"><router-link to="/biye">毕业季</router-link></mt-tab-item>
                    <mt-tab-item id="3"><router-link to="/shopcar">我的购物车</router-link></mt-tab-item>
                    <mt-tab-item id="4" data-toggle="abc"><div @click="tiaozhuan1" id="login">{{inner}}</div></mt-tab-item>
            </mt-navbar>
         
         <div class="uname">
             <span>姓名：</span><input type="text" :value="user_info.uname" id="uname">
         </div>
         <div class="telphone">
            <span>联系方式：</span> 
             <input type="text" :value="user_info.telphone" id="telphone">
         </div>
         <div class="address">
            <span> 地址：</span>
             <input type="text" :value="user_info.address" id="address">
         </div>
    <mt-button type="primary" size="large" @click="update">点击完成个人信息的修改</mt-button>

    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            user_info:""

        }
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
        update(){
            // 向用户表发请求和传参数，完成对用户表的修改
            var uname=document.getElementById("uname").value
            var tel=document.getElementById("telphone").value
            var address=document.getElementById("address").value
            var url="http://127.0.0.1:3000/xiugai_userinfo?uname="+uname+"&telphone="+tel+"&address="+address
            // 获取用户名文本框的信息
            this.axios.get(url).then(result=>{
                console.log(result.data.data)
                var msg=result.data.data
                Toast(msg)
                // this.$router.push({
                //     path:"/index"
                // })
            })
        }
    },
        created(){
       this.load(),
       this.load1()
    },
}
</script>
<style>
   /* .container1{
        width: 100%;
        height: 100px;
        /* border:1px solid red;
        border-bottom:1px solid orange;
        margin-top: 46px;
    } */
    .container{
        margin-top: 90px !important;
    }
    .container1 img{
        height: 100%;
        width: auto;
        border-radius: 50%;
        padding: 10px;
    }
 /* .container1 span{
     position: absolute;
     top: 20%;
 } */
 .container .container1 span{
     display: inline-block;
     position: absolute;
     top: 13%;
 }
 .uname{
     display: flex;
 }
 .telphone{
     display: flex;
 }
 .address{
     display: flex;
 }
 .container span{
     display: inline-block;
     margin-top: 10px;
     width: 136px;
 }
 #uname{
     margin-left: -32px;
     margin-right: -18px;
 }
 .telphone input{
     margin-right: -31px;
     margin-left: -16px;
 }
 .address input{
     margin-left: -52px;
 }
</style>


