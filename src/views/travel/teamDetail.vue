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
        <span style="color:#fff;">旅游</span>
      </mu-flex>

      <mu-flex style="margin-left:auto; margin-right:.5rem;">
        <span  @click="ExpandBox = true">
          <svg-icon icon-class="more-white" style="font-size:20px;"></svg-icon>
        </span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <!-- 基本信息 -->
    <div class="baseinfo-containter">

      <!-- <mu-row style="margin-bottom:1rem;">
        <span style="font-size:22px; letter-spacing:1px; font-weight:600;">{{ TeamBaseInfo.travelTitle }}</span>
      </mu-row> -->

      <mu-row style="margin-bottom:.3rem;">
        <mu-col span="2">
          <span class="common-title">旅游类别:</span>
        </mu-col>
        <mu-col span="10" style="padding: 0 0 0 .5rem;">
          <span style="color:#9e9e9e; font-size:12px;">
            <mu-badge :content="MainInfo.theme" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
            <mu-badge :content="MainInfo.pathLength" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
            <mu-badge :content="MainInfo.travelType" color="#00bcd4" style=""></mu-badge>
          </span>
        </mu-col>
      </mu-row>

      <mu-row style="margin-bottom:.3rem;">
        <mu-col span="2">
          <span class="common-title">集合时间:</span>
        </mu-col>
        <mu-col span="10" style="padding: 0 0 0 .5rem;">
          <span class="common-desc">{{ MainInfo.meetingTime | parseTime('{m}/{d} {h}:{i}') }} </span>
        </mu-col>
      </mu-row>

      <mu-row style="margin-bottom:.3rem;">
        <mu-col span="2">
          <span class="common-title">集合地点:</span>
        </mu-col>
        <mu-col span="10" style="padding: 0 0 0 .5rem;">
          <span 
            @click="openLocation"
            class="meeting-addr">{{ MainInfo.siteDetail }}</span>
        </mu-col>
      </mu-row>

      <mu-row style="margin-bottom:.3rem;">
        <mu-col span="2">
          <span class="common-title">招募人数:</span>
        </mu-col>
        <mu-col span="10" style="padding: 0 0 0 .5rem;">
          <span class="common-desc">
            {{ MainInfo.recruitNumb }}/<span style="color:green; font-size:10px;">{{ MainInfo.hadRecruitNumb }}</span>
          </span>
        </mu-col>
      </mu-row>

      <mu-row style="margin-top:.5rem;">
        <mu-col span="2">
          <span class="common-title">详细内容:   </span>  
        </mu-col>
        <mu-col span="10" style="padding: 0 0 0 .5rem;">
          <span class="common-desc">{{ MainInfo.cont }}</span>
        </mu-col>
      </mu-row>
    </div>

    <mu-flex class="distance-time-flex" align-items="center">
      <mu-icon value="person_pin_circle" color="green" size="18"></mu-icon>
      <span>距离你 {{ MainInfo.distance | distanceFormat() }}</span>
      <span class="createtime-span">{{ MainInfo.createTime | formatTime('{y}/{m}/{d} {h}:{i}') }}</span>
    </mu-flex>

    <!-- 步骤列表 -->
    <div 
      class="steplist-container" 
      v-if="MainInfo.stepList.length > 0">
      <div 
        v-for="(item, index) in MainInfo.stepList" 
        :key="index">
        <mu-flex align-items="center">
          <mu-flex 
            align-items="center" 
            justify-content="center" 
            class="addrorprogram-index">{{ index + 1 }}</mu-flex>
          <span class="addrorprogram-span">{{ item.addrOrProgram }}</span>
        </mu-flex>

        <mu-row style="padding:.5rem;">
          <div class="addrorprogram-cont">
            <div v-if="item.travelDesc.length > 0" class="addrorprogram-desc">描述：{{ item.travelDesc }}</div>
            <div v-if="item.descImg.length > 0">
              <img class="addrorprogram-img" :src="item.descImg | imgPrefixDeal()" >
            </div>
          </div>
        </mu-row>
      </div>
      <mu-flex align-items="center">
        <mu-flex 
          align-items="center" 
          justify-content="center" 
          class="addrorprogram-end">!</mu-flex>
        <span class="addrorprogram-end-span">旅 程 结 束！</span>
      </mu-flex>
    </div>


    <!-- BEGIN 队长和队友列表 -->
    <div class="teammate-container">
      <mu-flex align-items="center">
        <mu-avatar 
          @click="$router.push(`/usr/usercard/${item.user_id}`)"
          size="38" 
          :class="MainInfo.captainSex == 1 ? 'avatar-male' : 'avatar-female'">
          <img :src="MainInfo.captainAvatar | imgPrefixDeal()">
        </mu-avatar>
        <div style="margin-left:.5rem;">
          <mu-row style="font-size:12px;">{{ MainInfo.captainNickname }}</mu-row>
          <mu-row class="level">社交菜鸟Lv1</mu-row>
        </div>
        <div class="leader-flag">Leader</div>
      </mu-flex>
    </div>
    
    <mu-flex 
      style="padding:.5rem 1rem; background:#fff;" 
      justify-content="center" 
      align-items="center" 
      wrap="wrap">
        <mu-avatar 
          v-for="(item, index) in MainInfo.teammate" 
          :key="index" 
          size="35" 
          :class="item.sex == 1 ? 'avatar-male' : 'avatar-female'" 
          style="margin-right:.5rem;">
          <img :src="item.avatar | imgPrefixDeal()">
        </mu-avatar>
        <span 
          v-if="MainInfo.teamStatus == 0"
          @click="joinTeam">
          <svg-icon icon-class="add_circle_outline" style="font-size:40px; color:red;"></svg-icon>
        </span>
    </mu-flex>
    <mu-flex 
      justify-content="center" 
      class="recruit-condition">
      <span style="font-size:12px; color:#9e9e9e;">-- 招募{{ MainInfo.recruitNumb }}人，还差{{ MainInfo.recruitNumb - MainInfo.hadRecruitNumb }}人 --</span>
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
import utils from 'common/utils'
import ChatList from '@/components/ChatList.vue'
import Loading from '@/components/Loading.vue'
import { wxInit } from '@/common/wxInit.js'
import WxShareGuide from '@/components/WxShareGuide.vue'
import wx from 'weixin-js-sdk'
export default {
  components: {
    ChatList,
    WxShareGuide,
    Loading,
  },
  data () {
    return {
      ShareTitle: '', // 分享title
      ShareDesc: '',  // 分享描述
      ShareImgUrl: '',  // 分享图片

      TeamType: 3,
      InitLoading: true,
      TeamID: 0,

      MainInfo: {
	      teamStatus: 0,
	      theme: '',
	      pathLength: '',
	      travelType: '',
	      cont: '',
        recruitNumb: 0,
        hadRecruitNumb: 0,
	      siteName: '',
	      siteDetail: '',
	      siteLng: 0,
	      siteLat: 0,
	      meetingTime: 0,
	      recruitImg: '',
	      stepList: [],
	      createTime: 0,
	      distance: 0,
        teammates: [],
        captainID: 0,
        captainSex: 0,
        captainAvatar: '',
        captainNickname: '',
      },

      SelfInfo: {
        joinStatus: 0,
        isCaptain: false,
      },

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
      // 初始化数据
      this.$axios.post(
        `/travel/teamDetail/${this.TeamID}`, 
        {}
      ).then((resp)=>{
        console.log(resp)

        if (resp.data.code != 20000) {
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
          theme: utils.getTravelThemeName(data.theme),
          pathLength: utils.getTravelPathLengthName(data.pathLength),
          travelType: utils.getTravelTypeName(data.travelType),
          cont: data.cont,
          recruitNumb: data.recruitNumb,
          hadRecruitNumb: (data.recruitNumb - teammates.length),
          siteName: data.siteName,
          siteDetail: data.siteDetail,
          siteLng: data.siteLng,
          siteLat: data.siteLat,
          meetingTime: data.meetingTime,
          recruitImg: data.recruitImg,
          stepList: data.stepList,
          createTime: data.createTime,
          distance: data.distance,
          teammates: teammates,
          captainID: captainInfo.userID,
          captainSex: captainInfo.sex,
          captainAvatar: captainInfo.avatar,
          captainNickname: captainInfo.nickname
        }

        this.SelfInfo = {
          joinStatus: data.joinStatus,
          isCaptain: data.isCaptain,
        }

        this.InitLoading = false

        this.ShareTitle = '助助社交，旅游伴你寻觅心灵的自由！' // 分享title
        this.ShareDesc = this.MainInfo.cont  // 分享描述
        this.ShareImgUrl = ''  // 分享图片

        console.log(resp.data)
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
        latitude: _this.MainInfo.siteLat, // 纬度，浮点数，范围为90 ~ -90
        longitude: _this.MainInfo.siteLng, // 经度，浮点数，范围为180 ~ -180。
        name: _this.MainInfo.siteName, // 位置名
        address: _this.MainInfo.siteDetail, // 地址详情说明
        scale: 18, // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
      })
    },

  },

}
</script>

