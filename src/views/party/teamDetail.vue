<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#00bcd4" z-depth="1">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        聚会party
      </div>

      <span style="color:#fff; font-size:12px; padding:0 .5rem;" slot="right">创建组队</span>
    </mu-appbar>
    <!-- END 头部 -->
    这里是队伍的详情
  </div>
</template>

<script>
export default {
  data () {
    return {
      TeamID: 0,
    }
  },
  mounted () {
    this.TeamID = this.$route.params.teamID
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
</style>


