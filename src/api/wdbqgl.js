import request from '@/utils/request'

// 普通查询统计接口
const dateway = process.env.VUE_APP_BASE_API+'/data'
const fck = process.env.VUE_APP_BASE_API+'/stopword/stopWord/api'


/**
 * 文档标签--分页查询搜索文档
 * @export
 * @param 
 * @returns
 */
export function queryAll(params) {
    return request({
        url: dateway + '/api/wdbq/queryAll',
        method: 'get',
        params
    })
}

/**
 *文档标签树列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function wdbqList(params) {
    return request({
        url: dateway + '/api/bq/bqswh/page',
        method: 'GET',
        params
    })
}


/**
 *标签树信息新增
 *
 * @export
 * @param {*} params
 * @returns
 */
export function wdbqAdd(params) {
    return request({
        url: dateway + '/api/bq/bqswh/add',
        method: 'post',
        data:params
    })
}


/**
 *根据标签代码查询该标签下一共有多少个一级标签
 *
 * @export
 * @param {*} params
 * @returns
 */
export function wdbqCount(params) {
    return request({
        url: dateway + '/api/bq/bqs/count ',
        method: 'get',
        params
    })
}


/**
 *标签信息明细查询
 *
 * @export
 * @param {*} params
 * @returns
 */
export function wdbqSelect(params) {
    return request({
        url: dateway + '/api/bq/bqs/select',
        method: 'get',
        params
    })
}

/**
 *标签信息更新
 *
 * @export
 * @param {*} params
 * @returns
 */
export function wdbqUpdate(params) {
    return request({
        url: dateway + '/api/bq/bqs/update',
        method: 'put',
        data:params
    })
}

/**
 *根据标签id删除标签信息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function wdbqDelete(params) {
    return request({
        url: dateway + '/api/bq/bqs/delete',
        method: 'delete',
        data:params
    })
}

/**
 *查询所有的停用词
 *
 * @export
 * @param 
 * @returns
 */
export function fckfindAll() {
    return request({
        url: fck + '/findAll',
        method: 'get',
    })
}

/**
 *添加停用词
 *
 * @export
 * @param {*} params
 * @returns
 */
export function fckAdd(params) {
    return request({
        url:fck + '/add',
        method: 'post',
        params
    })
}


/**
 *删除停用词
 *
 * @export
 * @param {*} params
 * @returns
 */
export function fckDelete(params) {
    return request({
        url:fck +'/delete',
        method: 'post',
        params
    })
}

/**
 * 获取代码名称
 * 
 * @param {*} params 
 */
export function getdmmc(params) {
    return request({
        url: dateway + '/api/wdbq/wdlb',
        method: 'get',
        params
    })
}

/**
 *文档标签树列表
 *
 * @export
 * @param {*} params
 * @returns
 */             
export function queryWdbq(params) {
    return request({
        url: dateway + '/api/bq/wdaddbq/page',
        method: 'GET',
        params
    })
}

/**
 * 文档标签--文档移除标签
 * @export
 * @param 
 * @returns
 */
export function updateBq(params) {
    return request({
        url: dateway + '/api/wdbq/updateBq',
        method: 'get',
        params
    })
}