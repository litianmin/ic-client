<template>
  <div>
    <div class="singer">
      <list-view :ListInfo="singers" ref="list"></list-view>
    </div>
  </div>
</template>

<script>
import ListView from '@/components/Listview.vue'
export default {
  
  data () {
    return {
      singers: [
        {
          title: 'A',
          items: [
            {
              name: 'ceshi',
              avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg',
            },

            {
              name: '这里是我的名称',
              avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg',
            }

          ]
        },

        {
          title: 'B',
          items: [
            {
              name: 'ceshi',
              avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg',
            },

            {
              name: '这里是我的名称',
              avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg',
            }

          ]
        },

        {
          title: 'C',
          items: [
            {
              name: 'ceshi',
              avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg',
            },

            {
              name: '这里是我的名称',
              avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg',
            }

          ]
        },

        {
          title: 'D',
          items: [
            {
              name: 'ceshi',
              avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg',
            },

            {
              name: '这里是我的名称',
              avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg',
            }

          ]
        },

        {
          title: 'E',
          items: [
            {
              name: 'ceshi',
              avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg',
            },

            {
              name: '这里是我的名称',
              avatar: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1548509200,3423898172&fm=26&gp=0.jpg',
            }

          ]
        },

      ]
    }
  },
  components: {
      ListView
    }
}
</script>


<style scoped lang="stylus">
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>