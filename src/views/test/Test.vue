<template>
  <div>
    <div style="padding:1rem 0 0 1rem; ">
      <svg-icon icon-class="team-gray" class="icon-class"></svg-icon>
      <span style="margin-left:.5rem; font-size:14px; font-weight:700; color:#757575;">招募中</span>
    </div>

    <div style="padding:1rem;">
      <mu-row style="margin-bottom:1rem; border:1px solid #eeeeee; padding:.8rem; border-radius:.5rem;">
        <mu-col span="2" align-items="center" style="">
          <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
            <div style="width:3rem; height:3rem; background:#7e57c2; color:#fff; padding:.5rem; border-radius:.5rem;">
              <div style="text-align:center;">
                <svg-icon icon-class="notify-game-comment" class="icon-class"></svg-icon>
              </div>
              <div class="icon-font">测 试</div>
            </div>
            <!-- <div v-if="item.readStatus == 0" class="notify-point"></div> -->
          </mu-flex>
        </mu-col>
        <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
          <mu-row>
            <span class="notify-title">这里是我的主题</span> 
            <span class="notify-time">2019-01-02 05:06</span>
          </mu-row>
          <mu-row style="margin-top:.2rem;">
            <span class="notify-desc span-omit">这里是我的描述！爱得痛了</span>
          </mu-row>
        </mu-col>
      </mu-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      Page: 1,
      List: [],
      StatusType: 0,  // 0, 1, 3
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.$axios.get(`/user/joinTeamList/${this.StatusType}/${this.Page}`, {}).then((resp) => {
        console.log(resp)
      })
    }
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
.icon-class {font-size:16px;}
.icon-font {text-align:center; font-size:11px;}

.notify-title {font-size:14px; color:#616161;}
.notify-time {margin-left:auto; font-size:12px; color:#9e9e9e; margin-right:.5rem;}
.notify-desc {color:#9e9e9e; font-size:13px;}
.notify-point {position:absolute; top:-.2rem; right:.2rem; width:12px; height:12px; background:red; border:2px solid #fff; border-radius:50%;}

.footer{width:100%; position:fixed; bottom:0;}

.span-omit{
  width:100%;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
  word-break:keep-all;
}

.bg-game {width:3rem; height:3rem; background:#673ab7; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-party {width:3rem; height:3rem; background:#e040fb; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-travel {width:3rem; height:3rem; background:#4caf50; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-instant {width:3rem; height:3rem; background:#ff5722; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-activity {width:3rem; height:3rem; background:#795548; color:#fff; padding:.5rem; border-radius:.5rem;}
</style>

