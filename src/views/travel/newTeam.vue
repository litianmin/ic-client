<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''" style="background:#ffffff;">
    <!-- BEGIN 头部 -->
    <mu-flex 
      style="padding:.6rem .8rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0 0 1px #26c6da;" 
      align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">创建旅游组队</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <mu-container style="padding:1rem .8rem;">
      <!-- 心灵、朝圣、亲子、摄影、漂流、美食、滑雪、沙滩、踏青 -->
      <!-- 旅游主题 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">旅游主题：</span>
        <select v-model="TravelTheme" name="partyTitle" id="" style="padding:.1rem .5rem; color:#424242; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #bdbdbd; ">
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
      </mu-flex>

      <!-- 旅游路程、形式 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">旅游路程：</span>
        <select v-model="PathLength" name="partyTitle" id="" style="padding:.1rem .5rem; color:#424242; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #bdbdbd; ">
          <option value="1">周 边 游</option>
          <option value="2">长途旅行</option>
        </select>

        <span style="font-size:13px; color:#795548; margin-left:2.5rem; margin-right:.5rem;">旅游形式：</span>
        <select v-model="TravelType" name="partyTitle" id="" style="padding:.1rem .5rem; color:#424242; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #bdbdbd; ">
          <option value="1">自 由 行</option>
          <option value="2">跟 团 游</option>
        </select>
      </mu-flex>

      <!-- 招募标题 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">招募标题：</span>
        <input maxlength="15" v-model="TravelTitle" style="padding:.4rem; width:70%; font-size:12px; border-radius:.2rem; border:1px solid #bdbdbd; color:#212121;" type="text" placeholder="一起来玩吧！（不超过15个字符）">
      </mu-flex>

      <!-- 招募人数 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">招募人数：</span>
        <select v-model="RecruitNumb" name="" id="" style="padding:.1rem .5rem; color:#424242; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #bdbdbd; text-align:center;">
          <option v-for="(item, index) in RecruitNumbList" :key="index" :value="item">{{ item }} 人</option>
        </select>
      </mu-flex>

      <!-- 集合地点 -->
      <mu-flex style="width:100%; margin-bottom:1rem; margin-top:1rem;" align-items="center">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">集合地点：</span>
        <span style="font-size:12px; color:#9e9e9e;">{{ MeetingVenue }}</span>
        <mu-icon @click="chooseMeetingVenue" value="person_pin_circle" size="20" color="#009688"></mu-icon>
      </mu-flex>

      <!-- 集合时间 -->
      <mu-date-input v-model="MeetingTime" type="dateTime"  prefix="集合时间：" style="font-size:12px;" landscape container="bottomSheet" clock-type="24hr" view-type="clock" full-width actions></mu-date-input>

      <!-- 详细说明 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="start">
        <span style="font-size:13px; color:#795548; margin-right:.5rem;">详细说明：</span>
        <textarea v-model="TravelDetail" style="width:75%; height:6rem; border:1px solid #bdbdbd; color:#212121; font-size:12px; padding:.4rem; border-radius:.2rem;" placeholder="大家来这里一起玩吧，出来走走也好！（活动的详细内容）">
        </textarea>
      </mu-flex>

      <!-- 招募图片 -->
      <mu-flex style="width:100%; margin-bottom:.5rem;" align-items="start">
        <span style="font-size:13px; color:#795548; margin-right:.5rem; margin-top:.3rem;">招募图片：</span>
        <ImgCropper 
          @getImgURL="getRecruitImg" 
          @delImg="delRecruitImg"
          ImgWidth="177px" 
          ImgHeight="100px" 
          BorderColor="#e0e0e0"></ImgCropper>
      </mu-flex>

    </mu-container>

    <!-- 路线、活动内容 -->
    <mu-container style="padding:0 .8rem 0 0; margin-bottom:4rem;">
      <span style="font-size:13px; color:#795548; margin-right:.5rem; margin-left:.5rem; ">路线/活动内容：</span>
      <div class="demo-vsteper-container">
        <mu-stepper :active-step="VactiveStep" orientation="vertical" style="margin-bottom:1rem;">

          <mu-step v-for="(item, index) in StepList" :key="index">
            <mu-step-label>
              地点/活动 <span style="font-size:12px; color:#4caf50;" v-if="item.addrOrProgram.length > 0">（{{ item.addrOrProgram }}）</span>
            </mu-step-label>
            <mu-step-content>

              <mu-flex style="width:100%; margin-bottom:.5rem; margin-top:.5rem;" align-items="center">
                <span style="font-size:12px; color:#795548; margin-right:.5rem;">地点/活动：</span>
                <input maxlength="15" v-model="item.addrOrProgram" style="padding:.4rem; width:70%; font-size:12px; border-radius:.2rem; border:1px solid #e0e0e0; color:#212121;" type="text" placeholder="（不超过20个字符）">
              </mu-flex>

              <mu-row style="width:100%; margin-top:.5rem;" align-items="end">
                <mu-date-input v-model="item.beginTime" type="dateTime"  prefix="开始时间：" style="font-size:12px;" landscape container="bottomSheet" clock-type="24hr" view-type="clock" actions ></mu-date-input>
                <mu-date-input v-model="item.endTime" type="dateTime" prefix="结束时间：" style="font-size:12px; margin-top:-1rem;" landscape container="bottomSheet" clock-type="24hr" view-type="clock" actions></mu-date-input>
              </mu-row>

              <mu-flex style="width:100%; margin-bottom:1rem; margin-top:-.5rem;" align-items="start">
                <textarea v-model="item.travelDesc" style="width:90%; height:5rem; border:1px solid #e0e0e0; color:#212121; font-size:12px; padding:.4rem; border-radius:.2rem;" placeholder="活动说明， 例如：大家来这里一起玩吧，出来走走也好！（活动的详细内容）">
                </textarea>
              </mu-flex>

              <!-- 添加图片 -->
              <mu-flex style="width:50%; height:4rem; padding:.5rem; position:relative; border:1px solid #e0e0e0; border-radius:.3rem;" justify-content="center" align-items="center">
                <mu-icon v-show="item.descImg.length > 0" @click="delImg(index)" value="cancel" color="#f06292" style="position:absolute; top:-.8rem; right:-.8rem;"></mu-icon>
                <mu-icon @click="addImg(index)" v-show="item.descImg.length == 0" value="add" size="40" color="#e0e0e0" style=""></mu-icon>
                <img style="max-width:100%; max-height:4rem; border-radius:.3rem;" :src="item.descImg" alt="">
              </mu-flex>

              <mu-button v-if="index > 0" class="demo-step-button" @click="vhandlePrev" color="#00bcd4" small>上一个</mu-button>
              <mu-button class="demo-step-button" @click="vhandleNext(index)" color="#00bcd4" small>下一个</mu-button>
              <mu-button class="demo-step-button" @click="vhandleFinished" color="#00bcd4" small>完成</mu-button>
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

    <mu-flex style="position:fixed; width:100%; bottom:0; left:0; background:#f5f5f5; padding:.5rem .1rem; z-index:999; border-top:1px solid #eeeeee;" justify-content="center">
      <mu-button @click="submit" style="width:95%;" color="#00bcd4">
        <mu-icon value="touch_app" size="14"></mu-icon>
        <span style="margin-left:.5rem;">发起组队</span>
      </mu-button>
    </mu-flex>

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
      TravelTitle: '',
      TravelDetail: '',
      RecruitNumb: 1, // 招募人数
      RecruitNumbList: [],  // 招募人数的列表
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
        {addrOrProgram: '', beginTime: undefined, endTime: undefined, travelDesc: '', descImg: '', descImgURL: ''},
      ],
      HadAddImg: 0,
      ClickAddImgIndex: 0,
      AddrChooseWindowIsShow: false,  // 选择地址的窗口是否打开
    }
  },
  mounted () {
    for(let i = 1; i < 30; i++) {
      this.RecruitNumbList.push(i)
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
        this.$toast.message('地点/活动 不能为空，如果没有内容请点击完成')
        return
      }

      // 往StepList添加数据
      if(index == this.StepList.length - 1) {
        let item = {addrOrProgram: '', beginTime: undefined, endTime: undefined, travelDesc: '', descImg: '', descImgURL: ''}
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
      if(this.HadAddImg > 2) {
        this.$toast.message('路线/地点列表最多只能添加三张图片')
        return
      } 
      this.ClickAddImgIndex = index
      this.$refs.imgUpload.click()
    },
    getImgList () {  // 获取评论图片
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
    goBack () {
      this.$router.go(-1)
    },
    chooseMeetingVenue () { // 集合地点
      this.AddrChooseOperate = 1
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
    submit () {
      let travelTheme = Number(this.TravelTheme)  // 主题
      let pathLength = Number(this.PathLength) // 旅游路程
      let travelType = Number(this.TravelType) // 旅游的形式
      let travelTitle = this.TravelTitle // 旅游标题
      let recruitNumb = Number(this.RecruitNumb) //招募人数
      let meetingVenue = this.MeetingVenueObj // 集合地点
      let meetingTime = Date.parse(this.MeetingTime.toString()) / 1000  // 见面的时间
      let travelDetail = this.TravelDetail // 详细说明
      let stepList = this.StepList // 路线活动地点

      // 现在来进行数据的验证
      if(meetingVenue.addr == '') {
        this.$toast.message('集合地点不能为空')
        return
      }

      if(stepList[0].addrOrProgram == '') {
        stepList = []
      }

      for(let i = 0; i < stepList.length; i++) {
        // 处理时间， 对象转换成时间戳
        if(!!stepList[i].beginTime === true) {
          stepList[i].beginTime = Date.parse(stepList[i].beginTime.toString()) / 1000
        }else{
          stepList[i].beginTime = 0
        }
        
        if(!!stepList[i].endTime === true) {
          stepList[i].endTime = Date.parse(stepList[i].endTime.toString()) / 1000
        }else{
          stepList[i].endTime = 0
        }

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
          travelTheme,
          pathLength,
          travelType,
          travelTitle,
          recruitNumb,
          meetingVenue,
          meetingTime,
          travelDetail,
          stepList,
        }
      ).then((resp)=>{
        if(resp.data.code == 20000) {
          let newTeamID = resp.data.msg
          this.$toast.success('成功创建组队！')
          this.$router.go(`/travel/teamDetail/${newTeamID}`)
        }else{
          this.$toast.message('创建组队失败')
        }
        // console.log(resp)
      })

    },
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }

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

