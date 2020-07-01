<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'问题上报'"
      ></nav-bar>
      <div class="content">
        <van-form @submit="onSubmit">
          <van-field
            disabled
            v-model="pro.projectname"
            name="项目名称"
            label="项目名称"
            placeholder="项目名称"
          >
          </van-field>
          <van-field
            v-model="pro.miaoshu"
            type="textarea"
            name="问题描述"
            label="问题描述"
            placeholder="问题描述"
          >
          </van-field>
          <van-field
            readonly
            clickable
            name="picker"
            :value="pro.type"
            label="问题类型"
            placeholder="请点击选择"
            @click="showType = true"
          >
          </van-field>
          <!--          <van-field-->
          <!--            readonly-->
          <!--            clickable-->
          <!--            name="picker"-->
          <!--            :value="pro.lv"-->
          <!--            label="重要程度"-->
          <!--            placeholder="请点击选择"-->
          <!--            @click="showLv = true"-->
          <!--          >-->
          <!--          </van-field>-->
          <van-field name="uploader" label="问题照片">
            <template #input>
              <!--              <uploader :fileList="fileList" ></uploader>-->
              <van-uploader v-model="fileList"/>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button block type="info" native-type="submit" @click="onSubmit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>

    </div>
    <van-popup v-model="showType" position="bottom">
      <van-picker
        show-toolbar
        :columns="proTypes"
        @confirm="onConfirmType"
        @cancel="showType = false"
      />
    </van-popup>
    <van-popup v-model="showLv" position="bottom">
      <van-picker
        show-toolbar
        :columns="proLvs"
        @confirm="onConfirmLv"
        @cancel="showLv = false"
      />
    </van-popup>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import { ImagePreview } from 'vant'
  import navBar from '../components/navBar'
  import uploader from '../components/uploader'

  export default {
    name: 'files',
    components: {
      navBar,
      uploader
    },
    data() {
      return {
        pro: {
          projectId: '',
          projectname: '',
          account: '',
          filetype: 1,
          zhenggaiqixian: '',
          type: '',
          miaoshu: '',
          fData: null
        },
        fileList: [
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          // { url: 'https://cloud-image', isImage: true }
        ],
        proTypes: ['生产安全', '工地安全'],
        proLvs: ['一般', '严重'],
        showType: false,
        showLv: false

      }
    },
    mounted() {
      let id = this.$store.state.currentSite
      let siteObj = this.$store.state.constructionSite[id]
      let name = siteObj.name
      this.pro.projectname = name
      this.pro.projectId = id
      this.pro.account = this.$store.state.userName
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      },
      onSubmit() {
        var files = new FormData()
        for (let i = 0; i < this.fileList.length; i++) {
          files.append('file', this.fileList[i].file)
        }
        this.pro.fData = files
        this.$Spi.tousuInsert(this.pro).then((res) => {
          if (res && res.msg) {
            Toast.success(res.msg)
          }
        })
      },
      onConfirmType(value) {
        this.pro.type = value
        this.showType = false
      },
      onConfirmLv(value) {
        this.pro.lv = value
        this.showLv = false
      },
      onGetFile(e) {
        console.log(e)
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

      .content {
        width: 100%;
        padding: 0;
        position: absolute;
        top: 46px;
        bottom: 0px;
        left: 0px;
        overflow: scroll;


      }
    }


  }

</style>
