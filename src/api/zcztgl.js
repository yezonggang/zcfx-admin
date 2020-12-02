import request from '@/utils/request'

// 普通查询统计接口
const dateway = process.env.VUE_APP_BASE_API+'/data'

// 包括es搜索、数据导入导出
const elasticsearch = process.env.VUE_APP_BASE_API_ES_ADMIN

/**
 * 评审专家列表查询
 * @export
 * @param {*} params
 * @returns
 */
export function fetchPszjxxList(params) {
    return request({
        url: dateway + '/api/zt/pszjxx/page/findByName',
        method: 'get',
        params
    })
}
/**
 * 评审专家年龄性别统计查询
 * @export
 * @param 
 * @returns
 */
export function fetchPszjxxNlxbtj() {
    return request({
        url: dateway + '/api/zt/pszjxx/statistics/zjnlxbtj',
        method: 'get'
    })
}
/**
 * 评审专家数量统计查询
 * @export
 * @param 
 * @returns
 */
export function fetchPszjxxZjsltj() {
    return request({
        url: dateway + '/api/zt/pszjxx/statistics/zjsl',
        method: 'get'
    })
}

/**
 * 根据ID查询单个评审专家
 * @export
 * @param {*} params
 * @returns
 */
export function fetchPszjxxById(params) {
    return request({
        url: dateway + '/api/zt/pszjxx/findById',
        method: 'get',
        params
    })
}
/**
 * 根据ID查询评审专家参与项目数折线图
 * @export
 * @param {*} params
 * @returns
 */
export function fetchPszjxxCyxms(params) {
    return request({
        url: dateway + '/api/zt/pszjxx/statistics/cyxms',
        method: 'get',
        params
    })
}
/**
 * 根据ID查询评审专家参与项目列表
 * @export
 * @param {*} params
 * @returns
 */
export function fetchPszjxxZjpsxm(params) {
    return request({
        url: dateway + '/api/zt/pszjxx/zjpsxm',
        method: 'get',
        params
    })
}
/**
 * 同名专家处罚新闻列表
 * @export
 * @param {*} params
 * @returns
 */
export function fetchPszjxxCfxw(params) {
    return request({
        url: dateway + '/api/zt/pszjxx/cfxw',
        method: 'get',
        params
    })
}
/**
 * 代理机构列表查询
 * @export
 * @param {*} params
 * @returns
 */
export function fetchDljgList(params) {
    return request({
        url: dateway + '/api/zt/dljg/page/findByName',
        method: 'get',
        params
    })
}
/**
 * 代理机构词云统计
 * @export
 * @param 
 * @returns
 */
export function fetchDljgGdljgcy() {
    return request({
        url: dateway + '/api/zt/dljg/statistics/gdljgcy',
        method: 'get'
    })
}
/**
 * 代理机构各代理机构代理板块数量统计
 * @export
 * @param 
 * @returns
 */
export function fetchDljgGdljgdlbk() {
    return request({
        url: dateway + '/api/zt/dljg/statistics/gdljgdlbk',
        method: 'get'
    })
}
/**
 * 代理机构详情查询
 * @export
 * @param 
 * @returns
 */
export function fetchDljgDetail(params) {
    return request({
        url: dateway + '/api/zt/dljg/findById',
        method: 'get',
        params
    })
}

/**
 * 代理机构基本信息查询
 * @export
 * @param 
 * @returns
 */
export function finddljgxx(params) {
    return request({
        url: dateway + '/api/zt/dljgxx/findById',
        method: 'get',
        params
    })
}
/**
 * 单个代理机构代理板块金额统计
 * @export
 * @param 
 * @returns
 */
export function fetchDljgDlgbkje(params) {
    return request({
        url: dateway + '/api/zt/dljg/statistics/dlgbkje',
        method: 'get',
        params
    })
}
/**
 * 单个代理机构涉及业主统计
 * @export
 * @param 
 * @returns
 */
export function fetchDljgSjyz(params) {
    return request({
        url: dateway + '/api/zt/dljg/statistics/sjyz',
        method: 'get',
        params
    })
}

/**
 *供应商信息列表查询
 * @export
 * @param {*} params
 * @returns
 */
export function gyslist(params) {
    return request({
        url: dateway+'/api/zt/gysxx/page/findByNameAndYear',
        method: 'get',
        params
    })
}
/**
 *供应商注册金额分布（饼图）
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gyszcje(params) {
    return request({
        url:dateway + '/api/zt/gysxx/statistics/zczb',
        method: 'get',
        params
    })
}
/**
 *供应商地域分布(按照数量分布、柱形图)
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gysdyfb() {
    return request({
        url: dateway +'/api/zt/gysxx/statistics/dyfb',
        method: 'get',
    })
}
/**
 *供应商成交金额排名(首页)
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gyscjje(params) {
    return request({
        url:dateway + '/api/zt/gysxx/statistics/cjjepm',
        method: 'get',
        params
    })
}
/**
 *历年成交统计
 *
 * @export
 * @param {*} params
 * @returns
 */
