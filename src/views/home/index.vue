<!-- home -->
<template>
  <div class="index-container">
    <pic-swipe></pic-swipe>
    <div class="pro_info">
      <div class="pro_name">项目名称：11111<span class="pro_change">切换</span></div>
      <div class="pro_danwei">单位：r3454354235</div>
    </div>
    <div class="box">
      <div class="content van-hairline--top">
        <van-grid :column-num="4" :border="false">
          <van-grid-item v-for="item in btnList" @click="enter(item.path)">
            <div class="file_item">
              <van-image :src="item.imgUrl"/>
              <div class="file_name">
                {{item.desc}}
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div class="box">
      <div class="title ">项目进度</div>
      <div class="content van-hairline--top" style="height: 300px">
        <pro_progress></pro_progress>
      </div>
    </div>
    <div class="box">
      <div class="title ">现场视频</div>
      <div class="content van-hairline--top">
        <van-grid :column-num="2">
          <van-grid-item v-for="item in contents">
            <div class="file_item">
              <video-item></video-item>
            </div>
            <!--            <div class="file_item" @click="enter('/video')">-->
            <!--              <van-image-->
            <!--                width="100%"-->
            <!--                height="280px"-->
            <!--                fit="fill"-->
            <!--                :src="item.url"-->
            <!--              >-->
            <!--                <template v-slot:loading>-->
            <!--                  <van-loading type="spinner" size="20"/>-->
            <!--                </template>-->
            <!--                <template v-slot:error>加载失败</template>-->
            <!--              </van-image>-->
            <!--              <div class="file_name">-->
            <!--                {{item.name}}-->
            <!--              </div>-->
            <!--            </div>-->
          </van-grid-item>

        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
  import pro_progress from '../../components/progress'
  import videoItem from '../../components/videoItem'
  import picSwipe from '../../components/picSwipe'

  export default {
    components: {
      pro_progress,
      videoItem,
      picSwipe
    },
    data() {
      return {
        btnList: [
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '文件管理', path: '/files' },
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '现场照片', path: '/picView' },
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '项目概况', path: '/projectDetail' },
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '半月报', path: '/projectHalfDetail' }
        ],
        contents: [
          { url: 'https://img.yzcdn.cn/vant/cat.jpeg', name: '海心沙xxx视频' },
          { url: 'https://img.yzcdn.cn/vant/cat.jpeg', name: '海印桥视频' }
        ]
      }
    },

    computed: {},

    mounted() {
    },

    methods: {
      enter(path) {
        this.$router.push({
          path
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .index-container {
    .pro_info {
      background-color: white;
      padding: 10px;
      .pro_name {
        font-size: 19px;
        font-weight: 600;
        .pro_change{
          padding-left: 10px;
          color: $common_blue;
          font-weight: 100;
          text-decoration: underline;
        }
      }

      .pro_danwei {
        font-size: 18px;
      }
    }

    .box {
      /*margin-top: 10px;*/

      .title {
        padding: 8px 8px 8px 10px;
        font-size: 18px;
        font-weight: 600;
        position: relative;
        background-color: white;
      }


      .title:after {
        content: '';
        width: 5px;
        height: 70%;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 3px;
        background-color: $common_blue;
      }

      .content {
        background-color: white;

        .file_item {
          height: 100%;
          width: 100%;

          .file_name {
            text-align: center;
            font-size: 16px;

          }
        }
      }
    }

    .box:first-child {
      margin-top: 0;
    }

  }
</style>
