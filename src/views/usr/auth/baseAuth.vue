<template>
  <div style="width:100%;">

    <div style="width:100%; text-align:center;">

      <div style="font-size:30px; text-align:left; color:#009688; font-weight:700; margin-top:25%; margin-left:3rem; margin-bottom:1.5rem; font-style:italic; text-shadow: 10px 5px 5px #b2dfdb;">
        I COMING！
      </div>

      <mu-container style="margin-top:20%;">
        <mu-text-field v-model="username" label="UserName" label-float help-text="用户名为6-12长度的字符" ></mu-text-field><br/>
        <mu-text-field v-model="pwd" label="Password" label-float help-text="请输入密码" ></mu-text-field><br/>
      </mu-container>

      <div style="width:100%; text-align:right; padding: 2rem 3rem; margin-top:10%;">
        <div style="float:left; text-align:left; margin-left:0.3rem; margin-top:0.5rem; color:green">忘记密码？</div>
        <mu-button @click="Login" color="primary" style="width:40%; background:#00bcd4;">
          登陆
          <mu-icon right value="send"></mu-icon>
        </mu-button>
      </div>


    </div>
  </div>
</template>

<script>
import utils from 'common/utils.js'
export default {
  data () {
    return {
      username: '',
      pwd: ''
    }
  },
  methods: {
    Login () {
      let userName = this.username.trim()
      let pwd = this.pwd.trim()
      if(!!userName === false) {
        this.$toast.error('用户名不能为空')
        return
      }

      if(!!pwd === false) {
        this.$toast.error('昵称不能为空')
        return
      }

      this.$axios.post(
        '/login/mobile',
        {
          u_name: userName,
          pwd: pwd
        }
      ).then((resp)=>{
        let dataBack = resp.data
        console.log(resp)
        if(dataBack.code == 40000) {
          this.$toast.error('账号密码错误')
          return
        }

        if(dataBack.code == 40001) {
          this.$toast.error('发生未知错误(参数错误)!')
          return
        }

        if(dataBack.code == 20000) {
          this.$toast.success('登陆成功！')

          // 保存用户基本信息
          this.$store.commit('mdeLogin/usrLogin', dataBack.msg)

          // 跳转到原地址
          let beforeLoginURL = utils.cookieObj.getCookie('beforeLoginURL')
          this.$router.push(beforeLoginURL)
        }
      })

    }
  }
}
</script>

<style lang="stylus" scoped>
.img-style
  width auto
  height auto 
  max-width 100%
  max-height 100%
</style>



