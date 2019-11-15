<template>
  <div>
    <!-- BEGIN 头部 -->
    
    <mu-flex 
      class="gb-top-bar" 
      align-items="center">
      <mu-flex align-items="center" @click="$router.go(-1)">
        <svg-icon icon-class="goback" style="font-size:20px;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">创建队伍</span>
      </mu-flex>
    </mu-flex>

    <!-- END 头部 -->

    <!-- BEGIN 填写内容 -->
    <mu-container class="content">

      <!-- 招募宣言 -->
      <mu-flex class="recruit-word-container" align-items="start">
        <span class="content-title">招募宣言</span>
        <textarea 
          v-model="teamInfo.recruitWord" 
          class="recruit-word" 
          placeholder="请填写招募宣言">
        </textarea>
      </mu-flex>

      <!-- 招募图片 -->
      <mu-flex class="content-container-item" align-items="start">
        <span class="content-title">招募图片</span>
        <ImgCropper 
          @getImgURL="getRecruitImg" 
          @delImg="delRecruitImg"
          ImgWidth="177px" 
          ImgHeight="100px" 
          BorderColor="#e0e0e0"></ImgCropper>
      </mu-flex>

      <!-- 角色图片 -->
      <mu-flex class="content-container-item" align-items="start">
        <span class="content-title">角色图片</span>
        <ImgCropper 
          @getImgURL="getRoleImg" 
          @delImg="delRoleImg"
          ImgWidth="120px" 
          ImgHeight="150px" 
          :CropImgWidth="600"
          :CropperBoxRatio="0.8"
          BorderColor="#e0e0e0"></ImgCropper>
      </mu-flex>

      <!-- 招募人数 -->
      <mu-flex class="content-container-item" align-items="start">
        <span class="content-title" style="margin-top:.2rem;">招募人数</span>
        <select 
          v-model="teamInfo.recruitNumb" 
          class="recruit-numb-select">
          <option 
            v-for="(item, index) in RecruitNumbList" 
            :key="index" 
            :value="item.val">{{ item.name }}</option>
        </select>
      </mu-flex>

    </mu-container>
    <!-- END 填写内容 -->

    <mu-flex class="mu-flex-four" justify-content="center">
      <mu-button @click="submit" style="width:95%;" color="#00bcd4">
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
        recruitNumb: 0, 
        recruitImg: '',
        recruitWord: '',
        roleImg: '',
      },
      teamatePreferStr: '',

      RecruitNumbList: [
        {val: 0, name: '不限'}
      ]

    }
  },
  mounted () {
    this.teamInfo.gameID = Number(this.$route.params.gameid)
    for(let i = 1; i < 30; i++) {
      this.RecruitNumbList.push({val: i, name: `${i} 人`})
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },

    getRecruitImg (imgURL) {  // 获取招募图片
      this.teamInfo.recruitImg = imgURL
    },

    getRoleImg (imgURL) { // 获取角色图片
      this.teamInfo.roleImg = imgURL
    },

    delRecruitImg () {  // 删除招募图片
      this.teamInfo.recruitImg = ''
    },

    delRoleImg () { // 删除角色图片
      this.teamInfo.roleImg = ''
    },

    submit () { // 提交内容

      if(this.teamInfo.recruitWord.length == 0) {
        this.$toast.info('宣言不能为空')
        return
      }

      if(!!this.teamInfo.recruitImg == false) {
        this.$toast.info('招募图片不能为空')
        return
      }

      if(!!this.teamInfo.roleImg == false) {
        this.$toast.info('角色图片不能为空')
        return
      }

      this.$axios.post(
        '/game/formATeam', this.teamInfo).then((resp)=>{
        if(resp.data.code === 20000) {
          this.$toast.success('创建队伍成功')
          this.$router.replace(`/game/teamDetail/${resp.data.msg}`)
        }
      })
    },
  },
}
</script>

<style scoped>

.mu-flex-four { 
  position:fixed; 
  width:100%; 
  bottom:0; 
  left:0; 
  background:#f5f5f5; 
  padding:.5rem .1rem; 
  z-index:999; 
  border-top:1px solid #eeeeee; 
}

input { border: 1px solid #4dd0e1 }
input:focus { border: 1px solid #4caf50; }

.content {
  padding:.5rem; 
  width:100%; 
  margin-bottom:3rem; 
  margin-top:2.5rem;
}

.content-title {
  font-size:13px; 
  margin-right:.5rem; 
  margin-top:.3rem;
}

.content-container-item {
  width:100%; 
  margin-bottom:1rem;
}

.recruit-word-container {
  width:100%; 
  margin-bottom:1rem; 
  margin-top:.5rem;
}

.recruit-word {
  width:75%; 
  height:4.5rem; 
  border:1px solid #bdbdbd; 
  color:#212121; 
  font-size:13px; 
  padding:.4rem; 
  border-radius:.2rem;
}

.recruit-numb-select {
  width:4rem;
  padding:.2rem .5rem; 
  color:#616161; 
  appearance:none; 
  background:#fff; 
  font-size:13px; 
  border-radius:.2rem; 
  border:1px solid #eeeeee; 
  text-align:center;
}

</style>
