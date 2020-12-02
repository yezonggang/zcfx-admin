import request from '@/utils/request'
import {sysPath} from '@/api/pathConfig'

export function getCacheList(data) {
  return request({
    url: sysPath + '/cache',
    method: 'get',
    params: data
  })
}

export function getCacheTree(data) {
  return request({
    url: sysPath + '/cache/tree',
    method: 'get',
    params: data
  })
}
