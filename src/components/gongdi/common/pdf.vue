<template>
  <div class="pdfBox">
    <pdf
      class="pdf"
      v-for="i in pageCount"
      :key="i"
      :src="src"
      :page="i"
    ></pdf>
  </div>

</template>

<script>
  import pdf from 'vue-pdf'

  export default {
    name: 'pdf',
    props: ['url'],
    watch: {
      'url': {
        handler(n, o) {
          // if (n) {
          //   this.src = pdf.createLoadingTask(this.url)
          //   this.src.promise.then(pdf => {
          //     this.pageCount = pdf.numPages
          //   })
          // }

        },
        deep: true,
        immediate: true
      }
    },
    mounted(){
      let src = 'http://image.cache.timepack.cn/nodejs.pdf'
      this.src = pdf.createLoadingTask(src)
      this.src.promise.then(pdf => {
        this.pageCount = pdf.numPages
      })
    },
    data() {
      return {
        src: null,
        pageCount: 0
      }
    },
    methods: {}
  }
</script>

<style scoped lang="scss">
  .pdfBox {
    height: 100%;
    width: 100%;
    overflow-y: scroll;

    .pdf {
      height: 100%;
      width: 100%;

    }
  }

</style>
