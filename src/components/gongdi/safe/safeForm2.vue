<template>
  <div class="qualityForm1">
    <form1>
      <template v-slot:title>
        升降机监控
      </template>
      <template v-slot:list-title>
        <van-tabs type="card" color="#1989fa" class="tabs" animated swipeable>
          <van-tab :title="item.title" v-for="item in machines">
            <div class="machine">
              <div class="m_left">
                <img class="m_img" :src="item.picUrl">
              </div>
              <div class="m_right">
                <div class="m_msg" v-for="(value,key,index) in item.msg">
                  <div class="m_msg_key">{{key}}：</div>
                  <div class="m_msg_value">{{value}}</div>
                </div>
                <div class="m_more" @click="clickMore(item.more)">查看更多</div>
              </div>
            </div>
          </van-tab>

        </van-tabs>
      </template>
      <template v-slot:list>

      </template>
    </form1>

  </div>

</template>

<script>
  import form1 from '@/components/gongdi/common/form'
  import { ImagePreview } from 'vant'

  export default {
    name: 'problemList',
    components: {
      form1
    },
    mounted() {

    },
    data() {
      return {
        machines: [
          {
            title: '升降机1', picUrl: require('@/assets/img/machine1.jpg'),
            msg: {
              '检查报告号': 'SKJG-2020-2648',
              '安装单位': '广州市明顺建筑设备有限公司',
              '产权备案编号': '粤AP-S10040',
              '安装日期': '2019-10-07'
            },
            more: 'http://39.100.94.4:38080/Wanke/static/elevator/elevator2.jpg'
          },
          {
            title: '升降机2', picUrl: require('@/assets/img/machine2.png'),
            msg: {
              '检查报告号': 'SKJG-2020-2648',
              '安装单位': '广州市明顺建筑设备有限公司',
              '产权备案编号': '粤AP-S10040',
              '安装日期': '2019-10-07'
            },
            more: 'http://39.100.94.4:38080/Wanke/static/elevator/elevator2.jpg'

          }

        ]
      }

    },
    destroyed() {

    },
    methods: {
      clickMore(more) {
        ImagePreview({
          images: [more],
          showIndex: false
        })
        // window.open(more)
      }
    }

  }
</script>

<style scoped lang="scss">
  .qualityForm1 {
    .tabs /deep/ .van-tabs__nav--card {
      margin: 0;
    }

    .tabs {
      .machine {
        background-color: white;
        height: 180px;
        display: flex;
        padding: 5px;

        .m_left {
          width: 40%;

          .m_img {
            height: 100%;
            width: 100%;
          }
        }

        .m_right {
          width: 60%;
          overflow-y: scroll;

          .m_msg {
            padding-left: 2px;

            .m_msg_key {
              white-space: nowrap;
              font-size: 14px;
              color: gray
            }

            .m_msg_value {
              font-size: 17px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              /*word-break: break-all;*/
            }
          }

          .m_more {
            font-weight: 600;
            font-size: 15px;
            color: $common_blue;
            text-decoration: underline;
          }
        }
      }
    }


  }


</style>
