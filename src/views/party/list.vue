<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#00bcd4">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div style="font-size:14px;">
        聚会party
      </div>


      <mu-flex align-items="center" slot="right">
        <span>佛山</span>
        <mu-icon value="person_pin_circle" size="18"></mu-icon>
      </mu-flex>

    </mu-appbar>
    <!-- END 头部 -->


    

    时间、地点、人数、招募图片，三张呗，如果
    这里是party列表界面
    
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
</style>


