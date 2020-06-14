<template>
  <div id="modelAndPic">
    <video
      id="example-video"
      style="width: 100%;height: 100%"
      class="video-js vjs-default-skin vjs-big-play-centered"
      poster=""
    >
      <source
        :src="src"
        type="application/x-mpegURL"
        id="target"
      >
    </video>
  </div>


</template>

<script>
  import video from "video.js";
  import "video.js/dist/video-js.css";
  export default {
    name: "videoI",

    data() {
      return {
        player: null,
        shipinurl: null,
        sel_url: "i",
        video_url: null,
        shipinName: null,
        src:"http://ivi.bupt.edu.cn/hls/cctv1hd.m3u8"
      };
    },
    mounted() {
      // this.getVideoList();
      this.showVideo();
    },
    beforeDestroy() {
      video("example-video").dispose();
    },
    methods: {

      showVideo() {
        if (!this.src) {
          return;
        }
        this.player = video("example-video", {
          poster: "",
          controls: "true",
          src: this.src
        });
      }
    }
  };
</script>

<style scoped>
  #modelAndPic {
    position: absolute;
    width: 100%;
    height: 100%;
    color: white;
    display: flex;
    flex-direction: row;
  }
  .video_sel {
    z-index: 100;
    position: absolute;
    top: 2rem;
    right: 2.5rem;
    width: 10rem;
    word-break: break-all;
    background-color: rgba(59, 114, 200, 0.8);
    border: none;
    color: white;
    display: block !important;
    resize: none;
  }
</style>

