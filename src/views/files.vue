<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'文件管理'"
               :show-right="true"
               :onClickRightHandler="selFileType"
      ></nav-bar>
      <div class="content">
        <!--        <van-button class="sel_btn" type="info" @click="selFileType">选择文件</van-button>-->
        <van-empty class="empty" v-show="!contents" description="暂无文件"></van-empty>
        <div class="files" v-show="contents">
          <div class="sel_title">{{selTitle}}:</div>
          <van-grid :column-num="3" :border="false">
            <van-grid-item v-for="item in contents" @click="openFile(item.url)">
              <div class="file_item">
                <van-image fit="fill" :src="require('../assets/img/file.png')"/>
                <div class="file_name">
                  {{item.desc}}
                </div>
              </div>
            </van-grid-item>
          </van-grid>

        </div>
      </div>

    </div>
    <van-popup v-model="showPop" position="bottom" :style="{ height: '45%' }">
      <!--      <van-tree-select-->
      <!--        class="tree"-->
      <!--        :items="items"-->
      <!--        :active-id.sync="activeId"-->
      <!--        :main-active-index.sync="activeIndex"-->
      <!--        @click-item="getFileList"-->
      <!--      />-->
      <tree-select :items="items" :getFileList="getFileList">
      </tree-select>
    </van-popup>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import navBar from '../components/navBar'
  import treeSelect from '../components/treeSelect'

  export default {
    name: 'files',
    components: {
      navBar,
      treeSelect
    },
    data() {
      return {
        showPop: false,
        contents: null,
        selTitle: '',
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
              },
              {
                text: '用地审批文件',
                id: 3
              },
              {
                text: '施工许可文件',
                id: 4
              },
              {
                text: '其他文件',
                id: 5
              }
            ]
          },
          {
            text: '招投标文件',
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '招投标文件',
                // id，作为匹配选中状态的标识符
                id: 6
              },
            ]
          },
          {
            text: '合同管理',
            // 该导航下所有的可选项
            children: [
              {
                text: '合同管理',
                id: 7
              },
            ]
          },
          {
            text: '资金支付',
            // 该导航下所有的可选项
            children: [
              {
                text: '资金支付',
                id: 8
              },
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
                id: 9
              },
              {
                text: '相关单位来往文件',
                id: 10
              },
              {
                text: '会议纪要',
                id: 11
              },
              {
                text: '其他',
                id: 12
              }
            ]
          },
          {
            text: '其他',
            // 该导航下所有的可选项
            children: [
              {
                // 名称
                text: '其他材料',
                // id，作为匹配选中状态的标识符
                id: 13
              },
              {
                text: '效果图',
                id: 14
              },
              {
                text: '现场照片',
                id: 15
              }
            ]
          },
        ],
        activeId: 0,
        activeIndex: 0
      }
    },
    mounted() {
      setTimeout(() => {
        this.showPop = true
      }, 500)
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      },
      openFile(url) {
        window.open(url)
      },
      selFileType() {
        this.showPop = true
      },
      getFileList(value) {
        this.selTitle = value.text
        let type = value.id
        this.showPop = false
        this.$Spi.getFileList(
          this.$store.state.currentSite,
          type,
          1,
          50
        ).then((response) => {
          if (response.length == 0) {
            Toast.fail('没有找到文件！')
            return
          }
          response.forEach((item) => {
            let desc = item.url.split('/')
            item.desc = desc[desc.length - 1]
          })
          this.contents = response
          Toast.success('获取成功！')
        }).catch(function(response) {
          Toast.fail('获取失败！')
        })
      }
    }
  }
</script>

<style lang="scss">
  .files_container {
    .van-grid-item__content {
      background-color: #f8f8f8;
    }

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

          .sel_title {
            font-size: 18px;
            font-weight: 600;
            padding: 5px 0 0 10px;
          }

          .file_item {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;

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
