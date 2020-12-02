import request from '@/utils/request'
import qs from 'qs'

// 普通查询统计接口
const dateway = process.env.VUE_APP_BASE_API+'/data'

// 包括es搜索、数据导入导出
const elasticsearch = process.env.VUE_APP_BASE_API_ES_ADMIN

/**
 * 月度汇报-项目交易情况
 * @export
 * @param 
 * @returns
 */
export function xmjyqkJSON() {
    return request({
        url: dateway + '/api/ydhb/xmjyqk',
        method: 'get',
    })
}

/**
 * 月度汇报-项目交易情况-招标总金额
 * @export
 * @param 
 * @returns
 */
export function findZbzje() {
    return request({
        url: dateway + '/api/ydhb/zje',
        method: 'get',
    })
}

/**
 * 月度汇报-主体分析-上月供应商数量
 * @export
 * @param 
 * @returns
 */
export function findGyssl() {
    return request({
        url: dateway + '/api/ydhb/ztfx/sygyssl',
        method: 'get',
    })
}

/**
 * 月度汇报-主体分析-供应商总数量
 * @export
 * @param 
 * @returns
 */
export function findGyszsl() {
    return request({
        url: dateway + '/api/ydhb/ztfx/gyzsl',
        method: 'get',
    })
}

/**
 * 月度汇报-主体分析-专家总数量
 * @export
 * @param 
 * @returns
 */
export function findZjzsl() {
    return request({
        url: dateway + '/api/ydhb/ztfx/zjzsl',
        method: 'get',
    })
}

/**
 * 月度汇报-主体分析-招标方(采购人)总数量
 * @export
 * @param 
 * @returns
 */
export function findCgrzsl() {
    return request({
        url: dateway + '/api/ydhb/ztfx/cgrzsl',
        method: 'get',
    })
}

/**
 * 月度汇报-主体分析-供应商中标率
 * @export
 * @param 
 * @returns
 */
export function findGyszbl() {
    return request({
        url: dateway + '/api/ydhb/ztfx/gyszbl',
        method: 'get',
    })
}

/**
 * 月度汇报-异常情况    
 * @export
 * @param 
 * @returns
 */
export function findYcqk() {
    return request({
        url: dateway + '/api/ydhb/ycqk',
        method: 'get',
    })
}

/**
 * 月度汇报-各板块统计情况-招标项目分布(饼图)
 * @export
 * @param 
 * @returns
 */
export function findZbxmfb() {
    return request({
        url: dateway + '/api/ydhb/bk/zbxmfb',
        method: 'get',
    })
}

/**
 * 月度汇报-板块统计情况
 * @export
 * @param 
 * @returns
 */
export function findBKtj() {
    return request({
        url: dateway + '/api/ydhb/bk/tjqk',
        method: 'get',
    })
}

/**
 * 月度汇报-异常情况-新增黑名单
 * @export
 * @param 
 * @returns
 */
export function findHmd() {
    return request({
        url: dateway + '/api/ydhb/xzhmd',
        method: 'get',
    })
}

/**
 * 月度汇报-异常情况-文件相似度
 * @export
 * @param 
 * @returns
 */
export function findWjxsd() {
    return request({
        url: dateway + '/api/ydhb/ycqk/wjxsd',
        method: 'get',
    })
}

/**
 * 月度汇报-主体分析-供应商成交金额TOP10
 * @export
 * @param 
 * @returns
 */
export function findGyscjje() {
    return request({
        url: dateway + '/api/ydhb/ztfx/gyscjje',
        method: 'get',
    })
}

export function download(data) {
    return request({
        url: elasticsearch+'/ydhb/save',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:data,
    })
}

export function regenerate2(data) {
    return request({
        url: elasticsearch+'/ydhb/regenerate',
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data:data,
    })
}

export function realyDown(url) {
    window.location = elasticsearch+url
}
