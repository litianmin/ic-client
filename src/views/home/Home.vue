<template>
  <div class="home">

    <!-- BEGIN 头部 -->
    <mu-flex align-items="center" style="background:#26c6da; padding:.5rem .3rem .5rem .5rem; color:#ffffff;">
      <mu-flex align-items="center">
        <mu-avatar size="30"><img :src="selfAvatar" alt=""></mu-avatar>
        <span style="margin-left:.5rem;">{{ selfNickname }}</span>
      </mu-flex>
      <mu-flex style="margin-left:auto;" align-items="center">
          <span>{{ LocateDistrict }}</span>
          <mu-icon color="#fff" size="18" value="person_pin_circle"></mu-icon>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <!-- BEGIN 导航栏 -->
    <div style="padding:1.2rem 0 1rem 0; background:rgba(240, 240, 240, .1); border-bottom:1px solid #eeeeee;">
      <mu-flex justify-content="around">
        <div @click="linkToGameList">
          <div style="text-align:center;">
            <svg-icon icon-class="game" class="icon-class"></svg-icon>
          </div>
          <div style="text-align:center; font-size:12px; margin-top:.3rem;">游 戏</div>
        </div>

        <div @click="linkToPartyList">
          <div style="text-align:center;">
            <svg-icon icon-class="party" class="icon-class"></svg-icon>
            </div>
          <div style="text-align:center; font-size:12px; margin-top:.3rem;">聚 会</div>
        </div>

        <div @click="linkToTravelList">
          <div style="text-align:center;">
            <svg-icon icon-class="travel" class="icon-class"></svg-icon>
          </div>
          <div style="text-align:center; font-size:12px; margin-top:.3rem;">旅 游</div>
        </div>

        <div @click="linkToInstant">
          <div style="text-align:center;">
            <svg-icon icon-class="team_now" class="icon-class"></svg-icon>
          </div>
          <div style="text-align:center; font-size:12px; margin-top:.3rem;">即 时</div>
        </div>
      </mu-flex>
    </div>
    <!-- END 导航栏 -->

    <!-- BEGIN 头部话题、美文轮播图 -->
    <div v-if="CarsoucelIsShow" style="margin-top:1rem; margin-bottom:1rem; ">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in ArticleList" :key="index">
            <mu-flex style="position:relative; " wrap="wrap" @click="linkToArticleDetail(item.articleID)">
              <img class="swiper-img" :src="item.displayImg" alt="">
              <mu-flex style="width:100%; position:absolute; bottom:0;  left:0; padding:.6rem .5rem; background:rgba(0, 0, 0, .5); color:#fff; border-bottom-left-radius:.3rem; border-bottom-right-radius:.3rem;" justify-content="start">{{ item.title }} </mu-flex>
            </mu-flex>
            <!-- <mu-flex style="width:100%; background:#fff; padding:.7rem .5rem; border:1px solid #e0e0e0; border-top:0; border-bottom-left-radius:.3rem; border-bottom-right-radius:.3rem;">
              <span style="font-size:12px;">{{ item.title }}</span>
            </mu-flex> -->
          </swiper-slide>
        </swiper>
    </div> 
    <!-- END 头部话题、 美文轮播图 -->

    <mu-row style=" border-top:3px solid #ffffff;"></mu-row>
    <!-- <mu-divider></mu-divider> -->
    <mu-sub-header>
      <span style="font-size:14px; font-weight:600; color:#00bcd4;">- 游戏 . 热门组队 -</span>
    </mu-sub-header> 

    <!-- 这里就显示官方活动或者商家活动 -->
    <mu-flex style="padding:.3rem .5rem;" wrap="wrap">
      <div v-for="(item, index) in GameList" :key="index" @click="linkToGameDetail(item.gID)" style="padding:0 .5rem; min-width:30%; max-width:33%; margin-bottom:1rem;">    
        <img style="max-width:100%; border-radius:.3rem; box-shadow: 0px 0px 1px #bdbdbd;" :src="item.logo" alt="">
        <div style="width:100%; text-align:center;margin-top:.1rem; font-size:12px;">{{ item.gName }}</div>
      </div>
    </mu-flex>

    <mu-row style=" border-top:3px solid #ffffff;"></mu-row>

    <!-- 官方推荐组队 -->
    <mu-sub-header>
      <span style="font-size:14px; font-weight:600; color:#00bcd4;">- 官方 . 推荐组队 -</span>
    </mu-sub-header> 

    <div style="margin-bottom:4rem; padding:.3rem 1rem;">
      <!-- 这里就显示官方活动或者商家活动 -->
  
      <mu-flex v-for="(item, index) in ActivityList" :key="index" @click="linkToActivityDetail(item.activityID)" style="box-shadow:0 0 1px gray; border-radius:.3rem; margin-bottom:2rem;" wrap="wrap">
        <mu-flex style="position:relative;">
          <img style="max-width:100%; max-height:100%; border-top-left-radius:.3rem; border-top-right-radius:.3rem;" :src="item.displayImg" alt="">
        </mu-flex>
        <mu-flex style="padding:.8rem .5rem;">
          <span style="font-weight:700;">{{ item.title }}</span>
        </mu-flex>
        <mu-flex style="width:100%; font-size:13px; padding:.2rem .5rem .5rem .5rem;" wrap="wrap">
          <div style="width:100%;">于 <span style="color:#795548;">{{ item.beginTime }}</span> </div>
          <div>在 <span style="color:#795548">{{ item.venue.name }}</span> 与你相聚</div>
        </mu-flex>
        <mu-flex style="width:100%; padding:0 .1rem .5rem .2rem; margin-top:.5rem;" align-items="center">
          <mu-icon value="person_pin_circle" size="20" color="#009688"></mu-icon>
          <span style="font-size:12px;">距离你{{ item.distance }}</span>
          <span style="font-size:12px; color:#00bcd4; margin-left:auto;">去看看！</span>
        </mu-flex>
      </mu-flex>
    </div>

    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import utils from 'common/utils.js'
