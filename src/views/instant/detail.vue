<template>
  <div>
     <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#4caf50">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        TITLE
      </div>

      <mu-menu slot="right" class="mine-menu-box">
        <mu-icon value="menu"></mu-icon>
        <mu-list slot="content" class="mine-menu-list">
          <mu-list-item @click="leaveTeam" v-if="JointeamStmt == 3" button style="border-top:1px solid #fafafa;">
            <mu-list-item-title class="mine-menu-item">退出队伍</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <!-- END 头部 -->

    <!-- 队伍基本信息 -->
    <div style="padding:.5rem;">
      <mu-flex align-items="center">
        <mu-avatar size="26">
          <img :src="TeamBaseInfo.captainAvatar">
        </mu-avatar>
        <span class="comment-item-nickname">
          {{ TeamBaseInfo.captainNickname }}
        </span>
        <span class="comment-item-time" style="margin-right:.6rem;">{{ TeamBaseInfo.createTime }}</span>
      </mu-flex>

      <mu-row class="comment-item-text">
        {{ TeamBaseInfo.cont }}
      </mu-row>

      <mu-row class="comment-item-img">
        <img :src="TeamBaseInfo.displayImg" alt="">
      </mu-row>

      <mu-row style="padding:1rem .5rem;" >
        <mu-icon value="person_pin_circle" color="#4caf50" size="20"></mu-icon>
        <span style="font-size:12px; color:#9e9e9e;">地点：{{ TeamBaseInfo.site.name }} · 距离你{{ TeamBaseInfo.distance }}</span>
      </mu-row>
    </div>

    <!-- BEGIN 队长和队友列表 -->
    <mu-flex style="padding:.5rem 1rem; background:#fff;" justify-content="center" align-items="center" wrap="wrap">
        <mu-avatar v-for="(item, index) in TeammateList" :key="index" size="35" :class="item.sex == 1 ? 'avatar-male' : 'avatar-female'" style="margin-right:.5rem;">
          <img :src="item.avatar" alt="">
        </mu-avatar>
        <span v-if="TeamBaseInfo.recruitStatus == 0" @click="joinTeam">
          <svg-icon icon-class="add_circle_outline" style="font-size:40px; color:red;"></svg-icon>
        </span>
    </mu-flex>
    <mu-flex justify-content="center" style="padding:.3rem 0 .5rem 0; border-bottom:1px dashed #e0e0e0; background:#fff;">
      <span style="font-size:12px; color:#9e9e9e;">-- 已招募{{ TeammateList.length }}人 --</span>
    </mu-flex>
    <!-- END 队长和队友列表 -->

    <!-- BEGIN 排序条 -->
    <mu-flex class="sort-bar" justify-content="center" align-items="center" >
      <span style="margin-left:.3rem">回复列表 (0)</span>
      <span @click="convertSort" class="sort-bar-svg"><svg-icon :icon-class="IsSortup == true ? 'sortup' : 'sortdown'"></svg-icon></span>
    </mu-flex>
    <!-- END 排序条 -->

    <!-- BEGIN 回复评论 -->
    <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">
      <mu-container class="reply-container" v-for="(item, index) in ReplyList" :key="index">
        <mu-flex align-items="center">
          <mu-avatar size="24" :class="item.user_sex == 1 ? 'avatar-male' : 'avatar-female'">
            <img :src="item.userAvatar">
          </mu-avatar>
          <span class="reply-nickname">
            {{ item.userNickname }} 
          </span>
          <span class="reply-time">{{ item.createTime }}</span>
        </mu-flex>

        <mu-row class="reply-cont-box">
          <span style="font-size:12px; margin-left:.5rem; ">
            <span v-if="item.replyTo > 0">@<span style="color:#795548;">{{ item.replyNickname }}</span> :</span> {{ item.cont }}
            <span style="color:green; margin-left:.5rem;" @click="newChat(true, item.userID, item.chatID, item.userNickname)">回复</span>
          </span>
        </mu-row>

        <mu-row v-if="item.img" class="team-item-img" style="padding:.5rem .5rem .5rem 1rem; ">
          <img :src="item.img">
        </mu-row>
      </mu-container>
    </mu-load-more>

    <mu-row v-show="IsTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; margin-bottom:3rem; color:#9e9e9e;">
      <span> 没有更多的回复 </span>
    </mu-row>
    <!-- END 回复评论 -->

    <!-- 发起评论框 -->
    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:80%;" @click="newChat(false, 0, 0, '')">
        <input type="text" placeholder="我也来说一句吧" disabled>
      </div>

      <span v-if="JointeamStmt == 1 || JointeamStmt == 2 || JointeamStmt == 5" @click="joinTeam" style="font-size:19px; margin-left:auto;">
        <svg-icon icon-class="jointeam_refuse"></svg-icon>
      </span>
      <span v-if="JointeamStmt == 3" @click="joinTeam" style="font-size:19px; margin-left:auto;">
        <svg-icon icon-class="hadjointeam"></svg-icon>
      </span>
      <!-- <span v-if="JointeamStmt == 1" @click="joinTeam" style="font-size:20px; margin-left:auto;">
        <svg-icon icon-class="jointeam_applying"></svg-icon>
      </span> -->
      <span v-if="JointeamStmt == 0 || JointeamStmt == 4" @click="joinTeam" style="font-size:20px; margin-left:auto;">
        <svg-icon icon-class="jointeam"></svg-icon>
      </span>
      <mu-icon value="share" class="reply-input-box-icon" size="18" color="#8A8A8A"></mu-icon>
    </mu-flex>

  </div>
