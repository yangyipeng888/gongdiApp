<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer" v-show="$store.state.currentSite">
      <van-tabbar v-model="active">
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
          { name: 'person', icon: 'home-o', label: '我的', to: 'user' }
        ]
        obj[AUTH.yezhu] = [
          { name: 'home', icon: 'home-o', label: '首页', to: 'submit' },
          { name: 'map', icon: 'home-o', label: '地图', to: 'submit' },
          { name: 'person', icon: 'home-o', label: '我的', to: 'submit' }
        ]
        obj[AUTH.shigong] = [
          { name: '1', icon: 'home-o', label: 'gongren', to: 'submit' },
          { name: '1', icon: 'home-o', label: 'gongren', to: 'submit' },
          { name: '1', icon: 'home-o', label: 'gongren', to: 'submit' }]
        obj[AUTH.zhengfu] = [
          { name: '1', icon: 'home-o', label: 'gongren', to: 'submit' },
          { name: '1', icon: 'home-o', label: 'gongren', to: 'submit' },
          { name: '1', icon: 'home-o', label: 'gongren', to: 'submit' }]
        return obj[right]
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
    }
  }
</style>
