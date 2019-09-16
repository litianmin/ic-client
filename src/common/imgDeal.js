import axios from '@/request.js'

/** 图片压缩
 *  @param {func} callBack  回调函数
 *  @param {obj} file 文件
 *  @param {string} mod 属于哪个模块
 *  @param {numb} index 下标
 *  */ 
export function imgCompress(file, callBack, mod, index) {
  var ready = new FileReader()
  /*开始读取指定的Blob对象或File对象中的内容. 当读取操作完成时,readyState属性的值会成为DONE,如果设置了onloadend事件处理程序,则调用之.同时,result属性中将包含一个data: URL格式的字符串以表示所读取文件的内容.*/
  ready.readAsDataURL(file)
  ready.onload = function (e) {
    // 这里需要判断文件的大小
    // if(file.size < 1024 * 1024 * 1) {
    //   callBack(e.target.result, index)
    //   return
    // }

    // let re = this.result
    // that.canvasDataURL(re,{quality: 0.2},that.mytest)
    let img = new Image()
    img.src = e.target.result
    let newCallBack = callBack
    let newIndex = index
    let newMod = mod
    img.onload = function () {
      let that = this
      // 默认按比例压缩
      let w = that.width,
          h = that.height,
          scale = w / h

      // 首先判断是长宽的大小
      if (w > h) {
        w = 750
        h = w / scale
      } else if (w < h) {
        h = 750
        w = h * scale
      } else {
        w = 750
        h = 750
      }

      // let quality = 0.7  // 默认图片质量为0.7
      //生成canvas
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      // 创建属性节点
      let anw = document.createAttribute("width")
      anw.nodeValue = w
      let anh = document.createAttribute("height")
      anh.nodeValue = h
      canvas.setAttributeNode(anw)
      canvas.setAttributeNode(anh)
      ctx.drawImage(that, 0, 0, w, h)
      // quality值越小，所绘制出的图像越模糊
      let base64 = canvas.toDataURL('image/jpeg', 1)
      axios.post('/base64ImgUpload', {  // 上传图片
        imgStr: base64,
        type: newMod
      }).then((resp) => {
        let imgURL = resp.data.msg
        newCallBack(base64, newIndex, imgURL)
      })
      // 回调函数返回base64的值
      
    }

  }
}
