<template>
  <div class="nav_container">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :left-arrow="showArrow"
      @click-left="onClickLeftHandler"
    >
      <template #right>
        <van-icon v-show="onClickRightHandler" @click="onClickRightHandler" name="search" size="45"/>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
  export default {
    name: 'navBar',
    computed: {
      showArrow() {
        return !!this.leftText;
      }
    },
    props: ['onClickLeftHandler', 'title', 'onClickRightHandler', 'leftText']
  }
</script>

<style lang="scss">
  .nav_container {
    .van-nav-bar__title {
      color: white;
    }


    .van-nav-bar__text {
      color: white;
    }

    .van-nav-bar {
      background-color: $common_blue;

      .van-icon {
        color: white;

      }
    }

  }
</style>
