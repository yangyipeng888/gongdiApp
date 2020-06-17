<template>
  <div class="videoItem_container">
    <video
      class="_video"
      ref="videoHandle"
      autoplay="autoplay"
      src="http://203.195.187.186:10001/hls/34020000001320000012_0200000030/34020000001320000012_0200000030_live.m3u8"
    >
    </video>
    <div class="mask">
      <img class="btn_play" src="../assets/img/btn_play.png" @click="play">
    </div>

  </div>
</template>

<script>
  export default {
    name: 'videoItem',
    methods: {
      play() {
        let el = this.$refs.videoHandle
        el.play()
      }
    },
    mounted() {
      let el = this.$refs.videoHandle
      el.currentTime = 0
      el.pause()
    }
  }
</script>

<style scoped lang="scss">
  .videoItem_container {
    width: 100%;
    height: 100%;
    position: relative;

    ._video {
      width: 100%;
      height: 100%;
    }

    .mask {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(0,0,0,0.3);
      top: 0;
      .btn_play {
        width: 70px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }

</style>
