<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" style="background: linear-gradient(to right, #4dd0e1 , #80cbc4);">
        <mu-button icon slot="left" @click="goBack">
          <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
        </mu-button>
        
        <div ref="menuHide" style="font-size:14px; color:#fff;">
          {{ ChatDetailMain.captain_nickname }} 的队伍
        </div>

        <mu-menu slot="right" class="mine-menu-box">
          <mu-icon value="menu" color="#fff"></mu-icon>
          <mu-list slot="content" class="mine-menu-list">
            <mu-list-item button @click="teamListWindowToggle">
              <mu-list-item-title class="mine-menu-item">队友列表</mu-list-item-title>
            </mu-list-item>
            <mu-list-item @click="leaveTeam" v-if="JointeamStmt == 3" button style="border-top:1px solid #fafafa;">
              <mu-list-item-title class="mine-menu-item">退出队伍</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
    </mu-appbar>
    <!-- END 头部 -->

    <div style="margin-bottom:3rem;">  
      <!-- BEGIN 主评论 -->
      <mu-container class="main-team-container" style="position:relative;">
        <mu-flex align-items="center">
          <mu-avatar size="30">
            <img :src="ChatDetailMain.captain_avatar | imgPrefixDeal()">
          </mu-avatar>
          <span class="team-item-nickname">
            {{ ChatDetailMain.captain_nickname }} <span class="character-title">( 队长 )</span>
          </span>
          <!-- <span class="reply-time">10小时前</span> -->
        </mu-flex>

        <mu-row class="team-item-text">
          {{ ChatDetailMain.recruit_word }}
        </mu-row>

        <mu-row v-if="ChatDetailMain.recruit_img" class="team-item-img">
          <img :src="ChatDetailMain.recruit_img | imgPrefixDeal()" alt="">
        </mu-row>

        <svg-icon v-if="TeamStmt == 0" icon-class="recruiting" style="opacity: .5; position:absolute; right:.5rem; top:0; font-size:60px;"></svg-icon>
        <svg-icon v-if="TeamStmt == 1" icon-class="recruit_finished" style="opacity: .5; position:absolute; right:.5rem; top:0; font-size:60px;"></svg-icon>
        <svg-icon v-if="TeamStmt == 2" icon-class="recruit_fail" style="opacity: .5; position:absolute; right:.5rem; top:0; font-size:60px;"></svg-icon>
        <svg-icon v-if="TeamStmt == 3" icon-class="recruit_delete" style="opacity: .5; position:absolute; right:.5rem; top:0; font-size:60px;"></svg-icon>

      </mu-container>
      <!-- END 主评论 -->

      <ChatList :TeamType="TeamType" :TeamID="TeamID"></ChatList>
    </div>

    <!-- 发起评论框 -->
    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:80%;" @click="newChat(false, 0, 0, '')">
        <input type="text" placeholder="我也来说一句吧" disabled>
      </div>

      <span v-if="JointeamStmt == 3" @click="joinTeam(3)" style="font-size:19px; margin-left:auto;">
        <svg-icon icon-class="jointeam_refuse"></svg-icon>
      </span>
      <span v-if="JointeamStmt == 2" @click="joinTeam(2)" style="font-size:19px; margin-left:auto;">
        <svg-icon icon-class="hadjointeam"></svg-icon>
      </span>
      <span v-if="JointeamStmt == 1" @click="joinTeam(1)" style="font-size:20px; margin-left:auto;">
        <svg-icon icon-class="jointeam_applying"></svg-icon>
      </span>
      <span v-if="JointeamStmt == 0" @click="joinTeam(0)" style="font-size:20px; margin-left:auto;">
        <svg-icon icon-class="jointeam"></svg-icon>
      </span>
      <mu-icon value="share" class="reply-input-box-icon" size="18" color="#8A8A8A"></mu-icon>
    </mu-flex>

    <!-- BEGIN 弹出窗口 -->
    <mu-container>
      <mu-drawer 
        :open.sync="teamListWindowIsShow" 
        :docked="false" 
        :left="true" 
        width="80%">
        <!-- 游戏基本信息 -->
        <mu-row style="position:relative;">
          <img 
            style="max-width:100%; max-height:100%;" 
            :src="GameDisplayImg | imgPrefixDeal()" 
            alt="">

          <div style="position:absolute; left:0; bottom:0; width:100%; padding:.5rem 1rem;  background:rgba(30, 30, 30, .3)">
            <div style="color:#fff;">{{ GameName }}</div>
            <div style="font-size:12px; color:#fff;">区服: <span style="margin-left:.5rem; color:#fff;">{{ ChatDetailMain.server_name }}</span></div>
            <div style="font-size:12px; color:#fff;">招募人数: <span style="margin-left:.5rem; color:#fff;">{{ ChatDetailMain.recruit_num }}/<span style="font-size:8px;">{{ ChatDetailMain.had_join }}</span></span></div>
            <div style="font-size:12px; color:#fff;">队友偏向: <span style="margin-left:.5rem; color:#fff;">{{ ChatDetailMain.teammate_prefer }}</span></div>
          </div>
        </mu-row>

        <!-- 队友列表 -->
        <div 
          v-for="(item, index) in TeammateList" 
          :key="index"
          style="margin-top:.5rem; padding: 0 .5rem;" >
          <mu-row class="teammate-box">
            <mu-col span="8">
              <mu-flex>
                <div style="position:relative;">
                  <mu-avatar size="28" @click="addFriend(item.user_id)">
                    <img :src="item.user_avatar | imgPrefixDeal()" />
                  </mu-avatar>
                </div>
                <div>
                  <span class="teammate-info-title">昵称：<span style="color:#9e9e9e;">{{ item.nickname }}</span></span>
                  <br/>
                  <span class="teammate-info-title">角色：<span style="color:#9e9e9e;">{{ item.role_name }}</span></span>
                  <br/>
                  <span class="teammate-info-title">职业：<span style="color:#9e9e9e;">{{ item.role }}/{{ item.role_rank }}</span></span>
                </div>
              </mu-flex>
            </mu-col>

            <mu-col span="4" justify-content="center">
              <mu-flex justify-content="center" align-items="center" class="teammate-img-flex">
                  <img :src="item.display_img | imgPrefixDeal()" />
              </mu-flex>
            </mu-col>
          </mu-row>
        </div>
        
      </mu-drawer>
    </mu-container>
    <!-- END 弹出窗口 -->


  </div>
</template>

<script>
import { wxInit } from '@/common/wxInit.js'
import ChatList from '@/components/ChatList.vue'
export default {
  data () {
    return {
      ShareTitle: '', // 分享title
      ShareDesc: '',  // 分享描述
      ShareImgUrl: '',  // 分享图片

      TeamType: 1,
      Title: '队伍招募中。。。',
      TeamID: 0,
      GameID: 0,
      SelfIsCamptain: false,
      ChatDetailMain: {
        userID: 0,
        recruit_word: '',
        recruit_img: "",
        recruit_way: "",
        captain_avatar: "",
        captain_nickname: "",
        captain_sex: 0,
        server_name: '',
        recruit_num: 0,
        had_join: 0,
        teammate_prefer: '',
      },
      TeammateList: [],
      teamListWindowIsShow: false,
      JointeamStmt: 0,
      JointeamStmtDesc: '',
      TeamStmt: 0,
      GameDisplayImg: '',
      GameName: '',
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
          this.$toast.message('该队伍已解散')
          return
        }
        let dataBack = resp.data.msg 
        this.ChatDetailMain.userID = dataBack.teamDetail.captain_userid
        this.ChatDetailMain.recruit_word = dataBack.teamDetail.announcement
        this.ChatDetailMain.recruit_img = dataBack.teamDetail.recruit_img
        this.ChatDetailMain.recruit_way = dataBack.teamDetail.recruit_way
        this.ChatDetailMain.captain_avatar = dataBack.teamDetail.captain_avatar
        this.ChatDetailMain.captain_nickname = dataBack.teamDetail.captain_nickname
        this.ChatDetailMain.captain_sex = dataBack.teamDetail.captain_sex
        this.ChatDetailMain.server_name = dataBack.teamDetail.server_name
        this.ChatDetailMain.recruit_num = dataBack.teamDetail.recruit_num
        this.ChatDetailMain.had_join = dataBack.teamDetail.TeammateList.length
        this.ChatDetailMain.teammate_prefer = dataBack.teamDetail.teanmate_prefer
        this.SelfIsCamptain = dataBack.teamDetail.self_iscaptain == 0 ? false : true
        this.GameDisplayImg = dataBack.gameInfo.gameDisplayImg
        this.GameName = dataBack.gameInfo.gameName
        this.GameID = dataBack.teamDetail.g_id
        this.JointeamStmt = dataBack.selfJoinStmt

        this.TeammateList = dataBack.teamDetail.TeammateList
        
        this.TeamStmt = dataBack.teamDetail.t_stmt
        // 判断队伍的状态，然后再去修改加入队伍的状态
        if(this.TeamStmt > 0) { // 只有队伍有效的时候，才显示加入，申请中，加入成功的按钮
          this.JointeamStmt = 3
        }
        // 组队状态, 0=>组队中， 1=>成功， 2=>失效, 3=>删除
        switch(this.TeamStmt) {
          case 0:
            this.Title = '招募中'
            break
          case 1:
            this.Title = '已失效'
            break
          case 2:
            this.Title = '已删除'
            break
          case 3:
            this.Title = '组队成功'
            break
        }

        // 微信分享
        this.ShareTitle = `${this.GameName}, 有人玩没！`   // 分享title
        this.ShareDesc = this.ChatDetailMain.recruit_word   // 分享描述

      })
    },
    goBack () {
      this.$router.go(-1)
    },
    convertThumbup () {
      this.HadThumbUp = !this.HadThumbUp
      let msg = this.HadThumbUp == true ? '已点赞' : '取消点赞'
      this.$toast.success(msg)
    },
    convertFocus () {
      this.IsFocus = !this.IsFocus
    },
    joinTeam (stmt) {
      switch(stmt) {
        case 0: // 可申请
          this.$router.push(`/game/joinTeam/${this.TeamID}`)
          break
        case 1: // 申请中
          this.$toast.message("正在申请中。。。")
          break
        case 2: // 拒绝加入
          this.$toast.message("拒绝加入")
          break
        case 3: // 不能加入
          this.$toast.message("已加入")
          break
        case 4: // 不能加入
          this.$toast.message("已加入")
          break
      }
    },
    leaveTeamReq () {
      this.$axios.get(`/common/leaveTeam/${this.TeamType}/${this.TeamID}`, {}).then((resp)=>{
        if(resp.data.code == 20000) {
          this.$toast.message('已成功退出组队！')
          this.$router.push(`/game/detail/${this.GameID}`)
          return
        }
      }) 
    },

    leaveTeam () {
      // 先判断是否为队长，如果是队长，提示会解散队伍
      // 并且如果是队长，只有组队中才可以解散
      if(this.SelfIsCamptain == true) {
        this.$confirm('是否解散队伍？').then((resp)=>{
          if(resp.result == true) { // 确定解散队伍
            this.leaveTeamReq()
          }
        })
      } else {
        this.leaveTeamReq()
      }
    },
    newChat (isReply, replyTo, replyID, replyNickname) {
      // 只有加入组队的人才能进行评论
      if(this.JointeamStmt != 3) {
        this.$toast.message('加入组队后才能聊天哦')
        return
      }
      this.$router.push({path:`/common/newChat`, query:{teamType:this.TeamType, teamID:this.TeamID, isReply, replyTo, replyID, replyNickname}})
    },
    teamListWindowToggle () {
      this.teamListWindowIsShow = !this.teamListWindowIsShow
      this.$refs.menuHide.click()
    },

    addFriend (userID) {
      this.$router.push(`/usr/usercard/${userID}`)
    },
  },
  components: {
    ChatList,
  },
}
</script>

