<template>
  <div style="padding:2rem 1rem;">
    <div class="main-div">

      <div style="position:absolute; top:-1.5rem; left:1.5rem; border: 3px solid #4dd0e1; width:3.7rem; height:3.7rem; border-radius:50%; padding:2px; background:#fff;">
        <img 
          src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg"
          style="max-width:100%; max-height:100%; border-radius:50%;" alt="">
      </div>

      <div style="padding:2.8rem 0 0 1.5rem;">
        <span style="font-size:16px; color:#fff; font-wiehgt:700;">这里是我的昵称</span>
        <div style="margin-top:.2rem;">
          <span style="font-size:12px; color:#ffeb3b;">lv1 社交菜鸟</span>
        </div>
      </div>


      <mu-button style="position:absolute; right:1rem; bottom:1rem;">
        <span style="color:#4dd0e1;">加为好友</span>
      </mu-button>

    </div>

    <div style="margin-top:1.5rem; ">
      <span style="font-weight:700; color:#757575; ">· 他的足迹 ·</span>

      <div style="margin-top:20%; text-align:center;">
        <span>暂无内容</span>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.main-div {
  position:relative; 
  width:100%; 
  height:6.5rem; 
  background:linear-gradient(to right, #4dd0e1 , #80cbc4); 
  border-radius:.3rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}
</style>