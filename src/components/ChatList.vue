<template>
  <div>
    <!-- BEGIN 排序条 -->
    <mu-flex class="sort-bar" justify-content="center" align-items="center" >
      <span style="margin-left:.3rem">回复列表</span>
      <span @click="convertSort" class="sort-bar-svg"><svg-icon :icon-class="IsSortup == true ? 'sortup' : 'sortdown'"></svg-icon></span>
    </mu-flex>
    <!-- END 排序条 -->

    <!-- BEGIN 回复评论 -->
    <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">


      <mu-container style="padding:.5rem .5rem; ">
        <mu-flex align-items="center">
          <mu-avatar size="35" style="padding:.1rem; border:1px solid #03a9f4; border-radius:50%; background:white; ">
            <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3667616433,706958275&fm=26&gp=0.jpg">
          </mu-avatar>
          <span style=" font-size:14px; font-weight:700; margin-left:.5rem; margin-right:.5rem; color:#424242; letter-spacing: 1px;">
            这里是我的昵称，如果
          </span>
          <!-- <span style="margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem; ">10分钟前</span> -->
        </mu-flex>

        <mu-row style="font-size:15px; padding:.2rem 1rem 0 2rem; color:#424242;">
          <span style="margin-left:.5rem; letter-spacing: 1px;">
            <span style="color:#795548;">@蝴蝶梦: </span>这里是我的内容我试下会好很多吗，先看看行不行吧
            <!-- <span style="color:green; margin-left:.5rem;">回复</span> -->
          </span>
        </mu-row>

        <mu-row style=" padding:.5rem .5rem .5rem 2.3rem; font-size:12px; color:#616161; ">
          <img style="max-width:100%; max-height:10rem; border-radius:.3rem;" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1805523750,264673572&fm=26&gp=0.jpg">
        </mu-row>

        <mu-row style="background:#eeeeee; padding:.5rem; margin-right:1.5rem; margin-left:2.2rem; letter-spacing: 1px;">
          <span><span style="color:#795548;">蝴蝶梦：</span>这里是我的内容， 做个好汉子，热血热搜多少发生</span>
        </mu-row>

        <mu-row style="padding: .5rem 0 0 2.3rem; font-size:13px; margin-bottom:1rem;">
          <span style="color:#757575;">10分钟前 ·</span>  
          <span style="color:green; margin-left:.3rem;"> 回复</span>
        </mu-row>

        <mu-divider></mu-divider>

      </mu-container>


      <mu-container class="reply-container" v-for="(item, index) in ReplyList" :key="index">
        <mu-flex align-items="center">
          <mu-avatar size="24" :class="item.user_sex == 1 ? 'avatar-male' : 'avatar-female'">
            <img :src="item.userAvatar">
          </mu-avatar>
          <span class="reply-nickname">
            {{ item.userNickname }} 
          </span>
          <span class="reply-time">{{ item.createTime }}</span>
        </mu-flex>

        <mu-row class="reply-cont-box">
          <span style="font-size:12px; margin-left:.5rem; ">
            <span v-if="item.replyTo > 0">@<span style="color:#795548;">{{ item.replyNickname }}</span> :</span> {{ item.cont }}
            <span style="color:green; margin-left:.5rem;" @click="newChat(true, item.userID, item.chatID, item.userNickname)">回复</span>
          </span>
        </mu-row>

        <mu-row v-if="item.img" class="team-item-img" style="padding:.5rem .5rem .5rem 1rem; ">
          <img :src="item.img">
        </mu-row>
      </mu-container>
    </mu-load-more>

    <mu-row v-show="IsTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; margin-bottom:3rem; color:#9e9e9e;">
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
      ReplyList: [],
      ReplyListPage: 1
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
      this.$axios.get(`/common/chatList/${this.TeamType}/${this.TeamID}/${this.ReplyListPage}/${sortWay}`,{}).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }

        console.log(resp)

        let dataBack = resp.data.msg
        this.IsTheLast = dataBack.length < 15 ? true : false
        let replyList = dataBack
        for(let i = 0; i < replyList.length; i++) {
          replyList[i].createTime = utils.getDateDiff(replyList[i].createTime, true)
          replyList[i].userAvatar = utils.imgPrefixDeal(replyList[i].userAvatar)
          replyList[i].img = utils.imgPrefixDeal(replyList[i].img)
        }
        this.ReplyList = this.ReplyList.concat(replyList)
        this.ReplyListPage++
        this.Loading = false
      })
    },
    convertSort () {
      // 当转换排序顺序的时候，把页数重置，然后，重新加载回复评论
      this.ReplyListPage = 1
      this.ReplyList = []
      this.IsSortup = !this.IsSortup
      this.load()
    },
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }

.mine-menu-box { margin-top:1rem; right:.5rem; }
.mine-menu-list { background:#4dd0e1; color:white; padding:0; }
.mine-menu-item { color:#fff; font-size:12px; }

.sort-bar { background:#f5f5f5; border-top:1px solid #fff; font-size:12px; padding:.4rem .5rem; margin-bottom:.5rem; }
.sort-bar-svg { margin-left:auto; font-size:18px; margin-right:.3rem; }

.reply-container { padding:.5rem .8rem; border-bottom:.1rem solid #ffffff; }

.reply-nickname { font-size:12px; margin-left:.5rem; margin-right:.5rem; color:#4db6ac; }
.reply-time { margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem; }
.reply-cont-box { font-size:12px; padding:.5rem .5rem .5rem 1rem; }

.reply-input-box { position:fixed; bottom:0; width:100%; padding:.5rem; background:#ffffff; border-top:1px solid #e0e0e0; }
.reply-input-box input { width:100%; border-radius:.3rem; padding:.3rem; background:#f5f5f5; border:0; font-size:12px; }
.reply-input-box-span { margin-left:auto; font-size:18px; margin-right:.3rem; }
.reply-input-box-icon { margin-left:auto; margin-right:.5rem; }


.comment-box { padding:.5rem 1rem; }
.comment-item-nickname { margin-left:.5rem; font-size:12px; color:#4db6ac; }
.comment-item-time { margin-left: auto; margin-right:.3rem; font-size:12px; color:#9e9e9e; }
.comment-item-text { padding:.5rem 0 .5rem 1.5rem; font-size:12px; }
.comment-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }

.avatar-male { padding:.1rem; border:1px solid #bbdefb; border-radius:50%; background:white; }
.avatar-female { padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; }

.team-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.team-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
</style>


