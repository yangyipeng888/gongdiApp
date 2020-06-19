<template>
  <div class="picSwiper_container">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in fimgs">
        <van-image class="swipe_img" fit="fill" :src="item.url"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  export default {
    name: 'picSwipe',
    data() {
      return {
        fimgs: [
          {
            url: require('../assets/img/2.jpg')
          },
          {
            url: require('../assets/img/3.jpg')
          },
          {
            url: require('../assets/img/4.jpg')
          },
          {
            url: require('../assets/img/5.jpg')
          }
        ]
      }
    },
    mounted() {
      this.getFileList()
    },
    methods: {
      getFileList() {
        var that = this
        let id = that.$store.state.currentSite
        this.$Spi.getFileList(
          id,
          14,
          1,
          100
        ).then(function(response) {
          if (response && response.length) {
            that.fimgs = response
          }


        }).catch(function(response) {

        })
      }
    }
  }
</script>

<style lang="scss">
  .picSwiper_container {
    .my-swipe {
      .swipe_img {
        height: 180px;
        width: 100%;
      }
    }

  }
</style>
