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
        <div class="staffName">{{item.staffName}}</div>
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
            staffName: '粤ADC136',
            time: '2020-11-17',
            suolue: 'http://39.103.138.54:8099/gongdishebei/nitouche/1605683867632.jpg',
            content: '车牌已盖好'
          },
          {
            staffName: '粤ADC136',
            time: '2020-11-17',
            suolue: 'http://39.103.138.54:8099/gongdishebei/nitouche/1605683867632.jpg',
            content: '车牌已盖好'
          },   {
            staffName: '粤ADC136',
            time: '2020-11-17',
            suolue: 'http://39.103.138.54:8099/gongdishebei/nitouche/1605683867632.jpg',
            content: '车牌已盖好'
          },   {
            staffName: '粤ADC136',
            time: '2020-11-17',
            suolue: 'http://39.103.138.54:8099/gongdishebei/nitouche/1605683867632.jpg',
            content: '车牌已盖好'
          },   {
            staffName: '粤ADC136',
            time: '2020-11-17',
            suolue: 'http://39.103.138.54:8099/gongdishebei/nitouche/1605683867632.jpg',
            content: '车牌已盖好'
          },   {
            staffName: '粤ADC136',
            time: '2020-11-17',
            suolue: 'http://39.103.138.54:8099/gongdishebei/nitouche/1605683867632.jpg',
            content: '车牌已盖好'
          },   {
            staffName: '粤ADC136',
            time: '2020-11-17',
            suolue: 'http://39.103.138.54:8099/gongdishebei/nitouche/1605683867632.jpg',
            content: '车牌已盖好'
          },
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
        width: 40%;
      }

      .list_right {
        width: 60%;
        color: gray;
        font-size: 16px;
        word-break: break-all;
        padding-left: 10px;
        .staffName {
          color: black;
          font-size: 20px;

        }

        .time {

        }

        .desc {

        }
      }

    }
  }

</style>
