<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'我的工单'"
      ></nav-bar>
      <van-tabs class="sel_tab" v-model="active" animated swipeable>
        <tab :title="'发布工单'">
          <div class="form">
            <form1 :mh="'72vh'">
              <template v-slot:title>
                发布工单
              </template>
              <template v-slot:list-title>
                <div class="listTitle">
                  <div class="title_time">创建者</div>
                  <div class="title_desc">工单id</div>
                  <div class="title_status">工单状态</div>
                  <div class="title_type">操作</div>
                </div>
              </template>
              <template v-slot:list>
                <div class="problem_list" v-show="problems&&problems.length"
                     v-for="pro,index in problems" :key="index">
                  <div class="problem_time van-ellipsis">{{pro.createUser}}</div>
                  <div class="problem_desc">{{pro.id}}</div>
                  <div class="problem_status">
                    <div class="status_txt"
                         :class="{status_ok:pro.orderState==myConst.GD_STATE.FINISH,status_nok:pro.orderState==myConst.GD_STATE.NOT,
            status_appoint:pro.orderState==myConst.GD_STATE.DOING,}"
                    >
                      {{showState(pro.orderState)}}
                    </div>
                  </div>
                  <div @click="clickPro(pro)" class="problem_type">查看</div>

                </div>
              </template>
              <template v-slot:footer>
<!--                <van-pagination @change="getList" v-show="total>0" :total-items="total" v-model="queryParams.pageIndex"-->
<!--                                :items-per-page="queryParams.pageSize"/>-->
              </template>

            </form1>
          </div>
        </tab>
        <tab :title="'处理工单'">
          <div class="form">
            <form1 :mh="'72vh'">
              <template v-slot:title>
                处理工单
              </template>
              <template v-slot:list-title>
                <div class="listTitle">
                  <div class="title_time">创建者</div>
                  <div class="title_desc">工单id</div>
                  <div class="title_status">工单状态</div>
                  <div class="title_type">操作</div>
                </div>
              </template>
              <template v-slot:list>
                <div class="problem_list" v-show="handleProblems&&handleProblems.length"
                     v-for="pro,index in handleProblems" :key="index">
                  <div class="problem_time van-ellipsis">{{pro.createUser}}</div>
                  <div class="problem_desc">{{pro.id}}</div>
                  <div class="problem_status">
                     <div class="status_txt"
                         :class="{status_ok:pro.orderState==myConst.GD_STATE.FINISH,status_nok:pro.orderState==myConst.GD_STATE.NOT,
            status_appoint:pro.orderState==myConst.GD_STATE.DOING,}"
                    >
                      {{showState(pro.orderState)}}
                    </div>
<!--                    <div class="status_txt"-->
<!--                         :class="{status_ok:pro.nodeState==myConst.GD_NODE_STATE.FINISH,-->
<!--                    status_nok:(pro.nodeState==myConst.GD_NODE_STATE.NOT||pro.nodeState==myConst.GD_NODE_STATE.BACK||pro.nodeState==myConst.GD_NODE_STATE.REFUSE),-->
<!--            status_appoint:pro.nodeState==myConst.GD_NODE_STATE.WAITING,}"-->
<!--                    >-->
<!--                      {{showNodeState(pro.nodeState)}}-->
<!--                    </div>-->

                  </div>
                  <div @click="clickMore(pro)" class="problem_type">查看</div>

                </div>
              </template>
              <template v-slot:footer>
<!--                <van-pagination @change="getList" v-show="total>0" :total-items="total" v-model="queryParams.pageIndex"-->
<!--                                :items-per-page="queryParams.pageSize"/>-->
              </template>

            </form1>
          </div>
        </tab>
      </van-tabs>

    </div>
  </div>
</template>

