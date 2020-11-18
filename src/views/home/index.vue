<!-- home -->
<template>
  <div class="index-container">
    <nav-bar class="nav"
             :title="'首页'"
             :right-text="'问题上报'"
             :onClickRightHandler="logout"
    ></nav-bar>
    <div class="content">
      <pic-swipe></pic-swipe>
      <pro-info></pro-info>
      <div class="box">
        <div class="box_content van-hairline--top">
          <div class="file_item" v-for="item in btnList" @click="enter(item.path)">
            <!--                <van-image :src="item.imgUrl" fit="contain" style="height: 100px"/>-->
            <img class="file_img" :src="item.imgUrl">
            <div class="file_name">
              {{item.desc}}
            </div>
          </div>

        </div>
      </div>
      <div class="box">
        <div class="title ">
          <div class="titleC">项目进度</div>
          <!--          <div class="more">更多</div>-->
        </div>
        <div class="box_content van-hairline--top">
          <pro_progress></pro_progress>
        </div>
      </div>
      <div class="box">
        <div class="title ">
          <div class="titleC">问题报警</div>
          <div class="more" @click="enter('/problemListDetail')">更多</div>
        </div>
        <div class="box_content van-hairline--top">
          <problem-list></problem-list>
        </div>
      </div>
      <div class="box">
        <div class="title ">
          <div class="titleC">现场视频</div>
          <div class="more" @click="enter('/video')">更多</div>
        </div>
        <div class="box_content van-hairline--top">
          <video-list></video-list>
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
  import videoList from '../../components/videoList'
  import problemList from '../../components/problemList'

  export default {
    components: {
      proInfo,
      pro_progress,
      videoItem,
      picSwipe,
      navBar,
      videoList,
      problemList
    },
    data() {
      return {
        btnList: [
          { imgUrl: require('../../assets/img/文件夹-红.png'), desc: '文件管理', path: '/files' },
          { imgUrl: require('../../assets/img/照片相册.png'), desc: '现场照片', path: '/picView' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '项目概况', path: '/projectDetail' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '文明施工', path: '/civilize' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '安全学习', path: '/study' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '质量监管', path: '/quality' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '施工进度', path: '/progress' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '人员监管', path: '/staff' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '安全监管', path: '/safe' },
          { imgUrl: require('../../assets/img/调动审批.png'), desc: '半月报', path: '/projectHalfDetail' }
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
      logout() {
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
      padding-bottom: 110px;
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
          display: flex;
          flex-direction: row;

          .titleC {
            width: 88%;
          }

          .more {
            text-decoration: underline;
            color: $common_blue;
            font-weight: 100;
          }
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
          display: flex;
          flex-wrap: wrap;

          .file_item {
            display: flex;
            flex-direction: column;
            width: 23%;
            margin: 1%;
            .file_img {
              height: 50px;
              object-fit: contain
            }

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
