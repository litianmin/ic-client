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

    <!-- // 游戏\话题\周边游        -->

 
    <!-- <div style="width:100%; height:5rem; margin-top:1.2rem;">
      <mu-row justify-content="center">
        <div @click="linkToGameList" style="float:left; width:20%; height:3rem; text-align:center;">
          <svg-icon icon-class="game" class="icon-class"></svg-icon>
          <div style="margin-top:.2rem; font-size:12px;">游 戏</div>
        </div>

        <div style="float:left; width:20%; height:3rem; margin-left:10%; text-align:center;">
          <svg-icon icon-class="tour" class="icon-class"></svg-icon>
          <div style="margin-top:.2rem; font-size:12px;">聚 会</div>
        </div>

        <div style="float:left; width:20%; height:3rem; margin-left:10%; text-align:center;">
          <svg-icon icon-class="topic2" class="icon-class"></svg-icon>
          <div style="margin-top:.2rem; font-size:12px;">周 边 游</div>
        </div>

        <div style="float:left; width:20%; height:3rem; margin-left:10%; text-align:center;">
          <svg-icon icon-class="topic2" class="icon-class"></svg-icon>
          <div style="margin-top:.2rem; font-size:12px;">自 定 义</div>
        </div>
      </mu-row>
    </div> -->

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

    <mu-row style="margin-top:0rem;"></mu-row>
    <mu-divider></mu-divider>
    <mu-sub-header><span style="font-size:14px; font-weight:600; color:#795548;">- 动态 . 足迹 -</span></mu-sub-header> 

    <!-- BEGIN 附近组队信息，好友动态和悄悄话 -->
    <mu-container style="margin-top:1rem; margin-bottom:2rem;">
      <mu-row justify-content="center">
        <mu-col span="12">
          <div style="width:100%; background:#f5f5f5; border-radius:1rem; padding:0.1rem 0.1rem;">

            <mu-row style="background:white; padding:0.5rem; border-top-left-radius:0.5rem; border-top-right-radius:0.5rem; padding:1rem .5rem .5rem 1rem;">
              <mu-col span="2">
                <mu-avatar :size="34" class="avatar-distance">
                  <img src="http://img4.imgtn.bdimg.com/it/u=3868410791,3959511573&fm=26&gp=0.jpg">
                </mu-avatar>
              </mu-col>
              <mu-col span="7" style="">
                <mu-row>Ae</mu-row>
                <mu-row style="font-size:5px; color:#651fff;">社交达人</mu-row>
              </mu-col>
              <mu-col span="3" style="padding:0.4rem; color:#00b0ff;">
                查看详情
              </mu-col>
            </mu-row>

            <mu-row>
              <!-- http://img2.imgtn.bdimg.com/it/u=3967207443,110383055&fm=26&gp=0.jpg -->
              <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
                <mu-card-media title="巴黎阿萨塔" sub-title="">
                  <img src="http://img0.imgtn.bdimg.com/it/u=208836676,259468604&fm=26&gp=0.jpg">
                  <mu-flex style="position:absolute; right:1rem; bottom:0.5rem; z-index:9999; color:#FFFFFF">
                    <mu-button slot="action" icon>
                      <mu-icon value="star_border"></mu-icon>
                    </mu-button>
                  </mu-flex>
                </mu-card-media>
                <mu-card-title title="巴黎阿萨塔" sub-title="真的很不错的"></mu-card-title>
                <mu-card-text>
                  散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                  调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                  似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                  找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                </mu-card-text>
                <mu-card-actions>
                  <mu-button flat>Action 1</mu-button>
                  <mu-button flat>Action 2</mu-button>
                </mu-card-actions>
              </mu-card>
            </mu-row>

          </div>
        </mu-col>
      </mu-row>
    </mu-container>
    <!-- END 附近组队信息， 好友动态和悄悄话 -->


    <!-- BEGIN 附近组队信息，好友动态和悄悄话 -->
    <mu-container style="margin-top:2rem; margin-bottom:2rem;">
      <mu-row justify-content="center">
        <mu-col span="12">
          <div style="width:100%; background:#eeeeee; border-radius:1rem; padding:0.5rem 0.5rem;">

            <mu-row style="background:white; padding:0.5rem; border-top-left-radius:0.5rem; border-top-right-radius:0.5rem; padding:1rem .5rem .5rem 1rem;">
              <mu-col span="2">
                <mu-avatar :size="34" class="avatar-distance">
                  <img src="http://img4.imgtn.bdimg.com/it/u=3868410791,3959511573&fm=26&gp=0.jpg">
                </mu-avatar>
              </mu-col>
              <mu-col span="7" style="">
                <mu-row>Ae</mu-row>
                <mu-row style="font-size:5px; color:#651fff;">社交达人</mu-row>
              </mu-col>
              <mu-col span="3" style="padding:0.4rem; color:#00b0ff;">
                查看详情
              </mu-col>
            </mu-row>

            <mu-row>
              <!-- http://img2.imgtn.bdimg.com/it/u=3967207443,110383055&fm=26&gp=0.jpg -->
              <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
                <mu-card-media title="巴黎阿萨塔">
                  <img src="http://img0.imgtn.bdimg.com/it/u=208836676,259468604&fm=26&gp=0.jpg">
                  <mu-flex style="position:absolute; right:1rem; bottom:0.5rem; z-index:9999; color:#ff4081">
                    <mu-button slot="action" icon>
                      <mu-icon value="favorite_border"></mu-icon>
                    </mu-button>
                  </mu-flex>
                </mu-card-media>

                <mu-card-title title="巴黎阿萨塔" sub-title="真的很不错的"></mu-card-title>

                <mu-card-text>
                  散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                  调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                  似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                  找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                </mu-card-text>

                <mu-flex style="position:absolute; bottom:.8rem; left:1rem;">
                  <mu-avatar :size="28" class="avatar-distance" style="border:1px solid white;">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3062268355,2539741402&fm=26&gp=0.jpg">
                  </mu-avatar>
                  <mu-avatar :size="28" class="avatar-distance" style="margin-left:-1.2rem; border:1px solid white;">
                    <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1323332805,2125484119&fm=26&gp=0.jpg">
                  </mu-avatar>
                  <mu-avatar :size="28" class="avatar-distance" style="margin-left:-1.2rem; border:1px solid white;">
                    <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2419698804,4027724336&fm=26&gp=0.jpg">
                  </mu-avatar>
                  <mu-avatar :size="28" class="avatar-distance" style="margin-left:-1.2rem; border:1px solid white;">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2945299582,2249723893&fm=26&gp=0.jpg">
                  </mu-avatar>
                  <mu-avatar :size="28" class="avatar-distance" style="margin-left:-1.2rem; border:1px solid white;">
                    <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=945164776,864634645&fm=26&gp=0.jpg">
                  </mu-avatar>
                </mu-flex>



                <mu-card-actions style="padding:0 1.5rem .8rem 0.5rem; float:right; margin-top:1rem;">       
                  <mu-button icon small color="gray">
                    <mu-icon value="directions_run"></mu-icon>
                  </mu-button>

                  <!-- <mu-button icon small color="gray">
                    <mu-icon value="thumb_up"></mu-icon>
                  </mu-button> -->
                  <mu-button icon small color="gray">
                    <mu-icon value="share"></mu-icon>
                  </mu-button>

                  <mu-button icon small color="gray">
                    <mu-icon value="sms"></mu-icon>
                  </mu-button>

                </mu-card-actions>

              </mu-card>
            </mu-row>

          </div>
        </mu-col>
      </mu-row>
    </mu-container>
    <!-- END 附近组队信息， 好友动态和悄悄话 -->


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

