<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'App',
    mounted() {
      var that = this
      window.onbeforeunload = function() {
        that.setCooike()
      }
    },
    methods: {
      setCooike() {
        var that = this
        var store = that.$store.state
        if (store.logined) {
          localStorage.setItem(
            'userInfo',
            JSON.stringify({
              uid: store.userName,
              pw: store.pw
            })
          )
        }
      }
    }
  }
</script>
<style lang="scss"></style>
