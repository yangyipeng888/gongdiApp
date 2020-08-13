<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'问题详情'"
      ></nav-bar>
      <div class="content">
        <div class="detail_wrap">
          <div class="detail_title van-hairline--bottom">
            <div class="projectName van-ellipsis">{{detail.projectname}}</div>
            <div class="status">
              <div class="status_txt status_ok" v-show="detail.xiufuzhuangtai=='已修复'">{{detail.xiufuzhuangtai}}</div>
              <div class="status_txt status_nok" v-show="detail.xiufuzhuangtai=='未修复'"
                   @click.stop="changeStatus(detail)">
                {{detail.xiufuzhuangtai}}
              </div>
            </div>
            <div class="time">
              {{detail.timestamp}}
              <van-icon class="clock" name="clock-o"/>
            </div>
          </div>
          <div class="detail_content">
            <div class="projectName2">
              <van-icon name="map-marked" class="site"/>
              {{detail.projectname}}
            </div>
            <div class="pictures">
              <van-steps direction="vertical" :active="active">
                <van-step>
                  <div>【修复前】</div>
                  <div class="desc">{{detail.miaoshu1}}</div>
                  <van-grid :column-num="3" :border="false">
                    <grid-item v-for="pic in detail.pic1">
                      <div class="file_item" @click="previewImg(pic)">
                        <van-image
                          class="file_img"
                          fit="fill"
                          lazy-load
                          :src="pic"
                        >
                        </van-image>
                      </div>
                    </grid-item>
                  </van-grid>
                </van-step>
                <van-step>
                  <div>【修复后】</div>
                  <div class="desc">{{detail.miaoshu2}}</div>
                  <van-grid :column-num="3" :border="false">
                    <grid-item v-for="pic in detail.pic2">
                      <div class="file_item" @click="previewImg(pic)">
                        <van-image
                          class="file_img"
                          fit="fill"
                          lazy-load
                          :src="pic"
                        >
                          <!--                      <template v-slot:loading>-->
                          <!--                        <van-loading type="spinner" size="20"/>-->
                          <!--                      </template>-->
                          <!--                      <template v-slot:error>加载失败</template>-->
                        </van-image>
                      </div>
                    </grid-item>
                  </van-grid>
                </van-step>
              </van-steps>
            </div>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
  import { Toast } from 'vant'
  import { ImagePreview } from 'vant'
  import navBar from '../components/navBar'
  import uploader from '../components/uploader'
  import gridItem from '../components/gridItem'
  import { Dialog } from 'vant'

  export default {
    name: 'problemListDetail',
    components: {
      navBar,
      uploader,
      gridItem
    },
    data() {
      return {
        detail: null,
        active: 1
      }
    },
    mounted() {
      // let id = this.$store.state.selProblemId
      let id= this.$route.params.id
      this.$Spi.getwentidetailbyId(id).then((res) => {
        this.detail = res
        let pics = res.detail
        this.detail.pic1 = []
        this.detail.pic2 = []
        for (let i = 0; i < pics.length; i++) {
          let item = pics[i]
          let filetype = item.filetype
          let str = item.imgpath
          str = item.imgpath.replace('[', '')
          str = str.replace(']', '')
          let ip = this.$Spi.getCurIp()
          if (filetype == 1) {
            this.active = 0
            this.detail.miaoshu1 = item.miaoshu
            this.detail.pic1.push(ip + str.trim())
          } else {
            this.active = 1
            this.detail.miaoshu2 = item.miaoshu
            this.detail.pic2.push(ip + str.trim())
          }
        }
        if (res.detail && res.detail.length) {
          let timestamp = res.detail[0].timestamp
          this.detail.timestamp = timestamp.split(' ')[0]
        }

      })

    },
    methods: {
      clickItem(item) {

      },
      onClickLeft() {
        this.$router.push({ name: 'problemListDetail' })
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
                text-decoration: underline;
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

            .pictures /deep/ .van-steps {
              background-color: transparent;
            }

            .pictures /deep/ .van-icon {
              color: $common_blue;
            }

            .pictures /deep/ .van-step__title {
              color: gray;
            }

          }
        }


      }
    }


  }

</style>