</template>

<script>
import utils from 'common/utils.js'
export default {
  data () {
    return {
      TeamType: 4,
      InitLoading: true,
      TeamID: 0,
      IsSortup: false,
      IsTheLast: true,
      ReplyListPage: 1,
      ReplyList: [],
      Loading: false,
      RecruitImgs: [],
      SwiperIsRender: false,

      TeamBaseInfo: {
        captainAvatar: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2836389094,1674914749&fm=26&gp=0.jpg",
        captainID: 0,
        captainNickname: "朝花夕拾",
        captainSex: 1,
        cont: "来打球不，二中，快来人！",
        displayImg: "image/instant/team/20190718/1563410597926781300872.jpg",
        distance: 4872847.586036,
        recruitStatus: 0, // 0=>组队中， 1=>停止招募(招募成功或者已过期), 2=>已解散(只有组队中才能解散，停止招募后不能解散)
        site: {
          name: "市东下路20号B座", 
          lng: 113.122629, 
          lat: 23.029735, 
          addr: "市东下路20号b座"
        },
        hadRecruitNumb: 0,
        createTime: ''
      },

      TeammateList: [
        {
          avatar: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=549730297,3829719329&fm=26&gp=0.jpg",
          joinStatus: 3,
          jointime: 0,
          nickname: "未闻花名",
          sex: 2,
          user_id: 2,
        }
      ],
      JointeamStmt: 0,
      IsCaptain: false,
    }
  },

  mounted () {
    this.TeamID = this.$route.params.teamID
    let lng = 113.122629
    let lat = 23.029735
    this.$axios.get(`/instant/detail/${this.TeamID}/${lng}/${lat}`, {}).then((resp)=>{

      console.log(resp.data)

      if(resp.data.code != 20000) {
        this.$toast.message(resp.data.msg)
        return
      }

      // 处理队伍基本信息
      let dataBack = resp.data.msg
      
      let teamBaseInfo = dataBack.teamBaseInfo
      teamBaseInfo.captainAvatar = utils.imgPrefixDeal(teamBaseInfo.captainAvatar)
      teamBaseInfo.displayImg = utils.imgPrefixDeal(teamBaseInfo.displayImg)
      teamBaseInfo.createTime = utils.getDateDiff(teamBaseInfo.createTime, true)
      teamBaseInfo.distance = utils.distanceFormat(teamBaseInfo.distance)
      this.TeamBaseInfo = teamBaseInfo

      // 处理对哟基本信息
      let teammateList = dataBack.teammateList
      for(let i = 0; i < teammateList.length; i++) {
        teammateList[i].avatar = utils.imgPrefixDeal(teammateList[i].avatar)
      }
      this.TeammateList = teammateList

      // 处理评论列表
      if(dataBack.chatList.length < 15) {
        this.IsTheLast = true
      }
      let replyList =  dataBack.chatList
      for(let i = 0; i < replyList.length; i++) {
        replyList[i].createTime = utils.getDateDiff(replyList[i].createTime, true)
        replyList[i].userAvatar = utils.imgPrefixDeal(replyList[i].userAvatar)
        replyList[i].img = utils.imgPrefixDeal(replyList[i].img)
      }
      this.ReplyList = replyList
      this.ReplyListPage++

      this.JointeamStmt = dataBack.joinStmt
      this.IsCaptain = dataBack.isCaptain
    })
  },


  methods: {
    goBack () {
      this.$router.go(-1)
    },

    load () {
      this.Loading = true      
      let sortWay = this.IsSortup == false ? 0 : 1
      this.$axios.get(`/common/chatList/${this.TeamType}/${this.TeamID}/${this.ReplyListPage}/${sortWay}`,{}).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }

        let dataBack = resp.data.msg
        this.IsTheLast = dataBack.length < 15 ? true : false
        let replyList = dataBack
        for(let i = 0; i < replyList.length; i++) {
          replyList[i].createTime = utils.getDateDiff(replyList[i].createTime, true)
          replyList[i].userAvatar = utils.imgPrefixDeal(replyList[i].userAvatar)
          replyList[i].img = utils.imgPrefixDeal(replyList[i].img)
        }
        this.ReplyList = this.ReplyList.concat(replyList)
        this.ReplyListPage++
        this.Loading = false
      })
    },
    convertSort () {
      // 当转换排序顺序的时候，把页数重置，然后，重新加载回复评论
      this.ReplyListPage = 1
      this.ReplyList = []
      this.IsSortup = !this.IsSortup
      this.load()
    },

    joinTeam () {
      // 首先判断队伍的状态是否停止招募
      if(this.TeamBaseInfo.recruitStatus > 0) {
        switch(this.TeamBaseInfo.recruitStatus) {
          case 1:
            this.$toast.message('该队伍已停止招募，不能加入组队')
          break
          case 2:
            this.$toast.message('该队伍已解散，不能加入组队')
          break
        }
        return
      }

      // 点击加入组队的时候，判断加入组队的状态
      // 0 => 未加入，1=>申请，2=>拒绝加入，3=>已加入，4=>离队, 5=>被踢
      // 因为party里面没有1、2、5状态， 只需要判断 0 、3、 4(暂时不做其他的)
      switch(this.JointeamStmt) {
        case 0: // 未加入
          this.joinTeamReq()
        break
        case 1: // 申请
          // 不做处理
        break
        case 2: // 拒绝加入
          // 不做处理
        break
        case 3: // 已加入
          // 不做处理
          if(this.IsCaptain == true) {
            this.$toast.message('你是队长，你要邀请别人进来吗？')
          }else{
            this.$toast.message('你已加入组队！')
          }
        break
        case 4: // 已离队，重新加入
          this.joinTeamReq()
        break
        case 5:
          // 不做处理
        break
      }
    },

    joinTeamReq () {
      this.$axios.get(
        `/common/joinTeam/${this.TeamType}/${this.TeamID}`,{}
      ).then((resp)=>{
        let dataBack = resp.data
        this.$toast.message(dataBack.msg)
        if(dataBack.code == 20000) {
          window.location.reload()
        }
      })
    },

    leaveTeamReq () {
      this.$axios.get(`/common/leaveTeam/${this.TeamType}/${this.TeamID}`, {}).then((resp)=>{
        if(resp.data.code == 20000) {
          this.$toast.message('已成功退出组队！')
          this.$router.push(`/party/list`)
          return
        }
      }) 
    },

    leaveTeam () {
      // 先判断是否为队长，如果是队长，提示会解散队伍
      // 并且如果是队长，只有组队中才可以解散
      if(this.IsCaptain == true) {
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

  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
.mine-menu-box { margin-top:1rem; right:.5rem; }
.mine-menu-list { background:#81c784; color:white; padding:0; }
.mine-menu-item { color:#fff; font-size:12px; }


.sort-bar { background:#f5f5f5; border-top:1px solid #fff; font-size:12px; padding:.4rem .5rem; margin-bottom:.5rem; }
.sort-bar-svg { margin-left:auto; font-size:18px; margin-right:.3rem; }

.reply-container { padding:.5rem .8rem; border-bottom:.1rem solid #ffffff; }

.reply-nickname { font-size:12px; margin-left:.5rem; margin-right:.5rem; color:#4db6ac; }
.reply-time { margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem; }
.reply-cont-box { font-size:12px; padding:.5rem .5rem .5rem 1rem; }

.reply-input-box { position:fixed; bottom:0; width:100%; padding:.5rem; background:#ffffff; border-top:1px solid #e0e0e0; }
.reply-input-box input { width:100%; border-radius:.3rem; padding:.3rem; background:#f5f5f5; border:0; font-size:12px; }
.reply-input-box-span { margin-left:auto; font-size:18px; margin-right:.3rem; }
.reply-input-box-icon { margin-left:auto; margin-right:.5rem; }


.comment-box { padding:.5rem 1rem; }
.comment-item-nickname { margin-left:.5rem; font-size:12px; color:#4db6ac; }
.comment-item-time { margin-left: auto; margin-right:.3rem; font-size:12px; color:#9e9e9e; }
.comment-item-text { padding:.5rem 0 .5rem 1.5rem; font-size:12px; }
.comment-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }

.avatar-male { padding:.1rem; border:1px solid #bbdefb; border-radius:50%; background:white; }
.avatar-female { padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; }

</style>


