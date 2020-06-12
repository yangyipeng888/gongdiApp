import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import {
  Spi
} from "../api/api"
Vue.use(Vuex)
const state = {
  jump: null,
  uid: 1,
  loginData: null,
  userName: "",
  right: "",
  pw: "",
  keyDown: false,
  token: null,
  logined: false,
  currentSite: null,
  currentSettings: null,
  currentPage: 0,
  player: null,
  constructionSite: null,
  helmets: [],
  trunks: [],
  warn: [],
  checkins: [],
  streamSource: "",
  allCs: [],
  allAc: [],
  camera: {},
  fullscreen: false
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  updateConstructionSite(state, result) {
    state.loginData = result;
    state.right = result.quanxian;
    state.logined = true;
    var keys = result.projectids.split(",");
    var a = {};
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i].trim();

      var latlng = JSON.parse(result[key].jingweidu);

      a[key] = {
        pid: key,
        token: null,
        name: result[key].name,
        pmid: key,
        aihelmet: [],
        warn: [],
        checkin: [],
        aitrunk: [],
        pm: [],
        position: [latlng["lng"], latlng["lat"]],
        info: "",
        type: result[key].type
      }
    }
    ;
    state.constructionSite = a;
  },
  setSite(state, siteId) {
    Spi.getProjectSettings(siteId.id).then(function (response) {
      state.constructionSite[siteId.id].settings = response;
      state.streamSource = response.shexiangtouid;
      state.currentSettings = response;
    });
    state.currentSite = siteId.id;
  },
}
const actions = {
  // 设置name
  setUserName({ commit }, name) {
    commit('SET_USER_NAME', name)
  }
}
const store = new Vuex.Store({
  state,
  mutations,
  getters
})

export default store
