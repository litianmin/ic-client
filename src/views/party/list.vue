<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''" >
    <!-- BEGIN 头部 -->
    <mu-flex 
      class="gb-top-bar" 
      align-items="center">
      <mu-flex align-items="center" @click="$router.go(-1)">
        <svg-icon icon-class="goback" style="font-size:20px;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">聚会party</span>
      </mu-flex>

      <mu-flex style="margin-left:auto;">
        <span @click="newTeam" class="title-span">创建组队</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <!-- BEGIN 主题和地址选择 -->
    <mu-flex class="search-container" align-items="center">
      <select 
      v-model="Theme"
      @change="pageReload"
      class="search-select">
        <option :value="0">选择主题</option>
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

      <span class="search-title-span">所在地：</span>
      <span class="search-addr-span">{{ LocateAddr }}</span>
      <mu-icon @click="chooseAddr" value="person_pin_circle" size="20" color="#009688"></mu-icon>
    </mu-flex>
    <!-- END 主题和地址选择 -->


    <mu-load-more 
      :loading="Loading" 
      @load="loadTeamList" 
      :loaded-all="IsTheLast" 
      style="margin-top:5.5rem;">
      <!-- BEGIN 循环样式 -->
      <div 
        v-for="(item, index) in TeamList" 
        :key="index" 
        class="team-list-container" >

        <div class="team-list-div">

          <!-- 用户头部昵称 -->
          <div class="sponsor-info-box">
            <mu-flex align-items="center">
              <mu-avatar size="35" :class="item.sex == 1 ? 'avatar-male' : 'avatar-female'">
                <img :src="item.avatar | imgPrefixDeal()">
              </mu-avatar>
              <div style="margin-left:1rem;">
                <mu-row style="font-size:12px;">{{ item.nickname }}</mu-row>
                <mu-row class="sponsor-level-span">社交菜鸟Lv1</mu-row>
              </div>
              <div class="team-index">Team{{ index + 1 }}</div>
            </mu-flex>
          </div>

          <!-- 展示图片 -->
          <mu-flex style="position:relative;" justify-content="center">
            <img style="max-width:100%;" :src="item.recruitImg | imgPrefixDeal()">

            <mu-flex class="shelter" align-items="center">
              <span style="color:#fff;">{{ item.theme }} - {{ item.siteName }}</span>
            </mu-flex>
          </mu-flex>

          <div style="padding:1rem 1rem 0rem .5rem;">
            <mu-row class="othercont-row">
              <span class="othercont-title">活动地点:</span>
              <span class="othercont-detail">{{ item.siteDetail }}</span>
            </mu-row>
            <mu-row class="othercont-row">
              <span class="othercont-title">开始时间:</span>
              <span class="othercont-detail">{{ item.beginTime | parseTime('{m}/{d} {h}:{i}') }}</span>
            </mu-row>
            <mu-row class="othercont-row">
              <span class="othercont-title">招募人数:</span>
              <span class="othercont-detail">{{ item.recruitNumb == 0 ? '不限' : (item.recruitNumb + ' 人') }}</span>
            </mu-row>
            <mu-row class="othercont-row">
              <span class="othercont-title">主要活动:</span>
              <span class="othercont-detail">{{ item.cont }}</span>
            </mu-row>
          </div>

          <mu-flex class="footer-container" align-items="center">
            <mu-icon value="person_pin_circle" color="green" size="18"></mu-icon>
            <span style="font-size:12px;">
              距离你 <span style="font-size:12px;">{{ item.distance | distanceFormat() }}</span>
            </span>
            <span class="footer-time">
              {{ item.createTime | formatTime() }}· <span @click="linkToTeamDetail(item.teamID)" style="color:#00bcd4;"> 查看详情</span>
            </span>
          </mu-flex>

        </div>
      </div>
      <!-- END 循环样式 -->
      
      <mu-row 
        v-show="IsTheLast && TeamList.length > 0" 
        justify-content="center" 
        class="nomore-team">
        <span style="">没有更多的组队</span>
      </mu-row>
    </mu-load-more>

    <mu-row 
      v-show="TeamList.length == 0" 
      justify-content="center" 
      class="noteam">
      <span style="">暂无队伍</span>
    </mu-row>

    <!-- BEGIN 地址选择弹出框 -->
    <div 
      v-if="AddrChooseWindowIsShow" 
      id="iframe" 
      class="map-container">
      <mu-flex 
        @click="shutdownWindow" 
        class="map-cover" 
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

      date: undefined,
      LocateAddr: '',
      AddrChooseWindowIsShow: false,
      ChooseAddrInfo: {
        name: '',
        location: '',
        address: '',
      },
      TeamList: [],
      IsTheLast: true,
      Loading: true,
      Page: 1,
      Lng: 0,
      Lat: 0,
      Theme: 0,
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

      this.ShareTitle = `有什么好玩的聚会party，来这里找找呗！`   // 分享title
      this.ShareDesc = '更多的聚会party在助助社交。。。'  // 分享描述
    },

    pageReload () {
      this.TeamList = []
      this.Page = 1
      this.loadTeamList()
    },

    loadTeamList () { // 加载组队
      this.Loading = true
      this.$axios.post('/party/teamList', {
        page: this.Page,
        lng: this.Lng,
        lat: this.Lat,
        theme: this.Theme
      }).then((resp)=>{

        if (resp.data.code != 20000) {
          this.$toast.info(resp.data.msg)
          return
        }

        let listInfo = resp.data.msg

        if (listInfo.length < 10) {
          this.IsTheLast = true
        }

        for(let i = 0; i < listInfo.length; i++) {
          // 处理主题
          listInfo[i].theme = utils.getPartyThemeName(listInfo[i].theme)
        }
        this.TeamList = this.TeamList.concat(listInfo)
        this.Page++
        this.Loading = false
      })
    },
    
    loadiframe () {
      let iframe = document.getElementById('getAddress').contentWindow
      iframe.postMessage('hello', 'https://m.amap.com/picker/')
      window.addEventListener("message", this.chooseAddrDeal, false)
    },

    chooseAddrDeal (e) {  // 选择地址处理
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

    newTeam () {  // 创建一个新的组队
      this.$router.push('/party/newTeam')
    },

    linkToTeamDetail (teamID) {
      this.$router.push(`/party/teamDetail/${teamID}`)
    }
  }
}
</script>

