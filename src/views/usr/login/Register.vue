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
      <mu-button flat color="success">点击获取</mu-button>
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

export default {
  data () {
    return {
      avatarImg: avatarDefaultImg,
      nickname: '',
      sex: 'male',
      mobile: '',
      pwd: '',
      pwdConfirm: '',
      authNumb: ''
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
    submitInfo () {
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
