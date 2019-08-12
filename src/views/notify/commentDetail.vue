<template>
  <div>

    <mu-flex align-items="center" style="width:100%; padding:1rem 1rem .5rem 1rem; margin-bottom:0rem;">
      <svg-icon icon-class="detail" class="icon-class"></svg-icon>
      <span style="margin-left:.5rem; font-size:14px; font-weight:700; color:#757575; letter-spacing:1px;">回复详情</span>
    </mu-flex>

    <mu-divider></mu-divider>

    <div style="padding:1rem .5rem;">
      <mu-flex align-items="center">
        <mu-avatar size="35" :class="Info.sex == 1 ? 'avatar-male' : 'avatar-female'">
          <img :src="Info.avatar | imgPrefixDeal()">
        </mu-avatar>
        <span class="nickname">
          {{ Info.nickname }}
        </span>
      </mu-flex>

      <mu-row class="reply-row">
        <span class="reply-span">
          <span style="color:#795548; font-size:13px;">@你: </span>
          <span>{{ Info.cont }}</span>
        </span>
      </mu-row>

      <mu-row v-if="Info.img" class="img-row">
        <img class="img-self" :src="Info.img | imgPrefixDeal()">
      </mu-row>

      <mu-row class="create-time">
        <span style="color:#757575;">{{ Info.createTime | formatTime('{y}/{m}/{d} {h}:{i}') }} ·</span>  
        <span @click="newChat(true, Info.userID, Info.chatID, Info.nickname)" class="reply-button"> 回复</span>
      </mu-row>

      <mu-row v-if="Info.replyCont" class="reply-origin-row">
        <span><span style="color:#795548;">你：</span>{{ Info.replyCont }}</span>
      </mu-row>
    </div>

    <mu-flex align-items="center" justify-content="between" style="position:fixed; bottom:0; left:0; width:100%; margin-top:1.5rem; padding:.5rem; background:#eeeeee;">
      <mu-button @click="linkToDetail" style="width:73%; " color="#00bcd4">
        <span style="letter-spacing:1px;">{{ ButtonDesc }}</span>
      </mu-button>

      <mu-button style="width:20%;" color="success" @click="newChat(true, Info.userID, Info.chatID, Info.nickname)">
        <span style="letter-spacing:1px;">回复</span>
      </mu-button>

    </mu-flex>

  </div>
</template>

<script>
export default {
  data () {
    return {
      NotifyID: 0,
      TeamType: 0,
      TeamID: 0,
      ButtonDesc: '',
      Info: {}
    }
  },
  mounted () {
    this.NotifyID = this.$route.params.notifyID
    this.pageInit()
  },
  methods: {
    pageInit () {
      this.$axios.get(`/notify/chatDetail/${this.NotifyID}`, {}).then((resp)=>{
        if(resp.data.code == 20000) {
          this.Info = resp.data.msg
          this.TeamType = this.Info.teamType
          this.TeamID = this.Info.teamID
          switch(this.TeamType) {
          case 1:
            this.ButtonDesc = '跳转到该游戏组队'
            break
          case 2:
            this.ButtonDesc = '跳转到该聚会组队'
            break
          case 3:
            this.ButtonDesc = '跳转到该旅游组队'
            break
          case 4:
            this.ButtonDesc = '跳转到该即时组队'
            break
          case 5:
            this.ButtonDesc = '跳转到该活动组队'
            break
          case 6:
            this.ButtonDesc = '跳转到该文章详情'
            break
          case 7:
            this.ButtonDesc = '跳转到该游戏评论'
            break
          }
        }else{
          this.$toast.message('发生未知错误')
        }
      })
    },
    newChat (isReply, replyTo, replyID, replyNickname) {
      this.$router.push({path:`/common/newChat`, query:{teamType:this.TeamType, teamID:this.TeamID, isReply, replyTo, replyID, replyNickname}})
    },
    linkToDetail () {
      switch(this.TeamType) {
      case 1: // 游戏模块
        this.$router.push(`/game/detail/${this.TeamID}`)
        break 
      case 2: // party
        this.$router.push(`/party/teamDetail/${this.TeamID}`)
        break
      case 3: // travel
        this.$router.push(`/travel/teamDetail/${this.TeamID}`)
        break
      case 4: // instant
        this.$router.push(`/instant/detail/${this.TeamID}`)
        break
      case 5: // activity
        this.$router.push(`/activity/detail/${this.TeamID}`)
        break
      case 6: // article
        this.$router.push(`/article/detail/${this.TeamID}`)
        break
      case 7: // 游戏评论
        this.$router.push(`/game/commentDetail/${this.TeamID}`)
        break
      }
    }
  }
}
</script>

<style scope>
.icon-class {font-size:17px;}
.chat-container { padding:.5rem .5rem; }
.avatar-male { padding:.1rem; border:1px solid #03a9f4; border-radius:50%; background:white; }
.avatar-female { padding:.1rem; border:1px solid #e91e63; border-radius:50%; background:white; }
.nickname { font-size:14px; font-weight:700; margin-left:.5rem; margin-right:.5rem; color:#424242; letter-spacing: 1px; }

.reply-row { font-size:15px; padding:.2rem 1rem 0 2rem; color:#424242; }
.reply-span { margin-left:.5rem; letter-spacing: 1px; }

.img-row { padding:.5rem .5rem .5rem 2.3rem; font-size:12px; color:#616161; }
.img-self { max-width:100%; max-height:10rem; border-radius:.3rem; }

.create-time { padding: .5rem 0 0 2.5rem; font-size:13px; margin-bottom:1rem; }
.reply-button { color:green; margin-left:.3rem; }

.reply-origin-row { background:#eeeeee; padding:.5rem; margin-right:1.5rem; margin-left:2.2rem; letter-spacing: 1px; margin-bottom:1rem; }

.no-more-reply { padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; margin-bottom:3rem; color:#9e9e9e; }
</style>