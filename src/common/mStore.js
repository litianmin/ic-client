import store from '@/store.js'

// 获取用户的昵称
export function getNickname() {
  return store.state.mdeLogin.usrInfo.nickname
}