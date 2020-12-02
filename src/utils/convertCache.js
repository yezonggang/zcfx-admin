export default function convert(cacheList) {
  const r = {}
  // console.log("转换缓存表",cacheList)
  if (cacheList != null && cacheList.length > 0) {
    cacheList.map(val => {
      r[val.value] = val.label
      return r;
    })
  }
  return r
}
