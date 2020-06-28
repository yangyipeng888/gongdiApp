<template>
  <div class="map_container" id="total_map">
    <div class="topBox">
      <div class="listBox" @click="showList=true">
        所有
      </div>
      <div class="searchBox">
        <van-search
          class="search"
          v-model="value"
          @input="onInput"
          @search="onSearch"
          shape="round"
          placeholder="请输入搜索工地"
        />
        <div class="searchResults">
          <div class="resultItem" v-for="item in searchResults" @click="showSite(item)">
            {{item.name}}
          </div>
        </div>
      </div>

    </div>

    <!--    <transition name="progress_trans">-->
    <!--      <div-->
    <!--        class="gongdiDes_mask"-->
    <!--        v-show="siteInfo"-->
    <!--        @click.self="close"-->
    <!--      ></div>-->
    <!--    </transition>-->
    <transition name="van-slide-up">
      <div class="gongdiDes_div" v-show="siteInfo">
        <div class="gongdiDes_title"> {{siteInfo.projectName}}</div>
        <div class="gongdiDes_font">
          <span class="gongdiDes_font1">建设单位:  </span>
          <span class="gongdiDes_font2">{{siteInfo.jianshedanwei}}</span>
        </div>
        <div class="gongdiDes_font">
          <span class="gongdiDes_font1">监理单位:  </span>
          <span class="gongdiDes_font2">{{siteInfo.jianlidanwei}}</span>
        </div>
        <div class="gongdiDes_font">
          <span class="gongdiDes_font1">施工单位:  </span>
          <span class="gongdiDes_font2">{{siteInfo.shigongdanwei}}</span>
        </div>
        <van-button
          class="gongdiDes_btn"
          block
          @click="enterGongdi"
          color="linear-gradient(to right, #4bb0ff, #6149f6)">
          查看工地
        </van-button>
      </div>
    </transition>
    <van-popup v-model="showList">
      <div class="allSites">
        <div class="siteItem" v-for="item in markers" @click="showSite(item)">
          {{item.name}}
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
  import MapLoader from '@/api/amap.js'
  import { Toast } from 'vant'

  export default {
    name: 'map',
    computed: {
      siteInfo() {
        var info
        if (this.selSite) {
          info = this.$store.state.constructionSite[this.selSite].info
        }
        if (info) {
          return info
        }
        return ''
      }
    },
    data() {
      return {
        mapStyle: '',
        markers: [],
        map: null,
        colors: [
          { color: 'purple', hex: '#c44dff' },
          { color: 'orange', hex: '#ff9447' },
          { color: 'blue', hex: '#3ecbff' },
          { color: 'green', hex: '#86e22a' },
          { color: 'blueD', hex: '#00f7f5' },
          { color: 'yellow', hex: '#fff44d' },
          { color: 'greenD', hex: '#d8ff12' },
          { color: 'pink', hex: '#fcb0e3' }
        ],
        valTypes: [],
        totalTypes: [],
        selectedTypes: [],
        itemObj: null,
        itemList: [],
        itemList1: [],
        rank2: [],
        rank3: [],
        options: [],
        value: '',
        showList: false,
        textAniId: null,
        textAniTarget: null,
        selSite: null,
        searchResults: null
      }
    },
    mounted() {
    },
    watch: {
      '$store.state.loginData': {
        handler(n, o) {
          var that = this
          if (!Boolean(o)) {
            that.getDanweiList()
          }
        },
        deep: true,
        immediate: true
      },
      'rank2': {
        handler(n, o) {
          var that = this
        },
        deep: true,
        immediate: true
      },
      'rank3': {
        handler(n, o) {
          var that = this

        },
        deep: true,
        immediate: true
      }
    },

    methods: {
      getDanweiList() {
        if (this.$store.state.loginData) {
          let projectids = this.$store.state.loginData.projectids
          this.$Spi.getprojectBelongList(projectids).then((res) => {
            this.createMap()//createMap为什么在这里执行，因为markers的颜色要根据这个接口返回的公司类型，暂时这样做
            let data = res.data
            let itemObj = {}
            let itemList = []
            let selOptions = []
            let selItemsName = []
            let indexArr = ['建投公司', '新中轴公司', '复建公司', '其他']//顺序数组,这边前端来改一下顺序
            let copy = data.concat()
            data = []
            for (let i = 0; i < indexArr.length; i++) {
              let findCompany = indexArr[i]
              let findOut = this._.find(copy, (d) => {
                return d.jianshedanwei == findCompany
              })
              if (findOut) {
                data.push(findOut)
              }
            }

            for (let i = 0; i < data.length; i++) {
              let obj = { text: '', childs: [], show: true }
              let jianshedanwei = data[i].jianshedanwei
              obj.text = jianshedanwei
              selItemsName.push(jianshedanwei)
              let projectdetail = data[i].projectdetail
              if (projectdetail && projectdetail.length) {
                for (let j = 0; j < projectdetail.length; j++) {
                  selOptions.push({ value: projectdetail[j].projectName, label: projectdetail[j].projectName })
                  obj.childs.push({ text: projectdetail[j].projectName, id: projectdetail[j].projectId })
                }
              }
              itemObj[jianshedanwei] = obj.childs
              itemList.push(obj)
            }
            this.itemObj = itemObj
            this.totalTypes = selItemsName
            this.itemList = itemList
            this.options = selOptions
          })
        }
      },
      createMap() {
        var that = this
        MapLoader().then(AMap => {
          if (!that.map) {
            this.map = new AMap.Map('total_map', {
              zoom: 12,
              center: [113.317373, 23.084758],
              mapStyle: this.mapStyle
            })
            // this.map.plugin([
            //   'AMap.ToolBar'
            // ], function() {
            //   that.map.addControl(new AMap.ToolBar({
            //     position: 'RT'
            //   }))
            // })

          }
          var infoWindow = new AMap.InfoWindow({
            isCustom: true,
            offset: new AMap.Pixel(0, -20),
            content: `<div class="mapInfoBox"></div>`
          }) //创建窗体
          that.getMarkers(infoWindow) // 创建标记
          that.map.add(that.markers) //添加标记

        })

      },
      getMarkers(infoWindow) {
        var that = this
        for (var siteKey in that.$store.state.constructionSite) {
          var mark = new AMap.Text({
            position: that.$store.state.constructionSite[siteKey].position,
            text: ' '
          })
          // let hex = this.getTypeColor(that.$store.state.constructionSite[siteKey].name).hex;
          // let color = this.getTypeColor(that.$store.state.constructionSite[siteKey].name).color;
          let type = this.findTypeByName(that.$store.state.constructionSite[siteKey].name)
          mark.setStyle({
            'height': '0.36rem',
            'width': '0.36rem',
            'border': '0',
            'border-radius': '0.36rem',
            'background-color': this.getTypeColor(type).hex,
            'animation': this.getTypeColor(type).color + ' 5s infinite'
          })

          mark.id = siteKey
          // mark.type = that.$store.state.constructionSite[siteKey].type;
          mark.name = that.$store.state.constructionSite[siteKey].name
          mark.on('click', function(ev) {
            that.changeSite(ev.target.id)
          })
          that.markers.push(mark)
          // if (that.valTypes.indexOf(that.$store.state.constructionSite[siteKey].type) == -1) {
          //   that.valTypes.push(that.$store.state.constructionSite[siteKey].type);
          // }

        } //获取Marker
      },
      findTypeByName(name) {
        if (this.itemObj) {
          for (let type in this.itemObj) {
            let childs = this.itemObj[type]
            for (let i = 0; i < childs.length; i++) {
              if (name == childs[i].text) {
                return type
              }
            }
          }
        }
      },
      getTypeColor(type) {
        let index = this.totalTypes.indexOf(type)
        if (this.colors[index]) {
          return this.colors[index]
        } else {
          return { color: 'orange', hex: '#ff9447' }
        }
      },
      changeSite(id) {
        this.selSite = id
        var info = this.$store.state.constructionSite[id].info
        if (!info) {
          let that = this
          this.$Spi.getShowprojectdetail(id).then(
            function(response) {
              var d = response
              that.$store.commit('updateInfo', {
                id,
                info: response
              })

            })
        }
      },
      enterGongdi() {
        if (this.selSite) {
          this.$store.commit('setSite', {
            name: 'siteId',
            id: this.selSite
          })
          this.$router.push({
            path: '/'
          })
        }
      },
      close() {
        this.selSite = null
      },
      showSite(item) {
        this.map.setFitView(item)
        this.searchResults = null
        this.changeSite(item.id)
      },
      onSearch(value) {
        let arr = this.markers
        let results = []
        for (var i = 0; i < arr.length; i++) {
          //如果字符串中不包含目标字符会返回-1
          let name = arr[i].name
          if (name.indexOf(value) >= 0) {
            results.push(arr[i])
          }
        }
        if (results.length == 0) {
          Toast.fail('没有找到工地!')
        }
      },
      onInput(value) {
        let arr = this.markers
        let results = []
        for (var i = 0; i < arr.length; i++) {
          //如果字符串中不包含目标字符会返回-1
          let name = arr[i].name
          if (name.indexOf(value) >= 0) {
            results.push(arr[i])
          }

        }
        this.searchResults = results
      }
    }

  }
