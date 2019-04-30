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

    <!-- BEGIN 填写内容 -->
    <mu-container style="padding:.5rem;">

      <mu-row>
        <mu-flex style="width:25%; height:2rem; background:#00bcd4; color:#fff; font-size:12px; border-top-left-radius:.3rem;  border-bottom-left-radius:.3rem;" align-items="center" justify-content="center">
          <span>角 色</span>
        </mu-flex>

        <mu-flex style="width:75%; height:2rem; background:yellow; font-size:12px;">
          <input type="text" placeholder="角色，例如：貂蝉" style="width:100%; height:100%; padding: 0 0 0 .5rem;">
        </mu-flex>
      </mu-row>

      <mu-row style="margin-top:.5rem;">
        <mu-flex style="width:25%; height:2rem; background:#00bcd4; color:#fff; font-size:12px; border-top-left-radius:.3rem;  border-bottom-left-radius:.3rem;" align-items="center" justify-content="center">
          <span>昵 称</span>
        </mu-flex>

        <mu-flex style="width:75%; height:2rem; background:yellow; font-size:12px;">
          <input type="text" placeholder="游戏中的昵称" style="width:100%; height:100%; padding: 0 0 0 .5rem;">
        </mu-flex>
      </mu-row>

      <mu-row style="margin-top:.5rem;">
        <mu-flex style="width:25%; height:2rem; background:#00bcd4; color:#fff; font-size:12px; border-top-left-radius:.3rem;  border-bottom-left-radius:.3rem;" align-items="center" justify-content="center">
          <span>区 服</span>
        </mu-flex>

        <mu-flex style="width:75%; height:2rem; background:yellow; font-size:12px;">
          <input type="text" placeholder="游戏角色所在区服" style="width:100%; height:100%; padding: 0 0 0 .5rem;">
        </mu-flex>
      </mu-row>

      <mu-row style="margin-top:.5rem;">
        <mu-flex style="width:25%; height:2rem; background:#00bcd4; color:#fff; font-size:12px; border-top-left-radius:.3rem;  border-bottom-left-radius:.3rem;" align-items="center" justify-content="center">
          <span>等级/段位</span>
        </mu-flex>

        <mu-flex style="width:75%; height:2rem; background:yellow; font-size:12px;">
          <input type="text" placeholder="游戏角色的等级或者段位" style="width:100%; height:100%; padding: 0 0 0 .5rem;">
        </mu-flex>
      </mu-row>

      <mu-row style="margin-top:2rem;">
        <mu-flex style="height:2rem; font-size:12px; color:#00bcd4; border-top-left-radius:.3rem;  border-bottom-left-radius:.3rem; padding:0 .5rem;" align-items="center" justify-content="center">
          <span>招募人数:(已选 {{ teamInfo.recruitNumb }} 人)</span>
        </mu-flex>
      </mu-row>

      <mu-row style="margin-top:.5rem;">
        <mu-flex style="width:100%; height:2rem; font-size:12px; padding: 0 .5rem 0 1rem;">
          <mu-slider class="demo-slider" track-color="green" v-model="teamInfo.recruitNumb" max="10" step="1" color="#00bcd4"></mu-slider>
        </mu-flex>
      </mu-row>

      <!-- <mu-text-field label="游戏中昵称" full-width label-float ></mu-text-field><br/> -->
    </mu-container>
    <!-- END 填写内容 -->

    <!-- BEGIN 展示预览 -->
    <mu-container v-show="isPreview" style="margin-top:.5rem;">
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
                  <span class="team-leaderinfo-cont">
                    {{ teamInfo.role }}               
                  </span>
              </div>
              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">名称：</span>
                <span class="team-leaderinfo-cont">
                  {{ teamInfo.roleName }}
                </span>
              </div>
              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">区服：</span>
                <span class="team-leaderinfo-cont">
                  {{ teamInfo.serverName }}
                </span>
              </div>
              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">等级/段位：</span>
                <span class="team-leaderinfo-cont">
                  {{ teamInfo.roleRank }}
                </span>
              </div>
              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">招募人数：</span>
                <span class="team-leaderinfo-cont">
                  <span>{{ teamInfo.recruitNumb }}</span>
                </span>
              </div>
              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">队友偏爱：</span>
                <span class="team-leaderinfo-cont">
                  {{ teamInfo.teamatePreferStr }}
                </span>
              </div>
            </mu-col>  

            <!-- 右边图片展示 -->
            <mu-col col="6" justify-content="center" align-items="center">
              <mu-flex justify-content="center" align-items="center" class="team-leaderinfo-img-flex">
                <img v-show="teamInfo.displayImg" :src="teamInfo.displayImg" />
              </mu-flex>
            </mu-col>
          </mu-row>

          <!-- 招募宣言 -->
          <mu-row style="margin-top:.5rem;" gutter>
            <mu-col col="12" style="font-size:12px;">
              <span style="color:#795548;">招募宣言：</span> 
              <span style="color:#9e9e9e;">{{ teamInfo.announcement }}</span>
            </mu-col>
          </mu-row>
        </div>
      </mu-paper>
    </mu-container>
    <!-- END 展示预览 -->


      <!-- <mu-button style="width:33%" color="#00bcd4">卡片模式</mu-button> -->
      <!-- <mu-button style="width:33%;" color="#03a9f4">列表模式</mu-button> -->


    <mu-flex style="position:fixed; width:100%; bottom:0; left:0; padding:0 .1rem; background:#eeeeee; padding:.5rem .1rem;" justify-content="between">
      <mu-button style="width:34%" color="#00bcd4">
        卡片模式
        <mu-icon value="sync" size="14"></mu-icon>
      </mu-button>
      <mu-button style="width:65%;" color="#42a5f5">
        发起招募
      </mu-button>
    </mu-flex>

  </div>  
</template>

<script>
export default {
  data () {
    return {
      teamInfo: {
        gameID: 0,
        role: '',
        roleName: '',
        serverName: '',
        roleRank: '',
        recruitNumb: '0',
        teamatePrefer: [],
        teamatePreferStr: '',
        displayImg: '',
        announcement: '无',
      },

      options: [
        'Option 1', 'Option 2', 'Option 3', 'Option 4',
        'Option 5', 'Option 6', 'Option 7', 'Option 8',
        'Option 9', 'Option 10'
      ],
      labelPosition: 'top',
      form: {
        input: '',
        select: '',
        date: '',
        radio: '',
        checkbox: [],
        switch: false,
        slider: 30,
        textarea: ''
      },

      isPreview: false,
    }
  },
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
.team-leaderinfo-item { font-size:12px; margin-bottom:.2rem; }
.team-leaderinfo-title { color:#795548; }
.team-leaderinfo-cont { color:#9e9e9e; }
.team-leaderinfo-img-flex { width:100%; height:10rem; text-align:center; border-radius:.5rem; margin-top:.5rem; background:rgba(230,230,230,.5); }
.team-leaderinfo-img-flex img { max-width:100%; max-height:10rem; border-radius:.5rem; }
.team-extracont-time { font-size:12px; margin-right:1rem; color:#9e9e9e; }
.team-extracont-operate { font-size:12px; color:#009688; }
.operate-edit-span { font-size:12px; color:green; }

input { border: 1px solid #00bcd4 }
input:focus { border: 1px solid #4caf50; }

</style>
