<template>
  
</template>

<script>
export default {
  mounted () {

  },
  methods: {
    wxLogin () {
      // 获取当前的url
      let urlPath = window.location.pathname
      urlPath = encodeURI(urlPath)
      let redirectURL = '/usr/wxAuth/'+urlPath
      this.$axios.get(redirectURL, {}).then((resp)=>{
        console.log(resp)
      })
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>


