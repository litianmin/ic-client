<template>
  <div>
    <mu-flex 
      class="position" 
      align-items="center" 
      justify-content="center"
      wrap="wrap">
        <mu-flex wrap="wrap"       
          align-items="center" 
          justify-content="center">
          <img style="width:2rem; height:2rem;" :src="LoadingPng" alt="">
          <mu-flex style="width:100%; margin-top:.5rem;" justify-content="center" >
            <span style="letter-spacing:1px; font-size:13px; color:#9e9e9e;">加载中</span>
          </mu-flex>
        </mu-flex>
    </mu-flex>
  </div>
</template>

<script>
import loadingPng from '@/assets/loading.gif'
export default {
  data () {
    return {
      LoadingPng: loadingPng
    }
  }
}
</script>


<style scoped>
.position { background:#f5f5f5; position:fixed; top: 0; width: 100%; height: 100%;  }
</style>