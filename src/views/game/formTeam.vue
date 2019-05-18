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

        <mu-flex slot="right" style="font-size:12px; color:#fff; margin-right:1rem;" align-items="center">
          <span>导入记录</span> <mu-icon value="launch" size="18"></mu-icon>
        </mu-flex>

    </mu-appbar>
    <!-- END 头部 -->

    <!-- BEGIN 填写内容 -->
    <mu-container v-show="!isPreview" style="padding:.5rem;">

      <!-- 角色 -->
      <mu-row>
        <mu-flex class="mu-flex-one" align-items="center" justify-content="center">
          <span>职 业</span>
        </mu-flex>
        <mu-flex class="mu-flex-two">
          <input v-model="teamInfo.role" type="text" placeholder="职业，例如：刺客" maxlength="15">
        </mu-flex>
      </mu-row>

      <!-- 昵称 -->
      <mu-row style="margin-top:.5rem;">
        <mu-flex class="mu-flex-one" align-items="center" justify-content="center">
          <span>昵 称</span>
        </mu-flex>
        <mu-flex class="mu-flex-two">
          <input v-model="teamInfo.roleName" type="text" placeholder="游戏中的昵称" maxlength="15">
        </mu-flex>
      </mu-row>

      <!-- 区服 -->
      <mu-row style="margin-top:.5rem;">
        <mu-flex class="mu-flex-one" align-items="center" justify-content="center">
          <span>区 服</span>
        </mu-flex>
        <mu-flex class="mu-flex-two">
          <input v-model="teamInfo.serverName" type="text" placeholder="游戏角色所在区服" maxlength="15">
        </mu-flex>
      </mu-row>

      <!-- 等级/段位 -->
      <mu-row style="margin-top:.5rem;">
        <mu-flex class="mu-flex-one" align-items="center" justify-content="center">
          <span>等级/段位</span>
        </mu-flex>
        <mu-flex class="mu-flex-two">
          <input v-model="teamInfo.roleRank" type="text" placeholder="游戏角色的等级或者段位" maxlength="15">
        </mu-flex>
      </mu-row>

      <!-- 队友偏爱 -->
      <mu-row style="margin-top:.5rem; padding:.5rem .5rem 0 .5rem;">
        <mu-col span="12">
          <mu-select label="队友偏爱" multiple chips v-model="teamatePrefer" full-width style="color:#795548;">
            <template slot="selection" slot-scope="scope">
              <mu-chip :selected="scope.selected" color="teal" small>
                {{scope.label}}
              </mu-chip>
            </template>
            <mu-option v-for="(item,index) in perferList" :key="index" :label="item" :value="item"></mu-option>
          </mu-select>
        </mu-col>
      </mu-row>

      <!-- 招募人数 -->
      <mu-row>
        <mu-flex class="mu-flex-three" align-items="center" justify-content="center">
          <span>招募人数 (已选 {{ teamInfo.recruitNumb }} 人)</span>
        </mu-flex>
      </mu-row>
      <mu-row style="margin-top:.5rem;">
        <mu-flex style="width:100%; height:2rem; font-size:12px; padding: 0 .5rem 0 .5rem;">
          <mu-slider class="demo-slider" track-color="#e0e0e0" v-model="teamInfo.recruitNumb" :max="10" :min="2" :step="1" color="#00bcd4"></mu-slider>
        </mu-flex>
      </mu-row> 

      <!-- 是否需要申请入队伍 -->
      <mu-row style="margin-bottom:1.5rem; margin-top:1rem;">
        <mu-flex class="mu-flex-three" align-items="center" justify-content="center">
          <span style="margin-right:1rem;">招募方式:</span>
          <mu-radio v-model="teamInfo.recruitWay" value="0" label="无限制" style="margin-right:1rem;"></mu-radio>
          <mu-radio v-model="teamInfo.recruitWay" value="1" label="需要申请"></mu-radio>
        </mu-flex>
      </mu-row>

      <!-- 招募宣言 -->
      <mu-row class="mu-container-one">
        <mu-text-field v-model="teamInfo.announcement" multi-line :rows="5" :rows-max="7" full-width :max-length="120" underline-color="rgba(139, 69, 19, .2)" placeholder="招募宣言：" style="font-size:14px;">
        </mu-text-field>
      </mu-row>

      <!-- 上传招募图片 -->
      <mu-row style="margin-top:1rem; margin-bottom:.5rem;">
        <mu-flex style="position:relative; width:100%; height:10rem; background:#eeeeee; border-radius:.5rem;" justify-content="center" align-items="center">
          <span @click="addImg" v-show="!teamInfo.displayImg" style="color:#4caf50;">点击上传招募图片</span>
          <mu-icon v-show="teamInfo.displayImg" @click="delImg" value="cancel" color="#e91e63" style="position:absolute; top:0; right:0;"></mu-icon>
          <img style="max-width:100%; max-height:9rem; border-radius:.3rem;" :src="teamInfo.displayImg" />
        </mu-flex>
        <input @change="getDisplayImg" ref="imgUpload" type="file" style="display:none;" accept="image/*"/>
      </mu-row>

      <!-- 上传角色图片 -->
      <mu-row style="margin-top:1rem; margin-bottom:3rem;">
        <mu-flex style="position:relative; width:100%; height:10rem; background:#eeeeee; border-radius:.5rem;" justify-content="center" align-items="center">
          <span @click="addImg2" v-show="!teamInfo.roleImg" style="color:#4caf50;">点击上传角色图片</span>
          <mu-icon v-show="teamInfo.roleImg" @click="delImg2" value="cancel" color="#e91e63" style="position:absolute; top:0; right:0;"></mu-icon>
          <img style="max-width:100%; max-height:9rem; border-radius:.3rem;" :src="teamInfo.roleImg" />
        </mu-flex>
        <input @change="getRoleImg" ref="imgUpload2" type="file" style="display:none;" accept="image/*"/>
      </mu-row>

    </mu-container>
    <!-- END 填写内容 -->

    <!-- BEGIN 展示预览 -->
    <mu-container v-show="isPreview" style="margin-top:2rem;">
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
                  <span class="team-leaderinfo-title">职业：</span>
                  <span class="team-leaderinfo-cont">
                    {{ teamInfo.role }}               
                  </span>
              </div>
              <div class="team-leaderinfo-item">
                <span class="team-leaderinfo-title">昵称：</span>
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
                  {{ teamatePreferStr }}
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

    <mu-flex class="mu-flex-four" justify-content="between">
      <mu-button @click="previewPage" style="width:34%" color="#00bcd4">
        {{ isPreviewCont }}
        <mu-icon value="touch_app" size="14"></mu-icon>
      </mu-button>
      <mu-button @click="submit" style="width:65%;" color="#42a5f5">
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
        recruitNumb: 2,
        recruitWay: 0,
        displayImg: '',
        announcement: '',
        roleImg: '',
      },
      teamatePrefer: [],
      teamatePreferStr: '',

      isPreview: false, // 是否预览
      isPreviewCont: '预 览',
      perferList: ['男生', '女生', '菜鸟', '大神', '萌妹子', '抠脚大叔']

    }
  },
  mounted () {
    this.teamInfo.gameID = this.$route.params.gameid
  },
  watch: {
    teamatePrefer (curVal) {
      this.teamatePreferStr = ''
      for(let i = 0; i < curVal.length; i++) {
        this.teamatePreferStr += curVal[i] + "/" 
      }
      this.teamatePreferStr = this.teamatePreferStr.substring(0, this.teamatePreferStr.length - 1)
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    delImg () {
      this.teamInfo.displayImg = ''
    },
    addImg () {
      this.$refs.imgUpload.click()
    },
    getDisplayImg () {  // 获取评论图片
      var _this = this
      var event = event || window.event
      var file = event.target.files[0]

      // 先判断file的大小
      if(file.size > 1024 * 1024 * 2) {
        this.$toast.message('图片上传最大为2M！')
        return
      }

      var reader = new FileReader()
      //转base64
      reader.onload = function(e) {
        _this.teamInfo.displayImg = e.target.result
      }
      reader.readAsDataURL(file)
    },
    getRoleImg () {  // 获取评论图片
      var _this = this
      var event = event || window.event
      var file = event.target.files[0]

      // 先判断file的大小
      if(file.size > 1024 * 1024 * 2) {
        this.$toast.message('图片上传最大为2M！')
        return
      }

      var reader = new FileReader()
      //转base64
      reader.onload = function(e) {
        _this.teamInfo.roleImg = e.target.result
      }
      reader.readAsDataURL(file)
    },
    delImg2 () {
      this.teamInfo.roleImg = ''
    },
    addImg2 () {
      this.$refs.imgUpload2.click()
    },
    previewPage () {
      this.isPreview = !this.isPreview
      this.isPreviewCont = this.isPreview === false ? '预 览' : '返 回'
    },
    submit () {

      if(this.teamInfo.role.length == 0) {
        this.$toast.message('职业不能为空，如果没有请填：无')
        return
      }

      if(this.teamInfo.roleName.length == 0) {
        this.$toast.message('昵称不能为空，如果没有请填：无')
        return
      }

      if(this.teamInfo.serverName.length == 0) {
        this.$toast.message('区服不能为空，如果没有请填：无')
        return
      }

      if(this.teamInfo.roleRank.length == 0) {
        this.$toast.message('等级/段位不能为空，如果没有请填：无')
        return
      }

      if(this.teamInfo.announcement.length == 0) {
        this.$toast.message('宣言不能为空，如果没有请填：无')
        return
      }

      this.$axios.post(
        '/game/formATeam', {
          g_id: Number(this.teamInfo.gameID),
          role: this.teamInfo.role,
          role_name: this.teamInfo.roleName,
          server_name: this.teamInfo.serverName,
          role_rank: this.teamInfo.roleRank,
          recruit_numb: this.teamInfo.recruitNumb,
          recruit_way: Number(this.teamInfo.recruitWay),
          teammate_prefer: this.teamatePreferStr,
          announcement: this.teamInfo.announcement,
          display_img: this.teamInfo.displayImg,
          role_img: this.teamInfo.roleImg
        }
      ).then((resp)=>{
        if(resp.data.code === 20000) {
          this.$toast.message('创建队伍成功')
          // TODO 跳转到组队详细页面(此页面可进行分享，加入组队)
          this.$router.push(`/game/teamDetail/${resp.data.newTeamID}`)
        }
      })
    },
  }
}
</script>

