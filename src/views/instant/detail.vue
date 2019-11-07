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
        <span  @click="ExpandBox = true">
          <svg-icon icon-class="more-white" style="font-size:20px;"></svg-icon>
        </span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <!-- 队伍基本信息 -->
    <div style="padding:.5rem; margin-top:2.5rem;">
      <mu-flex align-items="center">
        <mu-avatar size="28" @click="$router.push(`/usr/usercard/${TeamBaseInfo.captainID}`)">
          <img :src="TeamBaseInfo.captainAvatar | imgPrefixDeal()">
        </mu-avatar>
        <span class="comment-item-nickname">
          {{ TeamBaseInfo.captainNickname }}
        </span>
        <span class="comment-item-time" style="margin-right:.6rem;">{{ TeamBaseInfo.createTime | formatTime('{y}/{m}/{d} {h}:{i}') }}</span>
      </mu-flex>

      <mu-row class="comment-item-text">
        {{ TeamBaseInfo.cont }}
      </mu-row>

      <mu-row class="comment-item-img">
        <img :src="TeamBaseInfo.displayImg | imgPrefixDeal()" alt="">
      </mu-row>

      <mu-row style="padding:1rem .5rem;" >
        <mu-icon value="person_pin_circle" color="#4caf50" size="20"></mu-icon>
        <span style="font-size:12px; color:#9e9e9e;">地点：
          <span
          @click="openLocation" 
          style="letter-spacing: 1px; color:#009688; font-weight:700; font-size:12px; text-decoration:underline">{{ TeamBaseInfo.site.name }}</span>
           · 距离你{{ TeamBaseInfo.distance | distanceFormat() }}</span>
      </mu-row>
    </div>

    <!-- BEGIN 队长和队友列表 -->
    <mu-flex style="padding:.5rem 1rem; background:#fff;" justify-content="center" align-items="center" wrap="wrap">
        <mu-avatar 
          v-for="(item, index) in TeammateList" 
          :key="index" 
          @click="$router.push(`/usr/usercard/${item.user_id}`)"
          size="35" 
          :class="item.sex == 1 ? 'avatar-male' : 'avatar-female'" 
          style="margin-right:.5rem;">
          <img :src="item.avatar | imgPrefixDeal()" alt="">
        </mu-avatar>
        <span v-if="TeamBaseInfo.recruitStatus == 0" @click="joinTeam">
          <svg-icon icon-class="add_circle_outline" style="font-size:40px; color:red;"></svg-icon>
        </span>
    </mu-flex>
    <mu-flex justify-content="center" style="padding:.3rem 0 .5rem 0; border-bottom:1px dashed #e0e0e0; background:#fff;">
      <span style="font-size:12px; color:#9e9e9e;">-- 已招募{{ TeammateList.length }}人 --</span>
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
      <span v-if="JointeamStmt == 3" @click="inviteFriend" style="font-size:19px; margin-left:auto;">
        <svg-icon icon-class="team-invite"></svg-icon>
      </span>

      <span v-if="JointeamStmt == 0 || JointeamStmt == 4" @click="joinTeam" style="font-size:20px; margin-left:auto;">
        <svg-icon icon-class="jointeam"></svg-icon>
      </span>
      <mu-icon @click="$refs.shareGuide.show()" value="share" class="reply-input-box-icon" size="18" color="#8A8A8A"></mu-icon>
    </mu-flex>

    <!-- 底部弹出框 -->
    <mu-bottom-sheet :open.sync="ExpandBox" :lock-scroll="true">
      <mu-list @item-click="ExpandBox = false">
        <mu-list-item button v-if="JointeamStmt == 3" @click="leaveTeam">
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
import ChatList from '@/components/ChatList.vue'
import { wxInit } from '@/common/wxInit.js'
import { getNickname } from '@/common/mStore.js'
import wx from 'weixin-js-sdk'
import WxShareGuide from '@/components/WxShareGuide.vue'
export default {
  components: {
    ChatList,
    WxShareGuide,
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
          this.$toast.message(resp.data.msg)
          return
        }

        // 处理队伍基本信息
        let dataBack = resp.data.msg
        this.TeamBaseInfo = dataBack.teamBaseInfo
        // 处理对哟基本信息
        this.TeammateList = dataBack.teammateList
        this.JointeamStmt = dataBack.joinStmt
        this.IsCaptain = dataBack.isCaptain

        this.ShareTitle = `${getNickname()}：我在这里等你！`   // 分享title
        this.ShareDesc = this.TeamBaseInfo.cont  // 分享描述
        this.InitLoading = false
      })
    },

    inviteFriend () { // 邀请好友
      // 先判断该队伍是否在招募中
      if (this.TeamBaseInfo.recruitStatus != 0) {
        this.$toast.info('队伍已停止招募，不能邀请好友')
        return
      }

      this.$router.push(`/usr/inviteFriend/${this.TeamID}/${this.TeamType}`)
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


