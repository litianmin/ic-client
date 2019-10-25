<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-flex style="padding:.6rem .8rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0 0 1px #26c6da;" align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">评论详情</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <div style="margin-bottom:3rem;">  
      <!-- BEGIN 主评论 -->
      <mu-container class="main-comment-container">
        <mu-flex align-items="center">
          <mu-avatar size="35" @click="$router.push(`/usr/usercard/${CmtDetailMain.userID}`)">
            <img :src="CmtDetailMain.avatar | imgPrefixDeal()">
          </mu-avatar>
          <span class="nickname">
            {{ CmtDetailMain.nickname }} (楼主)
          </span>
          <span class="comment-item-time" style="margin-right:.6rem;">{{ CmtDetailMain.createTime | formatTime('{y}/{m}/{d} {h}:{i}') }}</span>

        </mu-flex>

        <mu-row class="comment-item-text">
          {{ CmtDetailMain.c_cont }}
        </mu-row>

        <mu-row v-if="CmtDetailMain.c_img" class="comment-item-img">
          <img :src="CmtDetailMain.c_img | imgPrefixDeal()" alt="">
        </mu-row>

      </mu-container>
      <!-- END 主评论 -->

      <ChatList :TeamType="TeamType" :TeamID="TeamID"></ChatList>

    </div>

    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:90%;" @click="newChat(false, 0, 0, '')">
      <input type="text" placeholder="评论一下吧" disabled>
      </div>
      <!-- <span @click="convertFocus" class="reply-input-box-span"><svg-icon :icon-class="IsFocus == false ? 'focus' : 'had_focus'"></svg-icon></span> -->
      <span @click="convertThumbup" class="reply-input-box-span" style="font-size:17px;"><svg-icon :icon-class="IsThumbup == false ? 'thumb_up_empty' : 'thumb_up'"></svg-icon></span>
    </mu-flex>

  </div>
</template>

