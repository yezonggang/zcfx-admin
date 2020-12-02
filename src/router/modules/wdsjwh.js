/** 招采分析项目的路由表单独抽取出来不再和框架书写在一个地方**/

import Layout from '@/layout'
import Blank from "@/layout/components/Blank/index";
const wdsjwhRouter = [
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
                    meta: { title: 'bqswh', icon: 'biaoqianshu' }
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
                    meta: { title: 'wdbqwh', icon: 'wdbqwh' }
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
                meta: { title: 'fckwh', icon: 'form'},
                // redirect: '/wdbqgl/fckwh/index',
                children: [
                  {
                    path: 'index',
                    component: () => import('@/views/wdbqgl/fckwh/index'), // Parent router-view
                    name: 'fckList',
                    meta: { title: 'fckwh', icon: 'feici' }
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
            path: 'bzj-add',
            hidden: true,
            component: () => import('@/views/zcztgl/bzj-edit'),
            // props: true,
            name: 'bzj-add',
            meta: { title: '保证金维护详情', icon: 'bzj', noCache: false },
          },
          {
            path: 'bzj-edit/:id(.+)',
            hidden: true,
            component: () => import('@/views/zcztgl/bzj-edit'),
            // props: true,
            name: 'bzj-edit',
            meta: { title: '保证金维护详情', icon: 'bzj', noCache: false },
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
]

export default wdsjwhRouter
