<template>
  <div>
    <!-- BEGIN 头部 -->
    <!-- <mu-appbar class="mine-appbar" color="#00bcd4" z-depth="1">
      <mu-button icon slot="left">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        消息中心
      </div>
    </mu-appbar> -->
    <!-- END 头部 -->

    <div style="padding:0 1rem; margin-bottom:2.5rem;">
      <mu-divider></mu-divider>
      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:auto; color:#fff; padding:0 0 0 .5rem;" align-items="center" >
              <div style="width:3rem; height:3rem; background:#03a9f4; color:#fff; padding:.5rem; border-radius:50%;">
                <div style="text-align:center;">
                  <svg-icon icon-class="notify_team" class="icon-class"></svg-icon>
                </div>
                <div class="icon-font">组 队</div>
              </div>
          </mu-flex>
        </mu-col>
        <mu-col span="9" align-self="center">
          <mu-row>
            <span class="notify-title">组队成功</span> 
            <span class="notify-time">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span class="notify-desc">这里是我的详细内容，不要问，</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>


      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:auto; color:#fff; padding:0 0 0 .5rem;" align-items="center" >
              <div style="width:3rem; height:3rem; background:#00bcd4; color:#fff; padding:.5rem; border-radius:50%;">
                <div style="text-align:center;">
                  <svg-icon icon-class="notify_sms" class="icon-class"></svg-icon>
                </div>
                <div class="icon-font">@ 你</div>
              </div>
          </mu-flex>
        </mu-col>
        <mu-col span="9" align-self="center">
          <mu-row>
            <span class="notify-title">系统</span> 
            <span class="notify-time">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span class="notify-desc">这里是我的详细内容，不要问，</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:auto; color:#fff; padding:0 0 0 .5rem;" align-items="center" >
              <div style="width:3rem; height:3rem; background:#009688; color:#fff; padding:.5rem; border-radius:50%;">
                <div style="text-align:center;">
                  <svg-icon icon-class="notify_member" class="icon-class"></svg-icon>
                </div>
                <div class="icon-font">会 员</div>
              </div>
          </mu-flex>
        </mu-col>
        <mu-col span="9" align-self="center">
          <mu-row>
            <span class="notify-title">组队成功</span> 
            <span class="notify-time">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span class="notify-desc">这里是我的详细内容，不要问，</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:auto; color:#fff; padding:0 0 0 .5rem;" align-items="center" >
              <div style="width:3rem; height:3rem; background:#4caf50; color:#fff; padding:.5rem; border-radius:50%;">
                <div style="text-align:center;">
                  <svg-icon icon-class="notify_activity" class="icon-class"></svg-icon>
                </div>
                <div class="icon-font">活 动</div>
              </div>
          </mu-flex>
        </mu-col>
        <mu-col span="9" align-self="center">
          <mu-row>
            <span class="notify-title">组队成功</span> 
            <span class="notify-time">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span class="notify-desc">这里是我的详细内容，不要问，</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:auto; color:#fff; padding:0 0 0 .5rem;" align-items="center" >
              <div style="width:3rem; height:3rem; background:#673ab7; color:#fff; padding:.5rem; border-radius:50%;">
                <div style="text-align:center;">
                  <svg-icon icon-class="notify_annoucement" class="icon-class"></svg-icon>
                </div>
                <div class="icon-font">公 告</div>
              </div>
          </mu-flex>
        </mu-col>
        <mu-col span="9" align-self="center">
          <mu-row>
            <span class="notify-title">组队成功</span> 
            <span class="notify-time">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span class="notify-desc">这里是我的详细内容，不要问，</span>
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
  data () {
    return {
      MsgList: [],
      Status: [],
    }
  },
  mounted () {
    this.$refs.footer.linkToNav(2)

    this.$axios.post(
      '/notify/mainpage', {}
    ).then((resp)=>{
      console.log(resp)
    })
  },
  components: {
    Footer,
  },
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
.icon-class {font-size:16px;}
.icon-font {text-align:center; font-size:11px;}

.notify-title {font-size:15px; font-weight:700; color:#424242;}
.notify-time {margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem;}
.notify-desc {color:#757575; font-size:13px;}

.footer{width:100%; position:fixed; bottom:0;}
</style>


