<template>
  <div class="files_container">
    <div class="files_main">
      <van-nav-bar
        class="nav"
        title="我的"
      >
      </van-nav-bar>
      <div class="content">
        <van-button class="logout" type="default" @click="play">播放</van-button>

        <video v-for="item in arr" :ref="'videoHandle'+item" style="width: 200px;height: 200px;"
               autoplay="autoplay"
               src="http://203.195.187.186:10001/hls/34020000001320000012_0200000030/34020000001320000012_0200000030_live.m3u8"
        >
        </video>
        <div class="userbox">
          <div class="userImg"></div>
          <div class="name">张三</div>
          <div class="comp">xxxx公司</div>
        </div>

        <van-button class="logout" type="default" @click="logout">退出登录</van-button>

      </div>


    </div>

  </div>
</template>

<script>
  import { Toast } from 'vant'

  export default {
    name: 'files',
    data() {
      return {
        arr: [1, 2, 3]
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      },
      logout() {
        localStorage.clear()
        this.$store.state.logined = false
        //		this.changeMain(0, '/login');
        console.log('登出成功！')
        window.location.reload()
      },
      play() {
        let el = this.$refs.videoHandle1[0]
        el.play()
      }
    },
    mounted() {
      let el = this.$refs.videoHandle1[0]
      el.currentTime = 0
      el.pause()
      let el2 = this.$refs.videoHandle2[0]
      el2.currentTime = 0
      el2.pause()
      let el3 = this.$refs.videoHandle3[0]
      el3.currentTime = 0
      el3.pause()
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

      }
    }


  }

</style>
