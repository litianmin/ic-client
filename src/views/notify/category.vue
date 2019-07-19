<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#607d8b" z-depth="1">
      <mu-button icon slot="left">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        消息中心
      </div>
    </mu-appbar>
    <!-- END 头部 -->

    <div style="padding:1rem;">
      <mu-row style="margin-top:.5rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:4rem; background:red; color:#fff; border-radius:1rem;" align-items="center" justify-content="center">
            <span>组 队</span>
          </mu-flex>
        </mu-col>
        <mu-col span="9">
          <mu-row>标题一</mu-row>
          <mu-row>这里是我的详细内容，不要问，不要说，就静静的听我说，我真的是</mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>


      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:4rem; background:red; color:#fff; border-radius:1rem;" align-items="center" justify-content="center">
            <span>谁@我</span>
          </mu-flex>
        </mu-col>
        <mu-col span="9">
          <mu-row>标题一</mu-row>
          <mu-row>这里是我的详细内容，不要问，不要说，就静静的听我说，我真的是</mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:4rem; background:red; color:#fff; border-radius:1rem;" align-items="center" justify-content="center">
            <span>系统通知</span>
          </mu-flex>
        </mu-col>
        <mu-col span="9">
          <mu-row>标题一</mu-row>
          <mu-row>这里是我的详细内容，不要问，不要说，就静静的听我说，我真的是</mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:4rem; background:red; color:#fff; border-radius:1rem;" align-items="center" justify-content="center">
            <span>公告</span>
          </mu-flex>
        </mu-col>
        <mu-col span="9" style-"padding:0 0 0 .5rem;">
          <mu-row style="margin-bottom:.5rem;">标题一</mu-row>
          <mu-row>这里是我的详细内容，不要问，不要说，就静静的听我说，我真的是</mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

      <mu-row style="margin-top:1rem; margin-bottom:1rem;">
        <mu-col span="3">
          <mu-flex style="width:100%; height:4rem; background:red; color:#fff; border-radius:1rem;" align-items="center" justify-content="center">
            <span>最新活动</span>
          </mu-flex>
        </mu-col>
        <mu-col span="9">
          <mu-row>标题一</mu-row>
          <mu-row>这里是我的详细内容，不要问，不要说，就静静的听我说，我真的是</mu-row>
        </mu-col>
      </mu-row>
      <mu-divider></mu-divider>

    </div>

  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
</style>


