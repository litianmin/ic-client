<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#00bcd4">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div style="font-size:14px;">
        聚会party
      </div>


      <mu-flex align-items="center" slot="right">
        <span>佛山</span>
        <mu-icon value="person_pin_circle" size="18"></mu-icon>
      </mu-flex>

    </mu-appbar>
    <!-- END 头部 -->

    <div>
      <mu-container style="margin-top:1rem; margin-bottom:2rem;">
        <mu-row justify-content="center">
          <mu-col span="12">
            <div style="width:100%; background:#f5f5f5; border-radius:1rem; padding:0.1rem 0.1rem;">

              <mu-row style="background:white; padding:0.5rem; border-top-left-radius:0.5rem; border-top-right-radius:0.5rem; padding:1rem .5rem .5rem 1rem;">
                <mu-col span="2">
                  <mu-avatar :size="34" class="avatar-distance">
                    <img src="http://img4.imgtn.bdimg.com/it/u=3868410791,3959511573&fm=26&gp=0.jpg">
                  </mu-avatar>
                </mu-col>
                <mu-col span="7" style="">
                  <mu-row>Ae</mu-row>
                  <mu-row style="font-size:5px; color:#651fff;">社交达人</mu-row>
                </mu-col>
                <mu-col span="3" style="padding:0.4rem; color:#00b0ff;">
                  查看详情
                </mu-col>
              </mu-row>

              <mu-row>
                <!-- http://img2.imgtn.bdimg.com/it/u=3967207443,110383055&fm=26&gp=0.jpg -->
                <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
                  <mu-card-media title="巴黎阿萨塔" sub-title="">
                    <img src="http://img0.imgtn.bdimg.com/it/u=208836676,259468604&fm=26&gp=0.jpg">
                    <mu-flex style="position:absolute; right:1rem; bottom:0.5rem; z-index:9999; color:#FFFFFF">
                      <mu-button slot="action" icon>
                        <mu-icon value="star_border"></mu-icon>
                      </mu-button>
                    </mu-flex>
                  </mu-card-media>
                  <mu-card-title title="巴黎阿萨塔" sub-title="真的很不错的"></mu-card-title>
                  <mu-card-text>
                    散落在指尖的阳光，我试着轻轻抓住光影的踪迹，它却在眉宇间投下一片淡淡的阴影。
                    调皮的阳光掀动了四月的心帘，温暖如约的歌声渐起。
                    似乎在诉说着，我也可以在漆黑的角落里，找到阴影背后的阳光，
                    找到阳光与阴影奏出和谐的旋律。我要用一颗敏感赤诚的心迎接每一缕滑过指尖的阳光！
                  </mu-card-text>
                  <mu-card-actions>
                    <mu-button flat>Action 1</mu-button>
                    <mu-button flat>Action 2</mu-button>
                  </mu-card-actions>
                </mu-card>
              </mu-row>

            </div>
          </mu-col>
        </mu-row>
      </mu-container>
    </div>
    

    <div>
      <mu-container style="margin-top:1rem; margin-bottom:2rem;">
        <mu-row justify-content="center">
          <mu-col span="12">
            <div style="width:100%; background:#f5f5f5; border-radius:1rem; padding:0.1rem 0.1rem;">

              <mu-row style="background:white; padding:0.5rem; border-top-left-radius:0.5rem; border-top-right-radius:0.5rem; padding:1rem .5rem .5rem 1rem;">
                <mu-col span="2">
                  <mu-avatar :size="34" class="avatar-distance">
                    <img src="http://img4.imgtn.bdimg.com/it/u=3868410791,3959511573&fm=26&gp=0.jpg">
                  </mu-avatar>
                </mu-col>
                <mu-col span="7" style="">
                  <mu-row>Ae</mu-row>
                  <mu-row style="font-size:5px; color:#651fff;">社交达人</mu-row>
                </mu-col>
                <mu-col span="3" style="padding:0.4rem; color:#00b0ff;">
                  查看详情
                </mu-col>
              </mu-row>

              <mu-row>
                <!-- http://img2.imgtn.bdimg.com/it/u=3967207443,110383055&fm=26&gp=0.jpg -->
                <mu-card style="width: 100%; max-width: 375px; margin: 0 auto;">
                  <mu-card-media title="萨隆广场" sub-title="">
                    <img src="http://img0.imgtn.bdimg.com/it/u=208836676,259468604&fm=26&gp=0.jpg">
                    <mu-flex style="position:absolute; right:1rem; bottom:0.5rem; z-index:9999; color:#FFFFFF">
                      <mu-button slot="action" icon>
                        <mu-icon value="star_border"></mu-icon>
                      </mu-button>
                    </mu-flex>
                  </mu-card-media>
                  <mu-card-title title="音乐派对" sub-title="真的很不错的"></mu-card-title>
                  <mu-card-text>
                   主    题：聚餐、玩游戏<br/>
                   地    点：沉浮广场<br/>
                   时间段：2019-07-01 05:30  至 2019-08-02 06:20<br/>
                   <!-- 活动内容： 一起来玩狼人杀啦，好不好<br/> -->
                   招募人数： 60人<br/>
                   队友偏爱：老油条，这个还是自己来定义吧<br/>
                  </mu-card-text>
                  <mu-card-actions>
                    <mu-button flat>Action 1</mu-button>
                    <mu-button flat>Action 2</mu-button>
                  </mu-card-actions>
                </mu-card>
              </mu-row>

            </div>
          </mu-col>
        </mu-row>
      </mu-container>
    </div>


  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
  }
}
</script>

<style scoped>
.mine-appbar { width: 100%; height:2.5rem; }
</style>


