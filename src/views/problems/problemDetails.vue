<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'工单详情'"
    ></nav-bar>
    <van-tabs class="sel_tab" v-model="active" animated swipeable>
      <tab :title="'当前进度'">
        <div class="form">
          <div class="nodeStepList">
            <div class="stepItem" v-for="(item,index) in nodeStepList">
              <div class="line" :style="{backgroundColor:item.color}"
                   v-show="index!=nodeStepList.length-1"></div>
              <div class="left">
                <van-icon class="stepIcon" :style="{color:item.color}" name="checked"/>
              </div>
              <div class="right">
                <div class="stepTitle">{{item.nodeType}}</div>
                <div class="stepTime">{{item.dealUser?item.nodeType+'人:':''}}{{item.dealUser}}</div>
              </div>
            </div>
          </div>
        </div>
      </tab>
      <tab :title="'流转历史'">
        <div class="form">
          <div class="nodeStepList">
            <div class="stepItem" v-for="(item,index) in circulationHistoryList">
              <div class="line" :style="{backgroundColor:item.color}"
                   v-show="index!=circulationHistoryList.length-1"></div>
              <div class="left">
                <van-icon class="stepIcon" :style="{color:item.color}"
                          name="checked"/>
              </div>
              <div class="right">
                <div class="stepTitle">{{item.nodeType}}</div>
                <div class="stepTime">{{item.dealUser?item.nodeType+'人:':''}}{{item.dealUser}}</div>
                <div @click="clickMore" class="stepStatus" :style="{backgroundColor:item.color}">
                  {{item.nodeStateLabel}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </tab>
      <tab :title="'当前节点'">
        <div class="form">
          <form-desc :formDescData="formDescData"></form-desc>
        </div>
      </tab>

    </van-tabs>

  </div>
</template>

<script>

  import navBar from '@/components/navBar'
  import tab from '@/components/tab'
  import formDesc from './formDesc'

  export default {
    name: 'staff',
    components: {
      navBar,
      tab,
      formDesc

    },
    watch: {
      gdData: {
        handler: function(newVal, oldVal) {
          if (newVal) {
            this.showSteps()
            this.showHistory()
            this.showForm()
          }
        },
        immediate: true
      }
    },
    mounted() {
      this.gdData = this.$route.params.gdData
    },
    data() {
      return {
        gdData: null,
        active: 0,
        curSelRow: null,
        nodeStepList: [],
        circulationHistoryList: [],
        formDescData: null
      }
    },
    created() {
    },

    methods: {
      onSubmit() {

      },
      clickMore() {


      },
      onClickLeft() {
        this.$router.back(-1)
      },
      setCurrent(row) {
        this.curSelRow = row
      },
      showSteps() {
        let logic = JSON.parse(this.gdData.orderInfo.orderLogic)
        this.nodeStepList = logic.nodes.concat()
        for (let i = 0; i < this.nodeStepList.length; i++) {
          let item = this.nodeStepList[i]
        }
        this.nodeStepList.unshift({ nodeType: '开始' })
        this.nodeStepList.push({ nodeType: '结束' })

        let newest = this.gdData.works[this.gdData.works.length - 1].work
        let totalLen = logic.nodes.length
        let preId = newest.nodeId
        if (preId == totalLen) {
          if (newest.nodeState == this.myConst.GD_NODE_STATE.NOT) {
            preId = preId
          } else if (newest.nodeState == this.myConst.GD_NODE_STATE.FINISH) {
            preId = preId + 2
          }
        } else {
          preId = preId
        }
        for (let i = 0; i < this.nodeStepList.length; i++) {
          let node = this.nodeStepList[i]
          if (i < preId) {
            node.color = '#67C23A'
          } else if (i == preId) {
            node.color = '#E6A23C'
          } else {
            node.color = 'gray'
          }
        }
      },
      showHistory() {
        this.circulationHistoryList = []
        for (let i = 0; i < this.gdData.works.length; i++) {
          this.circulationHistoryList.push(this.gdData.works[i].work)
        }
        for (let i = 0; i < this.circulationHistoryList.length; i++) {
          let item = this.circulationHistoryList[i]
          item.nodeStateLabel = this.myConst.GD_NODE_STATE_LABEL[item.nodeState]
          if (item.nodeState == this.myConst.GD_NODE_STATE.FINISH) {
            item.color = '#67C23A'
          } else if (item.nodeState == this.myConst.GD_NODE_STATE.BACK) {
            item.color = '#F56c6c'
          } else {
            item.color = '#E6A23C'
          }
        }
        this.setCurrent(this.circulationHistoryList[this.circulationHistoryList.length - 1])
      },
      showForm() {
        this.formDescData = this.gdData.orderInfo.orderContent
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


        .nodeStepList {
          width: 100%;


          .stepItem {
            padding: 10px;
            display: flex;
            color: black;
            position: relative;

            .line {
              top: 30%;
              left: 5.5%;
              width: 1px;
              height: 102%;
              position: absolute;
            }


            .left {
              width: 10%;


              .stepIcon {
                margin-top: 3px;
                font-size: 20px;

              }


            }

            .right {
              width: 90%;

              .stepTitle {
                word-break: break-all;
                font-size: 20px;


              }

              .stepTime {
                color: gray;
              }

              .stepStatus {
                display: inline-block;
                border-radius: 5px;
                margin: 2px 0px;
                padding: 2px 5px;
                color: white;
                font-size: 15px !important;

              }

            }


          }
        }
      }

    }


  }

</style>
