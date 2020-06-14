<template>
  <div class="files_container">
    <div class="files_main">
      <van-nav-bar
        class="nav"
        title="现场照片"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
        <template #right>
          <van-icon @click="selFileType" name="search" size="45"/>
        </template>
      </van-nav-bar>
      <div class="content">
        <!--        <van-button class="sel_btn" type="info" @click="selFileType">选择文件</van-button>-->
        <van-empty class="empty" v-show="!contents" description="暂无文件"></van-empty>
        <div class="files" v-show="contents">

        </div>
      </div>

    </div>
    <van-popup v-model="show" position="bottom" :style="{ height: '30%' }">
      <van-picker
        title="标题"
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

  export default {
    name: 'files',
    data() {
      return {
        show: false,
        contents: false,
        columns: [
          // 第一列
          {
            values: ['2019', '2020', '2021'],
            defaultIndex: 2,
          },
          // 第一列
          {
            values: ['一月', '二月', '三月', '四月', '五月'],
            defaultIndex: 2,
          },
          // 第二列
          {
            values: ['上月报', '下月报'],
            defaultIndex: 1,
          },
        ],
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      },
      selFileType() {
        this.show = true
      },
      onConfirm(value, index) {
        Toast(`当前值：${value}, 当前索引：${index}`)
      },
      onChange(picker, value, index) {
        Toast(`当前值：${value}, 当前索引：${index}`)
      },
      onCancel() {
        Toast('取消')
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
        }
      }
    }


    .tree {
      height: 100% !important;
    }
  }

</style>
