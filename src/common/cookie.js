import Cookies from 'js-cookie'

const TokenKey = 'self-token'
const BeforeLoginURL = 'beforeLoginURL'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 设置登录之前的url
export function setBeforeLoginURL(url) {
  let expires = new Date(new Date().getTime() + 1 * 60 * 1000)
  Cookies.set(BeforeLoginURL, url, { expires })
}

// 获取进来的URL
export function getBeforeLoginURL() {
  return Cookies.get(BeforeLoginURL)
}