export function lncjtj(params) {
    return request({
        url:dateway + '/api/zt/gysxx/statistics/lncjtj',
        method: 'get',
        params
    })
}
/**
 *供应商全国地域分布
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gysqgdyfb(params) {
    return request({
        url:dateway + '/api/zt/gysxx/statistics/gysdyfb',
        method: 'get',
        params
    })
}
/**
 *供应商基本信息(详情页)
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gysjbxx(params) {
    return request({
        url: dateway +'/api/zt/gysxx/findById',
        method: 'get',
        params
    })
}
/**
 *供应商历史投标、中标情况统计(详情页)
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gystbzbqk(params) {
    return request({
        url: dateway +'/api/zt/gysxx/statistics/lszbqk',
        method: 'get',
        params
    })
}
/**
 *供应商历史投标、中标情况统计排名(详情页)
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gystbzbqkpm(params) {
    return request({
        url: dateway + '/api/zt/gysxx/statistics/lszbqk/pm',
        method: 'get',
        params
    })
}
/**
 *供应商一年投标、中标情况统计(详情页)
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gysyntbzbqk(params) {
    return request({
        url: dateway + '/api/zt/gysxx/statistics/ynzbqk',
        method: 'get',
        params
    })
}
/**
 *供应商一年投标、中标情况统计排名(详情页)
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gysyntbzbqkpm(params) {
    return request({
        url: dateway + '/api/zt/gysxx/statistics/ynzbqk/pm',
        method: 'get',
        params
    })
}

/**
 *供应商数值(雷达图,按照不良投标、信用风险、投标成功率、投标活跃指数、经营风险、能力风险)
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gysldt(params) {
    return request({
        url: dateway +'/api/zt/gys/findldt',
        method: 'get',
        params
    })
}


/**
 *供应商分数总排名及超越企业
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gysdfpm(params) {
    return request({
        url: dateway +'/api/ydhb/ztfx/gysdfpm ',
        method: 'get',
        params
    })
}

/**
 *供应商综合能力评估(总体评分及月环比，总体排名及超过百分比)
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gyszhnlpg(params) {
    return request({
        url: dateway +'/vue-element-admin/user/login',
        method: 'get',
        params
    })
}


/**
 *根据ID查询供应商历史中标项目
 *
 * @export
 * @param {*} params
 * @returns
 */
export function gyslszbxm(params) {
    return request({
        url: dateway + '/api/zt/gyslszbxm/findById',
        method: 'get',
        params
    })
}
/**
 *招标人主体信息-分页
 *
 * @export
 * @param {*} params
 * @returns
 */
export function cgrlist(params) {
    return request({
        url: dateway+'/api/zt/zbr/page/findByNameAndYear',
        method: 'post',
        data:params
    })
}
/**
 *招标人招标品目分布
 *
 * @export
 * @param {*} params
 * @returns
 */
export function cgrzbpmfb(params) {
    return request({
        url: dateway+'/api/zt/zbr/statistics/xmfl',
        method: 'post',
        data:params
    })
}
/**
 *招标人采购方式统计
 *
 * @export
 * @param {*} params
 * @returns
 */
export function cgrzbcgfs(params) {
    return request({
        url: dateway+'/api/zt/zbr/statistics/cgfs',
        method: 'post',
        data:params
    })
}
/**
 *查询组织结构
 *
 * @export
 * @param {*} params
 * @returns
 */
export function tzjtorgan() {
    return request({
        url: dateway+'/api/dim/gg/organ',
        method: 'get'
    })
}

/**
 *招标人基本信息(详情页只有基本信息) zzmc 是主键
 *
 * @export
 * @param {*} params
 * @returns
 */
export function cgrjbxx(params) {
    return request({
        url: dateway +'/api/zt/zbr/findById',
        method: 'get',
        params
    })
}

/**
 *招标人基本信息(详情页比较完整) zzmc 是主键
 *
 * @export
 * @param {*} params
 * @returns
 */
export function cgrjbxx2(params) {
    return request({
        url: dateway +'/api/zt/zbr/findByName',
        method: 'get',
        params
    })
}

/**
 *招标方采购项目统计

 * @export
 * @param {*} params
 * @returns
 */
export function zbfcgxmtj(params) {
    return request({
        url: dateway + '/api/zt/zbr/statistics/zbfcgxmtj',
        method: 'get',
        params
    })
}

/**
 *根据招标人id查询历史中标供应商
 *
 * @export
 * @param {*} params
 * @returns
 */
export function lszbgys(params) {
    return request({
        url: dateway + '/api/zt/zbr/statistics/lszbgys',
        method: 'get',
        params
    })
}

