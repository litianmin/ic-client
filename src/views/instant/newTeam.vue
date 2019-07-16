<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''" style="">
    <!-- 导航条 -->
    <mu-appbar class="mine-appbar" color="#4caf50" z-depth="1">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        创建即时组队
      </div>
    </mu-appbar>

    <!-- 评论内容最多200个字符，最多一张图片 -->
    <div style="background:#fff;">
      <mu-container style="width:100%; height:100%; border-radius:.5rem; padding:.5rem .5rem 0 .5rem;">
        <mu-text-field v-model="c_cont" multi-line :rows="7" :rows-max="10" full-width max-length="150" underline-color="rgba(139, 69, 19, .2)" placeholder="走起？" style="font-size:14px;">
        </mu-text-field>
      </mu-container>
    </div>

      <!-- <span style="font-size:12px; color:#9e9e9e;">{{ MeetingVenueObj.name }}</span> -->
      <!-- <mu-icon @click="chooseMeetingVenue" value="person_pin_circle" size="20" color="#009688"></mu-icon> -->

    <mu-flex v-if="AddrChooseWindowIsShow == false" style="width:100%; background:#eeeeee; padding:.5rem .5rem .5rem 1rem;" align-items="center">
      <mu-icon value="wallpaper" @click="addImg()"></mu-icon>

      <mu-icon @click="chooseMeetingVenue" value="person_pin_circle" size="23" style="margin-left:1rem;"></mu-icon>

      <mu-button @click="commentSubmit" small color="#00bcd4" style="margin-left:auto;">发表</mu-button>
      <input @change="getCommentImg" ref="imgUpload" type="file" style="display:none;" accept="image/*"/>
    </mu-flex>
    <mu-divider></mu-divider>
    
    <div style="padding:.5rem;">
      <span style="font-size:12px; color:#9e9e9e;">地点：{{ MeetingVenueObj.name }}</span>
    </div>

    <div style="margin-top:1rem; margin-left:.5rem; padding:1rem; position:relative; width:40%; overflow-y:auto; overflow-y:hidden;">
        <mu-icon v-show="this.c_img" @click="del_img" value="cancel" color="#e91e63" style="position:absolute; top:0; right:0;"></mu-icon>
        <img style="max-width:100%; max-height:100%; border-radius:.3rem;" :src="c_img" alt="">
    </div>

    <!-- BEGIN 地图弹出框 -->
    <div v-show="AddrChooseWindowIsShow" id="iframe" style="position:fixed; top:0; width:100%; height:100%; z-index:9999;">
      <mu-flex @click="shutdownWindow" style="width:10%; height:2.8rem; z-index:9999; position:fixed; top:0; left:0; background:#F8F8F8; text-align:center; padding: 0 0 0 .5rem;" align-items="center" justify-content="center">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-flex>
      <iframe class="map-item"  id="getAddress" @load="loadiframe" src="https://m.amap.com/picker/?key=8906f77f66bcbd2b82a57d844e270fe7" style="width:100%; height:100%; position: absolute; border:0;">
      </iframe>
    </div>
    <!-- END 地图弹出框 -->

  </div>
</template>

<script>
export default {
  data () {
    return {
      gameID: 0,
      c_cont: '',
      c_img: '',  // base64图片数据

      MeetingVenueObj: {
        name: '',
        lng: 0,
        lat: 0,
        addr: '',
      },

      AddrChooseWindowIsShow: false,  // 选择地址的窗口是否打开
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
        `/game/newComment`,
        {
          g_id: Number(this.gameID),
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

    chooseMeetingVenue () { // 集合地点
      // this.AddrChooseOperate = 1
      this.AddrChooseWindowIsShow = true
    },

    shutdownWindow () { // 关闭地图窗口
      this.AddrChooseWindowIsShow = false
    },

    loadiframe() {
      let iframe = document.getElementById('getAddress').contentWindow
      iframe.postMessage('hello', 'https://m.amap.com/picker/')
      window.addEventListener("message", function (e) {
        if (e.data.command != "COMMAND_GET_TITLE") {
          if(!!e.data.location === false) {
            return
          }
          console.log(e.data.location)
          let locationStrArr = e.data.location.split(',')
          let venueObj = {
            name: e.data.name,
            lng: Number(locationStrArr[0]),
            lat: Number(locationStrArr[1]),
            addr: e.data.address,
          }
          // 集合地点
          this.MeetingVenue = e.data.name
          this.MeetingVenueObj = venueObj

          // this.LocateAddr = e.data.name
          this.AddrChooseWindowIsShow = false
          //业务代码
          // this.$toast.message(e.data.name)
        }

      }.bind(this), false)
    },


    goBack () {
      this.$router.go(-1)
    },

  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
.body-fix{ position:fixed; }
</style>



