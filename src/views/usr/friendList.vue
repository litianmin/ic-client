<template>
  <div>

    <!-- BEGIN 头部 -->
    <mu-flex 
      class="head-container" 
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

        <!-- 申请列表 -->
        <div v-if="ApplyList.length > 0">
          <div class="apply-title-div">
            <span class="apply-title-span">好友申请</span>
          </div>

          <div 
            v-for="(item, index) in ApplyList"
            :key="index"
            class="detail-item-div">
            <img class="detail-item-avatar" :src="item.avatar">
            <span class="detail-item-nickname">{{ item.nickname }}</span>

            <button @click="rejectApply(index)" class="apply-reject-btn">忽略</button>
            <button @click="acceptApply(index)" class="apply-accept-btn">接受</button>
          </div>
        </div>

        <!-- 好友列表 -->
        <div
          v-for="(item, index) in FriendList"
          ref="myindex"
          :key="index">

          <div class="apply-title-div">{{ item.title }}</div>

          <div 
            v-for="(item2, index2) in item.child"
            :key="index2"
            @click="$router.push(`/usr/usercard/${item2.id}`)"
            class="detail-item-div">
            
            <img :src="item2.avatar" class="detail-item-avatar">
            <span style="margin-left:1rem;">{{ item2.nickname }}</span>
          </div>

        </div>

        <div v-if="FriendList.length > 0" style="padding:1rem; text-align:center;">
          <span style="color:#bdbdbd; letter-spacing:1px;">共 {{ FriendList.length }} 位玩友</span>
        </div>

        <div 
          v-show="ApplyList.length == 0 && FriendList.length == 0" 
          class="no-data">
          <span style="color:#bdbdbd;">暂无联系人</span>
        </div>

      </div>
      <Loading v-show="Loading"/>
    </div>

    <div class="abc-list">
      <span 
        class="abc-span"
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
import Loading from '@/components/Loading.vue'
export default {
  components: {
    MyMsg,
    Loading
  },
  data () {
    return {
      ApplyList: [{
          id: 1, 
          nickname: '你的名字', 
          avatar: ''
      }],

      FriendList: [{
        title: 'A', 
        child: [{
          id: 1, 
          nickname: 'apple', 
          avatar: ''
        }]
      }],

      ABCList: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
      MyScroll: {},

      Loading: true,
    }
  },
  mounted () {
    this.MyScroll = new BScroll(this.$refs.mycont, {
      probeType: 3,
      click: true
    })

    this.pageInit()
  },
  methods: {
    pageInit () {
      this.Loading = true
      this.$axios.get(`/user/friendList/1`, {}).then((resp) => {
        if (resp.data.code == 20000) {
          let data = resp.data.msg 
          this.ApplyList = data.applyList
          this.FriendList = data.friendList
          this.Loading = false
        } else {
          this.$toast.message('发生未知错误')
        }
      })
    },

    goBack () {
      this.$router.go(-1)
    },

    rejectApply (index) {  // 拒绝好友申请
      let id = this.ApplyList[index].id
      this.$axios.get(`/user/rejectFriendApply/${id}`, {}).then((resp) => {
        if (resp.data.code == 20000) {
          this.ApplyList.splice(index, 1)
        } else {
          this.$toast.message('发生未知错误')
        }
      })
    },

    acceptApply (index) {  // 通过好友申请
      let id = this.ApplyList[index].id
      this.$axios.get(`/user/acceptFriendApply/${id}`, {}).then((resp) => {
        if (resp.data.code == 20000) {
          this.$toast.message('已添加')
          // 如果成功，那么进行页面的重载
          this.pageInit()
        } else {
          this.$toast.message('发生未知错误')
        }
      })
    },

    letterClick (letter) {  // 点击字母事件
      // 先判断有没有存在该列表
      let locateIndex = -1
      this.FriendList.forEach((item, index) => {
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

.head-container {
  height:2.3rem; 
  padding:0 .8rem; 
  background: linear-gradient(to right, #4dd0e1 , #80cbc4); 
  box-shadow: 0 0 1px #26c6da;
}

.mycont {
  position: absolute;
  top: 2.3rem;
  left: 0;
  bottom: 0;
  width: 100%;
  overflow: hidden;
}

.apply-title-div {
  width:100%; 
  padding:.5rem 1rem .3rem 1rem; 
  background:#f5f5f5;
}

.apply-title-span {
  font-size:12px; 
  color:green;
}

.detail-item-div {
  display:flex; 
  align-items:center; 
  width:100%; 
  padding:.5rem 1rem; 
  border-top:1px solid #eeeeee; 
  background:#fff;
}

.detail-item-avatar {
  width:2.5rem; 
  height:2.5rem; 
  border-radius: .3rem;
}

.detail-item-nickname {
  margin-left:1rem;
}

.apply-reject-btn {
  margin-left:auto; 
  font-size:12px; 
  color:#9e9e9e;
}

.apply-accept-btn {
  margin-right:1.5rem; 
  margin-left:1rem; 
  font-size:12px; 
  color:#424242;
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

.abc-span {
  text-align:center; 
  color: #009688; 
  font-size:12px;
}

.no-data {
  margin-top:40%; 
  text-align:center;
}

</style>