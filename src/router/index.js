import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Scholar from '../views/Scholar'
import Search from "@/views/Search";
import Portrait from "@/views/Portrait";
// import App from "@/App.vue";
import Index from "../views/Index";
import Relation from "@/views/Relation";
Vue.use(VueRouter)

const routes = [
//    新页面 Scholar.vue
//   {
//     path: '/scholar',
//     name: 'Scholar',
//     component: Scholar
//   },
  {
    path: '/',
    name: '导师推荐',
    component: Index,
    redirect:"/search",
    children:[
      {
        path: '/search',
        name: '综合检索',
        component: Search
      },
      {
        path: '/portrait',
        name: '导师画像',
        component: Portrait
      }
    ]
  },
  {
    path: '/',
    name: '党派人物',
    component: Index,
    redirect:"/person",
    children:[
      {
        path: '/relation',
        name: '人物关系',
        component: Relation
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
