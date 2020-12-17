<template>
  <div class="wrap">
    <img class="alarm" src="../assets/img/alarm.png">
    <div class="text">
      当前有<label style="color:indianred;font-weight: bold;">{{count}}</label>条未处理工单,请前往我的工单处理
    </div>
    <div class="btn" @click="handleEnter">
      <h4>前往</h4>
    </div>
  </div>
</template>

<script>
  import problemUtil from '@/views/problems/common'

  export default {
    name: 'notify',
    props:['count'],
    data() {
      return {

      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
      handleEnter() {
        this.$router.push({
          name: 'myProblems',
          params: { active: 2 }
        })

      },
    }
  }
</script>

<style scoped lang="scss">
  .wrap {
    position: absolute;
    z-index: 999;
    border-radius: 3px;
    top: 5%;
    left: 50%;
    transform: translateX(-50%);
    width: 95%;
    height: 7vh;
    padding: 3px;
    background-color: white;
    box-shadow: 0px 0px 8px #888888;
    display: flex;
    justify-content: center;
    align-items: center;

    .alarm {
      height: 80%;
    }

    .text {
      width: 70%;
      font-size: 16px;
      padding: 0 7px;
    }

    .btn {
      h4 {
        padding: 0;
        margin: 0;
      }

      width: 20%;
      height: 4vh;
      line-height: 4vh;
      font-weight: normal;
      font-size: 18px;
      background-color: white;
      text-align: center;
      color: #1989fa;
      border-radius: 10px;
      border: 1.5px solid #1989fa;
    }
  }
</style>
