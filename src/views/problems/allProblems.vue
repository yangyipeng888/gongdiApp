<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'所有工单'"
      ></nav-bar>
      <div class="content">
        <form1 :mh="'72vh'">
          <template v-slot:title>
            所有工单
          </template>
          <template v-slot:list-title>
            <div class="listTitle">
              <div class="title_time">创建者</div>
              <div class="title_desc">创建时间</div>
              <div class="title_type">状态</div>
              <div class="title_status">操作</div>
            </div>
          </template>
          <template v-slot:list>
            <div class="problem_list" v-show="problems&&problems.length"
                 v-for="pro,index in problems" :key="index" @click="clickPro(pro)">
              <div class="problem_time van-ellipsis">{{pro.createUser}}</div>
              <div class="problem_desc van-ellipsis">{{pro.createTime}}</div>
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
        let req = {
          applyId: this.myConst.appId,
          applyKey: this.myConst.appKey,
          orderId: row.id
        }
        this.$gdApi.getWork(req).then((res) => {
          let gdData = { orderInfo: row, works: [] }
          for (let i = 0; i < res.data.length; i++) {
            let item = res.data[i]
            gdData.works.push(item)
          }
          this.$router.push({
            name: 'problemDetails',
            params: {
              gdData,
              showBtn: false
            }
          })
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
        let curSite = this.$store.state.currentSite
        req.orderStyle = this.$store.state.constructionSite[curSite].name
        req.page = this.queryParams.pageIndex
        req.amount = this.queryParams.pageSize
        this.$gdApi.getOrderInfo(req).then(res => {
          if (res.code == SUCCESS) {
            res.data.orders.sort(function(a, b) {
              return b.createTime - a.createTime
            })
            res.data.orders.forEach((item) => {
              item.createTime = new Date(item.createTime).toLocaleDateString().split(' ')[0]
            })
            res.data.orders.forEach((item) => {
              item.dealTime = new Date(item.dealTime).toLocaleDateString().split(' ')[0]
            })
            this.problems = res.data.orders
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
            width: 25%;
          }

          .title_desc {
            width: 35%;
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
            width: 25%;
          }

          .problem_desc {
            width: 35%;
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
