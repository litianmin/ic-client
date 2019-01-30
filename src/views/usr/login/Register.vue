<template>
  <div>
    <div class="base-info-div">
      <div class="avatar-bulk">
        <div>
          <img class="avatar-img" :src="avatarImg" alt="">
        </div>
        <div>
          <mu-button flat color="blue">
            上传头像<input @change="getAvatarImg" type="file" class="avatar-upload-button" accept="image/*"/>
          </mu-button>
        </div>
      </div>

      <div class="nickname-sex-div">
        <mu-text-field v-model="nickname" placeholder="请输入昵称" class="nickname-input" max-length="8"></mu-text-field>

        <mu-flex class="select-control-row sex-choose-flex">
          <mu-radio v-model="sex"  value="male" uncheck-icon="sentiment_dissatisfied" checked-icon="sentiment_satisfied" label="男"></mu-radio>    
          <mu-radio style="margin-left:1rem;" v-model="sex" color="pink" value="female" uncheck-icon="sentiment_very_dissatisfied" checked-icon="sentiment_very_satisfied" label="女"></mu-radio>
        </mu-flex>
      </div>
    </div>

    <div class="mobile-pwd-div">
      <mu-container>
        <mu-text-field v-model="mobile" label="手 机 号 码" label-float help-text="请输入11位手机号码"></mu-text-field><br/>
        <mu-text-field v-model="pwd" label="密 码" label-float help-text="请输入6-12位密码"></mu-text-field><br/>
        <mu-text-field v-model="pwdConfirm" label="确 认 密 码" label-float help-text="请再次确认密码" ></mu-text-field><br/>
        <mu-text-field v-model="authNumb" label="验 证 码" label-float help-text="请输入6位验证码"></mu-text-field>
      </mu-container>
    </div>


    <div class="get-auth-numb">
      <mu-button @click="getAuthNumb()" flat color="success">{{ btnCont }}</mu-button>
    </div>

    <div class="submit-div">
      <mu-button color="primary" class="submit-btn" @click="submitInfo">
        注册
        <mu-icon right value="send"></mu-icon>
      </mu-button>
    </div>

  </div>
</template>

<script>
import avatarDefaultImg from '@/static/avatar/imgupload3.png'
import utils from 'common/utils.js'

export default {
  data () {
    return {
      avatarImg: avatarDefaultImg,
      nickname: '',
      sex: 'male',
      mobile: '',
      pwd: '',
      pwdConfirm: '',
      authNumb: '',
      duration: 30,
      btnCont: '点击获取'
    }
  },
  methods: {
    getAvatarImg () {
      var _this = this
      var event = event || window.event
      var file = event.target.files[0]
      var reader = new FileReader()
      //转base64
      reader.onload = function(e) {
          _this.avatarImg = e.target.result
      }
      reader.readAsDataURL(file)
    },
    getAuthNumb () {
      // 防止多次点击
      if(this.duration != 30) {
        return false
      }

      if(utils.isPhoneNumb(this.mobile)) {
        // 手机号码通过验证，发送请求
        this.$axios.post(
          '/usr/register/auth',
          {
            mobile_phone: this.mobile
          }
        ).then((resp) => {
          let dataBack = resp.data
          
          if(dataBack.stmt == 'error' && dataBack.msg.code == '40201') {
            this.$toast.message('该电话号码已经存在,请直接登陆！')
            this.duration = 30
            return
          }

          if(dataBack.stmt == 'success') {
            this.$toast.success('发送成功！')
          }
          
        })

        // 隐藏按钮的点击事件，实现倒计时
        let clock = window.setInterval(()=>{
          if(this.duration > 0 && this.duration < 30) {
            this.duration --
            this.btnCont = this.duration + ' s'
          }else{
            window.clearInterval(clock)
            this.duration = 30
            this.btnCont = '重新发送'
          }
        },1000)

      }else{
        this.$toast.error('手机号码格式不正确')
      }
    },
    submitInfo () {
      // 判断昵称是否为空
      let nickName = this.nickname.trim()
      if(!!nickName == false) {
        this.$toast.error('昵称不能为空')
        return 
      }

      let mobileNumb = this.mobile.trim()
      if(!utils.isPhoneNumb(mobileNumb)) {
        this.$toast.error('手机号码格式不正确')
        return
      }

      let passWord = this.pwd.trim()
      let passWordComfirm = this.pwdConfirm.trim()
      if(!!passWord == false || passWord.length < 6 || passWord.length > 12){
        this.$toast.error('密码格式不正确')
        return 
      }
      if(passWord != passWordComfirm) {
        this.$toast.error('两次输入的密码不相同')
        return
      }

      let newAuthNumb = this.authNumb.trim()
      if(!!newAuthNumb == false || newAuthNumb.length != 6) {
        this.$toast.error('请输入6位验证码')
        return
      }

      this.$axios.post(
        '/usr/register',
        {
          identity_type: "MBPhone",
          identifier: mobileNumb,
          creadential: passWord,
          nickname: nickName,
          sex: this.sex,
          authcode: newAuthNumb
        }
      ).then((resp)=>{
        console.log(resp)
      })

      this.$toast.success('发送成功')

      console.log(this.avatarImg)
      console.log(this.nickname)
      console.log(this.sex)
      console.log(this.mobile)
      console.log(this.pwd)
      console.log(this.pwdConfirm)
      console.log(this.authNumb)
    }
  }
}
</script>

<style scoped lang="stylus">
.base-info-div
  width 100%
  margin-top 5%
  .avatar-bulk
    float left 
    margin-left 3rem 
    text-align center
    .avatar-img
      width 3rem 
      height 3rem 
      max-width 100% 
      max-height 100% 
      border-radius 50%
    .avatar-upload-button
      position absolute 
      left 0 
      opacity 0
  .nickname-sex-div
    float left 
    width 60%
    .nickname-input
      margin-left 2rem
      width 65% 
      margin-top -0.1rem
    .sex-choose-flex
      color gray 
      margin-left 2rem 
      margin-top -0.5rem

.mobile-pwd-div
  width 100% 
  text-align center 
  margin-top 0.5rem

.get-auth-numb
  width 100% 
  text-align right 
  padding 0.5rem 3rem 
  margin-top -4.5rem

.submit-div
  width 100%
  text-align right 
  padding 0.5rem 3rem 
  margin-top 1.8rem
  .submit-btn 
    width 40% 
    background gray
</style>
