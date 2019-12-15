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
        <span style="color:#fff;">节日聚会</span>
      </mu-flex>

      <mu-flex style="margin-left:auto; margin-right:.5rem;">
        <span  @click="ExpandBox = true">
          <svg-icon icon-class="more-white" style="font-size:20px;"></svg-icon>
        </span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <!-- 展示图片 -->
    <mu-flex 
      v-if="SwiperIsRender" 
      class="swiper-container" 
      justify-content="center">
      <swiper :options="SwiperOption" style="height: auto">
        <swiper-slide v-for="(item, index) in MainInfo.displayImgs" :key="index" style="text-align:center;">
          <img style="max-width:100%; max-height:100%;" :src="item | imgPrefixDeal()">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </mu-flex>

    <div class="main-cont-div">
      <mu-row class="cont-item-row">
        <mu-flex style="width:20%;">
          <span class="cont-item-title">活动内容</span>
        </mu-flex>
        <mu-flex style="width:80%;">
          <span class="cont-item-detail">{{ MainInfo.cont }} </span>
        </mu-flex>
      </mu-row>

      <mu-row class="cont-item-row">
        <mu-flex style="width:20%;">
          <span class="cont-item-title">活动地点</span>
        </mu-flex>


        <mu-flex style="width:80%;">
          <span 
            @click="openLocation"
            class="addr-locate">{{ MainInfo.siteDetail }}</span>
        </mu-flex>
      </mu-row>

      <mu-row class="cont-item-row">
        <mu-flex style="width:20%;">
          <span class="cont-item-title">开始时间</span>
        </mu-flex>

        <mu-flex style="width:80%;">
          <span class="cont-item-detail">{{ MainInfo.beginTime | parseTime('{m}/{d} {h}:{i}') }}</span>
        </mu-flex>
      </mu-row>

      <mu-row class="cont-item-row">
        <mu-flex style="width:20%;">
          <span class="cont-item-title">招募人数</span>
        </mu-flex>

        <mu-flex style="width:80%;">
          <span class="cont-item-detail">
            {{ MainInfo.recruitNumb == 0 ? '不限' : MainInfo.recruitNumb }}/<span style="color:green; font-size:10px;">{{ MainInfo.hadRecruitNumb }}</span>
          </span>
        </mu-flex>
      </mu-row>

    </div>

    <mu-flex class="distance-container" align-items="center">
      <mu-icon 
        value="person_pin_circle" 
        color="green" 
        size="18"></mu-icon>
      <span style="font-size:13px;">
        距离你 <span style="font-size:13px;">{{ MainInfo.distance | distanceFormat() }}</span>
      </span>
      <span class="createtime-span">{{ MainInfo.createTime | formatTime('{y}/{m}/{d} {h}:{i}') }}</span>
    </mu-flex>

    <div class="captain-container">
      <mu-flex align-items="center">
        <mu-avatar 
          @click="$router.push(`/usr/usercard/${MainInfo.captainID}`)"
          size="38" 
          :class="MainInfo.captainSex == 1 ? 'avatar-male' : 'avatar-female'">
          <img :src="MainInfo.captainAvatar | imgPrefixDeal()">
        </mu-avatar>
        <div style="margin-left:.5rem;">
          <mu-row style="font-size:13px;">{{ MainInfo.captainNickname }}</mu-row>
          <mu-row class="level-span">社交菜鸟Lv1</mu-row>
        </div>
        <div class="captain-flag">Leader</div>
      </mu-flex>
    </div>

    <!-- BEGIN 队友列表 -->
    <mu-flex 
      class="teammates-container" 
      justify-content="center" 
      align-items="center" 
      wrap="wrap">
      <mu-avatar 
        v-for="(item, index) in MainInfo.teammates" 
        :key="index" 
        @click="item.userID"
        size="35" 
        :class="item.sex == 1 ? 'avatar-male' : 'avatar-female'" 
        style="margin-right:.5rem;">
        <img :src="item.avatar | imgPrefixDeal()" alt="">
      </mu-avatar>
      <span v-if="MainInfo.teamStatus == 0" @click="joinTeam">
        <svg-icon icon-class="add_circle_outline" style="font-size:40px; color:red;"></svg-icon>
      </span>
    </mu-flex>
    <mu-flex justify-content="center" class="recruit-condition">
      <span style="font-size:12px; color:#9e9e9e;">-- 招募{{ MainInfo.recruitNumb }}人，还差{{ MainInfo.recruitNumb - MainInfo.hadRecruitNumb }}人 --</span>
    </mu-flex>
    <!-- END 队长和队友列表 -->

    <ChatList :TeamType="TeamType" :TeamID="TeamID"></ChatList>

    <!-- 发起评论框 -->
    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:80%;" @click="newChat(false, 0, 0, '')">
        <input type="text" placeholder="我也来说一句吧" disabled>
      </div>

      <span 
        v-if="SelfInfo.joinStatus == 1 || SelfInfo.joinStatus == 2 || SelfInfo.joinStatus == 5" 
        @click="joinTeam" 
        style="font-size:19px; margin-left:auto;">
        <svg-icon icon-class="jointeam_refuse"></svg-icon>
      </span>
      <span 
        v-if="SelfInfo.joinStatus == 3" 
        @click="inviteFriend" 
        style="font-size:19px; margin-left:auto;">
        <svg-icon icon-class="team-invite"></svg-icon>
      </span>

      <span 
        v-if="SelfInfo.joinStatus == 0 || SelfInfo.joinStatus == 4" 
        @click="joinTeam" 
        style="font-size:20px; margin-left:auto;">
        <svg-icon icon-class="jointeam"></svg-icon>
      </span>

      <mu-icon 
        @click="$refs.shareGuide.show()" 
        value="share" 
        class="reply-input-box-icon" 
        size="18" 
        color="#8A8A8A"></mu-icon>
    </mu-flex>


    <!-- 底部弹出框 -->
    <mu-bottom-sheet :open.sync="ExpandBox" :lock-scroll="true">
      <mu-list @item-click="ExpandBox = false">
        <mu-list-item button v-if="SelfInfo.joinStatus == 3" @click="leaveTeam">
          <mu-list-item-action>
            <svg-icon icon-class="leave-team-green" style="font-size:20px;"></svg-icon>
          </mu-list-item-action>
          <mu-list-item-title>
            <span style="color:#424242; letter-spacing:1px;">离开组队</span>
          </mu-list-item-title>
        </mu-list-item>

        <mu-list-item button v-else @click="joinTeam">
          <mu-list-item-action>
            <svg-icon icon-class="join-team-green" style="font-size:20px;"></svg-icon>
          </mu-list-item-action>
          <mu-list-item-title>
            <span style="color:#424242; letter-spacing:1px;">加入组队</span>
          </mu-list-item-title>
        </mu-list-item>

        <mu-list-item button @click="inviteFriend">
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
    <mu-flex v-if="InitLoading" align-items="center" justify-content="center" v-loading="true" data-mu-loading-overlay-color="background:rgba(250, 250, 250, .7);" style="position:fixed; top:0; width:100%; height:100%; background:rgba(250, 250, 250, .7); z-index:999; "></mu-flex>

    <WxShareGuide ref="shareGuide"/>
  </div>

  