<script>
import ChatList from '@/components/ChatList.vue'
import { wxInit } from '@/common/wxInit.js'
import { getNickname } from '@/common/mStore.js'
export default {
  data () {
    return {
      ShareTitle: '', // 分享title
      ShareDesc: '',  // 分享描述
      ShareImgUrl: '',  // 分享图片

      TeamType: 7,
      CommentID: 0,
      TeamID: 0,
      HadThumbUp: false,
      IsFocus: false,
      IsThumbup: false,
      IsSortup: false,
      IsTheLast: true,
      CmtDetailMain: {
        userID: 0,
        c_cont: '',
        c_img: "",
        likeNumb: 0,
        dislikeNum: 0,
        replyNum: 0,
        createTime: "",
        nickname: "",
        avatar: "",
        sex: 1
      },
      ReplyList: [],
      ReplyListPage: 1,
      Loading: false,
    }
  },
  created () {
    this.CommentID = this.$route.params.commentid
    this.TeamID = this.$route.params.commentid
  },
  mounted () {
    wxInit(this, false)
  },
  methods: {
    pageInit () {
      this.$axios.post(`/game/commentDetail/${this.CommentID}`, {}).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }
        let dataBack = resp.data.msg 
        let cmtDetailMain = dataBack.cmtDetailMain
        this.CmtDetailMain.userID = cmtDetailMain.user_id
        this.CmtDetailMain.c_cont = cmtDetailMain.c_cont
        this.CmtDetailMain.c_img = cmtDetailMain.c_img
        this.CmtDetailMain.likeNumb = cmtDetailMain.like_num
        this.CmtDetailMain.dislikeNum = cmtDetailMain.dislike_num
        this.CmtDetailMain.replyNum = cmtDetailMain.reply_num
        this.CmtDetailMain.createTime = cmtDetailMain.create_time
        this.CmtDetailMain.nickname = cmtDetailMain.nickname
        this.CmtDetailMain.avatar = cmtDetailMain.avatar
        this.CmtDetailMain.sex = cmtDetailMain.sex

        // 渲染相关状态
        this.IsFocus = dataBack.relativeStmt.collectStmt == 0 ? false : true
        this.IsThumbup = dataBack.relativeStmt.thumbupStmt == 0 ? false : true

        // 微信分享
        this.ShareTitle = getNickname() + '邀请你指点江山一番！'   // 分享title
        this.ShareDesc = cmtDetailMain.c_cont  // 分享描述
      })
    },
    goBack () {
      this.$router.go(-1)
    },
    convertThumbup () {

      let operateTp = this.IsThumbup == true ? 0 : 1
      let contTp = 1
      let contID = this.CommentID
      this.$axios.post(`/common/thumbupOrNot`,{
        operate_tp: operateTp,
        cont_tp: contTp,
        cont_id: Number(contID)
      }).then((resp)=>{
        if(resp.data.code == 20000) {
          this.IsThumbup = !this.IsThumbup
          let msg = this.IsThumbup == true ? '已点赞' : '取消点赞'
          this.$toast.message(msg)
        } else {
          this.$toast.message('请不要频繁操作')
        }
      })
    },
    convertFocus () { // 收藏
      let operateTp = this.IsFocus == true ? 0 : 1
      let contTp = 1
      let contID = this.CommentID
      this.$axios.post(`/common/collect`,{
        operate_tp: operateTp,
        cont_tp: contTp,
        cont_id: Number(contID)
      }).then((resp)=>{
        if(resp.data.code == 20000) {
          this.IsFocus = !this.IsFocus
          let msg = this.IsFocus == true ? '收藏成功' : '取消收藏'
          this.$toast.message(msg)
        } else {
          this.$toast.message('请不要频繁操作')
        }
      })
    },
    newChat (isReply, replyTo, replyID, replyNickname) {
      this.$router.push({path:`/common/newChat`, query:{teamType:this.TeamType, teamID:this.CommentID, isReply, replyTo, replyID, replyNickname}})
    },
  },
  components: {
    ChatList,
  },
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }

.avatar-male { padding:.1rem; border:1px solid #03a9f4; border-radius:50%; background:white; }
.avatar-female { padding:.1rem; border:1px solid #e91e63; border-radius:50%; background:white; }
.nickname { font-size:14px; margin-left:.5rem; margin-right:.5rem; color:#424242; letter-spacing: 1px; }

.main-comment-container { background:#ffffff; padding:1rem .5rem 1.5rem .5rem;  }
.sort-bar { background:#eeeeee; font-size:12px; padding:.3rem .5rem; margin-bottom:.5rem;  }
.sort-bar-svg { margin-left:auto; font-size:18px; margin-right:.3rem; }

.reply-container { padding:.5rem .8rem; border-bottom:.1rem solid #ffffff; }

.reply-nickname { font-size:12px; margin-left:.5rem; margin-right:.5rem; color:#4db6ac; }
.reply-time { margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem; }
.reply-cont-box { font-size:12px; padding:.5rem .5rem .5rem 1rem; }

.reply-input-box { position:fixed; bottom:0; width:100%; padding:.5rem; background:#ffffff; border-top:1px solid #e0e0e0; }
.reply-input-box input { width:100%; border-radius:.3rem; padding:.3rem; background:#f5f5f5; border:0; font-size:12px; }
.reply-input-box-span { margin-left:auto; font-size:18px; margin-right:.3rem; }


.comment-box { padding:.5rem 1rem; }
.comment-item-nickname { margin-left:.5rem; font-size:12px; color:#4db6ac; }
.comment-item-time { margin-left: auto; margin-right:.3rem; font-size:12px; color:#9e9e9e; }
.comment-item-text { padding:.5rem 0 .5rem 2.5rem; font-size:14px; letter-spacing: 1px; }
.comment-item-img { padding:.5rem .5rem 0 2rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }

.had-thumbup { color:#4db6ac; }
</style>

