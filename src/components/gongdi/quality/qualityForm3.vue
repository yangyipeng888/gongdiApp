<template>
  <div class="qualityForm1">
    <form1>
      <template v-slot:title>
        现场巡检情况
      </template>
      <template v-slot:list-title>
        <div class="listTitle">
          <div class="title_time">时间</div>
          <div class="title_desc">问题描述</div>
          <div class="title_type">问题类型</div>
          <div class="title_status">操作</div>
        </div>
      </template>
      <template v-slot:list>
        <div class="problem_list" v-show="problems&&problems.length"
             v-for="pro,index in problems" :key="index" @click="clickPro(pro)">
          <div class="problem_time van-ellipsis">{{pro.timestamp}}</div>
          <div class="problem_desc van-ellipsis">{{pro.miaoshu}}</div>
          <div class="problem_type">{{pro.type}}</div>
          <div class="problem_status">
            <div class="status_txt" :class="{status_ok:pro.xiufuzhuangtai==myConst.problem_status.OK,status_nok:pro.xiufuzhuangtai==myConst.problem_status.NOT_OK,
            status_appoint:pro.xiufuzhuangtai==myConst.problem_status.NOT_APPOINT,}">
              查看
            </div>
          </div>
        </div>
      </template>
    </form1>

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
  }


</style>
