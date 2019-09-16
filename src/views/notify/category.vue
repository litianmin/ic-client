<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-flex 
      style="padding:.6rem .8rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0 0 1px #26c6da; margin-bottom:.5rem;" 
      align-items="center">
      <mu-flex align-items="center">
        <svg-icon icon-class="msg" class="icon-class"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">消息中心</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <div style="padding:0 1rem; margin-bottom:2.5rem;">
      <mu-row style="margin-top:1rem; margin-bottom:1rem;" @click="linkToTeamMsg">
        <mu-col span="2" align-items="center" style="">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#03a9f4; color:#fff; padding:.5rem; border-radius:.5rem;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify_team" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">组 队</div>
            </div>
            <div v-if="Team.stats > 0" class="notify-point"></div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
          <span v-if="Team.title.length == 0">暂无消息</span>
          <div v-else>
            <mu-row>
              <span class="notify-title">{{ Team.title }}</span> 
              <span class="notify-time">{{ Team.createTime | parseUnixToDesc() }}</span>
            </mu-row>
            <mu-row style="margin-top:.2rem;">
              <span class="notify-desc span-omit">{{ Team.briefDesc }}</span>
            </mu-row>
          </div>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>


      <mu-row style="margin-top:1rem; margin-bottom:1rem;" @click="linkToCommentMsg">
        <mu-col span="2">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#00bcd4; color:#fff; padding:.5rem; border-radius:.5rem;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify_sms" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">@ 你</div>
            </div>
            <div v-if="Comment.stats" class="notify-point"></div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
          <span v-if="Comment.title.length == 0">暂无消息</span>
          <div v-else>
            <mu-row>
              <span class="notify-title">{{ Comment.title }}</span> 
              <span class="notify-time">{{ Comment.createTime | parseUnixToDesc() }}</span>
            </mu-row>
            <mu-row style="margin-top:.2rem;">
              <span class="notify-desc span-omit">{{ Comment.briefDesc }}</span>
            </mu-row>
          </div>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="2">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#009688; color:#fff; padding:.5rem; border-radius:.5rem;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify_member" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">会 员</div>
            </div>
            <div v-if="Member.stats" class="notify-point"></div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
          <span v-if="Member.title.length == 0">暂无消息</span>
          <div v-else>
            <mu-row>
              <span class="notify-title">{{ Member.title }}</span> 
              <span class="notify-time">{{ Member.createTime | parseUnixToDesc() }}</span>
            </mu-row>
            <mu-row style="margin-top:.2rem;">
              <span class="notify-desc span-omit">{{ Member.briefDesc }}</span>
            </mu-row>
          </div>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="2">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#4caf50; color:#fff; padding:.5rem; border-radius:.5rem;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify_activity" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">活 动</div>
              <div v-if="Activity.stats" class="notify-point"></div>
            </div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
          <span v-if="Activity.title.length == 0">暂无消息</span>
          <div v-else>
            <mu-row>
              <span class="notify-title">{{ Activity.title }}</span> 
              <span class="notify-time">{{ Activity.createTime | parseUnixToDesc() }}</span>
            </mu-row>
            <mu-row style="margin-top:.2rem;">
              <span class="notify-desc span-omit">{{ Activity.briefDesc }}</span>
            </mu-row>
          </div>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="2">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#673ab7; color:#fff; padding:.5rem; border-radius:.5rem;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify_annoucement" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">公 告</div>
              <div v-if="Annoucement.stats" class="notify-point"></div>
            </div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
          <span v-if="Annoucement.title.length == 0">暂无消息</span>
          <div v-else>
            <mu-row>
              <span class="notify-title">{{ Annoucement.title }}</span> 
              <span class="notify-time">{{ Annoucement.createTime | parseUnixToDesc() }}</span>
            </mu-row>
            <mu-row style="margin-top:.2rem;">
              <span class="notify-desc span-omit">{{ Annoucement.briefDesc }}</span>
            </mu-row>
          </div>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

    </div>

    <Footer navActive="msg"></Footer>

  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Footer,
  },
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

        let statsList = resp.data.msg.stats
        this.Team.stats = statsList.team
        this.Comment.stats = statsList.comment
        this.Member.stats = statsList.member
        this.Activity.stats = statsList.activity
        this.Annoucement.stats = statsList.annoucement

      }
      console.log(resp)
    })
  },
  methods: {
    linkToTeamMsg () {
      this.$router.push('/notify/teamMsg')
    },
    linkToCommentMsg () {
      this.$router.push('/notify/commentMsg')
    }
  },

}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
.icon-class {font-size:16px;}
.icon-font {text-align:center; font-size:11px;}

.notify-title {font-size:14px; color:#616161;}
.notify-time {margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem;}
.notify-desc {color:#9e9e9e; font-size:13px;}
.notify-point {position:absolute; top:-.2rem; right:.2rem; width:12px; height:12px; background:red; border:2px solid #fff; border-radius:50%;}

.span-omit{
  width:100%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-break:keep-all;
}

</style>


