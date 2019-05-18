<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#009688">
        <mu-button icon slot="left" @click="goBack">
          <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
        
        <div style="font-size:14px;">
          评论详情
        </div>
    </mu-appbar>
    <!-- END 头部 -->

    <div style="margin-bottom:3rem;">  
      <!-- BEGIN 主评论 -->
      <mu-container class="main-comment-container">
        <mu-flex align-items="center">
          <mu-avatar size="26">
            <img :src="CmtDetailMain.avatar">
          </mu-avatar>
          <span class="comment-item-nickname">
            {{ CmtDetailMain.nickname }} (楼主)
          </span>
          <span class="comment-item-time" style="margin-right:.6rem;">{{ CmtDetailMain.createTime }}</span>
        </mu-flex>

        <mu-row class="comment-item-text">
          {{ CmtDetailMain.c_cont }}
        </mu-row>

        <mu-row v-if="CmtDetailMain.c_img" class="comment-item-img">
          <img :src="CmtDetailMain.c_img" alt="">
        </mu-row>

      </mu-container>
      <!-- END 主评论 -->

      <!-- BEGIN 排序条 -->
      <mu-flex class="sort-bar" justify-content="center" align-items="center" >
        <span style="margin-left:.3rem">回复列表 ({{ CmtDetailMain.replyNum }})</span>
        <span @click="convertSort" class="sort-bar-svg"><svg-icon :icon-class="IsSortup == true ? 'sortup' : 'sortdown'"></svg-icon></span>
      </mu-flex>
      <!-- END 排序条 -->

      <!-- BEGIN 回复评论 -->
      <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">
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

              <span style="color:green; margin-left:.5rem;"  @click="replytoComment(true, item.user_id, item.nickname)">
                回复
              </span>
            </span>
          </mu-row>

          <mu-row v-if="item.c_img" class="comment-item-img" style="padding:.5rem .5rem .5rem 1rem; ">
            <img :src="item.c_img">
          </mu-row>
        </mu-container>

        <mu-row v-show="IsTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; color:#9e9e9e;">
          <span> 没有更多的回复 </span>
        </mu-row>

      </mu-load-more>
      <!-- END 回复评论 -->
    </div>

    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:80%;" @click="replytoComment(false, 0, '')">
      <input type="text" placeholder="评论一下吧" disabled>
      </div>
      <span @click="convertFocus" class="reply-input-box-span"><svg-icon :icon-class="IsFocus == false ? 'focus' : 'had_focus'"></svg-icon></span>
      <span @click="convertThumbup" class="reply-input-box-span" style="font-size:17px;"><svg-icon :icon-class="IsThumbup == false ? 'thumb_up_empty' : 'thumb_up'"></svg-icon></span>
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
  mounted () {
    let commentID = this.$route.params.commentid
    this.CommentID = commentID

    // 页面初始化
    this.$axios.post(`/game/commentDetail/${commentID}`, {}).then((resp)=>{
      let dataBack = resp.data.msg 
      this.IsTheLast = dataBack.isTheLast

      this.CmtDetailMain.userID = dataBack.cmtDetailMain.user_id
      this.CmtDetailMain.c_cont = dataBack.cmtDetailMain.c_cont
      this.CmtDetailMain.c_img = dataBack.cmtDetailMain.c_img
      this.CmtDetailMain.likeNumb = dataBack.cmtDetailMain.like_num
      this.CmtDetailMain.dislikeNum = dataBack.cmtDetailMain.dislike_num
      this.CmtDetailMain.replyNum = dataBack.cmtDetailMain.reply_num
      this.CmtDetailMain.createTime = utils.getDateDiff(dataBack.cmtDetailMain.create_time, false)
      this.CmtDetailMain.nickname = dataBack.cmtDetailMain.nickname
      this.CmtDetailMain.avatar = dataBack.cmtDetailMain.avatar
      this.CmtDetailMain.sex = dataBack.cmtDetailMain.sex

      let replyList = dataBack.replyListInfo
      for(let i = 0; i < replyList.length; i++) {
        replyList[i].create_time = utils.getDateDiff(replyList[i].create_time, false)
      }
      this.ReplyList = replyList
      this.ReplyListPage++

      // 渲染相关状态
      this.IsFocus = dataBack.relativeStmt.collectStmt == 0 ? false : true
      this.IsThumbup = dataBack.relativeStmt.thumbupStmt == 0 ? false : true
    })

  },
  methods: {
    load () {
      this.Loading = true      
      let sortWay = this.IsSortup == false ? 0 : 1
      this.$axios.post(`/game/commentReplyList/${this.ReplyListPage}/${this.CommentID}/${sortWay}`,{}).then((resp)=>{
        let dataBack = resp.data
        this.IsTheLast = dataBack.isTheLast
        let replyList = dataBack.listInfo
        for(let i = 0; i < replyList.length; i++) {
          replyList[i].create_time = utils.getDateDiff(replyList[i].create_time, false)
        }
        this.ReplyList = this.ReplyList.concat(replyList)
        this.ReplyListPage++
        this.Loading = false
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

      // this.IsThumbup = !this.IsThumbup
      // let msg = this.HadThumbUp == true ? '已点赞' : '取消点赞'
      // this.$toast.success(msg)
    },
    convertFocus () { // 收藏
  //   	OperateType uint8  `json:"operate_tp"`
	// ContType    uint8  `json:"cont_tp"`
	// ContID      uint64 `josn:"cont_id"`
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
    convertSort () {
      // 当转换排序顺序的时候，把页数重置，然后，重新加载回复评论
      this.ReplyListPage = 1
      this.ReplyList = []
      this.IsSortup = !this.IsSortup
      this.load()
    },
    replytoComment (isReply, replyID, replyNickname) {
      this.$router.push({path:`/game/replytoComment`, query:{commentID:this.CommentID, isReply:isReply, replyID:replyID, replyNickname:replyNickname}})
    }
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }

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
.comment-item-text { padding:.5rem 0 .5rem 1.5rem; font-size:12px; }
.comment-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }

.had-thumbup { color:#4db6ac; }
</style>

