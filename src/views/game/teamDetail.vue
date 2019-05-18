<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#009688">
        <mu-button icon slot="left" @click="goBack">
          <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
        
        <div ref="menuHide" style="font-size:14px;">
          {{ JointeamStmtDesc }}
        </div>

        <mu-menu slot="right" class="mine-menu-box">
          <mu-icon value="menu"></mu-icon>
          <mu-list slot="content" class="mine-menu-list">
            <mu-list-item button @click="teamListWindowToggle">
              <mu-list-item-title class="mine-menu-item">队友列表</mu-list-item-title>
            </mu-list-item>
            <mu-list-item @click="leaveTeam" v-if="JointeamStmt == 2" button style="border-top:1px solid #fafafa;">
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
          <mu-avatar size="26">
            <img :src="ChatDetailMain.captain_avatar">
          </mu-avatar>
          <span class="team-item-nickname">
            {{ ChatDetailMain.captain_nickname }} <span class="character-title">( 队长 · 阿萨卡 )</span>
          </span>
          <!-- <span class="reply-time">10小时前</span> -->
        </mu-flex>

        <mu-row class="team-item-text">
          {{ ChatDetailMain.recruit_word }}
        </mu-row>

        <mu-row v-if="ChatDetailMain.recruit_img" class="team-item-img">
          <img :src="ChatDetailMain.recruit_img" alt="">
        </mu-row>

        <svg-icon v-if="TeamStmt == 0" icon-class="recruiting" style="opacity: .5; position:absolute; right:.5rem; top:0; font-size:60px;"></svg-icon>
        <svg-icon v-if="TeamStmt == 1" icon-class="recruit_finished" style="opacity: .5; position:absolute; right:.5rem; top:0; font-size:60px;"></svg-icon>
        <svg-icon v-if="TeamStmt == 2" icon-class="recruit_fail" style="opacity: .5; position:absolute; right:.5rem; top:0; font-size:60px;"></svg-icon>
        <svg-icon v-if="TeamStmt == 3" icon-class="recruit_delete" style="opacity: .5; position:absolute; right:.5rem; top:0; font-size:60px;"></svg-icon>

      </mu-container>
      <!-- END 主评论 -->

      <!-- BEGIN 排序条 -->
      <mu-flex class="sort-bar" justify-content="center" align-items="center" >
        <span style="margin-left:.3rem">聊天列表</span>
        <span @click="convertSort" class="sort-bar-svg">
          <svg-icon :icon-class="IsSortup == true ? 'sortup' : 'sortdown'"></svg-icon>
        </span>
      </mu-flex>
      <!-- END 排序条 -->

      <!-- BEGIN 回复评论 -->
      <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">
        <mu-container class="reply-container" v-for="(item, index) in ReplyList" :key="index">
          <mu-flex align-items="center">
            <mu-avatar size="24">
              <img :src="item.user_avatar">
            </mu-avatar>
            <span class="reply-nickname">
              {{ item.user_nickname }} 
            </span>
            <span class="reply-time">{{ item.create_time }}</span>
          </mu-flex>

          <mu-row class="reply-cont-box">
            <span style="font-size:12px; margin-left:.5rem; ">
              <span v-if="item.reply_to > 0">@<span style="color:#795548;">{{ item.reply_nickname }}</span> :</span> {{ item.chat_cont }}
              <span style="color:green; margin-left:.5rem;" @click="newChat(true, item.user_id, item.user_nickname)">回复</span>
            </span>
          </mu-row>

          <mu-row v-if="item.chat_img" class="team-item-img" style="padding:.5rem .5rem .5rem 1rem; ">
            <img :src="item.chat_img">
          </mu-row>
        </mu-container>
      </mu-load-more>
      <!-- END 回复评论 -->
    </div>

    <!-- 发起评论框 -->
    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:80%;" @click="newChat(false, 0, '')">
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
    <mu-container style="position:fixed; top:0; left:0; z-index:9999;">
      <mu-drawer :open.sync="teamListWindowIsShow" :docked="false" :left="true" width="80%">
        <!-- 游戏基本信息 -->
        <mu-row style="position:relative;">
          <img style="max-width:100%; max-height:100%;" :src="GameDisplayImg" alt="">

          <div style="position:absolute; left:0; bottom:0; width:100%; padding:.5rem 1rem;  background:rgba(30, 30, 30, .3)">
            <div style="color:#fff;">{{ GameName }}</div>
            <div style="font-size:12px; color:#fff;">区服: <span style="margin-left:.5rem; color:#fff;">{{ ChatDetailMain.server_name }}</span></div>
            <div style="font-size:12px; color:#fff;">招募人数: <span style="margin-left:.5rem; color:#fff;">{{ ChatDetailMain.recruit_num }}/<span style="font-size:8px;">{{ ChatDetailMain.had_join }}</span></span></div>
            <div style="font-size:12px; color:#fff;">队友偏向: <span style="margin-left:.5rem; color:#fff;">{{ ChatDetailMain.teammate_prefer }}</span></div>
          </div>
        </mu-row>

        <!-- 队友列表 -->
        <div style="margin-top:.5rem; padding: 0 .5rem;" v-for="(item, index) in TeammateList" :key="index">
          <mu-row class="teammate-box">
            <mu-col span="8">
              <mu-flex>
                <div>
                  <mu-avatar size="28">
                    <img :src="item.user_avatar" />
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
                  <img :src="item.display_img" />
              </mu-flex>
            </mu-col>

            <!-- <mu-flex v-if="item.is_friend == 0" @click="applytoBeFriend(item.user_id)" justify-content="center" align-items="center" class="friendstmt-flex-one">
              <div>加为玩友</div> <mu-icon value="add" size="12"></mu-icon>
            </mu-flex>

            <mu-flex v-if="item.is_friend == 2" justify-content="center" align-items="center" class="friendstmt-flex-two">
              <div>已申请</div>
            </mu-flex> -->
          </mu-row>
        </div>
        
      </mu-drawer>
    </mu-container>
    <!-- END 弹出窗口 -->


  </div>
