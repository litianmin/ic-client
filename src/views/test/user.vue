<template>
  <div>
    <div style="position:absolute; left:0; top:0; width:100%; height:auto; z-index: -1;">
        <img style="max-width:100%; max-height:100%;" src="./bg.jpg" alt="">
      </div>

      <mu-row style="margin-top:5%; padding:1rem 0.5rem;  margin-bottom:16%;">
        <mu-flex style="width:2.5rem; height:2.5rem; margin-left:.5rem;">
          <img style="width:2.5rem; height:2.5rem; border-radius:50%;" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3148472799,1130994798&fm=27&gp=0.jpg">
        </mu-flex>
        <mu-flex style="margin-left:0.3rem; margin-top:.5rem; margin-left:1rem; font-size:16px; color:white;">
            Ae， 早上好呀！
        </mu-flex>
      </mu-row>

    <!-- BEGIN 头部导航按钮 -->
    <mu-row style="margin-bottom:1rem;">
      <mu-ripple class="main-nav" style="margin-left:3%; background: #009688;">
        😜走起
      </mu-ripple>
      <mu-ripple class="main-nav" color="yellow" :opacity="0.7" style="background: #00bcd4;">
        😇我有空
      </mu-ripple>
      <mu-ripple class="main-nav" color="red" :opacity="0.5" style="background: #03a9f4;">
        <mu-icon size="20" value="directions_run" color="#ffeb3b"></mu-icon>赴约
      </mu-ripple>
    </mu-row>
    <!-- END 头部导航按钮 -->
  </div>
</template>

