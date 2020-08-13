let apiIp = process.env.NODE_ENV == 'development' ? 'http://192.168.1.28:8080' : '' //线上


export default {
  problem_status: {
    NOT_APPOINT: '待指派',
    NOT_OK: '未修复',
    OK: '已修复'
  }

}
