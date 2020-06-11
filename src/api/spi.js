// axios
import request from '@/utils/request'

// 登录
// export function login(data) {
//   return request({
//     url: "?method=login",
//     method: 'post',
//     data
//   })
// }
export default {
  login: function(data) {
    return request({
      url: '?method=login',
      method: 'post',
      data
    })
  }
}


