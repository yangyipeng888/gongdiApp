<template>
  <div id="project_progress" @mouseenter="stopAni" @mouseleave="setAni()">
    <div style="opacity: 0" :class="{pop_ani_show:tab%3 == 0,pop_ani_hide:tab%3 != 0}" class="progress_pannel" >
      <div class="chart">
        <van-circle class="circle" size="100%" :stroke-width="60"
                    v-model="currentRate" :rate="30" :speed="100" :text="text"/>
      </div>
      <div class="list">
        <div class="list_title">累计完成：</div>
        <div class="list_content">1111111万元</div>
        <div class="list_title">截止去年完成：</div>
        <div class="list_content">2222222</div>
      </div>
    </div>
    <div style="opacity: 0" :class="{pop_ani_show:tab%3 == 1,pop_ani_hide:tab%3 != 1}" class="progress_pannel" >
      <div class="chart">
        <van-circle class="circle" size="100%" :stroke-width="60"
                    v-model="currentRate" :rate="30" :speed="100" :text="text"/>
      </div>
      <div class="list">
        <div class="list_title">累计完成：</div>
        <div class="list_content">1111111万元</div>
        <div class="list_title">截止去年完成：</div>
        <div class="list_content">3333333</div>
      </div>
    </div>
    <div style="opacity: 0" :class="{pop_ani_show:tab%3 == 2,pop_ani_hide:tab%3 != 2}" class="progress_pannel" >
      <div class="chart" ref="pieChart">

      </div>
      <div class="list">
        <div class="list_item">
          <div class="color"></div>
          <div class="name">累计完成：</div>
          <div class="num">100000.0</div>
        </div>
        <div class="list_item">
          <div class="color"></div>
          <div class="name">截至去年完成：</div>
          <div class="num">100000.0</div>
        </div>
        <div class="list_item">
          <div class="color"></div>
          <div class="name">年度投资计划：</div>
          <div class="num">100000.0</div>
        </div>
        <div class="list_item">
          <div class="color"></div>
          <div class="name">本年度完成：</div>
          <div class="num">100000.0</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import echarts from 'echarts'

  export default {
    name: 'progress-module',
    created() {
      this.setAni()
    },
    watch: {
      '$store.state.currentSite': {
        handler(n, o) {
          var that = this
          let curId = n
          this.$Spi.getDetail(curId).then(function(response) {
            that.detail = response
          })
        },
        deep: true,
        immediate: true
      }
    },
    mounted() {
      let ref = this.$refs.pieChart
      let chart = echarts.init(ref)
      let title = 'sfsdfdsffdfsd'
      let value = [
        {
          value: 20,
          name: ''
        },
        {
          value: 80,
          name: ''
        },
        {
          value: 80,
          name: ''
        },
        {
          value: 80,
          name: ''
        }
      ]
      var option = {
        title: {
          text: title,
          x: 'center',
          bottom: 'middle',
          textStyle: {
            fontSize: '28',
            color: 'black'
            // color: "#2e75b6"
          }
        },
        // color: ["#5b9bd5", "#cccccc"],
        color: ['#00D600', '#FFAD33'],
        series: [{
          type: 'pie',
          radius: ['80%', '100%'],
          center: ['50%', '50%'],
          data: value,
          label: false
        }]
      }
      chart.setOption(option)
    },
    data() {
      return {
        tab: 2,
        ani: null,
        detail: null,
        currentRate: 40,
        text: '123'
      }
    },
    computed: {},
    methods: {
      stopAni() {
        clearInterval(this.ani)
      },
      setAni() {
        var that = this
        this.ani = null
        this.ani = setInterval(function() {
          that.tab += 1
        }, 5000)
      },
      trans(spe, total) {
        var perc = parseFloat(spe) / parseFloat(total) * 100
        perc = perc.toFixed(2) + '%'
        return perc
      },
      // trans(str) {
      //   var perc = parseFloat(str);
      //   if (perc > 100) {
      //     perc = 100
      //   }
      //   return perc.toFixed(2) + "%"
      // },
      noZero(num) {
        if (!num || num == '无') {
          return 0
        }
        return num
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  #project_progress {
    height: 100%;
    width: 100%;
    color: black;
    background-color: white;
    position: relative;
    .progress_pannel {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      justify-content: space-around;

      .chart {
        width: 40%;
        padding: 20px;

        .circle {
          /*width: 100%;*/
          /*height: 100%;*/
        }
      }

      .list {
        width: 60%;
        display: flex;
        flex-direction: column;

        justify-content: center;

        .list_title {
          font-size: 18px;
          font-weight: 500;
          padding: 3px;

        }

        .list_content {
          font-size: 16px;
          color: gray;
          padding: 3px;

        }

        .list_item {
          margin: 3px 0;
          display: flex;
          flex-direction: row;
          align-content: center;
          font-size: 16px;
          color: gray;

          .color {
            border-radius: 2px;
            width: 20px;
            height: 20px;
            background-color: orange;
          }

          .name {

          }

          .num {

          }
        }
      }
    }


  }

  /*--------------------------隐藏div动画*/
  .pop_ani_show {
    animation: pop_ani_show 1s;
    animation-fill-mode: forwards;
  }

  .pop_ani_hide {
    animation: pop_ani_hide 1s;
    animation-fill-mode: forwards;
  }

  @keyframes pop_ani_show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;

    }
  }

  @keyframes pop_ani_hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }

</style>
