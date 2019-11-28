<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-flex 
      class="gb-top-bar" 
      align-items="center">
      <mu-flex align-items="center" @click="$router.go(-1)">
        <svg-icon icon-class="goback" style="font-size:20px;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">{{ MainInfo.nickname }} 的队伍</span>
      </mu-flex>

      <mu-flex style="margin-left:auto; margin-right:.5rem;">
        <span  @click="ExpandBox = true">
          <svg-icon icon-class="more-white" style="font-size:20px;"></svg-icon>
        </span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <div style="margin-bottom:3rem; margin-top:2.5rem;">  
      <mu-container class="main-team-container" style="position:relative;">
        <mu-flex align-items="center">
          <mu-avatar size="30" @click="$router.push(`/usr/usercard/${MainInfo.sponser}`)">
            <img :src="MainInfo.avatar | imgPrefixDeal()">
          </mu-avatar>
          <span class="team-item-nickname">
            {{ MainInfo.nickname }} <span class="character-title">( 队长 )</span>
          </span>
          <span class="reply-time">{{ MainInfo.createTime | formatTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </mu-flex>

        <mu-row class="team-item-text">
          {{ MainInfo.recruitWord }}
        </mu-row>

        <mu-row v-if="MainInfo.recruitImg" class="team-item-img">
          <img :src="MainInfo.recruitImg | imgPrefixDeal()" alt="">
        </mu-row>
      </mu-container>


      <!-- 队友表 -->
      <mu-flex 
        v-for="(item, index) in TeammateList"
        :key="index"
        class="teammate-container" 
        wrap="wrap" 
        align-items="center">
        <mu-flex class="teammate-role-flex">
          <img 
            class="teammate-role-img"
            :src="item.roleImg | imgPrefixDeal()">
        </mu-flex>
        <mu-flex class="teammate-info-flex" wrap="wrap">
          <mu-flex style="width:100%;" align-items="center">
            <img 
              @click="$router.push(`/usr/usercard/${item.userID}`)"
              class="teammate-avatar" 
              :src="item.avatar">
            <span class="team-item-nickname">{{ item.nickname }}</span>
          </mu-flex>
          <mu-flex class="teammate-word">{{ item.word }}</mu-flex>
        </mu-flex>
      </mu-flex>

      <!-- 聊天表 -->
      <ChatList :TeamType="TeamType" :TeamID="TeamID"></ChatList>
    </div>

    <!-- 发起评论框 -->
    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:80%;" @click="newChat(false, 0, 0, '')">
        <input type="text" placeholder="我也来说一句吧" disabled>
      </div>

      <!-- 已加入，如果队伍招募中，显示招募按钮 -->
      <span 
        v-if="MainInfo.teamStatus == 0 && SelfInfo.joinStatus == 3" 
        @click="inviteFriend" 
        style="font-size:19px; margin-left:auto;">
        <svg-icon icon-class="team-invite"></svg-icon>
      </span>

      <!-- 已离队或者未加入组队， 并且队伍招募中 -->
      <span 
        v-if="MainInfo.teamStatus == 0 && SelfInfo.joinStatus == 4" 
        @click="joinTeam" 
        style="font-size:17px; margin-left:auto; margin-top:.1rem;">
        <svg-icon icon-class="jointeam"></svg-icon>
      </span>

      <!-- 队伍已完成，显示完成 -->
      <span 
        v-if="MainInfo.teamStatus == 1 " 
        style="font-size:18px; margin-left:auto; margin-top:.1rem;">
        <svg-icon icon-class="team-finish"></svg-icon>
      </span>

      <span 
        @click="$refs.shareGuide.show()" 
        style="font-size:20px; margin-left:auto; margin-right:.3rem;">
        <svg-icon icon-class="share-3d"></svg-icon>
      </span>

    </mu-flex>

    <!-- 底部弹出框 -->
    <mu-bottom-sheet :open.sync="ExpandBox" :lock-scroll="true">
      <mu-list @item-click="ExpandBox = false">

        <mu-list-item 
          button 
          v-if="SelfInfo.joinStatus == 3" 
          @click="leaveTeam">
          <mu-list-item-action>
            <svg-icon icon-class="leave-team-green" style="font-size:20px;"></svg-icon>
          </mu-list-item-action>
          <mu-list-item-title>
            <span style="color:#424242; letter-spacing:1px;">离开组队</span>
          </mu-list-item-title>
        </mu-list-item>

        <mu-list-item 
          v-if="MainInfo.teamStatus == 0 && SelfInfo.joinStatus == 4" 
          @click="joinTeam"
          button>
          <mu-list-item-action>
            <svg-icon icon-class="join-team-green" style="font-size:20px;"></svg-icon>
          </mu-list-item-action>
          <mu-list-item-title>
            <span style="color:#424242; letter-spacing:1px;">加入组队</span>
          </mu-list-item-title>
        </mu-list-item>

        <mu-list-item 
          v-if="MainInfo.teamStatus == 0 && SelfInfo.joinStatus == 3" 
          @click="inviteFriend"
          button>
          <mu-list-item-action>
            <svg-icon icon-class="team-invite" style="font-size:20px;"></svg-icon>
          </mu-list-item-action>
          <mu-list-item-title>
            <span style="color:#424242; letter-spacing:1px;">邀请好友</span>
          </mu-list-item-title>
        </mu-list-item>

      </mu-list>
    </mu-bottom-sheet>

    <WxShareGuide ref="shareGuide"/>

  </div>
</template>

<script>
import { wxInit } from '@/common/wxInit.js'
import ChatList from '@/components/ChatList.vue'
import WxShareGuide from '@/components/WxShareGuide.vue'
export default {
  components: {
    ChatList,
    WxShareGuide,
  },
  data () {
    return {
      ShareTitle: '', // 分享title
      ShareDesc: '',  // 分享描述
      ShareImgUrl: '',  // 分享图片

      TeamType: 1,  // 固定值，这个应该配置在全局的，后面做
      Title: '队伍招募中。。。',
      TeamID: 0,
      GameID: 0,

      MainInfo: { // 主要的信息
        sponser: 0, // 发起人用户id
        avatar: '', 
        nickname: '',
        recruitImg: '',
        recruitWord: '',
        recruitNumb: 0,
        teamStatus: 0,  // 队伍当前状态
        createTime: 0
      },

      SelfInfo: { // 当前用户相关状态
        isCaptain: false, // 是否为队长
        joinStatus: 0 // 加入的状态
      },

      TeammateList: [], // 队友列表

      ExpandBox: false,
    }
  },
  created () {
    this.TeamID = this.$route.params.teamid
  },
  mounted () {
    wxInit(this, false)
  },
  methods: {
    pageInit () {
      // 页面初始化
      this.$axios.post(`/game/teamDetail/${this.TeamID}`, {}).then((resp)=>{

        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          this.$router.go(-1)
          return
        }
        let data = resp.data.msg 

        this.MainInfo = { // 主要的信息
          sponser: data.teammate[0].userID, 
          avatar: data.teammate[0].avatar, 
          nickname: data.teammate[0].nickname,
          recruitImg: data.recruitImg,
          recruitWord: data.recruitWord,
          recruitNumb: data.recruitNumb,
          teamStatus: data.teamStatus,
          createTime: data.createTime
        }
        this.SelfInfo = { 
          isCaptain: data.isCaptain, 
          joinStatus: data.selfJoinStatus 
        }
        this.TeammateList = data.teammate

        // 微信分享
        this.ShareTitle = `一起玩游戏咯，万年单机，万年单身！`   // 分享title
        this.ShareDesc = this.MainInfo.recruitWord   // 分享描述

      })
    },

    inviteFriend () { // 邀请好友
      this.$router.push(`/usr/inviteFriend/${this.TeamID}/${this.TeamType}`)
    },

    joinTeam () {
      this.$router.push(`/game/joinTeam/${this.TeamID}`)
    },

    leaveTeam () {  // 离开组队
      // 先判断是否为队长，如果是队长，提示会解散队伍
      // 并且如果是队长，只有组队中才可以解散
      if(this.SelfInfo.isCaptain == true) {
        this.$confirm('是否解散队伍？').then((resp)=>{
          if(resp.result == true) { // 确定解散队伍
            this.leaveTeamReq()
          }
        })
      } else {
        this.leaveTeamReq()
      }
    },

    leaveTeamReq () {
      this.$axios.get(`/common/leaveTeam/${this.TeamType}/${this.TeamID}`, {}).then((resp)=>{
        if(resp.data.code == 20000) {
          this.$toast.success('已成功退出组队！')
          this.$router.push(`/game/detail/${this.GameID}`)
          return
        }
      }) 
    },

    newChat (isReply, replyTo, replyID, replyNickname) {
      // 只有加入组队的人才能进行评论
      if(this.SelfInfo.joinStatus != 3) {
        this.$toast.info('加入组队后才能聊天哦')
        return
      }
      this.$router.push({path:`/common/newChat`, query:{
        teamType:this.TeamType, 
        teamID:this.TeamID, 
        isReply, 
        replyTo, 
        replyID, 
        replyNickname}})
    },

  },
}
</script>

<style scoped>

.character-title { 
  margin-left:1rem; 
  font-size:12px; 
  color:#795548; 
}

.main-team-container { 
  background:#ffffff; 
  padding:1rem .5rem 2rem 1rem;  
}

.reply-time { 
  margin-left:auto; 
  font-size:12px; 
  color:#9e9e9e; 
  margin-right:.5rem; 
}

.reply-input-box { 
  position:fixed; 
  bottom:0; 
  width:100%; 
  padding:.5rem; 
  background:#ffffff; 
  border-top:1px solid #e0e0e0; 
}

.reply-input-box input { 
  width:100%; 
  border-radius:.3rem; 
  padding:.3rem; 
  background:#f5f5f5; 
  border:0; 
  font-size:12px; 
}

.team-item-nickname { 
  margin-left:.5rem; 
  font-size:14px; 
  font-weight:600; 
  color:#4db6ac; 
}

.team-item-text { 
  padding:.5rem 0 .5rem 1.5rem; 
  font-size:14px; 
}

.team-item-img { 
  padding:.5rem .5rem 0 1rem; 
  font-size:12px; 
  color:#616161; 
}

.team-item-img img { 
  max-width:100%; 
  max-height:100%; 
  border-radius:.3rem; 
}

.teammate-container {
  width:100%; 
  margin-top:.5rem; 
  padding: .3rem .5rem; 
  background:#fff; 
  margin-bottom:.2rem;
}

.teammate-role-flex {
  width:20%; 
  padding:.2rem;
}

.teammate-role-img {
  max-width:100%; 
  border-radius:.3rem;
}

.teammate-info-flex {
  width:80%; 
  padding:.5rem;
}

.teammate-avatar {
  max-width:2rem; 
  border-radius:50%;
}

.teammate-word {
  width:100%; 
  margin-top:.5rem; 
  font-size:13px;
}

</style>
