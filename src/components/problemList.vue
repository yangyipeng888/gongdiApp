<template>
  <div class="problem_container">
    <div class="title">
      <div class="title_time">时间</div>
      <div class="title_desc">问题描述</div>
      <div class="title_type">问题类型</div>
      <div class="title_status">状态</div>
    </div>
    <div class="problem_content">
      <div class="nothing" v-show="problems&&problems.length==0">暂无问题</div>
      <transition-group name="checkin_ani">
        <div class="problem_list" v-show="problems&&problems.length"
             v-for="pro,index in problems" :key="index">
          <div class="problem_time van-ellipsis">{{pro.timestamp}}</div>
          <div class="problem_desc van-ellipsis">{{pro.miaoshu}}</div>
          <div class="problem_type">{{pro.type}}</div>
          <div class="problem_status">
            <div class="status_txt">
              {{pro.xiufuzhuangtai}}
            </div>
          </div>
        </div>
      </transition-group>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'problemList',
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
      getwentiList() {
        let id = this.$store.state.currentSite
        this.$Spi.getwentiList(id).then((res) => {
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
  .problem_container {
    /*width: 100%;*/
    margin: 10px;
    font-size: 16px;
    box-shadow: 0px 0px 5px #888888;
    border-radius: 6px;

    .title {
      display: flex;
      flex-direction: row;
      text-align: center;
      height: 30px;
      line-height: 30px;
      border-radius: 6px 6px 0 0;
      background-color: #54aaff;
      color: white;

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

    .problem_content {
      min-height: 30px;
      max-height: 90px;
      overflow: scroll;

      .nothing {
        line-height: 30px;
        height: 30px;
        text-align: center;
      }

      .problem_list:nth-child(2n) {
        background-color: #F8F6F7;
      }

      .problem_list {
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
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
            width: 70%;
            height: 80%;
            background-color: $common_fail;
            font-size: 15px !important;
          }
        }
      }
    }


  }


  .checkin_ani-move {
    transition: transform 1s ease;
  }

  /*.checkin_ani-enter-to,*/
  /*.checkin_ani-enter-leave-to {*/
  /*  transition: transform 1s ease;*/
  /*}*/
  .checkin_ani-leave-active,
  .checkin_ani-enter-active {
    transition: transform 1s ease;
  }

  .checkin_ani-enter {
    transform: translateY(-100%);
  }

  .checkin_ani-leave-to {
    transform: translateY(100%);
  }

</style>
