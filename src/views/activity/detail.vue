<template>
  <div>
    <mu-flex style="width:100%;">
      <img style="width:100%; height:auto;" :src="MainInfo.recruitImg" alt="">
    </mu-flex>
    <mu-flex>
      <span style="font-size:18px; font-weight:700; padding:.5rem .8rem; letter-spacing:1px;">{{ MainInfo.title }}</span>
    </mu-flex>

    <mu-flex style="width:100%; font-size:13px; padding:.3rem 1rem 1rem .8rem;" wrap="wrap" justify-content="start">
      <div style="width:100%;"><span style="">于 {{ MainInfo.beginTime | parseTime('{m}/{d} {h}:{i}') }}</span> </div>
      <mu-flex align-items="center">
        <span>在 <span @click="openLocation" style="color:#009688; font-weight:700; font-size:12px; text-decoration:underline">{{ MainInfo.siteName }}</span> 与你相聚</span>
      </mu-flex>
    </mu-flex>

    <!-- 文章详情 -->
    <div style="padding:0 .8rem .5rem .8rem;" v-html="MainInfo.cont"></div>

    <!-- <mu-flex style="width:100%; font-size:13px; padding:.5rem 1rem 1rem .5rem;" wrap="wrap" justify-content="end">
      <div style="width:100%; text-align:right;"><span style="">{{ TeamBaseInfo.beginTime | parseTime('{m}/{d} {h}:{i}') }}</span> </div>
      <mu-flex align-items="center">
        <span>在 <span style="color:#009688; font-weight:700; font-size:12px; text-decoration:underline">{{ TeamBaseInfo.venue.name }}</span> 与你相聚</span>
      </mu-flex>
    </mu-flex> -->


    <!-- BEGIN 队友列表 -->
    <mu-flex style="padding: .8rem 1rem .5rem 1rem; background:#fff; border-top:1px solid #eeeeee" justify-content="center" align-items="center" wrap="wrap">
        <mu-avatar 
          v-for="(item, index) in MainInfo.teammates" 
          :key="index" 
          @click="$router.push(`/usr/usercard/${item.userID}`)"
          size="35" 
          :class="item.sex == 1 ? 'avatar-male' : 'avatar-female'" 
          style="margin-right:.5rem;">
          <img :src="item.avatar | imgPrefixDeal()" alt="">
        </mu-avatar>
        <span v-if="MainInfo.teamStatus == 0" @click="joinTeam">
          <svg-icon icon-class="add_circle_outline" style="font-size:40px; color:red;"></svg-icon>
        </span>
    </mu-flex>
    <mu-flex justify-content="center" style="padding:.3rem 0 .5rem 0; background:#fff;">
      <span style="font-size:12px; color:#9e9e9e;">-- 招募{{ MainInfo.recruitNumb }}人，还差{{ MainInfo.recruitNumb - MainInfo.hadRecruitNumb }}人 --</span>
    </mu-flex>
    <!-- END 队长和队友列表 -->

    <ChatList :TeamType="TeamType" :TeamID="TeamID"></ChatList>

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

      <mu-icon 
        @click="$refs.shareGuide.show()" 
        value="share" 
        class="reply-input-box-icon" 
        size="18" 
        color="#8A8A8A"></mu-icon>
    </mu-flex>
    <Loading v-show="InitLoading"/>
    <WxShareGuide ref="shareGuide"/>
  </div>  
</template>

