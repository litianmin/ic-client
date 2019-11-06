<template>
  <transition name="fade">
    <div class="main" v-show="IsShow" @click="IsShow = false">
      <div style="text-align:right;">
        <svg-icon icon-class="share-guide-arrow" style="font-size:150px;"></svg-icon>
      </div>
      <div style="text-align:center; margin-top:1rem;">
        <svg-icon icon-class="share-click" style="font-size:100px;"></svg-icon>
        <span class="note-span">点击分享按钮</span>
      </div>
      <div style="text-align:center; margin-top:.5rem;">
        <span class="note-span">邀请好友一起加入吧</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data () {
    return {
      IsShow: false,
      TOut: {}
    }
  },
  methods: {
    show () { // 展示
      clearTimeout(this.tOut) 
      this.IsShow = true
      this.TOut = setTimeout(()=>{
        this.IsShow = false
      }, 1500)
    }
  }
}
</script>

<style scoped>
.main {
  position:fixed; 
  top:0; 
  left:0; 
  width:100%; 
  height:100%; 
  background: rgba(0, 0, 0, 0.6);
  z-index: 10000;
}

.note-span {
  color:#fff; 
  font-size:20px; 
  font-weight:700; 
  letter-spacing:1px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>