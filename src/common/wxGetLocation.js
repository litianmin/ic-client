import axios from '@/request.js'


export function getShopWxConfig () {
    let that = this;
    let params = {
        url: location.href.split('#')[0]
    }
    axios.post('/user/test', params).then(res => {
        console.log(res)
        let info = res.data.msg
        wx.config({
            debug: true,
            appId: info.appID,
            nonceStr: info.nonceStr,
            timestamp: info.timeStamp,
            url: location.href.split('#')[0],
            signature: info.signature,
            jsApiList: [
                'checkJsApi', 'openLocation', 'getLocation'
            ],
        })
        wx.checkJsApi({
            jsApiList: ['getLocation'],
            success: function (res) {
                if (res.checkResult.getLocation == false) {
                    alert('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
                    return;
                }
            }
        });
        wx.ready(function () {
//                wx.invoke('getLocation', 'openLocation', {}, function(res) {
//                    //alert(res.err_msg + "唯一");
//                });
            wx.getLocation({
                success: function (res) {
//                                console.log(res)
                    that.pointY = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                    that.pointX = res.longitude; // 经度，浮点数，范围为180 ~ -180。

                    that.point = new BMap.Point(that.pointX,that.pointY);
                    that.marker = new BMap.Marker(that.point); // 创建点

                    // that.getShopFjStudio()
                },
                cancel: function (res) {
                    alert('用户拒绝授权获取地理位置');
                    // that.getShopFjStudio()
                }
            });
        });

        wx.error(function (res) {
                       console.log(res)
            // that.getShopFjStudio()
        });
    }).catch(res => {
        console.log(res)
    })
}
