import request from '@/utils/request'

export function getListByPid(params) {
  return request({
    url: '/uap/menus/pid/m00',
    method: 'get',
    params
  })
}
