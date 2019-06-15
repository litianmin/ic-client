<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#03a9f4" z-depth="1">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        创建旅游组队
      </div>
    </mu-appbar>
    <!-- END 头部 -->

    <mu-container style="padding:1rem .8rem;">
      <!-- 心灵、朝圣、亲子、摄影、漂流、美食、滑雪、沙滩、踏青 -->
      <!-- 旅游主题 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">旅游主题：</span>
        <select v-model="TravelTheme" name="partyTitle" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; ">
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
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">旅游路程：</span>
        <select v-model="PathLength" name="partyTitle" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; ">
          <option value="1">周 边 游</option>
          <option value="2">长途旅行</option>
        </select>

        <span style="font-size:12px; color:#795548; margin-left:2.5rem; margin-right:.5rem;">旅游形式：</span>
        <select v-model="TravelType" name="partyTitle" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; ">
          <option value="1">自 由 行</option>
          <option value="2">跟 团 游</option>
        </select>
      </mu-flex>

      <!-- 招募标题 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">招募标题：</span>
        <input maxlength="15" v-model="TravelTitle" style="padding:.4rem; width:70%; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; color:#212121;" type="text" placeholder="一起来玩吧！（不超过15个字符）">
      </mu-flex>

      <!-- 招募人数 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">招募人数：</span>
        <select v-model="RecruitNumb" name="" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; text-align:center;">
          <option v-for="(item, index) in RecruitNumbList" :key="index" :value="item">{{ item }} 人</option>
        </select>
      </mu-flex>

      <!-- 集合地点 -->
      <mu-flex style="width:100%; margin-bottom:1rem; margin-top:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">集合地点：</span>
        <span style="font-size:12px; color:#9e9e9e;">{{ MeetingVenue }}</span>
        <mu-icon value="person_pin_circle" size="20" color="#009688"></mu-icon>
      </mu-flex>

      <!-- 集合时间 -->
      <mu-date-input v-model="MeetingTime" type="dateTime"  prefix="集合时间：" style="font-size:12px;" landscape container="bottomSheet" clock-type="24hr" view-type="clock" full-width actions></mu-date-input>

      <!-- 详细说明 -->
      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="start">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">详细说明：</span>
        <textarea v-model="TravelDetail" style="width:75%; height:7rem; border:1px solid #80cbc4; color:#212121; font-size:12px; padding:.4rem; border-radius:.2rem;" placeholder="大家来这里一起玩吧，出来走走也好！（活动的详细内容）">
        </textarea>
      </mu-flex>

    </mu-container>

    <!-- 路线、活动内容 -->
    <mu-container style="padding:0 .8rem 0 0; margin-bottom:1rem;">
      <span style="font-size:12px; color:#795548; margin-right:.5rem; margin-left:.5rem; ">路线/活动内容：</span>
      <div class="demo-vsteper-container">
        <mu-stepper :active-step="VactiveStep" orientation="vertical" style="margin-bottom:1rem;">

          <mu-step v-for="(item, index) in StepList" :key="index">
            <mu-step-label>
              地点/活动 <span style="font-size:12px; color:#4caf50;" v-if="item.meetingVenue.length > 0">（{{ item.meetingVenue }}）</span>
            </mu-step-label>
            <mu-step-content>

              <mu-flex style="width:100%; margin-bottom:.5rem; margin-top:.5rem;" align-items="center">
                <span style="font-size:12px; color:#795548; margin-right:.5rem;">集合地点：</span>
                  <input maxlength="15" v-model="item.meetingVenue" style="padding:.4rem; width:70%; font-size:12px; border-radius:.2rem; border:1px solid #e0e0e0; color:#212121;" type="text" placeholder="（不超过20个字符）">
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
        
        <!-- 提交按钮 -->
        <mu-flex align-items="center" justify-content="center" style=" width:100%; margin-top:1.5rem;">
          <mu-button style="width:100%;" color="#03a9f4">
            发起组队
          </mu-button>
        </mu-flex>
      </div>


    </mu-container>


  </div>
</template>

<script>
export default {
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
      MeetingTime: new Date, // 活动开始时间
      StepList: [
        {meetingVenue: '', beginTime: new Date, endTime: new Date, travelDesc: '', descImg: ''},
        {meetingVenue: '', beginTime: new Date, endTime: new Date, travelDesc: '', descImg: ''},
      ],
      HadAddImg: 0,
      ClickAddImgIndex: 0,
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
      // 往StepList添加数据
      if(index == this.StepList.length - 1) {
        let item = {meetingVenue: '', beginTime: undefined, endTime: undefined, travelDesc: '', descImg: ''}
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
    addImg (index) {
      if(this.HadAddImg > 2) {
        this.$toast.message('路线/地点列表最多只能添加三张图片')
        return
      } 
      this.ClickAddImgIndex = index
      this.$refs.imgUpload.click()
    },
    getImgList () {  // 获取评论图片
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
        let imgIndex = _this.ClickAddImgIndex
        _this.StepList[imgIndex].descImg = e.target.result
        _this.ClickAddImgIndex++
      }
      reader.readAsDataURL(file)
    },
    delImg (index) {
      this.StepList[index].descImg = ''
      this.ClickAddImgIndex--
    },
    goBack () {
      this.$router.go(-1)
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
</style>

