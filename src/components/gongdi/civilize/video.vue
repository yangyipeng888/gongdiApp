<template>
  <div class="video_container">
    <div class="videoBox" v-for="item in btnList">
      <img class="video_pic" :src="item.imgUrl">
      <div class="video_name">
        {{item.desc}}
      </div>
    </div>
  </div>
</template>

<script>
  import videoItem from '@/components/videoItem'
  import { Toast } from 'vant'
  import navBar from '@/components/navBar'
  import gridItem from '@/components/gridItem'

  export default {
    name: 'files',
    components: {
      navBar,
      gridItem,
      videoItem
    },
    data() {
      return {
        videos: [],
        btnList: [
          { imgUrl: require('@/assets/img/gongdi1.png'), desc: '车辆出入口', path: '/files' },
          { imgUrl: require('@/assets/img/gongdi1.png'), desc: '地磅', path: '/picView' },
          { imgUrl: require('@/assets/img/gongdi1.png'), desc: '施工作业区', path: '/projectDetail' },
          { imgUrl: require('@/assets/img/gongdi1.png'), desc: '大门', path: '/civilize' }
        ]

      }
    },
    mounted() {
      this.getVideoList()
    },
    methods: {
      getVideoList() {
      },
      onClickLeft() {
        this.$router.back(-1)
      }


    }
  }
</script>

<style lang="scss">
  .video_container {
    height: 100%;
    width: 100%;
    position: relative;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .videoBox {
      margin: 1%;
      width: 48%;

      .video_pic {
        border-radius: 3px;
        height: 100px;
        width: 100%;
      }

      .video_name {
      }

    }


  }

</style>
