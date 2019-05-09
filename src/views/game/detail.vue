<template>
  <div>
    <!-- BEGIN 头部 -->
    <mu-appbar class="mine-appbar" color="#009688">
      <mu-button icon slot="left" @click="goBack">
        <mu-icon value="navigate_before"></mu-icon>
      </mu-button>
      
      <div style="font-size:14px;">
        {{ gameName }}
      </div>
    </mu-appbar>
    <!-- END 头部 -->
 
    <!-- BEGIN 轮播图 -->
    <!-- swiper1 -->
    <div v-if="isRender">
      <swiper :options="swiperOptionTop" class="gallery-top" ref="swiperTop">
        <swiper-slide v-for="(item, index) in displayImgList" :key="index">
          <img class="swiper-img" :src="item" alt="">
        </swiper-slide>
      </swiper>
      <!-- swiper2 Thumbs -->
      <swiper :options="swiperOptionThumbs" class="gallery-thumbs" ref="swiperThumbs">
        <swiper-slide v-for="(item, index) in displayImgList" :key="index">
          <img class="swiper-img" :src="item" alt="">
        </swiper-slide>
      </swiper>
    </div>
    <!-- END 轮播图 -->

    <!-- BEGIN 游戏简介 -->
    <mu-row class="game-brief-desc">
      <mu-col span="12">
        <div>
          <span style="color:#795548; font-size:13px;">简介：</span> 
          <span style="color:#9e9e9e; font-size:12px;">{{ gameBriefDesc }}</span>
        </div> 
      </mu-col>
    </mu-row>
    <!-- END 游戏简介 -->

    <!-- BEGIN 游戏标签 -->
    <mu-flex class="game-badge" align-items="end">
      <mu-badge content="端游" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
      <mu-badge content="角色扮演" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
      <mu-badge content="格斗" color="#00bcd4" style="margin-right:.5rem;"></mu-badge>
    </mu-flex>
    <!-- END 游戏标签 -->

    <!-- BEGIN 评论/组队内容 -->
    <div style="margin-top:1rem;">
      <mu-divider></mu-divider>

      <!-- 内容切换条 -->
      <mu-tabs :value.sync="active" inverse color="#80cbc4" indicator-color="#80cbc4" text-color="rgba(0, 0, 0, .54)"  full-width id="tabBar">
        <mu-tab><span>评 论</span></mu-tab>
        <mu-tab><span>组 队</span></mu-tab>
      </mu-tabs>

      <!-- BEGIN 评论 -->
      <mu-container v-show="active === 0" class="comment-box">

        <mu-row justify-content="center" style="margin-top:.3rem; margin-bottom:1rem;">
          <!-- 创建队伍按钮 -->
          <mu-button class="comment-create-btn" @click="newComment()">
            评论一下&nbsp; <mu-icon value="border_color" size="14"></mu-icon>
          </mu-button>
        </mu-row>

        <mu-load-more :loading="commentLoading" @load="commentLoad" :loaded-all="commentIsTheLast">
          <!-- BEGIN 评论样式一 -->
          <!-- <div style="margin-top:2rem;">
            <mu-flex align-items="center">
              <mu-avatar size="28">
                <img src="http://img4.imgtn.bdimg.com/it/u=406799163,4023058385&fm=11&gp=0.jpg">
              </mu-avatar>
              <span style="margin-left:.5rem; font-size:14px; color:#4db6ac;">
                小鸟依人哦 
              </span>
              <span style="margin-left: auto; font-size:12px; color:#9e9e9e;">2018-01-02 01:02:03</span>
            </mu-flex>
            <mu-row style="padding:.5rem 0 0 2rem; font-size:12px; color:#616161;">
              其实啊，我真的不想那样做，但是我不那样做的话，我又会出现这样那样的问题，为什么呢，因为我也不想的啊
            </mu-row>

            <mu-row justify-content="end" style="padding:.5rem;">
                <mu-flex align-items="center">
                  <mu-icon value="thumb_up" size="12" color="#4db6ac"></mu-icon><span style="font-size:12px; margin-left:.2rem; color:#9e9e9e;">1000</span>
                </mu-flex>

                <mu-flex align-items="center" style="margin-left:.8rem;">
                  <mu-icon value="comment" size="12" color="#4db6ac"></mu-icon><span style="font-size:12px; margin-left:.2rem; color:#9e9e9e;">2000</span>
                </mu-flex>
            </mu-row>

            <mu-divider></mu-divider>
          </div> -->
          <!-- END 评论样式一 -->

          <!-- BEGIN 评论样式二 -->
          <!-- <div style="margin-top:2rem;">
            <mu-flex align-items="center">
              <mu-avatar size="28">
                <img src="http://img4.imgtn.bdimg.com/it/u=406799163,4023058385&fm=11&gp=0.jpg">
              </mu-avatar>
              <span style="margin-left:.5rem; font-size:14px; color:#4db6ac;">
                瓦卡萨拉 
              </span>
              <span style="margin-left: auto; font-size:12px; color:#9e9e9e;">2018-01-02 01:02:03</span>
            </mu-flex>

            <mu-row style="padding:.5rem 0 0 2rem; font-size:12px; color:#616161;">
              其实啊，我真的不想那样做，但是我不那样做的话，我又会出现这样那样的问题，为什么呢，因为我也不想的啊
            </mu-row>

            <mu-row justify-content="end" style="padding:.5rem;">
                <mu-flex align-items="center">
                  <mu-icon value="thumb_up" size="12" color="#4db6ac"></mu-icon><span style="font-size:12px; margin-left:.2rem; color:#9e9e9e;">1000</span>
                </mu-flex>

                <mu-flex align-items="center" style="margin-left:.8rem;">
                  <mu-icon value="comment" size="12" color="#4db6ac"></mu-icon><span style="font-size:12px; margin-left:.2rem; color:#9e9e9e;">2000</span>
                </mu-flex>
            </mu-row>

            <mu-divider></mu-divider>
          </div> -->
          <!-- END 评论样式二 -->

          <!-- BEGIN 评论样式三 -->
          <!-- <div style="margin-top:2rem;">
            <mu-flex align-items="center">
              <mu-avatar size="28">
                <img src="http://img4.imgtn.bdimg.com/it/u=406799163,4023058385&fm=11&gp=0.jpg">
              </mu-avatar>
              <span class="comment-item-nickname">
                瓦卡萨拉 
              </span>
              <span class="comment-item-time">2018-01-02 01:02:03</span>
            </mu-flex>

            <mu-row class="comment-item-text">
              我先来一个评论，然后出现这样那样的问题！
            </mu-row>

            <mu-row class="comment-item-img">
              <img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3758273131,3198344184&fm=27&gp=0.jpg" alt="">
            </mu-row>

            <mu-row justify-content="end" style="padding:.5rem;">
                <mu-flex align-items="center">
                  <mu-icon value="thumb_up" size="12" color="#4db6ac"></mu-icon>
                  <span class="comment-item-thumbup-count">1000</span>
                </mu-flex>

                <mu-flex align-items="center" style="margin-left:.8rem;">
                  <mu-icon value="comment" size="12" color="#4db6ac"></mu-icon>
                  <span class="comment-item-comment-count">2000</span>
                </mu-flex>
            </mu-row>

            <mu-divider></mu-divider>
          </div> -->
          <!-- END 评论样式三 -->


          
          <!-- BEGIN 评论样式 -->
          <div style="margin-top:1rem;" v-for="(item, index) in commentList" :key="index" @click="linkToCommentDetail(item.c_id)">
            <mu-flex align-items="center">
              <mu-avatar size="28">
                <img :src="item.u_avatar">
              </mu-avatar>
              <span class="comment-item-nickname">
                {{ item.u_nickname }} 
              </span>
              <span class="comment-item-time">{{ item.c_create_time }}</span>
            </mu-flex>

            <mu-row v-if="item.c_cont" class="comment-item-text">
              {{ item.c_cont }}
            </mu-row>

            <mu-row class="comment-item-img" v-if="item.c_img">
              <img :src="item.c_img" alt="">
            </mu-row>

            <mu-row justify-content="end" style="padding:.5rem;">
                <mu-flex align-items="center">
                  <mu-icon value="thumb_up" size="12" color="#4db6ac"></mu-icon>
                  <span class="comment-item-thumbup-count">{{ item.c_likenumb }}</span>
                </mu-flex>

                <mu-flex align-items="center" style="margin-left:.8rem;">
                  <mu-icon value="comment" size="12" color="#4db6ac"></mu-icon>
                  <span class="comment-item-comment-count">{{ item.c_replynumb }}</span>
                </mu-flex>
            </mu-row>

            <mu-divider></mu-divider>
          </div>
          <!-- END 评论样式 -->


          <mu-row v-show="commentIsTheLast" justify-content="center" style="padding:.5rem; margin-top:.5rem;">
            <span style="">没有更多的内容</span>
          </mu-row>
        </mu-load-more>
      </mu-container>
      <!-- END 评论 -->

      <!-- BEGIN 组队 -->
      <mu-container v-show="active === 1" class="team-box">

          <mu-row justify-content="center" style="margin-top:.3rem; margin-bottom:1rem;">
            <!-- 创建队伍按钮 -->
            <mu-button class="team-create-btn" @click="formTeam">
              创建队伍<mu-icon value="add" size="18"></mu-icon>
            </mu-button>
          </mu-row>

          <!-- BEGIN 组队样式一 -->
          <mu-expansion-panel style="margin-bottom:1rem; border-radius:.5rem;">
            <div slot="header" style="padding:1rem 0;">
            
              <!-- BEGIN 队长基本信息 -->
              <mu-flex align-items="center" style="width:100%;">
                <mu-avatar size="28">
                  <img src="http://img4.imgtn.bdimg.com/it/u=406799163,4023058385&fm=11&gp=0.jpg" />
                </mu-avatar>
                <span style="margin-left:.5rem; font-size:14px; color:#4db6ac;">Ae</span>

                <div style="margin-left: auto; font-size:12px; color:#9e9e9e;">2小时前</div>
              </mu-flex>
              <!-- END -->


              <div style="width:100%; height:auto; text-align:center; border-radius:.5rem; margin-top:.5rem;">
                <img style="max-width:100%; max-height:15rem; border-radius:.5rem;" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1752411726,1766304763&fm=27&gp=0.jpg" />
              </div>

              <mu-row style="margin-top:.5rem;" gutter>
                <!-- <mu-flex justify-content="around">
                  <div style="width:100%; font-size:12px;">角色：亦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
                  <div style="width:100%; font-size:12px;">区服：暗杀6区</div>
                  <div style="width:100%; font-size:12px;">等级/段位：66级</div>
                </mu-flex> -->
                <mu-col col="5">
                  <div style="font-size:12px;">角色：洛奇英雄传</div>
                </mu-col>

                <mu-col col="6">
                  <div style="font-size:12px;">区服：暗杀6区</div>
                </mu-col>
              </mu-row>

              <mu-row style="margin-top:.5rem;" gutter>
                <mu-col col="5">
                  <div style="font-size:12px;">等级/段位：66</div>
                </mu-col>

                <mu-col col="6">
                  <div style="font-size:12px;">招募人数：77</div>
                </mu-col>
              </mu-row>

              <mu-row style="margin-top:.5rem;" gutter>
                <mu-col col="12" style="font-size:12px;">
                  队友偏向：男性/老油条/妹子
                </mu-col>
              </mu-row>

              <mu-row style="margin-top:.5rem;" gutter>
                <mu-col col="12" style="font-size:12px;">
                  招募宣言：来几个好基友一起玩了
                </mu-col>
              </mu-row>

            </div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </mu-expansion-panel>
          <!-- END 组队样式一 -->

          <!-- BEGIN 组队样式二 -->
          <mu-expansion-panel style="margin-bottom:1rem; border-radius:.5rem;">
            <div slot="header" style="padding:.5rem 0 1rem 0;">
            
              <mu-row style="margin-top:.5rem;" gutter>

                <mu-col col="6" style="padding:.5rem 0 0 .5rem;">

                  <mu-flex align-items="center" style="width:100%;">
                    <mu-avatar size="25">
                      <img src="http://img4.imgtn.bdimg.com/it/u=406799163,4023058385&fm=11&gp=0.jpg" />
                    </mu-avatar>
                    <span style="margin-left:.5rem; font-size:14px;">Ae</span>
                  </mu-flex>

                  <div style="font-size:12px; margin-bottom:.2rem; margin-top:.5rem;">
                    <span style="">角色：</span>
                    <span style="color:#9e9e9e;">洛奇英雄传</span>
                    </div>
                  <div style="font-size:12px; margin-bottom:.2rem;">
                    <span style="">区服：</span>
                    <span style="color:#9e9e9e;">暗杀6区</span>
                  </div>
                  <div style="font-size:12px; margin-bottom:.2rem;">
                    <span style="">等级/段位：</span>
                    <span style="color:#9e9e9e;">66</span>
                  </div>
                  <div style="font-size:12px; margin-bottom:.2rem;">
                    <span style="">招募人数：</span>
                    <span style="color:#9e9e9e;">77</span>
                  </div>
                  <div style="font-size:12px; margin-bottom:.2rem;">
                    <span style="">队友偏向：</span>
                    <span style="color:#9e9e9e;">男性/老油条/妹子</span>
                  </div>
                </mu-col>

                <mu-col col="6">
                  <div style="width:100%; height:auto; text-align:center; border-radius:.5rem; margin-top:.5rem;">
                    <img style="max-width:100%; max-height:10rem; border-radius:.5rem;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556126871136&di=96c4c07f9ec7abb39c6ccff8611524e3&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fa0698da271c805c12a9b96d71b8364e3f0202d1c7b3e-xwZp1o_fw658" />
                  </div>
                </mu-col>
              </mu-row>

              <mu-row style="margin-top:.5rem;" gutter>
                <mu-col col="12" style="font-size:12px;">
                  <span style="">招募宣言：</span> 
                  <span style="color:#9e9e9e;">来几个好基友一起玩了, 最好是风情万种的男人，潇洒风流的女人。come on!</span>
                </mu-col>
              </mu-row>

            </div>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.
          </mu-expansion-panel>
          <!-- END 组队样式二 -->

          <!-- BEGIN 组队样式三 -->
          <mu-expansion-panel class="team-panel">
            <div slot="header" class="team-header">

              <!-- 队长基本信息(包括图片) -->
              <mu-row style="margin-top:.2rem;" gutter>
                <!-- 左边内容 -->
                <mu-col col="6" style="padding:.5rem 0 0 .5rem;">
                  <mu-flex align-items="center" class="team-avatar-flex">
                    <mu-avatar size="25">
                      <img src="http://img4.imgtn.bdimg.com/it/u=406799163,4023058385&fm=11&gp=0.jpg" />
                    </mu-avatar>
                    <span class="team-leader-nickname">风吹裤裆</span>
                  </mu-flex>

                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">职业：</span>
                    <span class="team-leaderinfo-cont">洛奇英雄传</span>
                  </div>
                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">昵称：</span>
                    <span class="team-leaderinfo-cont">我的名字</span>
                  </div>
                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">区服：</span>
                    <span class="team-leaderinfo-cont">暗杀6区</span>
                  </div>
                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">等级/段位：</span>
                    <span class="team-leaderinfo-cont">66</span>
                  </div>
                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">招募人数：</span>
                    <span class="team-leaderinfo-cont">77</span>
                  </div>
                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">队友偏向：</span>
                    <span class="team-leaderinfo-cont">男性/老油条/妹子</span>
                  </div>
                </mu-col>  

                <!-- 右边图片展示 -->
                <mu-col col="6" justify-content="center" align-items="center">
                  <mu-flex justify-content="center" align-items="center" class="team-leaderinfo-img-flex">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1556172407865&di=6171b22f5c8d59e11d35faef8afe7d54&imgtype=0&src=http%3A%2F%2Fimgsa.baidu.com%2Fexp%2Fw%3D500%2Fsign%3D4332c8a0dd54564ee565e43983df9cde%2Fb812c8fcc3cec3fdf66553c6d688d43f8794272d.jpg" />
                  </mu-flex>
                </mu-col>
              </mu-row>

              <!-- 招募宣言 -->
              <mu-row style="margin-top:.5rem;" gutter>
                <mu-col col="12" style="font-size:12px;">
                  <span style="color:#795548;">招募宣言：</span> 
                  <span style="color:#9e9e9e;">来几个好基友一起玩了, 最好是风情万种的男人，潇洒风流的女人。come on!</span>
                </mu-col>
              </mu-row>

              <!-- 额外内容 -->
              <mu-flex style="margin-top:.5rem;">
                <div style="margin-left:auto;">
                  <span class="team-extracont-time">2分钟前</span>
                  <!-- <span style="font-size:12px; color:#009688;">进入聊天</span> -->
                  <span class="team-extracont-operate">加入组队</span>
                </div>
              </mu-flex>

            </div>

            <!-- 队友所需内容 角色、游戏名、等级段位、队友偏向 -->
            <!-- 展开的内容，队友信息 -->
            <mu-divider></mu-divider>  
            <div style="margin-top:.5rem;">
              <mu-row style="margin-bottom:.5rem; background:rgba(230, 230, 230, .5); padding:.4rem 0 .4rem .5rem; border-radius:.5rem;">
                <mu-col span="9">
                  <mu-flex style="height:4rem;">
                    <mu-avatar size="28">
                      <img src="http://img4.imgtn.bdimg.com/it/u=406799163,4023058385&fm=11&gp=0.jpg" />
                    </mu-avatar>

                    <div>
                      <span style="margin-left:.5rem; font-size:12px; color:#795548;">昵称：<span style="color:#9e9e9e;">风吹裤裆</span></span>
                      <br/>
                      <span style="margin-left:.5rem; font-size:12px; color:#795548;">角色名：<span style="color:#9e9e9e;">我是你的神</span></span>
                      <br/>
                      <span style="margin-left:.5rem; font-size:12px; color:#795548;">亦非/69级/大叔</span>
                    </div>
                  </mu-flex>
                </mu-col>

                <mu-col span="3" justify-content="center">
                  <mu-flex justify-content="center" align-items="center" style="width:100%; height:4rem; text-align:center; border-radius:.5rem; ">
                      <img style="max-width:4rem; max-height:4rem; border-radius:.2rem;" src="http://pic1.cxtuku.com/00/15/12/b018d091a51d.jpg" />
                  </mu-flex>
                </mu-col>
              </mu-row>

              <mu-row style="margin-bottom:.5rem; background:rgba(230, 230, 230, .5); padding:.4rem 0 .4rem .5rem; border-radius:.5rem;">
                <mu-col span="9"> 
                  <mu-flex style="height:4rem;">
                    <mu-avatar size="28">
                      <img src="http://img4.imgtn.bdimg.com/it/u=406799163,4023058385&fm=11&gp=0.jpg" />
                    </mu-avatar>

                    <div>
                      <span style="margin-left:.5rem; font-size:12px; color:#795548;">昵称：<span style="color:#9e9e9e;">风吹裤裆</span></span>
                      <br/>
                      <span style="margin-left:.5rem; font-size:12px; color:#795548;">角色名：<span style="color:#9e9e9e;">我是你的神</span></span>
                      <br/>
                      <span style="margin-left:.5rem; font-size:12px; color:#795548;">亦非/69级/大叔</span>
                    </div>
                  </mu-flex>
                </mu-col>

                <mu-col span="3" justify-content="center">
                  <mu-flex justify-content="center" align-items="center" style="width:100%; height:4rem; text-align:center; border-radius:.5rem; ">
                      <img style="max-width:4rem; max-height:4rem; border-radius:.2rem;" src="http://img.zcool.cn/community/0113d3577f9cea0000018c1b42c704.jpg@2o.jpg" />
                  </mu-flex>
                </mu-col>
              </mu-row>

              <mu-row class="teammate-box">
                <mu-col span="9">
                  <mu-flex style="height:4rem;">
                    <mu-avatar size="28">
                      <img src="http://img4.imgtn.bdimg.com/it/u=406799163,4023058385&fm=11&gp=0.jpg" />
                    </mu-avatar>

                    <div>
                      <span class="teammate-info-title">昵称：<span style="color:#9e9e9e;">风吹裤裆</span></span>
                      <br/>
                      <span class="teammate-info-title">角色名：<span style="color:#9e9e9e;">我是你的神</span></span>
                      <br/>
                      <span class="teammate-info-title">亦非/69级/大叔</span>
                    </div>
                  </mu-flex>
                </mu-col>

                <mu-col span="3" justify-content="center">
                  <mu-flex justify-content="center" align-items="center" class="teammate-img-flex">
                      <img src="http://pic33.photophoto.cn/20141204/0005018330800906_b.jpg" />
                  </mu-flex>
                </mu-col>
              </mu-row>
            </div>

          </mu-expansion-panel>
          <!-- END 组队样式三 -->


          <!-- BEGIN 组队样式 -->
          <!-- TODO 这个还是手动加载吧， 好像加了这个会很卡 -->
          <!-- <mu-load-more :loading="teamLoading" @load="teamLoad" :loaded-all="teamIsTheLast"> -->
          <mu-expansion-panel class="team-panel"  v-for="(item, index) in teamList" :key="index">
            <div slot="header" class="team-header">

              <!-- 队长基本信息(包括图片) -->
              <mu-row style="margin-top:.2rem;" gutter>
                <!-- 左边内容 -->
                <mu-col col="6" style="padding:.5rem 0 0 .5rem;">
                  <mu-flex align-items="center" class="team-avatar-flex">
                    <mu-avatar size="25">
                      <img :src="item.captain_avatar" />
                    </mu-avatar>
                    <span class="team-leader-nickname">{{ item.captain_nickname }}</span>
                  </mu-flex>

                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">职业：</span>
                    <span class="team-leaderinfo-cont">{{ item.role }}</span>
                  </div>
                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">角色：</span>
                    <span class="team-leaderinfo-cont">{{ item.role_name }}</span>
                  </div>
                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">区服：</span>
                    <span class="team-leaderinfo-cont">{{ item.server_name }}</span>
                  </div>
                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">等级/段位：</span>
                    <span class="team-leaderinfo-cont">{{ item.role_rank }}</span>
                  </div>
                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">招募人数：</span>
                    <span class="team-leaderinfo-cont">{{ item.recruit_num }}/<span style="font-size:8px;">{{ item.hadJoin }}</span></span>
                  </div>
                  <div class="team-leaderinfo-item">
                    <span class="team-leaderinfo-title">队友偏向：</span>
                    <span class="team-leaderinfo-cont">{{ item.teanmate_prefer }}</span>
                  </div>
                </mu-col>  

                <!-- 右边图片展示 -->
                <mu-col col="6" justify-content="center" align-items="center">
                  <mu-flex justify-content="center" align-items="center" class="team-leaderinfo-img-flex">
                    <img :src="item.display_img" />
                  </mu-flex>
                </mu-col>
              </mu-row>

              <!-- 招募宣言 -->
              <mu-row style="margin-top:.5rem;" gutter>
                <mu-col col="12" style="font-size:12px;">
                  <span style="color:#795548;">招募宣言：</span> 
                  <span style="color:#9e9e9e;">{{ item.announcement }}</span>
                </mu-col>
              </mu-row>

              <!-- 额外内容 -->
              <mu-flex style="margin-top:.5rem;">
                <div style="margin-left:auto;">
                  <span class="team-extracont-time">{{ item.create_time }}</span>
                  <span class="team-extracont-operate" @click="joinTeam(item.t_id, index, item.recruit_way)">{{ item.joinStr }}</span>
                </div>
              </mu-flex>

            </div>

            <!-- 队友所需内容 角色、游戏名、等级段位、队友偏向 -->
            <!-- 展开的内容，队友信息 -->
            <mu-divider></mu-divider>  
            <div style="margin-top:.5rem;">
              <mu-row class="teammate-box" v-for="(item2, index2) in item.TeammateList" :key="index2">
                <mu-col span="9">
                  <mu-flex style="height:4rem;">
                    <mu-avatar size="28">
                      <img :src="item2.user_avatar" />
                    </mu-avatar>

                    <div>
                      <span class="teammate-info-title">昵称：<span style="color:#9e9e9e;">{{ item2.nickname }}</span></span>
                      <br/>
                      <span class="teammate-info-title">角色：<span style="color:#9e9e9e;">{{ item2.role_name }}</span></span>
                      <br/>
                      <span class="teammate-info-title">{{ item2.role + '/' +item2.role_rank + '/' + item2.feature }}</span>
                    </div>
                  </mu-flex>
                </mu-col>

                <mu-col span="3" justify-content="center">
                  <mu-flex justify-content="center" align-items="center" class="teammate-img-flex">
                      <img :src="item2.display_img" />
                  </mu-flex>
                </mu-col>
              </mu-row>
            </div>

          </mu-expansion-panel>

          <mu-row v-show="teamIsTheLast" justify-content="center" style="padding:.5rem; margin-top:.5rem;">
            <span style="">没有更多的内容</span>
          </mu-row>
          <div v-show="!teamIsTheLast">
            <mu-row v-show="!teamLoading" justify-content="center" style="padding:.5rem; margin-top:.5rem;" @click="teamLoad">
              <span style="color:green;">点击加载更多</span>
            </mu-row>
            <mu-row v-show="teamLoading" justify-content="center" style="padding:.5rem; margin-top:.5rem;">
              <span data-mu-loading-size="18" data-mu-loading-color="green" data-mu-loading-overlay-color="rgba(250, 250, 250, .7)" v-loading="true"></span>
              <span style="margin-left:.5rem; color:green; font-size:12px;">加载中· · ·</span>
            </mu-row>
          </div>
          <!-- </mu-load-more> -->
          <!-- END 组队样式 -->



      </mu-container>
      <!-- END 组队 -->
    </div>
    <!-- END 评论/组队内容 -->
  
  </div>
