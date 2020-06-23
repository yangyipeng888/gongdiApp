<template>
  <div class="problem_container">
    <div class="title">
      <div class="title_time">时间</div>
      <div class="title_desc">问题描述</div>
      <div class="title_type">问题类型</div>
    </div>
    <div class="problem_content">
      <transition-group name="checkin_ani">
        <div class="problem_list" v-for="pro,index in problems" :key="index">
          <div class="problem_time">{{pro.time}}</div>
          <div class="problem_desc van-ellipsis">{{pro.desc}}</div>
          <div class="problem_type">{{pro.type}}</div>
        </div>
      </transition-group>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'problemList',
    mounted() {
      this.timeId = setInterval(() => {
        this.problems.unshift(
          { time: '2020-6-6', type: 1, desc: Math.random() + 'xx工地xx人员没佩戴安全帽子' }
        )
      }, 10000)
    },
    destroyed() {
      if (this.timeId) {
        clearInterval(this.timeId)
      }
    },
    data() {
      return {
        timeId: null,
        problems: [
          { time: '2020-6-6', type: 1, desc: 'xx工地xx人员没佩戴安全帽子111' },
          { time: '2020-6-6', type: 1, desc: 'xx工地xx人员没佩戴安全帽子111' },
          { time: '2020-6-6', type: 1, desc: 'xx工地xx人员没佩戴安全帽子111' },
          { time: '2020-6-6', type: 1, desc: 'xx工地xx人员没佩戴安全帽子111' },
          { time: '2020-6-6', type: 1, desc: 'xx工地xx人员没佩戴安全帽子111' },

        ]
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
        width: 20%;
      }

      .title_desc {
        width: 60%;
      }

      .title_type {
        width: 20%;

      }
    }

    .problem_content {
      min-height: 150px;
      max-height: 150px;
      overflow: scroll;

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
          width: 20%;
        }

        .problem_desc {
          width: 60%;
        }

        .problem_type {
          width: 20%;

        }
      }
    }


  }


  .checkin_ani-move {
    transition: transform 1s ease;
  }

  .checkin_ani-enter,
  .checkin_ani-enter-to,
  .checkin_ani-enter-leave,
  .checkin_ani-enter-leave-to {
    transition: transform 1s ease;
  }

  .checkin_ani-enter {
    transform: translateY(-100%);
  }


</style>
