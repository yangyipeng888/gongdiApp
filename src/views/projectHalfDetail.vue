<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'半月报概况'"></nav-bar>
      <van-tabs class="sel_tab" v-model="active" animated sticky>
        <van-tab title="资金进度">
          <div class="form">
            <div class="form_item van-hairline--bottom">
              <div class="form_title">当年完成资金：</div>
              <div class="form_desc">200(万元)</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">总资金：</div>
              <div class="form_desc">2000(万元)</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">累计完成：</div>
              <div class="form_desc">200(万元)</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">当年完成工作量：</div>
              <div class="form_desc">200(万元)
              </div>
            </div>


          </div>
        </van-tab>
        <van-tab title="进展情况">
          <div class="form">
            <div class="form_item van-hairline--bottom">
              <div class="form_title">进度1：</div>
              <div class="form_desc">经多次协调，北岸办公用地已和经营公司初步达成一致意见，施工单位已进驻办公。
                因项目周边用地紧张，目前便桥平台施工人员在船舶上暂时解决住宿问题。后续需积极协调场地建设工人宿舍。</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="项目问题">
          <div class="form">
            <div class="form_item van-hairline--bottom">
              <div class="form_title">临建场地紧张问题：</div>
              <div class="form_desc">目前情况：工程地处广州新中轴线繁华地带，两岸基本建设完成，施工期办公生活场所、加工场地缺乏。设计中已考虑两岸主墩位置搭设材料存放平台，但办公生活用地未能解决。</div>
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
      return {
        active: 0
      }
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
