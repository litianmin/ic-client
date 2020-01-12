<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-flex 
      class="gb-top-bar" 
      align-items="center">
      <mu-flex align-items="center" @click="$router.go(-1)">
        <svg-icon icon-class="goback" style="font-size:20px;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">{{ gameName }}</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->
 
    <!-- BEGIN 轮播图 -->
    <!-- swiper1 -->
    <div v-if="isRender" style="margin-top:2.5rem;">
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide v-for="(item, index) in displayImgList" :key="index">
          <img class="swiper-img" :src="item" alt="">
        </swiper-slide>
      </swiper>
      <!-- swiper2 Thumbs -->
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide v-for="(item, index) in displayImgList" :key="index">
          <img class="swiper-img" :src="item" alt="">
        </swiper-slide>
      </swiper>
    </div>
    <!-- END 轮播图 -->

    <!-- BEGIN 游戏简介 -->
    <mu-row class="game-brief-desc">
      <mu-col span="12">
        <div>
          <span style="color:#795548; font-size:13px;">简介：</span> 
          <span style="color:#9e9e9e; font-size:12px;">{{ gameBriefDesc }}</span>
        </div> 
      </mu-col>
    </mu-row>
    <!-- END 游戏简介 -->

    <!-- BEGIN 游戏标签 -->
    <mu-flex class="game-badge" align-items="end">
      <mu-badge 
        v-for="(item, index) in tabList" 
        :key="index" 
        :content="item" 
        color="#00bcd4" 
        style="margin-right:.5rem;"></mu-badge>

      <mu-flex @click="focusChange" style="margin-left:auto; margin-right:1rem;">
        <svg-icon :icon-class="Focus == 0 ? 'focus' : 'had_focus'" style=" font-size:22px;"></svg-icon>
      </mu-flex>
    </mu-flex>
    <!-- END 游戏标签 -->

    <!-- BEGIN 评论/组队内容 -->
    <div style="margin-top:1rem;">
      <mu-divider></mu-divider>

      <!-- 内容切换条 -->
      <mu-tabs 
        :value.sync="active" 
        inverse 
        color="#80cbc4" 
        indicator-color="#80cbc4" 
        text-color="rgba(0, 0, 0, .54)"  
        full-width 
        id="tabBar">
        <mu-tab><span>评 论</span></mu-tab>
        <mu-tab><span>组 队</span></mu-tab>
      </mu-tabs>

      <!-- BEGIN 评论 -->
      <mu-container v-show="active === 0" class="comment-box">

        <mu-row 
          justify-content="center" 
          style="margin-top:.3rem; margin-bottom:1rem;">
          <!-- 创建队伍按钮 -->
          <mu-button class="comment-create-btn" @click="newComment()">
            评论一下&nbsp; <mu-icon value="border_color" size="14"></mu-icon>
          </mu-button>
        </mu-row>

        <mu-load-more :loading="commentLoading" @load="commentLoad" :loaded-all="commentIsTheLast">

          <!-- BEGIN 评论样式 -->
          <div style="margin-top:1rem;" v-for="(item, index) in commentList" :key="index" @click="linkToCommentDetail(item.c_id)">
            <mu-flex align-items="center">
              <mu-avatar size="28">
                <img :src="item.u_avatar | imgPrefixDeal()">
              </mu-avatar>
              <span class="comment-item-nickname">
                {{ item.u_nickname }} 
              </span>
              <span class="comment-item-detail">查看</span>
            </mu-flex>

            <mu-row v-if="item.c_cont" class="comment-item-text">
              {{ item.c_cont }}
            </mu-row>

            <mu-row class="comment-item-img" v-if="item.c_img">
              <img :src="item.c_img | imgPrefixDeal()" alt="">
            </mu-row>

            <mu-row  style="padding:.7rem .5rem;">
                <span style="margin-left:1.7rem; font-size:12px; color:#9e9e9e;">{{ item.c_create_time | formatTime() }}</span>

                <mu-flex align-items="center" style="margin-left:auto;">
                  <mu-icon value="thumb_up" size="12" color="#9e9e9e"></mu-icon>
                  <span class="comment-item-thumbup-count">{{ item.c_likenumb }}</span>
                </mu-flex>

                <mu-flex align-items="center" style=" margin-left:auto; margin-left:.8rem;">
                  <mu-icon value="comment" size="12" color="#9e9e9e"></mu-icon>
                  <span class="comment-item-comment-count">{{ item.c_replynumb }}</span>
                </mu-flex>
            </mu-row>

            <mu-divider></mu-divider>
          </div>
          <!-- END 评论样式 -->

          <mu-row v-show="commentIsTheLast" justify-content="center" style="padding:.5rem; margin-top:.5rem; color:#9e9e9e;">
            <span style="">没有更多的内容</span>
          </mu-row>
        </mu-load-more>
      </mu-container>
      <!-- END 评论 -->

      <!-- BEGIN 组队 -->
      <mu-container v-show="active === 1" class="team-box">

          <mu-row justify-content="center" style="margin-top:.3rem; margin-bottom:1rem;">
            <!-- 创建队伍按钮 -->
            <mu-button class="team-create-btn" @click="formTeam">
              创建队伍<mu-icon value="add" size="18"></mu-icon>
            </mu-button>
          </mu-row>

          <!-- BEGIN 组队样式 -->
          <!-- TODO 这个还是手动加载吧， 好像加了这个会很卡 -->
          <mu-load-more :loading="teamLoading" @load="teamLoad" :loaded-all="teamIsTheLast" style="padding:.1rem;">

            <mu-flex  
              v-for="(item, index) in teamList"
              :key="index"
              @click="joinTeam(item.teamID)"
              wrap="wrap" 
              class="team-container">

              <mu-flex style="position:relative;">

                <mu-flex class="team-recruit-word">
                  <span class="gb-text-3-omit">{{ item.recruitWord }}</span>
                </mu-flex>

                <img class="team-recruit-img" :src="item.recruitImg">
              </mu-flex>


              <mu-flex align-items="center" class="team-leader-container">
                <mu-flex>
                  <img 
                    class="team-leader-avatar"
                    :src="item.avatar">
                </mu-flex>

                <mu-flex>
                  <span class="team-leader-nickname">{{ item.nickname }}</span>
                </mu-flex>
                <span class="team-extracont-operate">查看详情</span>
              </mu-flex>

            </mu-flex>

            <mu-row v-show="teamIsTheLast" justify-content="center" style="padding:.5rem; margin-top:.5rem; color:#9e9e9e;">
              <span style="">没有更多的内容</span>
            </mu-row>
            <div v-show="!teamIsTheLast">
              <mu-row v-show="!teamLoading" justify-content="center" style="padding:.5rem; margin-top:.5rem;" @click="teamLoad">
                <span style="color:green;">点击加载更多</span>
              </mu-row>
              <mu-row v-show="teamLoading" justify-content="center" style="padding:.5rem; margin-top:.5rem;">
                <span data-mu-loading-size="18" data-mu-loading-color="green" data-mu-loading-overlay-color="rgba(250, 250, 250, .7)" v-loading="true"></span>
                <span style="margin-left:.5rem; color:green; font-size:12px;">加载中· · ·</span>
              </mu-row>
            </div>
          </mu-load-more>
          <!-- END 组队样式 -->

      </mu-container>
      <!-- END 组队 -->
    </div>
    <!-- END 评论/组队内容 -->
  
  </div>