<style scoped>
.title-span {
  color:#fff; 
  font-size:12px; 
  padding:0 .5rem;
}

.search-container {
  position: fixed; 
  z-index: 9999;
  background:#fff;
  top: 2.5rem;
  left: 0;
  width: 100%;
  padding:0 .5rem; 
  height:2.5rem;
  border-bottom: 1px solid #b2ebf2;
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

.search-title-span {
  font-size:12px; 
  color:#795548; 
  margin-left:1rem;
}

.search-addr-span {
  font-size:12px; 
  color:#009688;
}


.mycont {
  position: absolute;
  top: 2.5rem;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

.team-list-container {
  padding:.5rem;  
  position:relative;  
  margin-bottom:2rem;
}

.team-list-div {
  box-shadow: 1px 1px 1px #9e9e9e; 
  border-top-left-radius:.3rem; 
  border-top-right-radius:.3rem; 
  border-top:1px solid #e0e0e0; 
  border-left:1px solid #e0e0e0;
}

.sponsor-info-box {
  padding:.5rem; 
  border-bottom:1px solid #eeeeee;
}

.sponsor-level-span {
  margin-top:.2rem;
  font-size:7px; 
  color:#43a047;
}

.team-index {
  margin-left:auto; 
  background:#4db6ac; 
  padding:.2rem .3rem; 
  color:#fff; 
  border-radius:.2rem; 
  font-size:12px; 
  margin-right:.5rem;
}

.shelter {
  width:100%; 
  position:absolute; 
  bottom:0; 
  padding:0 .2rem; 
  background:rgba(0, 0, 0, .5); 
  padding:1rem;
}

.othercont-row {
  margin-bottom:.3rem;
}

.othercont-title {
  color:#795548; 
  font-size:12px;
}

.othercont-detail {
  margin-left:.5rem; 
  color:#9e9e9e; 
  font-size:12px;
}

.footer-container {
  font-size:12px; 
  padding:.8rem 1rem 1rem .5rem; 
  margin-top:.5rem;
}

.footer-time {
  margin-left:auto; 
  color:#9e9e9e; 
  font-size:12px;
}

.nomore-team {
  padding:.5rem .5rem .3rem .5rem; 
  margin-top:-1.5rem; 
  margin-bottom:.5rem; 
  color:#9e9e9e;
}

.noteam {
  padding:.5rem .5rem .3rem .5rem; 
  margin-top:6rem; 
  color:#9e9e9e;
}

.map-container {
  position:fixed; 
  z-index:10000; 
  top:0; 
  width:100%; 
  height:100%;
}

.map-cover {
  width:10%; 
  height:2.8rem; 
  z-index:10000; 
  position:fixed; 
  top:0; 
  left:0; 
  background:#F8F8F8; 
  text-align:center; 
  padding: 0 0 0 .5rem;
}

.mine-menu-box { margin-top:1rem; right:.5rem; }
.mine-menu-list { background:#26c6da; color:white; padding:0; }
.mine-menu-item { color:#fff; font-size:12px; }

.map-item { position: fixed; width: 100%; height: 100%; top: 0; background: #fff; }

.body-fix{ position:fixed; }

.avatar-male { padding:.1rem; border:1px solid #bbdefb; border-radius:50%; background:white; }
.avatar-female { padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; }
</style>


