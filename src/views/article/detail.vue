<template>
  <div>

    <mu-flex>
      <span style="font-size:18px; font-weight:700; padding:1rem .8rem .5rem .8rem; letter-spacing:1px;">{{ BaseInfo.title }}</span>
    </mu-flex>


    <span style="font-size:12px; margin-left:.8rem; color:#9e9e9e">发布于 {{ BaseInfo.beginTime | parseTime('{y}/{m}/{d}') }}  </span>

    <span style="font-size:12px; color:#009688; margin-right:.5rem; font-weight:600; letter-spacing:1px;"> · {{ BaseInfo.type == 1 ? '话题' : '美文' }}</span>

    <!-- 文章详情 -->
    <div style="padding:.5rem .8rem;" v-html="BaseInfo.cont"></div>

    <ChatList :TeamType="TeamType" :TeamID="TeamID"></ChatList>

    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:80%;" @click="newChat(false, 0, 0, '')">
        <input type="text" placeholder="我也来说一句吧" disabled>
      </div>
      
      <mu-icon value="share" class="reply-input-box-icon" size="18" color="#8A8A8A"></mu-icon>
    </mu-flex>

  </div>  
</template>

<script>
import ChatList from '@/components/ChatList.vue'
import { wxInit } from '@/common/wxInit.js'
export default {
  data () {
    return {
      ShareTitle: '测试分享标题', // 分享title
      ShareDesc: '测试分享描述',  // 分享描述
      ShareImgUrl: '',  // 分享图片

      TeamType: 6,
      TeamID: 0,
      ArticleID: 0,
      BaseInfo: {
        title: "",
        type: 1,
        displayImg: "",
        beginTime: 0,
        cont: ''
      },
      IsSortup: false,
      IsTheLast: true,
      ReplyListPage: 1,
      ReplyList: [],
      Loading: false,
    }
  },
  created () {
    this.ArticleID = this.$route.params.articleID
    this.TeamID = this.ArticleID
  },
  mounted () {
    wxInit(this, true)
  },
  
  methods: {
    pageInit () {
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
        this.BaseInfo = resp.data.msg.baseInfo
        // 开始处理数据
        this.ShareTitle = this.BaseInfo.type == 1 ? '助助社交，精彩话题等你来聊！' : '助助社交，精彩美文分享予你！'    // 分享title
        this.ShareDesc = this.BaseInfo.title  // 分享描述
      })
    },

    newChat (isReply, replyTo, replyID, replyNickname) {
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


