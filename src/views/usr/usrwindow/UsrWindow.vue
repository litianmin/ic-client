<template>
  <mu-container>
    <mu-drawer :open.sync="open" :docked="docked" :right="position === 'right'">
      <div>
          <mu-card style="width: 100%; max-width: 375px; margin: 0 auto; ">
            <mu-card-media title="Everything that happens in life has its own meaning!" sub-title="--litianmin">
              <img src="http://pic1.16pic.com/00/07/65/16pic_765645_b.jpg">
            </mu-card-media>

            <mu-card-header @click="linkToLogin" title="未登陆" sub-title="点击登陆、注册" style="padding: 1.7rem 0.5rem 0rem 0.5rem">
              <mu-avatar slot="avatar">
                <img src="http://pic1.16pic.com/00/07/65/16pic_765645_b.jpg">
              </mu-avatar>
            </mu-card-header>

            <mu-list>
              <mu-list-item button :ripple="false">
                <mu-list-item-action>
                  <mu-icon value="mail" color="blue"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>消息</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button :ripple="false">
                <mu-list-item-action>
                  <mu-icon value="group" color="blue"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>我的组队</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button :ripple="false">
                <mu-list-item-action>
                  <mu-icon value="favorite_border" color="blue"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>我的关注</mu-list-item-title>
              </mu-list-item>
              <mu-list-item button :ripple="false">
                <mu-list-item-action>
                  <mu-icon value="account_circle" color="blue"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>好友列表</mu-list-item-title>
              </mu-list-item>
              
              <mu-list-item button :ripple="false">
                <mu-list-item-action>
                  <mu-icon value="hearing" color="blue"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>趣事</mu-list-item-title>
              </mu-list-item>

              <mu-list-item button :ripple="false">
                <mu-list-item-action>
                  <mu-icon value="fingerprint" color="blue"></mu-icon>
                </mu-list-item-action>
                <mu-list-item-title>个人资料</mu-list-item-title>
              </mu-list-item>

            </mu-list>

          </mu-card>

      </div>
      <!-- <mu-list>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 1</mu-list-item-title>
        </mu-list-item>
        <mu-list-item button>
          <mu-list-item-title>Menu Item 2</mu-list-item-title>
        </mu-list-item>
        <mu-list-item  @click="open = false" button>
          <mu-list-item-title>Close</mu-list-item-title>
        </mu-list-item>
      </mu-list> -->
    </mu-drawer>
  </mu-container>
</template>

<script>
export default {
  data () {
    return {
      docked: false,
      open: false,
      position: 'left'
    }
  },
  methods: {
    linkToLogin () {
      this.$router.push('/usr/login')
    }
  },
  computed: {
    usrWindowToggle () {
      return this.$store.state.usrWindowIsShow
    }
  },
  watch: {
    usrWindowToggle () {
      return this.open = !this.open
    }
  }
}
</script>

<style lang="stylus" scoped>
.window-pic
  float left
  width 100%
  padding 30%
  background url('http://pic1.16pic.com/00/07/65/16pic_765645_b.jpg')
  background-size 100% 100%
  border-bottom-right-radius 0.3rem
.words-desc
  font-size 15px
  float left
  padding 1rem 1rem 0rem 1rem
.author
  width 100%
  text-align right
  padding 0.2rem 1.5rem 0.5rem 0rem
  border-bottom 1px solid gray

.mu-card
  background-color #fff
  position relative
  border-radius 2px
  box-shadow 0px 0px 0px #888888 

.mu-card-media-title
  position absolute
  left 0
  right 0
  bottom 0
  padding 0.3rem 0.3rem 0.2rem 0.5rem 
  background-color rgba(0,0,0,.54)
  .mu-card-title
      font-size 12px
      color hsla(0,0%,100%,.87)
      line-height 16px
      font-style italic
  .mu-card-sub-title
    text-align right
    color smokewhite
    font-size 10px
    padding 0rem 0.5rem
    font-style italic

</style>


