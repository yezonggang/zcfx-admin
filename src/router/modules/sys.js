/** 招采分析项目的路由表单独抽取出来不再和框架书写在一个地方**/

import Layout from '@/layout'
import Blank from "@/layout/components/Blank/index";

const sysRouter =
  {
    path: '/sys',
    component: Layout,
    name: 'sys',
    meta: {
      title: 'sys',
      icon: 'gear',
      roles:['admin']
    },
    children: [
      {
        path: 'user',
        name: '用户管理',
        component: Blank,
        redirect: '/sys/user/index',
        meta: {
          title: 'user',
          icon: 'tree'
        },
        children: [
          {
            path: 'index',
            component: () => import('@/views/sys/user/index'), // Parent router-view
            name: 'index',
            meta: {title: 'user', icon: 'user-list'}
          },
          {
            path: 'form/:id',
            hidden: true,
            component: () => import('@/views/sys/user/form'), // Parent router-view
            name: 'editUser',
            meta: {title: '编辑用户', icon: 'form'}
          },
          {
            path: 'form',
            hidden: true,
            component: () => import('@/views/sys/user/form'), // Parent router-view
            name: 'addUser',
            meta: {title: '添加用户', icon: 'form'}
          }
        ]
      },
      /* {
        path: 'role',
        name: '角色管理',
        component: Blank, // Parent router-view
        meta: {
          title: 'role',
          icon: 'peoples'
        },
        redirect: '/sys/role/index',
        children: [
          {
            path: 'index',
            hidden: true,
            component: () => import('@/views/sys/role/index'), // Parent router-view
            name: '角色列表',
            meta: {title: '角色列表', icon: 'list'}
          },
          {
            path: 'form',
            hidden: true,
            component: () => import('@/views/sys/role/form'), // Parent router-view
            name: 'addRole',
            meta: {title: '添加角色', icon: 'form'}
          },
          {
            path: 'form/:id',
            hidden: true,
            component: () => import('@/views/sys/role/form'), // Parent router-view
            name: 'editRole',
            meta: {title: '编辑角色', icon: 'form'}
          },
        ]
      }, */
      // {
      //   path: 'dict',
      //   name: '缓存管理',
      //   component: Blank, // Parent router-view
      //   meta: {
      //     title: '缓存管理',
      //     icon: 'example'
      //   },
      //   children: [
      //     {
      //       path: 'index',
      //       component: () => import('@/views/sys/dict/index'), // Parent router-view
      //       name: '缓存列表',
      //       meta: { title: '缓存列表', icon: 'list' }
      //     },
      //     {
      //       path: 'form',
      //       component: () => import('@/views/sys/dict/form'), // Parent router-view
      //       name: '编辑缓存',
      //       meta: { title: '编辑缓存', icon: 'form' }
      //     }
      //   ]
      // },
      // {
      //   path: 'res',
      //   name: '资源管理',
      //   component: Blank, // Parent router-view
      //   meta: {
      //     title: '资源管理',
      //     icon: 'example'
      //   },
      //   children: [
      //     {
      //       path: 'index',
      //       component: () => import('@/views/sys/res/index'), // Parent router-view
      //       name: '资源列表',
      //       meta: { title: '资源列表', icon: 'list' }
      //     },
      //     {
      //       path: 'form/:id',
      //       hidden: true,
      //       component: () => import('@/views/sys/res/form'), // Parent router-view
      //       name: '编辑资源',
      //       meta: { title: '编辑资源', icon: 'form' }
      //     },
      //     {
      //       path: 'form',
      //       hidden: true,
      //       component: () => import('@/views/sys/res/form'), // Parent router-view
      //       name: '添加资源',
      //       meta: { title: '添加资源', icon: 'form' }
      //     }
      //   ]
      // }
    ]
  }


export default sysRouter
