import wx from 'weixin-js-sdk'
import utils from '@/common/utils.js'

/** 微信初始化
 *  @param {*} pointer =>  this
 *  @param {bool} needLocate  是否需要定位
 */
export function wxInit(pointer, needLocate) {
  let _this = pointer
  if(!utils.isWxBrowser()) { // 判断是否为微信浏览器
    _this.pageInit()
  } else {
    // 先判断地理位置是否需要更新了
    if( utils.isNeedRefreshLocation() == false ) { // 如果不需要刷新，直接请求数据了
      _this.pageInit()
    }

    let _that = _this
    let params = {
      url: location.href
    }
    _this.$axios.post('/user/wxConfigInit', params).then((configInfo) => {
      let info = configInfo.data.msg
      wx.config({
          debug: false,
          appId: info.appID,
          nonceStr: info.nonceStr,
          timestamp: info.timeStamp,
          url: location.href,
          signature: info.signature,
          jsApiList: ['checkJsApi', 'openLocation', 'getLocation', 'onMenuShareAppMessage', 'onMenuShareTimeline']
      })
      
      wx.ready(() => {
        if( needLocate && utils.isNeedRefreshLocation() ) {
          wx.getLocation({
            success: function (resp) {
              let lat = resp.latitude
              let lng = resp.longitude

              _that.$axios.get(`https://restapi.amap.com/v3/geocode/regeo?&location=${lng},${lat}&key=2d617a69e7365b889469daf971c3eb71`, {}).then((resp2) => {
                if(resp2.data.status == '1') {
                  let locateAddr = resp2.data.regeocode.addressComponent.district
                  let payload = {
                    lng,
                    lat,
                    name: locateAddr,
                    addr: locateAddr,
                  }
                  _that.$store.commit('mdeUserInfo/locationUpdate2', payload)
                  _that.pageInit()
                }
              })

            }, 
            error: function (resp) {
              console.log(resp)
            }
          })
        }

        // 分享给朋友
        wx.onMenuShareAppMessage({
          title: _that.ShareTitle, // 分享标题
          desc: _that.ShareDesc, // 分享描述
          link: document.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          imgUrl: 'https://www.icoming.top/image/logo/zhuzhu-logo.png', // 分享图标
          type: 'link', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
          // 用户点击了分享后执行的回调函数
          // console.log('初始化成功')
          }
        })


        wx.onMenuShareTimeline({
            title: _that.ShareTitle,  // 分享标题
            desc: _that.ShareDesc,
            link: document.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://www.icoming.top/image/logo/zhuzhu-logo.png', // 分享图标
            success: function () {
            // 用户点击了分享后执行的回调函数
            }
        })

      })
      
    })
  }
}
