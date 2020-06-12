<template>
  <div id="project_progress" @mouseenter="stopAni" @mouseleave="setAni()">
    <div id="project_progress_mask">
      <transition name="progress_trans" mode="out-in">
        <div class="progress_pannel row_pannel" v-if="tab%3 == 0" key="cap">
          <div class="progress_title">已完成投资</div>
          <div class="progress_row">
            <div class="progress_cell">累计完成：</div>
            <div class="progress_cell">{{noZero(detail.leijiwancheng)}}万</div>
          </div>
          <div class="progress_row">
            <div class="progress_cell">截至去年底完成：</div>
            <div class="progress_cell">{{noZero(detail.jiezhiwancheng)}}万</div>
          </div>
          <div class="progress_row">
            <div class="progress_cell">本年度完成：</div>
            <div class="progress_cell">{{noZero(detail.nianduwancheng)}}万</div>
          </div>
          <div class="progress_row no_f">
            <div class="progress_p">
              <div class="progress_pb" :style="{width:trans(detail.nianduwancheng,detail.niandutouzijihua)}"> &nbsp;
              </div>
            </div>
            <div class="progress_num">
              <div>{{trans(detail.nianduwancheng,detail.niandutouzijihua)}}</div>

              <!--              <div :style="{left:trans(detail.nianduwanchenglv)}">{{trans(detail.nianduwanchenglv)
              }}</div>-->
            </div>
          </div>
          <!--          <div class="progress_row no_f">-->
          <!--            <div class="progress_p">-->
          <!--              <div class="progress_pb" :style="{width:trans(detail.nianduwanchenglv)}"> &nbsp;</div>-->
          <!--            </div>-->
          <!--            <div class="progress_num">-->
          <!--              <div :style="{left:trans(detail.nianduwanchenglv)}">{{trans(detail.nianduwanchenglv)}}</div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <div class="progress_pannel row_pannel" v-if="tab%3 == 1" key="wl">
          <div class="progress_title">已完成工作量</div>
          <div class="progress_row">
            <div class="progress_cell">累计完成：</div>
            <div class="progress_cell">{{noZero(detail.gongzuoliangleijiwancheng)}}万</div>
          </div>
          <div class="progress_row">
            <div class="progress_cell">截至去年底完成：</div>
            <div class="progress_cell">{{noZero(detail.gongzuoliangjiezhiwancheng)}}万</div>
          </div>
          <div class="progress_row">
            <div class="progress_cell">本年度完成：</div>
            <div class="progress_cell">{{noZero(detail.gongzuoliangnianduwancheng)}}万</div>
          </div>
          <div class="progress_row no_f">
            <div class="progress_p">
              <div class="progress_pb"
                   :style="{width:trans(detail.gongzuoliangnianduwancheng,detail.niandutouzijihua)}"> &nbsp;
              </div>
            </div>
            <div class="progress_num">
              <div>{{trans(detail.gongzuoliangnianduwancheng,detail.niandutouzijihua)}}</div>
              <!--              <div :style="{left:trans(detail.gongzuoliangwanchenglv)}">{{trans(detail.gongzuoliangwanchenglv)
              }}</div>-->
            </div>
          </div>
          <!--          <div class="progress_row no_f">-->
          <!--            <div class="progress_p">-->
          <!--              <div class="progress_pb" :style="{width:trans(detail.gongzuoliangwanchenglv)}"> &nbsp;</div>-->
          <!--            </div>-->
          <!--            <div class="progress_num">-->
          <!--              <div :style="{left:trans(detail.gongzuoliangwanchenglv)}">{{trans(detail.gongzuoliangwanchenglv)}}</div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
        <div class="progress_pannel block_pannel" v-if="tab%3 == 2" key="total">
          <div class="progress_column">
            <div class="progress_cell title_v">总投资</div>
            <div class="progress_cell title_v">已批复概算</div>
          </div>
          <div class="progress_column">
            <div class="progress_cell">
              <div>总额</div>
              <div>{{noZero(detail.zongzijin)}}万</div>
            </div>
            <div class="progress_cell">
              <div>总额</div>
              <div>{{noZero(detail.pifuzijin)}}万</div>
            </div>
          </div>
          <div class="progress_column">
            <div class="progress_cell">
              <div>集团出资</div>
              <div>{{noZero(detail.jituanchuzi)}}万</div>
            </div>
            <div class="progress_cell">
              <div>工程概算</div>
              <div>{{noZero(detail.gongchengzijin)}}万</div>
            </div>
          </div>
          <div class="progress_column">
            <div class="progress_cell">
              <div>其它</div>
              <div>{{noZero(detail.qitazijin)}}万</div>
            </div>
            <div class="progress_cell">
              <div>征拆概算</div>
              <div>{{noZero(detail.zhengchaizijin)}}万</div>
            </div>
          </div>
        </div>

      </transition>
    </div>
  </div>
