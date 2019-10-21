<template>
  <div class="main">
    <transition name="fade">
      <div v-show="show" class="msg-window">
        <span>{{ cont }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false,
      cont: '',
      tOut: {}
    }
  },
  methods: {
    info (msg) {
      clearTimeout(this.tOut) 
      this.show = true
      this.cont = msg
      this.tOut = setTimeout(()=>{
        this.show = false
      }, 500)
    },
  }
}
</script>

<style scoped>
.main {
  position: fixed;
  top: 40%;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: -1;
}

.msg-window {
  z-index: 999; 
  padding: .6rem 1.2rem; 
  max-width: 50%; 
  background: rgba(33, 33, 33, .5); 
  border-radius:.5rem; 
  font-size:25px; 
  color:#fff; 
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>