<style scoped>
.mytest { overflow:hidden;}
.mine-appbar { width: 100%; height:2.5rem; position:flex; }

.mine-menu-box { margin-top:1rem; right:.5rem; }
.mine-menu-list { background: linear-gradient(to right, #4dd0e1 , #80cbc4); color:white; padding:0; }
.mine-menu-item { color:#fff; font-size:12px;  }

.character-title { margin-left:1rem; font-size:12px; color:#795548; }

.main-team-container { background:#ffffff; padding:1rem .5rem 2rem 1rem;  }
.sort-bar { background:#eeeeee; font-size:12px; padding:.3rem .5rem; margin-bottom:.5rem;  }
.sort-bar-svg { margin-left:auto; font-size:18px; margin-right:.3rem; }

.reply-container { padding:.5rem .8rem; border-bottom:.1rem solid #ffffff; }

.reply-nickname { font-size:12px; margin-left:.5rem; margin-right:.5rem; color:#4db6ac; }
.reply-time { margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem; }
.reply-cont-box { font-size:12px; padding:.5rem .5rem .5rem 1rem; }

.reply-input-box { position:fixed; bottom:0; width:100%; padding:.5rem; background:#ffffff; border-top:1px solid #e0e0e0; }
.reply-input-box input { width:100%; border-radius:.3rem; padding:.3rem; background:#f5f5f5; border:0; font-size:12px; }
.reply-input-box-span { margin-left:auto; font-size:18px; margin-right:.3rem; }
.reply-input-box-icon { margin-left:auto; margin-right:.5rem; }

.team-item-nickname { margin-left:.5rem; font-size:14px; font-weight:600; color:#4db6ac; }
.team-item-text { padding:.5rem 0 .5rem 1.5rem; font-size:14px; }
.team-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.team-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }

/* .teammate-box { margin-bottom:.5rem; background:rgba(240, 240, 240, .3); padding:.4rem 0 .4rem .5rem; border-radius:.5rem; border-bottom:1px #bdbdbd solid; border-right:1px #e0e0e0 solid; border-top:1px #f5f5f5 solid; } */
.teammate-box { margin-bottom:.5rem; background:rgba(240, 240, 240, .3); padding:.4rem 0 .4rem .5rem; border-radius:.5rem; box-shadow: 0px 0px 1px gray; }
.teammate-info-title { margin-left:.5rem; font-size:12px; color:#795548; }
.teammate-img-flex { width:100%; height:4rem; text-align:center; border-radius:.5rem; }
.teammate-img-flex img { max-width:4rem; max-height:4rem; border-radius:.2rem; }

.friendstmt-flex-one { width:100%; font-size:12px; background:#00bcd4; color:#fff; border-radius:.2rem; margin-right:.3rem; margin-top:.3rem; }
.friendstmt-flex-two { width:100%; font-size:12px; background:#bdbdbd; color:#fff; border-radius:.2rem; margin-right:.3rem; margin-top:.3rem; }
</style>
