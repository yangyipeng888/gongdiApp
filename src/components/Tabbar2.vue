<template>
  <div class="tabbar_container van-hairline--top-bottom">
    <div class="tabItem" v-for="item in data"
         @click="enter(item.to.name)" :class="{isSel:$route.name==item.to.name}">
      <van-icon class="tabIcon" v-show="item.icon" :name="item.icon"/>
      <img class="tabImg" v-show="item.img" :src="item.img">
      <div class="tabName" v-show="item.title">
        {{item.title}}
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Tabbar2',
    props: {
      defaultActive: {
        type: Number,
        default: 0
      },
      data: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {
      enter(name) {
        this.$router.push({ name: name })
      }
    }
  }
</script>

<style scoped lang="scss">
  .tabbar_container {
    width: 100%;
    height: 65px;
    background-color: white;
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: row;

    .isSel {
      color: #1989fa;

    }

    .tabItem {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .tabIcon {
        font-size: 20px;

      }

      .tabImg {
        height: 85%;
      }

      .tabName {
        font-size: 16px;

      }
    }
  }
</style>
