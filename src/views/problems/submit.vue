<template>
  <div class="files_container">
    <div class="files_main">
      <nav-bar class="nav"
               :leftText="'返回'"
               :onClickLeftHandler="onClickLeft"
               :title="'问题上报'"
      ></nav-bar>
      <div class="content">
        <van-form>
          <van-field
            readonly
            clickable
            name="picker"
            :value="ruleForm.orderStyle"
            label="工单种类"
            placeholder="请点击选择"
            @click="showType = true"
          >
          </van-field>
          <van-field
            readonly
            clickable
            name="picker"
            :value="ruleForm.taskName"
            label="任务名称"
            placeholder="请点击选择"
            @click="showLv = true"
          >
          </van-field>
          <van-field
            v-model="ruleForm.orderType"
            type="textarea"
            name="工单类型"
            label="工单类型"
            placeholder="工单类型"
          >
          </van-field>
          <van-field
            v-model="ruleForm.orderContent"
            type="textarea"
            name="工单内容"
            label="工单内容"
            placeholder="工单内容"
          >
            <template #input>
              <div style="height: 100%;position: absolute;">
                <van-button @click="clickCheck" type="primary" size="small">查看模板</van-button>
              </div>
            </template>
          </van-field>
          <van-field
            readonly
            clickable
            name="picker"
            :value="ruleForm.dealTime"
            label="处理时间"
            placeholder="请点击选择"
            @click="showDate = true"
          >
          </van-field>

          <!--          <van-field name="uploader" label="问题照片">-->
          <!--            <template #input>-->
          <!--              &lt;!&ndash;              <uploader :fileList="fileList" ></uploader>&ndash;&gt;-->
          <!--              <van-uploader v-model="fileList"/>-->
          <!--            </template>-->
          <!--          </van-field>-->
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
    <van-popup v-model="showDate" position="bottom">
      <van-datetime-picker
        @confirm="onConfirmDate"
        type="date"
        title="选择年月日"
      />
    </van-popup>
    <van-popup v-model="showDialog" style="border-radius: 10px">
      <form-desc :formDescData="formDescData"></form-desc>
    </van-popup>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import { ImagePreview } from 'vant'
  import navBar from '@/components/navBar'
  import uploader from '@/components/uploader'
  import * as formResolver from '@/utils/formResolver'
  import formDesc from './formDesc'

  export default {
    name: 'files',
    components: {
      navBar,
      uploader,
      formDesc
    },
    watch: {
      'ruleForm.orderStyle': {
        handler(n, o) {
          if (!n) {
            return
          }
          this.proLvs = []
          for (let i = 0; i < this.taskData.length; i++) {
            let orderStyle = this.taskData[i].orderStyle
            if (n == orderStyle) {
              this.proLvs.push(this.taskData[i].name)
            }
          }
          this.ruleForm.taskName = ''
        },
        deep: true,
        immediate: true
      },
      'ruleForm.taskName': {
        handler(n, o) {
          if (!n) {
            this.ruleForm.orderContent = ''
            this.formDescData = ''
          } else {
            for (let i = 0; i < this.taskData.length; i++) {
              let name = this.taskData[i].name
              if (n == name) {
                let content = this.taskData[i].model.data
                this.ruleForm.orderContent = content
                this.formDescData = content
                break
              }
            }
          }

        },
        deep: true,
        immediate: true
      }
    },
    data() {
      return {
        formDescData: null,
        ruleForm: {
          fileList: '',
          applyId: '',
          orderStyle: '',
          orderType: '',
          taskName: '',
          orderContent: '',
          dealTime: '',
          user: '',
        },
        fileList: [
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          // { url: 'https://cloud-image', isImage: true }
        ],
        proTypes: ['生产安全', '工地安全'],
        taskData: null,
        proLvs: ['一般', '严重'],
        showType: false,
        showLv: false,
        showDate: false,
        showDialog: false

      }
    },
    mounted() {
      let id = this.$store.state.currentSite
      this.getOptions()

    },
    methods: {
      clickCheck() {
        this.showDialog = true
      },
      getOptions() {
        this.$gdApi.getOrderStyle().then((res) => {
          if (res.code == SUCCESS) {
            this.proTypes = res.data
          }
        }).catch(() => {

        })
        this.$gdApi.getTaskList().then((res) => {
          if (res.code == SUCCESS) {
            this.taskData = res.data
            this.proLvs = []
            for (let i = 0; i < this.taskData.length; i++) {
              this.proLvs.push(this.taskData[i].name)
            }
          }
        }).catch(() => {

        })
      },
      onClickLeft() {
        this.$router.back(-1)
      },
      onSubmit(formName) {
        let formData = new FormData();
        formData.append('file', this.ruleForm.fileList);
        formData.append('applyId', this.myConst.appId);
        formData.append('orderStyle', this.ruleForm.orderStyle);
        formData.append('orderType', this.ruleForm.orderType);
        formData.append('taskName', this.ruleForm.taskName);
        formData.append('orderContent', this.ruleForm.orderContent);//待处理
        formData.append('dealTime', this.ruleForm.dealTime);
        formData.append('user', this.$store.state.account);
        this.$gdApi.addOrderInfo(formData).then((res) => {
          if (res.code == SUCCESS) {
            Toast.success(res.msg);
          } else {

          }
        })

      },
      onConfirmType(value) {
        this.ruleForm.orderStyle = value
        this.showType = false
      },
      onConfirmLv(value) {
        this.ruleForm.taskName = value
        this.showLv = false
      },
      dateTrans(val) {
        var date = new Date(val)
        var seperator1 = '-'
        var seperator2 = ':'
        var month = date.getMonth() + 1
        var strDate = date.getDate()
        if (month >= 1 && month <= 9) {
          month = '0' + month
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = '0' + strDate
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
          + ' ' + date.getHours() + seperator2 + date.getMinutes()
          + seperator2 + date.getSeconds()
        return currentdate
      },
      onConfirmDate(value) {
        this.ruleForm.dealTime = this.dateTrans(value);
        this.showDate = false
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
