<template>
  <div class="login_container">
    <div class="box">
      <div class="logo">
        <div class="logoRound">
          <van-image class="logoImg" :src="logo" fit="contain"/>

        </div>
      </div>

      <div class="title">
        广州城投智慧工地
      </div>
      <div class="form">
        <input class="login_input" placeholder="请输入用户名" v-model="id">
        <input class="login_input" placeholder="请输入密码" v-model="pw" type="password">
        <van-button class="login_btn" block type="info" @click="login"
                    color="linear-gradient(to right, #4bb0ff, #6149f6)">登录
        </van-button>
      </div>
    </div>

  </div>
</template>

<script>
  import { Toast } from 'vant'
  import store from '../store'

  export default {
    name: 'login',
    data() {
      return {
        id: null,
        pw: null,
        logo: require('../assets/img/logo.png')
      }
    },
    methods: {
      login() {
        let that = this
        if (!that.id | !that.pw) {
          Toast.fail('用户名或密码不能为空！')
          return
        }

        this.$Spi.login(this.id, this.pw).then(result => {
          if (result.msg) {
            Toast.success('登陆成功！')
            that.$store.commit('updateConstructionSite', result)
            that.$store.state.logined = true
            that.$store.state.userName = that.id
            that.$store.state.pw = that.pw
            store.commit('setSite', {
              name: 'siteId',
              id: 1001
            })
            setTimeout(() => {
              this.$router.push({
                path: '/'
              })
            }, 500)

          } else {
            Toast.fail('用户名或密码错误！')
          }

        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .login_container {
    background: #fff;
    height: 100vh;
    background-image: url("../assets/img/111.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;

    .box {
      box-shadow: 0px 0px 5px #888888;
      width: 90%;
      .logo {
        height: 35px;
        position: relative;
        .logoRound {
          position: absolute;
          left: 50%;
          top: -210%;
          transform: translateX(-50%);
          .logoImg {
            width:26vw;
          }
        }
      }

      .title {
        font-size: 23px;
        color: cornflowerblue;
        text-align: center;
        padding: 10px;
      }

      .form {
        background-color: rgba(206,206,206,0.6);
        padding: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .login_input {
          padding: 5px;
          margin-top: 20px;
          font-size: 20px;
          background: none;
          outline: none;
          border: 1px solid blue;
          width: 90%;
          height: 30px;
          border-radius: 2px;
        }

        .login_btn {
          margin: 20px;
          width: 93.5%;
        }
      }
    }


  }
</style>
