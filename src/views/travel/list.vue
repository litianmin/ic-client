<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''">

    <!-- BEGIN 头部 -->
    <mu-flex 
      class="gb-top-bar" 
      align-items="center">
      <mu-flex align-items="center" @click="$router.go(-1)">
        <svg-icon icon-class="goback" style="font-size:20px;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">旅游</span>
      </mu-flex>

      <mu-flex style="margin-left:auto;">
        <span @click="newTeam" class="title-span">创建组队</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <!-- BEGIN 主题和地址选择 -->
    <mu-flex class="search-container"  align-items="center" wrap="wrap">
      <mu-flex align-items="center" style="margin-top:.2rem;">
        <span class="search-title1">条件筛选：</span>
        <div style="margin-right:.8rem;">
          <select 
            v-model="TravelTheme" 
            @change="pageReload"
            class="search-select">
            <option :value="0">选择主题</option>
            <option :value="1">心 灵</option>
            <option :value="2">漂 流</option>
            <option :value="3">摄 影</option>
            <option :value="4">踏 青</option>
            <option :value="5">美 食</option>
            <option :value="6">亲 子</option>
            <option :value="7">沙 滩</option>
            <option :value="8">滑 雪</option>
            <option :value="9">朝 圣</option>
          </select>
        </div>

        <div style="margin-right:.8rem;">
          <select 
            v-model="PathLength"
            @change="pageReload"
            class="search-select">
            <option :value="0">选择路程</option>
            <option :value="1">周 边 游</option>
            <option :value="2">长途旅行</option>
          </select>
        </div>

        <div>
          <select 
            v-model="TravelType"
            @change="pageReload"
            class="search-select">
            <option :value="0">选择形式</option>
            <option :value="1">自 由 行</option>
            <option :value="2">跟 团 游</option>
          </select>
        </div>
      </mu-flex>

      <mu-flex style="width:100%;" align-items="center">
        <span style="font-size:12px; color:#795548;">所 在 地：</span>
        <span style="font-size:12px; color:#009688;">{{ LocateAddr }}</span>
        <mu-icon @click="chooseAddr" value="person_pin_circle" size="20" color="#009688"></mu-icon>
      </mu-flex>

    </mu-flex>


    <!-- END 主题和地址选择 -->

    <mu-divider></mu-divider>

    <mu-load-more 
      :loading="Loading" 
      @load="loadTeamList" 
      :loaded-all="IsTheLast" 
      style="margin-top:7.5rem;">
      <!-- BEGIN 队伍样式 -->
      <div 
        v-for="(item, index) in TeamList" 
        :key="index"
        class="teamlist-container">
        <div class="teamlist-cont-div">
          <mu-flex style="position:relative;" justify-content="center">
            <img class="recruit-img" :src="item.recruitImg | imgPrefixDeal()">

              <span class="recruit-span"> 
                {{ item.recruitNumb }}/<span style="font-size:9px;">{{ item.hadRecruitNumb }}</span>
              </span>

            <mu-flex class="steplist-flex" align-items="center">
              <mu-flex align-items="center">

                <div>
                  <mu-avatar size="25">
                    <img :src="item.captainAvatar | imgPrefixDeal()" alt="">
                  </mu-avatar>
                </div>
                <div style="margin-left:.8rem;">
                  <mu-row style="font-size:12px; color:#fff;">
                    {{ item.captainNickname }}：{{ item.stepList }}
                  </mu-row>
                </div>
              </mu-flex>
            </mu-flex>

          </mu-flex>

          <mu-flex style="padding:.5rem .5rem .5rem 0;" align-items="center" wrap="wrap">

            <mu-flex class="cont-flex" >
              <span class="cont-span">{{ item.cont }}</span>
            </mu-flex>

            <mu-flex 
              class="time-addr-container" 
              align-items="center" 
              wrap="wrap" >
              <div class="time-container">
                <span class="time-span"> 
                  {{ item.meetingTime | parseTime('{m}/{d} {h}:{i}') }} 
                </span>
              </div>

              <mu-icon value="person_pin_circle" color="green" size="18"></mu-icon>
              <span class="distance-span">
                距离你 <span style="font-size:12px;">{{ item.distance | distanceFormat() }}</span>
              </span>
              <span class="addr-span"> 于 {{ item.meetingVenue.name }} 集合</span>
            </mu-flex>

            <mu-flex class="badge-container" align-items="center">
              <mu-badge :content="item.theme" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
              <mu-badge :content="item.pathLength" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
              <mu-badge :content="item.travelType" color="#00bcd4" style=""></mu-badge>
              <span @click="linkToTeamDetail(item.teamID)" class="detail">查看详情</span>
            </mu-flex>  
          </mu-flex>
        </div>
      </div>
      <!-- END 队伍样式 -->

      <mu-row 
        v-show="IsTheLast && TeamList.length > 0" 
        justify-content="center" 
        class="nomore-team">
        <span style="">-- 没有更多的组队 --</span>
      </mu-row>
    </mu-load-more>

    <mu-row 
      v-show="TeamList.length == 0" 
      justify-content="center" 
      class="no-team">
      <span style="">没有更多的组队</span>
    </mu-row>

    <!-- BEGIN 地址选择弹出框 -->
    <div 
      v-if="AddrChooseWindowIsShow" 
      id="iframe" 
      class="map-container">
      <mu-flex 
        @click="shutdownWindow" 
        class="map-shutdown" 
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
    <!-- EBD 地址选择弹出框 -->

  </div>
