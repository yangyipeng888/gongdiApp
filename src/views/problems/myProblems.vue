<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'我的工单'"
      ></nav-bar>
      <div class="content">
        <form1 :mh="'72vh'">
          <template v-slot:title>
            我的工单
          </template>
          <template v-slot:list-title>
            <div class="listTitle">
              <div class="title_time">创建者</div>
              <div class="title_desc">工单id</div>
              <div class="title_type">状态</div>
              <div class="title_status">操作</div>
            </div>
          </template>
          <template v-slot:list>
            <div class="problem_list" v-show="problems&&problems.length"
                 v-for="pro,index in problems" :key="index" @click="clickPro(pro)">
              <div class="problem_time van-ellipsis">{{pro.createUser}}</div>
              <div class="problem_desc">{{pro.id}}</div>
              <div class="problem_status">
                <div class="status_txt" :class="{status_ok:pro.orderState==myConst.GD_STATE.FINISH,status_nok:pro.orderState==myConst.GD_STATE.NOT,
            status_appoint:pro.orderState==myConst.GD_STATE.DOING,}">
                  {{showState(pro.orderState)}}
                </div>
              </div>
              <div @click="clickMore(pro)" class="problem_type">查看</div>

            </div>
          </template>
          <template v-slot:footer>
            <van-pagination @change="getList" v-show="total>0" :total-items="total" v-model="queryParams.pageIndex"
                            :items-per-page="queryParams.pageSize"/>
          </template>

        </form1>
      </div>

    </div>
  </div>
</template>

<script>
  import { ImagePreview } from 'vant'
  import navBar from '@/components/navBar'
  import form1 from '@/components/gongdi/common/form'


  export default {
    name: 'allProblems',
    components: {
      navBar,
      form1
    },
    watch: {},
    data() {
      return {
        gdList: [],
        problems: [],
        listQuery: {
          state: '-1'
        },
        total: 0,
        queryParams: {
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    mounted() {
      this.getList()

    },
    methods: {
      clickMore(row) {
        let id = row.id
        let gdData = null
        for (let i = 0; i < this.gdList.length; i++) {
          let item = this.gdList[i]
          if (item.orderInfo.id == id) {
            gdData = item
            break
          }
        }
        this.$router.push({
          name: 'problemDetails',
          params: {
            gdData,
            showBtn: true

          }
        })
      },
      clickPro() {

      },
      clickCheck() {
        this.showDialog = true
      },
      showState(orderState) {
        return this.myConst.GD_STATE_LABEL[orderState]
      },
      getList() {
        let req = {}
        req.applyId = this.myConst.appId
        req.applyKey = this.myConst.appKey
        req.state = this.listQuery.state
        req.page = this.queryParams.pageIndex
        req.amount = this.queryParams.pageSize
        req.user = this.$store.state.account
        let id = this.$store.state.currentSite
        let name = this.$store.state.constructionSite[id].name
        req.orderStyle = name
        this.$gdApi.getOrderInfoByUser(req).then(res => {
          if (res.code == SUCCESS) {
            this.gdList = res.data.orders
            res.data.orders.sort(function(a, b) {
              return b.orderInfo.createTime - a.orderInfo.createTime
            })
            res.data.orders.forEach((item) => {
              item.orderInfo.createTime = new Date(item.orderInfo.createTime).toLocaleDateString().split(' ')[0]
            })
            res.data.orders.forEach((item) => {
              item.orderInfo.dealTime = new Date(item.orderInfo.dealTime).toLocaleDateString().split(' ')[0]
            })
            let list = []
            for (let i = 0; i < res.data.orders.length; i++) {
              let item = res.data.orders[i]
              list.push(item.orderInfo)
            }
            this.problems = list
            this.total = res.data.pageSize * this.queryParams.pageSize
          } else {
            this.problems = []
          }
          this.loading = false
        })

      },
      onClickLeft() {
        this.$router.back(-1)
      }

    }
  }
</script>

<style lang="scss">
  .files_container {
    height: 100vh;
    width: 100%;
    position: relative;


    .files_main {
      height: 100%;
      display: flex;
      flex-direction: column;

      .nav {
        /*position: absolute;*/
        height: 46px;
      }

      .content {
        width: 100%;
        padding: 0;
        position: absolute;
        top: 46px;
        bottom: 0px;
        left: 0px;
        overflow: scroll;

        .listTitle {
          display: flex;
          flex-direction: row;
          text-align: center;
          height: 30px;
          line-height: 30px;

          .title_time {
            width: 20%;
          }

          .title_desc {
            width: 40%;
          }

          .title_type {
            width: 20%;

          }

          .title_status {
            width: 20%;

          }
        }

        .problem_list:nth-child(2n) {
          background-color: #F8F6F7;
        }

        .problem_list {
          background-color: white;
          display: flex;
          flex-direction: row;
          text-align: center;
          height: 30px;
          line-height: 30px;

          .problem_time {
            width: 20%;
          }

          .problem_desc {
            width: 40%;
          }

          .problem_type {
            width: 20%;
            color: $common_blue;

          }

          .problem_status {
            width: 20%;
            display: flex;
            justify-content: center;
            align-items: center;

            .status_txt {
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              border-radius: 5px;
              width: 70%;
              height: 80%;
              font-size: 15px !important;
            }

            .status_ok {
              background-color: $common_success;
            }

            .status_nok {
              background-color: $common_fail;
            }

            .status_appoint {
              background-color: $common_warning;
            }
          }
        }


      }
    }


  }

</style>
