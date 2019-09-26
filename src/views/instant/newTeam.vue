<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''" style="">
    <!-- 导航条 -->
    <mu-flex 
      style="padding:.6rem .8rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0 0 1px #26c6da;" 
      align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">创建即时组队</span>
      </mu-flex>
    </mu-flex>

    <!-- 评论内容最多200个字符，最多一张图片 -->
    <div style="background:#fff;">
      <mu-container style="width:100%; height:100%; border-radius:.5rem; padding:.5rem .5rem 0 .5rem;">
        <mu-text-field v-model="TeamDetail" multi-line :rows="7" :rows-max="10" full-width max-length="150" underline-color="rgba(139, 69, 19, .2)" placeholder="走起？" style="font-size:14px;">
        </mu-text-field>
      </mu-container>
    </div>

    <mu-flex @click="chooseMeetingVenue" style="padding:.5rem;" align-items="center">
      <span style="font-size:13px; color:#795548; margin-right:.5rem;">相约地点：</span>
      <svg-icon icon-class="locate-green" style="size:22px;"></svg-icon>
      <span style="font-size:13px; color:#9e9e9e;">{{ VenueObj.name }}</span>
    </mu-flex>

    <!-- 招募图片 -->
    <mu-flex style="padding:.5rem; width:100%; margin-bottom:1rem;" align-items="start">
      <span style="font-size:13px; color:#795548; margin-right:.5rem; margin-top:.3rem;">招募图片：</span>
      <ImgCropper 
        @getImgURL="getRecruitImg($event)" 
        @delImg="delRecruitImg"
        ImgWidth="250px" 
        ImgHeight="140px" 
        BorderColor="#e0e0e0"></ImgCropper>
    </mu-flex>


    <mu-flex v-if="AddrChooseWindowIsShow == false" style="position:fixed; width:100%; bottom:0; left:0; background:#f5f5f5; padding:.5rem .1rem; border-top:1px solid #eeeeee; " justify-content="center">
      <mu-button @click="submit" style="width:95%;" color="#00bcd4">
        <mu-icon value="touch_app" size="14"></mu-icon>
        <span style="margin-left:.5rem;">发起招募</span>
      </mu-button>
    </mu-flex>

    <!-- BEGIN 地图弹出框 -->
    <div v-show="AddrChooseWindowIsShow" id="iframe" style="position:fixed; top:0; width:100%; height:100%; z-index:9999;">
      <mu-flex @click="shutdownWindow" style="width:10%; height:2.8rem; z-index:9999; position:fixed; top:0; left:0; background:#F8F8F8; text-align:center; padding: 0 0 0 .5rem;" align-items="center" justify-content="center">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-flex>
      <iframe 
        class="map-item"  
        id="getAddress" 
        @load="loadiframe" 
        :src="'https://m.amap.com/picker/?key=8906f77f66bcbd2b82a57d844e270fe7&center='+Lng+','+Lat" 
        style="width:100%; height:100%; position: absolute; border:0;">
      </iframe>
    </div>
    <!-- END 地图弹出框 -->

  </div>
</template>

<script>
import utils from '@/common/utils.js'
import ImgCropper from '@/components/ImgCropper'
export default {
  components: {
    ImgCropper
  },
  data () {
    return {
      TeamDetail: '',
      DisplayImg: '',  // base64图片数据

      VenueObj: {
        name: '',
        lng: 0,
        lat: 0,
        addr: '',
      },
      Lng: 0,
      Lat: 0,
      AddrChooseWindowIsShow: false,  // 选择地址的窗口是否打开
    }
  },
  mounted () {
    let locateInfo = utils.getLocationInfo()
    this.Lng = locateInfo.lng
    this.Lat = locateInfo.lat
  },
  methods: {
    getRecruitImg (imgURL) {  // 获取招募图片
      this.DisplayImg = imgURL
    },

    delRecruitImg () {  // 删除招募图片
      this.DisplayImg = ''
    },

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
          _this.DisplayImg = e.target.result
      }
      reader.readAsDataURL(file)
    },
    del_img () {
      this.DisplayImg = ''
    },
    submit () {
      if(this.TeamDetail.length == 0 && this.DisplayImg.length == 0) {
        this.$toast.message('内容不能为空！')
        return
      }
      this.$axios.post(
        `/instant/newTeam`,
        {
          cont: this.TeamDetail,
          displayImg: this.DisplayImg,
          venue: this.VenueObj
        }
      ).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }

        this.$toast.success('发表成功')
        this.$router.replace(`/instant/detail/${resp.data.msg}`)
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
          this.VenueObj = venueObj

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
.map-item { position: fixed; width: 100%; height: 100%; top: 0; background: #fff; }
</style>



