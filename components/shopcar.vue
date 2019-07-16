<template>
    <div class="app-shopcar">
            <mt-navbar>
                    <mt-tab-item id="1"><router-link to="index">首页</router-link></mt-tab-item>
                     <mt-tab-item id="2"><router-link to="biye">毕业季</router-link></mt-tab-item>
                     <mt-tab-item id="3"><router-link to="shopcar">我的购物车</router-link></mt-tab-item>
                       <mt-tab-item id="4" data-toggle="abc"><div @click="tiaozhuan" id="login">{{inner}}</div></mt-tab-item>
             </mt-navbar>
        <mt-header title="我的购物车"></mt-header>	
<!-- 购物车使用media组件 -->
<ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for="(item,i) of list" :key="item.id">
            <a href="javascript:;">
                <img class="mui-media-object mui-pull-left" :src="item.pic">
                <div class="mui-media-body">
                    <input type="checkbox" :checked="item.cb" :data-i="i" id="check_singel" @change="modifyItem">
                   <span id="pname">{{item.pname}}</span> 
                    
                    <span id="price">￥{{item.price}}</span>
                    <!-- 点击按钮可实现对数量的加减，总价也会跟着变 -->
                    <div class="mui-numbox">
                            <button class="mui-btn mui-btn-numbox-minus" type="button" @click="suplus($event)" :data-toggle=count :data-id=i>-</button>
                            <span id="count" ref="menuItem">
                                {{item.count}}
                            </span>
                            <button class="mui-btn mui-btn-numbox-plus" type="button" @click="add" :data-id=i>+</button>
                        </div>
                 <input type="button" value="删除" @click=deleteshop :data-id="item.id" :checked="item.cb" id="delsigle"/>
                </div>
            </a>
        </li>
        </ul>
        <input type="checkbox" style="margin-top:10%;margin-left:10%" @click=checkAll :checked="allcb">全选
        <mt-button type="danger" style="margin-left:58%;margin-top:-10%" @click=delM>删除所选商品</mt-button>  
        <div class="mui-card" >
			<div class="mui-card-content">
                <div class="jine">
                    <span> 共几件 金额：</span>
                   <span id="sum">{{sum}}</span>元
                </div>
                <router-link to="/index">
                <div class="continue">继续购物</div>
                </router-link>
                <div class="jiesuan" @click="jiesuan($event)" data-id=i>去结算</div>
			</div>
		</div> 
    </div>
    
