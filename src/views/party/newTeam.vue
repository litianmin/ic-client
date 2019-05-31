<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''" style="background:#ffffff;">
    <!-- 导航条 -->
    <mu-appbar class="mine-appbar" color="#00bcd4" z-depth="1">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        创建party组队
      </div>
    </mu-appbar>

    <!-- 内容：招募图片，最多三张， -->
    <!-- 招募图片（最多三张）、主题、 活动主要内容、
    活动地点、集合地点、活动时间、招募人数、队友偏爱、招募宣言、 -->

    <mu-container style="padding:1rem .5rem;">
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">活动主题：</span>
        <select v-model="PartyTheme" name="partyTitle" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; ">
          <option value="0">普通聚会</option>
          <option value="1">节日聚会</option>
          <option value="2">健身运动</option>
          <option value="3">随便逛逛</option>
          <option value="4">线下手游</option>
          <option value="5">野外聚餐</option>
          <option value="6">音乐派对</option>
          <option value="7">单身派对</option>
          <option value="8">联谊聚会</option>
        </select>
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">活动标题：</span>
        <input maxlength="15" v-model="PartyTitle" style="padding:.4rem; width:70%; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; color:#212121;" type="text" placeholder="一起来玩吧！（不超过15个字符）">
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="start">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">详细内容：</span>
        <textarea v-model="PartyDetail" style="width:75%; height:7rem; border:1px solid #80cbc4; color:#212121; font-size:12px; padding:.4rem; border-radius:.2rem;" placeholder="大家来这里一起玩吧，出来走走也好！（活动的详细内容）">
        </textarea>
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">队友偏爱：</span>
        <input v-model="TeammatePrefer" style="padding:.4rem; width:70%; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; color:#212121;" type="text" placeholder="随便来！ （不超过15个字符）">
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">招募人数：</span>
        <select v-model="RecruitNumb" name="" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; text-align:center;">
          <option v-for="(item, index) in RecruitNumbList" :key="index" :value="item">{{ item }} 人</option>
        </select>
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:.5rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">活动地点：</span>
        <span style="font-size:12px; color:#9e9e9e;">{{ PartyVenue }}</span>
        <mu-icon @click="choosePartyAddr" value="person_pin_circle" size="20" color="#009688"></mu-icon>
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:1rem; margin-top:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">集合地点：</span>
        <span style="font-size:12px; color:#9e9e9e;">{{ MeetingVenue }}</span>
        <mu-icon @click="chooseMeetingVenue" value="person_pin_circle" size="20" color="#009688"></mu-icon>
      </mu-flex>

      <mu-row>
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">活动时间：</span>
      </mu-row>
      <mu-row style="width:100%; margin-top:-1.5rem; margin-bottom:1rem; padding:.5rem 1rem 0 4rem;" align-items="end">
        <mu-row style="padding:.2rem 0 0 0; border-radius:.2rem; border:1px solid #80cbc4;">
          <mu-date-input v-model="BeginTime" type="dateTime"  prefix="开始时间：" style="font-size:12px;" landscape container="bottomSheet" clock-type="24hr" view-type="clock" actions icon="today"></mu-date-input>
          <mu-date-input v-model="EndTime" type="dateTime" prefix="结束时间：" style="font-size:12px;" landscape container="bottomSheet" clock-type="24hr" view-type="clock" actions icon="today"></mu-date-input>
        </mu-row>
      </mu-row>

      <!-- 上传图片 -->
      <mu-flex style="width:100%; margin-bottom:.5rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">招募图片：（最多三张）</span>
      </mu-flex>
      <mu-flex align-items="center" justify-content="around" style="margin-top:1rem; border:1px solid #80cbc4; border-radius:.3rem; padding:1rem .5rem;">
        <mu-flex v-for="(item, index) in UploadImgList" :key="index" style="width:30%; height:8rem; padding:1rem; position:relative; border:1px solid #e0e0e0; border-radius:.3rem; " justify-content="center" align-items="center">
            <mu-icon @click="delImg(index)" value="cancel" color="#f06292" style="position:absolute; top:0; right:0;"></mu-icon>
            <img style="max-width:100%; max-height:100%; border-radius:.3rem;" :src="item" alt="">
        </mu-flex>
        <mu-flex v-if="CouldAddImg" @click="addImg()" style="width:30%; height:8rem; padding:1rem; position:relative; border:1px solid #e0e0e0; border-radius:.3rem;" justify-content="center" align-items="center">
            <mu-icon value="add" size="40" color="#e0e0e0" style=""></mu-icon>
        </mu-flex>
        <input @change="getImgList" ref="imgUpload" type="file" style="display:none;" multiple accept="image/*"/>
      </mu-flex>

      <!-- 提交按钮 -->
      <mu-flex align-items="center" justify-content="center" style=" width:100%; margin-top:1.5rem;">
        <mu-button @click="submit" style="width:100%;" color="#00bcd4">
          发起组队
        </mu-button>
      </mu-flex>

    </mu-container>

    <!-- BEGIN 地图弹出框 -->
    <div v-show="AddrChooseWindowIsShow" id="iframe" style="position:fixed; top:0; width:100%; height:100%;">
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
      PartyTheme: 0,  // 聚会的主题
      PartyTitle: '', // 聚会的标题
      PartyDetail: '',  // 聚会详细内容
      TeammatePrefer: '', // 队友偏爱
      RecruitNumb: 1, // 招募人数
      RecruitNumbList: [],  // 招募人数的列表
      AddrChooseWindowIsShow: false,  // 选择地址的窗口是否打开
      PartyVenue: '',  // 活动地点
      PartyVenueObj: {},
      MeetingVenue: '', // 聚会地点
      MeetingVenueObj: {},
      AddrChooseOperate: 0, // 0=>聚会地点， 1=>集合地点
      BeginTime: new Date, // 活动开始时间
      EndTime: undefined, // 活动结束时间
      UploadImgList: [],  // 招募图片
      CouldAddImg: true,  // 判断是否可以继续添加图片
    }
  },
  mounted () {
    for(let i = 1; i < 30; i++) {
      this.RecruitNumbList.push(i)
    }
    // 渲染聚会地点和集合地点
    this.PartyVenue = this.$store.state.mdeLogin.userAddrInfo.name
    this.PartyVenueObj = this.$store.state.mdeLogin.userAddrInfo
    this.MeetingVenue = this.$store.state.mdeLogin.userAddrInfo.name
    this.MeetingVenueObj = this.$store.state.mdeLogin.userAddrInfo
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
          if(this.AddrChooseOperate == 0) { 
            // 聚会地点
            this.PartyVenue = e.data.name
            this.PartyVenueObj = venueObj
          }else{  
            // 集合地点
            this.MeetingVenue = e.data.name
            this.MeetingVenueObj = venueObj
          }

          // this.LocateAddr = e.data.name
          this.AddrChooseWindowIsShow = false
          //业务代码
          // this.$toast.message(e.data.name)
        }

      }.bind(this), false)
    },
    choosePartyAddr () { // 点击选择地址的时候，弹出地址选择窗口
      this.AddrChooseOperate = 0
      this.AddrChooseWindowIsShow = true
    },
    chooseMeetingVenue () { // 集合地点
      this.AddrChooseOperate = 1
      this.AddrChooseWindowIsShow = true
    },
    shutdownWindow () { // 关闭地图窗口
      this.AddrChooseWindowIsShow = false
    },
    addImg () {
      this.$refs.imgUpload.click()
    },
    getImgList () {  // 获取评论图片
      var _this = this
      var event = event || window.event

      for(let i = 0; i < event.target.files.length; i++) {
        var file = event.target.files[i]
        if(file.size > 1024 * 1024 * 3) {
          this.$toast.message('图片上传最大为2M')
          continue
        }
        var reader = new FileReader()
        //转base64
        reader.onload = function(e) {
          if(_this.UploadImgList.length < 3) {
            _this.UploadImgList.push(e.target.result)
            // reader.readAsDataURL(file)
          }
        }
        reader.readAsDataURL(file)
      }
    },
    delImg (index) {
      this.UploadImgList.splice(index, 1)
    },
    submit () {
      let partyTheme = Number(this.PartyTheme)  // 主题
      let partyTitle = this.PartyTitle  // 活动主题
      let partyDetail = this.PartyDetail   // 聚会详细内容
      let teammatePrefer = this.TeammatePrefer  // 队友偏爱
      let recruitNumb = Number(this.RecruitNumb)  //招募的人数
      let partyVenue  = this.PartyVenueObj // 活动地点
      let meetingVenue = this.MeetingVenueObj  // 集合地点
      let partyBeginTime = 0 // 活动开始时间
      let partyEndTime = 0 // 活动结束时间
      let uploadImgList = this.UploadImgList  // 招募图片列表

      if(!!this.EndTime === true) {
        partyEndTime = Date.parse(this.EndTime.toString()) / 1000
      }
      partyBeginTime = Date.parse(this.BeginTime.toString()) / 1000


      // console.log(this.MeetingVenueObj)
      // console.log(this.PartyVenueObj)

      this.$axios.post('/party/newTeam', {
          partyTheme,
          partyTitle,
          partyDetail,
          teammatePrefer,
          recruitNumb,
          partyVenue,
          meetingVenue,
          partyBeginTime,
          partyEndTime,
          uploadImgList,
        }
      ).then((resp)=>{
        if(resp.data.code === 20000) {
          this.$toast.success('创建成功') // 这里应该跳转到组队详情了
          this.$router.push('/party/list')
        }
      })

    },
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }

.map-item { position: fixed; width: 100%; height: 100%; top: 0; background: #fff; }

.body-fix{ position:fixed; }
</style>


