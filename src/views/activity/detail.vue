<template>
  <div>
    <mu-flex style="width:100%;">
      <img style="width:100%; height:auto;" :src="TeamBaseInfo.displayImg" alt="">
    </mu-flex>
    <mu-flex>
      <span style="font-size:18px; font-weight:700; padding:.5rem .8rem; letter-spacing:1px;">{{ TeamBaseInfo.title }}</span>
    </mu-flex>

    <mu-flex style="width:100%; font-size:13px; padding:.3rem 1rem 1rem .8rem;" wrap="wrap" justify-content="start">
      <div style="width:100%;"><span style="">于 {{ TeamBaseInfo.beginTime | parseTime('{m}/{d} {h}:{i}') }}</span> </div>
      <mu-flex align-items="center">
        <span>在 <span style="color:#009688; font-weight:700; font-size:12px; text-decoration:underline">{{ TeamBaseInfo.venue.name }}</span> 与你相聚</span>
      </mu-flex>
    </mu-flex>

    <!-- 文章详情 -->
    <div style="padding:0 .8rem .5rem .8rem;" v-html="TeamBaseInfo.cont"></div>

    <!-- <mu-flex style="width:100%; font-size:13px; padding:.5rem 1rem 1rem .5rem;" wrap="wrap" justify-content="end">
      <div style="width:100%; text-align:right;"><span style="">{{ TeamBaseInfo.beginTime | parseTime('{m}/{d} {h}:{i}') }}</span> </div>
      <mu-flex align-items="center">
        <span>在 <span style="color:#009688; font-weight:700; font-size:12px; text-decoration:underline">{{ TeamBaseInfo.venue.name }}</span> 与你相聚</span>
      </mu-flex>
    </mu-flex> -->


    <!-- BEGIN 队长和队友列表 -->
    <mu-flex style="padding: .8rem 1rem .5rem 1rem; background:#fff; border-top:1px solid #eeeeee" justify-content="center" align-items="center" wrap="wrap">
        <mu-avatar v-for="(item, index) in TeammateList" :key="index" size="35" :class="item.sex == 1 ? 'avatar-male' : 'avatar-female'" style="margin-right:.5rem;">
          <img :src="item.avatar | imgPrefixDeal()" alt="">
        </mu-avatar>
        <span v-if="TeamBaseInfo.recruitStatus == 0" @click="joinTeam">
          <svg-icon icon-class="add_circle_outline" style="font-size:40px; color:red;"></svg-icon>
        </span>
    </mu-flex>
    <mu-flex justify-content="center" style="padding:.3rem 0 .5rem 0; background:#fff;">
      <span style="font-size:12px; color:#9e9e9e;">-- 招募{{ TeamBaseInfo.recruitNumb }}人，还差{{ TeamBaseInfo.recruitNumb - TeamBaseInfo.hadRecruitNumb }}人 --</span>
    </mu-flex>
    <!-- END 队长和队友列表 -->

    <ChatList :TeamType="TeamType" :TeamID="TeamID"></ChatList>

    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:78%;" @click="newChat(false, 0, 0, '')">
        <input type="text" placeholder="我也来说一句吧" disabled>
      </div>

      <span  @click="joinTeam" style="font-size:18px; margin-left:auto;">
        <svg-icon :icon-class="JoinStatusSvg"></svg-icon>
      </span>


      <svg-icon icon-class="share" style="font-size:18px; margin-left:.8rem; margin-right:.6rem;"></svg-icon>
    </mu-flex>

  </div>  
</template>

