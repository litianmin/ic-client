<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#00bcd4" z-depth="1">
      <mu-button icon slot="left">
        <svg-icon icon-class="msg" class="icon-class"></svg-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        组队消息
      </div>
    </mu-appbar>
    <!-- END 头部 -->

    <div style="padding:0 1rem; margin-bottom:2.5rem;">
      <mu-row style="margin-top:1rem; margin-bottom:1rem;" @click="linkToTeamMsg">
        <mu-col span="2" align-items="center" style="">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#673ab7; color:#fff; padding:.5rem; border-radius:.5rem;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify-game" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">游 戏</div>
            </div>
            <div v-if="Team.stats" class="notify-point"></div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
          <mu-row>
            <span class="notify-title">{{ Team.title }}</span> 
            <span class="notify-time">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span class="notify-desc span-omit">{{ Team.briefDesc }}</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;" @click="linkToTeamMsg">
        <mu-col span="2" align-items="center" style="">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#e040fb; color:#fff; padding:.5rem; border-radius:.5rem;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify-party" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">聚 会</div>
            </div>
            <div v-if="Team.stats" class="notify-point"></div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
          <mu-row>
            <span class="notify-title">{{ Team.title }}</span> 
            <span class="notify-time">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span class="notify-desc span-omit">{{ Team.briefDesc }}</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;" @click="linkToTeamMsg">
        <mu-col span="2" align-items="center" style="">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#4caf50; color:#fff; padding:.5rem; border-radius:.5rem;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify-travel" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">旅 游</div>
            </div>
            <div v-if="Team.stats" class="notify-point"></div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
          <mu-row>
            <span class="notify-title">{{ Team.title }}</span> 
            <span class="notify-time">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span class="notify-desc span-omit">{{ Team.briefDesc }}</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;" @click="linkToTeamMsg">
        <mu-col span="2" align-items="center" style="">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#ff5722; color:#fff; padding:.5rem; border-radius:.5rem;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify-instant" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">即 时</div>
            </div>
            <div v-if="Team.stats" class="notify-point"></div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
          <mu-row>
            <span class="notify-title">{{ Team.title }}</span> 
            <span class="notify-time">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span class="notify-desc span-omit">{{ Team.briefDesc }}</span>
          </mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;" @click="linkToTeamMsg">
        <mu-col span="2" align-items="center" style="">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#795548; color:#fff; padding:.5rem; border-radius:.5rem;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify-activity" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">活 动</div>
            </div>
            <div v-if="Team.stats" class="notify-point"></div>
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
          <mu-row>
            <span class="notify-title">{{ Team.title }}</span> 
            <span class="notify-time">10分钟前</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span class="notify-desc span-omit">{{ Team.briefDesc }}</span>
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
      console.log('什么鬼')
      this.$router.push('/notify/teamMsg')
    }
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

.notify-title {font-size:14px; color:#424242;}
.notify-time {margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem;}
.notify-desc {color:#9e9e9e; font-size:13px;}
.notify-point {position:absolute; top:-.2rem; right:.2rem; width:12px; height:12px; background:red; border:2px solid #fff; border-radius:50%;}

.footer{width:100%; position:fixed; bottom:0;}

.span-omit{
  width:100%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-break:keep-all;
}

</style>


