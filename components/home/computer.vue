<template>
    <div class="app-computer">
        <mt-header title="电脑列表"></mt-header>
        <div class="computers-item" v-for="item of list">
            <img src="http://127.0.0.1:3000/pinpai5.png" alt="">
            <h4>{{item.lname}}</h4>
            <h4>{{item.price}}</h4>
            
        </div>
        <mt-button class="btn" type="primary" @click=loadMore>加载更多</mt-button>
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

            }
        },
        created(){
            // 使用ajax访问后台数据
            var url="http://127.0.0.1:3000/getComputerList"
            this.axios.get(url).then(result=>{
                this.list=result.data.data

            })

        },
        methods:{
            loadMore(){
                if(this.hasMore==false){
                    Toast("已经是最后一页了");
                    return
                }
                var pno=++this.pno
                var url="http://127.0.0.1:3000/getComputerList?pno="+pno
                this.axios.get(url).then(result=>{
                    this.list=this.list.concat(result.data.data)
                    if(pno>=result.data.pageCount){
                        this.hasMore=false;
                    }
                })
            }
        }
    }
</script>
<style>
    .app-computer .computers-item{
        width:99%;
        padding:4px;
        margin:2px 0;
        display: flex;/*弹性布局*/
        flex-direction: column;/*排列方式*/
        text-align: center;
    }
    .app-computer .btn{
        margin-left: 35%
    }
  
</style>