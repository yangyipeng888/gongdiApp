<template>
  <div class="files_container">
    <div class="files_main">
      <van-nav-bar
        class="nav"
        title="半月报概况"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      >
      </van-nav-bar>
      <van-tabs class="sel_tab" v-model="active" animated sticky>
        <van-tab title="资金进度">
          <div class="form">
            <div class="form_item van-hairline--bottom">
              <div class="form_title">项目名称：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">工期：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">建设阶段：</div>
              <div class="form_desc">任天堂让他人托人容忍他</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">立项完成情况：</div>
              <div class="form_desc">任天堂让他人托人容忍他任天堂让他
                任天堂让他人托人容忍他任天堂让他人托人容忍他人托人容忍他
                任天堂让他人托人容忍他任天堂让他人托人容忍他任天堂让他人托人容忍他
              </div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">项目规模和建设内容：</div>
              <div class="form_desc">任天堂让他人托人容忍他任天堂让他
                任天堂让他人托人容忍他任天堂让他人托人容忍他人托人容忍他
                任天堂让他人托人容忍他任天堂让他人托人容忍他任天堂让他人托人容忍他
              </div>
            </div>


          </div>
        </van-tab>
        <van-tab title="进展情况">
          <div class="form">
            <div class="form_item van-hairline--bottom">
              <div class="form_title">建设单位：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">勘测单位：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">设计单位：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">监理单位：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">施工单位：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="项目问题">
          <div class="form">
            <div class="form_item van-hairline--bottom">
              <div class="form_title">建设单位：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">勘测单位：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">设计单位：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">监理单位：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">施工单位：</div>
              <div class="form_desc">手动阀手ddddddddd动阀</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">投入和肉体和</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>

    </div>

  </div>
</template>

<script>
  import { Toast } from 'vant'

  export default {
    name: 'files',
    data() {
      return {}
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      },

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