</template>
<script>
    import {Toast} from "mint-ui"
    import {MessageBox} from "mint-ui"
    export default{
        data(){
            return{
                list:[],
                count:1,
                allcb:false,
                sum:"",
                inner:"登录/注册"
            }
        },
created() {
    this.loadMore()
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







    hanshu(){
        var list = this.list
            // 1.便利所有商品
            var a=0
            for(var i=0;i<list.length;i++){
                a+=list[i].count*list[i].price
            }
            this.sum=a
    },
    jiesuan($event){
        // console.log(event)
        // 先获取页面各个商品的个数
            // console.log(this.list)
            if(this.list.length==0){
                Toast("请先选择商品")
                return
            }
            var list = this.list
            // 1.便利所有商品
            this.hanshu()
            var i=$event.target.dataset
            var ids=[]
            var counts=[]
            for(var item of this.list){
                ids.push(item.id)
                counts.push(item.count)
            }
            // console.log(ids)
            // console.log(counts)
            // console.log(i)
            // 点击去结算，应该向数据库更新数据
            var url="http://127.0.0.1:3000/update_cart?id="+ids+"&count="+counts
            this.axios.get(url).then(result=>{
                
                console.log(result)
                // 请求成功后，跳转到个人信息页面，并把商品id传递过去，
                    // 1.需要判断是否登录,只有登录成功了,才能实现跳转
                    var uid=sessionStorage.getItem("uid")
                    if(uid==null){
                        Toast("请先登录")
                    }else{
                        this.$router.push({
                            path:"/own_info"
                })
                    }
                
            }).catch(function(err){
                console.log(err)
            })
        // this.$router.push({
        //     path:'/own_info',query:{id:i}
        // })
       

    },
    modifyItem(e){
           //功能:如果用户选中商品，将当前商品对应对象
        //     cb=true
        //     如果用户取消选中 将当前商品对应对象
        //     cb=false 50
        //1:获取当前元素选中状态
        var cb = e.target.checked;
        // console.log(cb)
        //2:获取当前元素对应商品对象
        //2.1:获取当前元素下标   01
        var i = e.target.dataset.i;
        //2.2:将数组下标对象
        this.list[i].cb = cb;
        //3:修改商品对象cb 属性
        
        //4:修改全选状态 true fales  17:32
        //4.1:如果完成  累加计算
        //4.2:创建变量count 保存累加和
        var count = 0;
        //4.3:创建循环遍历所有元素
        //4.4:获取cb如果值等于true count++
        for(var item of this.list){
            if(item.cb){
              count++;
            }
        }
       
        //4.5:如果count个数与数组长度一致
        if(count==this.list.length){
          //console.log("全选选中");
          this.allcb = true
        }else{
          //console.log("全选消空");
          this.allcb = false;
        }
        //4.6:将全选复选框选中
        //4.7:否则清空全选复选框
    },
    //点击-按钮，实现数据的减1
    suplus($event){
        console.log($event.target.dataset)
        // 获取当前元素的下表
        var id=$event.target.dataset.id
        console.log(10)
        console.log(this.list[id].count)
        // console.log($event.currentTarget.nextElementSibling.innerHTML)
        var inner=$event.currentTarget.nextElementSibling.innerHTML
        var a=--inner
        console.log(a)
        if(a<1){
            $event.currentTarget.nextElementSibling.innerHTML=1
            this.list[id].count= $event.currentTarget.nextElementSibling.innerHTML
        }else{
        $event.currentTarget.nextElementSibling.innerHTML=a 
        this.list[id].count= $event.currentTarget.nextElementSibling.innerHTML
        }
        // 
        //先获取span内的值
        // var count=e.target.dataset.toggle
        //将商品的数量给data中的数据
        // --count;
        
      if(this.count<0){
          this.count==1
      }
        // console.log(this.count)
        this.hanshu()
    },
    add($event){
        var id=$event.target.dataset.id
        var inner=$event.currentTarget.previousElementSibling.innerHTML
        console.log(inner)
        var a=++inner
        console.log(a)
        $event.currentTarget.previousElementSibling.innerHTML=a 
        this.list[id].count=a
        console.log(this.list)
        this.hanshu()
        
    },
    // 删除选中的指定商品
    delM(){
        MessageBox.confirm("您确定要删除指定商品吗？").then(action=>{
            // 用户按了确认键，就执行这里的代码
            // console.log("你按了确认键") 测试 成功
            // 如果要删除指定商品，需要判断当前商品的复选框的状态是否为true，而且要找到当前商品的id
            // 1.先设置一个变量,用于拼接id的字符串
             var ids=""
             
            //  遍历list,找出所有被选
            console.log(this.list)
             for(var item of this.list){
        if(item.cb){
            ids+=item.id+","
        }
        console.log(item.id)
        
    }
   
    if(ids.length==0){
        Toast("请选中要删除的商品")
        return;
    }
    // 将ids的最后一个逗号去掉，这一步是一定要有的
    ids=ids.substring(0,ids.length-1);
    console.log(ids)
    // console.log(ids)测试 成功
    // 发送ajax请求
    var url="http://127.0.0.1:3000/deleteM?ids="+ids
    this.axios.get(url).then(result=>{
        if(result.data.code==1){
            Toast("删除成功")
           this.loadMore()
        }else{
            Toast("删除失败")
        }
    })
        }).catch(result=>{
            // 用户按了取消键则执行这里的代码
            // console.log("你按了取消键") 测试 成功
            return;
        })
        
    },


    // 全选
    checkAll(e){
        console.log("我是全选")
        // 先获取当前复选框的选中状态
        var cb=e.target.checked
        // 遍历所有商品的选中状态
        for(var item of this.list){
            // 将复选框的选中状态赋值给每个商品
            item.cb=cb;
           
        }
        this.allcb = cb;
        // console.log(this.list)
        
         
    },
    // 商品前面的单选按钮
   
    loadMore(){
        // 先将购物车uid为2的商品显示出来
        // 成功显示
        var uid=sessionStorage.getItem("uid")
        console.log(uid)
        if(uid==null){
            Toast("请先登录")
            return;
        }
        var url="http://127.0.0.1:3000/shopcar?uid="+uid
        // console.log(123)测试  成功

        this.axios.get(url).then(result=>{
// 判断用户是否登录成功,登录成功才能查看购物车
// if(result.data.code<1){
//     Toast("请先登录")
//     return;
// }
            // 为每个item添加属性cb，即选中状态
        // 1.先获得list数据
        var rows=result.data.data;
        // 通过遍历为每个复选框添加属性cb
     for(var item of rows){
            item.cb=false
        }
        // 将添加新属性的rows,赋值回全局变量
        this.list=rows;
    // 只有请求成功后才能执行计算综合操作啊
          // 获取页面相应元素的值
        // 把值相加起来，并赋值给sum
       this.hanshu()


        })
  
       
    },
    // 用户在删除商品时，需要提示用户再确认是否要删除商品，用组件MessageBox组件
    deleteshop(e){
        // 删除的是购物车的商品，所以要从模板中动态获取用户选中的商品
        var id=e.target.dataset.id
        // console.log(id)测试  成功
        // 确认用户是否确认删除该商品
        MessageBox.confirm("是否确认删除该商品？").then(action=>{
            var url="http://127.0.0.1:3000/deleteshop?id="+id
            this.axios.get(url).then(result=>{
            if(result.data.code==1){
               Toast("删除成功")
                this.loadMore()
            }else{
                Toast("删除失败")
            }
            
        })
        }).catch(result=>{
            return
        })     
    }
}
    }
</script>
<style scoped>
#sum{
    color: #ff6700;
    font-weight: 700;
    font-size: 20px
}
.mui-card-content{
    
    height: 68px;
    bottom: 0px;
    position:fixed;
    width: 95%;
    background: white;
    display: flex;
}
.mui-card-content .jine{
    width: 33%;
    
    text-align: center;
    /* line-height: 10px */
    margin-top: 17px;
}
.mui-card-content .continue{
    width: 203%;
    border: 1px solid #f4f4f4;
    line-height: 65px;
    text-align: center;
    background: #f4f4f4
}
.mui-card-content .jiesuan{
    line-height: 65px;
    width: 34%;
    text-align: center;
    background: #ff6700;
    margin-left: 57px;
}
#delsigle{
    margin-left:5px;
}
#count{
    display:inline-block;
    margin-top:10px;
    margin-left:14px;
}
#price{
    display:inline-block;
    position:absolute;
    left:84px;
    top:26px;
    margin-top:10px;
    color:#ff6700
}
#pname{
    display:inline-block;
    margin-left:7px;
    margin-right:10px;
    width:84px;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;
}
</style>