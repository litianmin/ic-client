<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#00bcd4" z-depth="0.5">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        节日聚会
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

    <!-- 展示图片 -->
    <mu-flex v-if="SwiperIsRender" style="position:relative;" justify-content="center">
      <swiper :options="swiperOption" style="height: auto">
        <swiper-slide v-for="(item, index) in RecruitImgs" :key="index" style="text-align:center;">
          <img style="max-width:100%; max-height:100%;" :src="item | imgPrefixDeal()" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </mu-flex>

    <div class="main-cont-div">
      <mu-row class="cont-item-row">
        <mu-flex style="width:20%;">
          <span class="cont-item-title">主要活动</span>
        </mu-flex>
        <mu-flex style="width:80%;">
          <span class="cont-item-detail">{{ TeamBaseInfo.partyTitle }} </span>
        </mu-flex>
      </mu-row>

      <mu-row class="cont-item-row">
        <mu-flex style="width:20%;">
          <span class="cont-item-title">活动地点</span>
        </mu-flex>

        <mu-flex style="width:80%;">
          <span class="cont-item-detail">{{ TeamBaseInfo.partyVenue.addr }}</span>
        </mu-flex>
      </mu-row>

      <mu-row class="cont-item-row">
        <mu-flex style="width:20%;">
          <span class="cont-item-title">活动时间</span>
        </mu-flex>

        <mu-flex style="width:80%;">
          <span class="cont-item-detail">{{ TeamBaseInfo.partyBeginTime | parseTime('{m}/{d} {h}:{i}') }}  ~  {{ TeamBaseInfo.partyEndTime | parseTime('{m}/{d} {h}:{i}') }}</span>
        </mu-flex>
      </mu-row>

      <mu-row class="cont-item-row">
        <mu-flex style="width:20%;">
          <span class="cont-item-title">集合地点</span>
        </mu-flex>

        <mu-flex style="width:80%;">
          <span class="cont-item-detail">{{ TeamBaseInfo.meetingVenue.addr }}</span>
        </mu-flex>
      </mu-row>

      <mu-row class="cont-item-row">
        <mu-flex style="width:20%;">
          <span class="cont-item-title">招募人数</span>
        </mu-flex>

        <mu-flex style="width:80%;">
          <span class="cont-item-detail">{{ TeamBaseInfo.recruitNumb }}/<span style="color:green; font-size:10px;">{{ TeamBaseInfo.hadRecruitNumb }}</span></span>
        </mu-flex>
      </mu-row>

      <mu-row class="cont-item-row">
        <mu-flex style="width:20%;">
          <span class="cont-item-title">队友偏爱</span>
        </mu-flex>

        <mu-flex style="width:80%;">
          <span class="cont-item-detail">{{ TeamBaseInfo.teammatePrefer }}</span>
        </mu-flex>
      </mu-row>

      <mu-row style="margin-top:.5rem;">
        <mu-flex style="width:20%;">
          <span class="cont-item-title">详细内容</span>   
        </mu-flex>        

        <mu-flex style="width:80%;">
          <span class="cont-item-detail">{{ TeamBaseInfo.partyDetail }}</span>
        </mu-flex>
      </mu-row>
    </div>

    <mu-flex style="font-size:12px; padding:.8rem 1rem 1rem .5rem; margin-top:.5rem; border-bottom:2px solid #fff;" align-items="center">
      <mu-icon value="person_pin_circle" color="green" size="18"></mu-icon>
      <span style="font-size:13px;">距离你 <span style="font-size:13px;">{{ TeamBaseInfo.distance }}</span></span>
      <span style="margin-left:auto; color:#9e9e9e; font-size:13px;">{{ TeamBaseInfo.createTime | formatTime('{y}/{m}/{d} {h}:{i}') }}</span>
    </mu-flex>

    <div style="padding:.5rem; border-bottom:1px dashed #eeeeee; ">
      <mu-flex align-items="center">
        <mu-avatar size="38" :class="TeamBaseInfo.captainSex == 1 ? 'avatar-male' : 'avatar-female'">
          <img :src="TeamBaseInfo.captainAvatar" alt="">
        </mu-avatar>
        <div style="margin-left:.5rem;">
          <mu-row style="font-size:13px;">{{ TeamBaseInfo.captainNickname }}</mu-row>
          <mu-row style="margin-top:.2rem;font-size:7px; color:#43a047;">社交菜鸟Lv1</mu-row>
        </div>
        <div style="margin-left:auto; background:#4db6ac; padding:.2rem .3rem; color:#fff; border-radius:.2rem; font-size:12px; margin-right:.5rem;">Leader</div>
      </mu-flex>
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
      <span style="font-size:12px; color:#9e9e9e;">-- 招募{{ TeamBaseInfo.recruitNumb }}人，还差{{ TeamBaseInfo.recruitNumb - TeamBaseInfo.hadRecruitNumb }}人 --</span>
    </mu-flex>
    <!-- END 队长和队友列表 -->

    <ChatList :TeamType="TeamType" :TeamID="TeamID"></ChatList>

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

    <!-- 加载层 -->
    <mu-flex v-if="InitLoading" align-items="center" justify-content="center" v-loading="true" data-mu-loading-overlay-color="background:rgba(250, 250, 250, .7);" style="position:fixed; top:0; width:100%; height:100%; background:rgba(250, 250, 250, .7); z-index:999; "></mu-flex>

  </div>

  

