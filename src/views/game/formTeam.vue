<template>
  <div style="max-width:100%;">
    <!-- BEGIN 头部 -->
    <mu-flex style="padding:.6rem .8rem; background:#4dd0e1; box-shadow: 0 0 1px #26c6da; background: linear-gradient(to right, #4dd0e1 , #80cbc4);" align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">创建队伍</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->


    <!-- BEGIN 填写内容 -->
    <mu-container style="padding:.5rem; width:100%; margin-bottom:3rem;">

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
          @getImgURL="getRecruitImg($event)" 
          @delImg="delRecruitImg"
          ImgWidth="177px" 
          ImgHeight="100px" 
          BorderColor="#e0e0e0"></ImgCropper>
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="start">
        <span style="font-size:13px; color:#795548; margin-right:.5rem; margin-top:.3rem;">角色图片：</span>
        <ImgCropper 
          @getImgURL="getRoleImg" 
          @delImg="delRoleImg"
          ImgWidth="120px" 
          ImgHeight="150px" 
          :CropImgWidth="750"
          :CropperBoxRatio="0.8"
          BorderColor="#e0e0e0"></ImgCropper>
      </mu-flex>

    </mu-container>
    <!-- END 填写内容 -->

    <mu-flex class="mu-flex-four" justify-content="center">
      <mu-button @click="submit" style="width:95%;" color="#42a5f5">
        <mu-icon value="touch_app" size="14"></mu-icon>
        <span style="margin-left:.5rem;">发起招募</span>
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
      teamatePreferStr: '',

      RecruitNumbList: []

    }
  },
  mounted () {
    this.teamInfo.gameID = this.$route.params.gameid
    for(let i = 1; i < 30; i++) {
      this.RecruitNumbList.push(i)
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },

    getRecruitImg (imgURL) {  // 获取招募图片
      this.teamInfo.displayImg = imgURL
    },

    getRoleImg (imgURL) { // 获取角色图片
      this.teamInfo.roleImg = imgURL
    },

    delRecruitImg () {  // 删除招募图片
      this.teamInfo.displayImg = ''
    },

    delRoleImg () { // 删除角色图片
      this.teamInfo.roleImg = ''
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
          gameID: Number(this.teamInfo.gameID),
          role: this.teamInfo.role,
          roleName: this.teamInfo.roleName,
          serverName: this.teamInfo.serverName,
          roleRank: this.teamInfo.roleRank,
          recruitNumb: this.teamInfo.recruitNumb,
          recruitWay: Number(this.teamInfo.recruitWay),
          teammatePrefer: this.teamatePreferStr,
          announcement: this.teamInfo.announcement,
          displayImg: this.teamInfo.displayImg,
          roleImg: this.teamInfo.roleImg
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
.mu-flex-four { position:fixed; width:100%; bottom:0; left:0; background:#f5f5f5; padding:.5rem .1rem; z-index:999; border-top:1px solid #eeeeee; }

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