</template>

<script>
import utils from 'common/utils.js'
import { wxInit } from '@/common/wxInit.js'
export default {
  data () {
    return {
      ShareTitle: '', // 分享title
      ShareDesc: '',  // 分享描述
      ShareImgUrl: '',  // 分享图片

      TravelTheme: 0,
      PathLength: 0,
      TravelType: 0,
      LocateAddr: '',
      Lng: 0,
      Lat: 0,
      AddrChooseWindowIsShow: false,
      ChooseAddrInfo: {
        name: '',
        location: '',
        address: '',
      },
      Loading: true,
      IsTheLast: true,
      Page: 1,
      TeamList: [],
    }
  },
  mounted () {
    wxInit(this, true)
  },
  methods: {
    pageInit () {
      let userAddrInfo = utils.getLocationInfo()
      this.Lng = userAddrInfo.lng
      this.Lat = userAddrInfo.lat
      this.LocateAddr = userAddrInfo.addr

      this.loadTeamList()

      this.ShareTitle = '助助社交，旅游伴你寻觅心灵的自由！' // 分享title
      this.ShareDesc = '更多的旅游组队在助助社交，进来看看呗！'  // 分享描述
    },
    pageReload () { // 重新加载数据
      this.TeamList = []
      this.Page = 1
      this.loadTeamList()
    },
    goBack () {
      this.$router.go(-1)
    },
    newTeam () {
      this.$router.push('/travel/newTeam')
    },
    loadiframe () {
      let iframe = document.getElementById('getAddress').contentWindow
      iframe.postMessage('hello', 'https://m.amap.com/picker/')
      window.addEventListener("message", this.chooseAddrDeal, false)
    },

    chooseAddrDeal (e) {
      let that = this

      if (e.data.location != undefined) {
        that.ChooseAddrInfo = e.data
        that.LocateAddr = e.data.name

        let location = e.data.location.split(',')
        that.Lng = Number(location[0])
        that.Lat = Number(location[1])
        that.AddrChooseWindowIsShow = false  

        that.pageReload() // 选择地址刷新
      }

    },

    chooseAddr () { // 点击选择地址的时候，弹出地址选择窗口
      this.AddrChooseWindowIsShow = true
    },
    shutdownWindow () { // 关闭地图窗口
      this.AddrChooseWindowIsShow = false
    },
    loadTeamList () { // 加载组队
      this.Loading = true
      this.$axios.post('/travel/teamList', {
        page: this.Page,
        lng: this.Lng,
        lat: this.Lat,
        theme: this.Theme,
        pathLength: this.PathLength,
        type: this.TravelType
      }).then((resp)=>{
        let dataBack = resp.data.msg

        if (resp.data.code != 20000) {
          this.$message.info(resp.data.msg)
          return
        }

        let data = resp.data.msg

        if (data.length < 10) {
          this.IsTheLast = true
        }

        data.map(item => {
          item.theme = utils.getTravelThemeName(item.theme)
          item.pathLength = utils.getTravelPathLengthName(item.pathLength)
          item.travelType = utils.getTravelTypeName(item.travelType)
          item.stepList = item.stepList.replace('|', ' -> ')
          return item
        })

        this.TeamList = this.TeamList.concat(data)
        this.Page++
        this.Loading = false
      })
    },
    linkToTeamDetail (teamID) {
      this.$router.push(`/travel/teamDetail/${teamID}`)
    },
  }
}
</script>

