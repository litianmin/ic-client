<template>
    <mu-load-more :loading="loading" @load="load">
      <mu-list>
        <template v-for="i in num">
          <mu-list-item>
            <mu-list-item-title>{{text}} Item {{i}}</mu-list-item-title>
          </mu-list-item>
          <mu-divider />
        </template>
      </mu-list>
    </mu-load-more>
</template>
    


<script>
export default {
  data () {
    return {
      num: 30,
      refreshing: false,
      loading: false,
      text: 'List'
    }
  },
  methods: {
    load () {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.num += 10;
      }, 2000)
    }
  }
};
</script>

<style>
.demo-loadmore-wrap {
  width: 100%;
  max-width: 360px;
  height: 420px;
  display: flex;
  flex-direction: column;
}
.mu-appbar {
width: 100%;
}
.demo-loadmore-content {
  flex: 1;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>