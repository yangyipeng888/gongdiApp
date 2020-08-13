<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'问题指派'"
      ></nav-bar>
      <div class="content">
        <van-form>
          <van-field
            disabled
            v-model="showItem.projectname"
            name="项目名称"
            label="项目名称"
            placeholder="项目名称"
          >
          </van-field>
          <van-field
            readonly
            disabled
            clickable
            name="picker"
            :value="problemItem.chuliaccount"
            label="处理人"
            placeholder="请点击选择"
            @click="showProblemChuli"
          >
          </van-field>
          <van-field
            readonly
            disabled
            clickable
            name="picker"
            :value="problemItem.finishtime"
            label="处理截止日期"
            placeholder="请点击选择"
            @click="showTimepicker = true"
          >
          </van-field>
          <van-field
            disabled
            v-model="showItem.miaoshu"
            type="textarea"
            name="问题描述"
            label="问题描述"
            placeholder="问题描述"
          >
          </van-field>
          <van-field
            disabled
            v-model="showItem.type"
            name="问题类型"
            label="问题类型"
            placeholder="问题类型"
          >
          </van-field>
          <van-field name="uploader" label="问题照片">
            <template #input>
              <div style="display: flex;width: 100%;flex-wrap: wrap">
                <van-image @click="previewImg(item.url)" v-for="item in showItem.fileList" width="32%" height="250px"
                           style="margin:2px" :src="item.url"/>
              </div>
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
        :columns="appoints"
        @confirm="onConfirm"
        @cancel="showType = false"
      />
    </van-popup>
    <van-popup v-model="showTimepicker" position="bottom">
      <van-datetime-picker
        @confirm="onConfirmTime"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        :formatter="formatter"
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
        minDate: new Date(),
        maxDate: new Date(2125, 10, 1),
        currentDate: new Date(),
        showType: false,
        showTimepicker: false,
        appointObjs: [],
        appoints: [],
        showItem: {
          id: '',
          zhipai: '请选择处理人',
          projectname: '',
          type: '',
          miaoshu: '',
          fileList: []
        },
        problemItem: {
          tousuid: '',
          zhipaiaccount: '',
          chuliaccount: '',
          finishtime: ''
        }


      }
    },
    mounted() {
      this.initData()
      this.getChuliAccount()
    },
    methods: {
      showProblemChuli() {
        if (this.appoints && this.appoints.length) {
          this.showType = true
        } else {
          Toast.fail('请先添加问题处理人')
        }
      },
      formatter(type, val) {
        if (type === 'year') {
          return `${val}年`
        } else if (type === 'month') {
          return `${val}月`
        }
        return val
      },
      initData() {
        if (this.$route.params) {
          this.showItem.projectname = this.$route.params.projectname
          this.showItem.type = this.$route.params.type
          this.showItem.miaoshu = this.$route.params.miaoshu
          let imgpath = this.$route.params.imgpath
          if (imgpath && imgpath.length) {
            this.showItem.fileList = []
            imgpath.forEach((item) => {
              this.showItem.fileList.push(
                { url: item }
              )
            })
          }
        }
      },
      getChuliAccount() {
        // let projectIds = this.$store.state.loginData.projectids
        let projectIds = this.$store.state.currentSite
        this.$Spi.getChuliAccount(projectIds).then((res) => {
          if (res && res.length) {
            this.appointObjs = res
            this.appoints = []
            for (let i = 0; i < res.length; i++) {
              this.appoints.push(res[i].name)
            }
          }
        })
      },
      onClickLeft() {
        this.$router.back(-1)
      },
      onSubmit() {
        this.problemItem.zhipaiaccount = this.$store.state.loginData.account
        this.problemItem.tousuid = this.$route.params.id
        if (!this.problemItem.chuliaccount) {
          Toast.fail('请选择问题处理人！')
          return
        }
        if (!this.problemItem.finishtime) {
          Toast.fail('请选择截止日期！')
          return
        }
        this.$Spi.insertZhipai(this.problemItem).then((res) => {
          if (res && res.state == 200) {
            Toast.success('提交成功！')
          } else {
            Toast.fail('提交失败!')
          }
        })
      },
      onConfirm(item) {
        for (let i = 0; i < this.appointObjs.length; i++) {
          let obj = this.appointObjs[i]
          if (obj.name == item) {
            this.problemItem.chuliaccount = obj.account
            this.showType = false
            return
          }
        }

      },
      onConfirmTime(item) {
        let time = new Date(item)
        let month = time.getMonth() + 1
        month = month.toString().length == 1 ? `0${month}` : month
        let date = time.getDate()
        date = date.toString().length == 1 ? `0${date}` : date
        this.problemItem.finishtime = `${time.getFullYear()}-${month}-${date}`
        this.showTimepicker = false
      },
      previewImg(url) {
        ImagePreview({
          images: [url],
          showIndex: false
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