</template>


<script>
  import utils from 'common/utils.js'
  export default {
    data() {
      return {
        swiperOptionTop: {
          spaceBetween: 10,
          loop: true,
          loopedSlides: 5, //looped slides should be the same
          autoplay: true, // 是否自动播放
          delay: 5000,  // 5s切换一次
          speed: 2000,  // 切换所用的时间
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev' 
          }
        },
        swiperOptionThumbs: {
          spaceBetween: 10,
          slidesPerView: 4,
          touchRatio: 0.2,
          loop: true,
          loopedSlides: 5, //looped slides should be the same
          slideToClickedSlide: true,
        },


        active: 0,  // 导航条切换
        panel: '',  // 组队信息展开

        gameID: 0,  // 游戏id
        gameName: '', // 游戏名称
        gameTp: '', // 游戏类型
        gameBriefDesc: '', // 游戏简介
        isRender: false,  // 轮播图是否渲染问题，如果一开始就渲染会出现bug,而且图片必须大于4张，否则会出现bug
        displayImgList: [],  // 轮播图展示图片

        commentPage: 1, 
        commentIsTheLast: true,
        commentLoading: false,
        commentList: [],

        teamPage: 1,
        teamListIsInit: false,
        teamIsTheLast: true,
        teamLoading: false,
        teamList: [],
        teamListOperate: '没有更多内容'

      } 
    },

    mounted () {

      // 赋值 gameID, gameName (这里要注意，$router 和 $route 是不同的两个对象， 一个是全局，一个是局部)
      this.gameID = this.$route.params.gameid
      // this.gameName = this.$route.query.gamename

      // 获取游戏的基本信息，评论基本信息，组队基本信息
      this.$axios.post(
        `/game/detail/${this.gameID}`,{}
      ).then((resp)=>{
        let dataBack = resp.data.msg

        // 游戏基本信息初始化问题
        this.gameTp = dataBack.gameInfo.g_type
        this.gameBriefDesc = dataBack.gameInfo.brief_desc
        this.displayImgList = dataBack.gameInfo.display_imglist
        this.gameName = dataBack.gameInfo.g_name
        // 轮播图数据渲染问题
        this.isRender =true
         // 轮播图处理
        this.$nextTick(() => {
          const swiperTop = this.$refs.swiperTop.swiper
          const swiperThumbs = this.$refs.swiperThumbs.swiper
          swiperTop.controller.control = swiperThumbs
          swiperThumbs.controller.control = swiperTop
        })

        // 游戏评论处理
        this.commentList = this.commentList.concat(dataBack.cmtList)
        this.commentIsTheLast = dataBack.cmtIsTheLast
        this.commentPage++

      })
    },

    watch: {
      active (newVal) {

        if(newVal == 1 && this.teamListIsInit === false) {
          this.teamListIsInit = true
          this.teamLoad()
        }
      },
    },

    methods: {
      toggle (panel) {
        this.panel = panel === this.panel ? '' : panel
      },
      newComment () {
        this.$router.push(`/game/newcomment/${this.gameID}`)
      },
      formTeam () {
        this.$router.push(`/game/formteam/${this.gameID}`)
      },
      goBack () {
        this.$router.go(-1)
      },
      commentLoad () { // 加载数据
        this.commentLoading = true

        this.$axios.post(`/game/commentList/${this.commentPage}/${this.gameID}`,{}).then((resp)=>{
          let dataBack = resp.data
          this.commentIsTheLast = dataBack.isTheLast
          this.commentList = this.commentList.concat(dataBack.listInfo)
          this.commentPage++  // 页数+1
          this.commentLoading = false // 关闭转圈圈
        })
      },
      linkToCommentDetail (commentID) {
        this.$router.push(`/game/commentDetail/${commentID}`)
      },
      teamLoad () {
        this.teamLoading = true
        this.$axios.post(`/game/teamList/${this.teamPage}/${this.gameID}`,{}).then((resp)=>{
          let dataBack = resp.data
          this.teamIsTheLast = dataBack.isTheLast

          let listInfo = dataBack.listInfo
          for(let i = 0; i < listInfo.length; i++) {
            listInfo[i]['hadJoin'] = listInfo[i]['TeammateList'].length
            listInfo[i]['joinStr'] = listInfo[i]['recruit_way'] == 0 ? '加入组队' : '申请加入'
            listInfo[i]['create_time'] = utils.getDateDiff(listInfo[i]['create_time'], false)
          }

          this.teamList = this.teamList.concat(dataBack.listInfo)
          this.teamPage++  // 页数+1
          this.teamLoading = false // 关闭转圈圈
        })
      },
      joinTeam (teamID, index, recruitWay) {
        // 这里的状态，应该有几个才对的
        if(recruitWay == 0) { // 加入组队，不用申请的
          // 去发起请求，并且跳转页面
          return
        }

        // 去发起加入组队的请求
        
      }
    },
  }
