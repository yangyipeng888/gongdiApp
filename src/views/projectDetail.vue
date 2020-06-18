<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'项目概况'"
      ></nav-bar>
      <van-tabs class="sel_tab" v-model="active" animated sticky>
        <van-tab title="项目概况">
          <div class="form">
            <div class="form_item van-hairline--bottom">
              <div class="form_title">项目名称：</div>
              <div class="form_desc">{{info.projectName}}</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">工期：</div>
              <div class="form_desc">{{info.projectBulidTime}}</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">建设阶段：</div>
              <div class="form_desc">{{info.projectBulidJieduan}}</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">立项完成情况：</div>
              <div class="form_desc">{{info.piwen}}</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">项目规模和建设内容：</div>
              <div class="form_desc">{{info.projectGuimo}}</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="项目负责人">
          <div class="form">
            <div class="form_item van-hairline--bottom">
              <div class="form_title">建设单位：</div>
              <div class="form_desc">{{info.jianshedanwei}}</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">{{info.jianshedanweiname}}({{info.jianshedanweitel}})</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">勘测单位：</div>
              <div class="form_desc">{{info.xianchangdanwei}}</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">{{info.xianchangdanweiname}}({{info.xianchangdanweitel}})</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">设计单位：</div>
              <div class="form_desc">{{info.shejidanwei}}</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">{{info.shejidanweiname}}({{info.shejidanweitel}})</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">监理单位：</div>
              <div class="form_desc">{{info.jianlidanwei}}</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">{{info.jianlidanweiname}}({{info.jianlidanweitel}})</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">施工单位：</div>
              <div class="form_desc">{{info.shigongdanwei}}</div>
            </div>
            <div class="form_item van-hairline--bottom">
              <div class="form_title">负责人：</div>
              <div class="form_desc">{{info.shigongdanweiname}}({{info.shigongdanweitel}})</div>
            </div>
          </div>

        </van-tab>
      </van-tabs>

    </div>

  </div>
</template>

<script>
  import { Spi } from '../api/api'
  import { Toast } from 'vant'
  import navBar from '../components/navBar'

  export default {
    name: 'files',
    data() {
      return {
        active: 0,

        info: {
          projectName: '',
          projectGuimo: '',
          projectBulidTime: '',
          projectBulidJieduan: '',
          piwen: '',
          jianshedanwei: '',
          jianshedanweiname: '',
          jianshedanweitel: '',
          xianchangdanwei: '',
          xianchangdanweiname: '',
          xianchangdanweitel: '',
          shejidanwei: '',
          shejidanweiname: '',
          shejidanweitel: '',
          jianlidanwei: '',
          jianlidanweiname: '',
          jianlidanweitel: '',
          shigongdanwei: '',
          shigongdanweiname: '',
          shigongdanweitel: ''


        }
      }
    },
    components: {
      navBar
    },
    mounted() {
      let projectid = this.$store.state.currentSite
      Spi.getShowprojectdetail(projectid).then((res) => {
        this.info = res
      })
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
