<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'工单详情'"
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
      <!--      <form-desc ref="myForm" :formDescData="formDescData" :formDescImgs="formDescImgs">-->
      <!--        <template v-slot:footer>-->

      <!--        </template>-->
      <!--      </form-desc>-->

    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import navBar from '@/components/navBar'
  import tab from '@/components/tab'
  import formDesc from './formDesc'
  import util from './problemDetails/common'

  export default {
    name: 'finish',
    components: {
      navBar,
      tab,
      formDesc
    },
    computed: {
      history() {
        let his = []
        let orderData = this.$store.state.orderData
        let orderState = orderData.orderInfo.orderState
        if (orderData) {
          let works = orderData.works
          if (orderState == this.myConst.GD_STATE.FINISH) {
            for (let i = 0; i < works.length; i++) {
              let work = works[i]
              if (work.nodeState == this.myConst.GD_NODE_STATE.BACK) {
                continue
              }
              his.push(work)

            }
          } else {
            his.push(works[0])
          }
        }
        return his
      },
      formDescData() {
        let orderData = this.$store.state.orderData
        let curWork = this.$store.state.curWork
        return curWork.workData

      }
    },
    data() {
      return {
        activeNames: ['0'],
        formDescImgs: null
        // formDescData: null
      }
    },
    watch: {
      // 'curWork': {
      //   handler(n, o) {
      //     if (n) {
      //       debugger
      //       let orderData = this.$store.state.orderData
      //       let logicData = this.orderData.logicData
      //       let logic = util.findLogicNode(logicData, work.nodeId)
      //       if (logic) {
      //         let model = logic.model
      //         let formDescData = { formDesc: model }
      //         this.formDescData = JSON.stringify(formDescData)
      //       }
      //     }
      //   },
      //   deep: true,
      //   immediate: true
      // }

    },
    mounted() {

    },

    created() {
    },

    methods: {
      showListItem(item) {
        let workData = JSON.parse(item.workData)
        let formDesc = workData.formDesc
        let keys = Object.keys(formDesc)
        return keys.length > 0
      },
      onClickLeft() {
        this.$router.back(-1)
      },
      submit() {
        let myFormData = this.$refs.myForm.getFormData()
        let curWork = this.$store.state.curWork
        let orderData = this.$store.state.orderData
        let workId = curWork.id
        let orderId = orderData.orderInfo.id
        let workData = JSON.parse(this.formDescData)
        workData.formData = myFormData
        workData = JSON.stringify(workData)
        let req = {}
        req.imgs = ''
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
