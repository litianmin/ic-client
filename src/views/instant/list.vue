<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-flex 
      style="padding:.6rem .8rem; background: linear-gradient(to right, #4dd0e1 , #80cbc4); box-shadow: 0 0 1px #26c6da; margin-bottom:.5rem;" 
      align-items="center">
      <mu-flex align-items="center" @click="goBack">
        <svg-icon icon-class="goback" style="font-size:20px; color:red;"></svg-icon>
      </mu-flex>
      <mu-flex align-items="center" style="padding: 0 0 0 2rem;">
        <span style="color:#fff;">即时组队</span>
      </mu-flex>
    </mu-flex>
    <!-- END 头部 -->
    <mu-load-more :loading="Loading" @load="loadTeamList" :loaded-all="IsTheLast">
      <div style="width:100%; padding:.5rem;">
        <mu-row v-for="(item, index) in TeamList" :key="index" @click="linkToDetail(item.teamID)" style="width:100%; padding:.5rem; margin-bottom:.8rem; border-radius:.3rem; background:#fff; border:1px solid #e0e0e0;">
          <mu-flex style="width:100%;" align-items="center">
            <mu-avatar size="30">
              <img :src="item.avatar | imgPrefixDeal()" alt="">
            </mu-avatar>
            <span style="font-weight:700; margin-left:.5rem;">{{ item.nickname }}</span>
            <span style="margin-left:auto; font-size:12px; color:#9e9e9e;">{{ item.createTime | formatTime() }}</span>
          </mu-flex>
          <mu-row style="padding:.7rem .5rem .3rem 1rem; font-size:13px;">
            {{ item.cont }}
          </mu-row>
          <mu-flex style="width:100%; padding:.5rem" align-items="center">
            <mu-icon value="person_pin_circle" color="#4caf50" size="20"></mu-icon>
            <span style="font-size:12px; color:#9e9e9e;">地点：{{ item.siteName }} · 距离你{{ item.distance | distanceFormat() }}</span>
          </mu-flex>
        </mu-row>
      </div>

      <mu-row v-show="IsTheLast> 0" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:1rem; margin-bottom:.5rem; color:#9e9e9e;">
        <span style="">没有更多的组队</span>
      </mu-row>
    </mu-load-more>

    <Footer navActive="nearby" />

  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import { wxInit } from '@/common/wxInit.js'
import utils from 'common/utils.js'
export default {
  components: {
    Footer,
  },
  data () {
    return {
      ShareTitle: '', // 分享title
      ShareDesc: '',  // 分享描述
      ShareImgUrl: '',  // 分享图片

      TeamList: [],
      IsTheLast: true,
      Loading: true,
      Page: 1,
      Lng: 0,
      Lat: 0,
    }
  },
  mounted () {
    wxInit(this, true)

    this.ShareTitle = `助助社交，更多即时组队等你来！`   // 分享title
    this.ShareDesc = '有没有随心而动想去的地方？有没有嘴馋就想去吃的美食？一个人不想去？来这里找些小伙伴一起吧！'  // 分享描述
  },
  methods: {
    pageInit () {
      let locateInfo = utils.getLocationInfo()
      this.Lng = locateInfo.lng
      this.Lat = locateInfo.lat
      this.loadTeamList()
    },
    goBack () {
      this.$router.go(-1)
    },
    loadTeamList () {
      this.$axios.post( "/instant/list", {
          page: this.Page,
          lng: this.Lng,
          lat: this.Lat,
        }
      ).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }
        let dataBack = resp.data.msg
        this.IsTheLast = dataBack.isTheLast
        let listInfo = dataBack.listInfo

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


