import axios from 'axios'
import qs from 'qs'

import myConst from '@/utils/const'

let appid = myConst.appId
let appKey = myConst.appKey
let ip = myConst.gdIp
let service = axios.create({
  baseURL: ip,
  timeout: 5000,
  paramsSerializer: function(params) {
    return qs.stringify(params, { arrayFormat: 'brackets' })
  }
})

function get(url, params) {
  return new Promise((resolve, reject) => {
    service.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })

}

function post(url, params) {
  return new Promise((resolve, reject) => {
    service.post(url, params)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })

}


export default {
  getOrderStyle: function() {
    let req = {
      applyId: appid,
      applyKey: appKey
    }
    var method = '/orderTask/getOrderStyle'
    return get(method, req)
  },
  getTaskList: function() {
    let req = {
      applyId: appid,
      orderStyle: '',
      orderType: ''
    }
    var method = '/orderTask/getTaskList'
    return get(method, req)
  },
  addOrderInfo: function(data) {
    var method = '/orderInfo/addOrderInfo'
    return post(method, data)
  },

  getOrderInfo: function(data) {
    var method = '/orderInfo/getOrderInfo'
    return get(method, data)
  },
  getOrderInfoByUser: function(data) {
    var method = '/orderInfo/getOrderInfoByUser'
    return get(method, data)
  },
  getWork: function(data) {
    var method = '/work/getWork'
    return get(method, data)
  },
  dealWork: function(data) {
    var method = '/work/dealWork'
    return post(method, data)
  },
  checkWork: function(data) {
    var method = '/work/checkWork'
    return post(method, data)
  },
  getNewWorkAndImg: function(data) {
    var method = '/orderInfo/getNewWorkAndImg'
    return get(method, data)
  },
  getStaff: function(data) {
    var method = '/staff/getStaff'
    return get(method, data)
  },
  assignWork:function(data) {
    var method = '/work/assignWork'
    return post(method, data)
  },
  isAcceptWork:function(data) {
    var method = 'work/isAcceptWork'
    return post(method, data)
  },
}
