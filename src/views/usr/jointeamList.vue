<template>
  <div>
    <div style="padding:1rem 0 .3rem 1rem; ">
      <svg-icon icon-class="team-gray" class="icon-class"></svg-icon>
      <span style="margin-left:.5rem; font-size:14px; font-weight:700; color:#757575;">招募中</span>
    </div>

    <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">  
      <div 
        v-for="(item, index) in List"
        :key="index"
        style="padding:.5rem 1rem; background:#fff; margin-bottom:.2rem;">
        <mu-flex style="padding:.5rem; width:100%;">
          <span style=" font-size:13px; color:#9e9e9e;">{{ item.joinTime | formatTime('{y}/{m}/{d} {h}:{i}') }}</span>
          <span style="margin-left:auto; font-size:13px; color:green; font-weight:700;">{{ item.modName }} · {{ item.joinStatusName }} </span>
        </mu-flex>
        
        <mu-flex align-items="center" style="width:100%; margin-bottom:1rem; border:1px solid #eeeeee; padding:.5rem .8rem; border-radius:.5rem;">
          <mu-flex style="width:30%;">
            <img style="max-width:100%; max-height:100%; border-radius:.3rem;" :src="item.img | imgPrefixDeal()" alt="">
          </mu-flex>

          <mu-flex style="width:70%; padding:0 0 0 .5rem;" wrap="wrap">
            <mu-flex style="width:100%;">
              <span class="notify-title span-omit">{{ item.title }}</span> 
              <!-- <span class="notify-time">2019-01-02 05:06</span> -->
            </mu-flex>

            <mu-flex style="margin-top:.1rem; max-width:100%;">
              <span class="notify-desc span-omit">{{ item.briefDesc }}</span>
            </mu-flex>

            <mu-flex>
              <!-- <span style="color:green;">游戏</span> -->
              <!-- <span class="notify-time">2019-01-02 05:06</span> -->
            </mu-flex>
          </mu-flex>
        </mu-flex>
      </div>
      <mu-row v-show="IsTheLast && List.length > 0" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.5rem; margin-bottom:.5rem; color:#9e9e9e;">
        <span style="">没有更多的组队</span>
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
      StatusType: 0,  // 0, 1, 3
      StatusName: '招募中',
    }
  },
  mounted () {
    // console.log(this.$route.params)
    this.StatusType = this.$route.params.statustype
    switch(this.$route.params.statustype) {
      case 0:
        this.StatusName = '招募中'
        break
      case 1:
        this.StatusName = '已结束'
        break
      case 3:
        this.StatusName = '组队成功'
        break
    }
    this.load()
  },
  methods: {
    load () {

      this.Loading = true
      this.$axios.get(`/user/joinTeamList/${this.StatusType}/${this.Page}`, {}).then((resp)=>{

        let dataBack = resp.data.msg
        this.IsTheLast = dataBack.length < 10 ? true : false

        // 1=>game, 2=>party, 3=>travel, 4=>instant, 5=>activity,
        let list = dataBack.map( v => {
          v.modName = ''
          switch(v.teamType) {
            case 1:
              v.modName = '游戏'
              break
            case 2:
              v.modName = '聚会'
              break
            case 3:
              v.modName = '旅游'
              break
            case 4:
              v.modName = '即时'
              break
            case 5:
              v.modName = '活动'
              break
          }

          v.joinStatusName = v.joinStatus == 3 ? '已加入' : '离队'
          return v
        })

        this.List = this.List.concat(dataBack)
        this.Page++
        this.Loading = false
      })

      // this.$axios.get(`/user/joinTeamList/${this.StatusType}/${this.Page}`, {}).then((resp) => {
      //   console.log(resp)
      // })
    }
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
.icon-class {font-size:16px;}
.icon-font {text-align:center; font-size:11px;}

.notify-title {font-size:14px;}
.notify-time { font-size:12px; color:#9e9e9e; margin-right:.5rem;}
.notify-desc {color:#9e9e9e; font-size:13px;}
.notify-point {position:absolute; top:-.2rem; right:.2rem; width:12px; height:12px; background:red; border:2px solid #fff; border-radius:50%;}

.footer{width:100%; position:fixed; bottom:0;}

.span-omit{
  width:100%;
  overflow:hidden;
  text-overflow:ellipsis;
  /* white-space:nowrap;
  word-break:keep-all; */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.bg-game {width:3rem; height:3rem; background:#673ab7; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-party {width:3rem; height:3rem; background:#e040fb; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-travel {width:3rem; height:3rem; background:#4caf50; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-instant {width:3rem; height:3rem; background:#ff5722; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-activity {width:3rem; height:3rem; background:#795548; color:#fff; padding:.5rem; border-radius:.5rem;}
</style>

