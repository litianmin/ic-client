<template>
  <div>
    <div style="padding:1rem 0 .3rem 1rem; ">
      <svg-icon icon-class="game-gray" class="icon-class"></svg-icon>
      <span style="margin-left:.5rem; font-size:14px; font-weight:700; color:#757575;">我的游戏</span>
    </div>

    <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">  
      <div style="padding:.5rem 1rem; ">
        <mu-flex 
          v-for="(item, index) in List"
          :key="index"
          @click="linkToGameDetail(index)"
          align-items="center"
          style="width:100%; padding:.6rem; border:1px solid #e0e0e0; border-radius:.3rem; margin-top:.5rem; margin-bottom:1.5rem;">

          <mu-flex style="width:4rem;">
            <img 
              :src="item.logo"
              style="width:3rem; height:3rem; border-radius:.5rem;">
          </mu-flex>

          <mu-flex 
            wrap="wrap"
            align-items="center"
            style="margin-left:1rem; width:100%;">
            <mu-flex style="width:100%; font-size:16px;">{{ item.name }}</mu-flex>
            <mu-flex 
              align-items="center"
              style="width:100%;">
              <span style="font-size:12px; color:#9e9e9e;">收藏于 {{ item.collectTime | formatTime('{y}/{m}/{d} {h}:{i}') }}</span>
              <button style="margin-left:auto; font-size:12px; border:1px solid #e0e0e0; color:#757575; background:#fff; border-radius:.3rem;">取消收藏</button>
            </mu-flex>
          </mu-flex>
        </mu-flex>
      </div>
      <mu-row v-show="IsTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.5rem; margin-bottom:.5rem; color:#9e9e9e;">
        <span style="">没有更多的内容</span>
      </mu-row>
    </mu-load-more>


  </div>
</template>


<script>
export default {
  data () {
    return {
      Page: 1,
      IsTheLast: true,
      Loading: true,
      List: [],
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.Loading = true
      this.$axios.get(`/user/gameCollection/${this.Page}`, {}).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }

        let dataBack = resp.data.msg
        this.IsTheLast = dataBack.length < 10 ? true : false

        this.List = this.List.concat(dataBack)
        this.Page++
        this.Loading = false
      })
    },
    cancleCollect (index) {
      this.$axios.post('/common/collect', {
        type: 1,
        id: this.List[index].articleID,
        operate: 0,
      }).then((resp) => {
        if (resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }
        this.List.splice(index, 1)
      })
    },
    linkToGameDetail (index) {
      let gameID = this.List[index].gameID
      this.$router.push(`/game/detail/${gameID}`)
    }
  }
}
</script>

<style scoped>
.icon-class {font-size:16px;}
</style>