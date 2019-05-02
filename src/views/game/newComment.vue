<template>
  <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:#f5f5f5;">
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#009688">
        <mu-button icon slot="left" @click="goBack">
          <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
        
        <div style="font-size:14px;">
          创建评论
        </div>
    </mu-appbar>
    <!-- END 头部 -->


    <!-- 评论内容最多200个字符，最多一张图片 -->
    <div style="background:#fff;">
      <mu-container style="width:100%; height:100%; border-radius:.5rem; padding:.5rem .5rem 0 .5rem;">
        <mu-text-field v-model="c_cont" multi-line :rows="7" :rows-max="10" full-width :max-length="200" underline-color="rgba(139, 69, 19, .2)" placeholder="评论：" style="font-size:14px;">
        </mu-text-field>
      </mu-container>
    </div>

    <mu-flex style="background:#eeeeee; padding:.5rem .5rem .5rem 1rem;" align-items="center">
      <mu-icon value="wallpaper" @click="addImg()"></mu-icon>
      <mu-button @click="commentSubmit" small color="#00bcd4" style="margin-left:auto;">发表</mu-button>
      <input @change="getCommentImg" ref="imgUpload" type="file" style="display:none;" accept="image/*"/>
    </mu-flex>
    <mu-divider></mu-divider>

    <div style="margin-top:1rem; margin-left:.5rem; padding:1rem; position:relative; width:40%; overflow-y:auto; overflow-y:hidden;">
        <mu-icon v-show="this.c_img" @click="del_img" value="cancel" color="#e91e63" style="position:absolute; top:0; right:0;"></mu-icon>
        <img style="max-width:100%; max-height:100%; border-radius:.3rem;" :src="c_img" alt="">
    </div>


  </div>
</template>

<script>
export default {
  data () {
    return {
      gameID: 0,
      c_cont: '',
      c_img: '',  // base64图片数据
    }
  },
  methods: {
    addImg () {
      this.$refs.imgUpload.click()
    },
    getCommentImg () {  // 获取评论图片
      var _this = this
      var event = event || window.event
      var file = event.target.files[0]
      if(file.size > 1024 * 1024 * 2) {
        this.$toast.message('图片上传最大为2M')
        return
      }
      var reader = new FileReader()
      //转base64
      reader.onload = function(e) {
          _this.c_img = e.target.result
      }
      reader.readAsDataURL(file)
    },
    del_img () {
      this.c_img = ''
    },
    commentSubmit () {
      if(this.c_cont.length == 0 && this.c_img.length == 0) {
        this.$toast.message('评论内容不能为空！')
        return
      }
      this.$axios.post(
        `/commentToGame`,
        {
          g_id: this.gameID,
          c_cont: this.c_cont,
          c_img: this.c_img
        }
      ).then((resp)=>{
        if(resp.data.code === 20000) {
          this.$toast.success('评论成功')
          this.$router.go(-1)
        }
        // console.log(resp)
      })
    },
    goBack () {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>

.mine-appbar { width: 100%; height:2.5rem; }

</style>