<style scoped>

.baseinfo-containter {
  padding:.5rem 1rem 0rem .5rem; 
  margin-top:2.5rem;
}

.common-title {
  color:#795548; 
  font-size:12px;
}

.common-desc {
  color:#212121; font-size:12px;
}

.meeting-addr {
  letter-spacing: 1px; 
  color:#009688; 
  font-weight:700; 
  font-size:12px; 
  text-decoration:underline;
}

.distance-time-flex {
  font-size:12px; 
  padding:.8rem 1rem 1rem .5rem; 
  margin-top:.5rem; 
  border-bottom:2px solid #fff;
}

.createtime-span {
  margin-left:auto; 
  color:#9e9e9e; 
  font-size:12px;
}

.steplist-container {
  padding:1rem; 
  border-bottom:2px solid #fff;
}

.addrorprogram-index {
  font-size:12px; 
  width:1rem; 
  height:1rem; 
  background:#00bcd4; 
  border-radius:50%; 
  color:#fff;
}

.addrorprogram-span {
  color:#00bcd4; 
  margin-left:1rem;
}

.addrorprogram-cont {
  border-left:1px solid gray; 
  padding: 0 0 0 1rem;
}

.addrorprogram-desc {
  padding:.5rem; 
  font-size:12px;
}

.addrorprogram-img {
  max-width:100%; 
  max-height:10rem; 
  border-radius:.3rem;
}

