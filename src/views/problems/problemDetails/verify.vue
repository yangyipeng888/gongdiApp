<template>
  <div class='staff_container'>
    <nav-bar class='nav'
             :leftText="'返回'"
             :onClickLeftHandler='onClickLeft'
             :title="'工单审核'"
    ></nav-bar>
    <div class='sel_tab'>
      <van-collapse v-model='activeNames'>
        <van-collapse-item v-show='showListItem(item)' v-for='item,index in history'
                           :title='`${item.nodeType}节点(${item.dealUser})`'
                           :name='`${index}`'>
          <form-desc :formDisabled='true' :formDescData='item.workData' :formDescImgs='formDescImgs'>
            <template v-slot:footer>

            </template>
          </form-desc>
        </van-collapse-item>
      </van-collapse>
      <form-desc ref='myForm' :formDescData='formDescData' :formDescImgs='formDescImgs' @validate='CheckSumbit'>
        <template v-slot:footer>
          <div style='margin: 10px;'>
            <van-button block @click='checkFlag=true' type='info'>通过审核
            </van-button>
            <van-button style='margin-top: 16px;' block @click='checkFlag=false'
                        type='danger'>回退
            </van-button>
          </div>
        </template>
      </form-desc>

    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import navBar from '@/components/navBar'
import tab from '@/components/tab'
import formDesc from '../formDesc'
import util from '@/views/problems/common'

export default {
  name: 'staff',
  props: ['order', 'work'],
  components: {
    navBar,
    tab,
    formDesc
  },
  computed: {
    history() {
      let order = this.order
      let curWork = this.work
      let works = order.works
      let his = []
      for (let i = 0; i < works.length; i++) {
        let _work = works[i]
        if (_work.id == curWork.id) {
          continue
        }
        let nodeId = _work.nodeId
        let hasNodeIndex = this._.findIndex(his, (node) => {
          return node.nodeId == nodeId
        })
        if (hasNodeIndex != -1) {
          his.splice(hasNodeIndex, 1)
        }
        his.push(_work)
      }
      return his
    },
    formDescData() {
      let order = this.order
      let curWork = this.work
      if (curWork.workData) {
        return curWork.workData

      } else {
        let logicData = order.logicData
        let logic = util.findLogicNode(logicData, curWork.nodeId)
        if (logic) {
          let model = logic.model
          let formDescData = { formDesc: model }
          return JSON.stringify(formDescData)
          // this.formDescData = JSON.stringify(formDescData)
        }
      }
    }
  },
  data() {
    return {
      checkFlag: false,
      activeNames: ['0'],
      formDescImgs: null
      // formDescData: null
    }
  },
  watch: {},
  mounted() {

  },

  created() {
  },

  methods: {
    showListItem(item) {
      if (item.workData) {
        let workData = JSON.parse(item.workData)
        let formDesc = workData.formDesc
        let keys = Object.keys(formDesc)
        return keys.length > 0
      }
      return false
    },
    onClickLeft() {
      this.$router.back(-1)
    },
    findCheckWork() {
      let order = this.order
      let curWork = this.work
      let checkNodeId = util.findPreNodeId(order.logicData, curWork)
      let works = order.works
      for (let i = works.length - 1; i >= 0; i--) {
        let work = works[i]
        if (work.nodeId == checkNodeId && work.nodeState == this.myConst.GD_NODE_STATE.WAITING) {
          return work
        }
      }
    },
    async CheckSumbit(pass) {
      let orderData = this.order
      let curWork = this.work
      let myFormData = this.$refs.myForm.getFormData()
      let isPass = this.checkFlag ? 1 : 0
      let workId = curWork.id
      let orderId = orderData.orderInfo.id
      let myFormFiles = await this.$refs.myForm.getFormFiles()
      myFormFiles.forEach((item) => {
        item.workId = workId
      })
      let workData = JSON.parse(this.formDescData)
      workData.formData = myFormData
      workData = JSON.stringify(workData)
      let checkWork = this.findCheckWork()
      let checkId = checkWork.id
      let checkData = null
      let req = {
        imgs: myFormFiles,
        applyId: this.myConst.appId,
        applyKey: this.myConst.appKey,
        orderId,
        workData: workData,
        checkData,
        dealUser: this.$store.state.account,
        workId,
        checkId,
        isPass
      }
      this.$gdApi.checkWork(req).then((res) => {
        if (res.code == SUCCESS) {
          Toast.success(res.msg)
          this.$router.back(-1)
        } else {
          Toast.fail(res.msg)
        }

      })
    }


  }
}
</script>

<style lang='scss'>
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


  }


}

</style>
