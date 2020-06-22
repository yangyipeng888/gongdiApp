/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录',
      keepAlive: false
    }

  },
  {
    path: '/files',
    name: 'files',
    component: () => import('@/views/files'),
    meta: {
      title: '文件管理',
      keepAlive: false
    }

  },
  {
    path: '/picView',
    name: 'picView',
    component: () => import('@/views/picView'),
    meta: {
      title: '现场照片',
      keepAlive: false
    }

  },
  {
    path: '/projectDetail',
    name: 'projectDetail',
    component: () => import('@/views/projectDetail'),
    meta: {
      title: '项目概况',
      keepAlive: false
    }

  },
  {
    path: '/projectHalfDetail',
    name: 'projectHalfDetail',
    component: () => import('@/views/projectHalfDetail'),
    meta: {
      title: '半月报概况',
      keepAlive: false
    }

  },
  {
    path: '/submit',
    name: 'submit',
    component: () => import('@/views/submit'),
    meta: {
      title: '问题上报',
      keepAlive: false
    }

  },
  {
    path: '/video',
    name: 'video',
    component: () => import('@/views/videol'),
    meta: {
      title: '视频',
      keepAlive: false
    }

  },
  {
    path: '/',
    component: () => import('@/views/layouts/index'),
    redirect: '/home',
    meta: {
      title: '首页',
      keepAlive: false
    },
    children: [
      {
        path: '/map',
        name: 'Map',
        component: () => import('@/views/home/map'),
        meta: { title: '地图', keepAlive: false }
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/about',
        name: 'About',
        component: () => import('@/views/home/about'),
        meta: { title: '关于我', keepAlive: false }
      }
    ]
  }
]
