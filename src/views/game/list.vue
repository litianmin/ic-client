<template>
  <div>

    <mu-appbar style="width: 100%; height:2.5rem;" color="#009688">
      <mu-button icon slot="left">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <!-- <mu-text-field v-model="value1" color="white" help-text="搜索热门游戏"></mu-text-field> -->
      <div style="padding: 0 0 .4rem 0;">
        <input type="text" placeholder=" 搜 索 热 门 游 戏" style=" font-size:14px; width:100%; height:1.7rem; border-radius:.2rem; border:0; text-align:center;">
      </div>

      <mu-button flat slot="right">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>

  </div>  
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>

