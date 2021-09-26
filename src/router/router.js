import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: ()=>import('../components/Articles/AppArticleList')
  },
  {
    path: '/search',
    name:'Search',
    component: ()=>import('../components/Articles/AppCategoryArticle')
  },
  {
    path:'/article/:slug',
    name:'Article',
    component: ()=>import('../components/Articles/AppArticle')
  },
  {
    path:'/user/:login',
    name:'User',
    component: ()=>import('../components/User/AppUser')
  },
  {
    path: '/login',
    name: 'Login',
    component: ()=>import('../components/Authentication/AppLogin')
  },
  {
    path: '/register',
    name: 'Regsiter',
    component: ()=>import('../components/Authentication/AppRegister')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
export default router
