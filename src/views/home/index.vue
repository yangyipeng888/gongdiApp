<!-- home -->
<template>
  <div class="index-container">

    <transition name="van-slide-right">
      <notify ref="notify" :count="count" v-show="show"></notify>
    </transition>
    <nav-bar class="nav"
             :title="'首页'"
             :right-text="'问题上报'"
             :onClickRightHandler="submit"
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
  import notify from '@/components/notify'
  import problemUtil from '@/views/problems/common'

  export default {
    components: {
      proInfo,
      pro_progress,
      videoItem,
      picSwipe,
      navBar,
      videoList,
      problemList,
      notify
    },
    mounted() {
      // this.$store.commit('setSite', {
      //   name: 'siteId',
      //   id: 1001
      // })
      this.showNote()
    },
    data() {
      return {
        show: false,
        count: 0,
        listQuery: {
          state: '-1'
        },
        queryParams: {
          pageIndex: 1,
          pageSize: 1000
        }
      }
    },

    computed: {
      btnList() {
        let right = this.$store.getters.right
        let obj = {}
        obj[AUTH.gongren] = [
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '安全学习', path: '/study' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '项目概况', path: '/projectDetail' },
          // { imgUrl: require('../../assets/img/工作汇报.png'), desc: '所有工单', path: '/allProblems' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '我的工单', path: '/myProblems' }
        ]
        obj[AUTH.yezhu] = [
          { imgUrl: require('../../assets/img/文件夹-红.png'), desc: '文件管理', path: '/files' },
          { imgUrl: require('../../assets/img/照片相册.png'), desc: '现场照片', path: '/picView' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '项目概况', path: '/projectDetail' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '文明施工', path: '/civilize' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '安全学习', path: '/study' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '质量监管', path: '/quality' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '施工进度', path: '/progress' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '人员监管', path: '/staff' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '安全监管', path: '/safe' },
          { imgUrl: require('../../assets/img/调动审批.png'), desc: '半月报', path: '/projectHalfDetail' },
          // { imgUrl: require('../../assets/img/工作汇报.png'), desc: '所有工单', path: '/allProblems' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '我的工单', path: '/myProblems' }

        ]
        obj[AUTH.shigong] = [
          { imgUrl: require('../../assets/img/文件夹-红.png'), desc: '文件管理', path: '/files' },
          { imgUrl: require('../../assets/img/照片相册.png'), desc: '现场照片', path: '/picView' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '项目概况', path: '/projectDetail' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '文明施工', path: '/civilize' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '安全学习', path: '/study' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '质量监管', path: '/quality' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '施工进度', path: '/progress' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '人员监管', path: '/staff' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '安全监管', path: '/safe' },
          { imgUrl: require('../../assets/img/调动审批.png'), desc: '半月报', path: '/projectHalfDetail' },
          // { imgUrl: require('../../assets/img/工作汇报.png'), desc: '所有工单', path: '/allProblems' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '我的工单', path: '/myProblems' }
        ]
        obj[AUTH.zhengfu] = [
          { imgUrl: require('../../assets/img/文件夹-红.png'), desc: '文件管理', path: '/files' },
          { imgUrl: require('../../assets/img/照片相册.png'), desc: '现场照片', path: '/picView' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '项目概况', path: '/projectDetail' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '文明施工', path: '/civilize' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '安全学习', path: '/study' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '质量监管', path: '/quality' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '施工进度', path: '/progress' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '人员监管', path: '/staff' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '安全监管', path: '/safe' },
          { imgUrl: require('../../assets/img/调动审批.png'), desc: '半月报', path: '/projectHalfDetail' },
          // { imgUrl: require('../../assets/img/工作汇报.png'), desc: '所有工单', path: '/allProblems' },
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '我的工单', path: '/myProblems' }
        ]
        if (obj[right]) {
          return obj[right]
        }
        return [
          { imgUrl: require('../../assets/img/工作汇报.png'), desc: '我的工单', path: '/myProblems' }

        ]
      },
      currentSiteObj() {
        let id = this.$store.state.currentSite
        return this.$store.state.constructionSite[id]
      }
    },


    methods: {
      showNote() {
        let show = this.$store.state.showNote
        if (show) {
          this.$store.state.showNote = false
          this.getList()
        }
      },
      getList() {
        let req = {}
        req.applyId = this.myConst.appId
        req.applyKey = this.myConst.appKey
        req.state = this.listQuery.state
        req.page = this.queryParams.pageIndex
        req.amount = this.queryParams.pageSize
        req.user = this.$store.state.account
        let id = this.$store.state.currentSite
        let name = this.$store.state.constructionSite[id].name
        req.orderStyle = name
        this.$gdApi.getOrderInfoByUser(req).then(res => {
          if (res.code == SUCCESS) {
            let count = 0
            let account = this.$store.state.account
            let aaa = []
            let orders = res.data.orders
            for (let i = 0; i < orders.length; i++) {
              let order = orders[i]
              let works = order.works
              for (let j = 0; j < works.length; j++) {
                let work = works[j]
                if (work.dealUser != account) {
                  continue
                }
                if (work.nodeState == this.myConst.GD_NODE_STATE.NOT) {
                  if (problemUtil.checkWork(order, work)) {
                    aaa.push(work)
                    count++
                  }
                }
              }
            }
            this.count = count
            if (count > 0) {
              setTimeout(() => {
                this.show = true
                setTimeout(() => {
                  this.show = false
                }, 3000)
              }, 1000)
            }

          }
        })

      },

      enter(path) {
        this.$router.push({
          path
        })
      },
      submit() {
        this.$router.push({
          path: '/submit'
        })
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
