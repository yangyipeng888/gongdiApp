<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'现场照片'"
               :show-right="true"
               :onClickRightHandler="selFileType"
      ></nav-bar>
      <div class="content">
        <!--        <van-button class="sel_btn" type="info" @click="selFileType">选择文件</van-button>-->
        <van-empty class="empty" v-show="!contents" description="暂无文件"></van-empty>
        <div class="files" v-show="contents">
          <van-grid :column-num="2" :border="false">
            <grid-item v-for="item in contents">
              <div class="file_item" @click="previewImg(item.suolue)">
                <van-image
                  class="file_img"
                  fit="fill"
                  lazy-load
                  :src="item.suolue"
                >
                  <template v-slot:loading>
                    <van-loading type="spinner" size="20"/>
                  </template>
                  <template v-slot:error>加载失败</template>
                </van-image>
                <!--                                <div class="file_name">-->
                <!--                                  {{item.timestamp}}-->
                <!--                                </div>-->
              </div>
            </grid-item>

          </van-grid>
        </div>
      </div>

    </div>
    <van-popup v-model="showPop" position="bottom" :style="{ height: '30%' }">
      <van-picker
        title="选择时间"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import { ImagePreview } from 'vant'
  import navBar from '../components/navBar'
  import gridItem from '../components/gridItem'

  export default {
    name: 'files',
    components: {
      navBar,
      gridItem
    },
    data() {
      return {
        showPop: false,
        contents: null,
        columns: [
          // 第一列
          {
            values: this.getYears(),
            defaultIndex: 1
          },
          // 第一列
          {
            values: ['一月', '二月', '三月', '四月', '五月', '六月',
              '七月', '八月', '九月', '十月', '十一月', '十二月'],
            defaultIndex: 0
          }
        ]
      }
    },
    mounted() {
      setTimeout(() => {
        // this.showPop = true
        this.onConfirm([2020,'六月'])
      }, 500)
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      },
      selFileType() {
        this.showPop = true
      },
      getYears() {
        let arr = []
        let start = 2019
        let curYear = new Date().getFullYear()
        let end = curYear + 1
        while (start <= end) {
          arr.push(start)
          start++
        }
        return arr
      },
      onConfirm(values, index) {
        this.showPop = false
        let monthObj = {
          '一月': '1',
          '二月': '2',
          '三月': '3',
          '四月': '4',
          '五月': '5',
          '六月': '6',
          '七月': '7',
          '八月': '8',
          '九月': '9',
          '十月': '10',
          '十一月': '11',
          '十二月': '12'
        }
        let year = values[0]
        let month = Number(monthObj[values[1]])
        let beginTime = year.toString() + ((month < 10) ? '0' + month : month.toString())
        var year2 = year
        var month2 = parseInt(month) + 1
        if (month2 == 13) {
          year2 = parseInt(year) + 1
          month2 = 1
        }
        let endTime = year2.toString() + ((month2 < 10) ? '0' + month2 : month2.toString())
        this.$Spi.getFileList(
          this.$store.state.currentSite,
          15,
          1,
          100,
          beginTime,
          endTime
        ).then((response) => {
          if (response.length == 0) {
            Toast.fail('没有找到文件!')
            return
          }
          this.contents = response
          Toast.success('获取成功!')
        }).catch(function(response) {
          Toast.fail('获取失败!')
        })
      },
      onChange(picker, value, index) {
      },
      onCancel() {
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

        .sel_btn {
          position: absolute;
          z-index: 100;
          top: 0;
          right: 0;
        }

        .empty {
          width: 100%;
          height: 100%;
          padding: 0;
        }

        .files {
          width: 100%;
          height: 100%;
          padding-top: 10px;

          .file_item {
            height: 120px !important;
            width: 100%;
            display: flex;
            justify-content: center;

            .file_img {
              width: 95%;
              height: 95%;
            }

            .file_name {
              text-align: center;
              font-size: 13px;

            }
          }
        }
      }
    }


    .tree {
      height: 100% !important;
    }
  }

</style>
