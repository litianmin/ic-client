<template>
  <div class="footer-cont">
    <!-- <mu-container>
      <mu-bottom-nav :value.sync="value">
        <mu-bottom-nav-item value="mainpage" to="/" title="Hello!" icon="directions_run"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="nearby" to="/" title="附近" icon="person_pin_circle"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="notification" to="/" title="消息" icon="notifications_active"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="mypage" @click="usrWindowToggle" title="我的" icon="person_pin"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </mu-container> -->
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
        <div style="position:absolute; top:0; left:0; width:.5rem; height:.5rem; border-radius:50%; background:red;"></div>
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
  data () {
    return {
      value: 'mainpage',
      navActive: 'mainPage',
    }
  },
  methods: {
    // 我的窗口显示转换
    usrWindowToggle () {
      this.$store.commit('usrWindowToggle')
    },
    linkToNav (nav) {
      switch(nav) {
        case 0:
          this.navActive = 'mainPage'
          this.$router.push('/')
        break
        case 1:
          this.navActive = 'nearby'
          this.$router.push('/instant/list')
        break
        case 2:
          this.navActive = 'msg'
          this.$router.push('/notify/category')
        break
        case 3:
          this.navActive = 'personnalMsg'
        break
      }
    },
  },
  watch: {
    value (val) {
      console.log(val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.footer-cont
  width 100%
  background white
  border-top solid 1px #DCDCDC

.mytest { color:red; }
.mytest1 { color:yellow; }
.font-active { color:#00bcd4; }
</style>


