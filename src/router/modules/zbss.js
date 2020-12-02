/** 招采分析项目的路由表单独抽取出来不再和框架书写在一个地方**/

import Layout from '@/layout'
// import Blank from "@/layout/components/Blank/index";

const zbssRouter = [
  {
    path: '/zbss',
    component: Layout,
    redirect: '/zbss/index',
    meta: { title: 'zbss', icon: 'example',roles:['admin'] },
    children: [
      {
        path: 'index',
        name: 'zbss',
        component: () => import('@/views/zbss/index'),
        meta: { title: 'zbss', icon: 'search',noCache:true }
      }
    ]
  },
  {
    hidden:true,
    path: '/zbss/doc-detail',
    name: 'doc-detail',
    component: () => import('@/views/zbss/doc-detail'),
    meta: { title: 'doc-detail', icon: 'search' }
  }
]

export default zbssRouter
