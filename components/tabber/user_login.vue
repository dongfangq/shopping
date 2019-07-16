<!-- 一个vue组件就是一个网页，包括HTML模板、js、样式 -->
<!-- 1.创建HTML模板 -->
<template>
    <div class="user_login">
            <mt-navbar fixed>
                    <mt-tab-item id="1"><router-link to="/index">首页</router-link></mt-tab-item>
                    <mt-tab-item id="2"><router-link to="/biye">毕业季</router-link></mt-tab-item>
                     <mt-tab-item id="3"><router-link to="/shopcar">我的购物车</router-link></mt-tab-item>
            </mt-navbar>
        <mt-header class="header" title="欢迎登陆"></mt-header>

  <!-- 顶部导航栏 -->

        用户名：<input type="text" placeholder="请输入用户名" class="uname" v-model="uname">
        密码：<input type="password" placeholder="请输入密码" class="upwd" v-model="upwd">
        <!-- v-model="upwd"双向绑定 -->
        <mt-button class="denglu" @click=btnLogin>登陆</mt-button>
        <!-- <button class="denglu" @click=btnLogin>登录</button> -->
        <mt-button class="zhuce" @click="register">注册</mt-button>
        
    </div>
</template>
<!-- 创建javascript -->
<script>
    //在export之前引入项目中需要的组件
import {Toast} from "mint-ui"
    export default{
        data(){
            return{
                //模板中显示的数据就是在这里写滴哦
                // 双向绑定的目的是获取用户输入的信息
                // 声明变量
                // 双向绑定用户名
                uname:"",
                // 双向绑定密码
                upwd:""
                // 
            }      
        },
        methods:{
            register(){
                this.$router.push({
                    path:"/user_register"
                })
            },
            handleChange(){

            },
            btnLogin(){
               
               
                 // console.log(1)测试   成功 
                //   // 1.获取用户输入的用户名和密码
                  var uname=this.uname;
                  var upwd=this.upwd;
                //  console.log(uname+upwd)//测试 成功
               
                // //  2.创建正则表达式，判断用户输入的信息是否合法
                // // 3.验证用户名如果失败，提示用户信息
                // // 验证密码失败，提示错误信息
                // // 用户名  字母下划线3~8
                // // 密码  数字  3~8
                 var ureg=/^[a-z0-9]{3,8}$/
                 if(!ureg.test(uname)){
                     Toast("用户名格式不正确")
                //     // return的目的是当用户名输入不正确时，请求就没有必要发
                    return;
                //     // console.log("验证失败") 测试 成功
                 }
                 var preg=/^[0-9]{3,8}$/
                 if(!preg.test(upwd)){
                     Toast("密码格式不正确")
                     return;
                 }
                // // 5.验证如果通过发送aiax请求给服务器
                var url = "http://127.0.0.1:3000";
       url+="/user_login?uname="+uname+"&upwd="+upwd;
                 
                // // 6.获取返回结果
                 this.axios.get(url).then(result=>{
                    //    测试  成功
                    //  console.log("服务器返回结果") 测试  成功
                    if(result.data.code==1){
                        Toast("登录成功");
                     
                        var a=result.data.data[0]
                        var uid=a.uid
                        var uname=a.uname
                        sessionStorage.setItem("uid",uid)
                        sessionStorage.setItem("uname",uname)
                        // 提示登录成功后，要跳转到登录成功页面     
                    }else{
                        Toast("登录失败")
                    }
                 })
                // 7.提示 登录成功或者用户名或密码有误
            }
        }
    }
</script>
<!-- 3.样式 -->
<style>
    /* 这里写模板的样式 */
    *{
        margin:0;
        padding:0;
    }
    .user_login .header{
        margin-top: 46px;
    }
    .app-container{
        padding: 0;
    }
    .user_login .uname{
        width:80%;
        margin-top: 10%
    }
    .user_login .upwd{
        width:80%;
        margin-left: 4%
    }
    .user_login .denglu{
        width:15%;
        margin-left: 30%
    }
    .user_login .zhuce{
        width:15%;
        margin-left: 10%
    }

</style>