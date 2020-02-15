<template>
  <div style="background:#fff;">
    <!-- BEGIN 排序条 -->
    <van-row type="flex" class="sort-bar" justify="center" align="center" >
      <span style="margin-left:.3rem">回复列表</span>
      <span @click="convertSort" class="sort-bar-svg">
        <svg-icon :icon-class="IsSortup == true ? 'sortup' : 'sortdown'"></svg-icon>
      </span>
    </van-row>
    <!-- END 排序条 -->

    <div style="padding:.5rem; margin-bottom:1rem;">
      <van-row type="flex">
        <!-- 左边内容，头像 -->
        <van-row type="flex">
          <van-image
            round
            width="35"
            height="35"
            fit="cover"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </van-row>

        <!-- 右边内容 -->
        <van-row type="flex" style="padding:.2rem .5rem .5rem; flex-wrap:wrap;">
          <!-- 主评论的昵称和举报、评论展开按钮 -->
          <div style="display:flex; align-items:center; width:100%;">
            <span style="font-size:13px; font-weight:700; color:#009688; letter-spacing:1px;">这里是我的昵称</span>

            <span style="margin-left:auto;">
              <svg-icon icon-class="thumb_up" style="font-size:16px;"></svg-icon>
            </span>
            <div style="margin-left:.8rem; position:relative;">
              <div style="position:absolute; top:-.1rem; right:1.7rem; width:5.2rem; background:#757575; color:#fff; padding:.1rem .3rem; text-algin:center; display:flex; justify-content:center; align-items:center; border-radius:.1rem; z-index:2; ">
                <span style="font-size:11px;">举报</span>
                <span style="margin-left:.4rem; margin-right:.4rem;">|</span>
                <span style="font-size:11px;">评论</span>
                <div style="position:absolute; right:-.2rem; margin-left:auto; width:.5rem; height:.5rem; background:#757575; z-index:1; transform:rotate(45deg);"></div>
              </div>
              <svg-icon icon-class="omit"></svg-icon>
            </div>
          </div>

          <!-- 主评论的内容和图片 -->
          <div style="width:100%; margin-top:.2rem; font-size:14px; color:#424242;">
            <div>
              <span>
                其实是我的图片
                15724067414,哇哈哈，这个还行吧，每次都是这样子，该怎么办呢，你这个渣渣，我真的是人
              </span>
            </div>
            <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581233978569&di=7708dae4b77014ff0e890d6f5a010a70&imgtype=0&src=http%3A%2F%2Fi3.bbs.fd.zol-img.com.cn%2Fg5%2FM00%2F06%2F0C%2FChMkJ1m1meyIEB8pAAh0T-1HNigAAgWKwM0NiQACHRn909.jpg" style="max-height:10rem; border-radius:.3rem; margin-top:.5rem;"> -->
          </div>

          <!-- 回复列表 -->
          <div style="background:#f5f5f5; color:#616161; font-size:13px; padding:.5rem .8rem; letter-spacing: 1px; width:100%; margin-top:.5rem; margin-bottom:.5rem;">
            <div style="border-bottom:1px solid #e0e0e0; padding:0 0 .3rem 0; margin-bottom:.5rem;">
              <div style="display:flex; width:100%;">
                <span style="color:#009688;">啊真</span> 回复 <span style="color:#009688;">田鸡</span>：
                <div style="margin-left:auto; position:relative;">
                  <div style="position:absolute; top:-.1rem; right:1.7rem; width:5.2rem; background:#757575; color:#fff; padding:.1rem .3rem; text-algin:center; display:flex; justify-content:center; align-items:center; border-radius:.1rem; z-index:2; ">
                    <span style="font-size:11px;">举报</span>
                    <span style="margin-left:.4rem; margin-right:.4rem;">|</span>
                    <span style="font-size:11px;">评论</span>
                    <div style="position:absolute; right:-.2rem; margin-left:auto; width:.5rem; height:.5rem; background:#757575; z-index:1; transform:rotate(45deg);"></div>
                  </div>
                  <svg-icon icon-class="omit"></svg-icon>
                </div>
              </div>
              <div>
                <span>你这个渣渣，哇哈哈，你这个渣渣</span>
              </div>
              <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581233978569&di=7708dae4b77014ff0e890d6f5a010a70&imgtype=0&src=http%3A%2F%2Fi3.bbs.fd.zol-img.com.cn%2Fg5%2FM00%2F06%2F0C%2FChMkJ1m1meyIEB8pAAh0T-1HNigAAgWKwM0NiQACHRn909.jpg" style="max-height:4.5rem; border-radius:.3rem; margin-top:.3rem;"> -->
            </div>

            <div style="border-bottom:1px solid #e0e0e0; padding:0 0 .3rem 0; margin-bottom:.5rem;">
              <div>
                <span style="color:#009688;">啊真</span> @ <span style="color:#009688;">田鸡</span>：
              </div>
              <div>
                <span>你这个渣渣，哇哈哈，你这个渣渣</span>
              </div>
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1581233978569&di=7708dae4b77014ff0e890d6f5a010a70&imgtype=0&src=http%3A%2F%2Fi3.bbs.fd.zol-img.com.cn%2Fg5%2FM00%2F06%2F0C%2FChMkJ1m1meyIEB8pAAh0T-1HNigAAgWKwM0NiQACHRn909.jpg" style="max-height:4.5rem; border-radius:.3rem; margin-top:.3rem;">
            </div>

            <div style="display:flex; width:100%; align-items:center;">
              <span><svg-icon icon-class="expand-gray"></svg-icon></span>
              <span style="font-size:11px; color:#616161; margin-left:.5rem;">展开更多回复 </span>
            </div>
          </div>

          <!-- 发表时间 -->
          <div style="font-size:12px; margin-bottom:1rem;">
            <span style="color:#9e9e9e; letter-spacing:1px; margin-left:auto;">发表于 · 2020/02/09 13:29</span>
          </div>

        </van-row>
      </van-row>
    </div>

    <van-popup
      v-model="CmtWindow"
      position="bottom"
      :style="{ height: '11rem' }">
      <van-field 
        type="textarea" 
        clearable
        maxlength="150"
        :autosize="{maxHeight:50}"
        v-model="CmtCont" 
        placeholder="请输入用户名"/>

      <van-row></van-row>

      <van-row type="flex" style="position:relative; padding:.5rem;">

        <van-uploader :after-read="afterRead" style=""/>

        <van-row style=" padding: .2rem 1.5rem 0 .5rem;">
          <span style="margin-right:.5rem; color:#9e9e9e; font-weight:700;">@Ae</span>
          <span style="margin-right:.5rem; color:#9e9e9e; font-weight:700;">@我是你的傻逼</span>
          <span style="margin-right:.5rem; color:#9e9e9e; font-weight:700;">@我挺生气的</span>
        </van-row>

        <van-row type="flex" align="bottom" style="position:absolute; right:1rem; bottom:1rem;">
          <span style="font-size:22px; font-weight:800; color:#66CCCC; margin-right:1rem;">@</span>
          <van-button type="primary" size="small" >发送</van-button>
        </van-row>
        
      </van-row>
    </van-popup>




    <div class="gb-zindex-1" style="position:fixed; top:0; left:0; width:100%; height:100%; margin-bottom:0;">
      <FriendList/>
    </div>



  </div>