</template>

<script>


  export default {
    name: 'progress-module',
    created() {
      this.setAni();
      this.$store.commit("getInfo", {
        siteId: null
      });
    },
    watch: {
      '$store.state.currentSite': {
        handler(n, o) {
          var that = this;
          let curId = n;
          this.$Spi.getDetail(curId).then(function (response) {
            that.detail = response;
          });
        },
        deep: true,
        immediate: true
      },
    },
    mounted() {
      var that = this;
      that.endLoading(that);
    },
    data() {
      return {
        tab: 2,
        ani: null,
        detail: null,
      }
    },
    computed: {

    },
    methods: {
      stopAni() {
        clearInterval(this.ani);
      },
      setAni() {
        var that = this;
        this.ani = null;
        this.ani = setInterval(function () {
          that.tab += 1;
        }, 5000);
      },
      trans(spe, total) {
        var perc = parseFloat(spe) / parseFloat(total) * 100;
        perc = perc.toFixed(2) + "%"
        return perc
      },
      // trans(str) {
      //   var perc = parseFloat(str);
      //   if (perc > 100) {
      //     perc = 100
      //   }
      //   return perc.toFixed(2) + "%"
      // },
      noZero(num) {
        if (!num || num == "无") {
          return 0
        }
        return num
      }
    }
  }
</script>

<style scoped="scoped">
  #project_progress {
    height: 100%;
    width: 100%;
    color: white;
    background-image: url(/static/bg/gzt2.jpg);
    background-size: 100% 100%;


  }

  #project_progress_mask {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .progress_pannel {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 1rem 1.5rem 1rem 1.5rem;
  }

  .progress_title {
    text-align: center;
    font-weight: 900;
    font-size: 1.1rem;
  }

  .progress_row {
    display: flex;
    flex-direction: row;
    width: 100%;
    font-size: 1rem;
  }

  .progress_row.no_f {
    display: flex;
    flex-direction: column;
  }

  .progress_row.no_f div {
    flex-grow: 1;
  }

  .progress_cell {
    flex-grow: 1;
  }

  .row_pannel .progress_cell:last-child {
    text-align: right;
  }

  .progress_p {
    background-color: white;
    width: 100%;
    height: 1rem;
    overflow: hidden;
    border-radius: 0.5rem;
  }

  .progress_pb {
    background-color: #00D600;
  }

  .progress_num {
    color: black;
    font-size: 0.9rem;
    height: 1rem;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateY(-65%) translateX(-50%);
  }

  /*.progress_num div {*/
  /*  position: absolute;*/
  /*  transform: translateX(-50%);*/
  /*}*/

  .progress_cell.title_v {
    font-size: 0.8rem;
    writing-mode: tb-rl;
    -webkit-writing-mode: vertical-rl;
    white-space: nowrap;
  }

  .progress_pannel.block_pannel {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: center;
  }

  .progress_pannel.block_pannel .progress_column {
    display: flex;
    flex-direction: column;
    justify-content: space-around;

  }

  .progress_pannel.block_pannel .progress_column .progress_cell {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 50%;
  }

  .progress_pannel.block_pannel .progress_column .progress_cell div {
  }

  .progress_pannel.block_pannel .progress_row {

    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }


  .progress_trans-enter-active,
  .progress_trans-leave-active {
    transition: opacity .5s;
  }

  .progress_trans-enter,
  .progress_trans-leave-to {
    opacity: 0;
  }
</style>
