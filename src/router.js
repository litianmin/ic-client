import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'
import WxAuth from './views/usr/auth/wxAuth2.vue'
import store from './store'
import utils from './common/utils.js'


import GameList from './views/game/list.vue'


Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/mytest',
      name: 'mytest',
      component: WxAuth
    },
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
      component: GameList
    },
    { // 游戏详情页
      path: '/game/detail/:gameid',
      name: 'game-detail',
      component: () => import('./views/game/detail.vue')
    },
    { // 游戏新建评论
      path: '/game/newcomment/:gameid',
      name: 'game-newcomment',
      component: () => import('./views/game/newComment.vue')
    },
    { // 评论详细内容
      path: '/game/commentDetail/:commentid',
      name: 'game-comemntdetail',
      component: () => import('./views/game/commentDetail.vue')
    },
    { // 回复评论
      path: '/game/replytoComment',
      name: 'replyto-comment',
      component: () => import('./views/game/replyToComment.vue')
    },
    { // 游戏创建组队
      path: '/game/formteam/:gameid',
      name: 'game-formteam',
      component: () => import('./views/game/formTeam.vue')
    },  
    { // 进入组队详情
      path: '/game/teamDetail/:teamid',
      name: 'team-detail',
      component: () => import('./views/game/teamDetail.vue')
    },
    { // 加入组队界面
      path: '/game/joinTeam/:teamid',
      name: 'team-join',
      component: () => import('./views/game/joinTeam.vue')
    },
    {
      path: '/game/teamchat',
      name: 'team-chat',
      component: () => import('./views/game/teamChat.vue')
    },


    // party 模块
    { // party 组队列表
      path: '/party/list',
      name: 'party-list',
      component: () => import("./views/party/list.vue")
    },
    { // 创建一个新的party组队
      path: '/party/newTeam',
      name: 'party-newteam',
      component: () => import('./views/party/newTeam.vue')
    },
    { // party 队伍详情
      path: '/party/teamDetail/:teamID',
      name: 'party-teamDetail',
      component: () => import('./views/party/teamDetail.vue')
    },
    { // 发表聊天界面
      path: `/party/newChat`,
      name: 'party-newChat',
      component: () => import('./views/party/newChat.vue')
    },

    // 旅游模块
    { // 旅游列表
      path: '/travel/list',
      name: 'travel-list',
      component: () => import('./views/travel/list.vue')
    },
    {
      path: '/travel/newTeam',
      name: 'travel-newTeam',
      component: () => import('./views/travel/newTeam.vue')
    },
    {
      path: '/travel/teamDetail/:teamID',
      name: 'travel-teamDetail',
      component: () => import('./views/travel/teamDetail.vue')
    },
    {
      path: '/travel/newChat',
      name: 'travel-newChat',
      component: () => import('./views/travel/newChat.vue')
    },


    // 文章模块
    {
      path: '/article/detail/:articleID',
      name: 'article-detail',
      component: () => import('./views/article/detail.vue')
    },
    {
      path: '/article/newChat',
      name: 'article-newChat',
      component: () => import('./views/article/newChat.vue')
    },


    // 活动模块
    {
      path: '/activity/detail/:activityID',
      name: 'activity-detail',
      component: () => import('./views/activity/detail.vue')
    },
    {
      path: '/activity/newChat',
      name: 'activity-newChat',
      component: () => import('./views/activity/newChat.vue')
    },

    // 即时模块
    { // 新的组队
      path: '/instant/newTeam',
      name: 'instant-newTeam',
      component: () => import('./views/instant/newTeam.vue')
    },
    { // 即时组队列表
      path: '/instant/list',
      name: 'instant-list',
      component: () => import('./views/instant/list.vue')
    },
    { // 队伍详情
      path: '/instant/detail/:teamID',
      name: 'instant-detail',
      component: () => import('./views/instant/detail.vue')
    },
    { // 新的聊天
      path: '/instant/newChat',
      name: 'instant-newChat',
      component: () => import('./views/instant/newChat.vue')
    },

    { // 通知模块
      path: '/notify/category',
      name: 'notify-category',
      component: () => import('./views/notify/category.vue')
    }

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

    // localStorage.clear()

    // 第一次进入项目， 即登陆状态为空， 并且进入的不是登陆界面
    // 记录用户进来的路径， 当授权成功的时候跳转到这个地址
    if(!store.state.mdeLogin.usrInfo.isLogin && to.path != '/auth' && to.path != '/auth/base'){

      let isWxBrowser = utils.isWxBrowser()
      // alert(isWxBrowser)
      // return
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