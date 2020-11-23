<template>
  <div class="qualityForm1">
    <form1>
      <template v-slot:title>
        浇筑情况
      </template>
      <template v-slot:list-title>
        <div class="listTitle">
          <div class="title_time">时间</div>
          <div class="title_desc">问题描述</div>
          <div class="title_type">形象进度</div>
          <div class="title_status">操作</div>
        </div>
      </template>
      <template v-slot:list>
        <div class="problem_list" v-show="problems&&problems.length"
             v-for="pro,index in problems" :key="index" @click="clickPro(pro)">
          <div class="problem_time van-ellipsis">{{pro.timestamp}}</div>
          <div class="problem_desc van-ellipsis">{{pro.miaoshu}}</div>
          <div class="problem_status">
            <div class="status_txt" :class="{status_ok:pro.xiufuzhuangtai==myConst.problem_status.OK,status_nok:pro.xiufuzhuangtai==myConst.problem_status.NOT_OK,
            status_appoint:pro.xiufuzhuangtai==myConst.problem_status.NOT_APPOINT,}">
              良好
            </div>
          </div>
          <div @click="clickMore" class="problem_type">查看</div>

        </div>
      </template>
    </form1>
    <van-popup round v-model="showDialog">
      <div class="dialogBox">
        <van-cell>
          <template>
            <div class="cellBox">
              <span class="custom-title cell_label">浇筑部位</span>
              <span class="custom-title cell_value">1#楼P-L轴交6-10轴9层梁板</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <div class="cellBox">
              <span class="custom-title cell_label">形象进度</span>
              <span class="custom-title cell_value">完好</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <div class="cellBox">
              <span class="custom-title cell_label">浇筑开始时间</span>
              <span class="custom-title cell_value">2019-12-16 03:00</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <div class="cellBox">
              <span class="custom-title cell_label">浇筑结束时间</span>
              <span class="custom-title cell_value">2019-12-16 18:00</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <div class="cellBox">
              <span class="custom-title cell_label">天气</span>
              <span class="custom-title cell_value">无雨</span>
            </div>
          </template>
        </van-cell>
        <van-cell>
          <template>
            <div class="cellBox">
              <span class="custom-title cell_label">浇筑量（m3）</span>
              <span class="custom-title cell_value">160.0</span>
            </div>
          </template>
        </van-cell>
      </div>

    </van-popup>
  </div>

</template>

<script>
  import form1 from '@/components/gongdi/common/form'

  export default {
    name: 'problemList',
    components: {
      form1
    },
    mounted() {
      // this.timeId = setInterval(() => {
      //   this.problems.unshift(
      //     { time: '2020-6-6', type: 1, desc: Math.random() + 'xx工地xx人员没佩戴安全帽子' }
      //   )
      // }, 1000)
      this.getwentiList()
    },
    destroyed() {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
    },
    methods: {
      clickPro(item) {
      },
      clickMore() {
        this.showDialog = true
      },
      getwentiList() {
        let projectIds = this.$store.state.currentSite
        let account = this.$store.state.loginData.account
        let quanxian = this.$store.state.right
        let req = { projectIds, account, quanxian }
        this.$Spi.getwentiList(req).then((res) => {
          res.reverse()
          this.problems = res
          this.problems.forEach((item) => {
            item.timestamp = item.timestamp.split(' ')[0]
          })
        })
      }
    },
    data() {
      return {
        showDialog: false,
        timeId: null,
        problems: []
      }

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
        width: 25%;
      }

      .title_desc {
        width: 35%;
      }

      .title_type {
        width: 20%;

      }

      .title_status {
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
        width: 25%;
      }

      .problem_desc {
        width: 35%;
      }

      .problem_type {
        width: 20%;
        color: $common_blue;

      }

      .problem_status {
        width: 20%;
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
