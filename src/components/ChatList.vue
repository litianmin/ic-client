<template>
  <div>
    <!-- BEGIN 排序条 -->
    <mu-flex class="sort-bar" justify-content="center" align-items="center" >
      <span style="margin-left:.3rem">回复列表</span>
      <span @click="convertSort" class="sort-bar-svg">
        <svg-icon :icon-class="IsSortup == true ? 'sortup' : 'sortdown'"></svg-icon>
      </span>
    </mu-flex>
    <!-- END 排序条 -->

    <!-- BEGIN 回复评论 -->
    <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">

      <mu-container class="chat-container" v-for="(item, index) in ChatList" :key="index">
        <mu-flex align-items="center">
          <mu-avatar size="35" :class="item.sex == 1 ? 'avatar-male' : 'avatar-female'">
            <img :src="item.avatar | imgPrefixDeal()">
          </mu-avatar>
          <span class="nickname">
            {{ item.nickname }}
          </span>
        </mu-flex>

        <mu-row class="reply-row">
          <span class="reply-span">
            <span v-if="item.replyID > 0" style="color:#795548; font-size:13px;">@{{ item.replyNickname }}: </span>
            <span>{{ item.cont }}</span>
          </span>
        </mu-row>

        <mu-row v-if="item.img" class="img-row">
          <img class="img-self" :src="item.img | imgPrefixDeal()">
        </mu-row>

        <mu-row class="create-time">
          <span style="color:#757575;">{{ item.createTime | formatTime('{y}/{m}/{d} {h}:{i}') }} ·</span>  
          <span @click="newChat(item.userID, item.chatID, item.nickname)" class="reply-button"> 回复</span>
        </mu-row>

        <mu-row v-if="item.replyID" class="reply-origin-row">
          <span><span style="color:#795548;">{{ item.replyNickname }}：</span>{{ item.replyCont }}</span>
        </mu-row>

        <mu-divider></mu-divider>

      </mu-container>
    </mu-load-more>

    <mu-row v-show="IsTheLast" justify-content="center" class="no-more-reply">
      <span> 没有更多的回复 </span>
    </mu-row>
    <!-- END 回复评论 -->
  </div>
</template>

<script>
import utils from 'common/utils'
export default {
  name: 'chat-list',
  data () {
    return {
      Loading: false,
      IsSortup: false,
      IsTheLast: true,
      ChatList: [],
      Page: 1
    }
  },
  props: [
    'TeamType',
    'TeamID'
  ],
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.Loading = true      
      let sortWay = this.IsSortup == false ? 0 : 1
      this.$axios.get(`/common/chatList/${this.TeamType}/${this.TeamID}/${this.Page}/${sortWay}`,{}).then((resp)=>{
        console.log(resp)
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }

        let dataBack = resp.data.msg
        this.IsTheLast = dataBack.length < 15 ? true : false

        this.ChatList = this.ChatList.concat(dataBack)
        this.Page++
        this.Loading = false
      })
    },
    convertSort () {
      // 当转换排序顺序的时候，把页数重置，然后，重新加载回复评论
      this.Page = 1
      this.ChatList = []
      this.IsSortup = !this.IsSortup
      this.load()
    },
    newChat (replyTo, chatID, replyNickname) {
      this.$parent.newChat(true, replyTo, chatID, replyNickname)
    }
  }
}
</script>

<style scoped>

.sort-bar { background:#f5f5f5; border-top:1px solid #fff; font-size:12px; padding:.4rem .5rem; margin-bottom:.5rem; }
.sort-bar-svg { margin-left:auto; font-size:18px; margin-right:.3rem; }

.chat-container { padding:.5rem .5rem; }
.avatar-male { padding:.1rem; border:1px solid #03a9f4; border-radius:50%; background:white; }
.avatar-female { padding:.1rem; border:1px solid #e91e63; border-radius:50%; background:white; }
.nickname { font-size:14px; font-weight:700; margin-left:.5rem; margin-right:.5rem; color:#424242; letter-spacing: 1px; }

.reply-row { font-size:15px; padding:.2rem 1rem 0 2rem; color:#424242; }
.reply-span { margin-left:.5rem; letter-spacing: 1px; }

.img-row { padding:.5rem .5rem .5rem 2.3rem; font-size:12px; color:#616161; }
.img-self { max-width:100%; max-height:10rem; border-radius:.3rem; }

.create-time { padding: .5rem 0 0 2.5rem; font-size:13px; margin-bottom:1rem; }
.reply-button { color:green; margin-left:.3rem; }

.reply-origin-row { background:#eeeeee; padding:.5rem; margin-right:1.5rem; margin-left:2.2rem; letter-spacing: 1px; margin-bottom:1rem; }

.no-more-reply { padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; margin-bottom:3rem; color:#9e9e9e; }

</style>


