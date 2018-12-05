<template>
  <div class="footer-cont">
    <mu-container>
      <mu-bottom-nav :value.sync="value">
        <mu-bottom-nav-item  title="附近" icon="near_me"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="icoming" icon="directions_run"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="全城" icon="map"></mu-bottom-nav-item>
        <div @click="usrWindowToggle">
          <mu-bottom-nav-item title="我的" icon="device_hub"></mu-bottom-nav-item>
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
    usrWindowToggle () {
      this.$store.commit('usrWindowToggle')
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


