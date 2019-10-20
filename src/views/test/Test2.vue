<template>
  <div>
    <div class="mycont" ref="mycont">
      <div ref="listCont" class="mytestlist">

        <div 
          v-for="(item, index) in MyData"
          :key="index"
          class="div-h" 
          ref="myindex">
          {{ item.cont }}
        </div>
      
      </div>
    </div>

    <button @click="mytest">测试</button>

  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      MyData: [
        {id: 1, name: '内容一', cont: '展示1'},
        {id: 2, name: '内容二', cont: '展示2'},
        {id: 3, name: '内容三', cont: '展示3'},
        {id: 4, name: '内容四', cont: '展示4'},
        {id: 5, name: '内容五', cont: '展示5'},
        {id: 6, name: '内容六', cont: '展示6'},
        {id: 7, name: '内容七', cont: '展示7'},
        {id: 8, name: '内容八', cont: '展示8'},
        {id: 9, name: '内容九', cont: '展示9'},
        {id: 10, name: '内容十一', cont: '展示10'},
        {id: 11, name: '内容十二', cont: '展示11'},
        {id: 12, name: '内容十三', cont: '展示12'},
        {id: 13, name: '内容十四', cont: '展示13'},
      ],
      MyScroll: {}
    }
  },
  mounted () {
    this.MyScroll = new BScroll(this.$refs.mycont, {
      probeType: 3,
      click: true
    })
  },
  methods: {
    mytest () {
      console.log(this.$refs.myindex)
      this.MyScroll.scrollToElement(this.$refs.myindex[6], 4000)
      console.log('测试内容一')
    }
  }
}
</script>

<style scoped>

.mycont {
  position: fixed;
  top: 2rem;
  bottom: 0;
  width: 100%;
}

.div-h {
  height: 7rem;
}

</style>