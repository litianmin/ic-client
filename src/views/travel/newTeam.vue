<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''" style="background:#ffffff;">

    <!-- END 头部 -->
    <mu-flex 
      class="gb-top-bar" 
      align-items="center">
      <mu-flex align-items="center" @click="$router.go(-1)">
        <svg-icon icon-class="goback" style="font-size:20px;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">创建旅游组队</span>
      </mu-flex>
    </mu-flex>

    <mu-container class="main-container">
      <!-- 心灵、朝圣、亲子、摄影、漂流、美食、滑雪、沙滩、踏青 -->
      <!-- 旅游主题 -->
      <mu-flex class="common-flex" align-items="center">
        <span class="common-title">旅游主题：</span>
        <select 
          v-model="TravelTheme" 
          class="common-select">
          <option value="1">心 灵</option>
          <option value="2">漂 流</option>
          <option value="3">摄 影</option>
          <option value="4">踏 青</option>
          <option value="5">美 食</option>
          <option value="6">亲 子</option>
          <option value="7">沙 滩</option>
          <option value="8">滑 雪</option>
          <option value="9">朝 圣</option>
        </select>

        <span class="common-right-title">旅游路程：</span>
        <select v-model="PathLength" class="common-select">
          <option value="1">周 边 游</option>
          <option value="2">长途旅行</option>
        </select>

      </mu-flex>

      <!-- 旅游路程、形式 -->
      <mu-flex class="common-flex" align-items="center">

        <span class="common-title">旅游形式：</span>
        <select v-model="TravelType" class="common-select">
          <option value="1">自 由 行</option>
          <option value="2">跟 团 游</option>
        </select>


        <span class="common-right-title">招募人数：</span>
        <select v-model="RecruitNumb" class="common-select">
          <option 
            v-for="(item, index) in RecruitNumbList" 
            :key="index" 
            :value="item.val">{{ item.name }}</option>
        </select>
      </mu-flex>

      <!-- 集合地点 -->
      <mu-flex class="addr-container" align-items="center">
        <span class="common-title">集合地点：</span>
        <span style="font-size:12px; color:#9e9e9e;">{{ MeetingVenue }}</span>
        <mu-icon 
          @click="chooseMeetingVenue" 
          value="person_pin_circle" 
          size="20" 
          color="#009688"></mu-icon>
      </mu-flex>


      <mu-row style="padding: 0 1.5rem 0 0;">
        <mu-date-input 
          v-model="MeetingTime" 
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

      <!-- 详细说明 -->
      <mu-flex class="common-flex" align-items="start">
        <span class="common-title">简单描述：</span>
        <textarea 
          v-model="TravelDetail" 
          class="cont-textarea" 
          placeholder="请填写下旅游的内容，招募你的伙伴吧！(限200个字符)">
        </textarea>
      </mu-flex>

      <!-- 招募图片 -->
      <mu-flex style="width:100%; margin-bottom:.5rem;" align-items="start">
        <span class="recruit-img">招募图片：</span>
        <ImgCropper 
          @getImgURL="getRecruitImg" 
          @delImg="delRecruitImg"
          ImgWidth="177px" 
          ImgHeight="100px" 
          BorderColor="#e0e0e0"></ImgCropper>
      </mu-flex>

    </mu-container>

    <!-- 路线、活动内容 -->
    <mu-container class="line-container">
      <span class="line-title">路线/活动时间线：</span>
      <div class="demo-vsteper-container">
        <mu-stepper 
          :active-step="VactiveStep" 
          orientation="vertical" 
          style="margin-bottom:1rem;">

          <mu-step v-for="(item, index) in StepList" :key="index">
            <mu-step-label>
              {{ item.addrOrProgram.length == 0 ? '地点/活动' : item.addrOrProgram }}
            </mu-step-label>
            <mu-step-content>

              <mu-flex class="line-addr-flex" align-items="center">
                <span class="line-common-span ">地点/活动：</span>
                <input 
                  maxlength="20" 
                  v-model="item.addrOrProgram" 
                  class="line-addr-input" 
                  type="text" 
                  placeholder="（不超过20个字符）">
              </mu-flex>

              <mu-flex class="line-common-container" align-items="start">
                <span class="line-common-span ">内容描述： </span>
                <textarea 
                  v-model="item.travelDesc" 
                  class="line-cont-textarea" 
                  placeholder="填写下此处的活动的内容吧！">
                </textarea>
              </mu-flex>

              <!-- 添加图片 -->
              <mu-flex class="line-common-container" align-items="start">
                <span class="line-common-span">展示图片： </span>
                <mu-flex 
                  class="line-img-container" 
                  justify-content="center" 
                  align-items="center">
                  <mu-icon 
                    v-show="item.descImg.length > 0" 
                    @click="delImg(index)" 
                    value="cancel" 
                    color="#f06292" 
                    style="position:absolute; top:-.8rem; right:-.8rem;"></mu-icon>
                  <mu-icon 
                    @click="addImg(index)" 
                    v-show="item.descImg.length == 0" 
                    value="add" 
                    size="40" 
                    color="#e0e0e0"></mu-icon>
                  <img class="line-img" :src="item.descImg">
                </mu-flex>
              </mu-flex>

              <mu-button 
                v-if="index > 0" 
                class="demo-step-button" 
                @click="vhandlePrev" 
                color="#00bcd4" 
                small>上一个</mu-button>
              <mu-button 
                class="demo-step-button" 
                @click="vhandleNext(index)" 
                color="#00bcd4" 
                small>下一个</mu-button>
              <mu-button 
                class="demo-step-button" 
                @click="vhandleFinished" 
                color="#00bcd4" 
                small>完成</mu-button>
            </mu-step-content>
          </mu-step>

        </mu-stepper>

        <input @change="getImgList" ref="imgUpload" type="file" style="display:none;" multiple accept="image/*"/>

        <mu-flex v-if="vfinished" justify-content="start" style="padding: 0 0 0 2.5rem;">
          <span>
            已完成！<span style="color:#009688;" @click="vreset">点击重置</span>
          </span>
        </mu-flex>
      </div>
    </mu-container>

    <mu-flex class="submit-container" justify-content="center">
      <mu-button @click="submit" style="width:95%;" color="#00bcd4">
        <mu-icon value="touch_app" size="14"></mu-icon>
        <span style="margin-left:.5rem;">发起组队</span>
      </mu-button>
    </mu-flex>

    <!-- BEGIN 地图弹出框 -->
    <div v-show="AddrChooseWindowIsShow" id="iframe" style="position:fixed; z-index:10000; top:0; width:100%; height:100%;">
      <mu-flex 
        @click="shutdownWindow" 
        class="map-container" 
        align-items="center" 
        justify-content="center">
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
      VactiveStep: 0,
      TravelTheme: 1,
      PathLength: 1,
      TravelType: 1,
      TravelDetail: '',
      RecruitNumb: 0, // 招募人数
      RecruitNumbList: [{val: 0, name: '不限'}],  // 招募人数的列表
      MeetingVenue: '', // 聚会地点
      RecruitImg: '',
      MeetingVenueObj: {
        name: '',
        lng: 0,
        lat: 0,
        addr: '',
      },
      MeetingTime: new Date, // 活动开始时间
      StepList: [
        {addrOrProgram: '', travelDesc: '', descImg: '', descImgURL: ''},
      ],
      HadAddImg: 0,
      ClickAddImgIndex: 0,
      AddrChooseWindowIsShow: false,  // 选择地址的窗口是否打开
      Lng: 0,
      Lat: 0,
    }
  },
  mounted () {
    let userAddrInfo = utils.getLocationInfo()
    this.Lng = userAddrInfo.lng
    this.Lat = userAddrInfo.lat
    this.MeetingVenueObj = {
      name: userAddrInfo.name,
      lng: userAddrInfo.lng,
      lat: userAddrInfo.lat,
      addr: userAddrInfo.addr,
    }

    for(let i = 1; i < 30; i++) {
      this.RecruitNumbList.push({val: i, name: `${i} 人`})
    }
  },
  computed: {
    vfinished () {
      return this.VactiveStep == (this.StepList.length + 1)
    }
  },
  methods: {
    vhandleNext (index) {  // 步骤下一步
      // 判断活动或者地点是否为空
      if(this.StepList[index].addrOrProgram == '') {
        this.$toast.info('地点/活动 不能为空，如果没有内容请点击完成')
        return
      }

      // 往StepList添加数据
      if(index == this.StepList.length - 1) {
        let item = {
          addrOrProgram: '', 
          travelDesc: '', 
          descImg: '', 
          descImgURL: ''
        }
        this.StepList.push(item)
      }
      this.VactiveStep++
    },

    vhandlePrev () {  // 步骤上一步
      this.VactiveStep--
    },

    vreset () { // 步数重置
      this.VactiveStep = 0
    },

    vhandleFinished () {
      this.VactiveStep = this.StepList.length + 1
    },

    getRecruitImg (imgURL) {  // 获取招募图片
      this.RecruitImg = imgURL
    },

    delRecruitImg () {  // 删除招募图片
      this.RecruitImg = ''
    },

    addImg (index) {
      this.ClickAddImgIndex = index
      this.$refs.imgUpload.click()
    },

    getImgList () {  // 获取图片
      let event = event || window.event
      let file = event.target.files[0]
      imgCompress(file, this.imgHadChoose, 'travel', this.ClickAddImgIndex) // 图片处理
    },

    imgHadChoose (res, index, imgURL) {
      this.StepList[index].descImg = res
      this.StepList[index].descImgURL = imgURL
      this.HadAddImg++
    },

    delImg (index) {
      this.StepList[index].descImg = ''
      this.HadAddImg--
    },


    chooseMeetingVenue () { // 集合地点
      this.AddrChooseOperate = 1
      this.AddrChooseWindowIsShow = true
    },

    shutdownWindow () { // 关闭地图窗口
      this.AddrChooseWindowIsShow = false
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
          // 集合地点
          that.MeetingVenue = e.data.name
          that.MeetingVenueObj = venueObj
          that.AddrChooseWindowIsShow = false
      }
    },

    loadiframe() {  // 加载地图选择框
      let iframe = document.getElementById('getAddress').contentWindow
      iframe.postMessage('hello', 'https://m.amap.com/picker/')
      window.addEventListener("message", this.chooseAddrDeal, false)
    },

    submit () {
      let theme = Number(this.TravelTheme)  // 主题
      let pathLength = Number(this.PathLength) // 旅游路程
      let travelType = Number(this.TravelType) // 旅游的形式
      let recruitNumb = Number(this.RecruitNumb) //招募人数
      let meetingSite = this.MeetingVenueObj // 集合地点
      let meetingTime = Date.parse(this.MeetingTime.toString()) / 1000  // 见面的时间
      let cont = this.TravelDetail // 详细说明
      let recruitImg = this.RecruitImg
      let stepList = this.StepList // 路线活动地点

      // 现在来进行数据的验证
      if(meetingSite.addr == '') {
        this.$toast.info('集合地点不能为空')
        return
      }

      if(stepList[0].addrOrProgram == '') {
        stepList = []
      }

      for(let i = 0; i < stepList.length; i++) {
        // 检验最后一个是否为空对象, 直接抛出去
        if(i == (stepList.length - 1) && stepList[i].addrOrProgram == '') {
          stepList.pop()
        }
        stepList[i].descImg = stepList[i].descImgURL
        delete stepList[i].descImgURL
      }

      // 开始提交数据
      this.$axios.post(
        '/travel/newTeam',
        {
          theme,
          pathLength,
          travelType,
          recruitNumb,
          meetingSite,
          meetingTime,
          cont,
          recruitImg,
          stepList,
        }
      ).then((resp)=>{
        if(resp.data.code == 20000) {
          let newTeamID = resp.data.msg
          this.$toast.success('成功创建组队！')
          this.$router.replace(`/travel/teamDetail/${newTeamID}`)
        }else{
          this.$toast.info('创建组队失败')
        }
        // console.log(resp)
      })

    },
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }


