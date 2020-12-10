<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'工单详情'"
    ></nav-bar>
    <div class="sel_tab">
      <van-collapse v-model="activeNames">
        <van-collapse-item :formDisabled="true" v-for="item,index in history" :title="`${item.nodeType}节点(${item.dealUser})`"
                           :name="`${index}`">
          <form-desc :formDescData="item.workData" :formDescImgs="formDescImgs">
            <template v-slot:footer>

            </template>
          </form-desc>
        </van-collapse-item>
      </van-collapse>
      <van-field
        readonly
        clickable
        name="datetimePicker"
        :value="selUserName"
        label="选择指派"
        placeholder="点击选择指派人"
        @click="showPicker = true"
      />
      <van-button style="margin-top: 16px;" block @click="assignWork"
                  type="info">指派
      </van-button>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          title="选择指派人"
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
        />
      </van-popup>
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
      }
    },
    data() {
      return {
        activeNames: ['0'],
        formDescImgs: null,
        showPicker: false,
        dealUserOpt: [],
        columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
        selUserName: null,
        selUsers: null
        // formDescData: null
      }
    },
    watch: {},
    mounted() {
      this.getDealUser()
    },

    created() {
    },

    methods: {
      assignWork() {
        let curWork = this.$store.state.curWork
        let workId = curWork.id
        let orderData = this.$store.state.orderData
        let orderId = orderData.orderInfo.id
        let req = {}
        req.applyId = this.myConst.appId
        req.applyKey = this.myConst.appKey
        req.orderId = orderId
        req.dealUser = this.$store.state.account
        req.workId = workId
        req.nodes = this.selUsers
        this.$gdApi.assignWork(req).then((res) => {
          debugger
        })
      },
      getDealUser() {
        let req = {}
        req.applyId = this.myConst.appId
        this.$gdApi.getStaff(req).then(res => {
          if (res.code == SUCCESS) {
            this.columns = []
            this.dealUserOpt = res.data
            for (let i = 0; i < res.data.length; i++) {
              let item = res.data[i]
              this.columns.push(item.name)
            }
          }
        })
      },
      onClickLeft() {
        this.$router.back(-1)
      },
      onConfirm(val) {
        let orderData = this.$store.state.orderData
        let logicData = JSON.parse(orderData.logicData)
        let curWork = this.$store.state.curWork
        let nodeId = curWork.nodeId
        let nextIds = util.findNextNodeId(logicData, nodeId)
        let nextNodes = []
        for (let i = 0; i < nextIds.length; i++) {
          let id = nextIds[i]
          let node = util.findLogicNode(orderData.logicData, id)
          nextNodes.push(node)
        }
        let nextN = nextNodes[0]
        let find = null
        for (let i = 0; i < this.dealUserOpt.length; i++) {
          let user = this.dealUserOpt[i]
          if (user.name == val) {
            find = user
            break
          }
        }
        if (nextN && find) {
          this.selUserName = find.name
          this.selUsers = [{
            'nodeId': nextN.id,
            'nodeType': nextN.nodeType,
            'dealType': '0',
            'dealUser': find.name
          }]
        }
        this.showPicker = false

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
