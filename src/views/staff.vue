<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'人员监管'"
    ></nav-bar>

    <van-tabs class="sel_tab" v-model="active" animated swipeable>
      <tab :title="'数据统计'">
        <div class="form">
          <div class="dataBox" :style="{backgroundColor:item.bgColor}" v-for="item in dataBox">
            <div class="label">{{item.label}}</div>
            <div class="data">{{item.data}}人</div>
          </div>
          <div class="chart" id="chart1"></div>
          <div class="chart" id="chart2"></div>
        </div>
      </tab>
      <tab :title="'最新记录'">
        <div class="form">
          <staffList></staffList>
        </div>
      </tab>


    </van-tabs>

  </div>
</template>

<script>
  import staffList from '@/components/gongdi/staff/staffList'
  import navBar from '../components/navBar'
  import tab from '../components/tab'

  export default {
    name: 'staff',
    components: {
      navBar,
      tab,
      staffList
    },
    data() {
      let titleFontSize = this.$getRealPX(1.38)
      let fontSize = this.$getRealPX(1.2)
      return {
        col: 'green',
        active: 0,
        dataBox: [
          { label: '工地人员总数', data: 66, bgColor: '#1989fa' },
          { label: '管理人员', data: 12, bgColor: '#1989fa' },
          { label: '工人', data: 54, bgColor: '#1989fa' },
          { label: '今日入闸人数', data: 65 },
          { label: '今日出勤人数', data: 23 },
          { label: '今日缺勤人数', data: 1 }
        ],
        echarts1_option: {
          title: {
            left: 'center',
            text: '出入闸统计',
            textStyle: {
              //文字颜色
              // color: 'black',
              //字体风格,'normal','italic','oblique'
              fontStyle: 'normal',
              //字体粗细 'normal','bold','bolder','lighter',100 | 200 | 300 | 400...
              fontWeight: 'bold',
              //字体系列
              fontFamily: 'sans-serif',
              //字体大小
              fontSize: titleFontSize
            }
          },
          color: ['#67C23A', '#E6A23C'],
          grid: {
            // left: '3%',
            // top: '2%',
            right: '4%'
            // bottom: '3%',
            // containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {            // 坐标轴指示器，坐标轴触发有效
              type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data: ['入闸', '出闸'],
            textStyle: { //图例文字的样式
              color: 'black',
              fontSize: fontSize
            },
            left: 'center',
            bottom: 0
          },
          //X轴信息
          xAxis: [{
            type: 'category', data: ['王大锤', '王二锤', '马二锤', '大王二锤', '大王二锤1'],
            axisLabel: {
              fontSize: fontSize,
              fontFamily: '微软雅黑',
              marginTop: '35px',
              show: true
            },
            axisTick: {
              alignWithLabel: true
            }
          }
          ],
          //Y轴信息
          yAxis: [{
            type: 'value', axisLabel: {
              fontSize: fontSize,
              fontFamily: '微软雅黑',
              marginTop: '35px',
              show: true
            }
          }],
          series: [
            {
              name: '入闸',
              type: 'bar',
              barGap: 0,
              data: [300, 302, 301, 304, 290, 300]
            },
            {
              name: '出闸',
              type: 'bar',
              data: [220, 282, 291, 234, 290, 300]
            }

          ]

        }
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.initEcharts()
      })
    },
    methods: {
      initEcharts() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('chart1'))
        // 绘制图表，this.echarts1_option是数据
        let data1 = this.setChartsData('出入闸次数', ['入闸', '出闸'], ['王大锤', '王二锤', '马二锤', '二锤', '二锤1'], [
          {
            name: '入闸',
            type: 'bar',
            barGap: 0,
            data: [300, 302, 301, 304, 290, 300]
          },
          {
            name: '出闸',
            type: 'bar',
            data: [220, 282, 291, 234, 290, 300]
          }

        ])
        myChart.setOption(data1)
        let myChart2 = this.$echarts.init(document.getElementById('chart2'))
        let data2 = this.setChartsData('出勤统计', ['出勤', '缺勤'], ['王大锤', '王二锤', '马二锤', '二锤', '二锤1'], [
          {
            name: '出勤',
            type: 'bar',
            barGap: 0,
            data: [300, 302, 301, 304, 290, 300]
          },
          {
            name: '缺勤',
            type: 'bar',
            data: [220, 282, 291, 234, 290, 300]
          }

        ])
        myChart2.setOption(data2)
      },
      setChartsData(title, legend, xAxis, series) {
        let echarts_option = this._.cloneDeep(this.echarts1_option)
        echarts_option.title.text = title
        echarts_option.legend.data = legend
        echarts_option.xAxis[0].data = xAxis
        echarts_option.series = series
        return echarts_option
      },
      onClickLeft() {
        this.$router.push({ path: '/' })
      }


    }
  }
</script>

<style lang="scss">
  .staff_container {
    height: 100vh;
    width: 100%;
    position: relative;

    .nav {
      /*position: absolute;*/
      height: 46px;
    }

    .sel_tab {
      position: absolute;
      width: 100%;
      top: 46px;
      bottom: 0;
      overflow: scroll;

      .form {
        margin: 10px;
        background-color: white;
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        color: white;

        .dataBox {
          box-shadow: 0px 0px 3px #888888;
          border-radius: 5px;
          background-color: $common_fail;
          margin: 1%;
          padding: 3% 1%;
          width: 29%;
          text-align: center;

          .label {
            font-size: 16px;
          }

          .data {
            margin-top: 5px;
            font-size: 22px;
            font-weight: 600;
          }
        }

        .chart {
          margin: 10px 0;
          height: 250px;
          width: 100%;
        }
      }

    }


  }

</style>
