<template>
  <div>

    <!-- BEGIN 头部 -->
    <mu-flex 
      style="height:2.3rem; padding:0 .8rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0 0 1px #26c6da;" 
      align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">玩友列表</span>
      </mu-flex>

    </mu-flex>
    <!-- END 头部 -->

    <div class="mycont" ref="mycont">
      <div ref="listCont">
        <div 
          v-for="(item, index) in MyData"
          :key="index"
          class="div-h" 
          ref="myindex">
          {{ item.cont }}
        </div>
      </div>
    </div>

    <div class="abc-list">
      <span 
        style="text-align:center; color: #009688; font-size:12px;"
        v-for="(item, index) in ABCList"
        @click="letterClick(item)"
        :key="index">{{ item }}</span>
    </div>

    <MyMsg ref="myMsg"></MyMsg>

  </div>
</template>

<script>
import BScroll from 'better-scroll'
import MyMsg from '@/components/myMsg.vue'
export default {
  components: {
    MyMsg
  },
  data () {
    return {
      MyData: [
        {id: 'A', name: '内容一', cont: '展示1'},
        {id: 'B', name: '内容二', cont: '展示2'},
        {id: 'C', name: '内容三', cont: '展示3'},
        {id: 'D', name: '内容四', cont: '展示4'},
        {id: 'F', name: '内容五', cont: '展示5'},
        {id: 'G', name: '内容六', cont: '展示6'},
        {id: 'H', name: '内容七', cont: '展示7'},
        {id: 'I', name: '内容八', cont: '展示8'},
        {id: 'J', name: '内容九', cont: '展示9'},
        {id: 'K', name: '内容十一', cont: '展示10'},
        {id: 'L', name: '内容十二', cont: '展示11'},
        {id: 'M', name: '内容十三', cont: '展示12'},
        {id: 'N', name: '内容十四', cont: '展示13'},
      ],
      ABCList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
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
    goBack () {
      this.$router.go(-1)
    },

    mytest () {
      console.log(this.$refs.myindex)
      this.MyScroll.scrollToElement(this.$refs.myindex[6], 1000)
      console.log('测试内容一')
    },

    letterClick (letter) {  // 点击字母事件
      // 先判断有没有存在该列表
      let locateIndex = -1
      this.MyData.forEach((item, index) => {
        if (item.id == letter) {
          locateIndex = index
        }
      })
      if (locateIndex > -1) { // 如果存在索引，那么就进行跳转
        this.MyScroll.scrollToElement(this.$refs.myindex[locateIndex], 1000)
        this.$refs.myMsg.info(letter)
      } else {
        this.$refs.myMsg.info(letter)
      }

    },
    
  }
}
</script>

<style scoped>

.mycont {
  position: absolute;
  top: 2.3rem;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

.div-h {
  height: 7rem;
}

.abc-list {
  position: fixed;
  padding: 0 .5rem;
  right: 0;
  top: 2.3rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Arial;
}

</style>