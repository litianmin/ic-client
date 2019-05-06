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
    <mu-container style="background:#eeeeee; padding:.5rem; margin-bottom:.5rem;">
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
        这里是我的评论内容
      </mu-row>

      <mu-row class="comment-item-img">
        <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2990368894,2130556537&fm=27&gp=0.jpg" alt="">
      </mu-row>

      <mu-row justify-content="end" style="padding:.5rem;">
          <mu-flex align-items="center">
            <!-- <mu-icon value="thumb_up" size="12" color="#4db6ac"></mu-icon> -->
            <mu-button icon color="#9e9e9e" small @click="convertThumbup">
              <mu-icon :class="{'had-thumbup':HadThumbUp}" value="thumb_up"></mu-icon>
            </mu-button>
            <span class="comment-item-thumbup-count">100</span>
          </mu-flex>

          <mu-flex align-items="center" style="margin-left:.8rem;">
            <!-- <mu-icon value="comment" size="12" color="#4db6ac"></mu-icon> -->
           <mu-button icon color="#9e9e9e" small>
              <mu-icon value="comment"></mu-icon>
            </mu-button>
            <span class="comment-item-comment-count">200</span>
          </mu-flex>
      </mu-row>
    </mu-container>
    <!-- END 主评论 -->

    <!-- BEGIN 回复评论 -->
    <mu-container style="margin-top:.3rem; padding:.5rem; background:#f5f5f5;">
      <mu-flex align-items="center">
        <mu-avatar size="20">
          <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3279320808,3576872714&fm=27&gp=0.jpg">
        </mu-avatar>
        <span style="font-size:12px; margin-left:.5rem; margin-right:.5rem; color:#4db6ac;">
          人总需要勇敢生存 
        </span>
      </mu-flex>

      <mu-row style="font-size:12px; padding:.5rem .5rem .5rem 1rem;">
        <span style="font-size:12px; margin-left:.5rem; ">
          @<span style="color:#795548;">人总需要勇敢生存</span> : 其实你就是一个傻逼啦，整天在这里唧唧歪歪
        </span>
      </mu-row>
    </mu-container>

    <mu-container style="margin-top:.3rem; padding:.5rem; background:#f5f5f5;">
      <mu-flex align-items="center">
        <mu-avatar size="20">
          <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3279320808,3576872714&fm=27&gp=0.jpg">
        </mu-avatar>
        <span style="font-size:12px; margin-left:.5rem; margin-right:.5rem; color:#4db6ac;">
          人总需要勇敢生存 
        </span>
      </mu-flex>

      <mu-row style="font-size:12px; padding:.5rem .5rem .5rem 1rem;">
        <span style="font-size:12px; margin-left:.5rem; ">
          @<span style="color:#795548;">人总需要勇敢生存</span> : 其实你就是一个傻逼啦，整天在这里唧唧歪歪
        </span>
      </mu-row>

      <mu-row class="comment-item-img" style="padding:.5rem .5rem 0 1rem; ">
        <img src="http://img4.imgtn.bdimg.com/it/u=198474340,3584657172&fm=26&gp=0.jpg" alt="">
      </mu-row>
    </mu-container>
    <!-- END 回复评论 -->
    </div>

    <mu-flex style="position:fixed; bottom:0; width:100%; padding:.5rem; background:#ffffff; border-top:1px solid #e0e0e0;" align-items="center">
      <input type="text" style="width:90%; border-radius:.3rem; padding:.3rem; background:#f5f5f5; border:0; font-size:12px;" placeholder="评论一下吧">
      <span @click="convertFocus"><svg-icon :icon-class="IsFocus == false ? 'focus' : 'had_focus'" style="font-size:18px; margin-left:.5rem;"></svg-icon></span>
    </mu-flex>

  </div>
</template>

<script>
export default {
  data () {
    return {
      CommentID: 0,
      HadThumbUp: false,
      IsFocus: false
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
    }
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
.comment-box { padding:.5rem 1rem; }
.comment-create-btn { width:100%; padding:.5rem; text-align:center; color:white; background:#4dd0e1; border-radius:.3rem; border:0; }
.comment-item-nickname { margin-left:.5rem; font-size:12px; color:#4db6ac; }
.comment-item-time { margin-left: auto; font-size:12px; color:#9e9e9e; }
.comment-item-text { padding:.5rem 0 0 1rem; font-size:12px; color:#616161; }
.comment-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }

.had-thumbup { color:#4db6ac; }
</style>

