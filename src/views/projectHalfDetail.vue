<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'半月报概况'"
               :show-right="true"
               :onClickRightHandler="selFileType"
      ></nav-bar>
      <van-tabs class="sel_tab" v-model="active" animated swipeable sticky>
        <tab :title="'资金进度'">
          <div class="form">
            <div class="form_item van-hairline--bottom" v-for="(item,key,index) in ziJinObj">
              <div class="form_title">{{key}}</div>
              <div class="form_desc">{{item}}(万元)</div>
            </div>

          </div>
        </tab>
        <tab :title="'进展情况'">
          <div class="form">
            <div class="form_item van-hairline--bottom" v-for="item in jinduObj.list">
              <div class="form_title">{{item.title}}：</div>
              <div class="form_desc">{{item.pros}}</div>
            </div>
          </div>
        </tab>
        <tab :title="'项目问题'">
          <div class="form">
            <div class="form_item van-hairline--bottom" v-show="problemList" v-for="item in problemList">
              <div class="form_title">{{item.title}}：</div>
              <div class="form_desc">
                备注：{{item.pros.beizhu}}<br>
                计划：{{item.pros.jihua}}<br>
                解决建议：{{item.pros.jiejuejianyi}}
              </div>

            </div>
          </div>
        </tab>

      </van-tabs>

    </div>
    <van-popup v-model="showPop" position="bottom" :style="{ height: '38%' }">
      <van-picker
        title="选择时间"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import navBar from '../components/navBar'
  import tab from '../components/tab'

  export default {
    name: 'files',
    components: {
      navBar,
      tab
    },
    mounted() {
      let id = this.$store.state.currentSite
      this.$Spi.getbanyuebaobyprojectId(id).then((res) => {
        let data = res
        let sel = []
        for (let i = 0; i < data.length; i++) {
          sel.push(data[i])
        }
        let values = []
        this.columns = [
          {
            values,
            defaultIndex: 0
          }
        ]
        sel.forEach((item) => {
          values.push(this.date2Text(item.createTime))
        })
      })
    },
    data() {
      return {
        active: 0,
        showPop: false,
        columns: null,
        ziJinObj: null,
        jinduObj: { list: null },
        problemList: null
        // problemList: [
        //   {
        //     title: null,
        //     pros: { beizhu: null, jiejuejianyi: null, jihua: null }
        //   }
        // ]
      }
    },
    methods: {
      selFileType() {
        this.showPop = true
      },
      onConfirm(values, index) {
        let createtime = this.text2Date(values[0])
        this.showPop = false
        let id = this.$store.state.currentSite
        this.$Spi.getCzwtByProjectId(id, createtime).then((res) => {
          let prolist = []
          let list = res.data.czwtData
          if (list && list.length) {
            for (let i = 0; i < list.length; i++) {
              let pros = JSON.parse(list[i].wtx)[0]
              let title = list[i].title
              prolist.push({ title, pros })
            }
          }
          this.problemList = prolist

          //左边要展示的内容
          let jinduObj = { title: '进展情况', show: true, list: [] }
          let jinduList = res.data.jinduData
          if (jinduList && jinduList.length) {
            for (let i = 0; i < jinduList.length; i++) {
              let pros = JSON.parse(jinduList[i].jdx)
              let title = jinduList[i].title
              let show = true
              jinduObj.list.push({ title, pros, show })
            }
          }
          this.jinduObj = jinduObj

          let obj = {}
          let zijinObj = res.data.zijin[0]
          for (let key in zijinObj) {
            if (key == 'dangnianwanchenggongzuoliang') {
              obj['当年完成工作量：'] = zijinObj[key]
              // pros.push('当年完成工作量：' + zijinObj[key] + '(万元)')
            } else if (key == 'dangnianwanchengzijin') {
              obj['当年完成资金：'] = zijinObj[key]
              // pros.push('当年完成资金：' + zijinObj[key] + '(万元)')
            } else if (key == 'leijiwancheng') {
              obj['累计完成：'] = zijinObj[key]
              // pros.push('累计完成：' + zijinObj[key] + '(万元)')
            } else if (key == 'zongzijin') {
              obj['总资金：'] = zijinObj[key]
              // pros.push('总资金：' + zijinObj[key] + '(万元)')
            }
          }
          this.ziJinObj = obj

        })
      },
      onChange(picker, value, index) {
      },
      onCancel() {
        this.showPop = false
      },
      onClickLeft() {
        this.$router.back(-1)
      },
      text2Date(str) {
        let index1 = str.indexOf('年')
        let index2 = str.indexOf('月')
        let year = str.slice(0, index1)
        let month = str.slice(index1 + 1, index2)
        if (month < 10) {
          month = '0' + month
        }
        let num = str.slice(index2 + 1)
        if (num == '上半月') {
          num = '01'
        } else {
          num = '02'
        }
        return `${year}${month}${num}`
      },
      date2Text(value) {
        let str = value.toString()
        let year = Number(str.slice(0, 2))
        let month = Number(str.slice(2, 4))
        let num = Number(str.slice(4, 6))
        num = num == 1 ? '上半月' : '下半月'
        return `${year}年${month}月${num}`
      }

    }
  }
</script>

<style lang="scss">
  .files_container {
    height: 100vh;
    width: 100%;
    position: relative;


    .files_main {
      height: 100%;
      display: flex;
      flex-direction: column;

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

          .form_item {
            display: flex;
            /*flex-direction: column;*/
            padding: 10px 0;
            margin: 0 10px;
            /*border-bottom: 1px solid lightgray;*/

            .form_title {
              width: 25%;
              font-size: 16px;
              font-weight: 600;
            }

            .form_desc {
              /*text-align: right;*/
              width: 75%;
              font-size: 16px;
              color: darkgray;
            }
          }

          .form_item:last-child {
            border-bottom: none;
          }

        }

      }


    }


  }

</style>
