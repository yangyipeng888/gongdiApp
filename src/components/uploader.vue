<template>
  <div class="uploader_container">
    <van-uploader  bind:after-read="afterRead"/>
  </div>
</template>

<script>
  export default {
    name: 'uploader',
    props: {
      fileList:{
        type:Array,
        default:[]
      },
      afterRead:{
        type:Function,
        default:function() {

        }
      },
    },
    methods:{
      onGetFile(e){
        console.log(e,111111111111)
      }
    }
  }
</script>

<style lang="scss">
  .uploader_container {
    .van-uploader__preview {
    /*margin: 0 1px 1px 0;*/
    }
  }
</style>
