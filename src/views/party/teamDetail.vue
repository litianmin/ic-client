<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#00bcd4" z-depth="0.5">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        节日聚会
      </div>

      <span style="color:#fff; font-size:12px; padding:0 .5rem;" slot="right">创建组队</span>
    </mu-appbar>
    <!-- END 头部 -->

    <!-- BEGIN 招募图片展示 -->
    <!-- <swiper :options="swiperOption" style="height: auto">
      <swiper-slide style="text-align:center;">
        <img style="max-width:100%; max-height:100%;" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2501392519,3156888665&fm=26&gp=0.jpg" alt="">
      </swiper-slide>
      <swiper-slide style="text-align:center;">
        <img style="max-width:100%; max-height:100%;" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=86800378,2484401671&fm=26&gp=0.jpg" alt="">
      </swiper-slide>
      <swiper-slide style="text-align:center;">
        <img style="max-width:100%; max-height:100%;" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2821357322,839888098&fm=26&gp=0.jpg" alt="">
      </swiper-slide>

      <div class="swiper-pagination" slot="pagination"></div>
    </swiper> -->
    <!-- END 招募图片展示 -->



        <!-- 用户头部昵称 -->
        <!-- <div style="padding:.5rem; border-bottom:1px solid #eeeeee; ">
          <mu-flex align-items="center">
            <mu-avatar size="35">
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3913721637,490556209&fm=27&gp=0.jpg" alt="">
            </mu-avatar>
            <div style="margin-left:1rem;">
              <mu-row style="font-size:12px;">俺是黎添民</mu-row>
              <mu-row style="margin-top:.2rem;font-size:7px; color:#43a047;">社交菜鸟Lv1</mu-row>
            </div>
            <div style="margin-left:auto; background:#4db6ac; padding:.2rem .3rem; color:#fff; border-radius:.2rem; font-size:12px; margin-right:.5rem;">Team 22</div>
          </mu-flex>
        </div> -->

        <!-- 展示图片 -->
        <mu-flex style="position:relative;" justify-content="center">
          <swiper :options="swiperOption" style="height: auto">
            <swiper-slide style="text-align:center;">
              <img style="max-width:100%; max-height:100%;" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2501392519,3156888665&fm=26&gp=0.jpg" alt="">
            </swiper-slide>
            <swiper-slide style="text-align:center;">
              <img style="max-width:100%; max-height:100%;" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=86800378,2484401671&fm=26&gp=0.jpg" alt="">
            </swiper-slide>
            <swiper-slide style="text-align:center;">
              <img style="max-width:100%; max-height:100%;" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2821357322,839888098&fm=26&gp=0.jpg" alt="">
            </swiper-slide>

            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>
        </mu-flex>

        <div style="padding:.5rem 1rem 0rem .5rem;">
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:12px;">主要活动:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">什么活动</span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:12px;">活动地点:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">什么地点</span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:12px;">活动时间:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">2019/01/02 11:09  ~  2019/02/04 12:03</span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:12px;">集合地点:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">这是我的集合地点</span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:12px;">招募人数:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">20/<span style="color:green; font-size:10px;">10</span></span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:12px;">队友偏爱:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">这是我的队友偏爱</span>
          </mu-row>

          <mu-row style="margin-top:.5rem;">
            <span style="color:#795548; font-size:12px;">详细内容:            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">其实我也不是很清楚啊</span></span>
          </mu-row>
        </div>

        <mu-flex style="font-size:12px; padding:.8rem 1rem 1rem .5rem; margin-top:.5rem; border-bottom:1px dashed #bdbdbd;" align-items="center">
          <mu-icon value="person_pin_circle" color="green" size="18"></mu-icon>
          <span style="font-size:12px;">距离你 <span style="font-size:12px;">600米</span></span>
          <span style="margin-left:auto; color:#9e9e9e; font-size:12px;">3分钟前</span>
        </mu-flex>


        <!-- 用户头部昵称 -->
        <div style="padding:.5rem; border-bottom:1px solid #eeeeee; ">
          <mu-flex align-items="center">
            <mu-avatar size="35" style="padding:.1rem; border:1px solid red; border-radius:50%; background:white;">
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3913721637,490556209&fm=27&gp=0.jpg" alt="">
            </mu-avatar>
            <div style="margin-left:1rem;">
              <mu-row style="font-size:12px;">俺是黎添民</mu-row>
              <mu-row style="margin-top:.2rem;font-size:7px; color:#43a047;">社交菜鸟Lv1</mu-row>
            </div>
            <div style="margin-left:auto; background:#4db6ac; padding:.2rem .3rem; color:#fff; border-radius:.2rem; font-size:12px; margin-right:.5rem;">Leader</div>
          </mu-flex>
        </div>

  </div>

  

</template>

<script>
export default {
  data () {
    return {
      TeamID: 0,
      swiperOption: {
        autoHeight: true, //enable auto height
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },   

    }
  },
  mounted () {
    this.TeamID = this.$route.params.teamID
    console.log(this.TeamID)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
  },
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }

</style>


