<template>
  <div>
    <!-- BEGIN 头部搜索框 -->
    <mu-flex 
      class="gb-top-bar" 
      style="height:3rem;"
      align-items="center" 
      justify-content="between">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex style="width:80%;" align-items="center">
        <input type="text" v-model="SearchCont" placeholder=" 搜 索 游 戏" class="search-input">
      </mu-flex>
      <mu-flex align-items="center" @click="searchGame">
        <svg-icon icon-class="search" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
    </mu-flex>
    <!-- END 头部搜索框 -->


    <!-- BEGIN 列表显示内容 -->
    <mu-paper :z-depth="0" class="demo-list-wrap">
      <!-- BEGIN 热门游戏列表 -->
      <mu-list textline="three-line" v-if="HotGameShow">
        <mu-sub-header style="color:#00bcd4;">--热门游戏--</mu-sub-header>

          <div v-for="item in HotGameList" :key="item.g_id">
            <mu-list-item avatar :ripple="false" button @click="linkToDetail(item.g_id, item.g_name)">
              <mu-list-item-action>
                <div class="list-item-div">
                  <img :src="item.g_logo">
                </div>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.g_name }}</mu-list-item-title>
                <mu-list-item-sub-title>
                  {{ item.brief_desc }}
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider></mu-divider>
          </div>

      </mu-list>
      <!-- END 热门游戏列表 -->


      <mu-load-more :loading="loading" @load="load" :loaded-all="isTheLast">

        <!-- BEGIN 游戏列表 -->
        <mu-list textline="three-line">
          <mu-sub-header style="color:#4caf50;">--全部游戏--</mu-sub-header>
          
          <div v-for="item in GameList" :key="item.g_id">
            <mu-list-item avatar :ripple="false" button @click="linkToDetail(item.g_id, item.g_name)">
              <mu-list-item-action>
                <div class="list-item-div">
                  <img :src="item.g_logo">
                </div>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.g_name }}</mu-list-item-title>
                <mu-list-item-sub-title>
                  {{ item.brief_desc }}
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider></mu-divider>
          </div>
          
          <mu-row v-show="isTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; color:#9e9e9e;">
            <span style="">没有更多的内容</span>
          </mu-row>
          
        </mu-list>
        <!-- END 游戏列表 -->
        
      </mu-load-more>

    </mu-paper>
    <!-- END 列表显示内容 -->

  </div>  
</template>

<script>
import { wxInit } from '@/common/wxInit.js'
export default {
  data () {
    return {
      ShareTitle: '', // 分享title
      ShareDesc: '',  // 分享描述
      ShareImgUrl: '',  // 分享图片

      SearchCont: '',
      HotGameShow: true,
      HotGameList: [],
      GameList: [],
      page: 1,
      isTheLast: true,
      loading: true,
    }
  },
  mounted () {
    wxInit(this, false)
  },
  methods: {
    pageInit () {
      // 初始化，获取热门游戏列表和普通游戏列表
      this.$axios.post(`/game/mainpage`).then((resp)=>{
        
        if(resp.data.code != 20000) {
          this.$toast.message(dataBack.msg)
          return
        }
        
        let dataBack = resp.data.msg

        if(dataBack.hotGame.length == 0) { 
          // 没有热门游戏，那么隐藏热门游戏列表
          this.HotGameShow = false
        }else{
          this.HotGameList = dataBack.hotGame
        }

        this.GameList = dataBack.gameInfo.listInfo

        // 是否为最后一页了
        this.isTheLast = dataBack.gameInfo.isTheLast

        // 微信分享
        this.ShareTitle = `玩游戏总是单机？快来助助社交招募伙伴陪你一起玩吧！`   // 分享title
        this.ShareDesc = '助助社交游戏组队功能可以让你找寻心仪的队友，从此告别单人游戏！'  // 分享描述

      })
    },
    load () {
      this.loading = true
      this.page++      
      this.$axios.post(
        `/game/list/${this.page}`,{
          is_search: false,
          search_cont: ''
        }
      ).then((resp)=>{
        let dataBack = resp.data

        if(dataBack.code != 20000) {
          this.$toast.message(dataBack.msg)
        }

        let gameListInfo = dataBack.msg

        this.GameList = this.GameList.concat(gameListInfo.listInfo)
        this.isTheLast = gameListInfo.isTheLast
        this.loading = false
        return
      })
    },

    linkToDetail (gameid, gamename) {
      this.$router.push({path:`/game/detail/${gameid}`, query: {gamename: gamename}})
    },
    goBack () {
      this.$router.go(-1)
    },
    searchGame () {
      let searchCont = this.SearchCont
      if(searchCont.trim().length == 0) {
        this.page = 1
        this.GameList = []
        this.load()
        return
      } 

      this.loading = true
      this.$axios.post(
        `/game/gameSearch`,{
          cont: this.SearchCont
        }
      ).then((resp)=>{
        this.HotGameShow = false
        let dataBack = resp.data
        let gameListInfo = dataBack.msg

        gameListInfo.map(item => {
          item.g_id = item.game_id
          item.g_name = item.game_name
          item.brief_desc = item.game_desc
          item.g_logo = item.game_logo
        })

        this.GameList = gameListInfo
        this.isTheLast = true
        this.loading = false
        return
      })
    },
  }
}
</script>

<style scoped>

.mine-appbar {width: 100%; height:2.5rem;}
.search-input {font-size:14px; width:100%; height:1.7rem; border-radius:.2rem; border:0; padding: 0 .5rem; letter-spacing: 1px;}

.list-item-div {width:3.5rem; height:3.5rem;}
.list-item-div img {max-width:100%; max-height:100%; border-radius:.5rem;}

.demo-list-wrap { margin-top: 3rem; width: 100%; overflow: hidden; }

.mu-item-action { 
    min-width: 70px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 100%;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    color: rgba(0,0,0,.54);
}
</style>

