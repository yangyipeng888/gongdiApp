import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from './router.config.js'
import { Toast } from 'vant'
import store from '../store'
import { Spi } from '../api/api'
// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const createRouter = () =>
  new Router({
    mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    base: 'zhihuigongdiApp/',
    // base: process.env.BASE_URL,
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRouterMap
  })

const router = createRouter()
router.beforeEach((to, from, next) => {
  if (store.state.logined) {
    // 判断是否登录
    if (
      //判断跳转的页面要不要选择工地
      [
        '/map',
        '/login'
      ].indexOf(to.path) == -1 &&
      store.state.currentSite == null
    ) {
      //需要选择而未选择，跳转地图
      alert('未选择工地或未获取到工地信息！')
      next('/map')
    } else {
      //需要选择且选择，直接跳转
      next()
    }
  } else if (localStorage.getItem('userInfo')) {
    //是否有登录记录
    console.log('之前已登录')
    var userInfo = _.cloneDeep(localStorage.getItem('userInfo'))
    var userInfo = JSON.parse(userInfo)
    Spi.login(userInfo.uid, userInfo.pw)
      .then(function(result) {
        store.commit("updateConstructionSite", result);
        store.state.logined = true;
        store.state.userName = userInfo.uid;
        store.state.pw = userInfo.pw;
        //请求登录记录信息
        if (result.msg) {
          console.log('登陆成功！')
          Toast.success('登陆成功！')
        } else {
          localStorage.removeItem('userInfo')
          Toast.fail('用户名或密码错误！')
        }
      })
      .catch(function(e) {
        Toast.fail('请求超时！')
      })
    if (
      //与第一if相同，跳转判断
      [
        '/map',
        '/login'
      ].indexOf(to.path) == -1 &&
      store.state.currentSite == null
    ) {
      alert('未选择工地或未获取到工地信息！')
      next('/map')
    } else {
      //页面没有权限要求就直接访问
      next()
    }
  } else if (to.path != '/login') {
    //没有登录则跳转登录
    next({
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    })
  } else {
    next()
  }
})

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
