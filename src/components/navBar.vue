<template>
  <div class="nav_container">
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :left-arrow="leftText!=''"
      @click-left="onClickLeftHandler"
    >
      <template #right>
        <span v-show="rightText!=''" class="rightText" @click="onClickRightHandler">{{rightText}}</span>
        <van-icon v-show="showRight" @click="onClickRightHandler" name="search" size="45"/>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
  export default {
    name: 'navBar',
    computed: {},
    data() {
      return {}
    },
    props: {
      title: {
        type: String,
        default: ''
      },
      leftText: {
        type: String,
        default: ''
      },
      onClickLeftHandler: {
        type: Function,
        default: function() {

        }
      },
      rightText: {
        type: String,
        default: ''
      },
      showRight: {
        type: Boolean,
        default: false
      },
      onClickRightHandler: {
        type: Function,
        default: function() {
          return null
        }
      }
    },
    methods: {}
    // props: ['onClickLeftHandler', 'title', 'onClickRightHandler', 'leftText']
  }
</script>

<style lang="scss">
  .nav_container {
    .rightText {
      color: white;
      font-size: 18px;
      text-decoration: underline;
    }

    .van-nav-bar__title {
      color: white;
      font-size: 19px;
    }

    .van-icon-search {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .van-icon-search::before {
      font-size: 30px !important;
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

    .van-hairline--bottom {
      &::after {
        border-bottom-width: 0!important;
      }

    }

  }
</style>
