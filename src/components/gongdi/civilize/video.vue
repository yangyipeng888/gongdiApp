<template>
  <div class="video_container">
    <div v-for="item in btnList">
      <img :src="item.imgUrl" style="height: 150px;object-fit: contain">
      <div class="file_name">
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
          { imgUrl: require('@/assets/img/gongdi1.png'), desc: '文件管理', path: '/files' },
          { imgUrl: require('@/assets/img/gongdi1.png'), desc: '现场照片', path: '/picView' },
          { imgUrl: require('@/assets/img/gongdi1.png'), desc: '项目概况', path: '/projectDetail' },
          { imgUrl: require('@/assets/img/gongdi1.png'), desc: '文明施工', path: '/civilize' },
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




  }

</style>
