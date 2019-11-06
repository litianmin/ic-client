<template>
  <div class="home">
    <!-- BEGIN 头部 -->
    <mu-flex 
      align-items="center" 
      class="gb-top-bar">
      <mu-flex align-items="center">
        <mu-avatar size="30">
          <img :src="$store.state.mdeLogin.usrInfo.avatar | imgPrefixDeal()">
        </mu-avatar>
        <span style="margin-left:.5rem;">{{ $store.state.mdeLogin.usrInfo.nickname }}</span>
      </mu-flex>
      <mu-flex 
        @click="chooseAddr"
        style="margin-left:auto;" 
        align-items="center">
          <svg-icon icon-class="locate-white" style="size:14px;"></svg-icon>
          <span class="gb-text-1-omit" style="max-width:5rem;">{{ $store.state.mdeUserInfo.userAddrInfo.addr }}</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <!-- BEGIN 导航图标 -->
    <div class="nav-icon-div">
      <mu-flex justify-content="around">
        <div @click="linkToGameList">
          <div style="text-align:center;">
            <svg-icon icon-class="game" class="icon-class"></svg-icon>
          </div>
          <div class="nav-icon-text">游 戏</div>
        </div>

        <div @click="linkToPartyList">
          <div style="text-align:center;">
            <svg-icon icon-class="party" class="icon-class"></svg-icon>
          </div>
          <div class="nav-icon-text">聚 会</div>
        </div>

        <div @click="linkToTravelList">
          <div style="text-align:center;">
            <svg-icon icon-class="travel" class="icon-class"></svg-icon>
          </div>
          <div class="nav-icon-text">旅 游</div>
        </div>

        <div @click="linkToInstant">
          <div style="text-align:center;">
            <svg-icon icon-class="team_now" class="icon-class"></svg-icon>
          </div>
          <div class="nav-icon-text">即 时</div>
        </div>
      </mu-flex>
    </div>
    <!-- END 导航栏 -->

    <!-- BEGIN 头部话题、美文轮播图 -->
    <div v-if="CarouselIsShow" class="swiper-div">
        <swiper :options="SwiperOption">
          <swiper-slide 
            v-for="(item, index) in ArticleList" 
            :key="index">
            <mu-flex 
              style="position:relative;" 
              wrap="wrap" 
              @click="linkToArticleDetail(item.articleID)">
              <img class="swiper-img" :src="item.displayImg | imgPrefixDeal()" alt="">
              <mu-flex class="swiper-text" justify-content="start">{{ item.title }} </mu-flex>
            </mu-flex>
          </swiper-slide>
        </swiper>
    </div> 
    <!-- END 头部话题、 美文轮播图 -->

    <mu-row style=" border-top:2px solid #f5f5f5;"></mu-row>

    <!-- 热门游戏组队 -->
    <mu-sub-header>
      <span class="cat-title-text">- 游戏 . 热门组队 -</span>
    </mu-sub-header> 

    <mu-flex style="padding:.3rem 1rem;" wrap="wrap" justify-content="between">
      <mu-flex 
        v-for="(item, index) in GameList" 
        :key="index" 
        wrap="wrap"
        @click="linkToGameDetail(item.gID)" 
        class="game-team-div">    
        <img class="game-team-img" :src="item.logo | imgPrefixDeal()" alt="">
        <div class="game-team-text">{{ item.gName }}</div>
      </mu-flex>
    </mu-flex>

    <mu-row style=" border-top:2px solid #f5f5f5;"></mu-row>

    <!-- 官方推荐组队 -->
    <mu-sub-header>
      <span class="cat-title-text">- 官方 . 推荐组队 -</span>
    </mu-sub-header> 

    <div class="official-team-div">
      <!-- 这里就显示官方活动或者商家活动 -->
      <mu-flex 
        v-for="(item, index) in ActivityList" 
        :key="index" 
        @click="linkToActivityDetail(item.activityID)" 
        class="official-team-flex"
        wrap="wrap">

        <mu-flex style="position:relative;">
          <img class="official-team-img" :src="item.displayImg | imgPrefixDeal()">
        </mu-flex>
        <mu-flex style="padding:.8rem .5rem;">
          <span style="font-weight:700;">{{ item.title }}</span>
        </mu-flex>
        <mu-flex class="official-team-flex2" wrap="wrap">
          <div style="width:100%;">
            于 <span style="color:#795548;">{{ item.beginTime | formatTime('{m}/{d} {h}:{i}') }}</span> 
          </div>
          <div>
            在 <span style="color:#795548">{{ item.venue.name }}</span> 与你相聚
          </div>
        </mu-flex>
        <mu-flex class="official-team-flex3" align-items="center">
          <mu-icon value="person_pin_circle" size="20" color="#009688"></mu-icon>
          <span style="font-size:12px;">距离你{{ item.distance | distanceFormat() }}</span>
          <span style="font-size:12px; color:#00bcd4; margin-left:auto;">去看看！</span>
        </mu-flex>

      </mu-flex>
    </div>

    <!-- 加载层 -->
    <!-- <mu-flex 
      v-if="InitLoading" 
      align-items="center" 
      justify-content="center" 
      v-loading="true" 
      data-mu-loading-color="red"
      class="gb-init-loading"></mu-flex> -->
    <Loading v-if="InitLoading" />
    

    <!-- BEGIN 地址选择弹出框 -->
    <div v-if="AddrChooseWindowIsShow" id="iframe" style="position:fixed; top:0; width:100%; height:100%; z-index:999;">
      <mu-flex 
        @click="shutdownWindow" 
        style="width:10%; height:2.8rem; position:fixed; top:0; left:0; background:#F8F8F8; text-align:center; padding: 0 0 0 .5rem;" 
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


    <Footer navActive="mainPage" />
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import utils from 'common/utils.js'
import { wxInit } from '@/common/wxInit.js'
import Loading from '@/components/Loading.vue'
export default {
  name: 'home',
  components: {
    Footer,
    Loading
  },
  data () {
    return {
      ShareTitle: '', // 分享title
      ShareDesc: '',  // 分享描述
      ShareImgUrl: '',  // 分享图片

      CarouselIsShow: false,

      InitLoading: true, // 初始化加载框

      AddrChooseWindowIsShow: false,
      ChooseAddrInfo: {
        name: '',
        location: '',
        address: '',
      },
      Lng: 113.186702,
      Lat: 23.035872,

      ArticleList: [],
      ActivityList: [
        {
          activityID: 1,
          title: "这里是我的标题",
          type: 1,
          beginTime: 1561864483,
          endTime: 1561865483,
          venue: {
            name: "万利商务中心",
            lng: 113.186702,
            lat: 23.035872,
            addr: "夏平西路石龙北路路口附近"
          },
          displayImg: "",
          recruitNumb: 30,
          distance: 12235652.41335938,
          recruitStatus: 0
        }
      ],
      GameList: [
        {
          gID: 5,
          teamNumb: 2,
          logo: "",
          gName: "洛奇英雄传"
        },
      ],

      SwiperOption: {
        effect: 'coverflow',  // 切换效果
        grabCursor: true,   // 手形
        centeredSlides: true,   // 活动块居中
        slidesPerView: 'auto',  
        loop: true,   // 是否循环播放
        autoplay: true, // 是否自动播放
        delay: 5000,  // 5s切换一次
        speed: 2000,  // 切换所用的时间
        coverflowEffect: {  // 这个看手册吧
          rotate: 50,
          stretch: 15,
          depth: 100,
          modifier: 1,
          slideShadows : false, 
        }
      }
    }
  },
  mounted () {
    wxInit(this, true)
  },
  methods:{
    pageInit () {

      let locationInfo = utils.getLocationInfo()
      this.Lng = locationInfo.lng
      this.Lat = locationInfo.lat

      // 获取首页内容
      this.$axios.get(
        `/user/homePage/${locationInfo.lng}/${locationInfo.lat}`, {}
      ).then((resp)=>{
        // 开始处理返回的数据
        let data = resp.data.msg

        this.ActivityList = data.activityList // 活动列表

        this.ArticleList = data.articleList // 文章列表(轮播图)

        this.GameList = data.gameList  // 游戏列表

        this.CarouselIsShow = true

        this.$store.commit('mdeInterface/unreadMsgUpdate', data.unReadMsg)

        this.ShareTitle = '一起来组队，走近你我！'    // 分享title
        this.ShareDesc = this.$store.state.mdeLogin.usrInfo.nickname + '为您推荐一个交友组队平台！玩游戏没人？来这里。想出去走走？来这里。'  // 分享描述
        this.ShareImgUrl = 'https://www.icoming.top/image/logo/zhuzhu-logo.png'  // 分享图片

        this.InitLoading = false
      })
    },
    linkToGameList () {
      this.$router.push('/game/list')
    },
    linkToPartyList () {
      this.$router.push('/party/list')
    },
    linkToTravelList () {
      this.$router.push('/travel/list')
    },

    linkToArticleDetail (articleID) {
      this.$router.push(`/article/detail/${articleID}`)
    },
    linkToActivityDetail (activityID) {
      this.$router.push(`/activity/detail/${activityID}`)
    },
    linkToGameDetail (gameID) {
      this.$router.push(`/game/detail/${gameID}`)
    },
    linkToInstant () {
      this.$router.push('/instant/newTeam')
    },

    loadiframe () {
      let iframe = document.getElementById('getAddress').contentWindow
      iframe.postMessage('hello', 'https://m.amap.com/picker/')
      window.addEventListener("message", function (e) {
        if (e.data.command != "COMMAND_GET_TITLE") {
          this.ChooseAddrInfo = e.data
          this.LocateAddr = e.data.name
          let location = e.data.location.split(',')

          this.$store.commit('mdeUserInfo/locationUpdate2', {
            lng: location[0],
            lat: location[1],
            name: e.data.name,
            addr: e.data.address
          })
          this.AddrChooseWindowIsShow = false  
          this.$router.replace('/')
        }

      }.bind(this), false)
    },
    chooseAddr () { // 点击选择地址的时候，弹出地址选择窗口
      this.AddrChooseWindowIsShow = true
    },
    shutdownWindow () { // 关闭地图窗口
      this.AddrChooseWindowIsShow = false
    },
  },

}
</script>

