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

    <!-- <mu-container style="margin-top:1rem;">
      <mu-flex align-items="center">
        <mu-avatar size="26">
          <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3279320808,3576872714&fm=27&gp=0.jpg" alt="">
        </mu-avatar>
        <span style="margin-left:.5rem; color:#757575; font-size:14px;">人总需要勇敢生存</span>
        <span style="margin-left:.3rem; color:#4caf50; font-size:13px;">(楼主)</span>
        <span style="margin-left:auto; font-size:12px; color:#9e9e9e;">2019-01-01 02:02:04</span>
      </mu-flex>
    </mu-container> -->


    <mu-container style="margin-top:.5rem; background:#f5f5f5; padding:.5rem;">
      <mu-flex align-items="center">
        <mu-avatar size="28">
          <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3279320808,3576872714&fm=27&gp=0.jpg">
        </mu-avatar>
        <span class="comment-item-nickname">
          人总需要勇敢生存
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
            <mu-icon value="thumb_up" size="12" color="#4db6ac"></mu-icon>
            <span class="comment-item-thumbup-count">100</span>
          </mu-flex>

          <mu-flex align-items="center" style="margin-left:.8rem;">
            <mu-icon value="comment" size="12" color="#4db6ac"></mu-icon>
            <span class="comment-item-comment-count">200</span>
          </mu-flex>
      </mu-row>
    </mu-container>

  </div>
</template>

<script>
export default {
  data () {
    return {
      CommentID: 0,
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
  }
}
</script>

<style scoped>
.comment-box { padding:.5rem 1rem; }
.comment-create-btn { width:100%; padding:.5rem; text-align:center; color:white; background:#4dd0e1; border-radius:.3rem; border:0; }
.comment-item-nickname { margin-left:.5rem; font-size:14px; color:#4db6ac; }
.comment-item-time { margin-left: auto; font-size:12px; color:#9e9e9e; }
.comment-item-text { padding:.5rem 0 0 2rem; font-size:12px; color:#616161; }
.comment-item-img { padding:.5rem .5rem 0 2rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
</style>

