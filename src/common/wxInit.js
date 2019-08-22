import axios from '@/request.js'
import wx from 'weixin-js-sdk'
import { async } from 'q'
// import { resolve } from 'dns';

// 获取微信基本配置
export async function getWeConfig() {
  let params = {
    url: location.href
  }
  let configInfo = await axios.post('/user/wxConfigInit', params)
  let info = configInfo.data.msg
  await wx.config({
    debug: true,
    appId: info.appID,
    nonceStr: info.nonceStr,
    timestamp: info.timeStamp,
    url: location.href,
    signature: info.signature,
    jsApiList: ['checkJsApi', 'translateVoice', 'openLocation', 'getLocation']
  })
}

// _that.$axios.get(`https://restapi.amap.com/v3/geocode/regeo?&location=${res.longitude},${res.latitude}&key=2d617a69e7365b889469daf971c3eb71`, {}).then((resp) => {
//   if(resp.data.status == '1') {
//     let locateAddr = resp.data.regeocode.addressComponent.district
//     let payload = {
//       lng: res.longitude,
//       lat: res.latitude,
//       district: locateAddr  
//     }
//     _that.$store.commit('mdeUserInfo/locationUpdate', payload)
//     console.log('初始化成功')
//     _that.pageInit()
//   }
// })

export async function getWxLocate() {
  await getWeConfig()
  console.log('这里肯定是先执行的，但是，哎')
}

export function mytest() {
  getWxLocate()
}
