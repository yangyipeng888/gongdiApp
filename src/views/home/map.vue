<template>
  <div class="map_container" id="total_map">
    <div class="topBox">
      <van-image class="listImg" :src="allImg" fit="contain"
                 @click="openAll"/>
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
    <div class="siteLegend" v-show="totalTypes&&totalTypes.length">
      <div class="siteLegendRow" @click="selectType(type)" v-for="(type,index) in totalTypes"
           :class="{'inactiveL':(selectedTypes.length!=0)&&(selectedTypes.indexOf(type)==-1)}">
        <div class="siteLegendColor" :style="{'background-color':getTypeColor(type).hex}"></div>
        <div class="siteLegendText">{{type}}</div>
      </div>
    </div>
    <transition name="van-slide-up">
      <div class="gongdiDes_div" v-show="siteInfo">
        <div class="gongidDes_close" @click="onCancelSite"></div>
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
    <popup ref="popUp">
      <div class="allSites">
        <div class="siteItem" v-for="item in markers" @click="onSelListSite(item)">
          {{item.name}}
        </div>
      </div>
    </popup>
  </div>
</template>

<script>
  import MapLoader from '@/api/amap.js'
  import popup from '@/components/popup'
  import { Toast } from 'vant'

  export default {
    name: 'map',
    components: {
      popup
    },
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
        allImg: require('../../assets/img/全部.png'),
        mapStyle: 'amap://styles/5db57f25559986e3ddef9376fa24adf3',
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
            that.onSelSite(ev.target.id)
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
      selectType(type) {
        var that = this
        if (that.selectedTypes.indexOf(type) == -1) {
          that.selectedTypes.push(type)
        } else {
          that.selectedTypes.splice(that.selectedTypes.indexOf(type), 1)
        }

        if (that.selectedTypes.length == that.totalTypes.length) {
          that.selectedTypes = []
        }
        // console.log(this.itemList,this.markers,this.itemObj);

        that.map.remove(that.markers)
        if (that.selectedTypes.length == 0) {
          that.map.add(that.markers)
        } else {
          for (let i = 0; i < this.selectedTypes.length; i++) {
            let childs = this.itemObj[this.selectedTypes[i]]
            for (var j = 0; j < that.markers.length; j++) {
              let name = that.markers[j].name
              let has = this._.find(childs, (d) => {
                return d.text == name
              })
              if (has) {
                that.map.add(that.markers[j])

              }

            }
          }

        }
      },
      openAll() {
        this.$refs.popUp.open()
      },
      onSelListSite(item) {
        this.map.setFitView(item)
        this.$refs.popUp.close()
        this.onSelSite(item.id)
      },
      onSelSite(id) {
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
      onCancelSite() {
        this.selSite = null
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
        this.onSelSite(item.id)
      },
      onSearch(value) {

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
      justify-content: center;
      /*align-items: center;*/

      .listImg {
        background-color: white;
        width: 10%;
        height: 35px;
        margin: 10px 0 10px 10px;
      }

      .searchBox {
        width: 90%;
        margin: 10px;
        position: relative;

        .search {
          background-color: transparent;
          padding: 0;
        }

        .searchResults {
          background-color: rgba(255, 255, 255, 0.95);
          overflow: scroll;
          max-height: 200px;
          margin: 5px;
          border-radius: 5px;

          .resultItem {
            padding: 5px;
            font-size: 20px;
          }

        }
      }


    }

    .siteLegend {
      z-index: 100;
      position: absolute;
      left: 8px;
      bottom: 80px;

      .inactiveL {
        opacity: 0.6;
      }

      .siteLegendRow {
        display: flex;
        /*justify-content: center;*/
        align-items: center;
        padding: 3px;
        .siteLegendColor {
          width: 35px;
          height: 20px;
          border-radius: 5px;
          box-shadow: 0 0 10px #041233;

        }

        .siteLegendText {
          color: white;
          font-size: 18px;
          padding-left: 5px;
          /*box-shadow: 0 0 10px #041233;*/
          text-shadow: 0 0 10px #041233
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

      .gongidDes_close {
        position: absolute;
        top: 5px;
        right: 5px;
        background-image: url("../../assets/img/关闭.png");
        background-size: contain;
        width: 20px;
        height: 20px;
      }

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
      background-color: rgba(255, 255, 255, 0.9);

      .siteItem {
        background-color: transparent;
        font-size: 20px;
        padding: 5px;
      }

    }
  }

</style>
