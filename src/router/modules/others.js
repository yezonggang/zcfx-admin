
import Layout from '@/layout'
//import Blank from "@/layout/components/Blank/index";
// 零散的菜单 如果菜单下又加菜单，请将其从本文件拆分出去
const othersRouter = [
    {
        path: '/iframe/ureport',
        component: Layout,
        children: [
          {
            path: 'index',
            component: () => import('@/views/iframe/ureport'),
            name: 'ureport',
            meta: { title: 'ureport', icon: 'documentation' }
          }
        ]
      },
      {
        path: '/ydhb',
        component: Layout,
        children: [
          {
            path: 'index',
            component: () => import('@/views/ydbg/index'),
            name: 'ydbg',
            meta: { title: 'ydbg', icon: 'ydhb', roles: ['admin'], }
          }
        ]
      },
      {
        path: '/atlas',
        component: Layout,
        children: [
          {
            path: 'atlas',
            component: () => import('@/views/atlas/index'),
            name: 'atlas',
            meta: { title: 'tpcx', icon: 'atlas', noCache: false }
          }
        ]
      },
]

export default othersRouter