<style scoped>


.search-container {
  position: fixed; 
  z-index: 9999;
  background:#fff;
  top: 2.5rem;
  left: 0;
  width: 100%;
  padding:0 .5rem; 
  height:4rem;
  border-bottom: 1px solid #b2ebf2;
  /* padding:.5rem .2rem .5rem 0rem;" */
}

.search-title1 {
  font-size:12px; 
  color:#795548; 
  margin-left:0rem;
}

.search-select {
  padding:.1rem .5rem; 
  color:#009688; 
  appearance:none; 
  background:#fff; 
  font-size:12px; 
  border-radius:.2rem; 
  border:1px solid #80cbc4;
}

.teamlist-container {
  padding:.5rem; 
  margin-bottom:1.5rem;
}

.teamlist-cont-div {
  box-shadow: 1px 1px 1px #9e9e9e; 
  border-top-left-radius:.5rem; 
  border-top-right-radius:.5rem; 
  border-left:1px solid #e0e0e0;
}

.recruit-img {
  max-width:100%; 
  max-height:30rem; 
  border-top-left-radius:.5rem; 
  border-top-right-radius:.5rem;
}

.recruit-span {
  font-size:14px; 
  font-weight:700; 
  margin-left:auto; 
  color:gray; 
  position:absolute; 
  top:1rem; 
  right:1.5rem; 
  color:#fff;
}

.steplist-flex {
  width:100%; 
  position:absolute; 
  bottom:0; 
  background:rgba(0, 0, 0, .5); 
  padding:.5rem .8rem;
}

.steplist-span {
  font-size:12px; 
  color:white;
}

.cont-flex {
  width:100%; 
  padding:.5rem .8rem .3rem .5rem;
}

.cont-span {
  font-size:13px; 
  font-weight:700; 
  letter-spacing:1px;
}

.time-addr-container {
  width:100%; 
  font-size:12px; 
  padding:.8rem .3rem; 
  border-bottom:1px solid #eeeeee;
}

.time-container {
  width:100%; 
  margin-bottom:.2rem; 
  text-align:right;
}

.time-span {
  font-size:12px; 
  color:gray; 
  margin-left:auto;
}

.distance-span {
  font-size:12px; 
  color:gray;
}

.addr-span {
  font-size:12px;  
  color:gray; 
  margin-left:auto;
}

.badge-container {
  width:100%; 
  padding:1rem .8rem .5rem .5rem;
}

.detail {
  margin-left:auto; 
  font-size:12px; 
  color:#03a9f4;
}

.nomore-team {
  padding:.5rem .5rem .3rem .5rem; 
  margin-top:.5rem; 
  margin-bottom:.5rem; 
  color:#9e9e9e; 
  margin-top:-1.5rem;
}

.no-team {
  padding:.5rem .5rem .3rem .5rem; 
  margin-top:6rem; 
  color:#9e9e9e;
}

.map-item { position: fixed; width: 100%; height: 100%; top: 0; background: #fff; }

.map-container {
  position:fixed; 
  z-index:10000; 
  top:0; 
  width:100%; 
  height:100%;
}

.map-shutdown {
  width:10%; 
  height:2.8rem;  
  position:fixed; 
  top:0; 
  left:0; 
  background:#F8F8F8; 
  text-align:center; 
  padding: 0 0 0 .5rem;
}

.body-fix{ position:fixed; }
</style>

