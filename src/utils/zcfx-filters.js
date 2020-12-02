import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat'
dayjs.extend(customParseFormat)

const digitsRE = /(\d{3})(?=\d)/g

/**
 * 格式化金额,默认人民币保留两位小数
 * E.G.￥500,000.00
 * @param {*} value 自动传的值
 * @param {string} currency 币种符号
 * @param {integer} decimals 保留小数位数
 * @param {string} suffix 后缀
 */
function currency(value, currency, decimals, suffix) {
    value = parseFloat(value)
    if (!isFinite(value) || (!value && value !== 0)) return ''
    currency = currency != null ? currency : '￥'
    decimals = decimals != null ? decimals : 2
    suffix = suffix != null ? suffix : '元'
    var stringified = Math.abs(value).toFixed(decimals)
    var _int = decimals
        ? stringified.slice(0, -1 - decimals)
        : stringified
    var i = _int.length % 3
    var head = i > 0
        ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
        : ''
    var _float = decimals
        ? stringified.slice(-1 - decimals)
        : ''
    var sign = value < 0 ? '-' : ''
    return sign + currency + head +
        _int.slice(i).replace(digitsRE, '$1,') +
        _float +
        suffix
}
/**
 * 格式化空值
 * 空值包括 undefined, null, ''
 * @param {*} value 默认传的值
 * @param {*} show 展示的内容
 */
function isNull(value, show) {
    show = show != null ? show : '暂无数据'
    if (typeof (value) == undefined||value==null||value==''){
        return show
    }else{
        return value
    }
}

/**
 * 格式化时间,可以格式化Date对象和String字符串时间
 * 
 * 格式化支持的占位符:https://dayjs.gitee.io/docs/zh-CN/display/format
 * @param {*} value 需要格式化的时间
 * @param {string} parse 解析date参数的的规则,如果date是Date类型,此项需要填null
 * @param {string} pattern 输出时间的格式,例如yyyy-MM-dd
 */
function dateFormat(value, parse, pattern) {
    parse = parse == undefined ? "YYYYMMDDHHmm" : parse
    pattern = pattern == undefined ? "YYYY-MM-DD HH:mm" : pattern
    if (value instanceof Date){
        return dayjs(value).format(pattern)
    }else{
        return dayjs(value.toString(), parse).format(pattern)
    }
}
export {
    currency,
    isNull,
    dateFormat
}