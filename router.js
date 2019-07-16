import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import user_login from "./components/tabber/user_login.vue" 
import GoodListphone from "./components/home/GoodListphone.vue"
import index from "./components/index.vue"
import computer from "./components/home/computer.vue"
import intelligence from "./components/home/intelligence.vue"
import e06 from "./components/e06.vue"
import shopcar from "./components/shopcar.vue"
import GoodListcomputer from "./components/GoodListcomputer.vue"
import GoodListappliance from "./components/GoodListappliance.vue"
import commodityphone from "./components/commodityphone.vue"
import computer_details from "./components/computer_details"
import appliance_details from "./components/appliance_details"
import GoodList_out from "./components/GoodList_out"
import GoodList_out_details from "./components/GoodList_out_details"
import router from "./components/router"
import route_details from "./components/route_details"
import dianyuan from "./components/dianyuan"
import dianyuan_details from "./components/dianyuan_details"
import biye from "./components/biye"
import biye_details from "./components/biye_details"
import own_info from "./components/own_info"
import own_center from "./components/own_center"
import update_userinfo from "./components/update_userinfo"
import user_register from "./components/user_register"

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',component:HelloContainer},
    {path:'/user_login',component:user_login},
    {path:'/GoodListphone',component:GoodListphone},
    {path:'/index',component:index},
    {path:'/computer',component:computer},
    {path:'/intelligence',component:intelligence},
    {path:'/e06',component:e06},
    {path:'/shopcar',component:shopcar},
    {path:'/GoodListcomputer',component:GoodListcomputer},
    {path:"/GoodListappliance",component:GoodListappliance},
    {path:"/commodityphone",component:commodityphone},
    {path:"/computer_details",component:computer_details},
    {path:"/appliance_details",component:appliance_details},
    {path:"/GoodList_out",component:GoodList_out},
    {path:"/GoodList_out_details",component:GoodList_out_details},
    {path:"/router",component:router},
    {path:"/route_details",component:route_details},
    {path:"/dianyuan",component:dianyuan},
    {path:"/dianyuan_details",component:dianyuan_details},
    {path:"/biye",component:biye},
    {path:"/biye_details",component:biye_details},
    {path:"/own_info",component:own_info},
    {path:"/own_center",component:own_center},
    {path:"/update_userinfo",component:update_userinfo},
    {path:"/user_register",component:user_register}
  ]
})
