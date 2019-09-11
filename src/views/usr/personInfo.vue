<template>
  <div style="width:100%;">

    <mu-flex 
      align-items="center" 
      style="width:100%; height:auto; padding:2rem 0; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0px 0px 1px #888888; postion:relative;" 
      wrap="wrap">

      <mu-flex align-items="center" style="padding:0 1rem;">
        <mu-flex style="width:3.8rem; height:3.8rem; border:2px solid #fff; border-radius:50%;">
          <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3949404775,3912381594&fm=26&gp=0.jpg" alt="" style="max-width:100%; max-height:100%; border-radius:50%;">
        </mu-flex>
        <div wrap align-items="center" justify-content="center">
          <div>
            <span style="font-size:18px; font-weight:700; letter-spacing:1px; margin-left:1rem; color:#fff;">这里是我的昵称</span>
          </div>

          <div style="margin-top:.5rem;">
            <button style="margin-left:1rem; font-size:12px; background:#00bcd4; color:#fff; border:1px solid #fff; border-radius:.5rem; ">未绑定手机</button>
            <!-- <span style="font-size:14px;; letter-spacing:1px; margin-left:1rem; color:#fff;">13570363414</span> -->
          </div>
        </div>
      </mu-flex>

      <div style="position:absolute; right:1rem; top:1rem;">
        <svg-icon icon-class="config" class="icon-class" style="font-size:28px;"></svg-icon>
      </div>

    </mu-flex>

    <!-- 我的组队、我的关注、我的评论 -->

    <mu-row style="padding:1rem 2rem; background:#fff;" justify-content="between">
      <div style="border-radius:50%;">
        <div style="text-align:center;">
          <span style="font-size:25px; color:#4dd0e1;">0</span>
          <span>个</span>
        </div>
        <div>
          <span style="color:#78909c; font-size:15px; letter-spacing:1px;">招募中</span>
        </div>
      </div>

      <!-- 收藏：文章， 游戏 -->
      <div style="border-radius:50%;">
        <div style="text-align:center;">
          <span style="font-size:25px; color:#4dd0e1;">0</span>
          <span>个</span>
        </div>
        <div>
          <span style="color:#78909c; font-size:15px; letter-spacing:1px;">已成功</span>
        </div>
      </div>

      <div style="border-radius:50%;">
        <div style="text-align:center;">
          <span style="font-size:25px; color:#4dd0e1;">0</span>
          <span>个</span>
        </div>
        <div>
          <span style="color:#78909c; font-size:15px; letter-spacing:1px;">已结束</span>
        </div>
      </div>
    </mu-row>

    <mu-row style="padding:1rem; margin-top:.3rem; background:#fff;" align-items="center">
      <svg-icon icon-class="mine-game" class="icon-class"></svg-icon>
      <span style="margin-left:1rem; font-size:15px; letter-spacing:1px;">我的游戏</span>
      <svg-icon icon-class="arrow" class="icon-class" style="margin-left:auto;"></svg-icon>
    </mu-row>

    <mu-row style="padding:1rem; margin-top:.3rem; background:#fff;">
      <svg-icon icon-class="mine-like" class="icon-class"></svg-icon>
      <span style="margin-left:1rem; font-size:15px; letter-spacing:1px;">我的点赞</span>
      <svg-icon icon-class="arrow" class="icon-class" style="margin-left:auto;"></svg-icon>
    </mu-row>

    <div style="padding:0 0 0 17px;">
      <mu-divider></mu-divider>
    </div>

    <mu-row style="padding:1rem; background:#fff;">
      <svg-icon icon-class="mine-collect" class="icon-class"></svg-icon>
      <span style="margin-left:1rem; font-size:15px; letter-spacing:1px;">文章收藏</span>
      <svg-icon icon-class="arrow" class="icon-class" style="margin-left:auto;"></svg-icon>
    </mu-row>

    <mu-row style="padding:1rem; margin-top:.5rem; background:#fff;">
      <svg-icon icon-class="mine-idea" class="icon-class"></svg-icon>
      <span style="margin-left:1rem; font-size:15px; letter-spacing:1px;">意见反馈</span>
      <svg-icon icon-class="arrow" class="icon-class" style="margin-left:auto;"></svg-icon>
    </mu-row>

    <div class="footer">
      <Footer ref="footer"></Footer>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  mounted () {
    this.$refs.footer.linkToNav(3)
  },
  data () {
    return {

    }
  },
  components: {
    Footer
  }
}
</script>

<style scoped>
.footer{width:100%; position:fixed; bottom:0;}
.icon-class {font-size:24px;}
</style>


