<template>
  <div class="login_container">
    <div class="title">
      <div class="title1">欢迎使用</div>
      <div class="title2">广州城投智慧工地</div>
    </div>
    <div class="form">
      <input class="login_input" placeholder="请输入用户名" v-model="id">
      <input class="login_input" placeholder="请输入密码" v-model="pw" type="password">
      <van-button class="login_btn" block type="info" @click="login"
                  color="linear-gradient(to right, #4bb0ff, #6149f6)">登录
      </van-button>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant'

  export default {
    name: 'login',
    data() {
      return {
        id: null,
        pw: null
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
            setTimeout(() => {
              this.$router.push({
                path: '/map'
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

    .title {
      height: 30%;
      font-size: 23px;
      color: cornflowerblue;
      .title1 {
        position: absolute;
        top: 80px;
        left: 40px
      }

      .title2 {
        position: absolute;
        top: 115px;
        left: 110px
      }
    }

    .form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .login_input {
        font-size: 20px;
        margin-top: 30px;
        background: none;
        outline: none;
        border: 1px solid blue;
        width: 80%;
        height: 35px;
        border-radius: 2px;
      }

      .login_btn {
        margin-top: 50px;
        width: 80%;
      }
    }

  }
</style>
