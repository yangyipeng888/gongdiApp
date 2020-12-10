<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'处理工单'"
    ></nav-bar>
    <div class="sel_tab">
      <van-collapse v-model="activeNames">
        <van-collapse-item v-show="showListItem(item)" v-for="item,index in history"
                           :title="`${item.nodeType}节点(${item.dealUser})`"
                           :name="`${index}`">
          <form-desc :formDisabled="true" :formDescData="item.workData" :formDescImgs="formDescImgs">
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
      // history() {
      //   let orderData = this.$store.state.orderData
      //   let curWork = this.$store.state.curWork
      //   let his = []
      //   if (orderData && curWork) {
      //     let works = orderData.works
      //     for (let i = 0; i < works.length; i++) {
      //       let work = works[i]
      //       if (work.id != curWork.id) {//只加之前的
      //         his.push(work)
      //       } else {
      //         break
      //       }
      //     }
      //
      //   }
      //   return his
      // },
      // formDescData() {
      //   let orderData = this.$store.state.orderData
      //   let curWork = this.$store.state.curWork
      //   if (orderData && curWork) {
      //     let logicData = orderData.logicData
      //     let logic = util.findLogicNode(logicData, curWork.nodeId)
      //     if (logic) {
      //       let model = logic.model
      //       let formDescData = { formDesc: model }
      //       return JSON.stringify(formDescData)
      //       // this.formDescData = JSON.stringify(formDescData)
      //     }
      //   }
      // },
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
        //如果是进来处理  看到有审核节点  审核节点有workData 就显示
        for (let key in curWorkObj) {
          let work = curWorkObj[key]
          if (work.nodeType == this.myConst.GD_NODE_TYPE.shenhe && work.workData) {
            his.push(work)
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
      async submit() {
        let myFormData = this.$refs.myForm.getFormData()
        let curWork = this.$store.state.curWork
        let orderData = this.$store.state.orderData
        let workId = curWork.id
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
