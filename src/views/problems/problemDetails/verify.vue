<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'工单详情'"
    ></nav-bar>
    <van-tabs class="sel_tab" v-model="active" animated swipeable>
      <tab v-for="(item,index) in allCheckNodes" :title="item.title">
        <div class="form">
          <form-desc :formDescData="item.checkData" :formDescImgs="formDescImgs">
            <template v-slot:footer>
            </template>
          </form-desc>
        </div>
        <div class="form">
          <form-desc :ref="'myForm'+index" :formDescData="formDescData" :formDescImgs="formDescImgs">
            <template v-slot:footer>
              <div style="margin: 1px;">
                <van-button block @click="CheckSumbit('myForm'+index,true,item)" type="info">通过审核
                </van-button>
                <van-button style="margin-top: 16px;" block @click="CheckSumbit('myForm'+index,false,item)"
                            type="danger">回退
                </van-button>
              </div>

            </template>
          </form-desc>
        </div>
      </tab>


    </van-tabs>

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
    props: ['orderData'],
    components: {
      navBar,
      tab,
      formDesc
    },
    computed: {
      allCheckNodes() {
        if (this.orderData && this.curWork) {
          let curNodeId = this.curWork.nodeId
          let logicData = JSON.parse(this.orderData.logicData)
          let nodes = logicData.nodes
          let edges = logicData.edges
          let checkNodeIds = []
          edges.forEach((edge) => {
            if (edge.target == curNodeId) {
              checkNodeIds.push(edge.source)
            }
          })
          let result = []
          let works = this.orderData.works
          for (let i = 0; i < works.length; i++) {
            let work = works[i]
            for (let j = 0; j < checkNodeIds.length; j++) {
              let id = checkNodeIds[j]
              if (id == work.nodeId) {
                let resultD = {}
                resultD.title = `${work.nodeType}节点（${work.dealUser}）`
                resultD.checkId = work.id
                resultD.checkData = work.workData
                result.push(resultD)
              }
            }

          }
          return result
        }
      }
    },
    data() {
      return {
        curWork: null,
        formDescImgs: null,
        formDescData: null
      }
    },
    watch: {
      'orderData': {
        handler(n, o) {
          if (n) {
            let account = this.$store.state.account
            let works = this.orderData.works
            let work = util.findOwnNode(works, account)
            this.curWork = work
            if (work) {
              let logicData = this.orderData.logicData
              let logic = util.findLogicNode(logicData, work.nodeId)
              if (logic) {
                let model = logic.model
                let formDescData = { formDesc: model }
                this.formDescData = JSON.stringify(formDescData)
              }

            }
          }
        },
        deep: true,
        immediate: true
      }
    },
    mounted() {

    },

    created() {
    },

    methods: {
      onClickLeft() {
        this.$router.back(-1)
      },
      CheckSumbit(formName, pass, checkNodeData) {
        let myForm = this.$refs[formName][0]
        let myFormData = myForm.getFormData()
        let isPass = pass ? 1 : 0
        let workId = this.curWork.id
        let orderId = this.orderData.orderInfo.id

        let workData = JSON.parse(this.formDescData)
        workData.formData = myFormData
        workData = JSON.stringify(workData)

        let checkId = checkNodeData.checkId
        let checkData = checkNodeData.checkData
        let req = {
          imgs: '',
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

      .form {
        margin: 10px;
        background-color: white;
        border-radius: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }

    }


  }

</style>
