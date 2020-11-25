
<script>
  export default {
    name: 'testItem',
    methods:{
      onclick(){
        console.log(434)
      }
    },
    render(){
      const hText=`
                       <button onClick={this.onclick}>sdf</button>
                     `
      return <div domPropsInnerHTML={hText}></div>
    }
  }
</script>

<style scoped>

</style>
