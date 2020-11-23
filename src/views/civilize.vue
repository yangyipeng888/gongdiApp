<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'文明施工'"
      ></nav-bar>
      <van-tabs class="sel_tab" v-model="active" animated swipeable>
        <tab :title="'人员识别'">
          <div class="form">
            <staff></staff>
          </div>
        </tab>
        <tab :title="'现场视频'">
          <div class="form">
            <video1></video1>
          </div>
        </tab>
        <tab :title="'车辆识别'">
          <div class="form">
            <car></car>
          </div>
        </tab>

      </van-tabs>

    </div>

  </div>
</template>

<script>
  import car from '@/components/gongdi/civilize/car'
  import staff from '@/components/gongdi/civilize/staff'
  import video1 from '@/components/gongdi/civilize/video'

  import { Spi } from '../api/api'
  import { Toast } from 'vant'
  import navBar from '../components/navBar'
  import tab from '../components/tab'

  export default {
    name: 'files',
    components: {
      navBar,
      tab,
      car,
      staff,
      video1
    },
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

<style lang="scss" scoped>
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
          /*background-color: white;*/
          border-radius: 10px;


        }

      }


    }


  }

</style>
