<template>
  <div class="login_container">
    <div class="title">
      <div>欢迎使用</div>
      <div>广州城投智慧工地</div>
    </div>
    <div class="form">
      <van-field v-model="id" label="用户名" placeholder="请输入用户名"/>
      <van-field v-model="pw" type="password" label="密码" placeholder="请输入密码"/>
      <van-button block type="info" @click="login">登录</van-button>
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
  }
</style>