/**
 *保证金分页查询
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bzjList(params) {
    return request({
        url: dateway + '/api/cw/bzj/page',
        method: 'get',
        params
    })
}

/**
 *根据保证金id删除保证金信息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bzjDelete(params) {
    return request({
        url: dateway + '/api/cw/bzj/delete',
        method: 'delete',
        data:params
    })
}

/**
 *保证金信息更新
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bzjUpdate(params) {
    return request({
        url: dateway + '/api/cw/bzj/update',
        method: 'put',
        data:params
    })
}

/**
 *保证金信息新增
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bzjAdd(params) {
    return request({
        url: dateway + '/api/cw/bzj/add',
        method: 'post',
        data:params
    })
}

/**
 *保证金明细查询
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bzjSelect(params) {
    return request({
        url: dateway + '/api/cw/bzj/select',
        method: 'get',
        params
    })
}

/**
 *保证金导入
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bzjImport(params) {
    return request({
        url: elasticsearch + '/bzj/importData',
        method: 'POST',
        data:params
    })
}


/**
 *保证金导出
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bzjExport(params) {
    return request({
        url: elasticsearch + '/bzj/exportData',
        method: 'POST',
        data:params,
        responseType:'blob'
    })
}


/**
 *企业板块信息列表
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bkhfList(params) {
    return request({
        url: dateway + '/api/dim/gg/bkhf/page',
        method: 'GET',
        params,
    })
}



/**
 *根据企业板块信息id删除企业板块信息信息
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bkhfDelete(params) {
    return request({
        url: dateway + '/api/dim/gg/bkhf/delete',
        method: 'delete',
        data:params
    })
}

/**
 * 根据id删除后执行表空间清理
 * @export
 * @param {*} params
 * @returns
 */
export function shrinkTable() {
    return request({
        url: dateway + '/api/dim/gg/bkhf/shrinkTable',
        method: 'get',
    })
}

/**
 *企业板块信息信息更新
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bkhfUpdate(params) {
    return request({
        url: dateway + '/api/dim/gg/bkhf/update',
        method: 'put',
        data:params
    })
}

/**
 *企业板块信息信息新增
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bkhfAdd(params) {
    return request({
        url: dateway + '/api/dim/gg/bkhf/add',
        method: 'post',
        data:params
    })
}

/**
 *企业板块信息明细查询
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bkhfSelect(params) {
    return request({
        url: dateway + '/api/dim/gg/bkhf/select',
        method: 'get',
        params
    })
}

/**
 *查询天气
 *
 * @export
 * @param {*} params
 * @returns
 */
export function weather(params) {
    return request({
        url: dateway + '/api/dim/gg/weather/select',
        method: 'get',
        params
    })
}

/**
 *根据组织id统计该组织下有多少个一级子组织
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bkhfCount(params) {
    return request({
        url: dateway + '/api/dim/gg/bkhf/count',
        method: 'get',
        params
    })
}

/**
 *企业板块信息导入
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bkhfImport(params) {
    return request({
        url: elasticsearch + '/bkhf/importData',
        method: 'POST',
        data:params
    })
}


/**
 *企业板块信息导出
 *
 * @export
 * @param {*} params
 * @returns
 */
export function bkhfExport(params) {
    return request({
        url: elasticsearch + '/bkhf/exportData',
        method: 'POST',
        data:params,
        responseType:'blob'
    })
}

/**
 * 获取代码名称
 * 
 * @param {*} params 
 */
export function getdmmc(params) {
    return request({
        url: dateway + '/api/gg/dmmc',
        method: 'get',
        params
    })
}

/**
 * 预警状况概览
 * 
 * @param {*} params 
 */
export function fetchYjzkgl(params) {
    return request({
        url: dateway + '/api/jk/yjjk/statistics/yjzkgl',
        method: 'get',
        params
    })
}

/**
 * 分页查询黑名单预警
 * 
 * @param {*} params 
 */
export function fetchHmdyjList(params) {
    return request({
        url: dateway + '/api/jk/hmdyj/page/findByNameAndYear',
        method: 'get',
        params
    })
}
/**
 * 分页查询报名预警
 * 
 * @param {*} params 
 */
export function fetchBmyjList(params) {
    return request({
        url: dateway + '/api/jk/bmyj/page/findByNameAndYear',
        method: 'get',
        params
    })
}
/**
 * 分页查询投标预警
 * 
 * @param {*} params 
 */
export function fetchTbyjList(params) {
    return request({
        url: dateway + '/api/jk/tbyj/page/findByNameAndYear',
        method: 'get',
        params
    })
}
/**
 * 分页查询评标预警
 * 
 * @param {*} params 
 */
export function fetchPbyjList(params) {
    return request({
        url: dateway + '/api/jk/pbyj/page/findByNameAndYear',
        method: 'get',
        params
    })
}
/**
 * 分页查询定标预警
 * 
 * @param {*} params 
 */
export function fetchDbyjList(params) {
    return request({
        url: dateway + '/api/jk/dbyj/page/findByNameAndYear',
        method: 'get',
        params
    })
}
/**
 * 分页查询合同预警
 * 
 * @param {*} params 
 */
export function fetchHtyjList(params) {
    return request({
        url: dateway + '/api/jk/htyj/page/findByNameAndYear',
        method: 'get',
        params
    })
}