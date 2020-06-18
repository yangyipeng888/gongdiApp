<template>
  <div class="app-container">
    <div class="layout-content">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-else></router-view>
    </div>
    <div class="layout-footer" v-show="$store.state.currentSite">
      <TabBar :data="tabbars" @change="handleChange"/>
    </div>
  </div>
</template>

<script>
  import TabBar from '@/components/TabBar'
  export default {
    name: 'AppLayout',
    data() {
      return {
        tabbars: [
          {
            title: '地图',
            to: {
              name: 'Map'
            },
            icon: 'map-marked'
          },
          {
            title: '首页',
            to: {
              name: 'Home'
            },
            icon: 'home-o'
          },
          // {
          //   title: '关于我',
          //   to: {
          //     name: 'About'
          //   },
          //   icon: 'user-o'
          // }
        ]
      }
    },
    components: {
      TabBar,
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
