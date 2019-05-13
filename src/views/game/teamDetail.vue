<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#009688">
        <mu-button icon slot="left" @click="goBack">
          <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
        
        <div ref="menuHide" style="font-size:14px;">
          队伍聊天中 。。。
        </div>

        <mu-menu slot="right" class="mine-menu-box">
          <mu-icon value="menu"></mu-icon>
          <mu-list slot="content" class="mine-menu-list">
            <mu-list-item button @click="teamListWindowToggle">
              <mu-list-item-title class="mine-menu-item">队友列表</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button style="border-top:1px solid #fafafa;">
              <mu-list-item-title class="mine-menu-item">退出队伍</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
    </mu-appbar>
    <!-- END 头部 -->

    <div style="margin-bottom:3rem;">  
      <!-- BEGIN 主评论 -->
      <mu-container class="main-team-container">
        <mu-flex align-items="center">
          <mu-avatar size="26">
            <img :src="ChatDetailMain.captain_avatar">
          </mu-avatar>
          <span class="team-item-nickname">
            {{ ChatDetailMain.captain_nickname }} <span class="character-title">( 队长 · 阿萨卡 )</span>
          </span>
          <span class="reply-time">10小时前</span>
        </mu-flex>

        <mu-row class="team-item-text">
          {{ ChatDetailMain.recruit_word }}
        </mu-row>

        <mu-row v-if="ChatDetailMain.recruit_img" class="team-item-img">
          <img :src="ChatDetailMain.recruit_img" alt="">
        </mu-row>
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
      <!-- END 回复评论 -->
    </div>

    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:90%;" @click="newChat(false, 0, '')">
        <input type="text" placeholder="我也来说一句吧" disabled>
      </div>
      <mu-icon value="share" class="reply-input-box-icon" size="18" color="#8A8A8A"></mu-icon>
    </mu-flex>

    <!-- BEGIN 弹出窗口 -->
    <mu-container>
      <mu-drawer :open.sync="teamListWindowIsShow" :docked="false" :left="true" width="80%">
        <div style="padding:0 .2rem;">
          <div style="padding:.5rem; background:rgba(220, 220, 220, .5);">
            <div style="padding:.5rem; color:green;">游戏基本信息</div>
            <div style="padding:.3rem 1rem; font-size:12px; color:green;">区服: <span style="margin-left:.5rem; color:gray;">{{ ChatDetailMain.server_name }}</span></div>
            <div style="padding:.3rem 1rem; font-size:12px; color:green;">招募人数: <span style="margin-left:.5rem; color:gray;">{{ ChatDetailMain.recruit_num }}/<span style="font-size:8px;">{{ ChatDetailMain.had_join }}</span></span></div>
            <div style="padding:.3rem 1rem; font-size:12px; color:green;">队友偏向: <span style="margin-left:.5rem; color:gray;">{{ ChatDetailMain.teammate_prefer }}</span></div>
          </div>
        </div>

        <div style="margin-top:.5rem; padding: 0 .2rem;" v-for="(item, index) in TeammateList" :key="index">
          <mu-row class="teammate-box">
            <mu-col span="9">
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
                  <span class="teammate-info-title">{{ item.role }}/{{ item.role_rank }}</span>
                </div>
              </mu-flex>
            </mu-col>

            <mu-col span="3" justify-content="center">
              <mu-flex justify-content="center" align-items="center" class="teammate-img-flex">
                  <img :src="item.display_img" />
              </mu-flex>
            </mu-col>

            <mu-flex v-show="item.is_friend == 0" justify-content="center" align-items="center" style="width:100%; font-size:12px; background:#00bcd4; color:#fff; border-radius:.2rem; margin-right:.3rem; margin-top:.3rem;">
              <div>加为玩友</div> <mu-icon value="add" size="12"></mu-icon>
            </mu-flex>

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
      TeamID: 0,
      IsSortup: true,
      IsTheLast: true,
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
        server_name: '',
        recruit_numb: 0,
        had_join: 0,
        teammate_prefer: '',
      },
      ChatList: [],
      ChatListPage: 1,
      TeammateList: [],
      ReplyList: [],
      teamListWindowIsShow: false,
    }
  },
  mounted () {
    this.TeamID = this.$route.params.teamid

    // 页面初始化
    this.$axios.post(`/game/teamDetail/${this.TeamID}`, {}).then((resp)=>{
      let dataBack = resp.data.msg 

      console.log(dataBack)

      this.IsTheLast = dataBack.replyIsTheLast
      
      this.ChatDetailMain.userID = dataBack.teamDetail.captain_userid
      this.ChatDetailMain.recruit_word = dataBack.teamDetail.announcement
      this.ChatDetailMain.recruit_img = dataBack.teamDetail.recruit_img
      this.ChatDetailMain.recruit_way = dataBack.teamDetail.recruit_way
      this.ChatDetailMain.captain_avatar = dataBack.teamDetail.captain_avatar
      this.ChatDetailMain.captain_nickname = dataBack.teamDetail.captain_nickname
      this.ChatDetailMain.captain_sex = dataBack.teamDetail.captain_sex
      this.ChatDetailMain.server_name = dataBack.teamDetail.server_name
      this.ChatDetailMain.recruit_num = dataBack.teamDetail.recruit_num
      this.ChatDetailMain.server_name = dataBack.teamDetail.server_name
      this.ChatDetailMain.recruit_numb = dataBack.teamDetail.recruit_num
      this.ChatDetailMain.had_join = dataBack.teamDetail.TeammateList.length
      this.ChatDetailMain.teammate_prefer = dataBack.teamDetail.teanmate_prefer

      this.TeammateList = dataBack.teamDetail.TeammateList

      let replyList = dataBack.replyList
      for(let i = 0; i < replyList.length; i++) {
        replyList[i].create_time = utils.getDateDiff(replyList[i].create_time, false)
      }
      this.ReplyList = replyList
      this.ReplyListPage++
      // console.log(this.ReplyList)
    })

  },
  methods: {
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
      this.IsSortup = !this.IsSortup
    },
    newChat (isReply, replyID, replyNickname) {
      this.$router.push({path:`/game/teamchat`, query:{teamID:this.TeamID, isReply:isReply, replyID:replyID, replyNickname:replyNickname}})
    },
    teamListWindowToggle () {
      this.teamListWindowIsShow = !this.teamListWindowIsShow
      this.$refs.menuHide.click()
    }
  }
}
</script>

<style scoped>
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

.teammate-box { margin-bottom:.5rem; background:rgba(230, 230, 230, .5); padding:.4rem 0 .4rem .5rem; border-radius:.5rem; }
.teammate-info-title { margin-left:.5rem; font-size:12px; color:#795548; }
.teammate-img-flex { width:100%; height:4rem; text-align:center; border-radius:.5rem; }
.teammate-img-flex img { max-width:4rem; max-height:4rem; border-radius:.2rem; }

</style>
