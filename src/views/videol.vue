<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'现场视频'"
      ></nav-bar>
      <div class="content">
        <van-empty class="empty" v-show="!videos" description="暂无视频"></van-empty>
        <div class="files" v-show="videos">
          <van-grid :column-num="2">
            <grid-item v-for="item in videos">
              <video-item class="videoItem"
                          :src="item.url"
                          :name="item.name"
              ></video-item>
            </grid-item>
          </van-grid>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import videoItem from '../components/videoItem'
  import { Toast } from 'vant'
  import navBar from '../components/navBar'
  import gridItem from '../components/gridItem'

  export default {
    name: 'files',
    components: {
      navBar,
      gridItem,
      videoItem
    },
    data() {
      return {
        videos: []

      }
    },
    mounted() {
      this.getVideoList()
    },
    methods: {
      getVideoList() {
        let curSiteId = this.$store.state.currentSite
        if (!curSiteId) {
          return
        }
        let settings = this.$store.state.constructionSite[curSiteId].settings
        let shipinurl = settings.shexiangtouid.split(';')
        let shipin = []
        let name = []
        let video = []
        for (let i = 0; i < shipinurl.length; i++) {
          let arr = shipinurl[i]
          let a = arr.split('-')
          name.push(a[0])
          shipin.push(a[1])
          video.push({
            name: a[0],
            url: a[1]
          })
        }
        this.videos = video
        this.shipinName = name
        this.shipinurl = shipin

      },
      onClickLeft() {
        this.$router.back(-1)
      }


    }
  }
</script>

<style lang="scss">
  .files_container {
    height: 100vh;
    width: 100%;
    position: relative;


    .files_main {
      height: 100%;
      display: flex;
      flex-direction: column;

      .nav {
        /*position: absolute;*/
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

        .sel_btn {
          position: absolute;
          z-index: 100;
          top: 0;
          right: 0;
        }

        .empty {
          width: 100%;
          height: 100%;
          padding: 0;
        }

        .files {
          width: 100%;
          height: 100%;

          .videoItem {
            /*height: 160px;*/
            margin: 5px;
          }


          .file_item {
            height: 120px !important;
            width: 100%;
            display: flex;
            justify-content: center;

          }
        }
      }
    }


    .tree {
      height: 100% !important;
    }
  }

</style>
