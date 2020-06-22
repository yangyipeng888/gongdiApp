<template>
  <van-grid-item class="gridItem_container">
    <slot></slot>
  </van-grid-item>
</template>

<script>
  export default {
    name: 'gridItem'
  }
</script>

<style lang="scss">
  .gridItem_container {
    .van-grid-item__content {
      padding: 0 !important;
    }
  }
</style>
