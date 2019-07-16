import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 按需引入库中的组件
// import MintUI from 'mint-ui'
import {Header,Button} from 'mint-ui'
import {Swipe,SwipeItem} from 'mint-ui'
import {Navbar,TabItem} from 'mint-ui'
import {TabContainer, TabContainerItem } from 'mint-ui';
import {Search} from 'mint-ui';
import {Toast} from "mint-ui"
import {Tabbar} from 'mint-ui';



// 引入有赞组件
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use('Vant')
import { Field } from 'vant';
// import 'vant/lib/vant-css/index.css';
// import { Cell, CellGroup } from 'vant';
// import 'vant/lib/button/style';

// Vue.use(Cell).use(CellGroup);
// Vue.use(Field);
// import Button from 'vant/lib/button';
// import 'vant/lib/button/style';
import { Cell, CellGroup } from 'vant';

Vue.use(Cell).use(CellGroup);
Vue.use(Field);
import'mint-ui/lib/style.css'

Vue.config.productionTip = false
// 按需引入组件后，要对组件进行注册，注册完成后，项目中任何模板中都可以使用
Vue.component(Header.name,Header)
Vue.component(Button.name,Button)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Search.name,Search);
Vue.component(Toast.name,Toast);
Vue.component(Tabbar.name, Tabbar);


// 引入axios库三步
// 1.引入整个axios库,Wie了实现ajax实现请求
import axios from "axios"
// 2.配置跨域选项
axios.defaults.withCredentials=true;
// 3.将axios配vue实例中
Vue.prototype.axios=axios;
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;
//使用前，需要先引用（不仅仅是放在mui下 导入 MUI 的样式表， 和 Bootstrap 用法没有差别
import './lib/mui/css/mui.css'
// 导入 MUI 的样式表，扩展图标样式，购物车图标
// 还需要加载图标字体文件
import './lib/mui/css/icons-extra.css'
// import MUI from "mint-ui"
// Vue.use()
import './font/iconfont.css'
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
