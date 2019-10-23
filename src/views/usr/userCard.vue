<template>
  <div style="padding:2rem 1rem;">
    <div class="main-div">

      <div class="info-div">
        <img :src="Avatar" class="avatar" alt="">
      </div>

      <div style="padding:2.8rem 0 0 1.5rem;">
        <span class="nickname">{{ Nickname }}</span>
        <div style="margin-top:.2rem;">
          <span class="level-span">lv1 社交菜鸟</span>
        </div>
      </div>

      <mu-button 
        v-if="IsFriend >= 0" 
        @click="addOrDelFriend"
        class="button-position">
        <span v-if="IsFriend == 0" style="color:#4dd0e1;">加为好友</span>
        <span v-else-if="IsFriend == 1" style="color:#bdbdbd;">删除好友</span>
        <span v-else style="color:#bdbdbd;">已申请</span>
      </mu-button>

    </div>

    <div style="margin-top:1.5rem; ">
      <span style="font-weight:700; color:#757575; ">· 他的足迹 ·</span>

      <div style="margin-top:20%; text-align:center;">
        <span>暂无内容</span>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      UserID: 0,
      Avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg',
      Nickname: '这里是我的昵称',
      IsFriend: 0,  // -1: 自己， 0:非好友， 1：好友, 2: 申请中
    }
  },

  mounted () {
    this.UserID = this.$route.params.userid

    this.$axios.get(`/user/userCard/${this.UserID}`, {}).then((resp) => {
      if (resp.data.code == 20000) {
        let data = resp.data.msg
        this.Avatar = data.avatar
        this.Nickname = data.nickname
        this.IsFriend = data.isf
      } else {
        this.$toast.message('发生未知错误')
      }
    })
  },

  methods: {
    addOrDelFriend () {
      switch (this.IsFriend) {
        case 0: // 添加好友申请
          this.$axios.get(`/user/addFriend/${this.UserID}`, {}).then((resp) => {
            if (resp.data.code == 20000) {
              this.IsFriend = 2
              this.$toast.message('已提交申请')
            } else {
              this.$toast.message('发生未知错误')
            }
          })
          break
        case 1: // 删除好友
          this.$axios.get(`/user/deleteFriend/${this.UserID}`, {}).then((resp) => {
            if (resp.data.code == 20000) {
              this.IsFriend = 0
              this.$toast.message('已删除好友')
            } else {
              this.$toast.message('发生未知错误')
            }
          })
          break
        default:  
          // Do Nothing
          break
      }
    }
  },
}
</script>

<style scoped>
.main-div {
  position:relative; 
  width:100%; 
  height:6.5rem; 
  background:linear-gradient(to right, #4dd0e1 , #80cbc4); 
  border-radius:.3rem;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.2);
}

.info-div {
  position: absolute; 
  top: -1.5rem; 
  left: 1.5rem; 
  border: 3px solid #4dd0e1; 
  width: 3.7rem; 
  height: 3.7rem; 
  border-radius: 50%; 
  padding: 2px; 
  background: #fff;
}

.avatar {
  width: 100%; 
  height: 100%; 
  border-radius: 50%;
}

.nickname {
  font-size:16px; 
  color:#fff; 
  font-weight:700;
}

.level-span {
  font-size:12px; 
  color:#ffeb3b;
}

.button-position {
  position:absolute; 
  right:1rem; 
  bottom:1rem;
}
</style>