/** 招采分析项目的路由表单独抽取出来不再和框架书写在一个地方**/

import Layout from '@/layout'
import Blank from "@/layout/components/Blank/index";

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


//预警监控
{
  path: '/yjjk',
  name: 'yjjk',
  meta: {
    title: 'yjjk',
    icon: 'warning'
  },
  component: Layout,
  children: [
    {
      path: 'index',
      component: () => import('@/views/zcyjjk/index'),
      name: 'zclcyj',
      meta: { title: 'zclcyj', icon: 'leida' }
    },
    {
      path: 'camera',
      component: () => import('@/views/zcyjjk/camera'),
      name: 'pbsjk',
      meta: { title: 'pbsjk', icon: 'camera' }
    },
  ]
},
{
  path: '/iframe/daping',
  component: Layout,
  redirect: 'noRedirect',
  name: 'home',
  meta: { title: 'dpsjq', icon: 'chart' },
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
          meta: { title: 'xmjydp', icon: 'dashboard', noCache: true }
        },
        {
          path: 'http://sjfxpt.zybtp.com/analystrunner/business',
          name: 'business',
          meta: { title: 'ywfxdp', icon: 'dashboard', noCache: true }
        },
        {
          path: 'http://sjfxpt.zybtp.com/analystrunner/monitor',
          name: 'monitor',
          meta: { title: 'jkjgdp', icon: 'dashboard', noCache: true }
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

{
  path: '/sjwh',
  component: Layout,
  redirect: '/sjwh',
  name: 'sjwh',
  meta: { title: 'sjwh', icon: 'sjwh' },
  children: [
    {
      // 标签管理
      path: '/wdbqgl',
      component: Blank,
      name: 'wdbqgl',
      meta: {
        title: 'wdbqgl',
        icon: 'biaoqian'
      },
      children: [
        //标签数维护
        {
          path: 'bqswh',
          name: 'bqswh',
          component: Blank,
          //redirect: '/wdbqgl/bqswh/index',
          meta: {
            title: 'bqswh',
            icon: 'biaoqianshu'
          },
          children: [
            // index 和 id 的检索展示
            {
              path: 'index',
              component: () => import('@/views/wdbqgl/bqswh/index'), // Parent router-view
              name: 'bsqList',
              meta: { title: 'bqswh', icon: 'list' }
            },
            {
              path: 'from/:id',
              hidden: true,
              component: () => import('@/views/wdbqgl/bqswh/from'), // Parent router-view
              name: 'editBqs',
              meta: { title: '编辑标签树', icon: 'from', noCache: true }
            },
            {
              path: 'from',
              hidden: true,
              component: () => import('@/views/wdbqgl/bqswh/from'), // Parent router-view
              name: 'addBqs',
              meta: { title: '新增标签树', icon: 'from', noCache: true }
            }
          ]
        },

        {
          path: 'wdbqwh',
          name: 'wdbqwh',
          component: Blank, // Parent router-view
          meta: {
            title: 'wdbqwh',
            icon: 'biaoqian'
          },
          // redirect: '/wdbqgl/wdbqwh/index',
          children: [
            {
              path: 'index',
              component: () => import('@/views/wdbqgl/wdbqwh/index'), // Parent router-view
              name: 'wdbqList',
              meta: { title: 'wdbqwh', icon: 'list' }
            },
            {
              path: 'from',
              hidden: true,
              component: () => import('@/views/wdbqgl/wdbqwh/from'), // Parent router-view
              name: 'addWdbq',
              meta: { title: '新增文档标签', icon: 'from' }
            },
            {
              path: 'from/:id',
              hidden: true,
              component: () => import('@/views/wdbqgl/wdbqwh/from'), // Parent router-view
              name: 'editWdbq',
              meta: { title: '编辑文档标签', icon: 'from' }
            },
          ]
        },
        {
          path: 'fckwh',
          name: 'fckwh',
          component: Blank, // Parent router-view
          meta: {
            title: 'fckwh',
            icon: 'ciku'
          },
          // redirect: '/wdbqgl/fckwh/index',
          children: [
            {
              path: 'index',
              component: () => import('@/views/wdbqgl/fckwh/index'), // Parent router-view
              name: 'fckList',
              meta: { title: '废词库列表', icon: 'list' }
            },
            {
              path: 'from',
              hidden: true,
              component: () => import('@/views/wdbqgl/fckwh/from'), // Parent router-view
              name: 'addStopWorld',
              meta: { title: '新增废词', icon: 'from' }
            },
            {
              path: 'from/:id',
              hidden: true,
              component: () => import('@/views/wdbqgl/fckwh/from'), // Parent router-view
              // component:Layout,
              // redirect:'wdbqgl/fckwh/from',
              name: 'editStopWorld',
              meta: { title: '编辑废词', icon: 'from' }
            },
          ]
        },
      ]
    },

    {
      path: 'bzj',
      // component: Layout,
      // redirect: '/zcztgl/bzj',
      component: () => import('@/views/zcztgl/bzj'),
      name: 'bzj',
      meta: { title: 'bzj', icon: 'bzj', noCache: true }
    },
    {
      path: 'bzj-edit/:id(.+)',
      hidden: true,
      component: () => import('@/views/zcztgl/bzj-edit'),
      // props: true,
      name: 'bzj-edit',
      meta: { title: '保证金维护详情', icon: 'bzj', noCache: true },
    },

    {
      path: 'bkhf',
      component: () => import('@/views/zcztgl/bkhf'),
      // component: Layout,
      // redirect: 'zcztgl/bkhf',
      name: 'bkhf',
      meta: { title: 'bkhf', icon: 'qiye', noCache: false }
    },
    {
      path: 'bkhf-edit',
      hidden: true,
      component: () => import('@/views/zcztgl/bkhf-edit'),
      name: 'bkhf-edit',
      meta: { title: '企业板块维护详情', icon: 'qiye', noCache: true },
    },
  ]
},
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
      meta: { title: 'ydbg', icon: 'ydhb' }
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
      meta: { title: 'tpcx', icon: 'search', noCache: false }
    }
  ]
},
]

export default zcztglRouter
