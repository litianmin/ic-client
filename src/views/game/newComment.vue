<template>
  <div style="position:fixed; top:0; left:0; width:100%; height:100%; background:#f5f5f5;">
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#009688">
        <mu-button icon slot="left">
          <mu-icon value="navigate_before"></mu-icon>
        </mu-button>
        
        <div style="font-size:14px;">
          创建评论
        </div>
    </mu-appbar>
    <!-- END 头部 -->


    <!-- 评论内容最多200个字符，最多一张图片 -->
    <div style="background:#fff;">
      <mu-container style="width:100%; height:100%; border-radius:.5rem; margin-top:1rem;">
        <mu-text-field v-model="c_cont" multi-line :rows="7" :rows-max="10" full-width :max-length="200" underline-color="rgba(139, 69, 19, .2)" placeholder="评论：" style="font-size:14px;">
        </mu-text-field>
      </mu-container>
    </div>

    <mu-flex style="background:#eeeeee; padding:.8rem .5rem" align-items="center">
      <mu-icon value="wallpaper" @click="addImg()"></mu-icon>
      <mu-button small color="#00bcd4" style="margin-left:auto;">发表</mu-button>
    </mu-flex>
    <mu-divider></mu-divider>

    <div style="padding:1rem;">
      <img style="max-width:50%; max-height:10rem; border-radius:.3rem;" src="http://f.hiphotos.baidu.com/zhidao/pic/item/023b5bb5c9ea15ce330c869db6003af33b87b247.jpg" alt="">
    </div>


  </div>
</template>

<script>
export default {
  data () {
    return {
      c_cont: ''
    }
  },
  methods: {
    addImg () {
      this.$toast.message('这是我的内容噢')
    }
  }
}
</script>

<style scoped>

.mine-appbar { width: 100%; height:2.5rem; }

</style>

