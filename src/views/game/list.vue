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

          <div v-for="item in HotGameList" :key="item.gameID">
            <mu-list-item avatar :ripple="false" button @click="linkToDetail(item.gameID, item.gameName)">
              <mu-list-item-action>
                <div class="list-item-div">
                  <img :src="item.gameLogo">
                </div>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.gameName }}</mu-list-item-title>
                <mu-list-item-sub-title>
                  {{ item.briefDesc }}
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider></mu-divider>
          </div>

      </mu-list>
      <!-- END 热门游戏列表 -->


      <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">

        <!-- BEGIN 游戏列表 -->
        <mu-list textline="three-line">
          <mu-sub-header style="color:#4caf50;">--全部游戏--</mu-sub-header>
          
          <div v-for="item in GameList" :key="item.gameID">
            <mu-list-item avatar :ripple="false" button @click="linkToDetail(item.gameID, item.gameName)">
              <mu-list-item-action>
                <div class="list-item-div">
                  <img :src="item.gameLogo">
                </div>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.gameName }}</mu-list-item-title>
                <mu-list-item-sub-title>
                  {{ item.briefDesc }}
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider></mu-divider>
          </div>
          
          <mu-row v-show="IsTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; color:#9e9e9e;">
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
      Page: 1,
      IsTheLast: true,
      Loading: false,
    }
  },
  mounted () {
    wxInit(this, false)
  },
  methods: {
    pageInit () {
      // 初始化，获取热门游戏列表和普通游戏列表
      this.$axios.post(`/game/gameListFirstLoad`).then((resp)=>{
        let data = resp.data 
        if (data.code != 20000) {
          this.$toast.info(data.msg)
          return
        }

        data = data.msg
        if (data.hotGames.length == 0) {
          this.HotGameShow = false
        } else {
          // 没有热门游戏，那么隐藏热门游戏列表
          this.HotGameList = data.hotGames
        }

        if (data.games.length < 10) {
          this.IsTheLast = true
        } else {
          this.IsTheLast = false
        }
        this.GameList = data.games

        // 微信分享
        this.ShareTitle = `玩游戏总是单机？快来助助社交招募伙伴陪你一起玩吧！`   // 分享title
        this.ShareDesc = '助助社交游戏组队功能可以让你找寻心仪的队友，从此告别单人游戏！'  // 分享描述
      })
    },
    load () {
      this.Loading = true
      this.Page++      
      this.$axios.get(
        `/game/list/${this.Page}`,{}
      ).then((resp)=>{
        let data = resp.data
        if (data.code != 20000) {
          this.$toast.info(data.msg)
          return
        }

        let list = data.msg
        this.GameList = this.GameList.concat(list)
        if (list.length < 10) {
          this.IsTheLast = true
        }
        this.Loading = false
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
        this.Page = 1
        this.GameList = []
        this.load()
        return
      } 

      this.Loading = true
      this.$axios.post(
        `/game/gameSearch`,{
          cont: this.SearchCont
        }
      ).then((resp)=>{
        this.HotGameShow = false
        let dataBack = resp.data
        let gameListInfo = dataBack.msg

        gameListInfo.map(item => {
          item.gameID = item.game_id
          item.gameName = item.game_name
          item.briefDesc = item.game_desc
          item.gameLogo = item.game_logo
        })

        this.GameList = gameListInfo
        this.IsTheLast = true
        this.Loading = false
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