</template>


<script>
import { wxInit } from '@/common/wxInit.js'
export default {
  data() {
    return {
      ShareTitle: '', // 分享title
      ShareDesc: '',  // 分享描述
      ShareImgUrl: '',  // 分享图片

      swiperOptionTop: {
        spaceBetween: 10,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        autoplay: true, // 是否自动播放
        delay: 5000,  // 5s切换一次
        speed: 2000,  // 切换所用的时间
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev' 
        }
      },
      swiperOptionThumbs: {
        spaceBetween: 10,
        slidesPerView: 4,
        touchRatio: 0.2,
        loop: true,
        loopedSlides: 5, //looped slides should be the same
        slideToClickedSlide: true,
      },


      active: 0,  // 导航条切换
      panel: '',  // 组队信息展开

      gameID: 0,  // 游戏id
      gameName: '', // 游戏名称
      gameTp: '', // 游戏类型
      gameBriefDesc: '', // 游戏简介
      isRender: false,  // 轮播图是否渲染问题，如果一开始就渲染会出现bug,而且图片必须大于4张，否则会出现bug
      displayImgList: [],  // 轮播图展示图片
      tabList: [],  // 标签列表

      Focus: 0,

      commentPage: 1, 
      commentIsTheLast: true,
      commentLoading: true,
      commentList: [],

      teamPage: 1,
      teamListIsInit: false,
      teamIsTheLast: true,
      teamLoading: true,
      teamList: [],
      teamListOperate: '没有更多内容',
      teamHadJoinList: []
    } 
  },

  mounted () {
    this.gameID = this.$route.params.gameid
    wxInit(this, false)
  },

  watch: {
    active (newVal) {

      if(newVal == 1 && this.teamListIsInit === false) {
        this.teamListIsInit = true
        this.teamLoad()
      }
    },
  },

  methods: {
    pageInit () {
      // 获取游戏的基本信息，评论基本信息，组队基本信息
      this.$axios.post(
        `/game/detail/${this.gameID}`,{}
      ).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.message('系统繁忙')
          return
        }
        let dataBack = resp.data.msg

        let baseInfo = dataBack.baseInfo

        // 游戏基本信息初始化问题
        this.gameTp = baseInfo.g_type
        this.gameBriefDesc = baseInfo.brief_desc
        this.displayImgList = baseInfo.display_imglist
        this.tabList = baseInfo.tab_list
        this.gameName = baseInfo.g_name
        this.Focus = baseInfo.focus
        // 轮播图数据渲染问题
        this.isRender =true
        // 轮播图处理
        this.$nextTick(() => {
          const swiperTop = this.$refs.swiperTop.swiper
          const swiperThumbs = this.$refs.swiperThumbs.swiper
          swiperTop.controller.control = swiperThumbs
          swiperThumbs.controller.control = swiperTop
        })

        // 游戏评论处理
        let cmtList = dataBack.commentInfo.listInfo
        this.commentList = this.commentList.concat(cmtList)
        this.commentIsTheLast = dataBack.commentInfo.isTheLast
        this.commentPage++

        // 微信分享
        this.ShareTitle = `快来招募心仪的队友陪你一起玩<${this.gameName}>！`   // 分享title
        this.ShareDesc = this.gameBriefDesc  // 分享描述

      })
    },

    toggle (panel) {
      this.panel = panel === this.panel ? '' : panel
    },

    newComment () {
      this.$router.push(`/game/newcomment/${this.gameID}`)
    },

    formTeam () {
      this.$router.push(`/game/formteam/${this.gameID}`)
    },

    goBack () {
      this.$router.go(-1)
    },

    commentLoad () { // 加载数据
      this.commentLoading = true

      this.$axios.post(`/game/commentList/${this.commentPage}/${this.gameID}`,{}).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }
        let dataBack = resp.data.msg
        this.commentIsTheLast = dataBack.isTheLast
        let cmtList = dataBack.listInfo
        this.commentList = this.commentList.concat(cmtList)
        this.commentPage++  // 页数+1
        this.commentLoading = false // 关闭转圈圈
      })
    },

    linkToCommentDetail (commentID) {
      this.$router.push(`/game/commentDetail/${commentID}`)
    },

    teamLoad () {
      this.teamLoading = true
      this.$axios.post(`/game/teamList/${this.teamPage}/${this.gameID}`,{}).then((resp)=>{
        
        if(resp.data.code != 20000) {
          this.$toast.info(resp.data.msg)
          return
        }

        let dataBack = resp.data.msg
        if (dataBack.length < 8) {
          this.teamIsTheLast = true
        }

        this.teamList = this.teamList.concat(dataBack)
        this.teamPage++  // 页数+1
        this.teamLoading = false // 关闭转圈圈
      })
    },

    joinTeam (teamID) {
      this.$router.push(`/game/teamDetail/${teamID}`)
    },

    focusChange () {  // 收藏游戏与否
      let operate = this.Focus == 0 ? 1 : 0
      this.$axios.post('/common/collect', {
        type: 2,
        id: Number(this.gameID),
        operate,
      }).then((resp) => {
        if (resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }
        this.Focus = this.Focus == 0 ? 1 : 0
      })
    },
  },
}
</script>

