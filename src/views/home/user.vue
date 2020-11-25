<template>
  <div class="user_container">

    <div class="top">
      <div class="top_wrap">
        <van-image
          class="profile"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
        <div class="top_msg">
          <div>
            <span class="name">{{$store.state.userName}}</span> <span class="job">员工</span>
          </div>
          <div>
            <!--            <span style="font-size: 16px;">员工</span>-->
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <van-cell value="" is-link to="user">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <van-icon name="manager-o" style="margin-right: 10px;"/>
          <span class="custom-title">我的信息</span>
        </template>
      </van-cell>
      <van-cell value="" is-link to="user">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <van-icon name="manager-o" style="margin-right: 10px;"/>
          <span class="custom-title">修改密码</span>
        </template>
      </van-cell>
      <van-cell value="" is-link to="user">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <van-icon name="manager-o" style="margin-right: 10px;"/>
          <span class="custom-title">系统介绍</span>
        </template>
      </van-cell>

    </div>
    <div style="margin: 20px;">
      <van-button block type="info" native-type="submit"  @click="logout" >
        登出
      </van-button>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import navBar from '../../components/navBar'

  export default {
    name: 'user',
    data() {
      return {
        arr: [1, 2, 3]
      }
    },
    components: {
      navBar
    },
    methods: {
      logout() {
        localStorage.clear()
        this.$store.state.logined = false
        console.log('登出成功！')
        window.location.reload()
      }

    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  .user_container {
    height: 100vh;
    width: 100%;
    position: relative;

    .top {
      height: 150px;
      background-color: $common_blue;
      position: relative;

      .top_wrap {
        position: absolute;
        bottom: 10px;
        display: flex;
        color: white;
        padding-left: 20px;

        .profile {
          width: 100px;
          height: 100px;
        }

        .top_msg {
          padding: 60px 10px 20px 10px;

          .name {
            font-size: 20px;
          }

          .job {
            font-size: 16px;
          }

          span {
            padding-left: 10px
          }
        }
      }
    }

    .content {
      span {
        font-size: 19px;

      }
    }

    .logOut {
      font-size: 18px;
      margin-top: 10px;

    }
  }

</style>
