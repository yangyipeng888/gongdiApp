<template>
  <van-tab class="my_tab" :title="title">
    <slot></slot>
  </van-tab>
</template>

<script>
  export default {
    name: 'tab',
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss">
    .van-tabs__line {
      background-color: $common_blue!important;
    }
</style>
