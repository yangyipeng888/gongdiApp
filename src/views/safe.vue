<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'质量监管'"
      ></nav-bar>
      <div class="content">
        <safeForm1></safeForm1>
        <safeForm2></safeForm2>
        <safeForm3></safeForm3>
      </div>

    </div>

  </div>
</template>

<script>
  import safeForm1 from '@/components/gongdi/safe/safeForm1'
  import safeForm2 from '@/components/gongdi/safe/safeForm2'
  import safeForm3 from '@/components/gongdi/safe/safeForm3'
  import { Toast } from 'vant'
  import { ImagePreview } from 'vant'
  import navBar from '../components/navBar'

  export default {
    name: 'problemListDetail',
    components: {
      navBar,
      safeForm1,
      safeForm2,
      safeForm3

    },
    data() {
      return {
        details: []
      }
    },
    mounted() {

    },
    methods: {
      onClickLeft() {
        this.$router.push({ path: '/' })
      },

      previewImg(url) {
        ImagePreview({
          images: [url],
          showIndex: false
        })
      }


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

        .detail_wrap {
          margin: 10px;
          border-radius: 3px;
          box-shadow: 0px 0px 5px #888888;

          .detail_title {
            height: 30px;
            display: flex;
            margin: 0 5px;
            padding: 5px 0;
            justify-content: center;
            align-items: center;

            .projectName {
              width: 50%;
              font-size: 20px;
              font-weight: 600;
            }

            .status {
              height: 80%;
              width: 20%;
              display: flex;
              justify-content: center;
              align-items: center;

              .status_txt {
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                width: 80%;
                height: 100%;
                font-size: 15px !important;
              }

              .status_ok {
                background-color: $common_success;
              }

              .status_nok {
                background-color: $common_fail;
                /*text-decoration: underline;*/
              }

              .status_appoint {
                background-color: $common_warning;
                /*text-decoration: underline;*/
              }
            }

            .time {
              height: 100%;
              width: 30%;
              font-size: 16px;
              color: gray;
              display: flex;
              align-items: center;

              .clock {
                color: #FBBE66 !important;
              }
            }
          }

          .detail_content {
            font-size: 16px;
            padding: 5px;
            color: gray;

            .projectName2 {
              .site {
                color: cornflowerblue;
              }
            }

            .desc {

            }

            .pictures {
              .file_item {
                margin: 2px;

                .file_img {

                }
              }
            }
          }
        }


      }
    }


  }

</style>
