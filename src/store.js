import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usrWindowIsShow: false,
    usrInfo: {
      isLogin: false,
      usrAvatar: '',
      usrNickName: '',
      authToken: ''
    },
    beforeLoginURL: '',
  },
  mutations: {
    usrWindowToggle (state) {
      return state.usrWindowIsShow = !state.usrWindowIsShow
    },
    usrWxLogin (state, payload) {
      // 微信登陆，改变全局状态
      state.usrInfo.isLogin = true
      state.usrInfo.usrAvatar = payload.usrAvatar
      state.usrInfo.usrNickName = payload.usrNickName
      state.usrInfo.authToken = payload.wxAuthToken
      return
    },
    logBeforeLoginURL (state, bURL) {
      // 记录登陆之前进来的URL
      state.beforeLoginURL = bURL
    }
  },
  actions: {

  }
})
