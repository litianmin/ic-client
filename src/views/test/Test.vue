<template>
  <div>
    <div style="padding:1rem 0 .3rem 1rem; ">
      <svg-icon icon-class="team-gray" class="icon-class"></svg-icon>
      <span style="margin-left:.5rem; font-size:14px; font-weight:700; color:#757575;">招募中</span>
    </div>

    <div style="padding:.5rem 1rem; background:#fff; margin-bottom:.2rem;">
      <mu-flex style="padding:.5rem; width:100%;">
        <span style=" font-size:13px; color:#9e9e9e;">2019-01-02 05:06</span>
        <span style="margin-left:auto; font-size:13px; color:green; font-weight:700;">游戏 · 已离队 </span>
      </mu-flex>
       
      <mu-flex align-items="center" style="width:100%; margin-bottom:1rem; border:1px solid #eeeeee; padding:.5rem .8rem; border-radius:.5rem;">
        <mu-flex style="width:30%;">
          <img style="max-width:100%; max-height:100%; border-radius:.3rem;" src="http://www.icoming.top/image/game/20190919/1568873332718419051126.jpg" alt="">
        </mu-flex>

        <mu-flex style="width:70%; padding:0 0 0 .5rem;" wrap="wrap">
          <mu-flex>
            <span class="notify-title span-omit">这里是我的主题</span> 
            <!-- <span class="notify-time">2019-01-02 05:06</span> -->
          </mu-flex>

          <mu-flex style="margin-top:.1rem; max-width:100%;">
            <span class="notify-desc span-omit">这里是我的描述！爱得痛了撒地方士大夫士大夫打撒发这里是我的描述！爱得痛了撒地方士大夫士大夫打撒发</span>
          </mu-flex>

          <mu-flex>
            <!-- <span style="color:green;">游戏</span> -->
            <!-- <span class="notify-time">2019-01-02 05:06</span> -->
          </mu-flex>
        </mu-flex>
      </mu-flex>
    </div>

    <div style="padding:.5rem 1rem; background:#fff; margin-bottom:.2rem;">
      <mu-flex style="padding:.5rem; width:100%;">
        <span style=" font-size:13px; color:#9e9e9e;">2019-01-02 05:06</span>
        <span style="margin-left:auto; font-size:13px; color:green; font-weight:700;">游戏 · 已离队 </span>
      </mu-flex>
       
      <mu-flex align-items="center" style="width:100%; margin-bottom:1rem; border:1px solid #eeeeee; padding:.5rem .8rem; border-radius:.5rem;">
        <mu-flex style="width:30%;">
          <img style="max-width:100%; max-height:100%; border-radius:.3rem;" src="http://www.icoming.top/image/game/20190919/1568873332718419051126.jpg" alt="">
        </mu-flex>

        <mu-flex style="width:70%; padding:0 0 0 .5rem;" wrap="wrap">
          <mu-flex>
            <span class="notify-title span-omit">这里是我的主题</span> 
            <!-- <span class="notify-time">2019-01-02 05:06</span> -->
          </mu-flex>

          <mu-flex style="margin-top:.1rem; max-width:100%;">
            <span class="notify-desc span-omit">这里是我的描述！爱得痛了撒地方士大夫士大夫打撒发这里是我的描述！爱得痛了撒地方士大夫士大夫打撒发</span>
          </mu-flex>

          <mu-flex>
            <!-- <span style="color:green;">游戏</span> -->
            <!-- <span class="notify-time">2019-01-02 05:06</span> -->
          </mu-flex>
        </mu-flex>
      </mu-flex>
    </div>

    <div style="padding:.5rem 1rem; background:#fff; margin-bottom:.2rem;">
      <mu-flex style="padding:.5rem; width:100%;">
        <span style=" font-size:13px; color:#9e9e9e;">2019-01-02 05:06</span>
        <span style="margin-left:auto; font-size:13px; color:green; font-weight:700;">游戏 · 已离队 </span>
      </mu-flex>
       
      <mu-flex align-items="center" style="width:100%; margin-bottom:1rem; border:1px solid #eeeeee; padding:.5rem .8rem; border-radius:.5rem;">
        <mu-flex style="width:30%;">
          <img style="max-width:100%; max-height:100%; border-radius:.3rem;" src="http://www.icoming.top/image/game/20190919/1568873332718419051126.jpg" alt="">
        </mu-flex>

        <mu-flex style="width:70%; padding:0 0 0 .5rem;" wrap="wrap">
          <mu-flex>
            <span class="notify-title span-omit">这里是我的主题</span> 
            <!-- <span class="notify-time">2019-01-02 05:06</span> -->
          </mu-flex>

          <mu-flex style="margin-top:.1rem; max-width:100%;">
            <span class="notify-desc span-omit">这里是我的描述！爱得痛了撒地方士大夫士大夫打撒发这里是我的描述！爱得痛了撒地方士大夫士大夫打撒发</span>
          </mu-flex>

          <mu-flex>
            <!-- <span style="color:green;">游戏</span> -->
            <!-- <span class="notify-time">2019-01-02 05:06</span> -->
          </mu-flex>
        </mu-flex>
      </mu-flex>
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

