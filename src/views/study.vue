<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'质量监管'"
      ></nav-bar>
      <div class="content">

      </div>

    </div>

  </div>
</template>

<script>


  import navBar from '../components/navBar'

  export default {
    name: 'study',
    components: {
      navBar,

    },
    data() {
      return {
        details: []
      }
    },
    mounted() {
      this.getwentiList()
    },
    methods: {
      clickItem(item) {


        let status = item.xiufuzhuangtai
        // this.$store.state.selProblemId = item.id
        if (status == this.myConst.problem_status.NOT_APPOINT) {
          // this.$router.push({ name: 'problemAppoint', params: item })
          let right = this.$store.state.right
          let projectIdS = this.$store.state.loginData.projectids
          let curId = this.$store.state.currentSite
          let hasId = projectIdS.indexOf(curId) != -1
          if (right == 3 && hasId) {
            this.$router.push({ name: 'problemAppoint', params: item })
          } else {
            Toast.fail(`账号没有指派权限!`)
          }
        } else if (status == this.myConst.problem_status.NOT_OK) {
          let req = { tousuid: item.id, account: this.$store.state.loginData.account }
          this.$Spi.isChuliQuanxian(req).then((res) => {
            if (res && res.state == 200) {
              this.$router.push({ name: 'problemSolved', params: item })
            } else {
              Toast.fail(`账号没有修复权限!`)
            }
          })
        } else if (status == this.myConst.problem_status.OK) {
          this.$router.push({ name: 'problemDetail', params: item })
        }


      },
      onClickLeft() {
        this.$router.push({ path: '/' })
      },
      getwentiList() {
        let projectIds = this.$store.state.currentSite
        let account = this.$store.state.loginData.account
        let quanxian = this.$store.state.right
        let req = { projectIds, account, quanxian }
        this.$Spi.getwentiList(req).then((res) => {
          res.reverse()
          this.details = res
          this.details.forEach((item) => {
            item.timestamp = item.timestamp.split(' ')[0]
            if (item.imgpath) {
              let str = item.imgpath
              str = item.imgpath.replace('[', '')
              str = str.replace(']', '')
              item.imgpath = str.split(',')
              for (let i = 0; i < item.imgpath.length; i++) {
                let ip = this.$Spi.getCurIp()
                item.imgpath[i] = ip + item.imgpath[i].trim()
              }
            }
          })
        })

      },
      changeStatus(item) {
        this.$router.push({
          name: 'problemSolved',
          params: item
        })

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