</script>

<style>

.mine-appbar { width: 100%; height:2.5rem; }

.swiper-container { background-color: #ffffff; }
.swiper-slide { background-size: cover; background-position: center; }
.swiper-img { max-width:100%; height:auto; border-bottom-left-radius:3px; border-bottom-right-radius:5px; }

.gallery-top { height: 80%!important; width: 100%; margin-top:1px; }
.gallery-thumbs { height: 20%!important; box-sizing: border-box; padding: 1px 0; }
.gallery-thumbs .swiper-slide { width: 25%; height: 100%; opacity: 0.4; }
.gallery-thumbs .swiper-slide-active { opacity: 1; }

.game-brief-desc { margin-top:.5rem; padding:0 .5rem; margin-bottom:.5rem; }
.game-badge { margin-top:.5rem; padding:0 .5rem; }

.comment-box { padding:.5rem 1rem; }
.comment-create-btn { width:100%; padding:.5rem; text-align:center; color:white; background:#4dd0e1; border-radius:.3rem; border:0; }
.comment-item-nickname { margin-left:.5rem; font-size:14px; color:#4db6ac; }
.comment-item-time { margin-left: auto; font-size:12px; color:#9e9e9e; }
.comment-item-text { padding:.5rem 0 0 2rem; font-size:12px; color:#616161; }
.comment-item-img { padding:.5rem .5rem 0 2rem; font-size:12px; color:#616161; }
.comment-item-img img { max-width:100%; max-height:100%; border-radius:.3rem; }
.comment-item-thumbup-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }
.comment-item-comment-count { font-size:12px; margin-left:.2rem; color:#9e9e9e; }

.team-box { padding:.5rem 1rem; }
.team-panel { margin-bottom:1rem; border-radius:.5rem; }
.team-create-btn { width:100%; padding:.5rem; text-align:center; color:white; background:#4dd0e1; border-radius:.3rem; border:0; }
.team-header { padding:.5rem 0 .5rem 0; }
.team-avatar-flex { width:90%; margin-left:-.5rem; margin-bottom:.5rem; }
.team-leader-nickname { margin-left:.5rem; font-size:14px; color:#795548; }
.team-leaderinfo-item { font-size:12px; margin-bottom:.2rem; }
.team-leaderinfo-title { color:#795548; }
.team-leaderinfo-cont { color:#9e9e9e; }
.team-leaderinfo-img-flex { width:100%; height:10rem; text-align:center; border-radius:.5rem; margin-top:.5rem; }
.team-leaderinfo-img-flex img { max-width:100%; max-height:10rem; border-radius:.5rem; }
.team-extracont-time { font-size:12px; margin-right:1rem; color:#9e9e9e; }
.team-extracont-operate { font-size:12px; color:#009688; }

.teammate-box { margin-bottom:.5rem; background:rgba(230, 230, 230, .5); padding:.4rem 0 .4rem .5rem; border-radius:.5rem; }
.teammate-info-title { margin-left:.5rem; font-size:12px; color:#795548; }
.teammate-img-flex { width:100%; height:4rem; text-align:center; border-radius:.5rem; }
.teammate-img-flex img { max-width:4rem; max-height:4rem; border-radius:.2rem; }

/* 修改museui原本样式 */
.mu-expansion-toggle-btn { display: none; }


</style>