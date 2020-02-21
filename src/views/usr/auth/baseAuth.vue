<template>
  <div style="width:100%;">

    <div style="width:100%;">

      <div style="font-size:30px; text-align:left; color:#00bcd4; font-weight:700; margin-top:1rem; margin-left:1rem; margin-bottom:0rem; font-style:italic; text-shadow: 10px 5px 5px #b2dfdb;">
        可友乎？
      </div>

      <van-row v-show="Status == 1" style="padding:1.5rem;">
        <van-row>
          <span style="font-weight:700;">该账户未绑定该平台账号</span>
        </van-row>
        <van-row style="margin-top:1rem;">
          <van-field 
            v-model="Phone" 
            placeholder="请输入手机号码" 
            readonly
            clickable
            @touchstart.native.stop="PhoneKeyboard = true"/>
        </van-row>
        <van-row style="margin-top:.5rem;">
          <span style="color:#bdbdbd; font-size:13px;">未注册的手机号码验证通过后将自动注册并绑定</span>
        </van-row>
        <van-button 
          @click="sendSms" 
          color="#00bcd4"
          type="primary" 
          :disabled="!SendSmsBtn"
          style="width:100%; margin-top:1rem;">获取短信验证码</van-button>
        <!-- <van-row style="text-align:right; margin-top:.5rem;">
          <span style="color:#2196f3; font-size:13px;">密码绑定</span>
        </van-row> -->
      </van-row>


      <van-row v-show="Status == 2" style="">
        <van-row style="padding:1rem 1rem .5rem 1rem;">
          <span style="font-size:20px; font-weight:1000;">请输入验证码</span>
        </van-row>
        <van-row style="padding:0 1rem 1rem 1rem;">
          <span style=" color: #bdbdbd;font-size:14px; font-weight:1000;">短信验证码已发送到 {{ Phone }}</span>
        </van-row>
        <van-password-input
          :value="Code"
          :mask="false"
          :focused="CodeFocus"
          @focus="CodeFocus = true"/>
        <van-row style="text-align:right; margin-top:.5rem; padding:0 1.5rem;">
          <span style="color:#2196f3; font-size:13px;" @click="changePhone">更换手机号</span>
        </van-row>
      </van-row>

      <van-number-keyboard
        v-model="Phone"
        :show="PhoneKeyboard"
        :maxlength="11"
        @blur="PhoneKeyboard = false"/>

      <van-number-keyboard
        v-model="Code"
        :show="CodeFocus"
        :maxlength="6"
        @blur="CodeFocus = false"/>

    </div>
  </div>
</template>

<script>
import { Field, Col, Row, Button, NumberKeyboard, PasswordInput, Dialog, Toast } from 'vant'
import utils from 'common/utils.js'
import { setToken } from 'common/cookie.js'
export default {
  components: {
    [Field.name]: Field,
    [Col.name]: Col,
    [Row.name]: Row,
    [Button.name]: Button,
    [NumberKeyboard.name]: NumberKeyboard,
    [PasswordInput.name]: PasswordInput,
    [Dialog.name]: Dialog,
    [Toast.name]: Toast
  },
  data () {
    return {
      Phone: '',
      PhoneKeyboard: false,
      SendSmsBtn: false,

      Code: '',
      CodeKeyboard: false,
      CodeFocus: false,

      Status: 1,
    }
  },
  watch: {
    Phone (val) {
      if (val.length == 11) {
        this.PhoneKeyboard = false
        this.SendSmsBtn = true
      } else {
        this.SendSmsBtn = false
      }
    },
    Code (val) {
      if (val.length == 6) {
        this.login()
      }
    }
  },
  methods: {

    sendSms () {
      Toast.loading({
        message: '发送中...',
        duration: 0,
        forbidClick: true,
        loadingType: 'spinner'
      })

      this.$axios.post('/user/getAuthCode', {
        codeType: 1,
        phone: this.Phone
      }).then(resp => {
        if (resp.data.code == 20000) {
          Toast.clear()
          this.Status = 2
          this.CodeFocus = true
        } else {
          Toast.clear()
          Toast(resp.data.msg )
        }
      })
    },

    changePhone () {
      this.Status = 1
      this.PhoneKeyboard = true
    },

    login () {
      Dialog.confirm({
        title: '验证码错误',
        message: '请输入正确的验证码',
        confirmButtonText: '重新填写',
        cancelButtonText: '更换手机号'
      }).then(() => {
        // on confirm
      }).catch(() => {
        // on cancel
      })
    },

    Login2 () {
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

          setToken(dataBack.msg.token)

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



