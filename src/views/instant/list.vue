<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#4caf50" z-depth="1">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        即时组队
      </div>
    </mu-appbar>
    <!-- END 头部 -->

    <div style="width:100%; padding:.5rem;">
      <mu-row style="width:100%; padding:.5rem; margin-bottom:.8rem; border-radius:.3rem; background:#fff; border:1px solid #e0e0e0;">
        <mu-flex style="width:100%;" align-items="center">
          <mu-avatar>
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3354795114,3937565589&fm=27&gp=0.jpg" alt="">
          </mu-avatar>
          <span style="font-weight:700; margin-left:.2rem;">这是我的昵称</span>
          <span style="margin-left:auto; font-size:12px; color:#9e9e9e;">2小时前</span>
        </mu-flex>
        <mu-row style="padding:.5rem .5rem .5rem 1rem; font-size:13px;">
          这里是我的内容了，来呀，快活呀，反正有大把时光
        </mu-row>
        <mu-flex style="width:100%; padding:.5rem" align-items="center">
          <mu-icon value="person_pin_circle" color="#4caf50" size="20"></mu-icon>
          <span style="font-size:12px; color:#9e9e9e;">地点：是谁在等谁的出现 · 距离你50m</span>
        </mu-flex>
      </mu-row>

      <mu-row style="width:100%; padding:.5rem; margin-bottom:.8rem; border-radius:.3rem; background:#fff; border:1px solid #e0e0e0;">
        <mu-flex style="width:100%;" align-items="center">
          <mu-avatar>
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3354795114,3937565589&fm=27&gp=0.jpg" alt="">
          </mu-avatar>
          <span style="font-weight:700; margin-left:.2rem;">这是我的昵称</span>
          <span style="margin-left:auto; font-size:12px; color:#9e9e9e;">2小时前</span>
        </mu-flex>
        <mu-row style="padding:.5rem .5rem .5rem 1rem; font-size:13px;">
          这里是我的内容了，来呀，快活呀，反正有大把时光
        </mu-row>
        <mu-flex style="width:100%; padding:.5rem" align-items="center">
          <mu-icon value="person_pin_circle" color="#4caf50" size="20"></mu-icon>
          <span style="font-size:12px; color:#9e9e9e;">地点：是谁在等谁的出现 · 距离你50m</span>
        </mu-flex>
      </mu-row>

      <mu-row style="width:100%; padding:.5rem; margin-bottom:.8rem; border-radius:.3rem; background:#fff; border:1px solid #e0e0e0;">
        <mu-flex style="width:100%;" align-items="center">
          <mu-avatar>
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3354795114,3937565589&fm=27&gp=0.jpg" alt="">
          </mu-avatar>
          <span style="font-weight:700; margin-left:.2rem;">这是我的昵称</span>
          <span style="margin-left:auto; font-size:12px; color:#9e9e9e;">2小时前</span>
        </mu-flex>
        <mu-row style="padding:.5rem .5rem .5rem 1rem; font-size:13px;">
          这里是我的内容了，来呀，快活呀，反正有大把时光
        </mu-row>
        <mu-flex style="width:100%; padding:.5rem" align-items="center">
          <mu-icon value="person_pin_circle" color="#4caf50" size="20"></mu-icon>
          <span style="font-size:12px; color:#9e9e9e;">地点：是谁在等谁的出现 · 距离你50m</span>
        </mu-flex>
      </mu-row>
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


