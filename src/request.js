import axios from 'axios'
import store from './store'
import utils from './common/utils.js'
import router from './router'
import Toast from 'muse-ui-toast'
import { getToken, setToken, removeToken, setBeforeLoginURL } from './common/cookie.js'

// 配置 axios 基本路径 
axios.defaults.baseURL = "/api" 

// request拦截器(请求拦截)
axios.interceptors.request.use(
  config => {
    console.log(config)
    if(config.url.indexOf('http') == -1) {  // 如果是请求外链，不要加这个，要不会报错
      config.headers['self-token'] = getToken()
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// function login() {
//   removeToken()
//   Toast.message('登录失效，请重新登录')
//   utils.cookieObj.setCookie("beforeLoginURL", router.history.current.path, 's1000')
        
//   store.state.mdeLogin.usrInfo.isLogin = false
//   store.state.mdeLogin.usrInfo.authToken = ''

//   let isWxBrowser = utils.isWxBrowser()
//   // 设置进来的url
//   setBeforeLoginURL(to.fullPath)

//   if(isWxBrowser === true) { // 如果是微信浏览器
//     next('/auth')
//   }

//   next('/auth/base')

//   // router.push('/auth/base')
// }

let api = {
  async refreshToken (response) {
    let res = await axios.post('/user/tokenRefresh', {token: getToken()})
    if(res.data.code == 20000) {
      setToken(res.data.msg)
    }

    response.config.headers['self-token'] = getToken()
    response.config.baseURL = ''
    let data = await axios.request(response.config)
    return data
  }
}

// response 拦截器(响应拦截)
axios.interceptors.response.use(
  response => {
    const res = response.data

    // console.log(res)
    // return

    // 40002:Token 没有token，未登录
    // 40003:Token token非法
    // 40004:Token token失效
    // 如果token过期了，那么就去刷新token，然后继续下面的操作
    if(res.code == 40004) {
      return api.refreshToken(response)
    }

    if (res.code === 40002 || res.code === 40003) {
      removeToken()
      Toast.message('登录失效，请重新登录')
            
      let isWxBrowser = utils.isWxBrowser()
      // 设置进来的url
      setBeforeLoginURL(router.history.current.path)
      if(isWxBrowser === true) { // 如果是微信浏览器
        router.push('/auth')
      }
    
      router.push('/auth/base')

      // login()
      return
    } 
    return response
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default axios
