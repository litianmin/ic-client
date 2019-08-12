<template>
  <div>
    <div style="padding:.5rem;">
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
        <span @click="newChat(Info.userID, Info.chatID, Info.nickname)" class="reply-button"> 回复</span>
      </mu-row>

      <mu-row v-if="Info.replyCont" class="reply-origin-row">
        <span><span style="color:#795548;">你：</span>{{ Info.replyCont }}</span>
      </mu-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      NotifyID: 0,
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
        }else{
          this.$toast.message('发生未知错误')
        }
        console.log(resp)
      })
    }
  }
}
</script>

<style scope>
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