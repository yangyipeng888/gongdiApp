let apiIp = process.env.NODE_ENV == 'development' ? 'http://192.168.1.28:8080' : '' //线上


export default {
  appId: 2020120705284754,
  appKey: '2oV64od5KFH8',
  gdIp: 'http://192.168.1.28:18080/',
  // gdIp: 'http://203.88.202.230:9090/',
  GD_STATE: {
    'NOT': 0,
    'DOING': 1,
    'FINISH': 2
  },
  GD_STATE_LABEL: {
    '0': '未处理',//刚创建没有一个节点处理过的时候
    '1': '处理中',
    '2': '已完成'
  },
  GD_NODE_STATE: {
    'NOT': 0,
    'FINISH': 1,
    'BACK': 2
  },
  GD_NODE_STATE_LABEL: {
    '0': '未处理',
    '1': '已处理',
    '2': '回退'
  },
  problem_status: {
    NOT_APPOINT: '待指派',
    NOT_OK: '未修复',
    OK: '已修复'
  }

}
