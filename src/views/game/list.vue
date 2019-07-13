<template>
  <div>

    <!-- BEGIN 头部搜索框 -->
    <mu-appbar class="mine-appbar" color="#009688">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div style="padding: 0 0 .4rem 0;">
        <input type="text" v-model="SearchCont" placeholder=" 搜 索 游 戏" class="search-input">
      </div>

      <mu-button flat slot="right" @click="searchGame">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>
    <!-- END 头部搜索框 -->


    <!-- BEGIN 列表显示内容 -->
    <mu-paper :z-depth="1" class="demo-list-wrap">
      <!-- BEGIN 热门游戏列表 -->
      <mu-list textline="three-line" v-if="hotGameListIsShow">
        <mu-sub-header style="color:#00bcd4;">--热门游戏--</mu-sub-header>

          <div v-for="item in hotGameList" :key="item.g_id">
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

      <!-- <mu-divider></mu-divider> -->

      <mu-load-more :loading="loading" @load="load" :loaded-all="isTheLast">

        <!-- BEGIN 游戏列表 -->
        <mu-list textline="three-line">
          <mu-sub-header style="color:#4caf50;">--全部游戏--</mu-sub-header>
          
            <div v-for="item in gameList" :key="item.g_id">
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
export default {
  data () {
    return {
      SearchCont: '',
      hotGameListIsShow: true,
      hotGameList: [],
      gameList: [],
      page: 1,
      isTheLast: false,
      loading: false,
    }
  },
  mounted () {
    // 初始化，获取热门游戏列表和普通游戏列表
    this.$axios.post(`/game/mainpage`).then((resp)=>{
      
      if(resp.data.code != 20000) {
        this.$toast.message(dataBack.msg)
        return
      }
      
      let dataBack = resp.data.msg

      if(dataBack.hotGame.length == 0) { 
        // 没有热门游戏，那么隐藏热门游戏列表
        this.hotGameListIsShow = false
      }else{
        this.hotGameList = dataBack.hotGame
      }

      this.gameList = dataBack.gameInfo.listInfo

      // 是否为最后一页了
      this.isTheLast = dataBack.gameInfo.isTheLast

    })
  },
  methods: {
    load () {
      this.loading = true
      if(this.isTheLast == true) {
        this.$toast.message('没有更多的内容')
        this.loading = false
        return
      }
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

        this.gameList = this.gameList.concat(gameListInfo.listInfo)
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
        this.$toast.message('搜索内容不能为空')
        return
      } 


      this.loading = true
      this.page++      
      this.$axios.post(
        `/game/list/${this.page}`,{
          is_search: true,
          search_cont: searchCont
        }
      ).then((resp)=>{
        this.hotGameListIsShow = false
        let dataBack = resp.data
        let gameListInfo = dataBack.msg

        this.gameList = gameListInfo.listInfo
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
.search-input {font-size:14px; width:100%; height:1.7rem; border-radius:.2rem; border:0; text-align:center;}

.list-item-div {width:3.5rem; height:3.5rem;}
.list-item-div img {max-width:100%; max-height:100%; border-radius:.5rem;}

.demo-list-wrap { width: 100%; overflow: hidden; }

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

