<template>
  <div class="user_container">
    <div class="user_main">
      <nav-bar class="nav"
               :title="'我的'"
      ></nav-bar>
      <div class="content">
        <div class="userbox">
          <img class="userImg" src="../../assets/img/user.png">
          <div class="userText">
            <div class="name">账号名:gongsi</div>
            <div class="comp">xxxx公司</div>
          </div>
        </div>
        <div class="logout_box">
          <van-button class="logout_btn" type="default" @click="logout">退出登录</van-button>

        </div>
      </div>


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
        //		this.changeMain(0, '/login');
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


    .user_main {
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

        .userbox {
          margin-top: 10px;
          background-color: white;
          display: flex;
          flex-direction: row;
          padding: 10px;

          .userImg {
            width: 70px;
            height: 70px;
          }

          .userText {
            padding: 10px 20px;

            .name {
              font-size: 20px;
            }

            .comp {
              font-size: 16px;
            }
          }

        }

        .logout_box {
          margin-top: 100px;
          display: flex;
          flex-direction: row;
          justify-content: center;

          .logout_btn {
            width: 80%;
            font-size: 20px;
          }
        }

      }
    }


  }

</style>
