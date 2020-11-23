<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer" v-show="$store.state.currentSite">
      <van-tabbar class="tab" v-model="active">
        <van-tabbar-item v-for="tab in tabItems" :to="tab.to" :icon="tab.icon">{{tab.label}}</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
  import TabBar from '@/components/TabBar'
  import Tabbar2 from '../../components/Tabbar2'

  export default {
    name: 'AppLayout',
    computed: {
      tabItems() {
        let right = this.$store.getters.right
        let obj = {}
        obj[AUTH.gongren] = [
          { name: 'home', icon: 'home-o', label: '首页', to: 'home' },
          { name: 'person', icon: 'user-o', label: '我的', to: 'user' }
        ]
        obj[AUTH.yezhu] = [
          { name: 'home', icon: 'home-o', label: '首页', to: 'home' },
          { name: 'map', icon: 'location-o', label: '地图', to: 'map' },
          { name: 'person', icon: 'user-o', label: '我的', to: 'user' }
        ]
        obj[AUTH.shigong] = [
          { name: 'home', icon: 'home-o', label: '首页', to: 'home' },
          { name: 'map', icon: 'location-o', label: '地图', to: 'map' },
          { name: 'person', icon: 'user-o', label: '我的', to: 'user' }
        ]
        obj[AUTH.zhengfu] = [
          { name: 'home', icon: 'home-o', label: '首页', to: 'home' },
          { name: 'map', icon: 'location-o', label: '地图', to: 'map' },
          { name: 'person', icon: 'user-o', label: '我的', to: 'user' }
        ]
        if (obj[right]) {
          return obj[right]
        }
        return [
          { name: 'home', icon: 'home-o', label: '首页', to: 'home' },
          { name: 'person', icon: 'user-o', label: '我的', to: 'user' }
        ]
      }
    },
    data() {
      return {
        active: 0
      }
    },
    components: {
      TabBar,
      Tabbar2
    },
    methods: {
      handleChange(v) {
        console.log('tab value:', v)
      }
    }
  }
</script>
<style scoped lang="scss">
  .app-container {
    height: 100%;

    .layout-content {
      height: 100%;
    }

    .layout-footer {
      .tab {

      }

      .tab /deep/ .van-tabbar-item__icon {
        font-size: 25px !important;
      }

      .tab /deep/ .van-tabbar-item__text {
        font-size: 15px !important;
      }
    }

  }
</style>