<script>
import ChatList from '@/components/ChatList.vue'
import { wxInit } from '@/common/wxInit.js'
import { getNickname } from '@/common/mStore.js'
import WxShareGuide from '@/components/WxShareGuide.vue'
import Loading from '@/components/Loading.vue'
import wx from 'weixin-js-sdk'
export default {
  components: {
    ChatList,
    WxShareGuide,
    Loading
  },

  data () {
    return {
      ShareTitle: '', // 分享title
      ShareDesc: '',  // 分享描述
      ShareImgUrl: '',  // 分享图片
      TeamType: 5,
      TeamID: 0,
      Lng: 113.186702,
      Lat: 23.035872,

      InitLoading: true,
      MainInfo: {
        title: 0,
        teamStatus: 0,
        cont: '', 
        siteDetail: '', // 活动地点
        siteName: '',
        siteLng: 0,
        siteLat: 0,
        beginTime: 0,
        endTime: 0,
        recruitNumb: 0,
        hadRecruitNumb: 0,
        distance: 0,
        teammates: [],
      },

      SelfInfo: {
        joinStatus: 0
      }
    }
  },
  created () {
    this.TeamID = this.$route.params.activityID
  },
  mounted () {
    wxInit(this, true)
  },
  methods: {

    pageInit () {
      this.$axios.post(`/activity/detail`, {
        teamID: Number(this.TeamID),
        lng: this.Lng,
        lat: this.Lat
      }).then((resp)=>{
        console.log(resp)
        let data = resp.data

        if(data.code != 20000) {
          this.$toast.info(resp.data.msg)
          if (data.code == 40101) { // 如果队伍已删除，或者已经解散，返回上一页
            setTimeout(() => {
              let that = this
              that.$router.go(-1)
            }, 500)
          }
          return
        }

        data = data.msg

        let captainInfo = {}
        let teammates = []
        data.teammates.forEach(v => {
          if (v.isCaptain == 1) { // 如果是队长
            captainInfo = v
          } else {
            teammates.push(v)
          }
        })

        this.MainInfo = {
          title: data.title,
          teamStatus: data.teamStatus,
          cont: data.cont, 
          siteDetail: data.siteDetail, // 活动地点
          siteName: data.siteName,
          siteLng: data.siteLng,
          siteLat: data.siteLat,
          beginTime: data.beginTime,
          endTime: data.endTime,
          recruitNumb: data.recruitNumb,
          hadRecruitNumb: (data.recruitNumb - teammates.length),
          distance: data.distance,
          teammates: teammates,
        }

        this.SelfInfo = {
          joinStatus: data.joinStatus
        }


        this.ShareTitle = getNickname() + '邀请您来加入，精彩活动等着您！'    // 分享title
        this.ShareDesc = data.title  // 分享描述
        this.ShareImgUrl = data.recruitImg  // 分享图片

        this.InitLoading = false
      })
    },

    inviteFriend () { // 邀请好友
      this.$router.push(`/usr/inviteFriend/${this.TeamID}/${this.TeamType}`)
    },

    joinTeam () { // 加入组队
      this.$axios.get(
        `/common/joinTeam/${this.TeamType}/${this.TeamID}`,{}
      ).then((resp)=>{
        let dataBack = resp.data
        this.$toast.info(dataBack.msg)
        if(dataBack.code == 20000) {
          window.location.reload()
        }
      })
    },

    leaveTeam () {  // 点击离开组队按钮或者图标
      this.leaveTeamReq()
    },

    leaveTeamReq () { // 离开组队请求
      this.$axios.get(`/common/leaveTeam/${this.TeamType}/${this.TeamID}`, {}).then((resp)=>{
        if(resp.data.code == 20000) {
          this.$toast.info('已成功退出组队！')
          this.$router.push(`/party/list`)
          return
        }
      }) 
    },

    newChat (isReply, replyTo, replyID, replyNickname) {
      // 只有加入组队的人才能进行评论
      if(this.SelfInfo.joinStatus != 3) {
        this.$toast.message('加入组队后才能聊天哦')
        return
      }
      this.$router.push({path:`/common/newChat`, query:{teamType:this.TeamType, teamID:this.TeamID, isReply, replyTo, replyID, replyNickname}})
    },

    openLocation () {
      let _this = this
      wx.openLocation({
        latitude: _this.TeamBaseInfo.venue.lat, // 纬度，浮点数，范围为90 ~ -90
        longitude: _this.TeamBaseInfo.venue.lng, // 经度，浮点数，范围为180 ~ -180。
        name: _this.TeamBaseInfo.venue.name, // 位置名
        address: _this.TeamBaseInfo.venue.addr, // 地址详情说明
        scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      })
    }

  },

}
</script>

<style scoped>
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


