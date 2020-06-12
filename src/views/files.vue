<template>
  <div class="files_container">
    <div class="files_main">
      <van-nav-bar
        class="navbar"
        title="文件管理"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
      <van-empty class="empty" description="暂无文件"/>
    </div>
    <van-button class="sel_btn" type="info" @click="selFileType">默认按钮</van-button>
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

<style scoped lang="scss">
  .files_container {
    height: 100vh;
    width: 100%;
    position: relative;

    .files_main {
      height: 100%;
      display: flex;
      flex-direction: column;
      .navbar {

      }

      .empty {
      }
    }
    .sel_btn {
      position: absolute;
      z-index: 100;
      top: 0;
      right: 0;
    }

    .tree {
      height: 100% !important;
    }
  }

</style>
