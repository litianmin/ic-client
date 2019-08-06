<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#00bcd4" z-depth="1">
      <mu-button icon slot="left">
        <svg-icon icon-class="msg" class="icon-class"></svg-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        消息中心
      </div>
    </mu-appbar>
    <!-- END 头部 -->

    <div style="padding:0 1rem; margin-bottom:2.5rem;">
      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="2" align-items="center" style="">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#03a9f4; color:#fff; padding:.5rem; border-radius:50%;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify_team" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">组 队</div>
            </div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: 0 0 0 .5rem;" align-self="center">
          <span v-if="Team.title.length == 0">暂无消息</span>
          <div v-else>
            <mu-row>
              <span class="notify-title">{{ Team.title }}</span> 
              <span class="notify-time">10分钟前</span>
            </mu-row>
            <mu-row style="margin-top:.2rem;">
              <span class="notify-desc">{{ Team.briefDesc }}</span>
            </mu-row>
          </div>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>


      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="2">
          <mu-flex style="width:100%; height:auto; color:#fff; " align-items="center" >
            <div style="width:3rem; height:3rem; background:#00bcd4; color:#fff; padding:.5rem; border-radius:50%;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify_sms" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">@ 你</div>
            </div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: 0 0 0 .5rem;" align-self="center">
          <span v-if="Comment.title.length == 0">暂无消息</span>
          <div v-else>
            <mu-row>
              <span class="notify-title">{{ Comment.title }}</span> 
              <span class="notify-time">10分钟前</span>
            </mu-row>
            <mu-row style="margin-top:.2rem;">
              <span class="notify-desc">{{ Comment.briefDesc }}</span>
            </mu-row>
          </div>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="2">
          <mu-flex style="width:100%; height:auto; color:#fff;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#009688; color:#fff; padding:.5rem; border-radius:50%;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify_member" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">会 员</div>
            </div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: 0 0 0 .5rem;" align-self="center">
          <span v-if="Member.title.length == 0">暂无消息</span>
          <div v-else>
            <mu-row>
              <span class="notify-title">{{ Member.title }}</span> 
              <span class="notify-time">10分钟前</span>
            </mu-row>
            <mu-row style="margin-top:.2rem;">
              <span class="notify-desc">{{ Member.briefDesc }}</span>
            </mu-row>
          </div>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="2">
          <mu-flex style="width:100%; height:auto; color:#fff;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#4caf50; color:#fff; padding:.5rem; border-radius:50%;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify_activity" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">活 动</div>
            </div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: 0 0 0 .5rem;" align-self="center">
          <span v-if="Activity.title.length == 0">暂无消息</span>
          <div v-else>
            <mu-row>
              <span class="notify-title">{{ Activity.title }}</span> 
              <span class="notify-time">10分钟前</span>
            </mu-row>
            <mu-row style="margin-top:.2rem;">
              <span class="notify-desc">{{ Activity.briefDesc }}</span>
            </mu-row>
          </div>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="2">
          <mu-flex style="width:100%; height:auto; color:#fff;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#673ab7; color:#fff; padding:.5rem; border-radius:50%;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify_annoucement" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">公 告</div>
            </div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: 0 0 0 .5rem;" align-self="center">
          <span v-if="Annoucement.title.length == 0">暂无消息</span>
          <div v-else>
            <mu-row>
              <span class="notify-title">{{ Annoucement.title }}</span> 
              <span class="notify-time">10分钟前</span>
            </mu-row>
            <mu-row style="margin-top:.2rem;">
              <span class="notify-desc">{{ Annoucement.briefDesc }}</span>
            </mu-row>
          </div>
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
      Team: {
        briefDesc: '',
        category: 1,
        createTime: 1565077882,
        displayImg: '',
        id: 1,
        module: 2,
        readStatus: 0,
        stats: 0,
        title: ''
      },
      Comment: {
        briefDesc: '',
        category: 1,
        createTime: 1565077882,
        displayImg: '',
        id: 1,
        module: 2,
        readStatus: 0,
        stats: 0,
        title: ''
      },
      Member: {
        briefDesc: '',
        category: 1,
        createTime: 1565077882,
        displayImg: '',
        id: 1,
        module: 2,
        readStatus: 0,
        stats: 0,
        title: ''
      },
      Activity: {
        briefDesc: '',
        category: 1,
        createTime: 1565077882,
        displayImg: '',
        id: 1,
        module: 2,
        readStatus: 0,
        stats: 0,
        title: ''
      },
      Annoucement: {
        briefDesc: '',
        category: 1,
        createTime: 1565077882,
        displayImg: '',
        id: 1,
        module: 2,
        readStatus: 0,
        stats: 0,
        title: ''
      },
      MsgList: [],
      Status: [],
    }
  },
  mounted () {
    this.$refs.footer.linkToNav(2)
    this.$axios.post(
      '/notify/mainpage', {}
    ).then((resp)=>{
      if(resp.data.code == 20000) {
        let msgList = resp.data.msg.msgList
        msgList.map(v => {
          switch(v.category) {
          case 1:
            this.Team = v
            console.log(this.Team)
            break
          case 2:
            this.Comment = v
            break
          case 3:
            this.Member = v
            break
          case 4:
            this.Activity = v
            break
          case 5:
            this.Annoucement = v
            break
          default:
            break
          }
          if(v.category == 1) {
            this.TeamNotify = v
          }
        })
      }
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


