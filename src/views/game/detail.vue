<template>
  <div>

    <mu-appbar class="mine-appbar" color="#009688">
      <mu-button icon slot="left">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div style=" font-size:14px;">
        洛奇英雄传
      </div>
    </mu-appbar>

    <!-- swiper1 -->
    <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">

      <swiper-slide v-for="(item, index) in displayImgList" :key="index">
        <img class="swiper-img" :src="item.avatar" alt="">
      </swiper-slide>
    </swiper>
    <!-- swiper2 Thumbs -->
    <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
      <swiper-slide v-for="(item, index) in displayImgList" :key="index">
        <img class="swiper-img" :src="item.avatar" alt="">
      </swiper-slide>
    </swiper>

    <mu-row style="margin-top:.5rem; padding:0 .5rem; margin-bottom:.5rem;">
      <mu-col span="12">
        <div>
          <span style="color:black; font-size:14px;">简介：</span> <span style="color:#9e9e9e; font-size:12px;">洛奇英雄传是我最喜欢的游戏哦，不管你喜不喜欢，反正我很喜欢啦，一款大型聊天站街游戏！</span>
        </div> 
      </mu-col>
    </mu-row>

    <!-- <mu-divider></mu-divider> -->

    <div style="margin-top:.5rem; padding:0 .5rem;">
      <mu-badge content="端游" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
      <mu-badge content="角色扮演" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
      <mu-badge content="格斗" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
    </div>


<!-- <mu-container> -->
<div style="margin-top:.8rem;">
  <mu-divider></mu-divider>
  <mu-tabs :value.sync="active" inverse color="#80cbc4" indicator-color="#80cbc4" text-color="rgba(0, 0, 0, .54)"  full-width id="tabBar" :class="tabBarFixed == true ? 'isFixed' :''">
    <mu-tab><span>评 论</span></mu-tab>
    <mu-tab><span>组 队</span></mu-tab>
  </mu-tabs>
  <!-- BEGIN 评论 -->
  <mu-container v-show="active === 0" style="margin-top:.5rem; padding:.5rem 1rem;">
    <mu-flex align-items="center">
      <mu-avatar size="28">
        <img src="http://img4.imgtn.bdimg.com/it/u=406799163,4023058385&fm=11&gp=0.jpg">
      </mu-avatar>
      <span style="margin-left:.5rem; font-size:14px;">
        小鸟依人哦 
      </span>
      <span style="margin-left: auto; font-size:12px; color:#9e9e9e;">2018-01-02 01:02:03</span>
    </mu-flex>

    <mu-row>
      其实啊，我真的不想那样做，但是我不那样做的话，我又会出现这样那样的问题，为什么呢，因为我也不想的啊
    </mu-row>

  </mu-container>
  <!-- END 评论 -->

  <!-- BEGIN 组队 -->
  <mu-container v-show="active === 1" style="margin-top:.5rem;">
    <mu-flex>
      应该是一样的吧，其实我真的不懂怎么写样式，不过就是布局的话，我觉得超难搞耶
    </mu-flex>
  </mu-container>
  <!-- END 组队 -->
</div>
<!-- </mu-container> -->


  </div>
</template>


<script>
  export default {
    data() {
      return {
        swiperOptionTop: {
          spaceBetween: 10,
          loop: true,
          loopedSlides: 5, //looped slides should be the same
          autoplay: true, // 是否自动播放
          delay: 5000,  // 5s切换一次
          speed: 2000,  // 切换所用的时间
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          }
        },
        swiperOptionThumbs: {
          spaceBetween: 10,
          slidesPerView: 4,
          touchRatio: 0.2,
          loop: true,
          loopedSlides: 5, //looped slides should be the same
          slideToClickedSlide: true,
        },

        displayImgList: [
        {id: 1, avatar: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2481108828,1517439278&fm=26&gp=0.jpg"},
        {id: 2, avatar: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2481108828,1517439278&fm=26&gp=0.jpg"},
        {id: 3, avatar: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2481108828,1517439278&fm=26&gp=0.jpg"},
        {id: 4, avatar: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2481108828,1517439278&fm=26&gp=0.jpg"},
        {id: 5, avatar: "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2481108828,1517439278&fm=26&gp=0.jpg"}
      ],

      active: 0,
      tabBarFixed: false

      }
    },
    mounted () {
      this.$nextTick(() => {
        const swiperTop = this.$refs.swiperTop.swiper
        const swiperThumbs = this.$refs.swiperThumbs.swiper
        swiperTop.controller.control = swiperThumbs
        swiperThumbs.controller.control = swiperTop
      })

      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll () {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        let offsetTop = document.querySelector('#tabBar').offsetTop

        if (scrollTop > offsetTop) {
          this.tabBarFixed = true
        } else {
        this.tabBarFixed = false
        }
      }
    },
    destroyed () {
      window.removeEventListener('scroll', this.handleScroll)
    },
  }
</script>

<style scoped>

.mine-appbar { width: 100%; height:2.5rem; }

.swiper-container { background-color: #e0e0e0; }
.swiper-slide { background-size: cover; background-position: center; }
.swiper-img { max-width:100%; height:auto; border-bottom-left-radius:3px; border-bottom-right-radius:5px; }


.gallery-top { height: 80%!important; width: 100%; margin-top:.1rem; }
.gallery-thumbs { height: 20%!important; box-sizing: border-box; padding: 1px 0; }
.gallery-thumbs .swiper-slide { width: 25%; height: 100%; opacity: 0.4; }
.gallery-thumbs .swiper-slide-active { opacity: 1; }

 .isFixed{ position:fixed; background-color:#Fff; top:0; z-index:999; }

</style>