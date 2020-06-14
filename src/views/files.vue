<template>
  <div class="files_container">
    <div class="files_main">
      <van-nav-bar
        class="nav"
        title="文件管理"
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
      <van-tree-select
        class="tree"
        :items="items"
        :active-id.sync="activeId"
        :main-active-index.sync="activeIndex"
      />
    </van-popup>
  </div>
</template>

<script>
  export default {
    name: 'files',
    data() {
      return {
        show: false,
        contents: false,
        items: [
          {
            text: '前期文件',
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '立项文件',
                // id，作为匹配选中状态的标识符
                id: 1
              },
              {
                text: '概算文件',
                id: 2
              }
            ]
          },
          {
            text: '建设管理',
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '上级要求文件',
                // id，作为匹配选中状态的标识符
                id: 1
              },
              {
                text: '会议纪要',
                id: 2
              }
            ]
          },
          {
            text: '建设管理',
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '上级要求文件',
                // id，作为匹配选中状态的标识符
                id: 1
              },
              {
                text: '会议纪要',
                id: 2
              }
            ]
          },
          {
            text: '建设管理',
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '上级要求文件',
                // id，作为匹配选中状态的标识符
                id: 1
              },
              {
                text: '会议纪要',
                id: 2
              }
            ]
          },
          {
            text: '建设管理',
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '上级要求文件',
                // id，作为匹配选中状态的标识符
                id: 1
              },
              {
                text: '会议纪要',
                id: 2
              }
            ]
          }
        ],
        activeId: 1,
        activeIndex: 0
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      },
      selFileType() {
        this.show = true
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
