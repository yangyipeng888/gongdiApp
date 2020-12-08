<template>
  <div>
    <handle v-if="nodeType=='处理'||nodeType=='处理'" :orderData="orderData"></handle>
    <appoint v-if="nodeType=='指派'" :orderData="orderData"></appoint>
    <verify v-if="nodeType=='审核'" :orderData="orderData"></verify>


  </div>
</template>

<script>
  import handle from './handle'
  import verify from './verify'
  import appoint from './appoint'
  import util from './common'

  export default {
    name: 'index',
    data() {
      return {
        orderData: null
      }
    },
    mounted() {
      this.orderData = this.$route.params.gdData
    },
    components: {
      handle,
      verify
    },
    computed: {
      nodeType() {
        if (this.orderData) {
          let account = this.$store.state.account
          let works = this.orderData.works
          // let orderState = this.orderData.orderInfo.orderState
          let work = util.findOwnNode(works, account)
          if (work) {
            return work.nodeType
          }

        }
      }
    }
  }
</script>

<style scoped>

</style>
