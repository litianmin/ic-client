<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''">

    <!-- BEGIN 头部 -->
    <mu-flex 
      style="padding:.6rem .8rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0 0 1px #26c6da;" 
      align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">旅游</span>
      </mu-flex>

      <mu-flex style="margin-left:auto;">
        <span @click="newTeam" style="color:#fff; font-size:12px; padding:0 .5rem;" slot="right">创建组队</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <!-- BEGIN 主题和地址选择 -->
    <mu-flex style="widht:100%; padding:.5rem .2rem .5rem 0rem;" align-items="center">
      <span style="font-size:12px; color:#795548; margin-left:1rem;">条件筛选：</span>
      <div style="margin-right:.8rem;">
        <select v-model="TravelTheme" name="" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4;">
          <option value="0">选择主题</option>
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
      </div>

      <div style="margin-right:.8rem;">
        <select v-model="PathLength" name="" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4;">
          <option value="0">选择路程</option>
          <option value="1">周 边 游</option>
          <option value="2">长途旅行</option>
        </select>
      </div>

      <div>
        <select v-model="TravelType" name="" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4;">
          <option value="0">选择形式</option>
          <option value="1">自 由 行</option>
          <option value="2">跟 团 游</option>
        </select>
      </div>
    </mu-flex>

    <mu-flex style="width:100%; padding:.3rem .2rem .3rem 0rem;" align-items="center">
      <span style="font-size:12px; color:#795548; margin-left:1rem;">所 在 地：</span>
      <span style="font-size:12px; color:#009688;">{{ LocateAddr }}</span>
      <mu-icon @click="chooseAddr" value="person_pin_circle" size="20" color="#009688"></mu-icon>
    </mu-flex>
    <!-- END 主题和地址选择 -->

    <mu-divider></mu-divider>

    <mu-load-more :loading="Loading" @load="loadTeamList" :loaded-all="IsTheLast">
      <!-- BEGIN 队伍样式 -->
      <div style="padding:.5rem; margin-bottom:1.5rem;" v-for="(item, index) in TeamList" :key="index">
        <div style="box-shadow: 1px 1px 1px #9e9e9e; border-top-left-radius:.5rem; border-top-right-radius:.5rem; border-left:1px solid #e0e0e0;">
          <mu-flex style="position:relative;" justify-content="center">
            <img style="max-width:100%; max-height:30rem; border-top-left-radius:.5rem; border-top-right-radius:.5rem;" :src="item.recruitImg" alt="">

              <span style="font-size:14px; font-weight:700; margin-left:auto; color:gray; position:absolute; top:1rem; right:1.5rem; color:#fff;"> {{ item.recruitNumb }}/<span style="font-size:9px;">{{ item.hadRecruitNumb }}</span></span>

            <mu-flex style="width:100%; position:absolute; bottom:0; background:rgba(0, 0, 0, .5); padding:.5rem .8rem;" align-items="center">
              <mu-flex align-items="center">
                <div>
                  <mu-avatar size="25">
                    <img :src="item.captainAvatar" alt="">
                  </mu-avatar>
                </div>
                <div style="margin-left:.8rem;">
                  <mu-row style="font-size:12px; color:white;">{{ item.captainNickname }}：{{ item.travelTitle }}</mu-row>
                  <!-- <mu-row style="margin-top:.2rem;font-size:7px; color:#fff;">社交菜鸟Lv1</mu-row> -->
                </div>
              </mu-flex>
              <!-- <span style="color:#fff; font-weight:700;">{{ item.travelTitle }}</span> -->
            </mu-flex>


          </mu-flex>
          <mu-flex style="padding:.5rem .5rem .5rem 0;" align-items="center" wrap="wrap">

            <mu-flex style="width:100%; padding:.5rem .8rem .3rem .5rem;" align-items="center">
              <div style="">
                <span style=" font-size:15px; font-weight:700;">{{ item.travelDetail }}</span>
              </div>
            </mu-flex>

            <mu-flex v-if="item.stepListStr != ''" style="width:100%; padding: .5rem .5rem 0rem .5rem; ">
              <span style=" font-size:13px; font-weight:600;"> {{ item.stepListStr }}</span>
            </mu-flex>

            <mu-flex style="width:100%; font-size:12px; padding:.8rem .3rem; border-bottom:1px solid #eeeeee;" align-items="center" wrap="wrap" >
              <div style="width:100%; margin-bottom:.2rem; text-align:right;">
                <span style="font-size:12px;  color:gray; margin-left:auto;"> {{ item.meetingTime }} </span>
              </div>

              <mu-icon value="person_pin_circle" color="green" size="18"></mu-icon>
              <span style="font-size:12px; color:gray;">距离你 <span style="font-size:12px;">{{ item.distance }}</span></span>
              <span style="font-size:12px;  color:gray; margin-left:auto;"> 于 {{ item.meetingVenue.name }} 集合</span>
            </mu-flex>

            <mu-flex style="width:100%; padding:1rem .8rem .5rem .5rem" align-items="center">
              <mu-badge :content="item.travelTheme" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
              <mu-badge :content="item.pathLength" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
              <mu-badge :content="item.travelType" color="#00bcd4" style=""></mu-badge>
              <span @click="linkToTeamDetail(item.teamID)" style="margin-left:auto; font-size:12px; color:#03a9f4;">查看详情</span>
            </mu-flex>  
          </mu-flex>
        </div>
      </div>
      <!-- END 队伍样式 -->

      <mu-row v-show="IsTheLast && TeamList.length > 0" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.5rem; margin-bottom:.5rem; color:#9e9e9e; margin-top:-1.5rem;">
        <span style="">-- 没有更多的组队 --</span>
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
      <iframe class="map-item"  id="getAddress" @load="loadiframe" src="https://m.amap.com/picker/?key=8906f77f66bcbd2b82a57d844e270fe7" style="width:100%; height:100%; position: absolute; border:0;">
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
      Lng: 113.122629,
      Lat: 23.029735,
      AddrChooseWindowIsShow: false,
      ChooseAddrInfo: {
        name: '',
        location: '',
        address: '',
      },
      Loading: false,
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
      this.loadTeamList()

      this.ShareTitle = '助助社交，旅游伴你寻觅心灵的自由！' // 分享title
      this.ShareDesc = '更多的旅游组队在助助社交，进来看看呗！'  // 分享描述
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
      window.addEventListener("message", function (e) {
        if (e.data.command != "COMMAND_GET_TITLE") {
          this.ChooseAddrInfo = e.data
          this.LocateAddr = e.data.name
          this.AddrChooseWindowIsShow = false  
        }

      }.bind(this), false)
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
        console.log(dataBack)
        this.IsTheLast = dataBack.isTheLast

        let listInfo = dataBack.listInfo
        for(let i = 0; i < listInfo.length; i++) {
          // 处理主题,路程，类型
          listInfo[i].travelTheme = utils.getTravelThemeName(listInfo[i].travelTheme)
          listInfo[i].pathLength = utils.getTravelPathLengthName(listInfo[i].pathLength)
          listInfo[i].travelType = utils.getTravelTypeName(listInfo[i].travelType)

          listInfo[i].travelTitle = listInfo[i].travelTitle == '' ? '一起来玩吧' : listInfo[i].travelTitle
          listInfo[i].travelDetail = listInfo[i].travelDetail == '' ? '大家来这里一起玩吧，出来走走也好!' : listInfo[i].travelDetail
          // 处理招募图片
          listInfo[i].recruitImg = listInfo[i].recruitImg == '' ? utils.TravelDefaultDisplayImg : utils.imgPrefixDeal(listInfo[i].recruitImg)
          // 先格式化活动时间  {{ item.partyBeginTime }}  ~  {{ item.partyEndTime }}
          // 2019/1/02 02:02  ~  2019/3/02 03:04
          listInfo[i].meetingTime = utils.unixToDate(listInfo[i].meetingTime)
          // listInfo[i].partyEndTime = utils.unixToDate(listInfo[i].partyEndTime)
          // 距离处理
          listInfo[i].distance = utils.distanceFormat(listInfo[i].distance)
          // 队伍发布时间处理
          listInfo[i].createTime = utils.getDateDiff(listInfo[i].createTime, true)

          // 处理头像和图片
          listInfo[i].captainAvatar = utils.imgPrefixDeal(listInfo[i].captainAvatar)

          // 处理步骤
          let stepList = listInfo[i].stepListStr

          stepList = stepList.replace('|', ' -> ')

          // for(let j = 0; j < listInfo[i].stepList.length; j++) {
          //   stepList += listInfo[i].stepList[j].addrOrProgram + ' -> '
          // }
          // if(stepList.length > 4) {
          //   stepList = stepList.substring(0, stepList.length - 4)
          // }
          listInfo[i].stepListStr = stepList
        }


        this.TeamList = this.TeamList.concat(dataBack.listInfo)
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
.mine-appbar { width: 100%; height:2.5rem; }

.mine-menu-box { margin-top:1rem; right:.5rem; }
.mine-menu-list { background:#26c6da; color:white; padding:0; }
.mine-menu-item { color:#fff; font-size:12px; }

.map-item { position: fixed; width: 100%; height: 100%; top: 0; background: #fff; }

.body-fix{ position:fixed; }
</style>

