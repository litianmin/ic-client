<template>
  <div class="footer-cont">
    <mu-container>
      <mu-bottom-nav :value.sync="value">
        <mu-bottom-nav-item value="icoming" to="/" title="icoming" icon="directions_run"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="citywide" to="/usr/login" title="全城" icon="map"></mu-bottom-nav-item>
        <mu-bottom-nav-item value="friends" to="/usr/login/register" title="好友" icon="group"></mu-bottom-nav-item>
        <div @click="usrWindowToggle">
          <mu-bottom-nav-item value="mypage" @click="usrWindowToggle" title="我的" icon="person_pin"></mu-bottom-nav-item>
        </div>
      </mu-bottom-nav>
    </mu-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  },
  methods: {
    // 我的窗口显示转换
    usrWindowToggle () {
      this.$store.commit('usrWindowToggle')
    }
  },
  watch: {
    value () {
      
    }
  }
}
</script>

<style lang="stylus" scoped>
.footer-cont
  width 100%
  background white
  border-top solid 1px #DCDCDC
</style>


