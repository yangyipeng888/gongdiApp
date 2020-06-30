<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'问题详情'"
      ></nav-bar>
      <div class="content">
        正在开发!
      </div>

    </div>

  </div>
</template>

<script>
  import { Toast } from 'vant'
  import { ImagePreview } from 'vant'
  import navBar from '../components/navBar'
  import uploader from '../components/uploader'

  export default {
    name: 'problemDetail',
    components: {
      navBar,
      uploader
    },
    data() {
      return {
        pro: {
          projectId: '',
          projectname: '',
          account: '',
          filetype: 1,
          zhenggaiqixian: '',
          type: '',
          miaoshu: '',
          fData: null
        },
        fileList: [
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          // { url: 'https://cloud-image', isImage: true }
        ],

      }
    },
    mounted() {
      let id = this.$store.state.currentSite

    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      },



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
