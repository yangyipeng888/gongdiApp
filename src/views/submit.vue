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
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          >
          </van-field>
          <van-field
            v-model="username"
            name="问题描述"
            label="问题描述"
            placeholder="问题描述"
            :rules="[{ required: true, message: '请填写用户名' }]"
          >
          </van-field>
          <van-field
            readonly
            clickable
            name="picker"
            :value="value"
            label="重要程度"
            placeholder="请点击选择"
            @click="showPicker = true"
          >
          </van-field>
          <van-field name="uploader" label="文件上传">
            <template #input>
              <van-uploader v-model="fileList"/>
            </template>
          </van-field>
          <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>

    </div>
    <van-popup v-model="showPicker" position="bottom">
      <van-picker
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import { ImagePreview } from 'vant'
  import navBar from '../components/navBar'

  export default {
    name: 'files',
    components: {
      navBar
    },
    data() {
      return {
        username: '',
        fileList: [
          { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
          // Uploader 根据文件后缀来判断是否为图片文件
          // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
          { url: 'https://cloud-image', isImage: true }
        ],
        value: '',
        columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
        showPicker: false,
      }
    },
    methods: {
      onClickLeft() {
        this.$router.back(-1)
      },

      onSubmit() {

      },
      onConfirm(value) {
        this.value = value;
        this.showPicker = false;
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
