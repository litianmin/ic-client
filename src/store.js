import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import utils from '@/common/utils.js'

Vue.use(Vuex)

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
      mobile: '',
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
      district: ''
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
      state.usrInfo.mobile = payload.mobile
    },

    logBeforeLoginURL (state, bURL) {
      // 记录登陆之前进来的URL
      state.beforeLoginURL = bURL
    },

    locationUpdate (state, payload) { // 刷新用户地址信息
      state.userAddrInfo.lng = payload.lng
      state.userAddrInfo.lat = payload.lat
      state.userAddrInfo.district = payload.district
    }

  }
}

const MdeUserInfo = {
  namespaced: true,   // 命名空间

  state: {
    userAddrInfo: {
      name: '市东下路20号B座',
      lng: 113.122629,
      lat: 23.029735,
      addr: '市东下路20号b座',
      district: '',
      forceRefresh: 0 // 时间到期了强制更新
    }
  },
  mutations: {

    locationUpdate (state, payload) { // 刷新用户地址信息
      // 设置强制刷新时间为30分钟
      let forceRefresh = utils.now2Unix() + 30 * 60

      state.userAddrInfo.lng = Number(payload.lng)
      state.userAddrInfo.lat = Number(payload.lat)
      state.userAddrInfo.district = payload.district
      state.userAddrInfo.forceRefresh = forceRefresh
    }

  }

}

const MdeInterface = {  // 界面显示
  namespaced: true,

  state: {
    UnreadMsg: 0
  },
  
  mutations: {
    unreadMsgUpdate (state, num) {
      state.UnreadMsg = num
    }
  }
}

export default new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    mdeGlobal: MdeGlobal,
    mdeLogin: MdeLogin,
    mdeUserInfo: MdeUserInfo,
    mdeInterface: MdeInterface
  }
})