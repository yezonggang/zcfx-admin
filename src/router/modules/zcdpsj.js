
import Layout from '@/layout'
//import Blank from "@/layout/components/Blank/index";
  //预警监控
const zcdpsjRouter = [

    {
        path: '/iframe/daping',
        component: Layout,
        redirect: 'noRedirect',
        name: 'home',
        meta: { title: 'dpsjq', icon: 'dp' },
        children: [
          {
            path: 'view',
            component: () => import('@/views/iframe/daping/view/index'),
            redirect: 'noRedirect',
            name: 'view',
            meta: { title: 'dpck', icon: 'dashboard' },
            children: [
              {
                path: 'http://sjfxpt.zybtp.com/analystrunner/project',
                name: 'project',
                meta: { title: 'xmjydp', icon: 'xmjy', noCache: true }
              },
              {
                path: 'http://sjfxpt.zybtp.com/analystrunner/business',
                name: 'business',
                meta: { title: 'ywfxdp', icon: 'ywfx', noCache: true }
              },
              {
                path: 'http://sjfxpt.zybtp.com/analystrunner/monitor',
                name: 'monitor',
                meta: { title: 'jkjgdp', icon: 'jkjg', noCache: true }
              },
            ]
          },
          {
            path: 'design',
            component: () => import('@/views/iframe/daping/design/index'),
            redirect: 'design',
            name: 'design',
            meta: { title: 'dpsjq', icon: 'edit' },
            children: [
              {
                path: 'designer',
                component: () => import('@/views/iframe/daping/design/designer'),
                name: 'designer',
                meta: { title: 'gcgl', icon: 'projectManagement', noCache: false }
              },
              {
                path: 'layoutManage',
                component: () => import('@/views/iframe/daping/design/layoutManage'),
                name: 'layoutManage',
                meta: { title: 'mbztgl', icon: 'templateManagement', noCache: false }
              },
              {
                path: 'workControl',
                component: () => import('@/views/iframe/daping/design/workControl'),
                name: 'workControl',
                meta: { title: 'sqgl', icon: 'authManagement', noCache: false }
              },
              {
                path: 'dac',
                component: () => import('@/views/iframe/daping/design/dac'),
                name: 'dac',
                meta: { title: 'sjgl', icon: 'dataManagement', noCache: false }
              },
              /* {
                path: 'systemsetting',
                component: () => import('@/views/iframe/daping/design/systemsetting'),
                name: 'systemsetting',
                meta: { title: 'xtpz', icon: 'systemManagement', noCache: false }
              }, */
              {
                path: 'bms',
                component: () => import('@/views/iframe/daping/design/bms'),
                name: 'bms',
                meta: { title: 'jcgl', icon: 'basisManagement', noCache: false }
              },
              {
                path: 'restrict',
                component: () => import('@/views/iframe/daping/design/restrict'),
                name: 'restrict',
                meta: { title: 'mxzxxz', icon: 'modelManagement', noCache: false }
              },
              {
                path: 'databackup',
                component: () => import('@/views/iframe/daping/design/databackup'),
                name: 'databackup',
                meta: { title: 'sjbf', icon: 'dataBackup', noCache: false }
              },
            ]
          },
        ]
      },
]

export default zcdpsjRouter