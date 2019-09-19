import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'
import WxAuth from './views/usr/auth/wxAuth2.vue'
// import store from './store'
import utils from './common/utils.js'
import { getToken, setBeforeLoginURL } from './common/cookie.js'

import GameList from './views/game/list.vue'


Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/mytest',
      name: 'mytest',
      component: () => import('./views/test/Test.vue')
    },

    {
      path: '/mytest2',
      name: 'mytest2',
      component: () => import('./views/test/imgcrop.vue')
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
      component: () => import('./views/test/user.vue')
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
      path: '/usr/personInfo',
      name: 'user-personInfo',
      component: () => import('./views/usr/personInfo.vue')
    },

    {
      path: '/usr/jointeamList/:statustype',
      name: 'user-jointeamList',
      component: () => import('./views/usr/jointeamList.vue')
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


    // 文章模块
    {
      path: '/article/detail/:articleID',
      name: 'article-detail',
      component: () => import('./views/article/detail.vue')
    },


    // 活动模块
    {
      path: '/activity/detail/:activityID',
      name: 'activity-detail',
      component: () => import('./views/activity/detail.vue')
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

    // BEGIN 通知模块
    { // 通知模块
      path: '/notify/category',
      name: 'notify-category',
      component: () => import('./views/notify/category.vue')
    },

    { // 组队信息通知
      path: '/notify/teamMsg',
      name: 'notify-teamMsg', 
      component: () => import('./views/notify/team.vue')
    },
 
    { // 评论信息通知
      path: '/notify/commentMsg',
      name: 'notify-commentMsg',
      component: () => import('./views/notify/comment.vue')
    },

    { // 评论信息详情
      path: '/notify/commentDetail/:notifyID',
      name: 'notify-commentDetail',
      component: () => import('./views/notify/commentDetail.vue')
    },
    // END 通知模块

    {
      path: '/common/newChat',
      name: 'common-newchat',
      component: () => import('./components/NewChat.vue')
    }

  ],
})

  // 判断浏览器是微信内置浏览器 还是 普通浏览器
  // 1，如果是微信浏览器，跳转到微信授权页面
  // 2，如果是普通浏览器，跳转到注册登陆页面
  router.beforeEach((to, from, next) => {
    if(!!to.path === false) {
      next('/')
      return
    }
    // '/auth' 是微信授权， '/auth/base' 是手机号码授权
    // 判断用户是否退返到授权页，并且已经是登陆的状态， 那么返回首页
    if((to.path == '/auth' || to.path == '/auth/base') && !!getToken()){
      next('/')
      return
    }

    // 第一次进入项目， 即登陆状态为空， 并且进入的不是登陆界面
    // 记录用户进来的路径， 当授权成功的时候跳转到这个地址
    if(!!getToken() === false && to.path != '/auth' && to.path != '/auth/base'){

      let isWxBrowser = utils.isWxBrowser()
      
      setBeforeLoginURL(to.fullPath)  // 设置进来的url

      if(isWxBrowser === true) { // 如果是微信浏览器
        next('/auth')
        return
      }

      next('/auth/base')
      return
    }

    next()
  })

export default router