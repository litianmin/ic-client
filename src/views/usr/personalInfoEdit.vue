<template>
  <div>
    <!-- 头部 -->
    <mu-flex 
      style="padding:.6rem .8rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0 0 1px #26c6da;" 
      align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">个人信息</span>
      </mu-flex>
    </mu-flex>


    <div style="padding:.5rem 0">

      <!-- 头像 -->
      <mu-flex 
        style="width:100%; padding:.5rem 1rem;" 
        align-items="center" 
        @click="chooseAvatar">
        <span style="font-size:15px;">头像</span>
        <img style="margin-left:auto; width:3rem; height:3rem; border-radius:.3rem;" :src="$store.state.mdeLogin.usrInfo.avatar | imgPrefixDeal()">
        <svg-icon icon-class="arrow" class="icon-class" style="margin-left:.5rem;"></svg-icon>
      </mu-flex>

      <div style="padding:0 0 0 17px;">
        <mu-divider></mu-divider>
      </div>

      <!-- 昵称 -->
      <mu-flex 
        style="width:100%; padding:1rem;" 
        align-items="center"
        @click="editNickname">
        <span style="font-size:15px;">昵称</span>
        <span style="margin-left:auto;">{{ $store.state.mdeLogin.usrInfo.nickname }}</span>
        <svg-icon icon-class="arrow" class="icon-class" style="margin-left:.5rem;"></svg-icon>
      </mu-flex>

      <div style="padding:0 0 0 17px;">
        <mu-divider></mu-divider>
      </div>

      <!-- 电话号码 -->
      <mu-flex style="width:100%; padding:1rem;" align-items="center">
        <span style="font-size:15px;">电话号码</span>
        <span style="margin-left:auto;">绑定</span>
        <svg-icon icon-class="arrow" class="icon-class" style="margin-left:.5rem;"></svg-icon>
      </mu-flex>

      <div style="padding:0 0 0 17px;">
        <mu-divider></mu-divider>
      </div>


      <!-- 编辑昵称框 -->


      <!-- 剪切头像框 -->
      <ImgCropper 
        ref="cropper"
        @getImgURL="getAvatar" 
        @delImg="delAvatar"
        ImgWidth="0" 
        ImgHeight="0" 
        :CropImgWidth="200"
        :CropperBoxRatio="1"
        :CouldDel="false"
        BorderColor="#e0e0e0"></ImgCropper>

    </div>


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
      newNickname: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getAvatar (imgURL) {
      this.$axios.post('/user/editAvatar', {avatar: imgURL}).then((resp) => {
        if (resp.data.code == 20000) {
          this.$store.commit('mdeLogin/updateAvatar', {avatar:imgURL})
        } else {
          this.$toast.message(resp.data.msg)
        }
      })
    },
    delAvatar () {

    },
    chooseAvatar () {
      this.$refs.cropper.click()
    },
    editNickname () {
      this.$prompt('请输入昵称', '提示', {
        validator (value) {
          if (!!value === false) {
            return {
              valid: false,
              message: '昵称不能为空'
            }
          }

          if (value.length > 10) {
            return {
              valid: false,
              message: '长度不能超过10个字符'
            }
          }

          return {
            valid: true,
            message: '昵称可用'
          }
        }
      }).then(({ result, value }) => {
        if (result) {
          this.$axios.post('/user/editNickname', {nickname: value}).then((resp) => {
            if (resp.data.code == 20000) {
              this.$store.commit('mdeLogin/updateNickname', {nickname:value})
            } else {
              this.$toast.message(resp.data.msg)
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.icon-class {font-size:24px;}
</style>