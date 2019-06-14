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

      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">招募标题：</span>
        <input maxlength="15" v-model="TravelTitle" style="padding:.4rem; width:70%; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; color:#212121;" type="text" placeholder="一起来玩吧！（不超过15个字符）">
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">招募人数：</span>
        <select v-model="RecruitNumb" name="" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; text-align:center;">
          <option v-for="(item, index) in RecruitNumbList" :key="index" :value="item">{{ item }} 人</option>
        </select>
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:1rem; margin-top:1rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">集合地点：</span>
        <span style="font-size:12px; color:#9e9e9e;">{{ MeetingVenue }}</span>
        <mu-icon value="person_pin_circle" size="20" color="#009688"></mu-icon>
      </mu-flex>




      <mu-date-input v-model="BeginTime" type="dateTime"  prefix="集合时间：" style="font-size:12px;" landscape container="bottomSheet" clock-type="24hr" view-type="clock" full-width actions></mu-date-input>



      <mu-flex style="width:100%; margin-bottom:1rem;" align-items="start">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">详细说明：</span>
        <textarea v-model="TravelDetail" style="width:75%; height:7rem; border:1px solid #80cbc4; color:#212121; font-size:12px; padding:.4rem; border-radius:.2rem;" placeholder="大家来这里一起玩吧，出来走走也好！（活动的详细内容）">
        </textarea>
      </mu-flex>
      
    </mu-container>

    <mu-container style="padding:0 .8rem 0 0;">
      <span style="font-size:12px; color:#795548; margin-right:.5rem; margin-left:.5rem; ">路线/活动内容：</span>
      <div class="demo-vsteper-container">
        <mu-stepper :active-step="vactiveStep" orientation="vertical">

          <mu-step v-for="(item, index) in StepList">
            <mu-step-label>
              {{ item.meetingVenue }}
            </mu-step-label>
            <mu-step-content>

              <mu-flex style="width:100%; margin-bottom:.5rem; margin-top:.5rem;" align-items="center">
                <span style="font-size:12px; color:#795548; margin-right:.5rem;">集合地点：</span>
                <span style="font-size:12px; color:#9e9e9e;">{{ item.meetingVenue }}</span>
                <mu-icon value="person_pin_circle" size="20" color="#009688"></mu-icon>
              </mu-flex>

              <mu-row style="width:100%; margin-top:.5rem;" align-items="end">
                  <mu-date-input v-model="item.beginTime" type="dateTime"  prefix="开始时间：" style="font-size:12px;" landscape container="bottomSheet" clock-type="24hr" view-type="clock" actions ></mu-date-input>
                  <mu-date-input v-model="item.endTime" type="dateTime" prefix="结束时间：" style="font-size:12px; margin-top:-1rem;" landscape container="bottomSheet" clock-type="24hr" view-type="clock" actions></mu-date-input>
              </mu-row>

              <mu-flex style="width:100%; margin-bottom:1rem; margin-top:-.5rem;" align-items="start">
                <textarea v-model="item.travelDesc" style="width:90%; height:5rem; border:1px solid #e0e0e0; color:#212121; font-size:12px; padding:.4rem; border-radius:.2rem;" placeholder="活动说明， 例如：大家来这里一起玩吧，出来走走也好！（活动的详细内容）">
                </textarea>
              </mu-flex>

              <mu-flex style="width:50%; height:4rem; padding:1rem; position:relative; border:1px solid #e0e0e0; border-radius:.3rem;" justify-content="center" align-items="center">
                  <mu-icon value="add" size="40" color="#e0e0e0" style=""></mu-icon>
              </mu-flex>

              <mu-button class="demo-step-button" @click="vhandleNext" color="primary">下一步</mu-button>
              <mu-button class="demo-step-button" @click="vhandleNext" color="primary">完成</mu-button>
            </mu-step-content>
          </mu-step>

          <mu-step>
            <mu-step-label>
              创建一个群组
            </mu-step-label>
            <mu-step-content>
              <p>
                创建群组，50人左右，以18-25单身青年为主。。。。。
              </p>
              <mu-button class="demo-step-button" @click="vhandleNext" color="primary">下一步</mu-button>
              <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
            </mu-step-content>
          </mu-step>

          <mu-step>
            <mu-step-label>
              宣传活动
            </mu-step-label>
            <mu-step-content>
              <p>
                多在群里发消息宣传宣传，有事没事多在群里唠唠嗑，确定的话就ok拉
              </p>
              <mu-button class="demo-step-button" @click="vhandleNext" color="primary">完成</mu-button>
              <mu-button flat class="demo-step-button" @click="vhandlePrev">上一步</mu-button>
            </mu-step-content>
          </mu-step>
        </mu-stepper>
        <p v-if="vfinished">
          都完成啦!<a href="javascript:;" @click="vreset">点这里</a>可以重置
        </p>
      </div>
    </mu-container>


  </div>
</template>

<script>
export default {
  data () {
    return {
      vactiveStep: 0,
      TravelTheme: 1,
      PathLength: 1,
      TravelType: 1,
      TravelTitle: '',
      TravelDetail: '',
      RecruitNumb: 1, // 招募人数
      RecruitNumbList: [],  // 招募人数的列表
      MeetingVenue: '', // 聚会地点
      BeginTime: new Date, // 活动开始时间
      EndTime: new Date, // 活动结束时间
      StepList: [
        {meetingVenue: '地点/路线/时间', beginTime: new Date, endTime: new Date, travelDesc: '这里是我的描述'},
        {meetingVenue: '地点/路线/时间', beginTime: new Date, endTime: new Date, travelDesc: '这里是我的描述'},
        {meetingVenue: '地点/路线/时间', beginTime: new Date, endTime: new Date, travelDesc: '这里是我的描述'},
        {meetingVenue: '地点/路线/时间', beginTime: new Date, endTime: new Date, travelDesc: '这里是我的描述'},
        {meetingVenue: '地点/路线/时间', beginTime: new Date, endTime: new Date, travelDesc: '这里是我的描述'},
      ],
    }
  },
  mounted () {
    for(let i = 1; i < 30; i++) {
      this.RecruitNumbList.push(i)
    }
  },
  computed: {
    vfinished () {
      return this.vactiveStep > 2
    }
  },
  methods: {
    vhandleNext () {
      this.vactiveStep++
    },
    vhandlePrev () {
      this.vactiveStep--
    },
    vreset () {
      this.vactiveStep = 0
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
  margin-top: 12px;
  margin-right: 12px;
}
</style>

