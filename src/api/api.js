import {
  get,
  post
} from './http'
import axios from 'axios'

class sApi {
  constructor() {
    // this.Base_url = 'http://192.168.1.7:8080/zhihuigongdi/pazhou/sand.do';
    // this.Base_url2 = 'http://192.168.1.7:8080/zhihuigongdi/export.do';
    // this.Base_url2 = 'http://123.58.244.175:38080/zhihuigongdi/export.do';
    // this.Base_url = 'http://123.58.244.175:38080/zhihuigongdi/pazhou/sand.do';
    // this.Base_url2 = 'http://39.100.94.4:38080/zhihuigongdi/export.do'
    // this.Base_url = 'http://39.100.94.4:38080/zhihuigongdi/pazhou/sand.do'
    this.Base_url2 = 'http://203.88.202.230:8080/zhihuigongdi/export.do'
    this.Base_url = 'http://203.88.202.230:8080/zhihuigongdi/pazhou/sand.do'
  }

  getCurIp() {
    return this.Base_url.split('/pazhou')[0]
  }

  //系统登录
  login = function(account, passwd) {
    var option = {
      account,
      passwd
    }
    return post(`${this.Base_url}?method=login`, option)
  }
  //工地人脸
  getHelmet = function(siteId) {
    var option = {
      projectId: siteId
    }
    return post(`${this.Base_url}?method=getshishi`, option)
  }
  //工地人脸历史
  getHelmetHistory = function(siteId, begin, end, index, num) {
    var option = {
      projectId: siteId,
      beginTime: begin,
      endTime: end,
      pageSize: num,
      pageIndex: index
    }
    return post(`${this.Base_url}?method=getrenlianhistory`, option)
  }
  //工地泥头车
  getTrunk = function(siteId) {
    var option = {
      projectId: siteId
    }
    return post(`${this.Base_url}?method=getchepai`, option)
  }
  //工地泥头车历史
  getTrunkHistory = function(siteId, begin, end, index, num) {
    var option = {
      projectId: siteId,
      beginTime: begin,
      endTime: end,
      pageSize: num,
      pageIndex: index
    }
    return post(`${this.Base_url}?method=getchelianghistory`, option)
  }
  //工地闸机
  getCheckin = function(siteId) {
    var option = {
      projectId: siteId
    }
    return post(`${this.Base_url}?method=getzhajilastdata`, option)
  }
  //工地闸机历史
  getCheckinHistory = function(siteId, bgt, et, name, num, index) {
    var option = {
      projectId: siteId,
      beginTime: bgt,
      endTime: et,
      name: name,
      pageSize: num,
      pageIndex: index
    }
    return post(`${this.Base_url}?method=getzhajihistory`, option)
  }

