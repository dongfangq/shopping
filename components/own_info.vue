<template>
<div class="div-container">
    <!-- 返回图标 -->
    <router-link to="/shopcar"> <a class="active" id="abc"><span class="mui-icon-extra         mui-icon-extra-arrowleftcricle"></span></a>
        </router-link>
    <div> 
    <!-- 全部元素都要放在一个div里 -->
        <mt-header title="确认订单"></mt-header>
        <div class="shouhuo">
            <div class="reseiver">收货人:{{this.list1.uname}}</div>
            <div class="shouhuoren">
            联系方式：<input id="input1" type="text" :value="this.list1.telphone">
            </div>
        </div>
        <div class="shouhuo_address">
            <div class="address">收货地址</div>
            <div class="address_details">
                <textarea name="" id="" cols="30" rows="10" id="text2" >{{this.list1.address}}</textarea>
            </div>
        </div>
        </div>
        <div>商品</div>
        <div class="wider">
            <div class="product" v-for="item of this.list" :key="item.id">
                <img :src=item.pic alt="">
                <div class="product_detail">
                    <div class="product_name">{{item.pname}}</div>
                    <div class="product_price">￥{{item.price}}</div>
                    <div class="product_count">数量：{{item.count}}</div>
                    <div class="sum">总计：{{item.price*item.count}}</div>
        </div>
    </div>
  </div>
    <div>
        <div class="soler"> 
            卖家留言：
            <textarea type="text" placeholder="顺丰邮，谢谢" id="text1"></textarea>
        </div>
    </div>
    <div class="aa">
        <div class="heji">合计：￥{{sum}}</div>
        <div class="buy" @click="buy">购买</div>
    </div>
</div>
</div>
</template>
<script>
 import {Toast} from "mint-ui"
export default {
    data(){
        return{
            list:"",
            sum:0,
            uname:"",
            list1:""

        }

    },
    created() {
    this.loadMore()
},
    methods:{
        loadMore(){
            var uname=sessionStorage.getItem("uname")
            this.uname=uname
            var uid=sessionStorage.getItem("uid")
            if(uid==null){
                Toast("请先登录")
                return
            }
            var url="http://127.0.0.1:3000/user_information?uid="+uid
            this.axios.get(url).then(result=>{
                console.log(result.data.data)
                this.list=result.data.data
                 var b=0
                //  console.log(this.list)
            for(var a=0;a<this.list.length;a++){
                b+=this.list[a].price*this.list[a].count

            }
            // console.log(b)
            console.log(this.list)
            this.sum=b
            })
        //    查找用户信息
        var url="http://127.0.0.1:3000/user_info"
        this.axios.get(url).then(result=>{
            console.log(result.data.data[0])
            this.list1=result.data.data[0]
        })
    
        },
        buy(){
            if(this.list.length==0){
                Toast("请先选择商品")
                return
            }
            var text=document.getElementById("text1").value
            // console.log(text)
            var address=document.getElementById("text2").value
            console.log(address)
            var telphone=document.getElementById("input1").value
            console.log(telphone)
            // 用户点击购买按钮，首先将数量更新到this.list的count中
                // 首先获取到页面中
            // 将数据插入一个新表中，
            // 创建一个变量，来保存ids 和counts
            var ids=[]
            for(var a=0;a<this.list.length;a++){
                ids.push(this.list[a].pid)
            }
            var counts=[]
            for(var a=0;a<this.list.length;a++){
                counts.push(this.list[a].count)
            }
            // console.log(ids)
            // console.log(counts)
            var url="http://127.0.0.1:3000/buy?id="+ids+"&count="+counts+"&liuyan="+text+"&address="+address+"&telphone="+telphone
            this.axios.get(url).then(result=>{
                    console.log(result.data.msg)
                    
                    Toast(result.data.msg)
                    this.$router.push({
                        path:"/index"
                    })
                })
        }        
    }
    
}
</script>
<style>
#input1{
    width: 200px;
}
#abc{
    position: absolute;
    z-index: 110;
    margin-left: 11px;
    margin-top: 8px;
    color: white;
    font-size: 29px !important;
}
textarea{
    height: 70px !important;
}
.buy{
    /* display: flex; */
    /* border: 1px solid red; */
    height: 43px;
    width: 70px;
    line-height: 43px;
    text-align:center;
    background: orange;
    margin-top: 5px;
    margin-left: 110px;
}
.aa{
    /* height: 103%; */
    width: 100%;
    display: flex;
    position: fixed;
    bottom: 10px;
    height: 55px;
    /* border: 1px solid red; */
    background: white;
   
}
.wider{
    background: #f4f4f4;
    /* height: 101px; */
    margin-bottom: 100px;
}
.heji{
    margin-top: 20px;
    margin-left: 30px;
    color: red;
    width: 150px
}
.soler{
    margin-top: 20px;
    margin-left: 30px;
    margin-bottom: 81px;
}
.sum{
    color: orange
}
.product_count{
    font-size: 14px;
}
.product_price{
    color: orange;
}
.product_name{
    font-size: 14px;
}
.product_detail{
    margin-left: 15px;
}
.product{
    /* border: 1px solid red; */
    margin-left: 16px;
    display: flex;
}
.product img{
    width: 30%;
    height: 20%;
}
.shouhuo_address{
    margin-top: 5px;
    margin-left: 30px;
}
.address{
    margin-bottom: 10px;
    
}
.address_details{
    width: 92%;
}
.shouhuo{
    display: flex;
    justify-content: space-around;
    background:#e4e4e4;
    margin-top: 10px;
    flex-direction: column;
    padding-left: 30px;
}
    .reseiver{
        height: 50px;
        margin-left: 30px;
        /* border: 1px solid red; */
        line-height: 50px;
    }
    .shouhuoren{
        height: 50px;
        /* border: 1px solid red; */
        line-height: 50px;
        margin-right: 39px;
    }
   
</style>


