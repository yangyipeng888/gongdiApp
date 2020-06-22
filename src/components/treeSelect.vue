<template>
  <div class="treeSel_container">
    <van-tree-select
      class="tree"
      :items="items"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      @click-item="getFileList"
    />
  </div>
</template>

<script>
  export default {
    name: 'treeSelect',
    props: {
      items: {
        type: Array,
        default: []
      },
      activeId: {
        type: Number,
        default: 0
      },
      activeIndex: {
        type: Number,
        default: 0
      },
      getFileList: {
        type: Function,
        default: function() {

        }
      }

    }
  }
</script>

<style lang="scss">
  .treeSel_container {

    .van-tree-select__nav-item::before {
      background-color: $common_blue;
    }
    .van-tree-select__item--active{
      color: $common_blue;
    }
  }
</style>
