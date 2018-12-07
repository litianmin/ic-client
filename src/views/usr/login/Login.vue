<template>
  <div>
    <div class="main-div">
      <!-- BEGIN title -->
      <div class="title-one">
        嘿，我来了 
        <mu-icon value="directions_bike" ></mu-icon>
      </div>
      <div class="title-two">
        <mu-icon value="directions_run" ></mu-icon>
        I COMING！
      </div>
      <!-- END title -->

      <!-- BEGIN login_button -->
      <div class="register-div">
        <mu-button @click="linkToRegister" color="secondary" class="button-login">
          <mu-icon left value="gesture"></mu-icon>
           注 册
        </mu-button>   
      </div>

      <div style="width:100%; margin-top:10%;">
        <mu-button @click="linkToCheckin" color="secondary" class="button-login">
          <mu-icon left value="send"></mu-icon>
           登 陆
        </mu-button>        
      </div>
      <!-- END login_button -->

      <!-- BEGIN 快速login -->
      <div class="quick-login-postion">
        <QuickLogin/>  
      </div>
      <!-- END 快速login -->

    </div>
  </div>
</template>

<script>
import QuickLogin from 'components/QuickLogin.vue'
export default {
  components: {
    QuickLogin
  },
  methods: {
    linkToRegister () {
      this.$router.push('/usr/login/register')
    },
    linkToCheckin () {
      this.$router.push('/usr/login/checkin')
    }
  }
}
</script>

<style lang="stylus" scoped>
.main-div
  width 100% 
  text-align center
  .title-one
    font-size 30px 
    text-align left 
    color gray 
    font-weight 700 
    margin-top 15% 
    margin-left 2rem 
    font-style italic
  .title-two
    font-size 35px 
    text-align right 
    color gray 
    font-weight 700
    margin-right 2rem 
    margin-bottom 1.5rem 
    font-style italic
  .register-div
    width 100% 
    margin-top 17%
  .checkin-div
    width 100%
    margin-top 10%

  .button-login
    background gray 
    width 35%

  .quick-login-postion
    margin-top 20%
    width 100%

</style>


