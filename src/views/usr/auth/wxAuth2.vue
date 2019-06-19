<template>
  <mu-container style="width:100;">

    <div style="color:white; position:fixed; top:.5rem; right:1rem;">
      正在登陆 ...
    </div>

    <!-- BEGIN 广告图片 -->
    <mu-flex align-items="center" justify-content="center" style="position:fixed; top:0; left:0; background:#fff; width:100%; height:100%;" wrap="wrap">
      <mu-flex wrap="wrap">
        <div style="width:100%; text-align:center;">
          <img style="max-width:100%; max-height:100%;" src="https://icoming.top/image/logo/logo.png" alt="">
        </div>
        <!-- <div style="width:100%; text-align:center;">
          <span style="font-size:40px; font-weight:600; color:#009688;  text-shadow: 10px 5px 5px #b2dfdb;">
            助 助 社 交
          </span>
        </div> -->

      </mu-flex>

      <div style="width:100%; font-size:16px; text-align:center;">- 正 在 登 陆 -</div>
    </mu-flex>
    <!-- END 广告图片 -->
  </mu-container>
</template>

<script>
import utils from 'common/utils.js'
export default {
  methods: {
    getAuthURL () {
      // 先获取跳转过来的地址
      // 一开始只是获得code, 使用base获取code
      // let reqTp = 'base'
      this.$axios.get(`/user/wxLoginAuth`,{}).then( (resp)=> {
        let locateURL = resp.data.url
        console.log(locateURL)
        // return
        document.location.href = locateURL
      })
    },
    getUsrInfo (wxCode) {
      // let wxAuthState = this.$router.currentRoute.query.state
      this.$axios.get(`/user/wxGetUserInfo/${wxCode}`, {}).then( (resp) => {
        // 然后这里开始处理数据
        // 保存用户的信息，然后跳转回之前的路径
        let respData = resp.data
        if(respData.code == '40001') {
          window.location.href = respData.msg
        }

        // 如果返回成功的消息，那么就存入数据库
        if(respData.code == '20000') {
          // 先保存用户的基本信息
          let usrInfo = respData.userBaseInfo

          this.$toast.success('登陆成功！')

          // 保存用户基本信息
          this.$store.commit('mdeLogin/usrLogin', usrInfo)

          // 跳转到原地址
          let beforeLoginURL = utils.cookieObj.getCookie('beforeLoginURL')
          this.$router.push(beforeLoginURL)
        }

      } )
    }
  },
  created () {
    // 创建元素的时候，去后台请求授权地址
    // 一开始是snsapi_base方式去请求，获取openid
    // 如果用户已经存在，那么就直接返回用户的信息数据给他
    // 如果用户没有在本站注册过，那么再返回新的验证地址snsapi_userinfo

    // 判断当前路径是否带有code
    let wxAuthCode = this.$router.currentRoute.query.code
    if(!!wxAuthCode == false) {
      // 不存在code
      this.getAuthURL()
    }else{
      // 存在code
      this.getUsrInfo(wxAuthCode)
    }
  }
}
</script>

<style scoped lang="stylus">
</style>

