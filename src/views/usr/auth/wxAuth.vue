<template>
  <mu-container style="width:100;">

    <div style="color:white; position:fixed; top:.5rem; right:1rem;">
      正在登陆 ...
    </div>

    <!-- BEGIN 广告图片 -->
    <div style="width:100%; height:auto;">
      <img style="width:100%; height:100%;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1549040085532&di=a96a94eba01d3aede5f2943ab562a95d&imgtype=0&src=http%3A%2F%2Fstatic.yingyonghui.com%2Fscreenshots%2F2099%2F2099599_0.jpg" alt="ad_img">
    </div>
    <!-- END 广告图片 -->
  </mu-container>
</template>

<script>
export default {
  methods: {
    getAuthURL () {
      // 先获取跳转过来的地址
      // 一开始只是获得code, 使用base获取code
      let reqTp = 'base'
      this.$axios.get(`/usr/wxAuth/${reqTp}`,{}).then( (resp)=> {
        let locateURL = resp.data
        document.location.href = locateURL
      })
    },
    getUsrInfo (wxCode) {
      this.$axios.get(`/usr/wxGetUsrInfo/${wxCode}`, {}).then( (resp) => {
        // 然后这里开始处理数据
        // 保存用户的信息，然后跳转回之前的路径
        alert(this.$store.state.mdeLogin.beforeLoginURL)
        console.log(resp)
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

