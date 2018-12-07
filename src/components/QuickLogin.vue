<template>
  <div>
    <div class="title">
      ---- 快速注册、登陆 ----
    </div>

    <div class="icon-box">
      <div class="icon-item-one">
        <img src="@/static/quick_login/wx.png" class="icon-img">
      </div>

      <div class="icon-item-one">
        <img src="@/static/quick_login/qq.png" class="icon-img"/>
      </div>

      <div class="icon-item-one">
        <img src="@/static/quick_login/alipay.png" class="icon-img"/>
      </div>

      <div class="icon-item-two">
        <img src="@/static/quick_login/wb.png" class="icon-img"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped lang="stylus">
.title
  width 100% 
  text-align center 
  font-size 12px
.icon-box
  width 100% 
  margin-top 1.5rem 
  text-align center 
  padding 0 0 0 20%
  .icon-item-one
    float left 
    width 2rem 
    height 2rem 
    margin-right 10%
  .icon-item-two
    float left 
    width 2rem 
    height 2rem
  .icon-img
    width auto
    height auto 
    max-width 100%
    max-height 100%
</style>
