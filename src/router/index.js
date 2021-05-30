import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Scholar from '../views/Scholar'
import Search from "@/views/Search";
import Portrait from "@/views/Portrait";
// import App from "@/App.vue";
import Index from "../views/Index";
import Relation from "@/views/Relation";
import personInfomation from "../views/personInfomation";
import MainSearch from "@/views/MainSearch";
import patentSearch from "@/views/patentSearch";
import Patent from "@/views/Patent";
Vue.use(VueRouter)

const routes = [

  {
    path: '/',
    name: '导师推荐',
    component: Index,
    redirect:"/search",
    children:[
      {
        path: '/mainsearch',
        name: '首页',
        component: MainSearch
      },
      {
        path: '/search',
        name: '导师检索',
        component: Search
      },
      {
        path: '/patent',
        name: '专利检索',
        component: Patent
      },
      {
        path: '/portrait',
        name: '导师画像',
        component: Portrait
      },
      {
        path: '/personInfomation/:id',
        name: '个人信息',
        component: personInfomation
      }
    ]
  },
  // {
  //   path: '/',
  //   name: '党派人物',
  //   component: Index,
  //   redirect:"/person",
  //   children:[
  //     {
  //       path: '/relation',
  //       name: '人物关系',
  //       component: Relation
  //     }
  //   ]
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
