<template>
  <div class="qualityForm1">
    <form1>
      <template v-slot:title>
        {{title}}
      </template>
      <template v-slot:list-title>
        <div class="listTitle">
          <div class="title_time">时间</div>
          <div class="title_type">类型</div>
          <div class="title_status">状态</div>
          <div class="title_opera">操作</div>
        </div>
      </template>
      <template v-slot:list>

        <div class="problem_list" v-show="gongdanList&&gongdanList.length"
             v-for="pro,index in gongdanList" :key="index">
<!--          {{pro.order.orderInfo.id}}-->
          <div class="problem_time van-ellipsis">{{showTime(pro.work.createTime)}}</div>
          <div class="problem_type van-ellipsis">{{pro.work.nodeType}}</div>
          <div class="problem_status">
            <div class="status_txt" :class="bindStateClass(pro.work.nodeState)">
              {{showNodeState(pro.work.nodeState)}}
            </div>
          </div>
          <div @click="clickMore(pro)" class="problem_opera">查看</div>

        </div>
      </template>
    </form1>
  </div>

</template>

<script>
  import form1 from '@/components/gongdi/common/form'

  export default {
    name: 'problemForm',
    props: {
      title: {
        type: String,
        default: '工单'
      },
      gongdanList: {
        type: Array,
        default: []
      }
    },
    components: {
      form1
    },
    mounted() {

    },
    methods: {
      bindStateClass(nodeState) {
        switch (nodeState) {
          case this.myConst.GD_NODE_STATE.NOT:
            return { status_nok: true }
          case this.myConst.GD_NODE_STATE.BACK:
            return { status_nok: true }
          case this.myConst.GD_NODE_STATE.WAITING:
            return { status_appoint: true }
          default:
            return { status_ok: true }

        }
      },
      showTime(time) {
        return new Date(time).toLocaleDateString().split(' ')[0]
      },
      showNodeState(nodeState) {
        return this.myConst.GD_NODE_STATE_LABEL[nodeState]
      },
      clickMore(pro) {
        this.$router.push({
          name: 'problemDetails',
          params: pro
        })
      }
    },
    data() {
      return {}

    }
  }
</script>

<style scoped lang="scss">
  .qualityForm1 {

    .listTitle {
      display: flex;
      flex-direction: row;
      text-align: center;
      height: 30px;
      line-height: 30px;

      .title_time {
        width: 30%;
      }

      .title_type {
        width: 25%;
      }

      .title_status {
        width: 25%;

      }

      .title_opera {
        width: 20%;

      }
    }

    .problem_list:nth-child(2n) {
      background-color: #F8F6F7;
    }

    .problem_list {
      background-color: white;
      display: flex;
      flex-direction: row;
      text-align: center;
      height: 30px;
      line-height: 30px;

      .problem_time {
        width: 30%;
      }

      .problem_type {
        width: 25%;
      }

      .problem_status {
        width: 25%;

        display: flex;
        justify-content: center;
        align-items: center;

        .status_txt {
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5px;
          width: 70%;
          height: 80%;
          font-size: 15px !important;
        }

        .status_ok {
          background-color: $common_success;
        }

        .status_nok {
          background-color: $common_fail;
        }

        .status_appoint {
          background-color: $common_warning;
        }
      }

      .problem_opera {
        width: 20%;
        color: $common_blue;

      }
    }

    .dialogBox {
      width: 95vw;
      max-height: 80vh;
      border-radius: 5px;
      overflow: scroll;

      .cellBox {
        display: flex;
        justify-content: space-between;
        font-size: 16px;

        .cell_label {
          color: $common_gray;
        }

        .cell_value {
          font-weight: 600;
        }
      }
    }
  }


</style>
