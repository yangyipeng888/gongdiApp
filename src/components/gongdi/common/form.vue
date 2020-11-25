<template>
  <div class="form_container">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div>
      <slot name="list-title"></slot>
    </div>
    <div>
      <slot name="content"></slot>
    </div>
    <div class="form_content" :style="{maxHeight:mh}">
      <transition-group name="checkin_ani">
        <slot name="list"></slot>
      </transition-group>
    </div>
    <div>
      <slot name="footer"></slot>
    </div>


  </div>
</template>

<script>
  export default {
    name: 'problemList',
    props: {
      mh: {
        type: String,
        default: '23vh'
      }
    },
    mounted() {

    },
    destroyed() {

    },
    methods: {
    },
    data() {
      return {
      }

    }
  }
</script>

<style scoped lang="scss">
  .form_container {
    /*width: 100%;*/
    margin: 10px;
    font-size: 16px;
    box-shadow: 0px 0px 5px #888888;
    border-radius: 6px;

    .title {
      display: flex;
      flex-direction: row;
      justify-content: center;
      text-align: center;
      height: 30px;
      line-height: 30px;
      border-radius: 6px 6px 0 0;
      background-color: #54aaff;
      color: white;


    }

    .form_content {
      /*max-height: 150px;*/
      overflow: scroll;

      .nothing {
        line-height: 30px;
        height: 30px;
        text-align: center;
      }


    }


  }


  .checkin_ani-move {
    transition: transform 1s ease;
  }

  /*.checkin_ani-enter-to,*/
  /*.checkin_ani-enter-leave-to {*/
  /*  transition: transform 1s ease;*/
  /*}*/
  .checkin_ani-leave-active,
  .checkin_ani-enter-active {
    transition: transform 1s ease;
  }

  .checkin_ani-enter {
    transform: translateY(-100%);
  }

  .checkin_ani-leave-to {
    transform: translateY(100%);
  }

</style>
