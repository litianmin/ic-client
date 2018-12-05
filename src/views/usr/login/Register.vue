<template>
  <div>
    <div style="width:100%; margin-top:5%;">
      <div style="float:left; margin-left:3rem;">
        <img style="width:3rem; height:3rem; max-width:100%; max-height:100%; border-radius:0.5rem;" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=97665237,3990229561&fm=26&gp=0.jpg" alt="">
      </div>
      <div style="float:left; padding:1rem;">
        <mu-flex align-items="center" style="padding-bottom: 8px;">
          <span style="margin-left: 2rem">性别：</span>
          <mu-radio style="margin-right: 0.5rem;" value="top" label="男"></mu-radio>
          <mu-radio style="margin-right: 0.8rem;" value="left" label="女"></mu-radio>
        </mu-flex>
      </div>
    </div>
    <div style="width:100%; text-align:center; margin-top:0.5rem;">
      <mu-container>
        <mu-text-field label="UserName" label-float help-text="用户名为6-12长度的字符" ></mu-text-field><br/>
        <mu-text-field label="Password" label-float help-text="请输入密码" ></mu-text-field><br/>
        <mu-text-field label="Password" label-float help-text="请重新输入密码" ></mu-text-field><br/>
      </mu-container>
    </div>

    <div style="width:100%; text-align:right; padding: 0.5rem 3rem; ">
      <mu-button color="primary" style="width:40%; background:gray;">
        注册
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
</template>

<script>
export default {
}
</script>

<style scoped lang="stylus">
.img-style
  width auto
  height auto 
  max-width 100%
  max-height 100%
</style>
