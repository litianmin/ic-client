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
        <span style="color:#fff;">即时组队</span>
      </mu-flex>

      <mu-flex style="margin-left:auto; margin-right:.5rem;">
        <span @click="ExpandBox = true">
          <svg-icon icon-class="more-white" style="font-size:20px;"></svg-icon>
        </span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <!-- 队伍基本信息 -->
    <div style="padding:.5rem; margin-top:2.5rem;">
      <mu-flex align-items="center">
        <mu-avatar size="28" @click="$router.push(`/usr/usercard/${MainInfo.captainID}`)">
          <img :src="MainInfo.captainAvatar | imgPrefixDeal()">
        </mu-avatar>
        <span class="comment-item-nickname">
          {{ MainInfo.captainNickname }}
        </span>
        <span class="comment-item-time" style="margin-right:.6rem;">{{ MainInfo.createTime | formatTime('{y}/{m}/{d} {h}:{i}') }}</span>
      </mu-flex>

      <mu-row class="comment-item-text">
        {{ MainInfo.cont }}
      </mu-row>

      <mu-row class="comment-item-img">
        <img :src="MainInfo.recruitImg | imgPrefixDeal()" alt="">
      </mu-row>

      <mu-row style="padding:1rem .5rem;" >
        <mu-icon value="person_pin_circle" color="#4caf50" size="20"></mu-icon>
        <span style="font-size:12px; color:#9e9e9e;">地点：
          <span
          @click="openLocation" 
          style="letter-spacing: 1px; color:#009688; font-weight:700; font-size:12px; text-decoration:underline">{{ MainInfo.siteName }}</span>
           · 距离你{{ MainInfo.distance | distanceFormat() }}</span>
      </mu-row>
    </div>

    <!-- BEGIN 队长和队友列表 -->
    <mu-flex style="padding:.5rem 1rem; background:#fff;" justify-content="center" align-items="center" wrap="wrap">
        <mu-avatar 
          v-for="(item, index) in MainInfo.teammates" 
          :key="index" 
          @click="$router.push(`/usr/usercard/${item.user_id}`)"
          size="35" 
          :class="item.sex == 1 ? 'avatar-male' : 'avatar-female'" 
          style="margin-right:.5rem;">
          <img :src="item.avatar | imgPrefixDeal()" alt="">
        </mu-avatar>
        <span v-if="MainInfo.teamStatus == 0" @click="joinTeam">
          <svg-icon icon-class="add_circle_outline" style="font-size:40px; color:red;"></svg-icon>
        </span>
    </mu-flex>
    <mu-flex justify-content="center" style="padding:.3rem 0 .5rem 0; border-bottom:1px dashed #e0e0e0; background:#fff;">
      <span style="font-size:12px; color:#9e9e9e;">-- 已招募{{ MainInfo.hadRecruitNumb }}人 --</span>
    </mu-flex>
    <!-- END 队长和队友列表 -->


    <ChatList :TeamType="TeamType" :TeamID="TeamID"></ChatList>

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

      <mu-icon @click="$refs.shareGuide.show()" value="share" class="reply-input-box-icon" size="18" color="#8A8A8A"></mu-icon>
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

    <!-- 加载层 -->
    <Loading v-show="InitLoading"/>

    <WxShareGuide ref="shareGuide"/>
  </div>
</template>

<script>
import ChatList from '@/components/ChatList.vue'
import { wxInit } from '@/common/wxInit.js'
import { getNickname } from '@/common/mStore.js'
import wx from 'weixin-js-sdk'
import WxShareGuide from '@/components/WxShareGuide.vue'
import Loading from '@/components/Loading.vue'
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

      TeamType: 4,
      InitLoading: true,
      TeamID: 0,
      IsSortup: false,

      MainInfo: {
	      teamStatus: 0,
	      cont: '',
        recruitNumb: 0,
        hadRecruitNumb: 0,
	      siteName: '',
	      siteDetail: '',
	      siteLng: 0,
	      siteLat: 0,
	      recruitImg: '',
	      createTime: 0,
	      distance: 0,
        teammates: [],
        captainID: 0,
        captainSex: 0,
        captainAvatar: '',
        captainNickname: ''
      },

      SelfInfo: {
        joinStatus: 0,
        isCaptain: false,
      },

      ExpandBox: false,
    }
  },


  created () {
    this.TeamID = this.$route.params.teamID
  },

  mounted () {
    wxInit(this, true)
  },


  methods: {
    pageInit () {
      let lng = 113.122629
      let lat = 23.029735
      this.$axios.get(`/instant/detail/${this.TeamID}/${lng}/${lat}`, {}).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.info(resp.data.msg)
          return
        }

        let data = resp.data.msg

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
          teamStatus: data.teamStatus,
          cont: data.cont,
          recruitNumb: 0,
          hadRecruitNumb: data.teammates.length - 1,
          siteName: data.siteName,
          siteDetail: data.siteDetail,
          siteLng: data.siteLng,
          siteLat: data.siteLat,
          recruitImg: data.recruitImg,
          createTime: data.createTime,
          distance: data.distance,
          teammates: teammates,
          captainID: captainInfo.userID,
          captainSex: captainInfo.sex,
          captainAvatar: captainInfo.avatar,
          captainNickname: captainInfo.nickname
        }

        console.log(this.MainInfo)

        this.SelfInfo = {
          joinStatus: data.joinStatus,
          isCaptain: data.isCaptain,
        }

        this.ShareTitle = `${getNickname()}：我在这里等你！`   // 分享title
        this.ShareDesc = this.MainInfo.cont  // 分享描述
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
        console.log(dataBack)
        this.$toast.info(dataBack.msg)
        if(dataBack.code == 20000) {
          window.location.reload()
        }
      })
    },

    leaveTeam () {  // 点击离开组队按钮或者图标
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

    leaveTeamReq () { // 离开组队请求
      this.$axios.get(`/common/leaveTeam/${this.TeamType}/${this.TeamID}`, {}).then((resp)=>{
        if(resp.data.code == 20000) {
          this.$toast.info('已成功退出组队！')
          this.$router.replace(`/travel/list`)
          return
        }
      }) 
    },

    newChat (isReply, replyTo, replyID, replyNickname) {
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

    openLocation () {
      let _this = this
      wx.openLocation({
        latitude: _this.TeamBaseInfo.site.lat, // 纬度，浮点数，范围为90 ~ -90
        longitude: _this.TeamBaseInfo.site.lng, // 经度，浮点数，范围为180 ~ -180。
        name: _this.TeamBaseInfo.site.name, // 位置名
        address: _this.TeamBaseInfo.site.addr, // 地址详情说明
        scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      })
    },

  },

}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); }
.mine-menu-box { margin-top:1rem; right:.5rem; }
.mine-menu-list { background:#81c784; color:white; padding:0; background: linear-gradient(to right, #4dd0e1 , #80cbc4); }
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
.comment-item-nickname { margin-left:.5rem; font-size:13px; color:#4db6ac; }
.comment-item-time { margin-left: auto; margin-right:.3rem; font-size:12px; color:#9e9e9e; }
.comment-item-text { padding:.5rem 0 .5rem 1.5rem; font-size:13px; }
.comment-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }

.avatar-male { padding:.1rem; border:1px solid #bbdefb; border-radius:50%; background:white; }
.avatar-female { padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; }

</style>