</template>

<script>
import utils from 'common/utils'
import ChatList from '@/components/ChatList.vue'
import { wxInit } from '@/common/wxInit.js'
import WxShareGuide from '@/components/WxShareGuide.vue'
import wx from 'weixin-js-sdk'
export default {
  components: {
    ChatList,
    WxShareGuide,
  },

  data () {
    return {
      ExpandBox: false,
      ShareTitle: '', // 分享title
      ShareDesc: '',  // 分享描述
      ShareImgUrl: '',  // 分享图片

      TeamType: 2,
      InitLoading: true,
      TeamID: 0,

      MainInfo: {
        theme: 0,
        teamStatus: 0,
        displayImgs: [],
        cont: '', // 活动内容
        siteDetail: '', // 活动地点
        siteName: '',
        siteLng: 0,
        siteLat: 0,
        beginTime: 0,
        recruitNumb: 0,
        hadRecruitNumb: 0,
        distance: 0,
        createTime: 0,
        captainID: 0,
        captainSex: 0,
        captainAvatar: '',
        captainNickname: '',
        teammates: [],
      },

      SelfInfo: {
        joinStatus: 0,
        isCaptain: false,
      },

      SwiperIsRender: false,
      SwiperOption: {
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
    wxInit(this, true)
    // 初始化数据
  },
  methods: {
    pageInit () {

      let userAddrInfo = utils.getLocationInfo()
      let lng = userAddrInfo.lng
      let lat = userAddrInfo.lat

      this.$axios.post(
        `/party/teamDetail`, {
          teamID: Number(this.TeamID),
          lng: Number(lng),
          lat: Number(lat)
        }
      ).then((resp)=>{

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
          theme: data.theme,
          teamStatus: data.teamStatus,
          displayImgs: data.displayImgs,
          cont: data.cont, // 活动内容
          siteDetail: data.siteDetail, // 活动地点
          siteName: data.siteName,
          siteLng: data.siteLng,
          siteLat: data.siteLat,
          beginTime: data.beginTime,
          recruitNumb: data.recruitNumb,
          hadRecruitNumb: (data.recruitNumb - teammates.length),
          distance: data.distance,
          createTime: data.createTime,
          captainID: captainInfo.userID,
          captainSex: captainInfo.sex,
          captainAvatar: captainInfo.avatar,
          captainNickname: captainInfo.nickname,
          teammates: teammates,
        }

        this.SelfInfo = {
          joinStatus: data.joinStatus,
          isCaptain: data.isCaptain,
        }

        // 渲染详情页基本信息
        this.SwiperIsRender = true

        this.ShareTitle = '助助社交，更多好玩的party聚会等着你，一起来吧！', // 分享title
        this.ShareDesc = data.cont,  // 分享描述
        this.ShareImgUrl = '',  // 分享图片

        this.InitLoading = false
      })
    },

    inviteFriend () { // 邀请好友
      this.$router.push(`/usr/inviteFriend/${this.TeamID}/${this.TeamType}`)
    },

    joinTeam () {
      // 首先判断队伍的状态是否停止招募
      if(this.TeamStatus > 0) {
        switch(this.TeamStatus) {
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
      switch(this.JoinStatus) {
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

    openLocation () { // 打开微信导航
      let _this = this
      wx.openLocation({
        latitude: _this.SiteLat, // 纬度，浮点数，范围为90 ~ -90
        longitude: _this.SiteLng, // 经度，浮点数，范围为180 ~ -180。
        name: _this.SiteName, // 位置名
        address: _this.SiteDetail, // 地址详情说明
        scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      })
    }

  },
}
</script>

<style scoped>

.swiper-container {
  position:relative; 
  margin-top:2.5rem;
}

.addr-locate {
  margin-bottom: .3rem; 
  letter-spacing: 1px; 
  color:#009688; 
  font-weight:700; 
  font-size:12px; 
  text-decoration:underline
}

.distance-container {
  font-size:12px; 
  padding:.8rem 1rem 1rem .5rem; 
  margin-top:.5rem; 
  border-bottom:2px solid #fff;
}

.createtime-span {
  margin-left:auto; 
  color:#9e9e9e; 
  font-size:13px;
}

.captain-container {
  padding:.5rem; 
  border-bottom:1px dashed #eeeeee;
}

.level-span {
  margin-top:.2rem;
  font-size:7px; 
  color:#43a047;
}

.captain-flag {
  margin-left:auto; 
  background:#4db6ac; 
  padding:.2rem .3rem; 
  color:#fff; 
  border-radius:.2rem; 
  font-size:12px; 
  margin-right:.5rem;
}

.teammates-container {
  padding:.5rem 1rem; 
  background:#fff;
}

.recruit-condition {
  padding:.3rem 0 .5rem 0; 
  border-bottom:1px dashed #e0e0e0; 
  background:#fff;
}

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


