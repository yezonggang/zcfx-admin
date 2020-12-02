
import Layout from '@/layout'
import Blank from "@/layout/components/Blank/index";
  //预警监控
const zcjgyjRouter = [
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
]

export default zcjgyjRouter