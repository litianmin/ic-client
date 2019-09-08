<template>
  <div style="padding:1rem; width:100%;">
    <span>什么鬼啊</span>
    <!-- 上传图片共同样式 -->
    <mu-flex 
      @click="imgChoose"
      align-items="center"
      justify-content="center"
      :style="'width:'+ ImgWidth + '; height: ' + ImgHeight + '; border-radius:.5rem; border: 1px dashed ' + BorderColor + ';'">
      <img 
        style="width:100%; height:100%; border-radius:.5rem;"
        v-if="ImgShowBase64" 
        :src="ImgShowBase64" alt="">
      <svg-icon v-else icon-class="img-upload" style="font-size:30px;"></svg-icon>
    </mu-flex>
    <input type="file" ref="upload_input" accept="image" @change="imgHadChoose" style="display:none;">

    <!-- 图片编辑框 -->
    <div class="mine-cropper-container" v-show="Panel">
      <div class="edit-container">
        <div id="cropper" style="margin-top:1%; margin-left: 1%; margin-right: 1%; height: 85%; margin-bottom: 1%">
          <img ref="img_cropper" :src="ImgURL" alt="Picture" style="max-width:100%;">
        </div>
        <mu-flex style="padding:1rem; width:100%;" wrap="wrap">
          <mu-flex style="margin-bottom:.5rem; width:100%;" justify-content="around">
            <mu-button  @click="zoom(-0.5)" style="margin-right:.5rem;" color="success" :ripple="false" :round="true" fab small>
              <svg-icon icon-class="cropper-smaller" style="font-size:25px;"></svg-icon>
            </mu-button>

            <mu-button  @click="zoom(0.5)" style="margin-right:.5rem;" color="success" :ripple="false" :round="true" fab small>
              <svg-icon icon-class="cropper-bigger" style="font-size:25px;"></svg-icon>
            </mu-button>

            <mu-button  @click="rotate(45)" style="margin-right:.5rem;" color="success" :ripple="false" :round="true" fab small>
              <svg-icon icon-class="cropper-clockwise" style="font-size:25px;"></svg-icon>
            </mu-button>

            <mu-button  @click="rotate(-45)" style="margin-right:.5rem;" color="success" :ripple="false" :round="true" fab small>
              <svg-icon icon-class="cropper-anticlockwise" style="font-size:25px;"></svg-icon>
            </mu-button>

          </mu-flex>

          <mu-flex style="margin-top:2rem; width:100%;" wrap="wrap" justify-content="center">
            <mu-button  @click="confirmCrop" style="margin-right:.5rem; width:95%;" color="#00bcd4">
              <svg-icon icon-class="cropper-crop" style="font-size:20px; margin-right:.5rem;"></svg-icon>
              <span>剪 切</span>
            </mu-button>
            <mu-button  @click="Panel=false" style="margin-right:.5rem; width:95%; margin-top:1.5rem;" color="#9e9e9e">返 回</mu-button>
          </mu-flex>

          <div style="padding:1rem; margin-top:1rem;">
            <span style="color:#9e9e9e;">*温馨提示：在剪辑窗口外可以缩放图片噢！</span>
          </div>

        </mu-flex>
      </div>



    </div>




  </div>
</template>

<script>
import Cropper from 'cropperjs'
export default {
  data () {
    return {
      Cropper: '',            // cropper对象
      CropperInit: false,
      Panel: false,           // 剪切页面
      ImgVal: '',             // 图片的值
      ImgURL: '',
      ImgShowBase64: ''
    }
  },
  mounted () {
    let self = this
    let image = this.$refs.img_cropper
    this.Cropper = new Cropper(image, {
      aspectRatio: 0,
      viewMode: 0,
      aspectRatio: 1.77,  // 长宽比，黄金比例
      highlight: true,
      background: true,//是否在容器上显示网格背景
      rotatable: true,//是否允许旋转图片
      cropBoxResizable: false,  // 切割框能否改变大小
      minCropBoxWidth: 250,
      movable: true,
      ready: function () {
        self.CropperInit = true
      }
    })
  },
  methods: {
    imgChoose () {
      this.$refs.upload_input.click()
    },

    getObjectURL (file) {
      let url = null 
      if (window.createObjectURL != undefined) {        // basic
        url = window.createObjectURL(file) 
      } else if (window.URL != undefined) {             // mozilla(firefox)
        url = window.URL.createObjectURL(file) 
      } else if (window.webkitURL != undefined) {       // webkit or chrome
        url = window.webkitURL.createObjectURL(file) 
      }
      return url 
    },

    imgHadChoose (e) {
      let files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.Panel = true
      this.ImgVal = files[0]
      this.ImgURL = this.getObjectURL(this.ImgVal)
      //每次替换图片要重新得到新的url
      if(this.Cropper){
        this.Cropper.replace(this.ImgURL)
      }
    },

    confirmCrop () {
      if (!this.CropperInit) {
        return
      }

      let croppedCanvas = this.Cropper.getCroppedCanvas({
        width: 750,
        height: 420
      })

      this.ImgShowBase64 = croppedCanvas.toDataURL('image/jpeg', 1)  // 这里可以改变它的比例
      this.Panel = false
      this.$emit('pushImgBase64', this.ImgShowBase64)
    },

    //缩放
    zoom (num) {
      num = num || 1
      this.Cropper.zoom(num)
    },

    //旋转
    rotate (angle) {
      this.Cropper.rotate(angle)
    },

  },
  props: [
    'ImgWidth',
    'ImgHeight',
    'BorderColor'
  ]
}
</script>

 <style scoped>
.mine-cropper-container{ background-color: #ffffff; position: fixed; left:0px; top:0px; width:100%; height:100%; z-index: 33; }
.edit-container { z-index: 99; height: 50%; width: 100%; position: fixed; left: 0; top: 0; background-color: #ffffff; }
</style>