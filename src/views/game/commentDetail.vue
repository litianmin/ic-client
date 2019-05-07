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
          <mu-avatar size="20">
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3279320808,3576872714&fm=27&gp=0.jpg">
          </mu-avatar>
          <span class="comment-item-nickname">
            人总需要勇敢生存 (楼主)
          </span>
          <span class="comment-item-time">2019-01-01 02:02:04</span>
        </mu-flex>

        <mu-row class="comment-item-text">
          这里是我的评论内容，如果内容多一点，应该不会有什么问题吧，怎么一生总部可碰到
        </mu-row>

        <mu-row class="comment-item-img">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2990368894,2130556537&fm=27&gp=0.jpg" alt="">
        </mu-row>

        <mu-row justify-content="end" style="padding:.5rem;">
            <mu-flex align-items="center">
              <mu-button icon color="#9e9e9e" small @click="convertThumbup">
                <mu-icon :class="{'had-thumbup':HadThumbUp}" value="thumb_up"></mu-icon>
              </mu-button>
              <span class="comment-item-thumbup-count">100</span>
            </mu-flex>

            <mu-flex align-items="center" style="margin-left:.8rem;">
            <mu-button icon color="#9e9e9e" small>
                <mu-icon value="comment"></mu-icon>
              </mu-button>
              <span class="comment-item-comment-count">200</span>
            </mu-flex>
        </mu-row>
      </mu-container>
      <!-- END 主评论 -->

      <!-- BEGIN 排序条 -->
      <mu-flex class="sort-bar" align-items="center">
        <span>回复列表</span>
        <span @click="convertSort" class="sort-bar-svg"><svg-icon :icon-class="IsSortup == true ? 'sortup' : 'sortdown'"></svg-icon></span>
      </mu-flex>
      <!-- END 排序条 -->

      <!-- BEGIN 回复评论 -->
      <mu-container style=" padding:.5rem .8rem;">
        <mu-flex align-items="center">
          <mu-avatar size="20">
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3279320808,3576872714&fm=27&gp=0.jpg">
          </mu-avatar>
          <span style="font-size:12px; margin-left:.5rem; margin-right:.5rem; color:#4db6ac;">
            人总需要勇敢生存 
          </span>
          <span style="margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem;">2分钟前</span>
        </mu-flex>

        <mu-row style="font-size:12px; padding:.5rem .5rem .5rem 1rem;">
          <span style="font-size:12px; margin-left:.5rem; ">
            @<span style="color:#795548;">人总需要勇敢生存</span> : 其实你就是一个傻逼啦，整天在这里唧唧歪歪
            <span style="font-size:12px; color:green; margin-left:.5rem;">回复</span>
          </span>
        </mu-row>
      </mu-container>

      <mu-container style=" padding:.5rem .8rem;">
        <mu-flex align-items="center">
          <mu-avatar size="20">
            <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3279320808,3576872714&fm=27&gp=0.jpg">
          </mu-avatar>
          <span class="reply-nickname">
            人总需要勇敢生存 
          </span>
          <span class="reply-time">3分钟前</span>
        </mu-flex>

        <mu-row class="reply-cont-box">
          <span style="font-size:12px; margin-left:.5rem; ">
            @<span style="color:#795548;">人总需要勇敢生存</span> : 其实你就是一个傻逼啦，整天在这里唧唧歪歪
            <span style="color:green; margin-left:.5rem;">回复</span>
          </span>
        </mu-row>

        <mu-row class="comment-item-img" style="padding:.5rem .5rem 0 1rem; ">
          <img src="http://img4.imgtn.bdimg.com/it/u=198474340,3584657172&fm=26&gp=0.jpg" alt="">
        </mu-row>
      </mu-container>
      <!-- END 回复评论 -->
    </div>

    <mu-flex class="reply-input-box" align-items="center">
      <div style="width:90%;" @click="replytoComment">
      <input type="text" placeholder="评论一下吧" disabled>
      </div>
      <span @click="convertFocus" class="reply-input-box-span"><svg-icon :icon-class="IsFocus == false ? 'focus' : 'had_focus'"></svg-icon></span>
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
    }
  },
  mounted () {
    let commentID = this.$route.params.commentid
    this.CommentID = commentID
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
.mine-appbar { width: 100%; height:2.5rem; }

.main-comment-container { background:#eeeeee; padding:1rem .5rem 0 .5rem; margin-top:.2rem; border-bottom:1px solid #9e9e9e; }
.sort-bar { background:#eceff1; font-size:12px; padding:.3rem .5rem; margin-top:.3rem; margin-bottom:.5rem; border-top:1px solid #cfd8dc; }
.sort-bar-svg { margin-left:auto; font-size:18px; margin-right:.3rem; }

.reply-nickname { font-size:12px; margin-left:.5rem; margin-right:.5rem; color:#4db6ac; }
.reply-time { margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem; }
.reply-cont-box { font-size:12px; padding:.5rem .5rem .5rem 1rem; }

.reply-input-box { position:fixed; bottom:0; width:100%; padding:.5rem; background:#ffffff; border-top:1px solid #e0e0e0; }
.reply-input-box input { width:100%; border-radius:.3rem; padding:.3rem; background:#f5f5f5; border:0; font-size:12px; }
.reply-input-box-span { margin-left:auto; font-size:18px; margin-right:.3rem; }


.comment-box { padding:.5rem 1rem; }
.comment-item-nickname { margin-left:.5rem; font-size:12px; color:#4db6ac; }
.comment-item-time { margin-left: auto; font-size:12px; color:#9e9e9e; }
.comment-item-text { padding:.5rem 0 .5rem 1.5rem; font-size:12px; }
.comment-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }

.had-thumbup { color:#4db6ac; }
</style>

