<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#00bcd4" z-depth="1">
      <mu-button icon slot="left">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        消息中心
      </div>
    </mu-appbar>
    <!-- END 头部 -->

    <div style="padding:1rem;">
      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:auto; color:#fff;" align-items="center" >
              <div style="width:3.8rem; height:3.8rem; background:#03a9f4; color:#fff; padding:.5rem; border-radius:50%;">
                <div style="text-align:center;">
                  <svg-icon icon-class="notify_team" class="icon-class"></svg-icon>
                </div>
                <div style="text-align:center; font-size:13px;">组 队</div>
              </div>
          </mu-flex>
        </mu-col>
        <mu-col span="9" align-self="center">
          <mu-row>
            <span style="font-size:18px; font-weight:700;">组队成功</span> 
            <span style="margin-left:auto; font-size:14px; color:#9e9e9e; margin-right:.5rem;">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span style="color:#757575; font-size:16px;">这里是我的详细内容，不要问，</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>


      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:auto; color:#fff;" align-items="center" >
              <div style="width:3.8rem; height:3.8rem; background:#00bcd4; color:#fff; padding:.5rem; border-radius:50%;">
                <div style="text-align:center;">
                  <svg-icon icon-class="notify_sms" class="icon-class"></svg-icon>
                </div>
                <div style="text-align:center; font-size:13px;">@ 你</div>
              </div>
          </mu-flex>
        </mu-col>
        <mu-col span="9" align-self="center">
          <mu-row>
            <span style="font-size:18px; font-weight:700;">系统</span> 
            <span style="margin-left:auto; font-size:14px; color:#9e9e9e; margin-right:.5rem;">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span style="color:#757575; font-size:16px;">这里是我的详细内容，不要问，</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:auto; color:#fff;" align-items="center" >
              <div style="width:3.8rem; height:3.8rem; background:#009688; color:#fff; padding:.5rem; border-radius:50%;">
                <div style="text-align:center;">
                  <svg-icon icon-class="notify_member" class="icon-class"></svg-icon>
                </div>
                <div style="text-align:center; font-size:13px;">会 员</div>
              </div>
          </mu-flex>
        </mu-col>
        <mu-col span="9" align-self="center">
          <mu-row>
            <span style="font-size:18px; font-weight:700;">组队成功</span> 
            <span style="margin-left:auto; font-size:14px; color:#9e9e9e; margin-right:.5rem;">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span style="color:#757575; font-size:16px;">这里是我的详细内容，不要问，</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:auto; color:#fff;" align-items="center" >
              <div style="width:3.8rem; height:3.8rem; background:#4caf50; color:#fff; padding:.5rem; border-radius:50%;">
                <div style="text-align:center;">
                  <svg-icon icon-class="notify_activity" class="icon-class"></svg-icon>
                </div>
                <div style="text-align:center; font-size:13px;">活 动</div>
              </div>
          </mu-flex>
        </mu-col>
        <mu-col span="9" align-self="center">
          <mu-row>
            <span style="font-size:18px; font-weight:700;">组队成功</span> 
            <span style="margin-left:auto; font-size:14px; color:#9e9e9e; margin-right:.5rem;">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span style="color:#757575; font-size:16px;">这里是我的详细内容，不要问，</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:auto; color:#fff;" align-items="center" >
              <div style="width:3.8rem; height:3.8rem; background:#673ab7; color:#fff; padding:.5rem; border-radius:50%;">
                <div style="text-align:center;">
                  <svg-icon icon-class="notify_annoucement" class="icon-class"></svg-icon>
                </div>
                <div style="text-align:center; font-size:13px;">公 告</div>
              </div>
          </mu-flex>
        </mu-col>
        <mu-col span="9" align-self="center">
          <mu-row>
            <span style="font-size:18px; font-weight:700;">组队成功</span> 
            <span style="margin-left:auto; font-size:14px; color:#9e9e9e; margin-right:.5rem;">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span style="color:#757575; font-size:16px;">这里是我的详细内容，不要问，</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

    </div>

    <div class="footer">
      <Footer ref="footer"></Footer>
    </div>

  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  mounted () {
    this.$refs.footer.linkToNav(2)
  },
  components: {
    Footer,
  },
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
.icon-class {font-size:22px;}
.footer{width:100%; position:fixed; bottom:0;}
</style>


