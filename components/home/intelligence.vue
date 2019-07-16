<template>
    <div>
        <mt-header title="智能家电"></mt-header>
    <div class="app-intelligence">
        
        <div  class="intelligence-items" v-for="item of list">
            <img src="http://127.0.0.1:3000/peijian6.png" alt="">
            <h4>{{item.lname}}</h4>
            <h4>{{item.price}}</h4>
        </div>
        <mt-button class="btn" @click=loadMore type="primary">加载更多</mt-button>
    </div>
    </div>
</template>
<script>
    import {Toast} from "mint-ui"
    export default{
        data(){
            return{
                list:[],
                pno:1,
                hasMore:true

            }
        },
        created() {
            var url="http://127.0.0.1:3000/intelligence"
            this.axios.get(url).then(result=>{
                this.list=result.data.data 
            })
        },
        methods:{
            loadMore(){
                if(this.hasMore==false){
                    Toast("已经是最后一页了")
                    return
                }
                // console.log(1123)测试成功
                // 加载下一页数据
                // 1.创建URL请求地址
               var pno=++this.pno
                var url="http://127.0.0.1:3000/intelligence?pno="+pno
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
            }
        }
    }
</script>
<style>
    .app-intelligence{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;

    }
    .app-intelligence .intelligence-items{
        width: 49%;
         display: flex; 
        padding: 4px;
        text-align: center;
        margin:2px 0;
        flex-direction: column;
    }
    .app-intelligence .intelligence-items img{
        width: 100%;
        /* display: flex; */
    }
    .app-intelligence .btn{
        margin-left: 35%;
    }
</style>