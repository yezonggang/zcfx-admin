import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
/* Router Modules */
// 招采主体管理
import zcztglRouter from './modules/zcztgl'
// 系统管理
import sysRouter from "./modules/sys";
// 招标搜索
import zbssRouter from "./modules/zbss"
// 文档数据维护
import wdsjwhRouter from "./modules/wdsjwh"
// 招采监管预警
import zcjgyjRouter from "./modules/zcjgyj"
// 招采大屏设计
import zcdpsjRouter from "./modules/zcdpsj"
// 其余零散的菜单
import othersRouter from "./modules/others"
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   菜单是否显示在侧边栏中（默认为false）
 * alwaysShow: true               菜单是否显示在侧边栏中（默认为false）
 *                                如果是flase, 当项目有多个子路径时,它将变成嵌套模式，否则不显示根菜单
 * redirect: noRedirect           如果设置 noRedirect将不会在面包屑中重定向
 * name:'router-name'             该名称被 <keep-alive> 使用(保持一致)，一定要加！！！！！！！！！！！！！！！
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * 没有权限要求的基础页面可以访问所有角色
 */
export const constantRoutes = [

  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        hidden: true,
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/export/camera',
    component: () => import('@/views/zcyjjk/camera'),
    hidden: true
  }
]

/**
 * asyncRoutes:需要根据用户角色动态加载的路由
 */
export const asyncRoutes = [
  ...zcztglRouter,
  ...zcdpsjRouter,
  ...zcjgyjRouter,
  ...wdsjwhRouter,
  ...othersRouter,
  ...zbssRouter,
  /** when your routing map is too long, you can split it into small modules **/
  sysRouter,
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  {
    path: '/theme',
    component: Layout,
    children: [
      {
        hidden: true,
        path: 'index',
        component: () => import('@/views/theme/index'),
        name: 'Theme',
        meta: { title: 'theme', icon: 'theme' }
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
