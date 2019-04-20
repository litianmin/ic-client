<template>
  <div>

    <!-- BEGIN 头部搜索框 -->
    <mu-appbar class="mine-appbar" color="#009688">
      <mu-button icon slot="left">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div style="padding: 0 0 .4rem 0;">
        <input type="text" placeholder=" 搜 索 热 门 游 戏" class="search-input">
      </div>

      <mu-button flat slot="right">
        <mu-icon value="search"></mu-icon>
      </mu-button>
    </mu-appbar>
    <!-- END 头部搜索框 -->


    <!-- BEGIN 列表显示内容 -->
    <mu-paper :z-depth="1" class="demo-list-wrap">
      
      <mu-list textline="three-line" v-if="hotGameListIsShow">
        <mu-sub-header style="color:#00bcd4;">--热门游戏--</mu-sub-header>

          <div v-for="item in hotGameList" :key="item.g_id">
            <mu-list-item avatar :ripple="false" button>
              <mu-list-item-action>
                <div class="list-item-div">
                  <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2031496025,569053297&fm=27&gp=0.jpg">
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

        <!-- <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <div style="width:3.5rem; height:3.5rem;">
              <img style="max-width:100%; max-height:100%; border-radius:.5rem;" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2031496025,569053297&fm=27&gp=0.jpg">
            </div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>Alex Qin</mu-list-item-title>
            <mu-list-item-sub-title>
              <span style="color: rgba(0, 0, 0, .87)">看电影啊</span><br/>
              我们去看电影，最近有部烂片上映，又有吐槽的了
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>

        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <div style="width:3.5rem; height:3.5rem;">
              <img style="max-width:100%; max-height:100%; border-radius:.5rem;" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2031496025,569053297&fm=27&gp=0.jpg">
            </div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>洛奇英雄传</mu-list-item-title>
            <mu-list-item-sub-title>
              洛奇英雄传挺好玩的是吧！端游哦，点击进来啊！
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>

        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <div style="width:3.5rem; height:3.5rem;">
              <img style="max-width:100%; max-height:100%; border-radius:.5rem;" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2031496025,569053297&fm=27&gp=0.jpg">
            </div>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>洛奇英雄传</mu-list-item-title>
            <mu-list-item-sub-title>
              洛奇英雄传挺好玩的是吧！端游哦，点击进来啊！
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider> -->
      </mu-list>

      <!-- <mu-divider></mu-divider> -->

      <mu-load-more :loading="loading" @load="load">
      <mu-list textline="three-line">
        <mu-sub-header style="color:#4caf50;">--全部游戏--</mu-sub-header>

        
          <div v-for="item in gameList" :key="item.g_id">
            <mu-list-item avatar :ripple="false" button>
              <mu-list-item-action>
                <div class="list-item-div">
                  <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2031496025,569053297&fm=27&gp=0.jpg">
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

        <!-- <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2653777330,1123369643&fm=27&gp=0.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>这个周末一起吃饭么?</mu-list-item-title>
            <mu-list-item-sub-title>
              <span style="color: rgba(0, 0, 0, .87)">Myron Liu -</span> 周末要来你这里出差，要不要一起吃个饭呀，实在编不下去了,哈哈哈哈哈哈
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2599779665,4254172285&fm=27&gp=0.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>Alex Qin</mu-list-item-title>
            <mu-list-item-sub-title>
              <span style="color: rgba(0, 0, 0, .87)">看电影啊</span><br/>
              我们去看电影，最近有部烂片上映，又有吐槽的了
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2031496025,569053297&fm=27&gp=0.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>LOL</mu-list-item-title>
            <mu-list-item-sub-title>
              <span style="color: rgba(0, 0, 0, .87)">去打游戏啊</span><br/>
              周末一起 LOL
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item>
        <mu-divider></mu-divider>
        <mu-list-item avatar :ripple="false" button>
          <mu-list-item-action>
            <mu-avatar>
              <img src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2653982291,1045780277&fm=27&gp=0.jpg">
            </mu-avatar>
          </mu-list-item-action>
          <mu-list-item-content>
            <mu-list-item-title>LOL</mu-list-item-title>
            <mu-list-item-sub-title>
              <span style="color: rgba(0, 0, 0, .87)">哇去</span><br/>
              实在编不下去，这就是个demo
            </mu-list-item-sub-title>
          </mu-list-item-content>
        </mu-list-item> -->
      </mu-list>
      </mu-load-more>



    </mu-paper>
    <!-- END 列表显示内容 -->

  </div>  
</template>

<script>
export default {
  data () {
    return {
      hotGameListIsShow: true,
      hotGameList: [],
      gameList: [],
      page: 1,
      loading: false,
    }
  },
  created () {
    this.$axios.post(
      `/gamelist/${this.page}`,{}
    ).then((resp)=>{
      let dataBack = resp.data
      if(dataBack.code == 20000) {
        if(!!dataBack.hotGameList === false) { 
          // 没有热门游戏，那么隐藏热门游戏列表
          this.hotGameListIsShow = false
        }else{
          this.hotGameList = dataBack.hotGameList
        }

        this.gameList = dataBack.gameList

      }
    })
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        // this.gameList = this.gameList.concat(this.gameList)
        this.loading = false
      }, 2000)
    }

  }
}
</script>

<style scoped>

.mine-appbar {width: 100%; height:2.5rem;}
.search-input {font-size:14px; width:100%; height:1.7rem; border-radius:.2rem; border:0; text-align:center;}

.list-item-div {width:3.5rem; height:3.5rem;}
.list-item-div img {max-width:100%; max-height:100%; border-radius:.5rem;}

.demo-list-wrap {
  width: 100%;
  overflow: hidden;
}

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

