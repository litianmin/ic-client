import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'
import WxAuth from './views/usr/auth/wxAuth.vue'
import store from './store'
import utils from './common/utils.js'

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
      component: WxAuth
    },

    {
      // 基本验证界面，手机验证
      path: '/auth/base',
      name: 'auth_base',
      component: () => import('./views/usr/auth/baseAuth.vue')
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
 
    // 下面是游戏界面了
    {
      path: '/game/list',
      name: 'game-list',
      component: () => import('./views/game/list.vue')
    },

  ],
})


// # 如果不知道to 是什么，可以console一下
// 每次用户进来的时候判断用户是否已经登录
// router.beforeEach((to, from, next) => {
//   // 判断用户是否退返到授权页，并且已经是登陆的状态， 那么返回首页
//   if(to.path == '/auth' && store.state.mdeLogin.usrInfo.isLogin){
//     next('/')
//     return
//   }

//   // 第一次进入项目， 即登陆状态为空， 并且进入的不是登陆界面
//   // 记录用户进来的路径， 当授权成功的时候跳转到这个地址
//   if(!store.state.mdeLogin.usrInfo.isLogin && to.path != '/auth'){
//     utils.cookieObj.setCookie("beforeLoginURL", to.fullPath, 's100')
//     next('/auth')
//     return
//   }

//   next()
// })

  // 判断浏览器是微信内置浏览器 还是 普通浏览器
  // 1，如果是微信浏览器，跳转到微信授权页面
  // 2，如果是普通浏览器，跳转到注册登陆页面
  router.beforeEach((to, from, next) => {
    // 判断用户是否退返到授权页，并且已经是登陆的状态， 那么返回首页
    if((to.path == '/auth' || to.path == '/auth/base') && store.state.mdeLogin.usrInfo.isLogin){
      next('/')
      return
    }

    // 第一次进入项目， 即登陆状态为空， 并且进入的不是登陆界面
    // 记录用户进来的路径， 当授权成功的时候跳转到这个地址
    if(!store.state.mdeLogin.usrInfo.isLogin && to.path != '/auth' && to.path != '/auth/base'){

      let isWxBrowser = utils.isWxBrowser()
      if(isWxBrowser === true) {
        utils.cookieObj.setCookie("beforeLoginURL", to.fullPath, 's1000')
        next('/auth')
        return
      }else{
        utils.cookieObj.setCookie("beforeLoginURL", to.fullPath, 's1000')
        next('/auth/base')
        return
      }

      // utils.cookieObj.setCookie("beforeLoginURL", to.fullPath, 's100')
      // next('/auth')
      // return
    }

    next()
  })

export default router