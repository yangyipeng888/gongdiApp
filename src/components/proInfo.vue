<template>
  <div class="pro_info">
    <div class="pro_name">项目名称：{{info.projectName}}<span class="pro_change">切换</span></div>
    <div class="pro_danwei">建设单位：{{info.jianshedanwei}}</div>
  </div>
</template>

<script>
  export default {
    name: 'proInfo',
    data() {
      return {
        info: {
          projectName: '',
          jianshedanwei: ''
        }
      }
    },
    mounted() {
      this.getProInfo()
    },
    methods: {
      getProInfo() {
        let id = this.$store.state.currentSite
        this.$Spi.getShowprojectdetail(id).then(
          (response) => {
            var d = response
            this.info = response
            this.$store.commit('updateInfo', {
              id,
              info: response
            })

          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .pro_info {
    background-color: white;
    padding: 10px;

    .pro_name {
      font-size: 19px;
      font-weight: 600;

      .pro_change {
        padding-left: 10px;
        color: $common_blue;
        font-weight: 100;
        text-decoration: underline;
      }
    }

    .pro_danwei {
      font-size: 18px;
    }
  }
</style>
