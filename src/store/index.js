import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import {
  Spi
} from '../api/api'

Vue.use(Vuex)
const state = {
  jump: null,
  uid: 1,
  loginData: null,
  userName: '',
  right: '',
  pw: '',
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
  streamSource: '',
  allCs: [],
  allAc: [],
  camera: {},
  fullscreen: false,
  selProblemId: null
}
const mutations = {

  updateInfo(state, siteInfo) {
    if (state.constructionSite[siteInfo.id].info.projectId) {
      return
    }

    var s = state.constructionSite[siteInfo.id].info = siteInfo.info
    console.log('数据已更新！')

  },
  updateInfoForce(state, siteInfo) {

    var s = state.constructionSite[siteInfo.id].info = siteInfo.info
    console.log('数据已更新！')

  },
  updateConstructionSite(state, result) {
    state.loginData = result
    state.right = result.quanxian
    state.logined = true
    var keys = result.projectids.split(',')
    var a = {}
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i].trim()

      var latlng = JSON.parse(result[key].jingweidu)

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
        position: [latlng['lng'], latlng['lat']],
        info: '',
        type: result[key].type
      }
    }

    state.constructionSite = a
  },
  getInfo(state, siteId) {
    var id = state.currentSite
    if (siteId.siteId) {
      id = siteId.siteId
    }
    if (state.constructionSite[id].info.projectId) {
      return
    }
    Spi.getDetail(id).then(function(response) {
      state.constructionSite[id].info = response
    })
  },
  setSite(state, siteId) {
    Spi.getProjectSettings(siteId.id).then(function(response) {
      state.constructionSite[siteId.id].settings = response
      state.streamSource = response.shexiangtouid
      state.currentSettings = response
    })
    state.currentSite = siteId.id
  },
  setPage(state, pageId) {
    state.currentPage = pageId.id
  },
  getAllCs() {
    state.allCs = []
    let projectids = state.loginData.projectids
    let quanxian = state.right
    Spi.getProjects(projectids, quanxian).then(function(response) {
      for (var i = 0; i < response.length; i++) {
        state.allCs.push({
          id: String(response[i].projectId),
          name: response[i].projectName,
          cls: false
        })
      }
    })
  },
  getAllAc() {
    state.allAc = []
    let quanxian = state.right
    Spi.getAccounts(quanxian).then(function(response) {
      var accounts = response
      for (var i = 0; i < accounts.length; i++) {
        state.allAc.push({
          account: accounts[i].account == 'null' ? '' : accounts[i].account,
          name: accounts[i].name == 'null' ? '' : accounts[i].name,
          quanxian: accounts[i].quanxian == 'null' ? '' : accounts[i].quanxian,
          passwd: '',
          passwd2: '',
          zhiwei: accounts[i].zhiwei == 'null' ? '' : accounts[i].zhiwei,
          belong: accounts[i].belong == 'null' ? '' : accounts[i].belong,
          Mobile: accounts[i].mobile == 'null' ? '' : accounts[i].mobile,
          Email: accounts[i].email == 'null' ? '' : accounts[i].email,
          Projectids: String(accounts[i].projectIds) != 'null' ? accounts[i].projectIds.split(',') : [],
          shenheprojectids: accounts[i].shenheprojectids == 'null' ? '' : accounts[i].shenheprojectids
        })
      }
    })
  },
  keyLis(state, type) {
    if (type.type == 0) {
      state.keyDown = true
    } else {
      state.keyDown = false
    }
  }

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
