<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'我的工单'"
      ></nav-bar>
      <van-tabs class="sel_tab" v-model="active" animated swipeable>
        <tab :title="'发布工单'">
          <div class="form">
            <problemForm :title="'发布工单'" :gongdanList="publishList"></problemForm>
          </div>
        </tab>
        <tab :title="'已处理工单'">
          <div class="form">
            <problemForm :title="'已处理工单'" :gongdanList="finishList"></problemForm>
          </div>
        </tab>
        <tab :title="'未处理工单'">
          <div class="form">
            <problemForm :title="'未处理工单'" :gongdanList="notFinishList"></problemForm>
          </div>
        </tab>
        <tab :title="'回退工单'">
          <div class="form">
            <problemForm :title="'回退工单'" :gongdanList="setBackList"></problemForm>
          </div>
        </tab>
      </van-tabs>

    </div>
  </div>
</template>

<script>
  import problemForm from '@/components/gongdi/gongdan/problemForm'
  import util from '@/views/problems/common'
  import { ImagePreview } from 'vant'
  import navBar from '@/components/navBar'
  import form1 from '@/components/gongdi/common/form'
  import tab from '@/components/tab'


  export default {
    name: 'allProblems',
    components: {
      problemForm,
      navBar,
      form1,
      tab
    },
    watch: {},
    data() {
      return {
        publishList: [],
        finishList: [],
        notFinishList: [],
        setBackList: [],
        active: null,
        gdList: [],
        problems: [],
        handleProblems: [],
        listQuery: {
          state: '-1'
        },
        total: 0,
        queryParams: {
          pageIndex: 1,
          pageSize: 1000
        }
      }
    },
    mounted() {
      this.getList()

    },
    methods: {
      checkWork(order, curWork) {
        let works = order.works
        if (curWork.nodeState == this.myConst.GD_NODE_STATE.NOT) {
          if (curWork.nodeType == this.myConst.GD_NODE_TYPE.shenhe) {
            //审核节点审核完 状态又是未完成  不能显示出来
            let preNodeId = util.findPreNodeId(order.logicData, curWork)
            for (let i = 0; i < works.length; i++) {
              let work = works[i]
              if (work.nodeId == preNodeId && work.nodeState == this.myConst.GD_NODE_STATE.WAITING) {
                return true
              }
            }
            return false
          }
          //同一个nodeId同时有回退和未处理状态 ，只显示回退
          for (let i = 0; i < works.length; i++) {
            let work = works[i]
            if (work.nodeId == curWork.nodeId && work.nodeState == this.myConst.GD_NODE_STATE.BACK) {
              return false
            }
          }
        } else if (curWork.nodeState == this.myConst.GD_NODE_STATE.BACK) {
          //同一个nodeId同时有回退和完成状态或待审核状态 ，不能显示
          for (let i = 0; i < works.length; i++) {
            let work = works[i]
            if (work.nodeId == curWork.nodeId &&
              (work.nodeState == this.myConst.GD_NODE_STATE.FINISH || work.nodeState == this.myConst.GD_NODE_STATE.WAITING)) {
              return false
            }
          }
          //同一个工单,有多个相同orderId的回退work，只显示最新那条(id最大)
          for (let i = 0; i < this.setBackList.length; i++) {
            let preBackWork = this.setBackList[i].work
            if (preBackWork.orderId == curWork.orderId && curWork.id > preBackWork.id) {
              this.setBackList.splice(i, 1)
              return true
            }
          }
        }

        return true

      },
      clickCheck() {
        this.showDialog = true
      },
      showState(orderState) {
        return this.myConst.GD_STATE_LABEL[orderState]
      },
      showNodeState(nodeState) {
        return this.myConst.GD_NODE_STATE_LABEL[nodeState]
      },
      getList() {
        let req = {}
        req.applyId = this.myConst.appId
        req.applyKey = this.myConst.appKey
        req.state = this.listQuery.state
        req.page = this.queryParams.pageIndex
        req.amount = this.queryParams.pageSize
        req.user = this.$store.state.account
        let id = this.$store.state.currentSite
        let name = this.$store.state.constructionSite[id].name
        req.orderStyle = name
        this.$gdApi.getOrderInfoByUser(req).then(res => {
          this.loading = false
          if (res.code == SUCCESS) {
            let orders = res.data.orders
            this.$store.state.gdList = orders
            this.gdList = orders
            res.data.orders.sort(function(a, b) {
              return b.orderInfo.createTime - a.orderInfo.createTime
            })
            res.data.orders.forEach((item) => {
              item.orderInfo.createTime = new Date(item.orderInfo.createTime).toLocaleDateString().split(' ')[0]
            })
            res.data.orders.forEach((item) => {
              item.orderInfo.dealTime = new Date(item.orderInfo.dealTime).toLocaleDateString().split(' ')[0]
            })
            this.publishList = []
            this.finishList = []
            this.notFinishList = []
            this.setBackList = []
            let account = this.$store.state.account
            for (let i = 0; i < orders.length; i++) {
              let order = orders[i]
              let imgs = order.imgs
              let works = order.works
              util.combineImgField(imgs, works)
              for (let j = 0; j < works.length; j++) {
                let work = works[j]
                if (work.dealUser == account) {
                  let nodeType = work.nodeType
                  let nodeState = work.nodeState
                  switch (nodeState) {
                    case this.myConst.GD_NODE_STATE.NOT:
                      if (this.checkWork(order, work)) {
                        this.notFinishList.push({ order, work })
                      }
                      break
                    case this.myConst.GD_NODE_STATE.FINISH:
                      if (nodeType == '开始') {
                        this.publishList.push({ order, work })
                      } else {
                        this.finishList.push({ order, work })
                      }
                      break
                    case this.myConst.GD_NODE_STATE.BACK:
                      if (this.checkWork(order, work)) {
                        this.setBackList.push({ order, work })
                      }
                      break
                    case this.myConst.GD_NODE_STATE.WAITING:
                      this.finishList.push({ order, work })
                      break
                    case this.myConst.GD_NODE_STATE.REFUSE:
                      this.finishList.push({ order, work })
                      break
                    case this.myConst.GD_NODE_STATE.ACCEPT:
                      this.finishList.push({ order, work })
                      break
                  }
                }
              }
            }
            // console.log(this.publishList, this.finishList, this.notFinishList)
          } else {
            this.publishList = []
            this.finishList = []
            this.notFinishList = []
            this.setBackList = []

          }
        })

      },
      onClickLeft() {
        this.$router.back(-1)
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
        }

      }

    }


  }

</style>
