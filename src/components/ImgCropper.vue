<template>
  <div>
    <!-- 上传图片共同样式 -->
    <mu-flex 
      @click="imgChoose"
      align-items="center"
      justify-content="center"
      :style="'width:'+ ImgWidth + '; height: ' + ImgHeight + '; border-radius:.5rem; border: 1px dashed ' + BorderColor + '; position:relative;'">
      <div 
        @click="delImg"
        v-if="ImgShowBase64"
        style="width:1rem; height:1rem; position:absolute; right:-.2rem; top:-.5rem;">
        <svg-icon icon-class="delete-gray" style="font-size:20px;"></svg-icon>
      </div>
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

          <mu-flex style="margin-bottom:.5rem; width:100%; margin-top:.5rem;" justify-content="around">
            <mu-button  @click="moveLeft" style="margin-right:.5rem;" color="success" :ripple="false" :round="true" fab small>
              <svg-icon icon-class="cropper-move-left" style="font-size:25px;"></svg-icon>
            </mu-button>

            <mu-button  @click="moveRight" style="margin-right:.5rem;" color="success" :ripple="false" :round="true" fab small>
              <svg-icon icon-class="cropper-move-right" style="font-size:25px;"></svg-icon>
            </mu-button>

            <mu-button  @click="moveUp" style="margin-right:.5rem;" color="success" :ripple="false" :round="true" fab small>
              <svg-icon icon-class="cropper-move-up" style="font-size:25px;"></svg-icon>
            </mu-button>

            <mu-button  @click="moveDown" style="margin-right:.5rem;" color="success" :ripple="false" :round="true" fab small>
              <svg-icon icon-class="cropper-move-down" style="font-size:25px;"></svg-icon>
            </mu-button>

          </mu-flex>

          <mu-flex style="margin-top:2rem; width:100%;" wrap="wrap" justify-content="center">
            <mu-button  @click="confirmCrop" style="margin-right:.5rem; width:45%;" color="#00bcd4">
              <svg-icon icon-class="cropper-crop" style="font-size:20px; margin-right:.5rem;"></svg-icon>
              <span>剪 切</span>
            </mu-button>

            <mu-button  @click="reset" style="margin-right:.5rem; width:45%;" color="#00bcd4">
              <svg-icon icon-class="cropper-reset" style="font-size:20px; margin-right:.5rem;"></svg-icon>
              <span>重 置</span>
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
      ImgShowBase64: '',
    }
  },

  props: {
    ImgWidth: { // 显示框的宽度
      type: String,
      default: '177px'
    }, 
    ImgHeight: {  // 显示框的高度
      type: String,
      default: '100px'
    },  
    BorderColor: {  // 显示框的
      type: String, 
      default: '#e0e0e0'
    },  
    CropImgWidth: { // 剪切的图片的宽度
      type: Number,
      default: 750
    }, 
    // CropImgHeight: {  // 剪切的图片的高度
    //   type: Number,
    //   default: 420
    // },
    CropperBoxRatio: {
      type: Number,
      default: 1.77
    }
  },

  mounted () {
    let self = this
    let image = this.$refs.img_cropper
    this.Cropper = new Cropper(image, {
      viewMode: 0,
      aspectRatio: this.CropperBoxRatio,  // 长宽比，黄金比例
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

    imgHadChoose (e) {  // 选择了图片之后
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
      this.$refs.upload_input.value = ''  // 清空input值，要不重新选择图片之后不能选择
    },

    confirmCrop () {  // 确认剪切
      if (!this.CropperInit) {
        return
      }
      
      let cropImgHeight = parseInt(this.CropImgWidth / this.CropperBoxRatio)
      let croppedCanvas = this.Cropper.getCroppedCanvas({
        width: this.CropImgWidth,
        height: cropImgHeight
      })

      this.ImgShowBase64 = croppedCanvas.toDataURL('image/jpeg', 1)  // 这里可以改变它的比例

      this.$axios.post('/base64ImgUpload', {  // 上传图片
        imgStr: this.ImgShowBase64,
        type: 'game'
      }).then((resp) => {
        // console.log(resp)
        if(resp.data.code == 20000) {
          this.Panel = false
          this.$emit('getImgURL', resp.data.msg)
          return
        }
        this.$toast.message(resp.data.msg)
      })


      // this.Panel = false
      // this.$emit('pushImgBase64', this.ImgShowBase64)
    },

    delImg () {
      this.ImgShowBase64 = ''
      this.$emit('delImg')
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

    moveLeft () { // 向左移
      this.Cropper.move(-10, 0)
    },

    moveRight () {  // 向右移
      this.Cropper.move(10, 0)
    },

    moveUp () { // 向上移
      this.Cropper.move(0, -10)
    },

    moveDown () { // 向下移
      this.Cropper.move(0, 10)
    },

    reset () {  // 重置
      this.Cropper.reset()
    }

  },

}
</script>

 <style>
.mine-cropper-container{ background-color: #ffffff; position: fixed; left:0px; top:0px; width:100%; height:100%; z-index: 1000; }
.edit-container { z-index: 999; height: 50%; width: 100%; position: fixed; left: 0; top: 0; background-color: #ffffff; }

.cropper-container {
    font-size: 0;
    line-height: 0;
    position: relative;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    direction: ltr;
    -ms-touch-action: none;
    touch-action: none
  }
 
  .cropper-container img {
    /* Avoid margin top issue (Occur only when margin-top <= -height) */
    display: block;
    min-width: 0 !important;
    max-width: none !important;
    min-height: 0 !important;
    max-height: none !important;
    width: 100%;
    height: 100%;
    image-orientation: 0deg
  }
  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-drag-box,
  .cropper-crop-box,
  .cropper-modal {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
  .cropper-wrap-box {
    overflow: hidden;
  }
  .cropper-drag-box {
    opacity: 0;
    background-color: #fff;
  }
  .cropper-modal {
    opacity: .5;
    background-color: #000;
  }
  .cropper-view-box {
    display: block;
    overflow: hidden;
    width: 100%;
    height: 100%;
    outline: 1px solid #39f;
    outline-color: rgba(51, 153, 255, 0.75);
  }
 
  .cropper-dashed {
    position: absolute;
    display: block;
    opacity: .5;
    border: 0 dashed #eee
  }
  .cropper-dashed.dashed-h {
    top: 33.33333%;
    left: 0;
    width: 100%;
    height: 33.33333%;
    border-top-width: 1px;
    border-bottom-width: 1px
  }
  .cropper-dashed.dashed-v {
    top: 0;
    left: 33.33333%;
    width: 33.33333%;
    height: 100%;
    border-right-width: 1px;
    border-left-width: 1px
  }
  .cropper-center {
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    width: 0;
    height: 0;
    opacity: .75
  }
  .cropper-center:before,
  .cropper-center:after {
    position: absolute;
    display: block;
    content: ' ';
    background-color: #eee
  }
  .cropper-center:before {
    top: 0;
    left: -3px;
    width: 7px;
    height: 1px
  }
  .cropper-center:after {
    top: -3px;
    left: 0;
    width: 1px;
    height: 7px
  }
  .cropper-face,
  .cropper-line,
  .cropper-point {
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    opacity: .1;
  }
  .cropper-face {
    top: 0;
    left: 0;
    background-color: #fff;
  }
  .cropper-line {
    background-color: #39f
  }
  .cropper-line.line-e {
    top: 0;
    right: -3px;
    width: 5px;
    cursor: e-resize
  }
  .cropper-line.line-n {
    top: -3px;
    left: 0;
    height: 5px;
    cursor: n-resize
  }
  .cropper-line.line-w {
    top: 0;
    left: -3px;
    width: 5px;
    cursor: w-resize
  }
  .cropper-line.line-s {
    bottom: -3px;
    left: 0;
    height: 5px;
    cursor: s-resize
  }
  .cropper-point {
    width: 5px;
    height: 5px;
 
    opacity: .75;
    background-color: #39f
  }
  .cropper-point.point-e {
    top: 50%;
    right: -3px;
    margin-top: -3px;
    cursor: e-resize
  }
  .cropper-point.point-n {
    top: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: n-resize
  }
  .cropper-point.point-w {
    top: 50%;
    left: -3px;
    margin-top: -3px;
    cursor: w-resize
  }
  .cropper-point.point-s {
    bottom: -3px;
    left: 50%;
    margin-left: -3px;
    cursor: s-resize
  }
  .cropper-point.point-ne {
    top: -3px;
    right: -3px;
    cursor: ne-resize
  }
  .cropper-point.point-nw {
    top: -3px;
    left: -3px;
    cursor: nw-resize
  }
  .cropper-point.point-sw {
    bottom: -3px;
    left: -3px;
    cursor: sw-resize
  }
  .cropper-point.point-se {
    right: -3px;
    bottom: -3px;
    width: 20px;
    height: 20px;
    cursor: se-resize;
    opacity: 1
  }
  @media (min-width: 768px) {
    .cropper-point.point-se {
      width: 15px;
      height: 15px
    }
  }
  @media (min-width: 992px) {
    .cropper-point.point-se {
      width: 10px;
      height: 10px
    }
  }
  @media (min-width: 1200px) {
    .cropper-point.point-se {
      width: 5px;
      height: 5px;
      opacity: .75
    }
  }
  .cropper-point.point-se:before {
    position: absolute;
    right: -50%;
    bottom: -50%;
    display: block;
    width: 200%;
    height: 200%;
    content: ' ';
    opacity: 0;
    background-color: #39f
  }
  .cropper-invisible {
    opacity: 0;
  }
  .cropper-bg {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }
  .cropper-hide {
    position: absolute;
    display: block;
    width: 0;
    height: 0;
  }
  .cropper-hidden {
    display: none !important;
  }
  .cropper-move {
    cursor: move;
  }
  .cropper-crop {
    cursor: crosshair;
  }
  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }

</style>