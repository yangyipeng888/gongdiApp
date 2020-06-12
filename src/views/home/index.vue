<!-- home -->
<template>
  <div class="index-container">
    <div class="box">
      <div class="title">数据查看</div>
      <div class="content">
        <van-grid :column-num="4">
          <van-grid-item v-for="item in btnList" @click="enter(item.path)">
            <div>
              <van-image :src="item.imgUrl"/>
              <div>
                {{item.desc}}
              </div>
            </div>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
    <div class="box">
      <div class="title">项目概况</div>
      <div class="content" style="height: 300px">
        <pro_progress></pro_progress>
      </div>
    </div>
    <div class="box">
      <div class="title">现场视频</div>
      <div class="content">
        <van-grid :column-num="2">
          <van-grid-item icon="photo-o" text="文字"/>
          <van-grid-item icon="photo-o" text="文字"/>
          <van-grid-item icon="photo-o" text="文字"/>
          <van-grid-item icon="photo-o" text="文字"/>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
  import pro_progress from '../../components/progress'

  export default {
    components: {
      pro_progress
    },
    data() {
      return {
        btnList: [
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '文件管理', path: '/files' },
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '现场照片', path: '/picView' },
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '项目概况', path: '/projectDetail' },
          { imgUrl: 'https://img.yzcdn.cn/vant/apple-1.jpg', desc: '半月报', path: '/projectHalfDetail' }
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
    .box {
      .title {
        padding-left: 10px;
        margin: 5px;
        font-size: 18px;
        font-weight: 600;
        position: relative;
      }

      .title:after {
        content: '';
        width: 5px;
        height: 100%;
        position: absolute;
        top: 1px;
        left: 1px;
        background-color: #1989fa;
      }

      .content {

      }
    }

  }
</style>
