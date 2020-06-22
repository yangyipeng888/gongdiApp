<template>
    <div class="videoItem_container">
        <video
                id="myVideo"
                class="_video"
                ref="videoHandle"
                autoplay="autoplay"
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
    watch: {
      'src': {
        handler(n, o) {
          if (n) {
            this.init()
          }
        },
        deep: true,
        immediate: true
      }
    },
    props: ['src'],
    methods: {
      init() {

      },
      play() {
        let el = this.$refs.videoHandle
        el.play()
      }
    },
    mounted() {
      let el = this.$refs.videoHandle
      el.src = this.src
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
            background-color: rgba(0, 0, 0, 0.3);
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
