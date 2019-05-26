import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     usrWindowIsShow: false,
//     usrInfo: {
//       isLogin: false,
//       usrAvatar: '',
//       usrNickName: '',
//       authToken: ''
//     },
//     beforeLoginURL: '',
//     wxAuthTp: 'base',
//   },
//   mutations: {
//     usrWindowToggle (state) {
//       return state.usrWindowIsShow = !state.usrWindowIsShow
//     },
//     usrWxLogin (state, payload) {
//       // 微信登陆，改变全局状态
//       state.usrInfo.isLogin = true
//       state.usrInfo.usrAvatar = payload.usrAvatar
//       state.usrInfo.usrNickName = payload.usrNickName
//       state.usrInfo.authToken = payload.wxAuthToken
//       return
//     },
//     logBeforeLoginURL (state, bURL) {
//       // 记录登陆之前进来的URL
//       state.beforeLoginURL = bURL
//     }
//   },
//   actions: {

//   }
// })

// 全局模块
const MdeGlobal = {
  state: {
    usrWindowIsShow: false,
  },
  mutations: {
    usrWindowToggle (state) {
      return state.usrWindowIsShow = !state.usrWindowIsShow
    },
  }
} 

// 登录模块
const MdeLogin = {
  namespaced: true,   // 命名空间

  state: {
    usrInfo: {
      isLogin: false,
      avatar: '',
      nickname: '',
      sex: '',
      usrID: '',
      authToken: ''
    },
    beforeLoginURL: '',
    wxAuthTp: 'base',
    // {name: "市东下路20号B座", location: "113.122629,23.029735", address: "市东下路20号b座"}
    userAddrInfo: {
      name: '市东下路20号B座',
      lng: 113.122629,
      lat: 23.029735,
      addr: '市东下路20号b座',
    }
  },
  mutations: {
    usrWxLogin (state, payload) {
      // 微信登陆，改变全局状态
      state.usrInfo.isLogin = true
      state.usrInfo.avatar = payload.usrAvatar
      state.usrInfo.nickname = payload.usrNickName
      state.usrInfo.authToken = payload.authToken
      state.usrInfo.sex = payload.sex
      state.usrInfo.usrID = payload.usrID
    },

    usrLogin (state, payload) {
      state.usrInfo.isLogin = true
      state.usrInfo.avatar = payload.profile_pic
      state.usrInfo.sex = payload.sex 
      state.usrInfo.nickname = payload.nickname 
      state.usrInfo.authToken = payload.token
    },

    logBeforeLoginURL (state, bURL) {
      // 记录登陆之前进来的URL
      state.beforeLoginURL = bURL
    },

  }
}


export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    mdeGlobal: MdeGlobal,
    mdeLogin: MdeLogin
  }
})