  //工地详情
  getDetail = function(siteId) {
    var option = {
      projectId: siteId,
      createTime: ''
    }
    return post(`${this.Base_url}?method=showgaikuangjson`, option)
  }
  //工地扬尘
  getDirt = function(siteId, index, num) {
    var option = {
      projectId: siteId,
      beginTime: '2019-01-20 11:00:00',
      endTime: '3040-05-21 11:00:00',
      pageSize: num,
      pageIndex: index
    }
    return post(`${this.Base_url}?method=getYangchenHistory`, option)
  }
  //获取投资计划
  getPlan = function(projectids) {
    var option = {
      method: 'showAllTouziJiHua',
      projectids
    }
    return get(this.Base_url, option)
  }
  //修改投资计划
  setCapPlan = function(data) {
    var option = {
      method: 'piLiangTouZiJiHua',
      data: {
        paramters: data
      }
    }
    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //上传投资计划扫描件
  setPlanFile = function(fData, currentSite, createTime) {
    var option = {
      method: 'POST',
      url: `${this.Base_url2}?method=uploadAllFile&projectId=${currentSite}&createTime=${createTime}&type=2`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: fData
    }
    return axios(option)
  }
  //获取投资计划扫描件
  getPlanFile = function(siteId, year) {
    var option = {
      method: 'getfile',
      data: {
        projectId: siteId,
        createTime: year,
        type: 2
      }
    }
    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //获取所有账号
  getAccounts = function(quanxian) {
    var option = {
      quanxian
    }
    return post(`${this.Base_url}?method=showAllAccount`, option)
  }
  //获取所有工地名称
  getProjects = function(projectids, quanxian) {
    var option = {
      method: 'getAllproject',
      projectids,
      quanxian
    }
    return get(this.Base_url, option)
  }
  //获取工地配置表
  getProjectSettings = function(siteId) {
    var option = {
      method: 'gongdipeizhi',
      data: {
        projectId: siteId
      }
    }
    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //获取工程部工地概况
  getProjectInfo = function(siteId, period) {
    var option = {
      method: 'getgongdipeizhibyprojectid',
      data: {
        projectId: siteId
      }
    }
    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //修改工程部工地概况
  setProjectInfo = function(data) {
    var option = {
      method: 'InsertAndupdategongdipeizhibyprojectid'
    }
    return post(`${this.Base_url}?method=${option.method}`, data)
  }
  //获取指定期数半月报
  getProjectReport = function(siteId, period) {
    var option = {
      method: 'showgaikuangjson',
      data: {
        projectId: siteId,
        createTime: period
      }
    }
    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //获取指定期数半月报
  getProjectReportBanyuebao = function(siteId, period) {
    var option = {
      method: 'showbaoyuebao',
      data: {
        projectId: siteId,
        createTime: period
      }
    }
    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //下载指定期数半月报
  getProjectReportLink = function(siteId, period) {
    var option = {
      method: 'exportExcelbanyuebao',
      data: {
        projectId: siteId,
        createTime: period
      }
    }
    return `${this.Base_url2}?method=${option.method}&projectId=${siteId}&createTime=${period}`
  }
  //上传指定期数半月报扫描件
  setProjectReportFile = function(fData, currentSite, createTime) {
    var option = {
      method: 'POST',
      url: `${this.Base_url2}?method=uploadAllFile&projectId=${currentSite}&createTime=${createTime}&type=13`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: fData
    }
    return axios(option)
  }
  //下载指定期数半月报扫描件
  getProjectReportFile = function(siteId, period) {
    var option = {
      method: 'getfile',
      data: {
        projectId: siteId,
        createTime: period,
        type: 3
      }
    }
    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //获取工地半月报数量
  getProjectReportPeriods = function(siteId) {
    var option = {
      method: 'getgaikuangbyProjectId',
      data: {
        projectId: siteId
      }
    }
    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //更新工地配置表
  setProjectSettings = function(data) {
    var option = {
      method: 'gongdipeizhiupdate'
    }
    return post(`${this.Base_url}?method=${option.method}`, data)
  }
  //添加工地配置表
  addProjectSettings = function(data) {
    var option = {
      method: 'gongdipeizhiinsert'
    }
    return post(`${this.Base_url}?method=${option.method}`, data)
  }
  //提交报告
  setReport = function(siteId, data) {
    var option = {
      method: 'tianbaoInsert',
      projectId: siteId
    }
    return post(`${this.Base_url}?method=${option.method}&projectid=${siteId}`, data)
  }
  //提交年度计划
  setPlan = function(parm) {
    var option = {
      method: 'piLiangTouZiJiHua',
      data: {
        paramters: parm
      }
    }

    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //提交账户修改
  setAc = function(parm) {
    var option = {
      method: 'updateAccount',
      data: parm
    }
    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //新增账户
  addAc = function(parm) {
    var option = {
      method: 'insertAccount',
      data: parm
    }
    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //删除账户
  delAc = function(parm) {
    var option = {
      method: 'deleteAccount',
      data: {
        'account': parm
      }
    }
    return post(`${this.Base_url}?method=${option.method}`, option.data)
  }
  //上传文件
  setFiles = function(id, fileType, desc = '', file, createTime) {

    var option = {
      method: 'POST',
      url: `${this.Base_url2}?method=uploadAllFile&projectId=${id}&createTime=${createTime}&type=${fileType}&miaoshu=${desc}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: file
    }

    return axios(option)
  }
  //获取文件列表
  getFileList = function(id, fileType, startIndex, num, beginTime = null, endTime = null) {
    var option = {
      'projectId': id,
      'type': fileType,
      'pageIndex': startIndex,
      'pageSize': num,
      beginTime,
      endTime
    }
    if (!beginTime || !endTime) {
      delete option.beginTime
      delete option.endTime
    }

    return post(`${this.Base_url}?method=getfiles`, option)
  }
  //获取没提交半月报工地列表
  getUnsubmitted = function(createTime, jianshedanwei, projectId) {
    var option = {
      'createTime': createTime,
      jianshedanwei,
      projectId
    }

    return post(`${this.Base_url}?method=getmeitijiaobanyuebaogongdi`, option)
  }
  //闸机人员信息
  getLaborInfo = function(id) {
    var option = {
      'projectId': id
    }
    return post(`${this.Base_url}?method=getzhajilist`, option)
  }
//文件进度
  getwenjianjindu = function(id) {
    var option = {
      'projectId': id
    }
    return post(`${this.Base_url}?method=getwenjianjindu`, option)
  }
  //调度会报表参数
  getprojectNameandjianshedanwei = function() {
    var option = {}
    return post(`${this.Base_url}?method=getprojectNameandjianshedanwei`, option)
  }
  //下属单位列表
  getprojectBelongList = function(projectids) {
    var option = { projectIds: projectids }
    return post(`${this.Base_url}?method=projectInfo`, option)
  }
  //完成排名
  getXiangmunianduwanchengpaiming = function(projectids) {
    var option = { projectIds: projectids }
    return post(`${this.Base_url}?method=xiangmunianduwanchengpaiming `, option)
  }
  //完成排名
  getGongsinianduwanchengpaiming = function(projectids) {
    var option = { projectIds: projectids }
    return post(`${this.Base_url}?method=gongsinianduwanchengpaiming`, option)
  }
  //问题list
  getCzwtByProjectId = function(projectId, createTime = '') {
    var option = { projectId, createTime }
    return post(`${this.Base_url}?method=getCzwtANDJindu`, option)
  }
  //showprojectdetail
  getShowprojectdetail = function(projectId) {
    var option = { projectId }
    return post(`${this.Base_url}?method=showprojectdetail`, option)
  }
  //返回期数
  getbanyuebaobyprojectId = function(projectId) {
    var option = { projectId }
    return post(`${this.Base_url}?method=getbanyuebaobyprojectId`, option)
  }
  //半月报 字段
  gettouzijihuabyprojectIdandyear = function(projectId, createtime) {
    var option = { projectId }
    return post(`${this.Base_url}?method=gettouzijihuabyprojectIdandyear`, option)
  }
  //问题上报
  tousuInsert = function(options) {
    var option = {
      method: 'POST',
      url: `${this.Base_url}?method=tousuInsert&projectId=${options.projectId}&projectname=${options.projectname}&account=${options.account}&filetype=${options.filetype}&zhenggaiqixian=${options.zhenggaiqixian}&type=${options.type}&miaoshu=${options.miaoshu}`,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: options.fData
    }
    return axios(option)
  }
  //半月报 字段
  getwentiList = function(projectIds) {
    var option = { projectIds }
    return post(`${this.Base_url}?method=getwentiList`, option)
  }
  //更新问题状态
  updatewentibyId = function(Id) {
    var option = { Id }
    return post(`${this.Base_url}?method=updatewentibyId`, option)
  }
}

export const Spi = new sApi()
