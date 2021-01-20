<template>
  <div class="staff_container">
    <nav-bar class="nav"
             :leftText="'返回'"
             :onClickLeftHandler="onClickLeft"
             :title="'工单详情'"
    ></nav-bar>
    <div class="sel_tab">
      <van-collapse v-model="activeNames">
        <van-collapse-item v-for="item,index in history"
                           :title="`${item.nodeType}节点(${item.dealUser})`"
                           :name="`${index}`">
          <form-desc :formDisabled="true" :formDescData="item.workData" :formDescImgs="formDescImgs">
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
        if (!this.selUserName) {
          Toast.fail('请选择指派人')
          return
        }
        let curWork = this.work
        let workId = curWork.id
        let orderData = this.order
        let orderId = orderData.orderInfo.id
        let req = {}
        req.applyId = this.myConst.appId
        req.applyKey = this.myConst.appKey
        req.orderId = orderId
        req.dealUser = this.$store.state.account
        req.workId = workId
        req.nodes = this.selUsers
        let dealUser = this.selUsers[0].dealUser          //selUsers是个数组,因为可能会指派多个人
        this.$gdApi.assignWork(req).then((res2) => {
          if (res2.code == SUCCESS) {
            let workId = res2.data[0]
            let req2 = {}
            req2.applyId = this.myConst.appId
            req2.applyKey = this.myConst.appKey
            req2.orderId = orderId
            req2.workId = workId
            req2.isAccept = 0
            req2.dealUser = dealUser
            this.$gdApi.isAcceptWork(req2).then((res) => {
              if (res.code == SUCCESS) {
                Toast.success(res.msg)
                this.$router.back(-1)
              } else {
                Toast.fail(res.msg)
              }
            })
          } else {
            Toast.fail(res2.msg)
          }
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
        let orderData = this.order
        let curWork = this.work
        let nextId = util.findNextNodeId(orderData.logicData, curWork)
        let nextNode = util.findLogicNode(orderData.logicData, nextId)
        let find = null
        for (let i = 0; i < this.dealUserOpt.length; i++) {
          let user = this.dealUserOpt[i]
          if (user.name == val) {
            find = user
            break
          }
        }
        if (find) {
          this.selUserName = find.name
          //selUsers是个数组,因为可能会指派多个人
          this.selUsers = [{
            'nodeId': nextNode.id,
            'nodeType': nextNode.nodeType,
            'dealType': '0',
            'dealUser': find.account
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
