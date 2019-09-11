<template>
  <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:#f5f5f5;">
    <!-- BEGIN 头部 -->
    <mu-flex 
      style="padding:.6rem .8rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0 0 1px #26c6da;" 
      align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">{{ this.Title }}</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->


    <!-- 评论内容最多200个字符，最多一张图片 -->
    <div style="background:#fff;">
      <mu-container style="width:100%; height:100%; border-radius:.5rem; padding:.5rem .5rem 0 .5rem;">
        <mu-text-field v-model="Cont" multi-line :rows="7" :rows-max="10" full-width :max-length="200" underline-color="rgba(139, 69, 19, .2)" placeholder="说一句呗：" style="font-size:14px;">
        </mu-text-field>
      </mu-container>
    </div>

    <mu-flex style="background:#eeeeee; padding:.5rem .5rem .5rem 1rem;" align-items="center">
      <mu-icon value="wallpaper" @click="addImg()"></mu-icon>
      <mu-button @click="commentSubmit" small color="#00bcd4" style="margin-left:auto;">发表</mu-button>
      <input @change="getChatImg" ref="imgUpload" type="file" style="display:none;" accept="image/*"/>
    </mu-flex>
    <mu-divider></mu-divider>

    <div style="margin-top:1rem; margin-left:.5rem; padding:1rem; position:relative; width:40%; overflow-y:auto; overflow-y:hidden;">
        <mu-icon v-show="this.Img" @click="del_img" value="cancel" color="#e91e63" style="position:absolute; top:0; right:0;"></mu-icon>
        <img style="max-width:100%; max-height:100%; border-radius:.3rem;" :src="Img" alt="">
    </div>


  </div>
</template>

<script>
import { imgCompress } from '@/common/imgDeal.js'
export default {
  data () {
    return {
      Title: '我也说一句',
      TeamType: 0,  // 1=>game, 2=>party, 3=>travel, 4=>instant, 5=>activity
      TeamID: 0,
      ReplyTo: 0,
      ReplyID: 0,
      GameID: 0,
      Cont: '',
      Img: '',  // base64图片数据
      ImgURL: '', // 图片的url
    }
  },
  mounted () {
    this.TeamType = Number(this.$route.query.teamType)
    this.TeamID = this.$route.query.teamID
    this.ReplyTo = this.$route.query.replyTo
    this.ReplyID = this.$route.query.replyID
    let isReply = this.$route.query.isReply
    if(isReply == true) {
      this.Title = '@ ' + this.$route.query.replyNickname
    }
  },
  methods: {
    addImg () {
      this.$refs.imgUpload.click()
    },
    getChatImg () {  // 获取评论图片
      let _this = this
      let event = event || window.event
      let file = event.target.files[0]
      let mod = ''
      switch(this.TeamType) {
        case 1:
          mod = 'game'
          break
        case 2:
          mod = 'party'
          break
        case 3:
          mod = 'travel'
          break
        case 4:
          mod = 'instant'
          break
        case 5:
          mod = 'activity'
          break
        default:
          mod = ''
          break
      }
      imgCompress(file, this.chatImgHadChoose, mod, 0) // 图片处理
      this.$refs.imgUpload.value = ''
    },
    del_img () {
      this.Img = ''
      this.ImgURL = ''
    },
    commentSubmit () {
      if(this.Cont.length == 0 && this.Img.length == 0) {
        this.$toast.message('聊天内容不能为空！')
        return
      }

      this.$axios.post(
        `/common/newChat`,
        {
          teamType: Number(this.TeamType),
          teamID: Number(this.TeamID),
          cont: this.Cont,
          img: this.ImgURL,
          replyTo: Number(this.ReplyTo),
          replyID: Number(this.ReplyID)
        }
      ).then((resp)=>{

        if(resp.data.code === 20000) {
          this.$toast.success(resp.data.msg)
          this.$router.go(-1)
        } else {
          this.$toast.message(resp.data.msg)
        }
      })
    },
    goBack () {
      this.$router.go(-1)
    },

    chatImgHadChoose (res, index, imgURL) {
      this.Img = res
      this.ImgURL = imgURL
    },

  },
}
</script>

<style scoped>

.mine-appbar { width: 100%; height:2.5rem; }

</style>

