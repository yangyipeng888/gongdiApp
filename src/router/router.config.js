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
    path: '/civilize',
    name: 'civilize',
    component: () => import('@/views/civilize'),
    meta: {
      title: '文明施工',
      keepAlive: false
    }
  },
  {
    path: '/study',
    name: 'study',
    component: () => import('@/views/study'),
    meta: {
      title: '安全学习',
      keepAlive: false
    }
  },
  {
    path: '/quality',
    name: 'quality',
    component: () => import('@/views/quality'),
    meta: {
      title: '质量监管',
      keepAlive: false
    }
  },
  {
    path: '/progress',
    name: 'progress',
    component: () => import('@/views/progress'),
    meta: {
      title: '施工进度',
      keepAlive: false
    }
  },
  {
    path: '/staff',
    name: 'staff',
    component: () => import('@/views/staff'),
    meta: {
      title: '人员监管',
      keepAlive: false
    }
  },
  {
    path: '/safe',
    name: 'safe',
    component: () => import('@/views/safe'),
    meta: {
      title: '安全监管',
      keepAlive: false
    }
  },
  {
    path: '/problemSolved',
    name: 'problemSolved',
    component: () => import('@/views/problemSolved'),
    meta: {
      title: '项目修复',
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
    path: '/allProblems',
    name: 'allProblems',
    component: () => import('@/views/problems/allProblems'),
    meta: {
      title: '所有工单',
      keepAlive: false
    }

  },
  {
    path: '/myProblems',
    name: 'myProblems',
    component: () => import('@/views/problems/myProblems'),
    meta: {
      title: '我的工单',
      keepAlive: true
    }
  },
  {
    path: '/myProblemsList',
    name: 'myProblemsList',
    component: () => import('@/views/problems/myProblemsList'),
    meta: {
      title: '工单详情',
      keepAlive: false
    }
  },
  {
    path: '/problemDetails',
    name: 'problemDetails',
    component: () => import('@/views/problems/problemDetails/index'),
    meta: {
      title: '工单详情',
      keepAlive: false
    }
  },
  {
    path: '/problemTotalView',
    name: 'problemTotalView',
    component: () => import('@/views/problems/problemTotalView'),
    meta: {
      title: '工单详情',
      keepAlive: false
    }
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => import('@/views/problems/submit'),
    meta: {
      title: '问题上报',
      keepAlive: false
    }

  },
  {
    path: '/problemListDetail',
    name: 'problemListDetail',
    component: () => import('@/views/problemListDetail'),
    meta: {
      title: '问题详情',
      keepAlive: false
    }
  },
  {
    path: '/problemAppoint',
    name: 'problemAppoint',
    component: () => import('@/views/problemAppoint'),
    meta: {
      title: '问题详情',
      keepAlive: false
    }
  },
  {
    path: '/problemDetail',
    name: 'problemDetail',
    component: () => import('@/views/problemDetail'),
    meta: {
      title: '问题详情',
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
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', keepAlive: false }
      },
      {
        path: '/map',
        name: 'Map',
        component: () => import('@/views/home/map'),
        meta: { title: '地图', keepAlive: false }
      },
      {
        path: '/user',
        name: 'User',
        component: () => import('@/views/home/user'),
        meta: { title: '我的', keepAlive: false }
      }
    ]
  }
]
