<template>
  <div>
    <div style="width:100%; text-align:center;">
      <div style="font-size:30px; text-align:left; color:gray; font-weight:700; margin-top:15%; margin-left:2rem; font-style:italic;">
        嘿，我来了 
        <mu-icon value="directions_bike" ></mu-icon>
      </div>
      <div style="font-size:35px; text-align:right; color:gray; font-weight:700;margin-right:2rem; margin-bottom:1.5rem; font-style:italic;">
        <mu-icon value="directions_run" ></mu-icon>
        I COMING！
      </div>

      <div style="width:100%; margin-top:15%;">
        <mu-button @click="linkToRegister" color="gray" style="background:gray; width:35%;">
          <mu-icon left value="gesture"></mu-icon>
           注 册
        </mu-button>   
      </div>

      <div style="width:100%; margin-top:10%;">
        <mu-button @click="linkToCheckin" color="secondary" style="background:gray; width:35%;">
          <mu-icon left value="send"></mu-icon>
           登 陆
        </mu-button>        
      </div>

      <div style="width:100%; text-align: center; margin-top:20%; font-size:12px;">
        ---- 快速注册、登陆 ----
      </div>

      <div style="width:100%; margin-top:1.5rem; text-align:center; padding: 0 0 0 20%;">

        <div style="float:left; width:2rem; height:2rem; margin-right:10%">
          <img src="./wx.png" class="img-style" />
        </div>

        <div style="float:left; width:2rem; height:2rem; margin-right:10%">
          <img src="./qq.png" class="img-style" />
        </div>

        <div style="float:left; width:2rem; height:2rem; margin-right:10%">
          <img src="./alipay.png" class="img-style" />
        </div>

        <div style="float:left; width:2rem; height:2rem;">
          <img src="./wb.png" class="img-style" />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  methods: {
    linkToRegister () {
      this.$router.push('/usr/login/register')
    },
    linkToCheckin () {
      this.$router.push('/usr/login/checkin')
    }
  }
}
</script>

<style lang="stylus" scoped>
.img-style
  width auto
  height auto 
  max-width 100%
  max-height 100%
</style>


