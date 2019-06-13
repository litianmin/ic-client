<template>
  <div>

    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#03a9f4" z-depth="1">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        旅游
      </div>

      <span style="color:#fff; font-size:12px; padding:0 .5rem;" slot="right">创建组队</span>
    </mu-appbar>
    <!-- END 头部 -->

    <!-- 队伍样式 -->
    <div style="padding:.5rem;">
      <div style="box-shadow: 1px 1px 1px #9e9e9e; border-top-left-radius:.5rem; border-top-right-radius:.5rem; ">
        <mu-flex style="position:relative;" justify-content="center">
          <img style="max-width:100%; max-height:30rem; border-top-left-radius:.5rem; border-top-right-radius:.5rem;" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3290761569,3665444672&fm=15&gp=0.jpg" alt="">

          <mu-flex style="width:100%; position:absolute; bottom:0; background:rgba(0, 0, 0, .5); padding:.8rem;" align-items="center">
            <span style="color:#fff; font-weight:700;">这个世界是没有如果的噢 <span style="color:#fff; font-weight:400;">（距离你50m）</span></span>
          </mu-flex>
        </mu-flex>
        <mu-flex style="padding:.5rem;" align-items="center" wrap="wrap">
          <mu-flex style="width:100%; padding:.5rem .8rem .3rem .5rem;" align-items="center">
            <div style="">
              <mu-flex align-items="center">
                <mu-avatar size="35">
                  <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2825833453,1809475728&fm=26&gp=0.jpg" alt="">
                </mu-avatar>
                <div style="margin-left:1rem;">
                  <mu-row style="font-size:12px;">这是我的昵称</mu-row>
                  <mu-row style="margin-top:.2rem;font-size:7px; color:#43a047;">社交菜鸟Lv1</mu-row>
                </div>
              </mu-flex>
            </div>
            <span style="margin-left:auto; font-size:12px; color:#03a9f4;">查看详情</span>
          </mu-flex>
        </mu-flex>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
</style>

