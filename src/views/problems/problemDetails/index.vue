<template>
  <div>
    <publish :order="order" :work="work" v-if="isPublish"></publish>
    <finish :order="order" :work="work" v-if="isFinish"></finish>
    <handle :order="order" :work="work" v-if="isHandle"></handle>
    <appoint :order="order" :work="work" v-if="isAppoint"></appoint>
    <!--    <appointAccept v-if="isAppointAccept"></appointAccept>-->
    <verify :order="order" :work="work" v-if="isVerify"></verify>
    <back :order="order" :work="work" v-if="isBack"></back>
  </div>
</template>

<script>
  import navBar from '@/components/navBar'
  import tab from '@/components/tab'
  import publish from './publish'
  import handle from './handle'
  import appoint from './appoint'
  import appointAccept from './appointAccept'
  import verify from './verify'
  import finish from './finish'
  import back from './back'
  import util from '@/views/problems/common'

  export default {
    name: 'index',
    // provide() {
    //   return {
    //     order: this.order,
    //     work: this.work
    //   }
    // },
    data() {
      return {
        order: null,
        work: null
      }
    },
    mounted() {
      this.order = this.$route.params.order
      this.work = this.$route.params.work
    },
    components: {
      navBar,
      tab,
      publish,
      handle,
      verify,
      appoint,
      appointAccept,
      finish,
      back
    },
    computed: {
      // isStart() {
      //   return this.nodeType == this.myConst.GD_NODE_TYPE.kaishi
      // },
      isPublish() {
        return this.nodeType == this.myConst.GD_NODE_TYPE.kaishi
      },
      isHandle() {
        return this.nodeState == this.myConst.GD_NODE_STATE.NOT && (this.nodeType == this.myConst.GD_NODE_TYPE.tianbao || this.nodeType == this.myConst.GD_NODE_TYPE.chuli)
      },
      isAppoint() {
        return this.nodeState == this.myConst.GD_NODE_STATE.NOT && this.nodeType == this.myConst.GD_NODE_TYPE.zhipai
      },
      isAppointAccept() {
        return this.nodeState == this.myConst.GD_NODE_STATE.NOT && this.nodeType == this.myConst.GD_NODE_TYPE.zhipai
      },
      isVerify() {
        return this.nodeState == this.myConst.GD_NODE_STATE.NOT && this.nodeType == this.myConst.GD_NODE_TYPE.shenhe
      },
      isFinish() {
        if (this.nodeType == this.myConst.GD_NODE_TYPE.kaishi) {
          return false
        }
        return this.nodeState == this.myConst.GD_NODE_STATE.FINISH || this.nodeState == this.myConst.GD_NODE_STATE.WAITING
      },
      isBack() {
        //回退
        return this.nodeState == this.myConst.GD_NODE_STATE.BACK
      },
      nodeState() {
        if (this.work) {
          // '0': '未处理',
          //   '1': '已处理',
          //   '2': '回退',
          //   '3': '待审核',
          //   '4': '拒绝',
          return this.work.nodeState
        }
      },
      nodeType() {
        if (this.work) {
          return this.work.nodeType //'填报'  处理  审核 指派
        }
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      }
    }
  }
</script>

<style scoped lang="scss">
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
          margin: 10px;
          /*background-color: white;*/
          border-radius: 10px;


        }

      }


    }


  }
</style>
