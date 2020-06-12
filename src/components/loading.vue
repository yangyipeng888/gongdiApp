<template>
  <div>
    <van-overlay :show="true">
      <van-loading class="loading" size="100px" vertical type="spinner" color="#1989fa">加载中...</van-loading>
    </van-overlay>
  </div>
</template>

<script>
  export default {
    name: 'loading'
  }
</script>

<style scoped>
  .loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
