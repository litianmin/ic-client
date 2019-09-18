<template>
  <div>
    <div style="padding:1rem 0 0 1rem; ">
      <svg-icon icon-class="msg-gray" class="icon-class"></svg-icon>
      <span style="margin-left:.5rem; font-size:14px; font-weight:700; color:#757575;">谁@我</span>
    </div>

    <div style="padding:0 1rem; margin-bottom:2.5rem;">
      <div v-for="(item, index) in List" :key="index">
        <mu-row @click="readNotify(index)" style="margin-top:1rem; margin-bottom:1rem;">
          <mu-col span="2" align-items="center" style="">
            <mu-flex style="width:100%; height:auto; color:#fff; position:relative;" align-items="center" >
              <div :class="item.bgcolor">
                <div style="text-align:center;">
                  <svg-icon :icon-class="item.modIcon" class="icon-class"></svg-icon>
                </div>
                <div class="icon-font">{{ item.modName }}</div>
              </div>
              <div v-if="item.readStatus == 0" class="notify-point"></div>
            </mu-flex>
          </mu-col>
          <mu-col span="10" style="padding: .2rem 0 0 .5rem;" align-self="center">
            <mu-row>
              <span class="notify-title">{{ item.title }}</span> 
              <span class="notify-time">{{ item.createTime | parseUnixToDesc() }}</span>
            </mu-row>
            <mu-row style="margin-top:.2rem;">
              <span class="notify-desc span-omit">{{ item.briefDesc }}</span>
            </mu-row>
          </mu-col>
        </mu-row>
        <mu-divider></mu-divider>
      </div>

    </div>

  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  data () {
    return {
      Page: 1,
      List: []
    }
  },
  mounted () {
    this.pageInit()
  },
  methods: {
    pageInit () {
      this.getList()
    },
    getList () {
      this.$axios.get(`/notify/chatList/${this.Page}`,{}).then((resp)=>{
        let dataBack = resp.data
        console.log(dataBack)
        if(dataBack.code == 20000) {
          let list = dataBack.msg
          this.List = list.map(v => {
            switch(v.module) {
            case 1:
              v.modIcon = 'notify-game'
              v.modName = '游 戏'
              v.bgcolor = 'bg-game'
              break
            case 2:
              v.modIcon = 'notify-party'
              v.modName = '聚 会'
              v.bgcolor = 'bg-party'
              break
            case 3:
              v.modIcon = 'notify-travel'
              v.modName = '旅 游'
              v.bgcolor = 'bg-travel'
              break
            case 4:
              v.modIcon = 'notify-instant'
              v.modName = '即 时'
              v.bgcolor = 'bg-instant'
              break
            case 5:
              v.modIcon = 'notify-activity'
              v.modName = '活 动'
              v.bgcolor = 'bg-activity'
              break
            case 6:
              v.modIcon = 'notify-article'
              v.modName = '文 章'
              v.bgcolor = 'bg-article'
              break
            case 7:
              v.modIcon = 'notify-game-comment'
              v.modName = '游 戏'
              v.bgcolor = 'bg-gamecomment'
              break
            }
            return v
          })
        }
      })
    },
    readNotify (index) {
      let notifyID = this.List[index].id
      // 发送消息到后台
      this.$axios.get(`/notify/readSingleNotify/${notifyID}`, {}).then()
      this.$router.push(`/notify/commentDetail/${notifyID}`)
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

.bg-game {width:3rem; height:3rem; background:#7e57c2; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-party {width:3rem; height:3rem; background:#e040fb; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-travel {width:3rem; height:3rem; background:#4caf50; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-instant {width:3rem; height:3rem; background:#ff5722; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-activity {width:3rem; height:3rem; background:#795548; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-article {width:3rem; height:3rem; background:#29b6f6; color:#fff; padding:.5rem; border-radius:.5rem;}
.bg-gamecomment {width:3rem; height:3rem; background:#5c6bc0; color:#fff; padding:.5rem; border-radius:.5rem;}

</style>


