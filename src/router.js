import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'
import store from './store'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      // 登陆验证，判断用户是否已经登陆了
      path: '/auth',
      name: 'auth',
      component: () => import('./views/usr/auth/wxAuth.vue')
    },

    {
      path: '/test',
      name: 'test',
      component: () => import('./views/test/Test.vue')
    },

    {
      path: '/usr/login',
      name: 'login',
      component: () => import('./views/usr/login/Login.vue')
    },
    {
      path: '/usr/login/register',
      name: 'register',
      component: () => import('./views/usr/login/Register.vue')
    },
    {
      path: '/usr/login/checkin',
      name: 'checkin',
      component: () => import('./views/usr/login/Checkin.vue')
    },
    {
      path: '/mytest',
      name: 'mytest',
      component: () => import('./views/test/Test.vue')
    }
  ],
})


// 实现思路，token还是要保存到cookie里面去，设置过期时间， 如果
router.beforeEach((to, from, next) => {
  // 这里判断用户退返到授页，但是已经是登陆的状态
  // 那么默认返回首页
  if(to.path == '/auth' && store.state.usrInfo.isLogin){
    next('/')
    return false
  }

  // 第一次进入项目， 即登陆状态为空， 并且进入的不是登陆界面
  // 记录用户进来的路径
  if(!store.state.usrInfo.isLogin && to.path != '/auth'){
    store.commit('logBeforeLoginURL', to.fullPath)
    next('/auth')
    return false
  }

  next()
})

export default router