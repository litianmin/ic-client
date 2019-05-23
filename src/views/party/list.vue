<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#00bcd4">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div style="font-size:14px;">
        聚会party
      </div>


      <mu-flex align-items="center" slot="right">
        <span>佛山</span>
        <mu-icon value="person_pin_circle" size="18"></mu-icon>
      </mu-flex>

    </mu-appbar>
    <!-- END 头部 -->
    <!-- http://img4.imgtn.bdimg.com/it/u=2815404356,1532344722&fm=26&gp=0.jpg -->

    <div style="padding:.5rem; margin-bottom:2rem;">
      <div style="box-shadow: 0px 0px 2px #9e9e9e; ">

        <!-- 用户头部昵称 -->
        <div style="padding:.5rem; border-bottom:1px solid #eeeeee; ">
          <mu-flex align-items="center">
            <mu-avatar size="35">
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3340295553,242321368&fm=27&gp=0.jpg" alt="">
            </mu-avatar>
            <div style="margin-left:1rem;">
              <mu-row style="font-size:12px;">朝花夕誓</mu-row>
              <mu-row style="margin-top:.2rem;font-size:7px; color:#43a047;">社交菜鸟Lv1</mu-row>
            </div>
            <span style="margin-left:auto; color:#9e9e9e; font-size:13px;">2分钟前</span>
          </mu-flex>
        </div>

        <!-- 展示图片 -->
        <mu-flex style="position:relative;" justify-content="center">
          <img style="max-width:100%; max-height:30rem;" src="http://img2.imgtn.bdimg.com/it/u=2440520473,4156973381&fm=26&gp=0.jpg" alt="">

          <mu-flex style="width:100%; position:absolute; bottom:0; padding:0 .2rem; background:rgba(0, 0, 0, .5); padding:1rem;" align-items="center">
            <span style="color:#fff;">聚餐（百隆广场）</span>
          </mu-flex>
        </mu-flex>

        <div style="padding:1rem 1rem 0rem .5rem;">
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:13px;">主要活动:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">聚餐，玩游戏</span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:13px;">活动地点:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">百隆广场56好街602室</span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:13px;">活动时间:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">1/02 02:02  ~  3/02 03:04</span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:13px;">招募人数:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">20/<span style="color:green; font-size:10px;">4</span></span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:13px;">队友偏爱:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">来个风情万种的</span>
          </mu-row>

          <mu-row style="margin-top:.5rem;">
            <span style="color:#795548; font-size:13px;">招募宣言:            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">这里最多就显示个100个字吧，因为如果内容太多的话，也不好粗粒不是，如果说，哎，其实我也不清就是了。</span></span>
          </mu-row>
        </div>

        <mu-flex style="font-size:12px; padding:.8rem 1rem 1rem .8rem;" align-items="center">
          <mu-icon value="person_pin_circle" color="green" size="18"></mu-icon>
          <span style="font-size:12px;">距离你<span style="font-size:12px; color:green;">600</span>米</span>
          <span style="margin-left:auto; color:#00bcd4;">查看详情</span>
        </mu-flex>

      </div>
    </div>


    <div style="padding:.5rem; margin-bottom:2rem;">
      <div style="box-shadow: 0px 0px 2px #9e9e9e; ">

        <!-- 用户头部昵称 -->
        <div style="padding:.5rem; border-bottom:1px solid #eeeeee; ">
          <mu-flex align-items="center">
            <mu-avatar size="35">
              <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3340295553,242321368&fm=27&gp=0.jpg" alt="">
            </mu-avatar>
            <div style="margin-left:1rem;">
              <mu-row style="font-size:12px;">朝花夕誓</mu-row>
              <mu-row style="margin-top:.2rem;font-size:7px; color:#43a047;">社交菜鸟Lv1</mu-row>
            </div>
            <span style="margin-left:auto; color:#9e9e9e; font-size:13px;">2分钟前</span>
          </mu-flex>
        </div>

        <!-- 展示图片 -->
        <mu-flex style="position:relative;" justify-content="center">
          <img style="max-width:100%; max-height:30rem;" src="http://img4.imgtn.bdimg.com/it/u=2815404356,1532344722&fm=26&gp=0.jpg" alt="">

          <mu-flex style="width:100%; position:absolute; bottom:0; padding:0 .2rem; background:rgba(0, 0, 0, .5); padding:1rem;" align-items="center">
            <span style="color:#fff;">聚餐（百隆广场）</span>
          </mu-flex>
        </mu-flex>

        <div style="padding:1rem 1rem 0rem .5rem;">
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:13px;">主要活动:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">聚餐，玩游戏</span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:13px;">活动地点:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">百隆广场56好街602室</span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:13px;">活动时间:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">1/02 02:02  ~  3/02 03:04</span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:13px;">招募人数:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">20/<span style="color:green; font-size:10px;">4</span></span>
          </mu-row>
          <mu-row style="margin-bottom:.3rem;">
            <span style="color:#795548; font-size:13px;">队友偏爱:</span>
            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">来个风情万种的</span>
          </mu-row>

          <mu-row style="margin-top:.5rem;">
            <span style="color:#795548; font-size:13px;">招募宣言:            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">这里最多就显示个100个字吧，因为如果内容太多的话，也不好粗粒不是，如果说，哎，其实我也不清就是了。</span></span>
          </mu-row>
        </div>

        <mu-flex style="font-size:12px; padding:.8rem 1rem 1rem .8rem;" align-items="center">
          <mu-icon value="person_pin_circle" color="green" size="18"></mu-icon>
          <span style="font-size:12px;">距离你<span style="font-size:12px; color:green;">600</span>米</span>
          <span style="margin-left:auto; color:#00bcd4;">查看详情</span>
        </mu-flex>

      </div>
    </div>

    <mu-flex style="position:fixed; bottom:0; left:0; padding:.5rem; background:yellow; width:100%;" align-items="center" justify-content="center">
      <mu-button style="width:50%;" color="#00bcd4">发起组队</mu-button>
      <mu-button style="width:40%;" color="#00bcd4">筛选</mu-button>
    </mu-flex>

 
    <!-- <mu-container>
      <mu-flex justify-content="between" align-items="end" wrap="wrap">
        <mu-paper :z-depth="1" class="demo-date-picker">
          <mu-date-picker :date.sync="date" @change="mytest" color="#7B68EE"></mu-date-picker>
        </mu-paper>
      </mu-flex>
    </mu-container> -->


  </div>
</template>

<script>
export default {
  
  data () {
    return {
      date: undefined
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    mytest (chooseDate) {
      console.log(chooseDate.getFullYear() +'-'+ chooseDate.getMonth() +'-'+ chooseDate.getDate())
    }
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
</style>


