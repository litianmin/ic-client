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

      <span style="color:#fff; font-size:12px; padding:0 .5rem;" slot="right">创建组队</span>
    </mu-appbar>
    <!-- END 头部 -->

    <!-- 展示图片 -->
    <mu-flex v-if="SwiperIsRender" style="position:relative;" justify-content="center">
      <swiper :options="swiperOption" style="height: auto">
        <swiper-slide v-for="(item, index) in RecruitImgs" :key="index" style="text-align:center;">
          <img style="max-width:100%; max-height:100%;" :src="item" alt="">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </mu-flex>

    <div style="padding:.5rem 1rem 0rem .5rem;">
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">主要活动:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ TeamBaseInfo.partyTitle }}</span>
      </mu-row>
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">活动地点:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ TeamBaseInfo.partyVenue.addr }}</span>
      </mu-row>
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">活动时间:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ TeamBaseInfo.partyBeginTime }}  ~  {{ TeamBaseInfo.partyEndTime }}</span>
      </mu-row>
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">集合地点:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ TeamBaseInfo.meetingVenue.addr }}</span>
      </mu-row>
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">招募人数:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ TeamBaseInfo.recruitNumb }}/<span style="color:green; font-size:10px;">{{ TeamBaseInfo.hadRecruitNumb }}</span></span>
      </mu-row>
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">队友偏爱:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ TeamBaseInfo.teammatePrefer }}</span>
      </mu-row>

      <mu-row style="margin-top:.5rem;">
        <span style="color:#795548; font-size:12px;">详细内容:            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ TeamBaseInfo.partyDetail }}</span></span>
      </mu-row>
    </div>

    <mu-flex style="font-size:12px; padding:.8rem 1rem 1rem .5rem; margin-top:.5rem; border-bottom:2px solid #fff;" align-items="center">
      <mu-icon value="person_pin_circle" color="green" size="18"></mu-icon>
      <span style="font-size:12px;">距离你 <span style="font-size:12px;">{{ TeamBaseInfo.distance }}</span></span>
      <span style="margin-left:auto; color:#9e9e9e; font-size:12px;">{{ TeamBaseInfo.createTime }}</span>
    </mu-flex>

    <div style="padding:.5rem; border-bottom:1px dashed #eeeeee; ">
      <mu-flex align-items="center">
        <mu-avatar size="38" style="padding:.1rem; border:1px solid #bbdefb; border-radius:50%; background:white;">
          <img :src="TeamBaseInfo.captainAvatar" alt="">
        </mu-avatar>
        <div style="margin-left:.5rem;">
          <mu-row style="font-size:12px;">{{ TeamBaseInfo.captainNickname }}</mu-row>
          <mu-row style="margin-top:.2rem;font-size:7px; color:#43a047;">社交菜鸟Lv1</mu-row>
        </div>
        <div style="margin-left:auto; background:#4db6ac; padding:.2rem .3rem; color:#fff; border-radius:.2rem; font-size:12px; margin-right:.5rem;">Leader</div>
      </mu-flex>
    </div>

    <!-- BEGIN 队长和队友列表 -->
    <mu-flex style="padding:.5rem 1rem; background:#fff;" justify-content="center" align-items="center" wrap="wrap">
        <mu-avatar v-for="(item, index) in TeammateList" :key="index" size="35" style="padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; margin-right:.5rem;">
          <img :src="item.avatar" alt="">
        </mu-avatar>
        <span @click="joinTeam">
          <svg-icon icon-class="add_circle_outline" style="font-size:40px; color:red;"></svg-icon>
        </span>
    </mu-flex>
    <mu-flex justify-content="center" style="padding:.3rem 0 .5rem 0; border-bottom:1px dashed #e0e0e0; background:#fff;">
      <span style="font-size:12px; color:#9e9e9e;">-- 招募{{ TeamBaseInfo.recruitNumb }}人，还差{{ TeamBaseInfo.hadRecruitNumb }}人 --</span>
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
          <mu-avatar size="24">
            <img :src="item.avatar">
          </mu-avatar>
          <span class="reply-nickname">
            {{ item.nickname }} 
          </span>
          <span class="reply-time">{{ item.create_time }}</span>
        </mu-flex>

        <mu-row class="reply-cont-box">
          <span style="font-size:12px; margin-left:.5rem; ">
            <span v-if="item.reply_to > 0">@<span style="color:#795548;">{{ item.reply_nickname }}</span> :</span> {{ item.c_cont }}

            <span style="color:green; margin-left:.5rem;"  @click="replytoComment(true, item.user_id, item.nickname)">
              回复
            </span>
          </span>
        </mu-row>

        <mu-row v-if="item.c_img" class="comment-item-img" style="padding:.5rem .5rem .5rem 1rem; ">
          <img :src="item.c_img">
        </mu-row>
      </mu-container>

      <mu-row v-show="IsTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; margin-bottom:4rem; color:#9e9e9e;">
        <span> 没有更多的回复 </span>
      </mu-row>

    </mu-load-more>
    <!-- END 回复评论 -->

    <!-- 发起评论框 -->
    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:80%;" @click="newChat(false, 0, '')">
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
import utils from 'common/utils'
export default {
  data () {
    return {
      TeamID: 0,
      IsSortup: false,
      IsTheLast: true,
      ReplyListPage: 1,
      ReplyList: [],
      Loading: false,
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
        recruitStatus: 1, // 0=>组队中， 1=>停止招募(招募成功或者已过期), 2=>已解散
      },
      TeammateList: [],
      JointeamStmt: 0,

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
  mounted () {
    this.TeamID = this.$route.params.teamID
    console.log(this.TeamID)

    // 初始化数据
    this.$axios.post(
      `/party/teamDetail/${this.TeamID}`, 
      {}
    ).then((resp)=>{
      let dataBack = resp.data.msg
      this.IsTheLast = dataBack.isTheLast
      
      // 渲染详情页基本信息
      this.RecruitImgs = dataBack.teamBaseInfo.recruitImg
      this.SwiperIsRender = true

      let teamBaseInfo = dataBack.teamBaseInfo
      teamBaseInfo.partyTheme = utils.getPartyThemeName(teamBaseInfo.partyTheme)
      teamBaseInfo.partyTitle = teamBaseInfo.partyTitle == '' ? '一起来玩吧' : teamBaseInfo.partyTitle
      teamBaseInfo.partyDetail = teamBaseInfo.partyDetail == '' ? '大家来这里一起玩吧，出来走走也好!' : teamBaseInfo.partyDetail
      teamBaseInfo.teammatePrefer = teamBaseInfo.teammatePrefer == '' ? '随便来！' : teamBaseInfo.teammatePrefer
      // 先格式化活动时间  {{ item.partyBeginTime }}  ~  {{ item.partyEndTime }}
      // 2019/1/02 02:02  ~  2019/3/02 03:04
      teamBaseInfo.partyBeginTime = utils.unixToDate(teamBaseInfo.partyBeginTime)
      teamBaseInfo.partyEndTime = utils.unixToDate(teamBaseInfo.partyEndTime)
      // 距离处理
      teamBaseInfo.distance = utils.distanceFormat(teamBaseInfo.distance)
      // 队伍发布时间处理
      teamBaseInfo.createTime = utils.getDateDiff(teamBaseInfo.createTime, true)

      this.TeamBaseInfo = teamBaseInfo  // 赋值
      this.TeammateList = dataBack.teammateList
      this.ReplyList = dataBack.chatList

      console.log(resp.data)
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    load () {
      this.Loading = true      
      let sortWay = this.IsSortup == false ? 0 : 1
      this.$axios.post(`/game/commentReplyList/${this.ReplyListPage}/${this.CommentID}/${sortWay}`,{}).then((resp)=>{
        let dataBack = resp.data
        this.IsTheLast = dataBack.isTheLast
        let replyList = dataBack.listInfo
        for(let i = 0; i < replyList.length; i++) {
          replyList[i].create_time = utils.getDateDiff(replyList[i].create_time, false)
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
    replytoComment (isReply, replyID, replyNickname) {
      this.$router.push({path:`/game/replytoComment`, query:{commentID:this.CommentID, isReply:isReply, replyID:replyID, replyNickname:replyNickname}})
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
          this.$toast.message('现在正在准备加入')
        break
        case 1: // 申请
          // 不做处理
        break
        case 2: // 拒绝加入
          // 不做处理
        break
        case 3: // 已加入
          // 不做处理
        break
        case 4: // 已离队，重新加入
          this.$toast.message('你离开组队了，准备重新加入')
        break
        case 5:
          // 不做处理
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
  },
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }

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
</style>


