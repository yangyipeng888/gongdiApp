<template>
  <div class='files_container'>
    <div class='files_main'>
      <nav-bar class='nav'
               :leftText="'返回'"
               :onClickLeftHandler='onClickLeft'
               :title="'问题上报'"
      ></nav-bar>
      <div class='content'>
        <van-form>
          <van-field
            readonly
            clickable
            name='picker'
            :value='ruleForm.orderStyle'
            label='工单种类'
            placeholder='请点击选择'
          >
          </van-field>
          <van-field
            readonly
            clickable
            name='picker'
            :value='ruleForm.taskName'
            label='任务名称'
            placeholder='请点击选择'
            @click='showLv = true'
          >
          </van-field>
          <!--          <van-field-->
          <!--            v-model="ruleForm.orderType"-->
          <!--            type="textarea"-->
          <!--            name="工单类型"-->
          <!--            label="工单类型"-->
          <!--            placeholder="工单类型"-->
          <!--          >-->
          <!--          </van-field>-->
          <!--          <van-field-->
          <!--            v-model="ruleForm.orderContent"-->
          <!--            type="textarea"-->
          <!--            name="工单内容"-->
          <!--            label="工单内容"-->
          <!--            placeholder="工单内容"-->
          <!--          >-->
          <!--            <template #input>-->
          <!--              <div style="height: 100%;position: absolute;">-->
          <!--                <van-button @click="clickCheck" type="primary" size="small">查看模板</van-button>-->
          <!--              </div>-->
          <!--            </template>-->
          <!--          </van-field>-->
          <!--          <van-field name="uploader" label="图片上传">-->
          <!--            <template #input>-->
          <!--              <van-uploader v-model="uploader" :after-read="afterRead"/>-->
          <!--            </template>-->
          <!--          </van-field>-->
          <van-field
            readonly
            clickable
            name='picker'
            :value='ruleForm.dealTime'
            label='预处理时间'
            placeholder='请点击选择'
            @click='showDate = true'
          >
          </van-field>

          <form-desc v-show='formDescData' ref='myForm' :formDescData='formDescData' @validate='onSubmit'>
            <template v-slot:footer>
              <van-button block native-type='submit' type='info'>提交处理
              </van-button>
            </template>
          </form-desc>

        </van-form>
      </div>

    </div>
    <van-popup v-model='showType' position='bottom'>
      <van-picker
        show-toolbar
        :columns='proTypes'
        @confirm='onConfirmType'
        @cancel='showType = false'
      />
    </van-popup>
    <van-popup v-model='showLv' position='bottom'>
      <van-picker
        show-toolbar
        :columns='proLvs'
        @confirm='onConfirmLv'
        @cancel='showLv = false'
      />
    </van-popup>
    <van-popup v-model='showDate' position='bottom'>
      <van-datetime-picker
        @confirm='onConfirmDate'
        type='datetime'
        title='选择完整时间'
        :min-date='minDate'
      />
    </van-popup>
    <!--    <van-popup v-model="showDialog" style="border-radius: 10px">-->
    <!--      <form-desc ref="myForm" :formDescData="formDescData"></form-desc>-->
    <!--    </van-popup>-->
  </div>
</template>

<script>
import { Toast } from 'vant'
import { ImagePreview } from 'vant'
import navBar from '@/components/navBar'
import uploader from '@/components/uploader'
import formDesc from './formDesc'
import * as util from '@/utils/index'
import TestGlobalComp from '../../components/testGlobalComp'

export default {
  name: 'files',
  components: {
    TestGlobalComp,
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
          let orderStyle = this.taskData[i].orderStyle.trim()
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
            let id = this.$store.state.currentSite
            let style = this.$store.state.constructionSite[id].name
            let name = this.taskData[i].name

            let orderStyle = this.taskData[i].orderStyle
            if (n == name && orderStyle == style) {
              // let content = this.taskData[i].modelData
              // this.ruleForm.orderContent = content
              // this.formDescData = content
              let content = this.taskData[i].logicData
              let nodes = JSON.parse(content).nodes
              for (let i = 0; i < nodes.length; i++) {
                let node = nodes[i]
                if (node.id == 0) {
                  let data = {
                    formDesc: ''
                  }
                  data.formDesc = node.model
                  this.formDescData = JSON.stringify(data)
                  this.ruleForm.orderContent = JSON.stringify(data)
                  break
                }
              }

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
      minDate: new Date(),
      uploader: [],
      formDescData: null,
      ruleForm: {
        applyId: '',
        orderStyle: '',
        orderType: '',
        taskName: '',
        orderContent: '',
        dealTime: '',
        user: ''
      },
      proTypes: [],
      taskData: null,
      proLvs: ['一般', '严重'],
      showType: false,
      showLv: false,
      showDate: false,
      showDialog: false,
      btnDisable: false

    }
  },
  mounted() {
    this.getOptions()

  },
  methods: {
    afterRead(file) {

    },

    clickCheck() {
      if (this.formDescData) {
        this.showDialog = true
      } else {
        Toast.fail('请先选择任务名称')
      }
    },
    setOrderStyle() {
      let id = this.$store.state.currentSite
      let name = this.$store.state.constructionSite[id].name
      this.ruleForm.orderStyle = name
    },
    async getOptions() {
      // await this.getOrderStyle()
      await this.getTaskList()
      this.setOrderStyle()//setOrderStyle 一定要在前两部完成后，不然没数据
    },
    getOrderStyle() {
      return new Promise((resolve, reject) => {
        this.$gdApi.getOrderStyle().then((res) => {
          if (res.code == SUCCESS) {
            this.proTypes = res.data
            resolve()
          }
        }).catch(() => {
          reject()
        })
      })
    },
    getTaskList() {
      return new Promise((resolve, reject) => {
        this.$gdApi.getTaskList().then((res) => {
          if (res.code == SUCCESS) {
            this.taskData = res.data
            this.proLvs = []
            for (let i = 0; i < this.taskData.length; i++) {
              this.proLvs.push(this.taskData[i].name)
            }
            resolve()
          }
        }).catch(() => {
          reject()
        })
      })
    },
    onClickLeft() {
      this.$router.back(-1)
    },


    async onSubmit(e) {
      let myForm = this.$refs.myForm
      //myFormData
      let myFormData = myForm.getFormData()
      let orderContent = JSON.parse(this.ruleForm.orderContent)
      orderContent.formData = myFormData
      orderContent = JSON.stringify(orderContent)
      let myFormFiles = await this.$refs.myForm.getFormFiles()
      let req = {}
      req.imgs = myFormFiles
      req.applyId = this.myConst.appId
      req.orderStyle = this.ruleForm.orderStyle
      req.orderType = this.ruleForm.orderType
      req.taskName = this.ruleForm.taskName
      req.orderContent = orderContent
      req.dealTime = this.ruleForm.dealTime
      req.user = this.$store.state.account
      this.$gdApi.addOrderInfo(req).then((res) => {
        if (res.code == SUCCESS) {
          Toast.success(res.msg)
          this.$router.back(-1)
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
    onConfirmDate(value) {
      this.ruleForm.dealTime = util.dateTrans(value)
      this.showDate = false
    }
  }
}
</script>

<style lang='scss'>
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
