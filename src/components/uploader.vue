<template>
  <div class="uploader_container">
    <van-uploader v-model="fileList"/>
  </div>
</template>

<script>
  export default {
    name: 'uploader',
    props: ['fileList']
  }
</script>

<style lang="scss">
  .uploader_container {
    .van-uploader__preview {
    /*margin: 0 1px 1px 0;*/
    }
  }
</style>