</script>

<style lang="scss" scoped>
  .map_container {
    /*height: 100vh;*/
    height: 100%;

    .topBox {
      position: absolute;
      top: 10px;
      z-index: 98;
      width: 100%;
      display: flex;
      flex-direction: row;

      .listBox {
        background-color: white;
        width: 10%;
      }

      .searchBox {
        width: 90%;

        .search {
          background-color: transparent;
        }

        .searchResults {
          background-color: rgba(255, 255, 255, 0.95);
          overflow: scroll;
          max-height: 200px;
          margin: 0 15px;
          border-radius: 5px;

          .resultItem {
            padding: 5px;
            font-size: 20px;
          }

        }
      }


    }

    .gongdiDes_mask {
      width: 100%;
      height: 100%;
      background-color: black;
      opacity: 0.5;
      z-index: 99;
      position: absolute;
    }

    .gongdiDes_div {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      width: 100%;
      /*height: 30%;*/
      border-radius: 8px 8px 0 0;
      background-color: white;
      position: absolute;
      z-index: 100;
      bottom: 0;
      padding: 18px;

      .gongdiDes_title {
        font-size: 26px;
        font-weight: 900;
      }

      .gongdiDes_font {

        .gongdiDes_font1 {
          font-size: 20px;
          font-weight: 900;
        }

        .gongdiDes_font2 {
          font-size: 20px;

        }
      }


      .gongdiDes_btn {
        font-size: 22px;
      }
    }

    .allSites {
      /*background-color: rgba(255, 255, 255, 0.95);*/
      overflow: scroll;
      max-height: 80vh;
      width: 90vw;
      /*border-radius: 20px;*/
      background-color: rgba(255,255,255,0.9);

      .siteItem {
        background-color: transparent;
        font-size: 20px;
        padding: 5px;
      }

    }
  }

</style>