.addrorprogram-end {
  font-size:12px; 
  width:1rem; 
  height:1rem; 
  background:#00bcd4; 
  border-radius:50%; 
  color:#fff;
}

.addrorprogram-end-span {
  color:#00bcd4; 
  margin-left:1rem;
}

.teammate-container {
  padding:.5rem; 
  border-bottom:1px dashed #eeeeee;
}

.level {
  margin-top:.2rem;
  font-size:7px; 
  color:#43a047;
}

.leader-flag {
  margin-left:auto; 
  background:#4db6ac; 
  padding:.2rem .3rem; 
  color:#fff; 
  border-radius:.2rem; 
  font-size:12px; 
  margin-right:.5rem;
}

.recruit-condition {
  padding:.3rem 0 .5rem 0; 
  border-bottom:1px dashed #e0e0e0; 
  background:#fff;
}

.reply-input-box { position:fixed; bottom:0; width:100%; padding:.5rem; background:#ffffff; border-top:1px solid #e0e0e0; }
.reply-input-box input { width:100%; border-radius:.3rem; padding:.3rem; background:#f5f5f5; border:0; font-size:12px; }
.reply-input-box-span { margin-left:auto; font-size:18px; margin-right:.3rem; }
.reply-input-box-icon { margin-left:auto; margin-right:.5rem; }

.avatar-male { padding:.1rem; border:1px solid #bbdefb; border-radius:50%; background:white; }
.avatar-female { padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; }
</style>


