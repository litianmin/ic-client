<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''">
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
      <mu-flex style="width:100%; margin-bottom:.5rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">活动主题：</span>
        <select name="" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; ">
          <option value="0">选择主题</option>
          <option value="1">健身运动</option>
          <option value="2">随便逛逛</option>
          <option value="3">线下手游</option>
          <option value="4">野外聚餐</option>
          <option value="5">音乐派对</option>
          <option value="6">单身派对</option>
          <option value="7">联谊聚会</option>
        </select>
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:.5rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">活动标题：</span>
        <input style="padding:.4rem; width:70%; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4; color:#212121;" type="text" placeholder="请输入活动标题，不超过15个字符">
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:.5rem;" align-items="start">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">详细内容：</span>
        <textarea style="width:75%; height:7rem; border:1px solid #80cbc4; color:#212121; font-size:12px; padding:.4rem; border-radius:.2rem;" placeholder="请填写活动的详细内容">
        </textarea>
      </mu-flex>

      <mu-row style="margin-top:.5rem; z-index:100;">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">队友偏爱：</span>
        <mu-col span="12">
          <mu-select multiple chips v-model="teamatePrefer" full-width style="color:#795548;">
            <template slot="selection" slot-scope="scope">
              <mu-chip :selected="scope.selected" color="teal" style="font-size:12px; margin:3px;">
                {{scope.label}}
              </mu-chip>
            </template>
            <mu-option v-for="(item,index) in perferList" :key="index" :label="item" :value="item"></mu-option>
          </mu-select>
        </mu-col>
      </mu-row>

      <mu-row style="width:100%; margin-bottom:.5rem; margin-top:1rem;">
        <mu-row>
          <span style="font-size:12px; color:#795548; margin-right:.5rem;">招募人数（已选5人）：</span>
        </mu-row>
        <mu-row style="width:100%; margin-top:1rem; padding:0 0 0 .2rem;">
          <mu-slider track-color="#e0e0e0" v-model="RecruitNumb" :max="10" :min="2" :step="1" color="#8bc34a"></mu-slider>
        </mu-row>
      </mu-row>

      <mu-flex style="width:100%; margin-bottom:.5rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">活动地点：</span>
        <span style="font-size:12px; color:#009688;">{{ PartyLocateAddr }}</span>
        <mu-icon @click="choosePartyAddr" value="person_pin_circle" size="20" color="#009688"></mu-icon>
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:.5rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">集合地点：</span>
        <span style="font-size:12px; color:#009688;">{{ MeetingVenue }}</span>
        <mu-icon @click="chooseMeetingVenue" value="person_pin_circle" size="20" color="#009688"></mu-icon>
      </mu-flex>

      <mu-flex style="width:100%; margin-bottom:.5rem;" align-items="center">
        <span style="font-size:12px; color:#795548; margin-right:.5rem;">招募图片：（最多三张）</span>
      </mu-flex>

    </mu-container>
    <!-- <mu-flex align-items="center">
      <mu-checkbox value="1" v-model="mytest" uncheck-icon="favorite_border" checked-icon="favorite" color="#e91e63" style="color:blue;"></mu-checkbox><span>ceshi</span>
    </mu-flex>
    <mu-checkbox value="2" v-model="mytest" uncheck-icon="favorite_border" checked-icon="favorite" color="#e91e63"></mu-checkbox> -->

    <div v-if="AddrChooseWindowIsShow" id="iframe" style="position:fixed; top:0; width:100%; height:100%;">
      <mu-flex @click="shutdownWindow" style="width:10%; height:2.8rem; z-index:9999; position:fixed; top:0; left:0; background:#F8F8F8; text-align:center; padding: 0 0 0 .5rem;" align-items="center" justify-content="center">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-flex>
      <iframe class="map-item"  id="getAddress" @load="loadiframe" src="https://m.amap.com/picker/?key=8906f77f66bcbd2b82a57d844e270fe7" style="width:100%; height:100%; position: absolute; border:0;">
      </iframe>
    </div>


  </div>
</template>

<script>
export default {
  data () {
    return {
      RecruitNumb: 0,
      mytest: [],
      teamatePrefer: [],
      teamatePreferStr: '',
      perferList: ['男生', '女生', '菜鸟', '大神', '萌妹子', '抠脚大叔'],
      PartyLocateAddr: '',
      AddrChooseWindowIsShow: false,
      MeetingVenue: '',
      AddrChooseOperate: 0, // 0=>聚会地点， 1=>集合地点
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
          // this.ChooseAddrInfo = e.data

          if(this.AddrChooseOperate == 0) {
            this.PartyLocateAddr = e.data.name
          }else{
            this.MeetingVenue = e.data.name
          }

          // this.LocateAddr = e.data.name
          this.AddrChooseWindowIsShow = false
          //业务代码
          // this.$toast.message(e.data.name)
          // console.log(e)     
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
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }

.map-item { position: fixed; width: 100%; height: 100%; top: 0; background: #fff; }

.body-fix{ position:fixed; }
</style>


