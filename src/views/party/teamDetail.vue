<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#00bcd4" z-depth="0.5">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        节日聚会
      </div>

      <span style="color:#fff; font-size:12px; padding:0 .5rem;" slot="right">创建组队</span>
    </mu-appbar>
    <!-- END 头部 -->

    <!-- 展示图片 -->
    <mu-flex style="position:relative;" justify-content="center">
      <swiper :options="swiperOption" style="height: auto">
        <swiper-slide style="text-align:center;">
          <img style="max-width:100%; max-height:100%;" src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2501392519,3156888665&fm=26&gp=0.jpg" alt="">
        </swiper-slide>
        <swiper-slide style="text-align:center;">
          <img style="max-width:100%; max-height:100%;" src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=86800378,2484401671&fm=26&gp=0.jpg" alt="">
        </swiper-slide>
        <swiper-slide style="text-align:center;">
          <img style="max-width:100%; max-height:100%;" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2821357322,839888098&fm=26&gp=0.jpg" alt="">
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </mu-flex>

    <div style="padding:.5rem 1rem 0rem .5rem;">
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">主要活动:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">什么活动</span>
      </mu-row>
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">活动地点:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">什么地点</span>
      </mu-row>
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">活动时间:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">2019/01/02 11:09  ~  2019/02/04 12:03</span>
      </mu-row>
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">集合地点:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">这是我的集合地点</span>
      </mu-row>
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">招募人数:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">20/<span style="color:green; font-size:10px;">10</span></span>
      </mu-row>
      <mu-row style="margin-bottom:.3rem;">
        <span style="color:#795548; font-size:12px;">队友偏爱:</span>
        <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">这是我的队友偏爱</span>
      </mu-row>

      <mu-row style="margin-top:.5rem;">
        <span style="color:#795548; font-size:12px;">详细内容:            <span style="margin-left:.5rem; color:#9e9e9e; font-size:12px;">其实我也不是很清楚啊</span></span>
      </mu-row>
    </div>

    <mu-flex style="font-size:12px; padding:.8rem 1rem 1rem .5rem; margin-top:.5rem; border-bottom:2px solid #fff;" align-items="center">
      <mu-icon value="person_pin_circle" color="green" size="18"></mu-icon>
      <span style="font-size:12px;">距离你 <span style="font-size:12px;">600米</span></span>
      <span style="margin-left:auto; color:#9e9e9e; font-size:12px;">3分钟前</span>
    </mu-flex>

    <div style="padding:.5rem; border-bottom:1px dashed #eeeeee; ">
      <mu-flex align-items="center">
        <mu-avatar size="38" style="padding:.1rem; border:1px solid #bbdefb; border-radius:50%; background:white;">
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1458905549,3416342455&fm=27&gp=0.jpg" alt="">
        </mu-avatar>
        <div style="margin-left:.5rem;">
          <mu-row style="font-size:12px;">俺是黎添民</mu-row>
          <mu-row style="margin-top:.2rem;font-size:7px; color:#43a047;">社交菜鸟Lv1</mu-row>
        </div>
        <div style="margin-left:auto; background:#4db6ac; padding:.2rem .3rem; color:#fff; border-radius:.2rem; font-size:12px; margin-right:.5rem;">Leader</div>
      </mu-flex>
    </div>

    <mu-flex style="padding:.5rem 1rem; background:#fff;" justify-content="center" align-items="center" wrap="wrap">
        <mu-avatar size="35" style="padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; margin-right:.5rem;">
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1458905549,3416342455&fm=27&gp=0.jpg" alt="">
        </mu-avatar>
        <mu-avatar size="35" style="padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; margin-right:.5rem;">
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1458905549,3416342455&fm=27&gp=0.jpg" alt="">
        </mu-avatar>
                    <mu-avatar size="35" style="padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; margin-right:.5rem;">
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1458905549,3416342455&fm=27&gp=0.jpg" alt="">
        </mu-avatar>
                    <mu-avatar size="35" style="padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; margin-right:.5rem;">
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1458905549,3416342455&fm=27&gp=0.jpg" alt="">
        </mu-avatar>
                    <mu-avatar size="35" style="padding:.1rem; border:1px solid #f8bbd0; border-radius:50%; background:white; margin-right:.5rem;">
          <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1458905549,3416342455&fm=27&gp=0.jpg" alt="">
        </mu-avatar>
        <svg-icon icon-class="add_circle_outline" style="font-size:40px; color:red;"></svg-icon>
    </mu-flex>
    <mu-flex justify-content="center" style="padding:.3rem 0 .5rem 0; border-bottom:1px dashed #e0e0e0; background:#fff;">
      <span style="font-size:12px; color:#9e9e9e;">-- 招募20人，还差10人 --</span>
    </mu-flex>

    <!-- BEGIN 排序条 -->
    <mu-flex class="sort-bar" justify-content="center" align-items="center" >
      <span style="margin-left:.3rem">回复列表 (0)</span>
      <span @click="convertSort" class="sort-bar-svg"><svg-icon :icon-class="IsSortup == true ? 'sortup' : 'sortdown'"></svg-icon></span>
    </mu-flex>
    <!-- END 排序条 -->

    <!-- BEGIN 回复评论 -->
    <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">
      <mu-container class="reply-container" v-for="(item, index) in ReplyList" :key="index">
        <mu-flex align-items="center">
          <mu-avatar size="24">
            <img :src="item.avatar">
          </mu-avatar>
          <span class="reply-nickname">
            {{ item.nickname }} 
          </span>
          <span class="reply-time">{{ item.create_time }}</span>
        </mu-flex>

        <mu-row class="reply-cont-box">
          <span style="font-size:12px; margin-left:.5rem; ">
            <span v-if="item.reply_to > 0">@<span style="color:#795548;">{{ item.reply_nickname }}</span> :</span> {{ item.c_cont }}

            <span style="color:green; margin-left:.5rem;"  @click="replytoComment(true, item.user_id, item.nickname)">
              回复
            </span>
          </span>
        </mu-row>

        <mu-row v-if="item.c_img" class="comment-item-img" style="padding:.5rem .5rem .5rem 1rem; ">
          <img :src="item.c_img">
        </mu-row>
      </mu-container>

      <mu-row v-show="IsTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; margin-bottom:.8rem; color:#9e9e9e;">
        <span> 没有更多的回复 </span>
      </mu-row>

    </mu-load-more>
    <!-- END 回复评论 -->

  </div>

  

