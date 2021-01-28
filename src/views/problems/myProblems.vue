<template>
  <div class='files_container'>
    <div class='files_main'>
      <nav-bar class='nav'
               :leftText="'返回'"
               :onClickLeftHandler='onClickLeft'
               :title="'我的工单'"
      ></nav-bar>
      <van-tabs class='sel_tab' v-model='active' animated swipeable>
        <van-tab title='发布工单'>
          <div class='form'>
            <problemForm :title="'发布工单'" :gongdanList='publishList'></problemForm>
          </div>
        </van-tab>
        <van-tab title='已处理工单'>
          <div class='form'>
            <problemForm :title="'已处理工单'" :gongdanList='finishList'></problemForm>
          </div>
        </van-tab>
        <van-tab title='未处理工单'>
          <div class='form'>
            <problemForm :title="'未处理工单'" :gongdanList='notFinishList'></problemForm>
          </div>
        </van-tab>
        <van-tab title='回退工单'>
          <div class='form'>
            <problemForm :title="'回退工单'" :gongdanList='setBackList'></problemForm>
          </div>
        </van-tab>

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
  name: 'myProblems',
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
      active: 0,
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
      },
      userList: null
    }
  },
  mounted() {
    if (this.$route.params.active) {
      this.active = this.$route.params.active
    }
    this.getList()
    this.getDealUser()
  },
  methods: {

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
      // req.orderStyle = '整改通知'
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
              if (this.isMyOrder(work)) {
                let nodeType = work.nodeType
                let nodeState = work.nodeState
                switch (nodeState) {
                  case this.myConst.GD_NODE_STATE.NOT:
                    if (util.checkWork(order, work)) {
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
                    if (util.checkWork(order, work)) {
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
          // console.log(this.setBackList)
        } else {
          this.publishList = []
          this.finishList = []
          this.notFinishList = []
          this.setBackList = []

        }
      })

    },
    isMyOrder(work) {
      let dealType = work.dealType
      let account = this.$store.state.account
      if (dealType == 0) {
        //0是处理人 处理
        return account == work.dealUser
      } else if (dealType == 1) {
        //1是处理部门 处理
        if (this.userList && this.userList.length) {
          for (let i = 0; i < this.userList.length; i++) {
            let user = this.userList[i]
            if (user.account == account && user.department == work.dealUser) {
              return true
            }
          }
          return false
        }
      }
    },
    getDealUser() {
      let req = {}
      req.applyId = this.myConst.appId
      this.$gdApi.getStaff(req).then(res => {
        if (res.code == SUCCESS) {
          this.userList = res.data
        }
      })
    },
    onClickLeft() {
      this.$router.back(-1)
    }

  }
}
</script>

<style lang='scss'>
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
