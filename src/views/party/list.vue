<template>
  <div :class="AddrChooseWindowIsShow == true ? 'body-fix': ''">
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#00bcd4" z-depth="1">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        聚会party
      </div>

      <span @click="newTeam" style="color:#fff; font-size:12px; padding:0 .5rem;" slot="right">创建组队</span>

    </mu-appbar>
    <!-- END 头部 -->


    <mu-flex style="padding:.5rem .2rem .5rem .2rem;" align-items="center">
      <span style="font-size:12px; color:#795548; margin-left:.3rem;">主题筛选：</span>
      <select name="" id="" style="padding:.1rem .5rem; color:#009688; appearance:none; background:#fff; font-size:12px; border-radius:.2rem; border:1px solid #80cbc4;">
        <option value="0">选择主题</option>
        <option value="1">健身运动</option>
        <option value="2">随便逛逛</option>
        <option value="3">线下手游</option>
        <option value="4">野外聚餐</option>
        <option value="5">音乐派对</option>
        <option value="6">单身派对</option>
        <option value="7">联谊聚会</option>
      </select>

      <span style="font-size:12px; color:#795548; margin-left:1rem;">所在地：</span>
      <span style="font-size:12px; color:#009688;">{{ LocateAddr }}</span>
      <mu-icon @click="chooseAddr" value="person_pin_circle" size="20" color="#009688"></mu-icon>
    </mu-flex>

    <mu-divider></mu-divider>

    <div style="padding:.5rem; position:relative; ">

      <div style="box-shadow: 1px 1px 1px #9e9e9e; border-top-left-radius:.3rem; border-top-right-radius:.3rem; border-top:1px solid #e0e0e0; border-left:1px solid #e0e0e0;">

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
            <div style="margin-left:auto; background:#4db6ac; padding:.2rem .3rem; color:#fff; border-radius:.2rem; font-size:12px;">Team01</div>
            <!-- <span style="margin-left:auto; color:#9e9e9e; font-size:13px;">2分钟前</span> -->
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
          <span style="margin-left:auto; color:#9e9e9e; font-size:12px;">2分钟前· <span style="color:#00bcd4;"> 查看详情</span></span>
          
        </mu-flex>

      </div>
    </div>

    <!-- 样式二 -->
    <div style="padding:.5rem; margin-top:2rem; position:relative;">


      <div style="box-shadow: 1px 1px 1px #9e9e9e; border-top-left-radius:.3rem; border-top-right-radius:.3rem; border-top:1px solid #e0e0e0; border-left:1px solid #e0e0e0;">

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
            <div style="margin-left:auto; background:#4db6ac; padding:.2rem .3rem; color:#fff; border-radius:.2rem; font-size:12px; margin-right:.5rem;">Team02</div>
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
          <span style="margin-left:auto; color:#9e9e9e; font-size:12px;">2分钟前· <span style="color:#00bcd4;"> 查看详情</span></span>
        </mu-flex>

      </div>
    </div>


    <!-- BEGIN 弹出窗口 -->
    <mu-container>
      <mu-drawer :open.sync="teamFilterWindowIsShow" :docked="false" :left="true" width="80%">
        <!-- 游戏基本信息 -->
        他朝
      </mu-drawer>
    </mu-container>
    <!-- END 弹出窗口 -->

    <div v-if="AddrChooseWindowIsShow" id="iframe" style="position:fixed; top:0; width:100%; height:100%;">
      <mu-flex @click="shutdownWindow" style="width:10%; height:2.8rem; z-index:9999; position:fixed; top:0; left:0; background:#F8F8F8; text-align:center; padding: 0 0 0 .5rem;" align-items="center" justify-content="center">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-flex>
      <iframe class="map-item"  id="getAddress" @load="loadiframe" src="https://m.amap.com/picker/?key=8906f77f66bcbd2b82a57d844e270fe7" style="width:100%; height:100%; position: absolute; border:0;">
      </iframe>
    </div>

  </div>
</template>

<script>
export default {
  
  data () {
    return {
      date: undefined,
      teamFilterWindowIsShow: false,
      LocateAddr: '',
      AddrChooseWindowIsShow: false,
      ChooseAddrInfo: {
        name: '',
        location: '',
        address: '',
      },
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    mytest (chooseDate) {
      console.log(chooseDate.getFullYear() +'-'+ chooseDate.getMonth() +'-'+ chooseDate.getDate())
    },
    loadiframe() {
      let iframe = document.getElementById('getAddress').contentWindow
      iframe.postMessage('hello', 'https://m.amap.com/picker/')
      window.addEventListener("message", function (e) {
        if (e.data.command != "COMMAND_GET_TITLE") {
          this.ChooseAddrInfo = e.data
          this.LocateAddr = e.data.name
          this.AddrChooseWindowIsShow = false
          //业务代码
          // this.$toast.message(e.data.name)
          // console.log(e)     
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


