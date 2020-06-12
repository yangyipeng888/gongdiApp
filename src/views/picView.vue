<template>
  <div>
    <van-nav-bar
      title="现场图片"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-empty description="暂无图片" />
  </div>
</template>

<script>
  export default {
    name: 'picView',
    methods: {
      onClickLeft() {
        this.$router.back(-1);
      }
    }
  }
</script>

<style scoped>

</style>
