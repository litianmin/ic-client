<template>
  <div class="home">

    <!-- BEGIN 头部 -->
    <mu-flex align-items="center" style="background:#00bcd4; padding:.5rem .3rem .5rem .5rem; color:#ffffff;">
      <mu-flex align-items="center">
        <mu-avatar size="30"><img :src="selfAvatar" alt=""></mu-avatar>
        <span style="margin-left:.5rem;">{{ selfNickname }}</span>
      </mu-flex>
      <mu-flex style="margin-left:auto;" align-items="center">
          <span>吴川市</span>
          <mu-icon color="#fff" size="18" value="person_pin_circle"></mu-icon>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->

    <div style="padding:1.2rem 0 1rem 0; background:rgba(240, 240, 240, .4); border-bottom:1px solid #eeeeee;">
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
          <div style="text-align:center; font-size:12px; margin-top:.3rem;">周 边 游</div>
        </div>

        <div>
          <div style="text-align:center;">
            <svg-icon icon-class="selfedit" class="icon-class"></svg-icon>
          </div>
          <div style="text-align:center; font-size:12px; margin-top:.3rem;">自 定 义</div>
        </div>
      </mu-flex>
    </div>

    <!-- BEGIN 头部话题、美文轮播图 -->
    <div style="margin-top:1rem; margin-bottom:1rem">
        <swiper :options="swiperOption">
            <swiper-slide v-for="(item, index) in friendsMsgsList" :key="index">
              <img class="swiper-img" :src="item.avatar" alt="">
            </swiper-slide>
        </swiper>
    </div> 
    <!-- END 头部话题、 美文轮播图 -->

    <mu-row style="margin-top:0rem; border-top:1px solid #eeeeee;"></mu-row>
    <!-- <mu-divider></mu-divider> -->
    <mu-sub-header>
      <span style="font-size:14px; font-weight:600; color:#795548;">- 热点 . 活动 -</span>
    </mu-sub-header> 

    <!-- 这里就显示官方活动或者商家活动 -->
    <div style="width:100%; margin-bottom:3rem;">
      <mu-row style="padding:.4rem;">
          <div>
            <span>这是我的标题</span>
          </div>
          <div>
            <span>地点:来就对了</span>
            <span style="margin-left:auto;">03:03</span>
          </div>
        </mu-col>
      </mu-row>

      <mu-row>
        
      </mu-row>
    </div>

    <!-- BEGIN  用户窗口-->
    <div>
      <UsrWindow/>
    </div>
    <!-- END 用户窗口 -->

    <div class="footer">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import UsrWindow from '@/views/usr/usrwindow/UsrWindow.vue'
export default {
  name: 'home',
  data () {
    return {
      selfAvatar: '',
      selfNickname: '',
      friendsMsgsList: [
        {id: 1, avatar: "http://img1.imgtn.bdimg.com/it/u=1933646039,1559720906&fm=26&gp=0.jpg"},
        {id: 2, avatar: "http://img4.imgtn.bdimg.com/it/u=2978120334,1182775360&fm=26&gp=0.jpg"},
        {id: 3, avatar: "http://img4.imgtn.bdimg.com/it/u=288298761,4065532967&fm=26&gp=0.jpg"}
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
    this.selfAvatar = this.$store.state.mdeLogin.usrInfo.avatar
    this.selfNickname = this.$store.state.mdeLogin.usrInfo.nickname
  },
  methods:{
    linkToGameList () {
      this.$router.push('/game/list')
    },
    linkToPartyList () {
      this.$router.push('/party/list')
    },
    linkToTravelList () {
      this.$router.push('/travel/list')
    },
  },
  components: {
    Footer,
    UsrWindow
  }
}
</script>

<style lang="stylus" scoped>
.home { width:100%; position: relative; float:left;}
.swiper-inner { width: 100%; height: auto; padding-top: 50px; padding-bottom: 50px; }
.swiper-slide { background-position: center; background-size: cover; width: 85%; height: auto; }
.swiper-img { max-width:100%; height:auto; border-radius:.3rem; }
.main-nav { position: relative; width: 30%; height: 3rem; display: flex; justify-content: center; align-items: center; 
            border-radius: 4px; margin-left: 2%; margin-top: .5rem; color: white; }

.icon-class {font-size:30px;}

.card-panel-icon{ width:2rem; height:2rem;  }

  .footer
    width:100%; position:fixed; bottom:0;

  .usrfortest
    width:100%; height:90%;

  .container-one
    width:100%; padding:0.5rem 0.5rem 0.2rem 1rem; border-bottom:1px solid #CCCCCC; overflow:auto;

  .avatar-distance
    margin-right .8rem
    margin-bottom .3rem

  .myclass:before
    content " "
    position relative
    top .5rem
    left 0.6rem
    display block
    width .8rem 
    height .8rem
    transform rotate(45deg)
    -ms-transform rotate(45deg)
    -webkit-transform rotate(45deg)
    -o-transform rotate(45deg)
    -moz-transform rotate(45deg)
    background #66bb6a
    z-index 9999
    
  .myclass-2:after
    content " "
    position relative
    top .5rem
    right 0.6rem
    display block
    width .8rem 
    height .8rem
    transform rotate(45deg)
    -ms-transform rotate(45deg)
    -webkit-transform rotate(45deg)
    -o-transform rotate(45deg)
    -moz-transform rotate(45deg)
    background #2196f3
    z-index 9999 

.mu-card-media-title 
  .mu-card-title 
    font-size 20px
    color hsla(0,0%,100%,.87)
    line-height 28px

.grid-cell 
  border-radius 4px
  height 36px
  background red






</style>

