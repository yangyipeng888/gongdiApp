<template>
  <div id="project_progress" @mouseenter="stopAni" @mouseleave="setAni()">
    <div style="opacity: 0" :class="{pop_ani_show:tab%4 == 0,pop_ani_hide:tab%4 != 0}" class="progress_pannel">
      <div class="chart">
        <van-circle class="circle" size="100%" :stroke-width="80"
                    v-model="zijinRate"
                    :rate="zijinRate1"
                    :text="zijinText"
        />
      </div>
      <div class="list">
        <div class="list_title">累计完成投资：</div>
        <div class="list_content">{{noZero(detail.leijiwancheng)}}（万元）</div>
        <div class="list_title">截止去年完成投资：</div>
        <div class="list_content">{{noZero(detail.jiezhiwancheng)}}（万元）</div>
        <div class="list_title">本年度完成投资：</div>
        <div class="list_content">{{noZero(detail.nianduwancheng)}}（万元）</div>
      </div>
    </div>
    <div style="opacity: 0" :class="{pop_ani_show:tab%4 == 1,pop_ani_hide:tab%4 != 1}" class="progress_pannel">
      <div class="chart" ref="pieChart1"></div>
      <div class="list">
        <div class="list_item">
          <div class="color" :style="{backgroundColor:color[0]}"></div>
          <div class="name">累计完成投资：</div>
          <div class="num">{{noZero(detail.gongzuoliangnianduwancheng)}}</div>
        </div>
        <div class="list_item">
          <div class="color" :style="{backgroundColor:color[1]}"></div>
          <div class="name">截至去年完成投资：</div>
          <div class="num">{{noZero(detail.jiezhiwancheng)}}</div>
        </div>
        <div class="list_item">
          <div class="color" :style="{backgroundColor:color[2]}"></div>
          <div class="name">年度投资计划投资：</div>
          <div class="num">{{noZero(detail.niandutouzijihua)}}</div>
        </div>
        <div class="list_item">
          <div class="color" :style="{backgroundColor:color[3]}"></div>
          <div class="name">本年度完成投资：</div>
          <div class="num">{{noZero(detail.nianduwancheng)}}</div>
        </div>
      </div>
    </div>
    <div style="opacity: 0" :class="{pop_ani_show:tab%4 == 2,pop_ani_hide:tab%4 != 2}" class="progress_pannel">
      <div class="chart">
        <van-circle class="circle" size="100%" :stroke-width="80"
                    v-model="workRate"
                    :rate="workRate1"
                    :text="workText"
        />
      </div>
      <div class="list">
        <div class="list_title">累计完成工作量：</div>
        <div class="list_content">{{noZero(detail.gongzuoliangleijiwancheng)}}（万元）</div>
        <div class="list_title">截止去年完成工作量：</div>
        <div class="list_content">{{noZero(detail.gongzuoliangjiezhiwancheng)}}（万元）</div>
        <div class="list_title">本年度完成工作量：</div>
        <div class="list_content">{{noZero(detail.gongzuoliangnianduwancheng)}}（万元）</div>
      </div>
    </div>
    <div style="opacity: 0" :class="{pop_ani_show:tab%4 == 3,pop_ani_hide:tab%4 != 3}" class="progress_pannel">
      <div class="chart" ref="pieChart2"></div>
      <div class="list">
        <div class="list_item">
          <div class="color" :style="{backgroundColor:color[0]}"></div>
          <div class="name">累计完成工作量：</div>
          <div class="num">{{noZero(detail.gongzuoliangleijiwancheng)}}</div>
        </div>
        <div class="list_item">
          <div class="color" :style="{backgroundColor:color[1]}"></div>
          <div class="name">截至去年完成工作量：</div>
          <div class="num">{{noZero(detail.gongzuoliangjiezhiwancheng)}}</div>
        </div>
        <div class="list_item">
          <div class="color" :style="{backgroundColor:color[2]}"></div>
          <div class="name">年度投资计划工作量：</div>
          <div class="num">{{noZero(detail.niandutouzijihua)}}</div>
        </div>
        <div class="list_item">
          <div class="color" :style="{backgroundColor:color[3]}"></div>
          <div class="name">本年度完成工作量：</div>
          <div class="num">{{noZero(detail.gongzuoliangnianduwancheng)}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

  import echarts from 'echarts'
  import { Spi } from '../api/api'

  export default {
    name: 'progress-module',
    created() {
      this.setAni()
    },
    data() {
      return {
        color: ['#50E3C2', '#FE8786', '#FFB544','#C28ADF'],
        tab: 2,
        ani: null,
        detail: {
          leijiwancheng: '',
          jiezhiwancheng: '',
          nianduwancheng: '',
          niandutouzijihua: '',
          gongzuoliangleijiwancheng: '',
          gongzuoliangjiezhiwancheng: '',
          gongzuoliangnianduwancheng: ''

        },
        info: null,
        zijinRate: 0,
        workRate: 0
      }
    },
    watch: {},
    mounted() {
      var that = this
      let curId = this.$store.state.currentSite
      if (curId) {
        Spi.getDetail(curId).then((response) => {
          that.detail = response
          let ref1 = that.$refs.pieChart1
          let title1 = 234234
          let value1 = [
            {
              value: that.detail.leijiwancheng,
              name: ''
            },
            {
              value: that.detail.jiezhiwancheng,
              name: ''
            },
            {
              value: that.detail.niandutouzijihua,
              name: ''
            },
            {
              value: that.detail.nianduwancheng,
              name: ''
            }
          ]
          that.createChart(ref1, title1, value1)
          let ref2 = that.$refs.pieChart2
          let title2 = 234234
          let value2 = [
            {
              value: that.detail.leijiwancheng,
              name: ''
            },
            {
              value: that.detail.jiezhiwancheng,
              name: ''
            },
            {
              value: that.detail.niandutouzijihua,
              name: ''
            },
            {
              value: that.detail.nianduwancheng,
              name: ''
            }
          ]
          that.createChart(ref2, title2, value2)
        })
      }


    },

    computed: {
      zijinRate1() {
        return this.divide(this.detail.nianduwancheng, this.detail.niandutouzijihua)
      },
      zijinText() {
        return this.divide(this.detail.nianduwancheng, this.detail.niandutouzijihua) + '%'
      },
      workRate1() {
        return this.divide(this.detail.gongzuoliangnianduwancheng, this.detail.niandutouzijihua)
      },
      workText() {
        return this.divide(this.detail.gongzuoliangnianduwancheng, this.detail.niandutouzijihua) + '%'
      }
    },
    methods: {
      createChart(dom, title, value) {
        let chart = echarts.init(dom)

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
          color: this.color,
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
      divide(a, b) {
        if (b != 0) {
          return (parseFloat(a) / parseFloat(b) * 100).toFixed(2)
        }
        return 0
      },
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
          padding: 1px;

        }

        .list_content {
          font-size: 16px;
          color: gray;
          padding: 1px;

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
