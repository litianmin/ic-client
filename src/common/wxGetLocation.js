import axios from '@/request.js'
import store from '@/store'
import wx from 'weixin-js-sdk'
import { async } from 'q';

export async function getShopWxConfig () {
  let params = {
    url: location.href
  }
  await axios.post('/user/wxConfigInit', params).then(res => {
    let info = res.data.msg
    wx.config({
      debug: true,
      appId: info.appID,
      nonceStr: info.nonceStr,
      timestamp: info.timeStamp,
      url: location.href,
      signature: info.signature,
      jsApiList: ['checkJsApi', 'translateVoice', 'openLocation', 'getLocation']
    })
    wx.checkJsApi({
      jsApiList: ['getLocation'],
      success (res) {
        if (res.checkResult.getLocation == false) {
          alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！')
          return
        }
      },
      error (resp) {
        console.log(resp)
      }
    })
    wx.ready(function () {
      wx.getLocation({
          success: function (res) {
            console.log(res)
            alert(JSON.stringify(res))
            let latitude = res.latitude
            let longitude = res.longitude

            axios.get(`https://restapi.amap.com/v3/geocode/regeo?&location=${longitude},${latitude}&key=2d617a69e7365b889469daf971c3eb71`, {})
            .then(res => {
              if(res.data.status == '1') {
                let locateAddr = res.data.regeocode.addressComponent.district
                let payload = {
                  lng: longitude,
                  lat: latitude,
                  district: locateAddr  
                }
                store.commit('mdeUserInfo/locationUpdate', payload)
              }
            })
          },
          cancel: function (res) {
            alert('用户拒绝授权获取地理位置')
          }
      })
    })

    wx.error(function (res) {
      console.log(res)
    })
  }).catch(res => {
    console.log(res)
  })
}
