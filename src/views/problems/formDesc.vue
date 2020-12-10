<template>
  <div>
    <van-form style="width: 100%;">
      <div v-for="(item,key,index) in desc">
        <van-field
          :disabled="formDisabled"
          v-model="formData[key]"
          v-if="item.type=='input'||item.type=='textarea'||item.type=='number'"
          name="picker"
          :label="item.label"
          placeholder="请输入内容"
        >
        </van-field>
        <van-field
          :disabled="formDisabled"
          readonly
          clickable
          @click="showPop('select',item,key)"
          v-model="formData[key]"
          v-else-if="item.type=='select'"
          name="picker"
          :label="item.label"
          placeholder="请点击选择"
        >
        </van-field>
        <van-field
          :disabled="formDisabled"
          readonly
          clickable
          @click="showPop('date',item,key)"
          v-model="formData[key]"
          v-else-if="item.type=='date'||item.type=='datetime'"
          name="picker"
          :label="item.label"
          placeholder="请点击选择"
        >
        </van-field>
        <van-field v-else :label="item.label" :disabled="formDisabled">
          <template v-if="item.type=='radio'" #input>
            <van-radio-group direction="horizontal" v-model="formData[key]">
              <van-radio v-for="radio in item.options" :name="radio.value">{{radio.text}}</van-radio>
            </van-radio-group>
          </template>
          <template v-else-if="item.type=='upload-file'" #input>
            <van-uploader v-if="!formDisabled" v-model="fileObj[key]" :after-read="afterRead"/>
            <div v-else-if="formData[key]">
              <van-image @click="previewImg(item)" v-for="item in formData[key]" width="100" height="100"
                         :src="item"/>
            </div>
            <div v-else style="color:gray">
              暂无图片
            </div>
          </template>
          <template v-else-if="item.type=='switch'" #input>
            <van-switch v-model="formData[key]"/>
          </template>
          <template v-else-if="item.type=='checkbox'" #input>
            <van-checkbox-group v-model="formData[key]" direction="horizontal">
              <van-checkbox v-for="checkB in item.options" :name="checkB.value">{{checkB.text}}</van-checkbox>
            </van-checkbox-group>
          </template>
          <template v-else #input>
            v
            {{item.type}}
          </template>
        </van-field>
      </div>
      <div>
        <slot name="footer"></slot>
      </div>

    </van-form>
    <van-popup get-container="body" v-model="isShowPop" position="bottom">
      <van-picker
        v-if="showPopType=='select'"
        show-toolbar
        :columns="selections"
        @confirm="selectConfirm"
        @cancel="isShowSelect=false"
      />
      <van-datetime-picker
        v-else-if="showPopType=='date'"
        @confirm="dateConfirm"
        type="date"
        title="选择年月日"
      />
    </van-popup>
  </div>
</template>

<script>
  import { ImagePreview } from 'vant'

  export default {
    name: 'formDesc',
    watch: {
      'formDescData': {
        handler(n, o) {
          if (n) {
            this.desc = JSON.parse(this.formDescData).formDesc
            if (JSON.parse(this.formDescData).formData) {
              this.formData = JSON.parse(this.formDescData).formData
            }

          }
        },
        deep: true,
        immediate: true
      }
    },
    props: ['formDescData', 'formDescImgs', 'canBtn', 'formDisabled'],
    mounted() {
    },
    data() {
      return {
        fileObj: {},
        curPopItem: null,
        curPopKey: null,
        isShowPop: false,
        showPopType: null,
        selections: [1, 1, 1],
        desc: null,
        formData: {}
      }
    },
    methods: {
      afterRead(file) {
        console.log(this.fileObj)
        // console.log(JSON.stringify(this.formData))
      },
      beforeDelete(file) {

      },
      getFormData() {
        return this.formData
      },
      imageToBase64(file) {
        return new Promise((resolve, reject) => {
          var reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => {
            console.log('file 转 base64结果：' + reader.result)
            let iconBase64 = reader.result
            resolve(iconBase64)
          }
        })

      },
      async getFormFiles() {
        let result = []
        for (let key in this.fileObj) {
          let file = {}
          file.fieldName = key
          let imgs = this.fileObj[key]
          let fileImgs = []
          for (let i = 0; i < imgs.length; i++) {
            let a = await this.imageToBase64(imgs[i].file)
            fileImgs.push(a)
          }
          file.img = fileImgs
          result.push(file)
        }
        return result
      },
      showPop(type, item, key) {
        this.isShowPop = true
        this.showPopType = type
        this.curPopItem = item
        this.curPopKey = key
        switch (type) {
          case 'select':
            this.isShowSelect = true
            this.selections = []
            for (let i = 0; i < item.options.length; i++) {
              this.selections.push(item.options[i].text)
            }
            break
          case 'date':
            this.isShowDate = true
            break
        }
      },
      selectConfirm(val) {
        this.isShowPop = false
        for (let i = 0; i < this.curPopItem.options.length; i++) {
          let text = this.curPopItem.options[i].text
          if (text == val) {
            let value = this.curPopItem.options[i].value
            this.formData[this.curPopKey] = value
          }
        }
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
          + ' ' + '00' + seperator2 + '00'
          + seperator2 + '00'
        return currentdate
      },
      dateConfirm(val) {
        this.formData[this.curPopKey] = this.dateTrans(val)
        this.isShowPop = false
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

<style scoped>

</style>
