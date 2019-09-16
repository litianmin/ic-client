<template>
  <div class="footer-cont">
    <mu-flex style="width:100%; padding:.6rem 1rem .3rem 1rem;" justify-content="between">
      <mu-flex @click="linkToNav(0)" justify-content="center" align-items="center" wrap="wrap">
        <svg-icon :icon-class="navActive == 'mainPage' ? 'run_focus' : 'run_blur'" class="icon-class" style="font-size:18px;"></svg-icon>
        <div style="width:100%; text-align:center; margin-top:.1rem; font-size:12px;">
          <span :class="navActive == 'mainPage' ? 'font-active' : ''">Hello!</span>
        </div>
      </mu-flex>
      <mu-flex @click="linkToNav(1)" justify-content="center" align-items="center" wrap="wrap">
        <svg-icon :icon-class="navActive == 'nearby' ? 'nearby_focus' : 'nearby_blur'" class="icon-class" style="font-size:18px;"></svg-icon>
        <div style="width:100%; text-align:center; margin-top:.1rem; font-size:12px;">
          <span :class="navActive == 'nearby' ? 'font-active' : ''">附近</span>
        </div>
      </mu-flex>
      <mu-flex @click="linkToNav(2)" justify-content="center" align-items="center" wrap="wrap" style="position:relative;">
        <svg-icon :icon-class="navActive == 'msg' ? 'msg_focus' : 'msg_blur'" class="icon-class" style="font-size:18px;"></svg-icon>
        <div style="width:100%; text-align:center; margin-top:.1rem; font-size:12px;">
          <span :class="navActive == 'msg' ? 'font-active' : ''">消息</span>
        </div>
        <div v-show="UnreadMsg > 0" style="position:absolute; top:0; right:.3rem; width:.5rem; height:.5rem; border-radius:50%; background:red;"></div>
      </mu-flex>
      <mu-flex @click="linkToNav(3)" justify-content="center" align-items="center" wrap="wrap">
        <svg-icon :icon-class="navActive == 'personnalMsg' ? 'personal_msg_focus' : 'personal_msg_blur'" class="icon-class" style="font-size:18px;"></svg-icon>
        <div style="width:100%; text-align:center; margin-top:.1rem; font-size:12px;">
          <span :class="navActive == 'personnalMsg' ? 'font-active' : ''">我的</span>
        </div>
      </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
export default {
  props: [
    'navActive'
  ],
  methods: {
    // 我的窗口显示转换
    usrWindowToggle () {
      this.$store.commit('usrWindowToggle')
    },
    linkToNav (nav) {
      switch(nav) {
        case 0:
          this.$router.push('/')
        break
        case 1:
          this.$router.push('/instant/list')
        break
        case 2:
          this.$router.push('/notify/category')
        break
        case 3:
          this.$router.push('/usr/personInfo')
        break
      }
    },
  },
  computed: {
    UnreadMsg () {
      return this.$store.state.mdeInterface.UnreadMsg
    }
  }
}
</script>

<style scoped>
.footer-cont {width:100%; position:fixed; bottom:0; background:white; border-top:solid 1px #DCDCDC}
.font-active { color:#00bcd4; }
</style>


