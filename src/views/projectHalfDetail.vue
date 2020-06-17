<template>
  <div class="files_container">
    <div class="files_main">
      <!--      <van-nav-bar-->
      <!--        class="nav"-->
      <!--        title="半月报概况"-->
      <!--        left-text="返回"-->
      <!--        left-arrow-->
      <!--        @click-left="onClickLeft"-->
      <!--      >-->
      <!--      </van-nav-bar>-->
      <nav-bar class="nav"></nav-bar>
      <van-tabs class="sel_tab" v-model="active" animated sticky>
        <van-tab title="资金进度">
          <div class="form">
            <div class="form_item van-hairline--bottom">
              <div class="form_title">当年完成资金：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">总资金：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">累计完成：</div>
              <div class="form_desc">任天堂让他人托人容忍他</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">当年完成工作量：</div>
              <div class="form_desc">任天堂让他人托人容忍他任天堂让他
              </div>
            </div>


          </div>
        </van-tab>
        <van-tab title="进展情况">
          <div class="form">
            <div class="form_item van-hairline--bottom">
              <div class="form_title">进度1：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">进度2：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="项目问题">
          <div class="form">
            <div class="form_item van-hairline--bottom">
              <div class="form_title">临建场地紧张问题：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>

    </div>

  </div>
</template>

<script>
  import { Toast } from 'vant'
  import navBar from '../components/navBar'

  export default {
    name: 'files',
    components: {
      navBar
    },
    data() {
      return {}
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      }

    }
  }
</script>

<style lang="scss">
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
          background-color: white;
          border-radius: 10px;

          .form_item {
            display: flex;
            /*flex-direction: column;*/
            padding: 10px 0;
            margin: 0 10px;
            /*border-bottom: 1px solid lightgray;*/

            .form_title {
              width: 25%;
              font-size: 16px;
              font-weight: 600;
            }

            .form_desc {
              /*text-align: right;*/
              width: 75%;
              font-size: 16px;
              color: darkgray;
            }
          }

          .form_item:last-child {
            border-bottom: none;
          }

        }

      }


    }


  }

</style>