import { getWeConfig, getWxLocate } from 'common/wxInit.js'
import wx from 'weixin-js-sdk'
export default {
  name: 'home',
  data () {
    return {
      selfAvatar: '',
      selfNickname: '',
      LocateDistrict: '',
      CarsoucelIsShow: false,
      ArticleList: [
        {
          articleID: 1,
          title: "121212",
          type: 1,
          beginTime: 1561737600,
          endTime: 1563897600,
          displayImg: "http://img2.imgtn.bdimg.com/it/u=150877727,2930125005&fm=26&gp=0.jpg"
        },
      ],
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
          displayImg: "http://img2.imgtn.bdimg.com/it/u=150877727,2930125005&fm=26&gp=0.jpg",
          recruitNumb: 30,
          distance: 12235652.41335938,
          recruitStatus: 0
        }
      ],
      GameList: [
        {
          gID: 5,
          teamNumb: 2,
          logo: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=150895625,2917525328&fm=26&gp=0.jpg",
          gName: "洛奇英雄传"
        },
      ],

      swiperOption: {
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
    console.log('刷新应该也会执行的吧')
    let _that = this
    let params = {
      url: location.href
    }
    this.$axios.post('/user/wxConfigInit', params).then((configInfo) => {
      let info = configInfo.data.msg
      wx.config({
          debug: true,
          appId: info.appID,
          nonceStr: info.nonceStr,
          timestamp: info.timeStamp,
          url: location.href,
          signature: info.signature,
          jsApiList: ['checkJsApi', 'translateVoice', 'openLocation', 'getLocation']
      })
      
      wx.ready(() => {
        console.log('我觉得刷新是因为没有在这里什么了')
        wx.getLocation({
          success: function (resp) {
            let lat = resp.latitude
            let lng = resp.longitude

            _that.$axios.get(`https://restapi.amap.com/v3/geocode/regeo?&location=${lng},${lat}&key=2d617a69e7365b889469daf971c3eb71`, {}).then((resp2) => {
              if(resp2.data.status == '1') {
                let locateAddr = resp2.data.regeocode.addressComponent.district
                let payload = {
                  lng,
                  lat,
                  district: locateAddr  
                }
                _that.$store.commit('mdeUserInfo/locationUpdate', payload)
                _that.pageInit()
              }
            })

          }, 
          error: function (resp) {
            console.log(resp)
          }
        })
      })
    })


    // getWxLocate().then(() => {
      

    // })

    // let _that = this
    // getWeConfig().then((resp) => {
    //   wx.getLocation({
    //     success (res) {
    //       _that.$axios.get(`https://restapi.amap.com/v3/geocode/regeo?&location=${res.longitude},${res.latitude}&key=2d617a69e7365b889469daf971c3eb71`, {}).then((resp) => {
    //         if(resp.data.status == '1') {
    //           let locateAddr = resp.data.regeocode.addressComponent.district
    //           let payload = {
    //             lng: res.longitude,
    //             lat: res.latitude,
    //             district: locateAddr  
    //           }
    //           _that.$store.commit('mdeUserInfo/locationUpdate', payload)
    //           console.log('初始化成功')
    //           _that.pageInit()
    //         }
    //       })
    //     },
    //     cancel (res) {
    //       console.log('我不准你获取我的地址')
    //     }
    //   })
    // })

    // // 真的觉得好烦啊，微信风向，我镇的是日了

    // wx.updateAppMessageShareData({ 
    //     title: this.LocateDistrict, // 分享标题
    //     desc: '测试分享', // 分享描述
    //     link: document.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    //     imgUrl: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1820523987,3798556096&fm=26&gp=0.jpg', // 分享图标
    //     success: function () {
    //       // 设置成功
    //     }
    // })

  },
  computed: {
    LocateDistrict () {
      return this.$store.state.mdeUserInfo.userAddrInfo.district
    }
  },
  methods:{
    pageInit () {
      this.selfAvatar = this.$store.state.mdeLogin.usrInfo.avatar
      this.selfNickname = this.$store.state.mdeLogin.usrInfo.nickname
      this.LocateDistrict = this.$store.state.mdeUserInfo.userAddrInfo.district
      console.log(this.$store.state.mdeUserInfo.userAddrInfo)

      let lng = 113.207
      let lat = 22.9058
      // 获取首页内容
      this.$axios.get(
        `/user/homePage/${lng}/${lat}`, {}
      ).then((resp)=>{
        // 开始处理返回的数据
        let data = resp.data.msg
        console.log(data)

        let activityList = data.activityList  // 活动列表
        for(let i = 0; i < activityList.length; i++) {
          activityList[i].beginTime = utils.unixToDate(activityList[i].beginTime)
          activityList[i].displayImg = utils.imgPrefixDeal(activityList[i].displayImg)
          activityList[i].distance = utils.distanceFormat(activityList[i].distance)
        }
        this.ActivityList = activityList

        let articleList = data.articleList  // 文章列表(轮播图)
        for(let i = 0; i < articleList.length; i++) {
          articleList[i].displayImg = utils.imgPrefixDeal(articleList[i].displayImg)
        }
        this.ArticleList = articleList

        let gameList = data.gameList  // 游戏列表
        for(let i = 0; i < gameList.length; i++) {
          gameList[i].logo = utils.imgPrefixDeal(gameList[i].logo)
        }
        this.GameList = gameList


        this.CarsoucelIsShow = true
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
    }
  },
  components: {
    Footer,
  }
}
</script>

<style scoped>
.home { width:100%; position: relative; float:left; background:#fafafa;}
.swiper-inner { width: 100%; height: auto; padding-top: 50px; padding-bottom: 50px; }
.swiper-slide { background-position: center; background-size: cover; width: 85%; height: auto; }
.swiper-img { max-width:100%; height:auto; border-radius:.3rem; }
.main-nav { position: relative; width: 30%; height: 3rem; display: flex; justify-content: center; align-items: center; 
            border-radius: 4px; margin-left: 2%; margin-top: .5rem; color: white; }

.icon-class {font-size:30px;}

.card-panel-icon{ width:2rem; height:2rem;  }

.footer{width:100%; position:fixed; bottom:0;}

</style>