<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'工单详情'"
    ></nav-bar>
    <div class="sel_tab">
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
    props: ['orderData'],
    components: {
      navBar,
      tab,
      formDesc
    },
    computed: {},
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
      submit() {
        let myFormData = this.$refs.myForm.getFormData()
        let workId = this.curWork.id
        let orderId = this.orderData.orderInfo.id
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
