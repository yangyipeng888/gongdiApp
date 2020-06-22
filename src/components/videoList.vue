<template>
  <div class="videoL_container">
    <van-grid :column-num="3">
      <video-item class="videoItem"
                  v-for="video in shipinurl"
                  :src="video"
      ></video-item>
    </van-grid>
  </div>
</template>

<script>
  import videoItem from './videoItem'

  export default {
    name: 'videoList',
    components: {
      videoItem
    },
    data() {
      return {
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
        for (let i = 0; i < shipinurl.length; i++) {
          let arr = shipinurl[i]
          let a = arr.split('-')
          name.push(a[0])
          shipin.push(a[1])
        }
        this.shipinName = name
        this.shipinurl = shipin.slice(0,2)

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
      width: 50%;
      height: 120px;
    }
  }
</style>
