<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'工单审核'"
    ></nav-bar>
    <div class="sel_tab">
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="item,index in history" :title="`${item.nodeType}节点(${item.dealUser})`"
                           :name="`${index}`">
          <form-desc :formDescData="item.workData" :formDescImgs="formDescImgs">
            <template v-slot:footer>

            </template>
          </form-desc>
        </van-collapse-item>
      </van-collapse>
      <form-desc ref="myForm" :formDescData="formDescData" :formDescImgs="formDescImgs">
        <template v-slot:footer>
          <div style="margin: 10px;">
            <van-button block @click="CheckSumbit(true)" type="info">通过审核
            </van-button>
            <van-button style="margin-top: 16px;" block @click="CheckSumbit(false)"
                        type="danger">回退
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
        let curWork = this.$store.state.curWork
        let his = []
        if (orderData && curWork) {
          let works = orderData.works
          for (let i = 0; i < works.length; i++) {
            let work = works[i]
            if (work.id != curWork.id) {//只加之前的
              his.push(work)
            } else {
              break
            }
          }

        }
        return his
      },
      formDescData() {
        let orderData = this.$store.state.orderData
        let curWork = this.$store.state.curWork
        if (orderData && curWork) {
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
      async CheckSumbit(pass) {
        let orderData = this.$store.state.orderData
        let curWork = this.$store.state.curWork
        let myFormData = this.$refs.myForm.getFormData()
        let isPass = pass ? 1 : 0
        let workId = curWork.id
        let orderId = orderData.orderInfo.id
        let myFormFiles = await this.$refs.myForm.getFormFiles()

        let workData = JSON.parse(this.formDescData)
        workData.formData = myFormData
        workData = JSON.stringify(workData)

        let curWorkObj = this.$store.state.curWorkObj
        let checkNodeId = util.findCheckNodeId(orderData.logicData, curWork)
        let checkWork = curWorkObj[checkNodeId]
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