</template>

<script>
import utils from 'common/utils.js'
export default {
  data () {
    return {
      Title: '队伍招募中。。。',
      TeamID: 0,
      GameID: 0,
      IsSortup: false,
      IsTheLast: true,
      Loading: false,
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
      ChatListPage: 1,
      TeammateList: [],
      ReplyList: [],
      teamListWindowIsShow: false,
      JointeamStmt: 0,
      JointeamStmtDesc: '',
      TeamStmt: 0,
      GameDisplayImg: '',
      GameName: '',
    }
  },
  mounted () {
    this.TeamID = this.$route.params.teamid

    // 页面初始化
    this.$axios.post(`/game/teamDetail/${this.TeamID}`, {}).then((resp)=>{
      let dataBack = resp.data.msg 

      this.IsTheLast = dataBack.replyIsTheLast  // 聊天列表是否已经是最后一页了
      
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

      switch(dataBack.selfJoinStmt) { // 判断当前用户加入的状态
        case -1:  // 没有加入的记录
        this.JointeamStmt = 0
        this.JointeamStmtDesc = '快加入组队吧'
        break
        case 0: // 申请中
        this.JointeamStmt = 1
        this.JointeamStmtDesc = '组队申请中。。。'
        break
        case 1: // 拒绝加入
        this.JointeamStmt = 3
        this.JointeamStmtDesc = '已被拒绝！'
        break
        case 2: // 已加入组队
        this.JointeamStmt = 2
        this.JointeamStmtDesc = '已加入组队'
        break
        case 3: // 已离队
        this.JointeamStmt = 0
        this.JointeamStmtDesc = '还不快回来'
        break
        case 4: // 已被踢
        this.JointeamStmt = 3
        this.JointeamStmtDesc = '已被踢出组队'
        break
      }
       
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
        this.Title = '招募完成'
        break
        case 2:
        this.Title = '招募失效'
        break
        case 3:
        this.Title = '已被删除'
        break
      }

      this.TeammateList = dataBack.teamDetail.TeammateList


      let replyList = dataBack.replyList
      for(let i = 0; i < replyList.length; i++) {
        replyList[i].create_time = utils.getDateDiff(replyList[i].create_time, false)
      }
      this.ReplyList = replyList
      this.ChatListPage++
    })

  },
  methods: {
    load () {
      this.Loading = true      
      let sortWay = this.IsSortup == false ? 0 : 1
      this.$axios.post(`/game/teamchatList/${this.ChatListPage}/${this.TeamID}/${sortWay}`,{}).then((resp)=>{
        let dataBack = resp.data
        this.IsTheLast = dataBack.isTheLast
        let replyList = dataBack.listInfo
        for(let i = 0; i < replyList.length; i++) {
          replyList[i].create_time = utils.getDateDiff(replyList[i].create_time, false)
        }
        this.ReplyList = this.ReplyList.concat(replyList)
        this.ChatListPage++
        this.Loading = false
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
    convertSort () {
      // this.IsSortup = !this.IsSortup
      this.ChatListPage = 1
      this.ReplyList = []
      this.IsSortup = !this.IsSortup
      this.load()
    },
    joinTeam (stmt) {
      switch(stmt) {
        case 0: // 可申请
        this.$router.push(`/game/joinTeam/${this.TeamID}`)
        break
        case 1: // 申请中
        this.$toast.message("正在申请中。。。")
        break
        case 2: // 已经加入组队
        this.$toast.message("你已加入组队")
        break
        case 3: // 不能加入
        this.$toast.message("不能加入")
        break
      }

    },
    leaveTeam () {
      // 先判断是否为队长，如果是队长，提示会解散队伍
      if(this.SelfIsCamptain == true) {
        this.$confirm('是否解散队伍？').then((resp)=>{
          if(resp.result == true) { // 确定解散队伍
            // this.$toast.message('你确定解散了队伍')
            this.$axios.post(`/game/leaveTeam/${this.TeamID}`, {}).then((resp)=>{
              if(resp.data.code == 20000) {
                this.$toast.message('已成功解散')
                this.$router.push(`/game/detail/${this.GameID}`)
                return
              }
            }) 
          }
        })
      } else {
        this.$axios.post(`/game/leaveTeam/${this.TeamID}`, {}).then((resp)=>{
          if(resp.data.code == 20000) {
            this.$toast.message('已退出队伍')
            this.$router.push(`/game/detail/${this.GameID}`)
            return
          }
        }) 
      }
    },
    newChat (isReply, replyID, replyNickname) {
      // 只有加入组队的人才能进行评论
      if(this.JointeamStmt != 2) {
        this.$toast.message('加入组队后才能聊天哦')
        return
      }
      this.$router.push({path:`/game/teamchat`, query:{teamID:this.TeamID, isReply:isReply, replyID:replyID, replyNickname:replyNickname}})
    },
    teamListWindowToggle () {
      this.teamListWindowIsShow = !this.teamListWindowIsShow
      this.$refs.menuHide.click()
    },
  }
}
</script>

<style scoped>
.mytest { overflow:hidden;}
.mine-appbar { width: 100%; height:2.5rem; position:flex; }

.mine-menu-box { margin-top:1rem; right:.5rem; }
.mine-menu-list { background:#26a69a; color:white; padding:0; }
.mine-menu-item { color:#fff; font-size:12px; }

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

.team-item-nickname { margin-left:.5rem; font-size:13px; font-weight:600; color:#4db6ac; }
.team-item-text { padding:.5rem 0 .5rem 1.5rem; font-size:12px; }
.team-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.team-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }

.teammate-box { margin-bottom:.5rem; background:rgba(240, 240, 240, .3); padding:.4rem 0 .4rem .5rem; border-radius:.5rem; border-bottom:1px #bdbdbd solid; border-right:1px #e0e0e0 solid; border-top:1px #f5f5f5 solid; }
.teammate-info-title { margin-left:.5rem; font-size:12px; color:#795548; }
.teammate-img-flex { width:100%; height:4rem; text-align:center; border-radius:.5rem; }
.teammate-img-flex img { max-width:4rem; max-height:4rem; border-radius:.2rem; }

.friendstmt-flex-one { width:100%; font-size:12px; background:#00bcd4; color:#fff; border-radius:.2rem; margin-right:.3rem; margin-top:.3rem; }
.friendstmt-flex-two { width:100%; font-size:12px; background:#bdbdbd; color:#fff; border-radius:.2rem; margin-right:.3rem; margin-top:.3rem; }
</style>
