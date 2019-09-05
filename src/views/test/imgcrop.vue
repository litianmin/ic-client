<template>
  <div>
    <h1>这里是我的图片剪切</h1>
    <div>

      <button @click="addImg">点击上传图片</button>

      <input @change="uploadImg($event, 1)" ref="imgUpload" type="file" style="display:none;" accept="image/*"/>

      <div style="width:100%; height:20rem;">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :autoCropWidth="option.autoCropWidth"
          :autoCropHeight="option.autoCropHeight"
          :fixedBox="option.fixedBox"
        ></vueCropper>
      </div>

    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  data () {
    return {
      imgFile: '',
      fileName: '',
      option: {
        img: '',
        outputSize: 1, //剪切后的图片质量（0.1-1）
        full: false, //输出原图比例截图 props名full
        outputType: 'png',
        canMove: true, 
        original: false, 
        canMoveBox: true, 
        autoCrop: true, 
        autoCropWidth: 150, 
        autoCropHeight: 150, 
        fixedBox: true 
      }, 
      example2: {
        img: ''
      }
    }
  },

  methods: {
    addImg () {
      this.$refs.imgUpload.click()
    },
    getDisplayImg () {
      
    },

    uploadImg(e, num) { 

      let _this = this
      var event = event || window.event
      var file = event.target.files[0]
      console.log(file)
      // this.option.img = file
      // 先判断file的大小
      // if(file.size > 1024 * 1024 * 2) {
      //   this.$toast.message('图片上传最大为2M！')
      //   return
      // }

      var reader = new FileReader()
      //转base64
      reader.onload = function(e) {
        _this.option.img = e.target.result
        console.log('初始化慢了')
      }
      reader.readAsDataURL(file)

      // var _this = this
      // //上传图片 
      // var file = e.target.files[0] // 首先获取到这个文件
      // _this.fileName = file.name

      // if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) { 
      //   this.$toast.message('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种') 
      //   return false 
      // } 
      // var reader = new FileReader() 
      // reader.onload = (e) => { 
      //   let data
      //   if (typeof e.target.result === 'object') { 
      //     // 把Array Buffer转化为blob 如果是base64不需要 
      //     data = window.URL.createObjectURL(new Blob([e.target.result])) 
      //   } 
      //   else { 
      //     data = e.target.result 
      //   }

      //   if (num === 1) { 
      //     _this.option.img = data 
      //   } else if (num === 2) { 
      //     _this.example2.img = data 
      //   } 
      // } 
      // // 转化为base64 
      // reader.readAsDataURL(file) 
      // 转化为blob 
      // reader.readAsArrayBuffer(file)
      
    }, 

  },

  components: { 
    VueCropper 
  }, 
}
</script>

<style scoped>

</style>

