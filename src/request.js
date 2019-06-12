import axios from 'axios'
import store from './store'
import utils from './common/utils.js'
import router from './router'
import Toast from 'muse-ui-toast'

// 配置 axios 基本路径 
axios.defaults.baseURL = "/api" 

// request拦截器(请求拦截)
axios.interceptors.request.use(
  config => {
    if (store.state.mdeLogin.usrInfo.isLogin) {
      config.headers['self-token'] = store.state.mdeLogin.usrInfo.authToken // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器(响应拦截)
axios.interceptors.response.use(
  response => {
    const res = response.data

    console.log(res)
    // 这里主要是处理返回token的错误问题
    if (res.code !== 20000) { 
      // 40002:Token 没有token，未登录
      // 40003:Token token非法
      // 40004:Token token失效
      if (res.code === 40002 || res.code === 40003 || res.code === 40004) {
        Toast.message('登录失效，请重新登录')
        // 如果token都失效的话，那么就跳转到登录页面
        // 还要判断是都为微信浏览器

        // 保存现在的路径，登录之后返回当前路径
        utils.cookieObj.setCookie("beforeLoginURL", router.history.current.path, 's1000')
        
        store.state.mdeLogin.usrInfo.isLogin = false
        store.state.mdeLogin.usrInfo.authToken = ''
        router.push('/auth/base')
        return
      } 
      // return Promise.reject('error')
    } 

    // 如果没有错误，那么就把数据直接返回去
    return response
    
  },
  error => {
    console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

export default axios
