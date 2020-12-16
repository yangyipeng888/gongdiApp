<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'我的工单'"
      ></nav-bar>
      <div class="content">
        <div class="form">
          <form1 :mh="'72vh'">
            <template v-slot:title>
              工单节点
            </template>
            <template v-slot:list-title>
              <div class="listTitle">
                <div class="title_time">节点类型</div>
                <div class="title_desc">处理人</div>
                <div class="title_type">状态</div>
                <div class="title_status">操作</div>
              </div>
            </template>
            <template v-slot:list>
              <div class="problem_list" v-show="problems&&problems.length"
                   v-for="pro,index in problems" :key="index">
                <div class="problem_time van-ellipsis">{{pro.nodeType}}</div>
                <div class="problem_desc">{{pro.dealUser}}</div>
                <div class="problem_status">
                  <div class="status_txt"
                       :class="{status_ok:pro.nodeState==myConst.GD_NODE_STATE.FINISH,
                    status_nok:(pro.nodeState==myConst.GD_NODE_STATE.NOT||pro.nodeState==myConst.GD_NODE_STATE.BACK||pro.nodeState==myConst.GD_NODE_STATE.REFUSE),
            status_appoint:pro.nodeState==myConst.GD_NODE_STATE.WAITING,}"
                  >
                    {{showNodeState(pro.nodeState)}}
                  </div>
                </div>
                <div @click="clickPro(pro)" class="problem_type">{{showBtnLabel(pro)}}</div>

              </div>
            </template>

          </form1>

        </div>
      </div>

    </div>
  </div>

</template>

<script>
  import navBar from '@/components/navBar'
  import tab from '@/components/tab'
  import form1 from '@/components/gongdi/common/form'
  import util from '@/views/problems/common'

  export default {
    name: 'index',
    data() {
      return {
        orderData: null,
        problems: []
      }
    },
    computed: {},
    mounted() {
      let orderData = this.$store.state.orderData
      let orderId = orderData.orderInfo.id
      let req = {}
      req.applyId = this.myConst.appId
      req.applyKey = this.myConst.appKey
      req.orderId = orderId
      this.$gdApi.getNewWorkAndImg(req).then((res) => {
        if (res.code == SUCCESS) {
          this.problems = []
          let works = res.data.works
          let tempWorks = []
          for (let key in works) {
            tempWorks.push(works[key])
          }
          util.combineImgField(res.data.imgs, tempWorks)
          this.$store.state.curWorkObj = works
            for (let key in works) {
            let work = works[key]
            let account = this.$store.state.account
            if (work.dealUser == account) {
              let nodeType = work.nodeType
              if (nodeType == this.myConst.GD_NODE_TYPE.shenhe) {
                let nodeState = work.nodeState
                if (nodeState == this.myConst.GD_NODE_STATE.FINISH) {
                  this.problems.push(work)
                } else {
                  let orderData = this.$store.state.orderData
                  let logicData = JSON.parse(orderData.logicData)
                  let preNodeId = util.findPreNodeIdById(logicData, work.nodeId)
                  let curWorkObj = this.$store.state.curWorkObj

                  let preNode = curWorkObj[preNodeId]
                  if (preNode.nodeState == this.myConst.GD_NODE_STATE.WAITING) {
                    this.problems.push(work)
                  }
                }

              } else {
                this.problems.push(work)
              }
            }
          }


        }
      })

    },
    components: {
      navBar,
      tab,
      form1
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      },
      showNodeState(nodeState) {
        return this.myConst.GD_NODE_STATE_LABEL[nodeState]
      },
      showBtnLabel(pro) {
        if (pro.nodeState == this.myConst.GD_NODE_STATE.FINISH) { //完成
          return '查看'
        } else if (pro.nodeState == this.myConst.GD_NODE_STATE.WAITING) { //待审核
          return `查看`
        } else {
          return `${pro.nodeType}`
        }
      },
      clickPro(work) {
        this.$store.state.curWork = work
        this.$router.push({
          name: 'problemDetails',
          params: {
            work
          }
        })
      }
    }
  }
</script>

<style scoped lang="scss">
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

      .content {
        position: absolute;
        width: 100%;
        top: 46px;
        bottom: 0;
        overflow: scroll;

        .form {
          /*background-color: white;*/
          border-radius: 10px;


          .listTitle {
            display: flex;
            flex-direction: row;
            text-align: center;
            height: 30px;
            line-height: 30px;

            .title_time {
              width: 20%;
            }

            .title_desc {
              width: 40%;
            }

            .title_type {
              width: 20%;

            }

            .title_status {
              width: 20%;

            }
          }

          .problem_list:nth-child(2n) {
            background-color: #F8F6F7;
          }

          .problem_list {
            background-color: white;
            display: flex;
            flex-direction: row;
            text-align: center;
            height: 30px;
            line-height: 30px;

            .problem_time {
              width: 20%;
            }

            .problem_desc {
              width: 40%;
            }

            .problem_type {
              width: 20%;
              color: $common_blue;

            }

            .problem_status {
              width: 20%;
              display: flex;
              justify-content: center;
              align-items: center;

              .status_txt {
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                width: 70%;
                height: 80%;
                font-size: 15px !important;
              }

              .status_ok {
                background-color: $common_success;
              }

              .status_nok {
                background-color: $common_fail;
              }

              .status_appoint {
                background-color: $common_warning;
              }
            }
          }


        }

      }


    }


  }
</style>
