<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#009688">
        <mu-button icon slot="left" @click="goBack">
          <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
        
        <div style="font-size:14px;">
          创建队伍
        </div>
    </mu-appbar>
    <!-- END 头部 -->

    <mu-container style="margin-top:.5rem;">
      <mu-paper class="paper-container" :z-depth="3">
        <div style="padding:1.5rem;">
          <!-- 队长基本信息(包括图片) -->
          <mu-row style="margin-top:.2rem;" gutter>
            <!-- 左边内容 -->
            <mu-col col="6" style="padding:.5rem 0 0 .5rem;">
              <mu-flex align-items="center" class="team-avatar-flex">
                <mu-avatar size="25">
                  <img src="http://img4.imgtn.bdimg.com/it/u=406799163,4023058385&fm=11&gp=0.jpg" />
                </mu-avatar>
                <span class="team-leader-nickname">风吹裤裆</span>
              </mu-flex>

              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">角色：</span>
                <span class="team-leaderinfo-cont">点击填写</span>
              </div>
              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">游戏名称：</span>
                <span class="team-leaderinfo-cont">点击填写</span>
              </div>
              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">区服：</span>
                <span class="team-leaderinfo-cont">点击填写</span>
              </div>
              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">等级/段位：</span>
                <span class="team-leaderinfo-cont">点击填写</span>
              </div>
              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">招募人数：</span>
                <span class="team-leaderinfo-cont">点击填写</span>
              </div>
              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">队友偏向：</span>
                <span class="team-leaderinfo-cont">点击填写</span>
              </div>
            </mu-col>  

            <!-- 右边图片展示 -->
            <mu-col col="6" justify-content="center" align-items="center">
              <mu-flex justify-content="center" align-items="center" class="team-leaderinfo-img-flex">
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556172407865&di=6171b22f5c8d59e11d35faef8afe7d54&imgtype=0&src=http%3A%2F%2Fimgsa.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D4332c8a0dd54564ee565e43983df9cde%2Fb812c8fcc3cec3fdf66553c6d688d43f8794272d.jpg" />
              </mu-flex>
            </mu-col>
          </mu-row>

          <!-- 招募宣言 -->
          <mu-row style="margin-top:.5rem;" gutter>
            <mu-col col="12" style="font-size:12px;">
              <span style="color:#795548;">招募宣言：</span> 
              <span style="color:#9e9e9e;">来几个好基友一起玩了, 最好是风情万种的男人，潇洒风流的女人。come on!</span>
            </mu-col>
          </mu-row>
        </div>
      </mu-paper>
    </mu-container>


      <!-- <mu-button style="width:33%" color="#00bcd4">卡片模式</mu-button> -->
      <!-- <mu-button style="width:33%;" color="#03a9f4">列表模式</mu-button> -->


    <mu-flex style="position:fixed; width:100%; bottom:0; left:0; padding:0 .1rem; background:#eeeeee;" justify-content="between">
      <mu-button style="width:29%" color="#00bcd4">卡片模式</mu-button>
      <mu-button style="width:70%;" color="success">发起招募</mu-button>
    </mu-flex>

  </div>  
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
.paper-container { border-radius:.5rem; }
.team-header { padding:.5rem 0 .5rem 0; }
.team-avatar-flex { width:90%; margin-left:-.5rem; margin-bottom:.5rem; }
.team-leader-nickname { margin-left:.5rem; font-size:14px; color:#795548; }
.team-leaderinfo-item { font-size:12px; margin-bottom:.3rem; }
.team-leaderinfo-title { color:#795548; }
.team-leaderinfo-cont { color:#9e9e9e; }
.team-leaderinfo-img-flex { width:100%; height:10rem; text-align:center; border-radius:.5rem; margin-top:.5rem; background:rgba(230,230,230,.5); }
.team-leaderinfo-img-flex img { max-width:100%; max-height:10rem; border-radius:.5rem; }
.team-extracont-time { font-size:12px; margin-right:1rem; color:#9e9e9e; }
.team-extracont-operate { font-size:12px; color:#009688; }
.operate-edit-span { font-size:12px; color:green; }
</style>
