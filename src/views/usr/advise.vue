<template>
  <div>
    <mu-flex 
      style="padding:.6rem .8rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0 0 1px #26c6da;" 
      align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">意见反馈</span>
      </mu-flex>
    </mu-flex>

    <mu-container style="padding:1rem .5rem; margin-top:1rem;">
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="start">
        <span style="font-size:13px; color:#795548; margin-right:.5rem; margin-top:.3rem;">内容描述：</span>

        <textarea v-model="Cont" style="width:75%; height:6rem; border:1px solid #bdbdbd; color:#212121; font-size:13px; padding:.4rem; border-radius:.2rem;" placeholder="麻烦您详细描述一下您的建议噢！">
        </textarea>
      </mu-flex>


      <mu-flex style="width:100%; margin-bottom:.5rem;" align-items="center">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">展示图片：（最多三张）</span>
      </mu-flex>

      <mu-flex 
        align-items="center" 
        justify-content="around" 
        style="margin-top:1rem; margin-bottom:3rem; border:1px solid #eeeeee; border-radius:.3rem; padding:1rem .5rem; background:#fff;">
        <mu-flex 
          v-for="(item, index) in UploadImgList" 
          :key="index" 
          style="width:30%; height:8rem; padding:1rem; position:relative; border:1px solid #e0e0e0; border-radius:.3rem; " 
          justify-content="center" 
          align-items="center">

            <mu-icon 
              @click="delImg(index)" 
              value="cancel" 
              color="#f06292" 
              style="position:absolute; top:0; right:0;"></mu-icon>

            <img style="max-width:100%; max-height:100%; border-radius:.3rem;" :src="item" alt="">
        </mu-flex>

        <mu-flex 
          v-if="CouldAddImg" 
          @click="addImg()" 
          style="width:30%; height:8rem; padding:1rem; position:relative; border:1px solid #e0e0e0; border-radius:.3rem;" 
          justify-content="center" 
          align-items="center">
          <mu-icon value="add" size="40" color="#e0e0e0" style=""></mu-icon>
        </mu-flex>

        <input 
          @change="getImgList" 
          ref="imgUpload" 
          type="file" 
          style="display:none;" 
          multiple accept="image/*"/>
      </mu-flex>
    </mu-container>

    <mu-flex style="position:fixed; width:100%; bottom:0; left:0; background:#f5f5f5; padding:.5rem .1rem; z-index:999; border-top:1px solid #eeeeee;" justify-content="center">
      <mu-button @click="submit" style="width:95%;" color="#00bcd4">
        <mu-icon value="touch_app" size="14"></mu-icon>
        <span style="margin-left:.5rem;">提 交</span>
      </mu-button>
    </mu-flex>

  </div>
</template>


<script>
import { imgCompress } from '@/common/imgDeal.js'
export default {
  data () {
    return {
      Cont: '',
      ImgList: [],
      UploadImgList: [],  // 展示图片
      UploadImgURLList: [], // 展示图片的URL
      CouldAddImg: true,  // 判断是否可以继续添加图片
    }
  },
  watch: {
    UploadImgList: {
      handler: function (val) {
        if(val.length < 3) {
          this.CouldAddImg = true
        } else {
          this.CouldAddImg = false
        }
      },
      deep: true
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    getImgList () {  // 获取评论图片
      let event = event || window.event

      for( let i = 0; i < event.target.files.length; i++ ) {
        let file = event.target.files[i]

        imgCompress(file, this.imgHadChoose, 'party', i) // 图片处理
      }
      this.$refs.imgUpload.value = ''
    },
    imgHadChoose (res, index, imgURL) {
      this.UploadImgList.push(res)
      this.UploadImgURLList.push(imgURL)
    },
    addImg () {
      this.$refs.imgUpload.click()
    },
    delImg (index) {
      this.UploadImgList.splice(index, 1)
      this.UploadImgURLList.splice(index, 1)
    },
    submit () {
      this.$axios.post('/user/advise', {
        cont: this.Cont,
        imgList: this.UploadImgURLList
      }).then((resp) => {
        if (resp.data.code == 20000) {
          this.$toast.message('提交成功，谢谢您的建议！')
          this.$router.go(-1)
          return
        }
        this.$toast.message(resp.data.msg)
      })
    }
  }
}
</script>

<style scoped>

</style>