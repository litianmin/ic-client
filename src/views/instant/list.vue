<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#4caf50" z-depth="1">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div ref="menuHide" style="font-size:14px;">
        即时组队
      </div>
    </mu-appbar>
    <!-- END 头部 -->
    <mu-load-more :loading="Loading" @load="loadTeamList" :loaded-all="IsTheLast">
      <div style="width:100%; padding:.5rem;">
        <mu-row v-for="(item, index) in TeamList" :key="index" @click="linkToDetail(item.teamID)" style="width:100%; padding:.5rem; margin-bottom:.8rem; border-radius:.3rem; background:#fff; border:1px solid #e0e0e0;">
          <mu-flex style="width:100%;" align-items="center">
            <mu-avatar>
              <img :src="item.avatar" alt="">
            </mu-avatar>
            <span style="font-weight:700; margin-left:.2rem;">{{ item.nickname }}</span>
            <span style="margin-left:auto; font-size:12px; color:#9e9e9e;">{{ item.createTime }}</span>
          </mu-flex>
          <mu-row style="padding:.5rem .5rem .5rem 1rem; font-size:13px;">
            {{ item.cont }}
          </mu-row>
          <mu-flex style="width:100%; padding:.5rem" align-items="center">
            <mu-icon value="person_pin_circle" color="#4caf50" size="20"></mu-icon>
            <span style="font-size:12px; color:#9e9e9e;">地点：{{ item.siteName }} · 距离你{{ item.distance }}</span>
          </mu-flex>
        </mu-row>
      </div>

      <mu-row v-show="IsTheLast && TeamList.length > 0" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:1rem; margin-bottom:.5rem; color:#9e9e9e;">
        <span style="">没有更多的组队</span>
      </mu-row>
    </mu-load-more>

  </div>
</template>

<script>
import utils from 'common/utils.js'
export default {
  data () {
    return {
      TeamList: [
        {
          teamID: 1,
          cont: "什么鬼内容",
          createTime: 1563347370,
          distance: 1803071.22271581,
          nickname: "朝花夕拾",
          sex: 1,
          avatar: "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2836389094,1674914749&fm=26&gp=0.jpg",
          siteName: ''
        }
      ],
      IsTheLast: false,
      Loading: false,
      Page: 1,
      Lng: 113.122629,
      Lat: 23.029735,
    }
  },
  mounted () {
    this.loadTeamList()
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    loadTeamList () {
      this.$axios.post(
        "/instant/list", 
        {
          page: this.Page,
          lng: 130.645,
          lat: 25.888,
        }
      ).then((resp)=>{
        console.log(resp.data)
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }
        let dataBack = resp.data.msg
        this.IsTheLast = dataBack.isTheLast
        let listInfo = dataBack.listInfo

        for(let i = 0; i < listInfo.length; i++) {
          listInfo[i].createTime = utils.getDateDiff(listInfo[i].createTime, true)
          listInfo[i].distance = utils.distanceFormat(listInfo[i].distance)
          listInfo[i].avatar = utils.imgPrefixDeal(listInfo[i].avatar)
        }
        if(this.Page == 1) {
          this.TeamList = listInfo
        }else{
          this.TeamList = this.TeamList.concat(listInfo)
        }
        this.Page++
        this.Loading = false
      })
    },

    linkToDetail (teamID) {
      this.$router.push(`/instant/detail/${teamID}`)
    },
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
</style>


