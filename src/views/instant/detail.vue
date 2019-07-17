<template>
  <div>
     <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#4caf50">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        TITLE
      </div>

      <mu-menu slot="right" class="mine-menu-box">
        <mu-icon value="menu"></mu-icon>
        <mu-list slot="content" class="mine-menu-list">
          <mu-list-item @click="leaveTeam" v-if="JointeamStmt == 0" button style="border-top:1px solid #fafafa;">
            <mu-list-item-title class="mine-menu-item">退出队伍</mu-list-item-title>
          </mu-list-item>
        </mu-list>
      </mu-menu>
    </mu-appbar>
    <!-- END 头部 -->

    <div style="padding:.5rem;">
      <!-- BEGIN 主评论 -->
      <mu-flex align-items="center">
        <mu-avatar size="26">
          <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2836389094,1674914749&fm=26&gp=0.jpg">
        </mu-avatar>
        <span class="comment-item-nickname">
          这是我的昵称
        </span>
        <span class="comment-item-time" style="margin-right:.6rem;">2分钟前</span>
      </mu-flex>

      <mu-row class="comment-item-text">
        这里是我的内容，来呀，快活呀，反正又大把时光
      </mu-row>

      <mu-row class="comment-item-img">
        <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2458914123,541076108&fm=26&gp=0.jpg" alt="">
      </mu-row>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      JointeamStmt: 0,
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },

    leaveTeam () {

    },

  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
.mine-menu-box { margin-top:1rem; right:.5rem; }
.mine-menu-list { background:#4dd0e1; color:white; padding:0; }
.mine-menu-item { color:#fff; font-size:12px; }

.comment-box { padding:.5rem 1rem; }
.comment-item-nickname { margin-left:.5rem; font-size:12px; color:#4db6ac; }
.comment-item-time { margin-left: auto; margin-right:.3rem; font-size:12px; color:#9e9e9e; }
.comment-item-text { padding:.5rem 0 .5rem 1.5rem; font-size:12px; }
.comment-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
</style>


