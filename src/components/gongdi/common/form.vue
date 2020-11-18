<template>
  <div class="form_container">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div>
      <slot name="list-title"></slot>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
    <div class="form_content">
      <div class="nothing" v-show="problems&&problems.length==0">暂无问题</div>
      <transition-group name="checkin_ani">
            <slot name="list"></slot>
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
  .form_container {
    /*width: 100%;*/
    margin: 10px;
    font-size: 16px;
    box-shadow: 0px 0px 5px #888888;
    border-radius: 6px;

    .title {
      display: flex;
      flex-direction: row;
      justify-content: center;
      text-align: center;
      height: 30px;
      line-height: 30px;
      border-radius: 6px 6px 0 0;
      background-color: #54aaff;
      color: white;


    }

    .form_content {
      max-height: 150px;
      overflow: scroll;

      .nothing {
        line-height: 30px;
        height: 30px;
        text-align: center;
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
