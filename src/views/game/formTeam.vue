<template>
  <div style="max-width:100%;">
    <!-- BEGIN 头部 -->
    <mu-flex style="padding:.6rem .8rem; background:#4dd0e1; box-shadow: 0 0 1px #26c6da;" align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">创建队伍</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->


    <!-- BEGIN 填写内容 -->
    <mu-container v-show="!isPreview" style="padding:.5rem; width:100%;">

      <!-- 职业 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">角色职业：</span>
        <input v-model="teamInfo.role" style="padding:.4rem; width:75%; font-size:13px; border-radius:.2rem; border:1px solid #bdbdbd; color:#212121;" type="text" placeholder="职业，例如：刺客">
      </mu-flex>


      <!-- 昵称 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">角色昵称：</span>
        <input v-model="teamInfo.roleName" style="padding:.4rem; width:75%; font-size:13px; border-radius:.2rem; border:1px solid #bdbdbd; color:#212121;" type="text" placeholder="游戏角色的昵称">
      </mu-flex>


      <!-- 区服 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">游戏区服：</span>
        <input v-model="teamInfo.serverName" style="padding:.4rem; width:75%; font-size:13px; border-radius:.2rem; border:1px solid #bdbdbd; color:#212121;" type="text" placeholder="游戏角色所在区服">
      </mu-flex>



      <!-- 等级/段位 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">等级段位：</span>
        <input v-model="teamInfo.roleRank" style="padding:.4rem; width:75%; font-size:13px; border-radius:.2rem; border:1px solid #bdbdbd; color:#212121;" type="text" placeholder="游戏角色的等级或者段位">
      </mu-flex>


      <!-- 队友偏爱 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">队友偏爱：</span>
        <input v-model="teamatePreferStr" style="padding:.4rem; width:75%; font-size:13px; border-radius:.2rem; border:1px solid #bdbdbd; color:#212121;" type="text" placeholder="随便来！ （不超过15个字符）">
      </mu-flex>


      <!-- 招募人数 -->
      <mu-flex style="width:100%; margin-bottom:1rem; margin-top:1rem;" align-items="start">
        <span style="font-size:13px; color:#795548; margin-right:.5rem; margin-top:.3rem;">招募人数：</span>
        <select v-model="teamInfo.recruitNumb" name="" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #eeeeee; text-align:center;">
          <option v-for="(item, index) in RecruitNumbList" :key="index" :value="item">{{ item }} 人</option>
        </select>
      </mu-flex>


      <!-- 招募宣言 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="start">
        <span style="font-size:13px; color:#795548; margin-right:.5rem; margin-top:.3rem;">招募宣言：</span>
        <textarea v-model="teamInfo.announcement" style="width:75%; height:3.5rem; border:1px solid #bdbdbd; color:#212121; font-size:13px; padding:.4rem; border-radius:.2rem;" placeholder="一起来玩吧！（活动的详细内容）">
        </textarea>
      </mu-flex>

      <!-- 招募图片 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="start">
        <span style="font-size:13px; color:#795548; margin-right:.5rem; margin-top:.3rem;">招募图片：</span>
        <ImgCropper 
          @pushImgBase64="getImgBase64" 
          ImgWidth="177px" 
          ImgHeight="100px" 
          BorderColor="#e0e0e0"></ImgCropper>
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="start">
        <span style="font-size:13px; color:#795548; margin-right:.5rem; margin-top:.3rem;">橘色图片：</span>
        <ImgCropper 
          @pushImgBase64="getImgBase64" 
          ImgWidth="120px" 
          ImgHeight="150px" 
          :CropImgWidth="750"
          :CropperBoxRatio="0.8"
          BorderColor="#e0e0e0"></ImgCropper>
      </mu-flex>


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
import ImgCropper from '@/components/ImgCropper'
export default {
  components: {
    ImgCropper
  },
  data () {
    return {
      teamInfo: {
        gameID: 0,
        role: '',
        roleName: '',
        serverName: '',
        roleRank: '',
        recruitNumb: 2,
        recruitWay: '0',
        displayImg: '',
        announcement: '',
        roleImg: '',
      },
      teamatePrefer: [],
      teamatePreferStr: '',

      isPreview: false, // 是否预览
      isPreviewCont: '预 览',
      perferList: ['男生', '女生', '菜鸟', '大神', '萌妹子', '抠脚大叔'],
      RecruitNumbList: []

    }
  },
  mounted () {
    this.teamInfo.gameID = this.$route.params.gameid
    for(let i = 1; i < 30; i++) {
      this.RecruitNumbList.push(i)
    }
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
        console.log(resp)
        if(resp.data.code === 20000) {
          this.$toast.message('创建队伍成功')
          // TODO 跳转到组队详细页面(此页面可进行分享，加入组队)
          this.$router.push(`/game/teamDetail/${resp.data.msg}`)
        }
      })
    },
    getImgBase64 (data) {
      console.log(data)
    }
  },
}
</script>

<style>



.mine-appbar { width: 100%; height:2.5rem; }
.paper-container { border-radius:.5rem; }

/* 队伍详细信息内容 */
.mu-flex-one { width:25%; height:2rem; background:#4dd0e1; color:#fff; font-size:12px; border-top-left-radius:.3rem;  border-bottom-left-radius:.3rem; }
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

input { border: 1px solid #4dd0e1 }
input:focus { border: 1px solid #4caf50; }

.mu-radio-label { color: rgba(0,0,0,.5); white-space: nowrap; font-size: 12px; }

</style>
