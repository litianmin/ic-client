<template>
  <div>
    <!-- BEGIN 头部搜索框 -->
    <mu-flex 
      class="gb-top-bar" 
      style="height:3rem;"
      align-items="center" 
      justify-content="between">
      <mu-flex align-items="center" @click="$router.go(-1)">
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

          <div v-for="item in HotGameList" :key="item.game_id">
            <mu-list-item avatar :ripple="false" button @click="linkToDetail(item.game_id, item.game_name)">
              <mu-list-item-action>
                <div class="list-item-div">
                  <img :src="item.game_logo">
                </div>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.game_name }}</mu-list-item-title>
                <mu-list-item-sub-title>
                  {{ item.game_desc }}
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider></mu-divider>
          </div>

      </mu-list>
      <!-- END 热门游戏列表 -->

      <!-- BEGIN 游戏列表 -->
      <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">
        <mu-list textline="three-line">
          <mu-sub-header style="color:#4caf50;">--全部游戏--</mu-sub-header>
          
          <div v-for="item in GameList" :key="item.game_id">
            <mu-list-item avatar :ripple="false" button @click="linkToDetail(item.game_id, item.game_name)">
              <mu-list-item-action>
                <div class="list-item-div">
                  <img :src="item.game_logo">
                </div>
              </mu-list-item-action>
              <mu-list-item-content>
                <mu-list-item-title>{{ item.game_name }}</mu-list-item-title>
                <mu-list-item-sub-title>
                  {{ item.game_desc }}
                </mu-list-item-sub-title>
              </mu-list-item-content>
            </mu-list-item>
            <mu-divider></mu-divider>
          </div>
          
          <mu-row v-show="IsTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; color:#9e9e9e;">
            <span style="">没有更多的内容</span>
          </mu-row>
        </mu-list>
      </mu-load-more>
      <!-- END 游戏列表 -->

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
      HotGameShow: false,
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
      this.load(false)
      // 微信分享
      this.ShareTitle = `玩游戏总是单机？快来助助社交招募伙伴陪你一起玩吧！`   // 分享title
      this.ShareDesc = '助助社交游戏组队功能可以让你找寻心仪的队友，从此告别单人游戏！'  // 分享描述
    },

    load (isSearch) {
      this.Loading = true
      this.$axios.post(`/game/getGames`,{
        page: this.Page,
        isSearch: isSearch,
        searchCont: this.SearchCont
      }).then((resp)=>{
        console.log(resp)
        let data = resp.data
        if (data.code != 20000) {
          this.$toast.info(data.msg)
          return
        }
        let msg = data.msg
        if (this.Page == 1) { // 如果是第一页，那么判断是否有热门游戏
          if (msg.hotGames.length > 0) {
            this.HotGameShow = true
          }
          this.HotGameList = msg.hotGames
        }
        this.GameList = this.GameList.concat(msg.games)
        if (msg.games.length < 10) {
          this.IsTheLast = true
        }
        this.Page++      
        this.Loading = false
      })
    },

    linkToDetail (gameid, gamename) {
      this.$router.push({path:`/game/detail/${gameid}`, query: {gamename: gamename}})
    },

    searchGame () { // 搜索游戏名称
      if (this.SearchCont == '') {  // 如果内容为空，用load函数
        this.Page = 1 
        this.GameList = []
        this.load(false)
        return
      } else {
        this.GameList = []
        this.HotGameShow = false
        this.load(true)
      }
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