<script>
import ChatList from '@/components/ChatList.vue'
import { wxInit } from '@/common/wxInit.js'
export default {
  data () {
    return {
      TeamType: 5,
      TeamID: 0,

      TeamBaseInfo: {
        id: '',
        title: "最新的活动标题",
        type: 1,
        displayImg: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2595508360,28762262&fm=26&gp=0.jpg",
        venue: {
          name: "万利商务中心",
          lng: 113.186702,
          lat: 23.035872,
          addr: "夏平西路石龙北路路口附近"
        },
        beginTime: 1562083200,
        endTime: 1564156800,
        recruitNumb: 5,
        hadRecruitNumb: 0,
        recruitStatus: 0, // 0 => 招募中， 1 => 停止招募， 2 => 队伍已删除
        cont: "<p>这里是我完整的内容</p>"
      },
      TeammateList: [
        {
          user_id: 2,
          nickname: "朝花夕誓",
          avatar: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3293964636,877003056&fm=27&gp=0.jpg",
          sex: 2,
          jointime: 0
        }
      ],

      JoinStatus: 0, // 0 => 未加入， 1 => 加入

      IsSortup: false,
      IsTheLast: true,
      ReplyListPage: 1,
      ReplyList: [],
      Loading: false,

      JoinStatusSvg: 'jointeam',

    }
  },
  created () {
    this.TeamID = this.$route.params.activityID
  },
  mounted () {
    wxInit(this)
    // if(!utils.isWxBrowser()) { // 判断是否为微信浏览器
    //   this.pageInit()
    // } else {
    //   // 先判断地理位置是否需要更新了
    //   if( utils.isNeedRefreshLocation() == false ) { // 如果不需要刷新，直接请求数据了
    //     this.pageInit()
    //   }

    //   let _that = this
    //   let params = {
    //     url: location.href
    //   }
    //   this.$axios.post('/user/wxConfigInit', params).then((configInfo) => {
    //     let info = configInfo.data.msg
    //     wx.config({
    //         debug: false,
    //         appId: info.appID,
    //         nonceStr: info.nonceStr,
    //         timestamp: info.timeStamp,
    //         url: location.href,
    //         signature: info.signature,
    //         jsApiList: ['checkJsApi', 'openLocation', 'getLocation', 'onMenuShareAppMessage', 'onMenuShareTimeline']
    //     })
        
    //     wx.ready(() => {
    //       if( utils.isNeedRefreshLocation() ) {
    //         wx.getLocation({
    //           success: function (resp) {
    //             let lat = resp.latitude
    //             let lng = resp.longitude

    //             _that.$axios.get(`https://restapi.amap.com/v3/geocode/regeo?&location=${lng},${lat}&key=2d617a69e7365b889469daf971c3eb71`, {}).then((resp2) => {
    //               if(resp2.data.status == '1') {
    //                 let locateAddr = resp2.data.regeocode.addressComponent.district
    //                 let payload = {
    //                   lng,
    //                   lat,
    //                   district: locateAddr  
    //                 }
    //                 _that.$store.commit('mdeUserInfo/locationUpdate', payload)
    //                 _that.pageInit()
    //               }
    //             })

    //           }, 
    //           error: function (resp) {
    //             console.log(resp)
    //           }
    //         })
    //       }

    //       // 分享给朋友
    //       wx.onMenuShareAppMessage({
    //         title: '一起来组队，走近你我！', // 分享标题
    //         desc: _that.selfNickname + '为您推荐一个交友组队平台！玩游戏没人？来这里。想出去走走？来这里。', // 分享描述
    //         link: document.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //         imgUrl: 'https://www.icoming.top/image/logo/zhuzhu-logo.png', // 分享图标
    //         type: 'link', // 分享类型,music、video或link，不填默认为link
    //         dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    //         success: function () {
    //         // 用户点击了分享后执行的回调函数
    //         // console.log('初始化成功')
    //         }
    //       })


    //       wx.onMenuShareTimeline({
    //           title: '一起来组队，走近你我！',  // 分享标题
    //           desc: _that.selfNickname + '为您推荐一个交友组队平台！玩游戏没人？来这里。想出去走走？来这里。',
    //           link: 'document.href', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //           imgUrl: 'https://www.icoming.top/image/logo/zhuzhu-logo.png', // 分享图标
    //           success: function () {
    //           // 用户点击了分享后执行的回调函数
    //           }
    //       })

    //     })
        
    //   })
    // }

  },
  methods: {

    pageInit () {
      this.$axios.get(`/activity/detail/${this.TeamID}`, {}).then((resp)=>{
        let dataBack = resp.data.msg

        if(resp.data.code != 20000) {
          this.$toast.message(dataBack)
          if(resp.data.code == 40301) {
            this.$router.push('/')
          }
        }

        // 现在开始处理数据
        let baseInfo = dataBack.baseInfo
        baseInfo.hadRecruitNumb = dataBack.teammateList.length
        this.TeamBaseInfo = baseInfo
        this.TeammateList = dataBack.teammateList

        // 判断赋值 JoinStatusSvg , 首先判断队伍的招募状态，再去判断个人的加入状态
        switch(baseInfo.recruitStatus) {
          case 0: // 招募中
            this.JoinStatusSvg = dataBack.joinStatus == 0 ? 'jointeam' : 'hadjointeam'
            break
          case 1: // 停止招募, 拒绝加入
            this.JoinStatusSvg = 'jointeam_refuse'
            break
          case 2: // 已删除
            this.$toast.message('该活动已删除')
            this.$router.push('/')
            break
        }

        this.JoinStatus = dataBack.joinStatus // 自己加入的状态
      })
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

    newChat (isReply, replyTo, replyID, replyNickname) {
      // 只有加入组队的人才能进行评论
      if(this.JoinStatus != 3) {
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


