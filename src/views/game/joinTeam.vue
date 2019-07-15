<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#009688">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div style="font-size:14px;">
        角色信息填写
      </div>

      <mu-flex slot="right" class="import-log" align-items="center">
        <span>导入记录</span> <mu-icon value="launch" size="18"></mu-icon>
      </mu-flex>

    </mu-appbar>
    <!-- END 头部 -->
    

    <!-- BEGIN 填写内容 -->
    <mu-container style="padding:.5rem; margin-top:1rem;">

      <!-- 角色 -->
      <mu-row>
        <mu-flex class="mu-flex-one" align-items="center" justify-content="center">
          <span>职 业</span>
        </mu-flex>
        <mu-flex class="mu-flex-two">
          <input v-model="Role" type="text" placeholder="职业，例如：刺客" maxlength="15">
        </mu-flex>
      </mu-row>

      <!-- 昵称 -->
      <mu-row style="margin-top:.5rem;">
        <mu-flex class="mu-flex-one" align-items="center" justify-content="center">
          <span>昵 称</span>
        </mu-flex>
        <mu-flex class="mu-flex-two">
          <input v-model="RoleName" type="text" placeholder="游戏中的昵称" maxlength="15">
        </mu-flex>
      </mu-row>

      <!-- 等级/段位 -->
      <mu-row style="margin-top:.5rem;">
        <mu-flex class="mu-flex-one" align-items="center" justify-content="center">
          <span>等级/段位</span>
        </mu-flex>
        <mu-flex class="mu-flex-two">
          <input v-model="RoleRank" type="text" placeholder="游戏角色的等级或者段位" maxlength="15">
        </mu-flex>
      </mu-row>

      <!-- 特性 -->
      <mu-row style="margin-top:.5rem;">
        <mu-flex class="mu-flex-one" align-items="center" justify-content="center">
          <span>自身特性</span>
        </mu-flex>
        <mu-flex class="mu-flex-two">
          <input v-model="SelfCharacter" type="text" placeholder="例如：大神/菜鸟" maxlength="15">
        </mu-flex>
      </mu-row>

      <!-- 上传招募图片 -->
      <mu-row class="img-upload-row">
        <mu-flex class="img-upload-flex" justify-content="center" align-items="center">
          <span @click="addImg" v-show="!DisplayImg" style="color:#4caf50;">点击上传角色图片</span>
          <mu-icon v-show="DisplayImg" @click="delImg" value="cancel" color="#e91e63" class="img-upload-icon"></mu-icon>
          <img class="img-upload-img" :src="DisplayImg" />
        </mu-flex>
        <input @change="getDisplayImg" ref="imgUpload" type="file" style="display:none;" accept="image/*"/>
      </mu-row>

    </mu-container>
    <!-- END 填写内容 -->

    <mu-flex class="mu-flex-four" justify-content="center">
      <mu-button style="width:95%;" color="#42a5f5" @click="submit">
        申请加入
      </mu-button>
    </mu-flex>

  </div>
</template>

<script>
export default {
  data () {
    return {
      TeamID: 0,
      Role: '',
      RoleName: '',
      RoleRank: '',
      SelfCharacter: '',
      DisplayImg: ''
    }
  },
  mounted () {
    this.teamID = this.$route.params.teamid
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    delImg () {
      this.DisplayImg = ''
    },
    addImg () {
      this.$refs.imgUpload.click()
    },
    getDisplayImg () {  // 获取评论图片
      var _this = this
      var event = event || window.event
      var file = event.target.files[0]

      // 先判断file的大小
      if(file.size > 1024 * 1024 * 2) {
        this.$toast.message('图片上传最大为2M！')
        return
      }

      var reader = new FileReader()
      //转base64
      reader.onload = function(e) {
        _this.DisplayImg = e.target.result
      }
      reader.readAsDataURL(file)
    },
    submit () { // 提交数据

      // let mytest = " 这是我的字符串 "

      let role = this.Role.trim()
      let roleName = this.RoleName.trim()
      let roleRank = this.RoleRank.trim()
      let selfCharacter = this.SelfCharacter.trim()

      if(role.length == 0) {
        this.$toast.message('职业不能为空')
        return
      }
      if(roleName.length == 0) {
        this.$toast.message('角色昵称不能为空')
        return
      }
      if(roleRank.length == 0) {
        this.$toast.message('等级/段位不能为空')
        return
      }
      if(selfCharacter.length == 0) {
        selfCharacter = '无'
      }

      this.$axios.post('/game/joinTeam',{
        t_id: Number(this.teamID),
        role: role,
        role_name: roleName,
        role_rank: roleRank,
        self_character: selfCharacter,
        display_img: this.DisplayImg
      }).then((resp)=>{ // 0=>申请，1=>拒绝加入，2=>已加入，3=>离队, 4=>被踢, 5=>队伍过期
        console.log(resp)
        this.$toast.message(resp.data.msg)

        if(resp.data.code == 20000) {
          this.$router.go(-1)
        }
        
      })
    },
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }

.mu-flex-one { width:25%; height:2rem; background:#00bcd4; color:#fff; font-size:12px; border-top-left-radius:.3rem;  border-bottom-left-radius:.3rem; }
.mu-flex-two { width:75%; height:2rem; background:yellow; font-size:12px; }
.mu-flex-two input { width:100%; height:100%; padding: 0 0 0 .5rem; }
.mu-flex-four { position:fixed; width:100%; bottom:0; left:0; padding:0 .1rem; background:#eeeeee; padding:.5rem .1rem; z-index:999 }

.import-log { font-size:12px; color:#fff; margin-right:1rem; }

.img-upload-row { margin-top:1.5rem; margin-bottom:3rem; }
.img-upload-flex { position:relative; width:100%; height:13rem; background:#eeeeee; border-radius:.5rem; }
.img-upload-icon { position:absolute; top:0; right:0; }
.img-upload-img { max-width:100%; max-height:12rem; border-radius:.3rem; }
</style>


