<template>
    <div class="videoItem_container">
        <div class="videoBox">
            <video
                    id="myVideo"
                    class="_video"
                    ref="videoHandle"
                    autoplay="autoplay"
            >
            </video>
            <div class="mask"></div>
            <van-icon class="btn_play" name="play-circle-o" @click="play"/>
        </div>
        <div class="desc">{{name}}</div>


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
    props: ['src','name'],
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
        /*width: 100%;*/
        /*height: 100%;*/
        border-radius: 5px;
        overflow: hidden;

        .videoBox {
            height: 120px;
            position: relative;
            background-image: url("../assets/img/img_video.png");

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
            }

            .btn_play {
                color: navajowhite;
                opacity: 1;
                font-size: 50px;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
            }
        }

        .desc {
            font-size: 18px;
        }
    }

</style>
