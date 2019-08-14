<template>
  <div>

    <mu-flex 
      justify-content="center" 
      align-items="center" 
      style="width:100%; height:9rem; background:#00bcd4; box-shadow: 0px 0px 1px #888888;" 
      wrap="wrap">
      <div style="width:4.5rem; height:4.5rem; border:3px solid #fff; border-radius:50%;">
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3949404775,3912381594&fm=26&gp=0.jpg" alt="" style="max-width:100%; max-height:100%; border-radius:50%;">
      </div>
      <div style="margin-top:0; text-align:center; width:100%; color:#fff;">
        <span style="font-size:17px; font-weight:700; letter-spacing:1px;">这里是我的昵称</span>
      </div>
    </mu-flex>

    <!-- 我的组队、我的关注、我的评论 -->

    <mu-row style="padding:1rem 2rem; background:#fff;" justify-content="between">
      <div style="border-radius:50%;">
        <div style="text-align:center;">
          <span style="font-size:28px; color:#ff9800;">0</span>
          <span>个</span>
        </div>
        <div>
          <span style="color:#78909c; font-size:15px; letter-spacing:1px;">招募中</span>
        </div>
      </div>

      <!-- 收藏：文章， 游戏 -->
      <div style="border-radius:50%;">
        <div style="text-align:center;">
          <span style="font-size:28px; color:#ff9800;">0</span>
          <span>个</span>
        </div>
        <div>
          <span style="color:#78909c; font-size:15px; letter-spacing:1px;">已成功</span>
        </div>
      </div>

      <div style="border-radius:50%;">
        <div style="text-align:center;">
          <span style="font-size:28px; color:#ff9800;">0</span>
          <span>个</span>
        </div>
        <div>
          <span style="color:#78909c; font-size:15px; letter-spacing:1px;">已结束</span>
        </div>
      </div>
    </mu-row>

    <mu-row style="padding:1rem; margin-top:.3rem; background:#fff;" align-items="center">
      <svg-icon icon-class="mine-game" class="icon-class"></svg-icon>
      <span style="margin-left:1rem; font-size:15px; letter-spacing:1px;">关注的游戏</span>
    </mu-row>

    <mu-row style="padding:1rem; margin-top:.3rem; background:#fff;">
      <svg-icon icon-class="mine-game" class="icon-class"></svg-icon>
      <span style="margin-left:1rem; font-size:15px; letter-spacing:1px;">我的点赞</span>
    </mu-row>

    <mu-divider shallow-inset></mu-divider>

    <mu-row style="padding:1rem; background:#fff;">
      <svg-icon icon-class="mine-game" class="icon-class"></svg-icon>
      <span style="margin-left:1rem; font-size:15px; letter-spacing:1px;">文章收藏</span>
    </mu-row>

    

    <mu-row style="padding:1rem; margin-top:.5rem; background:#fff;">
      <svg-icon icon-class="mine-game" class="icon-class"></svg-icon>
      <span style="margin-left:1rem; font-size:15px; letter-spacing:1px;">意见反馈</span>
    </mu-row>


  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {

}
</script>

<style scoped>

.icon-class {font-size:24px;}
</style>


