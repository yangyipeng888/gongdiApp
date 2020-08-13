<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'问题修复'"
      ></nav-bar>
      <div class="content">
        <van-form >
          <van-field
            disabled
            v-model="problemItem.projectname"
            name="项目名称"
            label="项目名称"
            placeholder="项目名称"
          >
          </van-field>
          <van-field
            v-model="problemItem.miaoshu"
            type="textarea"
            name="问题描述"
            label="问题描述"
            placeholder="问题描述"
          >
          </van-field>
          <van-field
            disabled
            v-model="problemItem.type"
            name="问题类型"
            label="问题类型"
            placeholder="问题类型"
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
          <van-field name="uploader" label="修复照片">
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
        problemItem: {
          id: '',
          projectname: '',
          type: '',
          miaoshu: ''
        },
        fileList: [
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          // { url: 'https://cloud-image', isImage: true }
        ]

      }
    },
    mounted() {
      this.problemItem.projectname = this.$route.params.projectname
      this.problemItem.id = this.$route.params.id
      this.problemItem.type = this.$route.params.type

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

        this.problemItem.fData = files
        this.problemItem.filetype = 2
        this.problemItem.account = this.$store.state.userName
        this.$Spi.updatewentibyId(this.problemItem).then((res) => {
          Toast.success('提交成功!')
          this.$router.back(-1)
          // this.$router.push({ name: 'problemDetail' })
        })

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
