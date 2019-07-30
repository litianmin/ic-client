<template>
  <div>
    <mu-flex style="width:100%;">
      <img style="width:100%; height:auto;" :src="DisplayImg" alt="">
    </mu-flex>
    <mu-flex>
      <span style="font-size:16px; font-weight:600; padding:.5rem .8rem;">{{ Title }}</span>
    </mu-flex>
    <mu-flex style="padding: 0 1rem;" align-items="center" justify-content="end">
      <span>--</span>
      <span style="color:#009688; margin-right:.5rem; font-weight:600;">{{ Type == 1 ? '话题' : '美文' }}</span>
      <span style="font-size:12px;">{{ BeginTime }}</span>
    </mu-flex>

    <!-- 文章详情 -->
    <div style="padding:1rem .5rem;" v-html="Cont"></div>

    <!-- 评论 -->
    <!-- BEGIN 排序条 -->
    <mu-flex class="sort-bar" justify-content="center" align-items="center" >
      <span style="margin-left:.3rem">评论列表</span>
      <span @click="convertSort" class="sort-bar-svg"><svg-icon :icon-class="IsSortup == true ? 'sortup' : 'sortdown'"></svg-icon></span>
    </mu-flex>
    <!-- END 排序条 -->

    <!-- BEGIN 回复评论 -->
    <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">
      <mu-container class="reply-container" v-for="(item, index) in ReplyList" :key="index">
        <mu-flex align-items="center">
          <mu-avatar size="24" :class="item.user_sex == 1 ? 'avatar-male' : 'avatar-female'">
            <img :src="item.userAvatar">
          </mu-avatar>
          <span class="reply-nickname">
            {{ item.userNickname }} 
          </span>
          <span class="reply-time">{{ item.createTime }}</span>
        </mu-flex>

        <mu-row class="reply-cont-box">
          <span style="font-size:12px; margin-left:.5rem; ">
            <span v-if="item.replyTo > 0">@<span style="color:#795548;">{{ item.replyNickname }}</span> :</span> {{ item.cont }}
            <span style="color:green; margin-left:.5rem;" @click="newChat(true, item.userID, item.chatID, item.userNickname)">回复</span>
          </span>
        </mu-row>

        <mu-row v-if="item.img" class="team-item-img" style="padding:.5rem .5rem .5rem 1rem; ">
          <img :src="item.img">
        </mu-row>
      </mu-container>
    </mu-load-more>

    <mu-row v-show="IsTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; margin-bottom:3rem; color:#9e9e9e;">
      <span> 没有更多的评论 </span>
    </mu-row>
    <!-- END 回复评论 -->

    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:80%;" @click="newChat(false, 0, 0, '')">
        <input type="text" placeholder="我也来说一句吧" disabled>
      </div>
      <mu-icon value="share" class="reply-input-box-icon" size="18" color="#8A8A8A"></mu-icon>
    </mu-flex>

  </div>  
</template>

<script>
import utils from 'common/utils.js'
export default {
  data () {
    return {
      TeamType: 6,
      TeamID: 0,
      ArticleID: 0,
      Type: 0,
      Title: '',
      DisplayImg: '',
      Cont: '',
      BeginTime: '',

      IsSortup: false,
      IsTheLast: true,
      ReplyListPage: 1,
      ReplyList: [],
      Loading: false,

    }
  },
  mounted () {
    this.ArticleID = this.$route.params.articleID
    this.TeamID = this.ArticleID
    // 去获取文章的详细内容
    this.$axios.get(
      `/article/detail/${this.ArticleID}`, {}
    ).then((resp)=>{
      console.log(resp)
      if(resp.data.code != 20000) {
        this.$toast.message(resp.data.msg)
        this.$router.push('/')
        return
      }

      let msg = resp.data.msg

      // 开始处理数据
      let articleDetail = msg.baseInfo
      this.Title = articleDetail.title
      this.Type = articleDetail.type
      this.DisplayImg = utils.imgPrefixDeal(articleDetail.displayImg)
      this.BeginTime = utils.unixToDate(articleDetail.beginTime)
      this.Cont = articleDetail.cont

      let chatList = msg.chatList
      this.IsTheLast = chatList.length < 15 ? true : false
      let replyList = chatList
      for(let i = 0; i < replyList.length; i++) {
        replyList[i].createTime = utils.getDateDiff(replyList[i].createTime, true)
        replyList[i].userAvatar = utils.imgPrefixDeal(replyList[i].userAvatar)
        replyList[i].img = utils.imgPrefixDeal(replyList[i].img)
      }
      this.ReplyList = replyList
      console.log(this.ReplyList)
      this.ReplyListPage++
    })
  },
  methods: {
    load () {
      this.Loading = true      
      let sortWay = this.IsSortup == false ? 0 : 1
      this.$axios.get(`/common/chatList/${this.TeamType}/${this.TeamID}/${this.ReplyListPage}/${sortWay}`,{}).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }

        let dataBack = resp.data.msg
        this.IsTheLast = dataBack.length < 15 ? true : false
        let replyList = dataBack
        for(let i = 0; i < replyList.length; i++) {
          replyList[i].createTime = utils.getDateDiff(replyList[i].createTime, true)
          replyList[i].userAvatar = utils.imgPrefixDeal(replyList[i].userAvatar)
          replyList[i].img = utils.imgPrefixDeal(replyList[i].img)
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

    newChat (isReply, replyTo, replyID, replyNickname) {
      this.$router.push({path:`/common/newChat`, query:{teamType:this.TeamType, teamID:this.TeamID, isReply, replyTo, replyID, replyNickname}})
    },

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


