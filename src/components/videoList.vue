<template>
  <div class="videoL_container">
    <van-grid :column-num="2">
      <grid-item v-for="item in videos">
        <video-item class="videoItem"
                    :src="item.url"
                    :name="item.name"
        ></video-item>
      </grid-item>
    </van-grid>
  </div>
</template>

<script>
  import videoItem from './videoItem'
  import gridItem from '../components/gridItem'

  export default {
    name: 'videoList',
    components: {
      videoItem,
      gridItem
    },
    data() {
      return {
        videos: [],
        shipinName: [],
        shipinurl: []
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
        this.videos = video.slice(0, 2)
        this.shipinName = name
        this.shipinurl = shipin

      }
    }
  }
</script>

<style scoped lang="scss">
  .videoL_container {
    height: 100px;
    width: 100%;
    /*overflow: scroll;*/


    .videoItem {
      margin: 3px;
    }
  }
</style>
