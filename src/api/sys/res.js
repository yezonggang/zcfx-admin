import request from '@/utils/request'


/**
 * 查询LtSysRes列表 （精确查询）
 * @param {*} data 查询条件
 */
export function getList(data) {
  return request({
    url: '/sys/res',
    method: 'get',
    params: data
  })
}

/**
 * 查询LtSysRes列表 （模糊查询）
 * @param {*} data 查询条件
 */
export function getPageList(data) {
  return request({
    url: '/sys/res/fuzzy',
    method: 'get',
    params: data
  })
}

/**
 * 保存或者更新LtSysRes
 * @param {*} data LtSysRes信息
 */
export function saveOrUpdate(data) {
  return request({
    url: '/sys/res',
    method: 'post',
    data
  })
}

/**
 * 根据 ID 查询LtSysRes信息
 * @param {*}  id LtSysResID
 */
export function getById(id) {
  return request({
    url: `/sys/res/` + id,
    method: 'get'
  })
}

/**
 * 根据 ID 删除LtSysRes信息
 * @param {*}  id  LtSysResID
 */
export function deleteById(id) {
  return request({
    url: `/sys/res/` + id,
    method: 'delete'
  })
}
