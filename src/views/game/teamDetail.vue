<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#009688">
        <mu-button icon slot="left" @click="goBack">
          <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
        
        <div style="font-size:14px;">
          队伍聊天中 。。。
        </div>

        <!-- <mu-icon slot="right" value="menu" style="margin-right:.5rem;"></mu-icon> -->
        <mu-menu slot="right" style="margin-top:1rem; right:.5rem;">
          <mu-icon value="menu"></mu-icon>
          <mu-list slot="content" style="background:#26a69a; color:white; padding:0;">
            <mu-list-item button>
              <mu-list-item-title style="color:#fff; font-size:12px;">队友列表</mu-list-item-title>
            </mu-list-item>
            <mu-list-item button style="border-top:1px solid #fafafa;">
              <mu-list-item-title style="color:#fff; font-size:12px;">退出队伍</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-menu>
    </mu-appbar>
    <!-- END 头部 -->

    <div style="margin-bottom:3rem;">  
      <!-- BEGIN 主评论 -->
      <mu-container class="main-team-container">
        <mu-flex align-items="center">
          <mu-avatar size="26">
            <img :src="CmtDetailMain.avatar">
          </mu-avatar>
          <span class="team-item-nickname">
            风吹裤裆毛飞扬 <span style="margin-left:1rem; font-size:12px; color:#795548;;">( 队长 · 阿萨卡 )</span>
          </span>
          <span class="reply-time">10小时前</span>
        </mu-flex>

        <mu-row class="team-item-text">
          {{ CmtDetailMain.c_cont }}
        </mu-row>

        <mu-row v-if="CmtDetailMain.c_img" class="team-item-img">
          <img :src="CmtDetailMain.c_img" alt="">
        </mu-row>
      </mu-container>
      <!-- END 主评论 -->

      <!-- BEGIN 排序条 -->
      <mu-flex class="sort-bar" justify-content="center" align-items="center" >
        <span style="margin-left:.3rem">聊天列表</span>
        <span @click="convertSort" class="sort-bar-svg"><svg-icon :icon-class="IsSortup == true ? 'sortup' : 'sortdown'"></svg-icon></span>
      </mu-flex>
      <!-- END 排序条 -->

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
            <span style="color:green; margin-left:.5rem;">回复</span>
          </span>
        </mu-row>

        <mu-row v-if="item.c_img" class="team-item-img" style="padding:.5rem .5rem .5rem 1rem; ">
          <img :src="item.c_img">
        </mu-row>
      </mu-container>
      <!-- END 回复评论 -->
    </div>

    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:90%;" @click="replytoComment">
        <input type="text" placeholder="我也来说一句吧" disabled>
      </div>
      <mu-icon value="share" style="margin-left:auto; margin-right:.5rem;" size="18" color="#8A8A8A"></mu-icon>
    </mu-flex>

  </div>
</template>

<script>
import utils from 'common/utils.js'
export default {
  data () {
    return {
      CommentID: 0,
      HadThumbUp: false,
      IsFocus: false,
      IsSortup: true,
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
    }
  },
  mounted () {
    let commentID = 1
    this.CommentID = commentID

    // 页面初始化
    this.$axios.post(`/game/commentDetail/${commentID}`, {}).then((resp)=>{
      let dataBack = resp.data.msg 
      this.IsTheLast = dataBack.isTheLast
      this.CmtDetailMain = dataBack.cmtDetailMain

      this.CmtDetailMain.userID = dataBack.cmtDetailMain.user_id
      this.CmtDetailMain.c_cont = dataBack.cmtDetailMain.c_cont
      this.CmtDetailMain.c_img = dataBack.cmtDetailMain.c_img
      this.CmtDetailMain.likeNumb = dataBack.cmtDetailMain.like_num
      this.CmtDetailMain.dislikeNum = dataBack.cmtDetailMain.dislike_num
      this.CmtDetailMain.replyNum = dataBack.cmtDetailMain.reply_num
      this.CmtDetailMain.createTime = dataBack.cmtDetailMain.create_time
      this.CmtDetailMain.nickname = dataBack.cmtDetailMain.nickname
      this.CmtDetailMain.avatar = dataBack.cmtDetailMain.avatar
      this.CmtDetailMain.sex = dataBack.cmtDetailMain.sex

      let replyList = dataBack.replyListInfo
      for(let i = 0; i < replyList.length; i++) {
        replyList[i].create_time = utils.getDateDiff(replyList[i].create_time, false)
      }
      this.ReplyList = replyList
      this.ReplyListPage++
      // console.log(this.ReplyList)
    })

  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    convertThumbup () {
      this.HadThumbUp = !this.HadThumbUp
      let msg = this.HadThumbUp == true ? '已点赞' : '取消点赞'
      this.$toast.success(msg)
    },
    convertFocus () {
      this.IsFocus = !this.IsFocus
    },
    convertSort () {
      this.IsSortup = !this.IsSortup
    },
    replytoComment () {
      this.$router.push(`/game/replytoComment/${this.CommentID}/0`)
    }
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; position:flex; }

.main-team-container { background:#ffffff; padding:1rem .5rem 2rem 1rem;  }
.sort-bar { background:#eeeeee; font-size:12px; padding:.3rem .5rem; margin-bottom:.5rem;  }
.sort-bar-svg { margin-left:auto; font-size:18px; margin-right:.3rem; }

.reply-container { padding:.5rem .8rem; border-bottom:.1rem solid #ffffff; }

.reply-nickname { font-size:12px; margin-left:.5rem; margin-right:.5rem; color:#4db6ac; }
.reply-time { margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem; }
.reply-cont-box { font-size:12px; padding:.5rem .5rem .5rem 1rem; }

.reply-input-box { position:fixed; bottom:0; width:100%; padding:.5rem; background:#ffffff; border-top:1px solid #e0e0e0; }
.reply-input-box input { width:100%; border-radius:.3rem; padding:.3rem; background:#f5f5f5; border:0; font-size:12px; }
.reply-input-box-span { margin-left:auto; font-size:18px; margin-right:.3rem; }

.team-item-nickname { margin-left:.5rem; font-size:13px; font-weight:600; color:#4db6ac; }
.team-item-text { padding:.5rem 0 .5rem 1.5rem; font-size:12px; }
.team-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.team-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }

</style>
