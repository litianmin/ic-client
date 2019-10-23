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
      <div>

        <div style="width:100%; padding:.5rem 1rem .3rem 1rem; background:#f5f5f5;">
          <span style="font-size:12px;">好友申请</span>
        </div>

        <div 
          style="display:flex; align-items:center; width:100%; padding:.5rem 1rem; border-top:1px solid #eeeeee; background:#fff;">
          
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1391149153,291295030&fm=26&gp=0.jpg" style="width:2.5rem; height:2.5rem; border-radius:. 3rem;">
          <span style="margin-left:1rem;">这是我的内容</span>
        </div>

        <div 
          style="display:flex; align-items:center; width:100%; padding:.5rem 1rem; border-top:1px solid #eeeeee; background:#fff;">
          
          <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1391149153,291295030&fm=26&gp=0.jpg" style="width:2.5rem; height:2.5rem; border-radius:. 3rem;">
          <span style="margin-left:1rem;">这是我的内容</span>


          <button style="margin-left:auto; font-size:12px; color:#9e9e9e;">忽略</button>

          <button style="margin-right:1.5rem; margin-left:1rem; font-size:12px; color:#424242; ">
            <span>接受</span>
          </button>
        </div>


        <div
          v-for="(item, index) in MyData"
          ref="myindex"
          :key="index">

          <div style="width:100%; padding:.5rem 1rem .3rem 1rem; background:#f5f5f5;">{{ item.title }}</div>

          <div 
            v-for="(item2, index2) in item.child"
            :key="index2"
            style="display:flex; align-items:center; width:100%; padding:.5rem 1rem; border-top:1px solid #eeeeee; background:#fff;">
            
            <img :src="item2.avatar" alt="" style="width:2.5rem; height:2.5rem; border-radius:. 3rem;">
            <span style="margin-left:1rem;">{{ item2.name }}</span>
          </div>

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
        {title: 'A', child: [
          {id: 1, name: 'apple', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
          {id: 2, name: 'alpha', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
        ]},

        {title: 'B', child: [
          {id: 3, name: 'banan', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
          {id: 4, name: '逼神', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
        ]},

        {title: 'E', child: [
          {id: 5, name: 'eson', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
          {id: 6, name: 'Element', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
        ]},

        {title: 'F', child: [
          {id: 7, name: 'Fat Boy', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
          {id: 8, name: '肥婆', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
        ]},

        {title: 'H', child: [
          {id: 9, name: '海', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
          {id: 10, name: '何小姐', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
        ]},

        {title: 'Z', child: [
          {id: 11, name: '朱元璋', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
          {id: 12, name: '猪猪贸易', avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2724886373,3500404552&fm=26&gp=0.jpg'},
        ]},
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
        if (item.title == letter) {
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
  top: 2.5rem;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-family: Arial;
}

</style>