<script>
  import util from '@/views/problems/common'
  import { ImagePreview } from 'vant'
  import navBar from '@/components/navBar'
  import form1 from '@/components/gongdi/common/form'
  import tab from '@/components/tab'


  export default {
    name: 'allProblems',
    components: {
      navBar,
      form1,
      tab
    },
    watch: {},
    data() {
      return {
        active:null,
        gdList: [],
        problems: [],
        handleProblems: [],
        listQuery: {
          state: '-1'
        },
        total: 0,
        queryParams: {
          pageIndex: 1,
          pageSize: 1000
        }
      }
    },
    mounted() {
      this.getList()

    },
    methods: {
      clickMore(row) {
        for (let i = 0; i < this.gdList.length; i++) {
            let item = this.gdList[i]
            if (item.orderInfo.id == row.id) {
              this.$store.state.orderData  = item;
              break
            }
          }
        this.$router.push({
          name: 'myProblemsList',
        })
      },
      clickPro(row) {
        for (let i = 0; i < this.gdList.length; i++) {
          let item = this.gdList[i]
          if (item.orderInfo.id == row.id) {
            this.$store.state.orderData  = item;
            break
          }
        }
        this.$router.push({
          name: 'problemTotalView',
        })
      },
      clickCheck() {
        this.showDialog = true
      },
      showState(orderState) {
        return this.myConst.GD_STATE_LABEL[orderState]
      },
      showNodeState(nodeState) {
        return this.myConst.GD_NODE_STATE_LABEL[nodeState]
      },
      combineFormFile(data){
        let orders = data.orders;
        for (let i = 0; i < orders.length; i++) {
          let imgs = orders[i].imgs;
          if(imgs&&imgs.length){
            let imgsObj = {};
            for(let i=0;i<imgs.length;i++){
              let ii = imgs[i];
              let fieldName =ii.fieldName;
              let thumbnail = ii.thumbnail;
              let img = ii.img;
              let imgUrl = `${this.myConst.gdIp}/profile/${img}`
              if(!imgsObj[fieldName]){
                imgsObj[fieldName]=[];
              }
              // imgsObj[fieldName].push(imgUrl)
              imgsObj[fieldName].push({ url: imgUrl})
            }
            let works =  orders[i].works;
            for(let j=0;j<works.length;j++){
              let work = works[j];
              if(work.workData){
                let workData = JSON.parse(work.workData)
                let formDesc = workData.formDesc;
                let formData = workData.formData;
                let imgsObjKeys = Object.keys(imgsObj);
                let formDescKeys = Object.keys(formDesc);
                for(let k=0;k<imgsObjKeys.length;k++){
                  let key =imgsObjKeys[k]
                  if(formDescKeys.indexOf(key)!=-1){
                    formData[key] = imgsObj[key]
                  }
                }
                work.workData = JSON.stringify(workData);

              }
            }
          }
        }
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
            let orders =  res.data.orders
            this.$store.state.gdList = orders;
            this.gdList = orders;
            res.data.orders.sort(function(a, b) {
              return b.orderInfo.createTime - a.orderInfo.createTime
            })
            res.data.orders.forEach((item) => {
              item.orderInfo.createTime = new Date(item.orderInfo.createTime).toLocaleDateString().split(' ')[0]
            })
            res.data.orders.forEach((item) => {
              item.orderInfo.dealTime = new Date(item.orderInfo.dealTime).toLocaleDateString().split(' ')[0]
            })
            for(let i=0;i<orders.length;i++){
              let order = orders[i];
              let imgs = order.imgs;
              let works = order.works;
              util.combineImgField(imgs,works);
            }
            let account = this.$store.state.account
            this.handleProblems = []
            this.problems = []
            for (let i = 0; i < res.data.orders.length; i++) {
              let item = res.data.orders[i]
              let createUser = item.orderInfo.createUser
              if (createUser == account) {
                this.problems.push(item.orderInfo)
              }
            }
            for (let i = 0; i < res.data.orders.length; i++) {
              let item = res.data.orders[i]
              let works =  item.works
              for(let j=0;j<works.length;j++){
                let work = works[j]
                if(work.nodeType!='开始'&&work.dealUser==account){
                  this.handleProblems.push(item.orderInfo)
                  break
                }
              }
            }
            this.total = res.data.pageSize * this.queryParams.pageSize
          } else {
            this.problems = []
            this.handleProblems = []

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

      .sel_tab {
        position: absolute;
        width: 100%;
        top: 46px;
        bottom: 0;
        overflow: scroll;

        .form {
          /*background-color: white;*/
          border-radius: 10px;


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
              width: 45%;
            }
            .title_status {
              width: 20%;

            }
            .title_type {
              width: 15%;

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
              width: 45%;
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
            .problem_type {
              width: 15%;
              color: $common_blue;

            }
          }


        }

      }

    }


  }

</style>
