<template>
    <div class="container">
         <mt-navbar fixed>
                    <mt-tab-item id="1"><router-link to="/index">首页</router-link></mt-tab-item>
                    <mt-tab-item id="2"><router-link to="/user_login">登录</router-link></mt-tab-item>
                     
            </mt-navbar>
        <mt-header class="header" title="欢迎注册"></mt-header>
        用户名：<input type="text" placeholder="请输入用户名" class="uname" v-model="uname">
        密码：<input type="password" placeholder="请输入密码" class="upwd" v-model="upwd">
        确认密码：<input type="password" placeholder="请输入确认密码" class="reupwd" v-model="reupwd">
        联系方式：<input type="text" placeholder="请输入联系方式" class="telphone" v-model="telphone">
        地址：<input type="text" placeholder="请输入收货地址" class="address" v-model="address">

        <mt-button class="denglu" @click="btnLogin">点击注册</mt-button>
       
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return{
            uname:"",
            upwd:"",
            reupwd:"",
            telphone:"",
            address:"",
        }
    },
    methods:{
        btnLogin(){
            // 1.先获取用户输入的各个值
            var uname=this.uname
            var upwd=this.upwd
            var reupwd=this.reupwd
            var telphone=this.telphone
            var address=this.address
            console.log(uname,upwd,reupwd,telphone,address)   
            if(uname==""){
                Toast("用户名不能为空")
                return;
            }else if(upwd==""){
                Toast("密码不能为空")
                return;
            }else if(reupwd==""){
                Toast("确认密码不能为空")
                return;
            }else if(telphone==""){
                Toast("联系方式不能为空")
                return;
            }else if(address==""){
                Toast("地址不能为空")
                return;
            }else if(upwd!=reupwd){
                Toast("密码不一致")
                return;
            }else{
                // console.log("输入合格")
                // 用户输入都合格，向数据库中插入数据
                var url="http://127.0.0.1:3000/user_add?uname="+uname+"&upwd="+upwd+"&telphone="+telphone+"&address="+address
                this.axios.get(url).then(result=>{
                    console.log(result.data.data)
                    Toast(result.data.data)
                })
            }
        }

    }
}
</script>
<style>
.container .uname{
    width: 75%;
    margin-left: 14px;
    margin-top: 10%;
}
.container{
    margin-left: 20px;
}
.container .upwd{
    width:74%;
    margin-left: 9%
}
.container .reupwd{
    width: 73%;
}

.container .denglu{
        width:50%;
        margin-left: 25%
    }
     .container .telphone{
         width: 74%;
     }
      .container .address{
          width: 74%;
          margin-left: 33px;
      }
</style>