</template>

<script>
export default {
  data () {
    return {
      TeamID: 0,
      IsSortup: false,
      IsTheLast: true,
      ReplyListPage: 1,
      ReplyList: [],
      Loading: false,

      swiperOption: {
        autoHeight: true, //enable auto height
        spaceBetween: 20,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },   

    }
  },
  mounted () {
    this.TeamID = this.$route.params.teamID
    console.log(this.TeamID)
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    load () {
      this.Loading = true      
      let sortWay = this.IsSortup == false ? 0 : 1
      this.$axios.post(`/game/commentReplyList/${this.ReplyListPage}/${this.CommentID}/${sortWay}`,{}).then((resp)=>{
        let dataBack = resp.data
        this.IsTheLast = dataBack.isTheLast
        let replyList = dataBack.listInfo
        for(let i = 0; i < replyList.length; i++) {
          replyList[i].create_time = utils.getDateDiff(replyList[i].create_time, false)
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
    replytoComment (isReply, replyID, replyNickname) {
      this.$router.push({path:`/game/replytoComment`, query:{commentID:this.CommentID, isReply:isReply, replyID:replyID, replyNickname:replyNickname}})
    }
  },
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }

.sort-bar { background:#f5f5f5; border-top:1px solid #fff; font-size:12px; padding:.4rem .5rem; margin-bottom:.5rem; }
.sort-bar-svg { margin-left:auto; font-size:18px; margin-right:.3rem; }

.reply-container { padding:.5rem .8rem; border-bottom:.1rem solid #ffffff; }

.reply-nickname { font-size:12px; margin-left:.5rem; margin-right:.5rem; color:#4db6ac; }
.reply-time { margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem; }
.reply-cont-box { font-size:12px; padding:.5rem .5rem .5rem 1rem; }

.reply-input-box { position:fixed; bottom:0; width:100%; padding:.5rem; background:#ffffff; border-top:1px solid #e0e0e0; }
.reply-input-box input { width:100%; border-radius:.3rem; padding:.3rem; background:#f5f5f5; border:0; font-size:12px; }
.reply-input-box-span { margin-left:auto; font-size:18px; margin-right:.3rem; }


.comment-box { padding:.5rem 1rem; }
.comment-item-nickname { margin-left:.5rem; font-size:12px; color:#4db6ac; }
.comment-item-time { margin-left: auto; margin-right:.3rem; font-size:12px; color:#9e9e9e; }
.comment-item-text { padding:.5rem 0 .5rem 1.5rem; font-size:12px; }
.comment-item-img { padding:.5rem .5rem 0 1rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
</style>