<style scoped>
.home { width:100%; position: relative; float:left; background:#fff; }


.nav-icon-div { margin-top:2.5rem; padding:1.2rem 0 1rem 0; background:#fff; border-bottom:1px solid #eeeeee; }
.nav-icon-text { text-align:center; font-size:12px; margin-top:.3rem; }

.swiper-div { margin-top:1rem; margin-bottom:1rem; }
.swiper-inner { width: 100%; height: auto; padding-top: 50px; padding-bottom: 50px; }
.swiper-slide { background-position: center; background-size: cover; width: 85%; height: auto; }
.swiper-img { max-width:100%; height:auto; border-radius:.3rem; }
.swiper-text { width:100%; position:absolute; bottom:0;  left:0; padding:.6rem .5rem; background:rgba(0, 0, 0, .5); color:#fff; border-bottom-left-radius:.3rem; border-bottom-right-radius:.3rem; }

.cat-title-text { font-size:14px; font-weight:600; color:#00bcd4; }

.game-team-div { padding:0 .5rem; width:26%; margin-bottom:1rem; }
.game-team-img { max-width:100%; border-radius:.3rem; box-shadow: 0px 0px 1px #bdbdbd; }
.game-team-text { width:100%; text-align:center; margin-top:.3rem; font-size:13px; letter-spacing: 1px; }


.official-team-div { margin-bottom:4rem; padding:.3rem 1rem; }
.official-team-flex { box-shadow:0 0 1px gray; border-radius:.3rem; margin-bottom:2rem; }
.official-team-img { max-width:100%; max-height:100%; border-top-left-radius:.3rem; border-top-right-radius:.3rem; }
.official-team-flex2 { width:100%; font-size:13px; padding:.2rem .5rem .5rem .5rem; }
.official-team-flex3 { width:100%; padding:0 .1rem .5rem .2rem; margin-top:.5rem; }

.main-nav { position: relative; width: 30%; height: 3rem; display: flex; justify-content: center; align-items: center; 
            border-radius: 4px; margin-left: 2%; margin-top: .5rem; color: white; }

.icon-class {font-size:30px;}

.card-panel-icon{ width:2rem; height:2rem;  }
.map-item { position: fixed; width: 100%; height: 100%; top: 0; background: #fff; }
</style>