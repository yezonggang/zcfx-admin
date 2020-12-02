/** 招采分析项目的路由表单独抽取出来不再和框架书写在一个地方**/

import Layout from '@/layout'
// import Blank from "@/layout/components/Blank/index";

const zcztglRouter = [{
  path: '/zcztgl',
  component: Layout,
  redirect: 'noRedirect',
  name: 'zcztgl',
  meta: {
    title: 'zcztgl',
    icon: 'chart'
  },
  children: [
    {
      path: 'gys',
      component: () => import('@/views/zcztgl/gys'),
      name: 'gysztkh',
      meta: { title: 'gysztkh', icon: 'cd-gongyingshang', noCache: false }
    },
    {
      path: 'gys-detail/:id(.+)',
      component: () => import('@/views/zcztgl/gys-detail'),
      name: 'gys-detail',
      meta: { title: '供应商主体刻画详情', icon: 'cd-gongyingshang', noCache: true },
      hidden: true
    },
    {
      path: 'cgr',
      component: () => import('@/views/zcztgl/cgr'),
      name: 'cgr',
      meta: { title: 'cgr', icon: 'cd-zhaobiaoren', noCache: false }
    },
    {
      path: 'cgr-detail/:zzid(.+)/:zzmc(.+)',
      component: () => import('@/views/zcztgl/cgr-detail'),
      name: 'cgr-detail',
      meta: { title: '招标人主体刻画详情', icon: 'cd-zhaobiaoren', noCache: true },
      hidden: true
    },
    {
      path: 'dljg',
      component: () => import('@/views/zcztgl/dljg'),
      name: 'dljg',
      meta: { title: 'dljg', icon: 'cd-dailijigou', noCache: false }
    },
    {
      path: 'dljg-detail/:id(.+)',
      component: () => import('@/views/zcztgl/dljg-detail'),
      props: true,
      name: 'dljg-detail',
      meta: { title: '代理机构主体刻画详情', icon: 'cd-dailijigou', noCache: true },
      hidden: true
    },
    {
      path: 'pszj',
      component: () => import('@/views/zcztgl/pszj'),
      name: 'pszj',
      meta: { title: 'pszj', icon: 'cd-zhuanjia', noCache: false }
    },
    {
      path: 'pszj-detail/:id(.+)',
      component: () => import('@/views/zcztgl/pszj-detail'),
      props: true,
      name: 'pszj-detail',
      meta: { title: '专家主体刻画详情', icon: 'cd-zhuanjia', noCache: true },
      hidden: true
    },
  ]
},
]

export default zcztglRouter
