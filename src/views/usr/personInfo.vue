<template>
  <div>

    <mu-flex 
      justify-content="center" 
      align-items="center" 
      style="width:100%; height:10rem; background:#00bcd4; box-shadow: 0px 0px 1px #888888;" 
      wrap="wrap">
      <div style="width:4.5rem; height:4.5rem; border:3px solid #fff; border-radius:50%;">
        <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3949404775,3912381594&fm=26&gp=0.jpg" alt="" style="max-width:100%; max-height:100%; border-radius:50%;">
      </div>
      <div style="margin-top:0; text-align:center; width:100%; color:#fff;">
        <span style="font-size:17px; font-weight:700; letter-spacing:1px;">这里是我的昵称</span>
      </div>
    </mu-flex>

    <!-- 我的组队、我的关注、我的评论 -->

    <mu-row style="padding:1rem 2rem;" justify-content="between">
      <mu-flex style="width:3rem; height:3rem; border-radius:50%; background:green;">
        <span>组队中</span>
      </mu-flex>

      <!-- 收藏：文章， 游戏 -->
      <mu-flex style="width:3rem; height:3rem; border-radius:50%; background:green;">
        <span>收 藏</span>
      </mu-flex>

      <mu-flex style="width:3rem; height:3rem; border-radius:50%; background:green;">
        <span>关 注</span>
      </mu-flex>
    </mu-row>

    <mu-row style="padding:1rem;">
      <span>我的组队</span>
    </mu-row>

    <mu-divider></mu-divider>

    <mu-row style="padding:1rem;">
      <span>意见反馈</span>
    </mu-row>

    <mu-divider></mu-divider>

    <mu-row style="padding:1rem;">
      <span>这里我也不清</span>
    </mu-row>


  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {

}
</script>

<style scoped>


</style>


