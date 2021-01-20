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
          <form-desc :formDisabled="true" :formDescData="item.workData" :formDescImgs="formDescImgs" >
            <template v-slot:footer>

            </template>
          </form-desc>
        </van-collapse-item>
      </van-collapse>
      <form-desc ref="myForm" :formDescData="formDescData" :formDescImgs="formDescImgs" @validate='submit'>
        <template v-slot:footer>
          <van-button block  type="info">提交处理
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
        let nextNodeId = util.findNextNodeId(order.logicData, curWork)
        let works = order.works
        for (let i = 0; i < works.length; i++) {
          let _work = works[i]
          if (_work.nodeId == nextNodeId) {
            return [_work]
          }
        }
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
        let orderData = this.order
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
        let curWork = this.work
        let orderData = this.order
        let workId = this.getBackWorkId(curWork.nodeId)//后端要求
        let orderId = orderData.orderInfo.id
        let workData = JSON.parse(this.formDescData)
        workData.formData = myFormData
        workData = JSON.stringify(workData)
        let myFormFiles = await this.$refs.myForm.getFormFiles()
        myFormFiles.forEach((item) => {
          item.workId = workId
        })
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
