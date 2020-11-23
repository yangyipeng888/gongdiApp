<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'施工进度'"
    ></nav-bar>
    <van-tabs class="sel_tab" v-model="active" animated swipeable>
      <tab :title="'规划设计'">
        <div class="form">
          <div class="stepsList">
            <div class="stepItem" v-for="(item,index) in stepsList">
              <div class="line" v-show="index!=stepsList.length-1"></div>
              <div class="left">
                <van-icon class="stepIcon" name="checked"/>
              </div>
              <div class="right">
                <div class="stepTitle">{{item.title}}</div>
                <div class="stepTime">{{item.time}}</div>
                <div class="check" @click="clickMore">查看文件</div>
              </div>
            </div>
          </div>
        </div>
      </tab>
      <tab :title="'施工进度'">
        <div class="form">
          <div class="stepsList">
            <div class="stepItem" v-for="(item,index) in stepsList">
              <div class="line" v-show="index!=stepsList.length-1"></div>
              <div class="left">
                <van-icon class="stepIcon" name="checked"/>
              </div>
              <div class="right">
                <div class="stepTitle">{{item.title}}</div>
                <div class="stepTime">{{item.time}}</div>
                <div class="check" @click="clickMore">查看文件</div>
              </div>
            </div>
          </div>
        </div>
      </tab>
      <tab :title="'验收进度'">
        <div class="form">
          <div class="stepsList">
            <div class="stepItem" v-for="(item,index) in stepsList">
              <div class="line" v-show="index!=stepsList.length-1"></div>
              <div class="left">
                <van-icon class="stepIcon" name="checked"/>
              </div>
              <div class="right">
                <div class="stepTitle">{{item.title}}</div>
                <div class="stepTime">{{item.time}}</div>
                <div class="check" @click="clickMore">查看文件</div>
              </div>
            </div>
          </div>
        </div>
      </tab>

    </van-tabs>
    <van-popup v-model="show">
<!--      <myPdf :url="url"></myPdf>-->
            <div class="pdfBox">
              <pdf
                class="pdf"
                v-for="i in pageCount"
                :key="i"
                :src="src"
                :page="i"
              ></pdf>
            </div>
    </van-popup>
  </div>
</template>

<script>
  import myPdf from '@/components/gongdi/common/pdf'
  import navBar from '../components/navBar'
  import tab from '../components/tab'
  import pdf from 'vue-pdf'

  export default {
    name: 'staff',
    components: {
      navBar,
      tab,
      myPdf
    },
    mounted() {
      let src = 'http://image.cache.timepack.cn/nodejs.pdf'
      // let src = 'http://39.100.94.4:38080/zhihuigongdi/cailiaopdf/201811210155/%E8%B4%A8%E9%87%8F%E5%91%A8%E6%A3%80%E3%80%9020190423%E3%80%9120190103171046.pdf'
      this.src = pdf.createLoadingTask(src)
      this.src.promise.then(pdf => {
        this.pageCount = pdf.numPages
      })
    },
    data() {
      return {
        url: 'http://image.cache.timepack.cn/nodejs.pdf',
        src: null,
        pageCount: 0,
        show: false,
        active: 0,
        stepsList: [
          { title: '地下室结构开始', time: '2020-10-12' },
          { title: '大型机械设备安拆开始', time: '2020-10-15' },
          { title: '2楼主体结构开始', time: '2020-10-23' },
          { title: '1楼主体结构开始', time: '2020-11-12' },
          { title: '质量周检【2020-11-12】', time: '2020-11-12' },
          { title: '质量周检【2020-12-12】', time: '2020-12-12' },
          { title: '质量周检【2020-12-12】', time: '2020-12-12' },
          { title: '质量周检【2020-12-12】', time: '2020-12-12' }

        ]

      }
    },
    created() {
    },

    methods: {
      clickMore() {
        this.show = true
        let url = 'http://39.100.94.4:38080/zhihuigongdi/cailiaopdf/201811210155/%E8%B4%A8%E9%87%8F%E5%91%A8%E6%A3%80%E3%80%9020190423%E3%80%9120190103171046.pdf'
        // window.open(url)
      },
      onClickLeft() {
        this.$router.push({ path: '/' })
      }


    }
  }
</script>

<style lang="scss">
  .staff_container {
    height: 100vh;
    width: 100%;
    position: relative;

    .nav {
      /*position: absolute;*/
      height: 46px;
    }

    .sel_tab {
      position: absolute;
      width: 100%;
      top: 46px;
      bottom: 0;
      overflow: scroll;

      .form {
        margin: 10px;
        background-color: white;
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;


        .stepsList {
          width: 100%;


          .stepItem {
            padding: 10px;
            display: flex;
            color: black;
            position: relative;

            .line {
              top: 30%;
              left: 5.5%;
              width: 1px;
              height: 102%;
              background-color: $common_success;
              position: absolute;
            }


            .left {
              width: 10%;


              .stepIcon {
                margin-top: 3px;
                font-size: 20px;
                color: $common_success;

              }


            }

            .right {
              width: 90%;

              .stepTitle {
                word-break: break-all;
                font-size: 20px;


              }

              .check {
                font-size: 15px;
                color: $common_blue;
              }

              .stepTime {
                color: gray;
              }
            }


          }
        }
      }

    }

    .pdfBox {
      height: 80vh;
      width: 80vw;
      overflow-y: scroll;

      .pdf {
        height: 100%;
        width: 100%;

      }
    }


  }

</style>