.main-container {
  padding:1rem .8rem; 
  margin-top:2.5rem;
}

.common-flex {
  width:100%; 
  margin-bottom:1rem;
}

.common-title {
  font-size:13px; 
  color:#795548; 
  margin-right:.5rem;
}

.common-right-title {
  font-size:13px; 
  color:#795548; 
  margin-left:2.5rem;
}

.common-select {
  padding:.1rem .5rem; 
  color:#424242; 
  appearance:none; 
  background:#fff; 
  font-size:12px; 
  border-radius:.2rem; 
  border:1px solid #bdbdbd;
}

.addr-container {
  width:100%; 
  margin-bottom:1rem; 
  margin-top:1rem;
}

.cont-textarea {
  width:75%; 
  height:4.5rem; 
  border:1px solid #bdbdbd; 
  color:#212121; 
  font-size:12px; 
  padding:.4rem; 
  border-radius:.2rem;
}

.recruit-img {
  font-size:13px; 
  color:#795548; 
  margin-right:.5rem; 
  margin-top:.3rem;
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

.line-container {
  padding: 0 .8rem 0 0; 
  margin-bottom:4rem;
}

.line-title {
  letter-spacing:1px; 
  font-size:13px; 
  color:#795548; 
  margin-right:.5rem; 
  margin-left:.5rem;
}

.line-addr-flex {
  width:100%; 
  margin-bottom:.5rem; 
  margin-top:.5rem;
}

.line-common-span {
  font-size:12px; 
  color:#795548; 
  margin-right:.5rem;
}

.line-common-container {
  width:100%; 
  margin-bottom:1rem; 
  margin-top:1rem;
}

.line-addr-input {
  padding:.3rem; 
  width:70%; 
  font-size:12px; 
  border-radius:.2rem; 
  border:1px solid #e0e0e0; 
  color:#212121;
}

.line-cont-textarea {
  width:72%; 
  height:3.5rem; 
  border:1px solid #e0e0e0; 
  color:#212121; 
  font-size:12px; 
  padding:.4rem; 
  border-radius:.2rem;
}

.line-img-container {
  width:50%; 
  height:4rem; 
  padding:.5rem; 
  position:relative; 
  border:1px solid #e0e0e0; 
  border-radius:.3rem;
}

.line-img {
  max-width:100%; 
  max-height:4rem; 
  border-radius:.3rem;
}

.demo-vsteper-container{
  max-width: 100%;
  margin-top:.5rem;
  padding: 0 0 0 .5rem;
}

.demo-step-content {
  margin: 0  16px;
}

.demo-step-button {
  font-size: 12px;
  margin-top: 1rem;
  margin-right: .5rem;
}

.map-item { position: fixed; width: 100%; height: 100%; top: 0; background: #fff; }

.body-fix{ position:fixed; }
</style>

