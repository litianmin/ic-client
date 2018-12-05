<template>
  <div class="home">
    <div class="usrfortest">
      <router-link to="/mytest">跳转到那个啥</router-link>
    </div>

    <!-- BEGIN  用户管理-->
    <div>
      <UsrWindow/>
    </div>
    <!-- END 用户管理 -->

    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import UsrWindow from '@/views/usr/usrwindow/UsrWindow.vue'
export default {
  name: 'home',
  components: {
    Footer,
    UsrWindow
  }
}
</script>

<style lang="stylus" scoped>
.home
  width 100%
  .footer
    width 100%
    position fixed
    bottom 0
  .usrfortest
    width 100%
    height 90%
</style>

