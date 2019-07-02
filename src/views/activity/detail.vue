<template>
  <div>
    <mu-flex style="width:100%;">
      <img style="width:100%; height:auto;" :src="DisplayImg" alt="">
    </mu-flex>
    <mu-flex>
      <span style="font-size:18px; font-weight:700; padding:.5rem .8rem;">{{ Title }}</span>
    </mu-flex>

    <!-- 文章详情 -->
    <mu-flex style="padding:.2rem 1rem;" v-html="Cont"></mu-flex>

    <mu-flex style="width:100%; font-size:13px; padding:.5rem .5rem 1rem .5rem;" wrap="wrap" justify-content="end">
      <div style="width:100%; text-align:right;">-- 于 <span style="">2019/02/03</span> </div>
      <mu-flex align-items="center">
        <span>在</span> 
        <mu-icon value="person_pin_circle" size="20" color="#009688"></mu-icon>
        <span> <span style="color:#009688; font-weight:700; font-size:12px;">艾萨拉广场</span> 与你相聚</span>
      </mu-flex>
    </mu-flex>


    <!-- BEGIN 队长和队友列表 -->
    <mu-flex style="padding:.5rem 1rem; background:#fff;" justify-content="center" align-items="center" wrap="wrap">
        <mu-avatar v-for="(item, index) in TeammateList" :key="index" size="35" :class="item.sex == 1 ? 'avatar-male' : 'avatar-female'" style="margin-right:.5rem;">
          <img :src="item.avatar" alt="">
        </mu-avatar>
        <span v-if="TeamBaseInfo.recruitStatus == 0" @click="joinTeam">
          <svg-icon icon-class="add_circle_outline" style="font-size:40px; color:red;"></svg-icon>
        </span>
    </mu-flex>
    <mu-flex justify-content="center" style="padding:.3rem 0 .5rem 0; border-bottom:1px dashed #e0e0e0; background:#fff;">
      <span style="font-size:12px; color:#9e9e9e;">-- 招募{{ TeamBaseInfo.recruitNumb }}人，还差{{ TeamBaseInfo.recruitNumb - TeamBaseInfo.hadRecruitNumb }}人 --</span>
    </mu-flex>
    <!-- END 队长和队友列表 -->


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
            <img :src="item.user_avatar">
          </mu-avatar>
          <span class="reply-nickname">
            {{ item.user_nickname }} 
          </span>
          <span class="reply-time">{{ item.create_time }}</span>
        </mu-flex>

        <mu-row class="reply-cont-box">
          <span style="font-size:12px; margin-left:.5rem; ">
            <span v-if="item.reply_to > 0">@<span style="color:#795548;">{{ item.reply_nickname }}</span> :</span> {{ item.chat_cont }}
            <span style="color:green; margin-left:.5rem;" @click="newChat(true, item.user_id, item.user_nickname)">回复</span>
          </span>
        </mu-row>

        <mu-row v-if="item.chat_img" class="team-item-img" style="padding:.5rem .5rem .5rem 1rem; ">
          <img :src="item.chat_img">
        </mu-row>
      </mu-container>
    </mu-load-more>

    <mu-row v-show="IsTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; margin-bottom:3rem; color:#9e9e9e;">
      <span> 没有更多的评论 </span>
    </mu-row>
    <!-- END 回复评论 -->

    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:80%;" @click="newChat(false, 0, '')">
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
      ArticleID: 0,
      Type: 0,
      Title: '这里是我的标题',
      DisplayImg: 'http://img2.imgtn.bdimg.com/it/u=822066738,2758317140&fm=26&gp=0.jpg',
      Cont: '<p>没错，这里就是我想要展示的内容</p>',
      BeginTime: '',

      IsSortup: false,
      IsTheLast: true,
      ReplyListPage: 1,
      ReplyList: [],
      Loading: false,


      TeammateList: [],

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
        recruitStatus: 0, // 0=>组队中， 1=>停止招募(招募成功或者已过期), 2=>已解散(只有组队中才能解散，停止招募后不能解散)
      },

    }
  },
  mounted () {
    this.ArticleID = this.$route.params.articleID

    // 去获取文章的详细内容
    // this.$axios.get(
    //   `/article/detail/${this.ArticleID}`, {}
    // ).then((resp)=>{
    //   console.log(resp)
    //   if(resp.data.code != 20000) {
    //     this.$toast.message(resp.data.msg)
    //     this.$router.push('/')
    //     return
    //   }

    //   let msg = resp.data.msg

    //   // 开始处理数据
    //   let articleDetail = msg.articleDetail
    //   this.Title = articleDetail.title
    //   this.Type = articleDetail.type
    //   this.DisplayImg = utils.imgPrefixDeal(articleDetail.displayImg)
    //   this.BeginTime = utils.unixToDate(articleDetail.beginTime)
    //   this.Cont = articleDetail.cont

    //   this.IsTheLast = msg.isTheLast

    //   for(let i = 0; i < msg.chatList.length; i++) {
    //     msg.chatList[i].create_time = utils.getDateDiff(msg.chatList[i].create_time, true)
    //     msg.chatList[i].user_avatar = utils.imgPrefixDeal(msg.chatList[i].user_avatar)
    //     msg.chatList[i].chat_img = utils.imgPrefixDeal(msg.chatList[i].chat_img)
    //   }
    //   this.ReplyList = msg.chatList
    //   this.ReplyListPage++
    // })
  },
  methods: {
    load () {
      this.Loading = true      
      let sortWay = this.IsSortup == false ? 0 : 1

      this.$axios.get(`/article/chatList/${this.ReplyListPage}/${this.ArticleID}/${sortWay}`,{}).then((resp)=>{
        let dataBack = resp.data.msg
        console.log(dataBack)
        this.IsTheLast = dataBack.isTheLast
        let replyList = dataBack.listInfo
        for(let i = 0; i < replyList.length; i++) {
          replyList[i].create_time = utils.getDateDiff(replyList[i].create_time, true)
          replyList[i].user_avatar = utils.imgPrefixDeal(replyList[i].user_avatar)
          replyList[i].chat_img = utils.imgPrefixDeal(replyList[i].chat_img)
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

    newChat (isReply, replyID, replyNickname) {
      this.$router.push({path:`/article/newChat`, query:{articleID:this.ArticleID, isReply:isReply, replyID:replyID, replyNickname:replyNickname}})
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


