<template>
  <div style="width:100%;">

    <mu-flex 
      align-items="center" 
      class="head-div" 
      wrap="wrap">

      <mu-flex align-items="center" style="padding:0 1rem;">
        <mu-flex class="avatar-contain">
          <img :src="$store.state.mdeLogin.usrInfo.avatar | imgPrefixDeal()" class="avatar">
        </mu-flex>
        <div wrap align-items="center" justify-content="center">
          <div>
            <span class="nickname">{{ $store.state.mdeLogin.usrInfo.nickname }}</span>
          </div>

          <div style="margin-top:.5rem;">
            <button class="bind-mobile-btn">未绑定手机</button>
            <!-- <span style="font-size:14px;; letter-spacing:1px; margin-left:1rem; color:#fff;">13570363414</span> -->
          </div>
        </div>
      </mu-flex>

      <div 
        @click="$router.push('/usr/personInfoEdit')" 
        class="config-div">
        <svg-icon icon-class="config" class="icon-class" style="font-size:28px;"></svg-icon>
      </div>

    </mu-flex>

    <!-- 我的组队、我的关注、我的评论 -->

    <mu-row class="team-stats-contain" justify-content="between">
      <div 
        @click="linkToJoinTeamList(0)"
        style="border-radius:50%;">
        <div style="text-align:center;">
          <span class="stats-span1">{{ TeamRecruiting }}</span>
          <span>个</span>
        </div>
        <div>
          <span class="status-span2">招募中</span>
        </div>
      </div>

      <!-- 收藏：文章， 游戏 -->
      <div 
        @click="linkToJoinTeamList(3)"
        style="border-radius:50%;">
        <div style="text-align:center;">
          <span class="stats-span1">{{ TeamSuccess }}</span>
          <span>个</span>
        </div>
        <div>
          <span class="status-span2">已成功</span>
        </div>
      </div>

      <div 
        @click="linkToJoinTeamList(1)"
        style="border-radius:50%;">
        <div style="text-align:center;">
          <span class="stats-span1">{{ TeamFinished }}</span>
          <span>个</span>
        </div>
        <div>
          <span class="status-span2">已结束</span>
        </div>
      </div>
    </mu-row>

    <mu-row
      @click="$router.push('/usr/friendList')"
      class="friend-container">
      <svg-icon icon-class="friend-list-green" class="icon-class"></svg-icon>
      <span class="common-span">我的玩友</span>
      <svg-icon icon-class="arrow" class="icon-class" style="margin-left:auto;"></svg-icon>
    </mu-row>

    <mu-row 
      @click="$router.push('/usr/gameCollect')" 
      class="game-container" 
      align-items="center">
      <svg-icon icon-class="mine-game" class="icon-class"></svg-icon>
      <span class="common-span">我的游戏</span>
      <svg-icon icon-class="arrow" class="icon-class" style="margin-left:auto;"></svg-icon>
    </mu-row>


    <div style="padding:0 0 0 17px;">
      <mu-divider></mu-divider>
    </div>

    <mu-row 
      @click="$router.push('/usr/articleCollect')"
      class="article-container">
      <svg-icon icon-class="mine-collect" class="icon-class"></svg-icon>
      <span class="common-span">文章收藏</span>
      <svg-icon icon-class="arrow" class="icon-class" style="margin-left:auto;"></svg-icon>
    </mu-row>

    <mu-row 
      @click="$router.push('/usr/advise')"
      class="adivse-container">
      <svg-icon icon-class="mine-idea" class="icon-class"></svg-icon>
      <span class="common-span">意见反馈</span>
      <svg-icon icon-class="arrow" class="icon-class" style="margin-left:auto;"></svg-icon>
    </mu-row>

    <Footer navActive="personnalMsg"></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  components: {
    Footer
  },
  data () {
    return {
      TeamRecruiting: 0,
      TeamFinished: 0,
      TeamSuccess: 0,
    }
  },
  mounted () {
    this.pageInit()
  },
  methods: {
    pageInit () {
      this.$axios.get("/user/personalpage", {}).then((resp) => {
        if(resp.data.code != 20000) {
          this.$toast.message(resp.msg)
          return
        }
        let data = resp.data.msg
        this.TeamRecruiting = data.teamRecruiting
        this.TeamFinished = data.teamFinished
        this.TeamSuccess = data.teamSuccess
      })
    },
    linkToJoinTeamList (type) {
      this.$router.push(`/usr/jointeamList/${type}`)
    },
  }
}
</script>

<style scoped>
.head-div {
  width:100%; 
  height:auto; 
  padding:2rem 0; 
  background: linear-gradient(to right, #4dd0e1 , #80cbc4); 
  box-shadow: 0px 0px 1px #888888; 
  position:relative;
}

.avatar-contain {
  width:3.8rem; 
  height:3.8rem; 
  border:2px solid #fff; 
  border-radius:50%;
}

.avatar {
  max-width:100%; 
  max-height:100%; 
  border-radius:50%;
}

.nickname {
  font-size:18px; 
  font-weight:700; 
  letter-spacing:1px; 
  margin-left:1rem; 
  color:#fff;
}

.bind-mobile-btn {
  margin-left:1rem; 
  font-size:12px; 
  background:#00bcd4; 
  color:#fff; 
  border:1px solid #fff; 
  border-radius:.5rem;
}

.config-div {
  position:absolute; 
  right:1rem; 
  top:1rem;
}

.team-stats-contain {
  padding:1rem 2rem; 
  background:#fff;
}

.stats-span1 {
  font-size:25px; 
  color:#4dd0e1;
}

.status-span2 {
  color:#78909c; 
  font-size:15px; 
  letter-spacing:1px;
}

.friend-container {
  padding:1rem; 
  margin-top:.3rem; 
  background:#fff;
}

.game-container {
  padding:1rem; 
  margin-top:.3rem; 
  background:#fff;
}

.article-container {
  padding:1rem; 
  background:#fff;
}

.adivse-container {
  padding:1rem; 
  margin-top:.5rem; 
  background:#fff;
}

.common-span {
  margin-left:1rem; 
  font-size:15px; 
  letter-spacing:1px;
}

.icon-class {font-size:24px;}
</style>


