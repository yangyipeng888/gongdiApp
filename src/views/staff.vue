<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'人员监管'"
    ></nav-bar>

    <van-tabs class="sel_tab" v-model="active" animated>
      <tab :title="'数据统计'">
        <div class="form">
          <div class="dataBox" v-for="item in dataBox">
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
      return {
        active: 0,
        dataBox: [
          { label: '今日入闸人数', data: 34 },
          { label: '今日出勤人数', data: 34 },
          { label: '今日缺勤人数', data: 34 },
          { label: '工地人员总数', data: 34 },
          { label: '管理人员', data: 34 },
          { label: '工人', data: 34 }

        ],
        echarts1_option: {

          title: {
            text: '基本信息',
            subtext: '虚假数据'
          },
          tooltip: {
            trigger: 'axis'
          },
          color: ['rgba(31,13,230,0.95)', '#ff475d', '#49ef18', '#efeb23'],
          legend: [
            {
              data: ['学历层次', '职业技能']
            },
            {
              top: 20,
              data: ['业绩成果', '专业经历']
            }

          ],
          toolbox: {
            show: true,
            feature: {
              dataView: {
                show: true, readOnly: true,
                optionToContent: function(opt) {
                  let axisData = opt.xAxis[0].data //坐标数据
                  let series = opt.series //折线图数据
                  let tdHeads = '<td  style="padding: 0 10px">时间</td>' //表头
                  let tdBodys = '' //数据
                  series.forEach(function(item) {
                    //组装表头
                    tdHeads += `<td style="padding: 0 10px">${item.name}</td>`
                  })
                  let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`
                  for (let i = 0, l = axisData.length; i < l; i++) {
                    for (let j = 0; j < series.length; j++) {
                      //组装表数据
                      tdBodys += `<td>${series[j].data[i]}</td>`
                    }
                    table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`
                    tdBodys = ''
                  }
                  table += '</tbody></table>'
                  return table
                }
              },
              magicType: { show: true, type: ['line', 'bar'] },
              restore: { show: true },
              saveAsImage: { show: true }
            }
          },
          calculable: true,
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
            }
          ],
          yAxis: [
            {
              type: 'value'
            }
          ],
          series: [
            {
              name: '学历层次',
              type: 'bar',
              stack: '个人信息',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
              markPoint: {
                data: [
                  { type: 'max', name: '最大值' },
                  { type: 'min', name: '最小值' }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            },
            {
              name: '职业技能',
              type: 'bar',
              stack: '个人信息',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
              markPoint: {
                data: [
                  { name: '年最高', value: 182.2, xAxis: 7, yAxis: 183 },
                  { name: '年最低', value: 2.3, xAxis: 11, yAxis: 3 }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            },
            {
              name: '业绩成果',
              type: 'bar',
              stack: '个人信息',
              data: [2.0, 6.0, 7.0, 20.4, 21.7, 60.7, 135.6, 152.2, 56.7, 15.8, 7.0, 2.3],
              markPoint: {
                data: [
                  { name: '年最高', value: 152.2, xAxis: 7, yAxis: 153 },
                  { name: '年最低', value: 2.0, xAxis: 1, yAxis: 2 }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
            },
            {
              name: '专业经历',
              type: 'bar',
              stack: '个人信息',
              data: [1.0, 6.9, 9.0, 36.4, 48.7, 90.7, 100.6, 122.2, 40.7, 8.8, 6.0, 2.3],
              markPoint: {
                data: [
                  { name: '年最高', value: 122.2, xAxis: 7, yAxis: 123 },
                  { name: '年最低', value: 1.0, xAxis: 1, yAxis: 1 }
                ]
              },
              markLine: {
                data: [
                  { type: 'average', name: '平均值' }
                ]
              }
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
        myChart.setOption(this.echarts1_option)
        let myChart2 = this.$echarts.init(document.getElementById('chart2'))
        myChart2.setOption(this.echarts1_option)

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
          height: 300px;
          width: 100%;
        }
      }

    }


  }

</style>
