<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'工单详情'"
    ></nav-bar>
    <div class="sel_tab">
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="item,index in history" :title="`${item.nodeType}节点(${item.dealUser})`"
                           :name="`${index}`">
          <form-desc :formDisabled="true"  :formDescData="item.workData" :formDescImgs="formDescImgs">
            <template v-slot:footer>

            </template>
          </form-desc>
        </van-collapse-item>
      </van-collapse>
      <form-desc ref="myForm" :formDescData="formDescData" :formDescImgs="formDescImgs">
        <template v-slot:footer>
          <van-button block @click="submit" type="info">提交处理
          </van-button>
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
  import util from './common'

  export default {
    name: 'staff',
    components: {
      navBar,
      tab,
      formDesc
    },
    computed: {
      history() {
        let orderData = this.$store.state.orderData
        let logicData = JSON.parse(orderData.logicData)
        let curWork = this.$store.state.curWork
        let curNodeId = curWork.nodeId
        let curWorkObj = this.$store.state.curWorkObj
        let his = []
        let nodeIds = Object.keys(curWorkObj)
        for (let i = 0; i < nodeIds.length; i++) {
          if (nodeIds[i] < curNodeId) {//只加之前的
            his.push(curWorkObj[nodeIds[i]])
          }
        }
        let preNodeIds = util.findAllPreNodeId(logicData, curNodeId)
        return his
      },
      formDescData() {
        let orderData = this.$store.state.orderData
        let curWork = this.$store.state.curWork
        if (curWork.workData) {
          return curWork.workData

        } else {
          let logicData = orderData.logicData
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
      onClickLeft() {
        this.$router.back(-1)
      },
      getBackWorkId(curNodeId) {
        let orderData = this.$store.state.orderData
        let works = orderData.works
        for (let i = 0; i < works.length; i++) {
          let work = works[i]
          if (work.nodeState == this.myConst.GD_NODE_STATE.NOT && work.nodeId == curNodeId) {
            return work.id
          }
        }
      },
      async submit() {
        let myFormData = this.$refs.myForm.getFormData()
        let curWork = this.$store.state.curWork
        let orderData = this.$store.state.orderData
        let workId = this.getBackWorkId(curWork.nodeId)//后端要求
        let orderId = orderData.orderInfo.id
        let workData = JSON.parse(this.formDescData)
        workData.formData = myFormData
        workData = JSON.stringify(workData)
        let myFormFiles = await this.$refs.myForm.getFormFiles()
        let req = {}
        req.imgs = myFormFiles
        req.applyId = this.myConst.appId
        req.applyKey = this.myConst.appKey
        req.orderId = orderId
        req.workId = workId
        req.workData = workData
        req.dealUser = this.$store.state.account
        this.$gdApi.dealWork(req).then((res) => {
          if (res.code == SUCCESS) {
            Toast.success(res.msg)
            this.$router.back(-1)
          } else {
            Toast.fail(res.msg)
          }

        })

      },
      onSubmit() {

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


    }


  }

</style>
