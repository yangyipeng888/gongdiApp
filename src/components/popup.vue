<template>
  <van-popup class="myPop" v-model="show" @click-overlay="close">
    <slot></slot>
  </van-popup>
</template>

<script>
  export default {
    name: 'popup',
    data() {
      return {
        show: false
      }
    },
    // props: {
    //   show: {
    //     type: Boolean,
    //     default: false
    //   }
    // },
    methods: {
      open() {
        this.show = true
      },
      close() {
        this.show = false
      }
    }
  }
</script>

<style lang="scss">
  .myPop {
    background-color: transparent;
    border-radius: 5px;
  }
</style>