</template>

<script>
import utils from 'common/utils'
import ChatList from '@/components/ChatList.vue'
export default {
  data () {
    return {
      TeamType: 2,
      InitLoading: true,
      TeamID: 0,

      RecruitImgs: [],
      SwiperIsRender: false,
      TeamBaseInfo: {
        partyVenue: {
          addr: '',
          lat: 0,
          lng: 0,
          name: ''
        },
        meetingVenue: {
          addr: '',
          lat: 0,
          lng: 0,
          name: ''
        },
        recruitStatus: 0, // 0=>组队中， 1=>停止招募(招募成功或者已过期), 2=>已解散(只有组队中才能解散，停止招募后不能解散)
        hadRecruitNumb: 0,
      },
      TeammateList: [],
      JointeamStmt: 0,
      IsCaptain: false,

      swiperOption: {
        autoHeight: true, //enable auto height
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },   

    }
  },
  created () {
    this.TeamID = this.$route.params.teamID
  },
  mounted () {

    // 初始化数据
    this.$axios.post(
      `/party/teamDetail/${this.TeamID}`, 
      {}
    ).then((resp)=>{

      console.log(resp.data)

      // 如果队伍已经解散了，直接跳转到组队列表去
      if(resp.data.code == 40105) {
        this.$toast.message(resp.data.msg)
        this.$router.push('/party/list')
        return
      }

      let dataBack = resp.data.msg
      
      // 渲染详情页基本信息
      // 渲染图片路径处理
      this.RecruitImgs = dataBack.teamBaseInfo.recruitImg
      this.SwiperIsRender = true

      let teamBaseInfo = dataBack.teamBaseInfo
      teamBaseInfo.partyTheme = utils.getPartyThemeName(teamBaseInfo.partyTheme)
      teamBaseInfo.partyTitle = teamBaseInfo.partyTitle == '' ? '一起来玩吧' : teamBaseInfo.partyTitle
      teamBaseInfo.partyDetail = teamBaseInfo.partyDetail == '' ? '大家来这里一起玩吧，出来走走也好!' : teamBaseInfo.partyDetail
      teamBaseInfo.teammatePrefer = teamBaseInfo.teammatePrefer == '' ? '随便来！' : teamBaseInfo.teammatePrefer

      // 距离处理
      teamBaseInfo.distance = utils.distanceFormat(teamBaseInfo.distance)
      // 队伍发布时间处理
      // 已招募人数
      teamBaseInfo.hadRecruitNumb = dataBack.teammateList.length

      this.TeamBaseInfo = teamBaseInfo  // 赋值
      this.TeammateList = dataBack.teammateList
      for(let i = 0; i < this.TeammateList.length; i++) { // 队友头像处理
        this.TeammateList[i].avatar = utils.imgPrefixDeal(this.TeammateList[i].avatar)
      }

      this.IsCaptain = dataBack.isCaptain
      this.JointeamStmt = dataBack.joinStmt

      // 图片路径处理
      teamBaseInfo.captainAvatar = utils.imgPrefixDeal(teamBaseInfo.captainAvatar)

      this.InitLoading = false
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
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
  },
  components: {
    ChatList,
  },
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }

.mine-menu-box { margin-top:1rem; right:.5rem; }
.mine-menu-list { background:#4dd0e1; color:white; padding:0; }
.mine-menu-item { color:#fff; font-size:12px; }

.main-cont-div { padding:.5rem 1rem 0rem .5rem; }
.cont-item-row { margin-bottom:.3rem; }
.cont-item-title { color:#795548; font-weight:700; letter-spacing: 1px; font-size:14px; }
.cont-item-detail { margin-bottom: .3rem; color:#424242; font-size:13px; letter-spacing: 1px; }

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

.team-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.team-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
</style>


