import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=>import('../components/Articles/AppArticleList')
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
