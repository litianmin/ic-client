<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''" style="background:#fff;">
    <!-- BEGIN 头部 -->
    <mu-flex 
      style="padding:.6rem .8rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0 0 1px #26c6da;" 
      align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">聚会party</span>
      </mu-flex>

      <mu-flex style="margin-left:auto;">
        <span @click="newTeam" style="color:#fff; font-size:12px; padding:0 .5rem;" slot="right">创建组队</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <!-- BEGIN 主题和地址选择 -->
    <mu-flex style="padding:.5rem .2rem .5rem .2rem;" align-items="center">
      <span style="font-size:12px; color:#795548; margin-left:.3rem;">主题筛选：</span>
      <select 
      v-model="Theme"
      :change="pageReload"
      style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4;">
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

      <span style="font-size:12px; color:#795548; margin-left:1rem;">所在地：</span>
      <span style="font-size:12px; color:#009688;">{{ LocateAddr }}</span>
      <mu-icon @click="chooseAddr" value="person_pin_circle" size="20" color="#009688"></mu-icon>
    </mu-flex>
    <!-- END 主题和地址选择 -->

    <mu-divider></mu-divider>

    <mu-load-more :loading="Loading" @load="loadTeamList" :loaded-all="IsTheLast">
      <!-- BEGIN 循环样式 -->
      <div v-for="(item, index) in TeamList" :key="index" style="padding:.5rem;  position:relative;  margin-bottom:2rem;" >
        <div style="box-shadow: 1px 1px 1px #9e9e9e; border-top-left-radius:.3rem; border-top-right-radius:.3rem; border-top:1px solid #e0e0e0; border-left:1px solid #e0e0e0;">

          <!-- 用户头部昵称 -->
          <div style="padding:.5rem; border-bottom:1px solid #eeeeee; ">
            <mu-flex align-items="center">
              <mu-avatar size="35" :class="item.captainSex == 1 ? 'avatar-male' : 'avatar-female'">
                <img :src="item.captainAvatar | imgPrefixDeal()" alt="">
              </mu-avatar>
              <div style="margin-left:1rem;">
                <mu-row style="font-size:12px;">{{ item.captainNickname }}</mu-row>
                <mu-row style="margin-top:.2rem;font-size:7px; color:#43a047;">社交菜鸟Lv1</mu-row>
              </div>
              <div style="margin-left:auto; background:#4db6ac; padding:.2rem .3rem; color:#fff; border-radius:.2rem; font-size:12px; margin-right:.5rem;">Team{{ index + 1 }}</div>
            </mu-flex>
          </div>

          <!-- 展示图片 -->
          <mu-flex style="position:relative;" justify-content="center">
            <img style="max-width:100%; max-height:30rem;" :src="item.recruitImg | imgPrefixDeal()" alt="">

            <mu-flex style="width:100%; position:absolute; bottom:0; padding:0 .2rem; background:rgba(0, 0, 0, .5); padding:1rem;" align-items="center">
              <span style="color:#fff;">{{ item.partyTheme }} - {{ item.partySiteName }}</span>
            </mu-flex>
          </mu-flex>

          <div style="padding:1rem 1rem 0rem .5rem;">
            <mu-row style="margin-bottom:.3rem;">
              <span style="color:#795548; font-size:12px;">主要活动:</span>
              <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ item.partyTitle }}</span>
            </mu-row>
            <mu-row style="margin-bottom:.3rem;">
              <span style="color:#795548; font-size:12px;">活动地点:</span>
              <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ item.partySiteDetail }}</span>
            </mu-row>
            <mu-row style="margin-bottom:.3rem;">
              <span style="color:#795548; font-size:12px;">活动时间:</span>
              <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ item.partyBeginTime | formatTime('{y}/{m}/{d} {h}:{i}') }}  ~  {{ item.partyEndTime | formatTime('{y}/{m}/{d} {h}:{i}') }}</span>
            </mu-row>
            <mu-row style="margin-bottom:.3rem;">
              <span style="color:#795548; font-size:12px;">集合地点:</span>
              <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ item.meetingSiteDetail }}</span>
            </mu-row>
            <mu-row style="margin-bottom:.3rem;">
              <span style="color:#795548; font-size:12px;">招募人数:</span>
              <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ item.recruitNumb }}人</span>
            </mu-row>
            <mu-row style="margin-bottom:.3rem;">
              <span style="color:#795548; font-size:12px;">队友偏爱:</span>
              <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ item.teammatePrefer }}</span>
            </mu-row>

            <mu-row style="margin-top:.5rem;">
              <span style="color:#795548; font-size:12px;">详细内容:            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">{{ item.partyDetail }}</span></span>
            </mu-row>
          </div>

          <mu-flex style="font-size:12px; padding:.8rem 1rem 1rem .5rem; margin-top:.5rem;" align-items="center">
            <mu-icon value="person_pin_circle" color="green" size="18"></mu-icon>
            <span style="font-size:12px;">距离你 <span style="font-size:12px;">{{ item.distance | distanceFormat() }}</span></span>
            <span style="margin-left:auto; color:#9e9e9e; font-size:12px;">{{ item.createTime | formatTime() }}· <span @click="linkToTeamDetail(item.teamID)" style="color:#00bcd4;"> 查看详情</span></span>
          </mu-flex>

        </div>
      </div>
      <!-- END 循环样式 -->
      
      <mu-row v-show="IsTheLast && TeamList.length > 0" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:-1.5rem; margin-bottom:.5rem; color:#9e9e9e;">
        <span style="">没有更多的组队</span>
      </mu-row>
    </mu-load-more>

    <mu-row v-show="TeamList.length == 0" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:6rem; color:#9e9e9e;">
      <span style="">没有更多的组队</span>
    </mu-row>


    <!-- BEGIN 地址选择弹出框 -->
    <div v-if="AddrChooseWindowIsShow" id="iframe" style="position:fixed; top:0; width:100%; height:100%;">
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
      this.loadTeamList()
    },
    goBack () {
      this.$router.go(-1)
    },
    loadTeamList () { // 加载组队
      this.Loading = true
      let userAddrInfo = utils.getLocationInfo()
      this.$axios.post('/party/teamList', {
        page: this.Page,
        lng: this.lng,
        lat: this.lat,
        theme: this.Theme
      }).then((resp)=>{

        let dataBack = resp.data.msg
        this.IsTheLast = dataBack.isTheLast

        let listInfo = dataBack.listInfo
        for(let i = 0; i < listInfo.length; i++) {
          // 处理主题
          listInfo[i].partyTheme = utils.getPartyThemeName(listInfo[i].partyTheme)
        }
        this.TeamList = this.TeamList.concat(dataBack.listInfo)
        this.Page++
        this.Loading = false
      })
    },
    loadiframe () {
      let iframe = document.getElementById('getAddress').contentWindow
      iframe.postMessage('hello', 'https://m.amap.com/picker/')
      window.addEventListener("message", function (e) {
        if (e.data.command != "COMMAND_GET_TITLE") {
          this.ChooseAddrInfo = e.data
          this.LocateAddr = e.data.name

          let location = e.data.location.split(',')
          this.Lng = location[0]
          this.Lat = location[1]
          this.AddrChooseWindowIsShow = false  

          this.pageReload() // 选择地址刷新
        }

      }.bind(this), false)
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
.mine-appbar { width: 100%; height:2.5rem; }

.mine-menu-box { margin-top:1rem; right:.5rem; }
.mine-menu-list { background:#26c6da; color:white; padding:0; }
.mine-menu-item { color:#fff; font-size:12px; }

.map-item { position: fixed; width: 100%; height: 100%; top: 0; background: #fff; }

.body-fix{ position:fixed; }

.avatar-male { padding:.1rem; border:1px solid #bbdefb; border-radius:50%; background:white; }
.avatar-female { padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; }
</style>