</template>

<script>
import { Col, Row, Image, Popup, Field, Uploader, Button, IndexBar, IndexAnchor, Cell } from 'vant'
import FriendList from '@/views/usr/friendList.vue'

export default {
  components: {
    [Col.name]: Col,
    [Row.name]: Row,
    [Image.name]: Image,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [IndexBar.name]: IndexBar,
    [IndexAnchor.name]: IndexAnchor,
    [Cell.name]: Cell,
    FriendList: FriendList
  },
  name: 'chat-list',
  
  data () {
    return {
      CmtWindow: true,
      CmtCont: '士大夫顺德法撒旦法撒旦法撒旦法撒旦法撒旦法撒旦法撒旦法撒旦法撒旦法撒旦啊发射点发十大法撒旦法撒旦发送的',

      Loading: false,
      IsSortup: false,
      IsTheLast: true,
      ChatList: [],
      Page: 1,
      TeamType: 1,
      TeamID: 5,
    }
  },

  // props: [
  //   'TeamType',
  //   'TeamID'
  // ],
  mounted () {
    this.load()
  },
  methods: {
    afterRead () {

    },

    load () {
      this.Loading = true      
      let sortWay = this.IsSortup == false ? 0 : 1
      this.$axios.get(`/common/chatList/${this.TeamType}/${this.TeamID}/${this.Page}/${sortWay}`,{}).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }

        let dataBack = resp.data.msg
        this.IsTheLast = dataBack.length < 15 ? true : false

        this.ChatList = this.ChatList.concat(dataBack)
        this.Page++
        this.Loading = false
      })
    },

    convertSort () {
      // 当转换排序顺序的时候，把页数重置，然后，重新加载回复评论
      this.Page = 1
      this.ChatList = []
      this.IsSortup = !this.IsSortup
      this.load()
    },

    newChat (replyTo, chatID, replyNickname) {
      this.$parent.newChat(true, replyTo, chatID, replyNickname)
    },

  }
}
</script>

<style scoped>

.sort-bar { background:#f5f5f5; border-top:1px solid #fff; font-size:12px; padding:.4rem .5rem; margin-bottom:.5rem; }
.sort-bar-svg { margin-left:auto; font-size:18px; margin-right:.3rem; }

.chat-container { padding:.5rem .5rem; background:#fff;}
.avatar-male { border-radius:50%; }
.avatar-female { padding:.1rem; border:1px solid #e91e63; border-radius:50%; background:white; }
.nickname { font-size:14px; margin-left:.5rem; margin-right:.5rem; color:#424242; letter-spacing: 1px; }

.reply-row { font-size:14px; padding:.2rem 1rem 0 2rem; color:#424242; }
.reply-span { margin-left:.5rem; letter-spacing: 1px; }

.img-row { padding:.5rem .5rem .5rem 2.3rem; font-size:12px; color:#616161; }
.img-self { max-width:100%; max-height:10rem; border-radius:.3rem; }

.create-time { padding: .5rem 0 0 2.5rem; font-size:13px; margin-bottom:1rem; }
.reply-button { color:green; margin-left:.3rem; }

.reply-origin-row { background:#f5f5f5; color:#616161; font-size:13px; padding:.5rem; margin-right:1.5rem; margin-left:2.2rem; letter-spacing: 1px; margin-bottom:1rem; }

.no-more-reply { padding:.5rem .5rem .3rem .5rem; margin-top:.3rem; margin-bottom:3rem; color:#9e9e9e; }

</style>

