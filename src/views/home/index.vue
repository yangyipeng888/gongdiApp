<!-- home -->
<template>
  <div class="index-container">
    <nav-bar class="nav"
             :title="'首页'"
             :right-text="'登出'"
             :onClickRightHandler="logout"
    ></nav-bar>
    <div class="content">
      <pic-swipe></pic-swipe>
      <pro-info></pro-info>
      <div class="box">
        <div class="box_content van-hairline--top">
          <van-grid :column-num="4" :border="false">
            <van-grid-item v-for="item in btnList" @click="enter(item.path)">
              <div class="file_item">
                <van-image :src="item.imgUrl"/>
                <div class="file_name">
                  {{item.desc}}
                </div>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <div class="box">
        <div class="title ">项目进度</div>
        <div class="box_content van-hairline--top" style="height: 300px">
          <pro_progress></pro_progress>
        </div>
      </div>
      <div class="box">
        <div class="title ">现场视频</div>
        <div class="box_content van-hairline--top">
          <van-grid :column-num="2">
            <van-grid-item v-for="item in videos">
              <div class="file_item">
                <video-item></video-item>
              </div>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import pro_progress from '../../components/progress'
  import videoItem from '../../components/videoItem'
  import picSwipe from '../../components/picSwipe'
  import navBar from '../../components/navBar'
  import proInfo from '../../components/proInfo'
  export default {
    components: {
      proInfo,
      pro_progress,
      videoItem,
      picSwipe,
      navBar
    },
    data() {
      return {
        btnList: [
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '文件管理', path: '/files' },
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '现场照片', path: '/picView' },
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '项目概况', path: '/projectDetail' },
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '半月报', path: '/projectHalfDetail' },
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '问题上报', path: '/submit' }

        ],
        videos: [
          { url: 'https://img.yzcdn.cn/vant/cat.jpeg', name: '海心沙xxx视频' },
          { url: 'https://img.yzcdn.cn/vant/cat.jpeg', name: '海印桥视频' }
        ]
      }
    },

    computed: {
      currentSiteObj() {
        let id = this.$store.state.currentSite
        return this.$store.state.constructionSite[id]
      }
    },

    mounted() {
      // this.$store.commit('setSite', {
      //   name: 'siteId',
      //   id: 1001
      // })
    },

    methods: {
      enter(path) {
        this.$router.push({
          path
        })
      },
      logout(){
        localStorage.clear()
        this.$store.state.logined = false
        //		this.changeMain(0, '/login');
        console.log('登出成功！')
        window.location.reload()
      }
    }
  }
</script>
<style lang="scss" scoped>
  .index-container {
    height: 100%;
    width: 100%;
    position: relative;

    .nav {
      height: 46px;
    }

    .content {
      width: 100%;
      padding: 0;
      position: absolute;
      top: 46px;
      bottom: 0px;
      left: 0px;
      overflow: scroll;


      .box {
        /*margin-top: 10px;*/

        .title {
          padding: 8px 8px 8px 10px;
          font-size: 18px;
          font-weight: 600;
          position: relative;
          background-color: white;
        }


        .title:after {
          box_content: '';
          width: 5px;
          height: 70%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 3px;
          background-color: $common_blue;
        }

        .box_content {
          background-color: white;

          .file_item {
            height: 100%;
            width: 100%;

            .file_name {
              text-align: center;
              font-size: 16px;

            }
          }
        }
      }

      .box:first-child {
        margin-top: 0;
      }

    }


  }
</style>
