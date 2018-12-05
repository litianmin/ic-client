<template>
  <div style="width:100%;">

    <div style="width:100%; text-align:center;">

      <div style="font-size:35px; text-align:left; color:gray; font-weight:700; margin-top:2rem; margin-left:3rem; margin-bottom:1.5rem; font-style:italic;">
        I COMING！
      </div>

      <mu-container>
        <mu-text-field v-model="value13" label="UserName" label-float help-text="用户名为6-12长度的字符" ></mu-text-field><br/>
        <mu-text-field v-model="value14" label="Password" label-float help-text="请输入密码" ></mu-text-field><br/>
      </mu-container>

      <div style="width:100%; text-align:right; padding: 2rem 3rem; ">
        <div style="float:left; text-align:left; margin-left:0.1rem; margin-top:0.5rem; color:green">忘记密码？</div>
        <mu-button color="primary" style="width:40%; background:gray;">
          登陆
          <mu-icon right value="send"></mu-icon>
        </mu-button>
      </div>

      <div style="width:100%; text-align: center; margin-top:2rem; font-size:12px;">
        ---- 快速登陆 ----
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
  data () {
    return {
      value13: '',
      value14: ''
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
