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
        <span style="color:#fff;">角色信息填写</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->
    

    <!-- BEGIN 填写内容 -->
    <mu-container class="content-container">

      <!-- 特性 -->
      <mu-flex class="content-item-container" align-items="center">
        <span class="introduce-title">自我介绍：</span>
        <input 
          v-model="Word" 
          class="introduce-input" 
          type="text" 
          placeholder="例如：我是大神/菜鸟">
      </mu-flex>

      <!-- 上传招募图片 -->

      <mu-flex class="content-item-container" align-items="start">
        <span class="role-img-title">角色图片：</span>
        <ImgCropper 
          @getImgURL="getRoleImg" 
          @delImg="delRoleImg"
          ImgWidth="160px" 
          ImgHeight="200px" 
          :CropImgWidth="750"
          :CropperBoxRatio="0.8"
          BorderColor="#e0e0e0"></ImgCropper>
      </mu-flex>

    </mu-container>
    <!-- END 填写内容 -->

    <mu-flex class="mu-flex-four" justify-content="center">
      <mu-button style="width:95%;" color="#00bcd4" @click="submit">
        申请加入
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
      TeamID: 0,
      Word: '',
      DisplayImg: ''
    }
  },
  mounted () {
    this.teamID = this.$route.params.teamid
  },
  methods: {

    getRoleImg (imgURL) { // 获取角色图片
      this.DisplayImg = imgURL
    },

    delRoleImg () { // 删除角色图片
      this.DisplayImg = ''
    },

    submit () { // 提交数据

      let word = this.Word.trim()
      let roleImg = this.DisplayImg

      if(word == 0) {
        this.$toast.info('介绍一下自己呗')
        return
      }
      if(roleImg.length == 0) {
        this.$toast.info('角色图片不能为空噢')
        return
      }

      this.$axios.post('/game/joinTeam',{
        teamID: Number(this.teamID),
        word,
        roleImg
      }).then((resp)=>{

        this.$toast.info(resp.data.msg)
        if(resp.data.code == 20000) {
          this.$router.go(-1)
        }
        
      })
    },
  }
}
</script>

<style scoped>

.content-container {
  padding:.5rem; 
  margin-top:4rem;
}

.mu-flex-four { 
  position:fixed; 
  width:100%; 
  bottom:0; 
  left:0; 
  background:#f5f5f5; 
  padding:.5rem .1rem; 
  z-index:10; 
  border-top:1px solid #eeeeee; }

.content-item-container {
  width:100%; 
  margin-bottom:2rem;
}

.introduce-title {
  font-size:13px; 
  color:#795548; 
  margin-right:.5rem;
}

.introduce-input {
  padding:.4rem; 
  width:75%; 
  font-size:13px; 
  border-radius:.2rem; 
  border:1px solid #bdbdbd; 
  color:#212121;
}

.role-img-title {
  font-size:13px; 
  color:#795548; 
  margin-right:.5rem; 
  margin-top:.3rem;
}

</style>