<style>

.swiper-container { background-color: #ffffff; }
.swiper-slide { background-size: cover; background-position: center; }
.swiper-img { max-width:100%; height:auto; }

.gallery-top { height: 80%!important; width: 100%;}
.gallery-thumbs { height: 20%!important; box-sizing: border-box; padding: 1px 0; }
.gallery-thumbs .swiper-slide { width: 25%; height: 100%; opacity: 0.4; }
.gallery-thumbs .swiper-slide-active { opacity: 1; }

.game-brief-desc { margin-top:.5rem; padding:0 .5rem; margin-bottom:.5rem; }
.game-badge { margin-top:.5rem; padding:0 .5rem; }

.comment-box { padding:.5rem 1rem; background:#fff; }
.comment-create-btn { width:100%; padding:.5rem; text-align:center; color:white; background:#4dd0e1; border-radius:.3rem; border:0; }
.comment-item-nickname { margin-left:.5rem; font-size:13px; color:#4db6ac; }
.comment-item-detail { margin-left: auto; font-size:12px; color:#4db6ac; margin-right:.5rem; }
.comment-item-text { padding:.5rem 0 0 2.2rem; font-size:12px; color:#616161; }
.comment-item-img { padding:.5rem .5rem 0 2rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }

.team-box { padding:.5rem 1rem;  background:#fff;}
.team-panel { margin-bottom:1rem; border-radius:.5rem; }
.team-create-btn { width:100%; padding:.5rem; text-align:center; color:white; background:#4dd0e1; border-radius:.3rem; border:0; }
.team-header { padding:.5rem 1rem; border-radius:.3rem; margin-bottom:1rem; }
.team-avatar-flex { width:90%; margin-left:-.5rem; margin-bottom:.5rem; }
.team-leader-nickname { margin-left:.5rem; font-size:12px; color:#795548; }
.team-leaderinfo-item { font-size:12px; margin-bottom:.2rem; }
.team-leaderinfo-title { color:#795548; }
.team-leaderinfo-cont { color:#9e9e9e; }
.team-leaderinfo-img-flex { width:100%; height:10rem; text-align:center; border-radius:.5rem; }
.team-leaderinfo-img-flex img { max-width:100%; border-radius:.3rem; }
.team-extracont-time { font-size:12px; margin-right:1rem; color:#9e9e9e; }


.team-container { width:100%; padding:.5rem; box-shadow:0 0 1px gray; border-radius:.3rem; margin-bottom:2rem; }
.team-recruit-word { position:absolute; bottom:0; left:0; padding:.5rem; width:100%; background:rgba(20, 20, 20, .5); color:#fff; font-size:12px; }
.team-recruit-img { max-width:100%; border-radius:.2rem; }
.team-leader-container { margin-top:.5rem; width:100%; padding: .2rem .3rem; }
.team-leader-avatar { width:2rem; height:2rem; border-radius:50%; }
.team-leader-nickname { margin-left:.5rem; font-size:14px; font-weight:700; color:#424242; }
.team-extracont-operate { font-size:13px; color:#009688; margin-left:auto; margin-right:.5rem;}

.teammate-box { margin-bottom:.5rem; background:rgba(240, 240, 240, .3); padding:.4rem 0 .4rem .5rem; border-radius:.5rem; box-shadow: 0px 0px 1px gray; }
.teammate-info-title { margin-left:.5rem; font-size:12px; color:#795548; }
.teammate-img-flex { width:100%; height:4rem; text-align:center; border-radius:.5rem; }
.teammate-img-flex img { max-width:4rem; max-height:4rem; border-radius:.2rem; }

/* 修改museui原本样式 */
.mu-expansion-toggle-btn { display: none; }


</style>