<style>
.mine-appbar { width: 100%; height:2.5rem; }
.paper-container { border-radius:.5rem; }

/* 队伍详细信息内容 */
.mu-flex-one { width:25%; height:2rem; background:#00bcd4; color:#fff; font-size:12px; border-top-left-radius:.3rem;  border-bottom-left-radius:.3rem; }
.mu-flex-two { width:75%; height:2rem; background:yellow; font-size:12px; }
.mu-flex-two input { width:100%; height:100%; padding: 0 0 0 .5rem; }
.mu-flex-three { height:2rem; font-size:12px; color:#795548; border-top-left-radius:.3rem;  border-bottom-left-radius:.3rem; padding:0 .5rem; }
.mu-flex-four { position:fixed; width:100%; bottom:0; left:0; padding:0 .1rem; background:#e0e0e0; padding:.5rem .1rem; z-index:999 }

.mu-container-one { margin-top:.5rem; width:100%; height:100%; border-radius:.5rem; padding:.5rem .5rem 0 .5rem; background:#eeeeee; }

.team-header { padding:.5rem 0 .5rem 0; }
.team-avatar-flex { width:90%; margin-left:-.5rem; margin-bottom:.5rem; }
.team-leader-nickname { margin-left:.5rem; font-size:14px; color:#795548; }
.team-leaderinfo-item { font-size:12px; margin-bottom:.2rem; }
.team-leaderinfo-title { color:#795548; }
.team-leaderinfo-cont { color:#9e9e9e; }
.team-leaderinfo-img-flex { width:100%; height:10rem; text-align:center; border-radius:.5rem; margin-top:.5rem; background:rgba(230,230,230,.2); }
.team-leaderinfo-img-flex img { max-width:100%; max-height:10rem; border-radius:.5rem; }
.team-extracont-time { font-size:12px; margin-right:1rem; color:#9e9e9e; }
.team-extracont-operate { font-size:12px; color:#009688; }
.operate-edit-span { font-size:12px; color:green; }

input { border: 1px solid #00bcd4 }
input:focus { border: 1px solid #4caf50; }

.mu-radio-label { color: rgba(0,0,0,.5); white-space: nowrap; font-size: 12px; }

</style>
