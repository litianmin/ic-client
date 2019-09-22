<template>
  <div>
    <div style="padding:1rem 0 .3rem 1rem; ">
      <svg-icon icon-class="article-gray" class="icon-class"></svg-icon>
      <span style="margin-left:.5rem; font-size:14px; font-weight:700; color:#757575;">美文·话题</span>
    </div>

    <mu-load-more :loading="Loading" @load="load" :loaded-all="IsTheLast">  
      <div style="padding:.5rem 1rem; ">
        <mu-flex 
          v-for="(item, index) in List"
          :key="index"
          wrap="wrap"
          style="width:100%; padding:.6rem; border:1px solid #e0e0e0; border-radius:.3rem; margin-top:.5rem; margin-bottom:1.5rem;">
          <mu-flex style="width:100%;" wrap="wrap">
            <span class="span-omit">{{ item.title }}</span>
          </mu-flex>

          <mu-flex style="width:100%; margin-top:.8rem;">
            <span style="font-size:12px; color:#9e9e9e;">收藏于 {{ item.collectTime | formatTime('{y}/{m}/{d} {h}:{i}') }}</span>
            <mu-flex 
              @click="cancleCollect(index)"
              style="margin-left:auto; margin-right:.5rem;">
              <svg-icon icon-class="had_focus" style="font-size:15px;"></svg-icon>
            </mu-flex>
          </mu-flex>
        </mu-flex>
      </div>
      <mu-row v-show="IsTheLast" justify-content="center" style="padding:.5rem .5rem .3rem .5rem; margin-top:.5rem; margin-bottom:.5rem; color:#9e9e9e;">
        <span style="">没有更多的内容</span>
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
    }
  },
  mounted () {
    this.load()
  },
  methods: {
    load () {
      this.Loading = true
      this.$axios.get(`/user/articleCollection/${this.Page}`, {}).then((resp)=>{
        if(resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }

        let dataBack = resp.data.msg
        this.IsTheLast = dataBack.length < 10 ? true : false

        this.List = this.List.concat(dataBack)
        this.Page++
        this.Loading = false
      })
    },
    cancleCollect (index) {
      this.$axios.post('/common/collect', {
        type: 1,
        id: this.List[index].articleID,
        operate: 0,
      }).then((resp) => {
        if (resp.data.code != 20000) {
          this.$toast.message(resp.data.msg)
          return
        }
        this.List.splice(index, 1)
      })
    }
  }
}
</script>

<style scoped>
.icon-class {font-size:16px;}

.span-omit{
  width:100%;
  overflow:hidden;
  text-overflow:ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>