<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''" style="background:#fff;">

    <!-- 导航条 -->
    <mu-flex 
      class="gb-top-bar" 
      align-items="center">
      <mu-flex align-items="center" @click="$router.go(-1)">
        <svg-icon icon-class="goback" style="font-size:20px;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">创建party组队</span>
      </mu-flex>
    </mu-flex>


    <mu-container class="main-container">
      <mu-flex class="theme-choose-flex" align-items="center">
        <span class="theme-title">活动主题：</span>
        <select 
          v-model="Theme" 
          name="partyTitle" 
          class="select-style">
          <option :value="1">普通聚会</option>
          <option :value="2">节日聚会</option>
          <option :value="3">健身运动</option>
          <option :value="4">随便逛逛</option>
          <option :value="5">线下手游</option>
          <option :value="6">野外聚餐</option>
          <option :value="7">音乐派对</option>
          <option :value="8">单身派对</option>
          <option :value="9">联谊聚会</option>
        </select>
      </mu-flex>

      <mu-flex class="meetingsite-container" align-items="center">
        <span class="title-common">聚会地点：</span>
        <span class="site-span">{{ PartyVenue }}</span>
        <mu-icon 
          @click="AddrChooseWindowIsShow = true" 
          value="person_pin_circle" 
          size="20" 
          color="#009688"></mu-icon>
      </mu-flex>

      <mu-flex class="detail-container" align-items="start">
        <span class="detail-title">聚会内容：</span>
        <textarea 
          v-model="Cont" 
          class="detail-input" 
          placeholder="请填写下聚会的内容，招募你的伙伴吧！(限200个字符)">
        </textarea>
      </mu-flex>

      <mu-flex 
        class="recruitnumb-container" 
        align-items="center">
        <span class="title-common">招募人数：</span>
        <select 
          v-model="RecruitNumb" 
          class="recruitnumb-select">
          <option 
            v-for="(item, index) in RecruitNumbList" 
            :key="index" 
            :value="item.val">{{ item.name }}</option>
        </select>
      </mu-flex>

      <mu-row style="padding: 0 1.5rem 0 0;">
        <mu-date-input 
          v-model="BeginTime" 
          type="dateTime"  
          prefix="活动开始时间：" 
          style="font-size:13px;" 
          landscape 
          full-width 
          container="bottomSheet" 
          clock-type="24hr" 
          view-type="clock">
          <span slot="prepend" style="padding: 0 .5rem 0 0;">
            <svg-icon icon-class="date" style="font-size:20px;"></svg-icon>  
          </span>
        </mu-date-input>

      </mu-row>

      <!-- 招募图片 -->
      <mu-flex class="flex-common" align-items="start">
        <span class="recruitimg-span">招募图片：</span>
        <ImgCropper 
          @getImgURL="getRecruitImg" 
          @delImg="delRecruitImg"
          ImgWidth="177px" 
          ImgHeight="100px" 
          BorderColor="#e0e0e0"></ImgCropper>
      </mu-flex>


      <!-- 上传展示图片 -->
      <mu-flex class="flex-common" align-items="center" style="margin-top:1rem;">
        <span class="title-common">展示图片：（最多三张）</span>
      </mu-flex>

      <mu-flex 
        align-items="center" 
        justify-content="around" 
        class="displayimg-container">
        <mu-flex 
          v-for="(item, index) in UploadImgList" 
          :key="index" 
          class="displayimg-flex" 
          justify-content="center" 
          align-items="center">
            <mu-icon 
              @click="delImg(index)" 
              value="cancel" 
              color="#f06292" 
              style="position:absolute; top:0; right:0;"></mu-icon>
            <img class="displayimg" :src="item" />
        </mu-flex>
        <mu-flex 
          v-if="CouldAddImg" 
          @click="addImg()" 
          class="displayimg-flex"
          justify-content="center" 
          align-items="center">
          <mu-icon value="add" size="40" color="#e0e0e0" style=""></mu-icon>
        </mu-flex>
        <input 
          @change="getImgList" 
          ref="imgUpload" 
          type="file" 
          style="display:none;" 
          multiple 
          accept="image/*"/>
      </mu-flex>

      <mu-flex class="submit-container" justify-content="center">
        <mu-button @click="submit" style="width:95%;" color="#00bcd4">
          <mu-icon value="touch_app" size="14"></mu-icon>
          <span style="margin-left:.5rem;">发起组队</span>
        </mu-button>
      </mu-flex>

    </mu-container>

    <!-- BEGIN 地图弹出框 -->
    <div 
      v-show="AddrChooseWindowIsShow" 
      id="iframe" style="position:fixed; z-index:10000; top:0; width:100%; height:100%;">
      <mu-flex @click="shutdownWindow" class="map-container" align-items="center" justify-content="center">
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
import { imgCompress } from '@/common/imgDeal.js'
export default {
  components: {
    ImgCropper
  },
  data () {
    return {
      Theme: 1,  // 聚会的主题
      AddrChooseWindowIsShow: false,  // 选择地址的窗口是否打开
      PartyVenue: '',  // 活动地点
      PartyVenueObj: {},
      Cont: '',  // 聚会详细内容
      RecruitNumb: 0, // 招募人数
      RecruitNumbList: [{val: 0, name: '不限'}],  // 招募人数的列表
      BeginTime: undefined, // 活动开始时间
      UploadImgList: [],  // 展示图片
      UploadImgURLList: [], // 展示图片的URL
      CouldAddImg: true,  // 判断是否可以继续添加图片
      RecruitImg: '',  // 招募图片
      Lng: 0,
      Lat: 0,
    }
  },
  mounted () {
    let userAddrInfo = utils.getLocationInfo()
    this.Lng = userAddrInfo.lng
    this.Lat = userAddrInfo.lat

    for(let i = 1; i < 30; i++) {
      this.RecruitNumbList.push({val: i, name: `${i} 人`})
    }

    // 渲染聚会地点和集合地点
    this.PartyVenue = userAddrInfo.name
    this.PartyVenueObj = {
      name: userAddrInfo.name,
      lng: userAddrInfo.lng,
      lat: userAddrInfo.lat,
      addr: userAddrInfo.addr,
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

    chooseAddrDeal (e) {  // 选择地址处理
      let that = this

      if (e.data.location != undefined) {
        let locationStrArr = e.data.location.split(',')
        let venueObj = {
          name: e.data.name,
          lng: Number(locationStrArr[0]),
          lat: Number(locationStrArr[1]),
          addr: e.data.address,
        }
        that.PartyVenue = e.data.name
        that.PartyVenueObj = venueObj

        that.AddrChooseWindowIsShow = false
      }
    },

    loadiframe() {  // 加载地图选择框
      let iframe = document.getElementById('getAddress').contentWindow
      iframe.postMessage('hello', 'https://m.amap.com/picker/')
      window.addEventListener("message", this.chooseAddrDeal, false)
    },

    shutdownWindow () { // 关闭地图窗口
      this.AddrChooseWindowIsShow = false
    },

    getRecruitImg (imgURL) {  // 获取招募图片
      this.RecruitImg = imgURL
    },

    delRecruitImg () {  // 删除招募图片
      this.RecruitImg = ''
    },

    addImg () {
      this.$refs.imgUpload.click()
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

    delImg (index) {
      this.UploadImgList.splice(index, 1)
      this.UploadImgURLList.splice(index, 1)
    },

    submit () {

      let theme = this.Theme
      let cont = this.Cont
      let numb = this.RecruitNumb
      let site = this.PartyVenueObj
      let beginTime = this.BeginTime
      let recruitImg = this.RecruitImg
      let displayImgs = this.UploadImgURLList

      if (cont.length == 0) {
        this.$toast.info('聚会内容不能为空噢')
        return
      }

      if (!!beginTime === false) {
        this.$toast.info('请选择活动开始时间')
        return
      }

      if (recruitImg.length == 0) {
        this.$toast.info('招募图片不能为空哟')
        return
      }

      beginTime = Date.parse(beginTime.toString()) / 1000



      this.$axios.post('/party/newTeam', {
          theme,
          cont,
          numb,
          site,
          beginTime,
          recruitImg, 
          displayImgs
        }
      ).then((resp)=>{

        if(resp.data.code != 20000) {
          this.$toast.info(resp.data.msg)
          return
        }
        
        let newTeamID = resp.data.msg
        this.$toast.success('创建成功') // 这里应该跳转到组队详情了
        this.$router.replace(`/party/teamDetail/${newTeamID}`)
      })

    },
  }
}
</script>

<style scoped>

.main-container {
  padding:1rem .5rem; 
  margin-top:2.5rem;
}

.theme-choose-flex {
  width:100%; 
  margin-bottom:1rem;
}

.theme-title {
  font-size:13px; 
  color:#795548; 
  margin-right:.5rem;
}

.select-style {
  padding:.1rem .8rem; 
  color:#424242; 
  appearance:none; 
  background:#fff; 
  font-size:13px; 
  border-radius:.2rem; 
  border:1px solid #bdbdbd;
}

.detail-container {
  width:100%; 
  margin-bottom:1rem;
}

.detail-title {
  font-size:13px; 
  color:#795548; 
  margin-right:.5rem; 
  margin-top:.3rem;
}

.detail-input {
  width:75%; 
  height:4rem; 
  border:1px solid #bdbdbd; 
  color:#212121; 
  font-size:13px; 
  padding:.4rem; 
  border-radius:.2rem;
  letter-spacing: 1px;
}

.recruitnumb-container {
  width:100%; 
  margin-bottom:1rem;
}

.title-common {
  font-size:13px; 
  color:#795548; 
  margin-right:.5rem;
}

.recruitnumb-select {
  padding:.1rem .5rem; 
  color:#424242; 
  appearance:none; 
  background:#fff; 
  font-size:13px; 
  border-radius:.2rem; 
  border:1px solid #bdbdbd; 
  text-align:center;
}

.flex-common {
  width:100%; 
  margin-bottom:.5rem;
}

.site-span {
  font-size:12px; 
  color:#424242;
}

.meetingsite-container {
  width:100%; 
  margin-bottom:1rem; 
  margin-top:1rem;
}

.recruitimg-span {
  font-size:13px; 
  color:#795548; 
  margin-right:.5rem; 
  margin-top:.3rem;
}

.displayimg-container {
  margin-top:1rem; 
  margin-bottom:3rem; 
  border:1px solid #eeeeee; 
  border-radius:.3rem; 
  padding:1rem .5rem;
}

.displayimg-flex {
  width:30%; 
  height:6rem; 
  padding:1rem; 
  position:relative; 
  border:1px solid #e0e0e0; 
  border-radius:.3rem;
}

.displayimg {
  max-width:100%; 
  max-height:100%; 
  border-radius:.3rem;
}

.submit-container {
  position:fixed; 
  width:100%; 
  bottom:0; 
  left:0; 
  background:#f5f5f5; 
  padding:.5rem .1rem; 
  z-index:999; 
  border-top:1px solid #eeeeee;
}

.map-container {
  width:10%; 
  height:2.8rem; 
  z-index:9999; 
  position:fixed; 
  top:0; 
  left:0; 
  background:#F8F8F8; 
  text-align:center; 
  padding: 0 0 0 .5rem;
}

.map-item { position: fixed; width: 100%; height: 100%; top: 0; background: #fff; }

.body-fix{ position:fixed; }
</style>


