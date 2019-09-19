<template>
  <div style="padding:1rem;">
    <!-- <div style="padding:0 1rem; margin-bottom:2.5rem;"> -->
      <div style="padding:0 1rem; margin-bottom:2.5rem;">
        <mu-row style="margin-top:1rem; margin-bottom:1rem;">
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
              <span class="notify-desc span-omit">这里是我的描述！</span>
            </mu-row>
          </mu-col>
        </mu-row>
        <mu-divider></mu-divider>
      </div>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      Page: 1,
      List: [],
      StatusType: 0,
    }
  },
  methods: {
    load () {
      this.$axios.get(`/joinTeamList/${this.StatusType}/${this.Page}`, {}).then((resp) => {
        console.log(resp)
      })
    }
  }
}
</script>

<style scoped>

</style>