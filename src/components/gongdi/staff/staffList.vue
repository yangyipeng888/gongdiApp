<template>
  <div class="staff_container">
    <div class="staffList" v-for="item in staffList">
      <van-image
        @click="previewImg(item.suolue)"
        class="staffPic"
        fit="fill"
        :src="item.suolue"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20"/>
        </template>
        <template v-slot:error>加载失败</template>
      </van-image>
      <div class="list_right">
        <div class="staffName">
          {{item.staffName}}
          <div class="status_txt">
            进闸
          </div>
        </div>
        <div class="time">{{item.time}}</div>
        <div class="desc">{{item.content}}</div>

      </div>

    </div>
  </div>
</template>

<script>
  import { ImagePreview } from 'vant'

  export default {
    name: 'staff',
    data() {
      return {
        staffList: [
          {
            staffName: '夏先勇',
            time: '2020-11-17',
            suolue: 'http://39.100.94.4:38080/zhihuigongdi/zhajilist//img//夏先刚.jpg',
            content: ''
          },
          {
            staffName: '夏先勇',
            time: '2020-11-17',
            suolue: 'http://39.100.94.4:38080/zhihuigongdi/zhajilist//img//夏先刚.jpg',
            content: ''
          },
          {
            staffName: '夏先勇',
            time: '2020-11-17',
            suolue: 'http://39.100.94.4:38080/zhihuigongdi/zhajilist//img//夏先刚.jpg',
            content: ''
          }
        ]
      }
    },
    methods: {
      previewImg(url) {
        ImagePreview({
          images: [url],
          showIndex: false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .staff_container {
    height: 100%;
    width: 100%;
    position: relative;

    .staffList {
      border-radius: 3px;
      padding: 5px;
      box-shadow: 0px 0px 5px #888888;
      background-color: white;
      margin: 7px;
      display: flex;

      .staffPic {
        height: 100px;
        object-fit: contain;
        width: 30%;
      }

      .list_right {
        width: 70%;
        color: gray;
        font-size: 16px;
        word-break: break-all;
        padding-left: 10px;
        .staffName {
          color: black;
          font-size: 20px;
          display: flex;
          /*justify-content: center;*/
          /*align-items: center;*/
          .status_txt {
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            height: 100%;
            font-size: 15px !important;
            background-color: $common_success;
          }

        }

        .time {

        }

        .desc {

        }
      }

    }
  }

</style>
