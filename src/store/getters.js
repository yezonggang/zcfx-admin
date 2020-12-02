const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
  cacheList: state => cacheTypes => state.cache.cacheList[cacheTypes],
  cacheTree: state => cacheTypes => state.cache.cacheTree[cacheTypes],
  userById: state => id => state.user.userlist.records.find(user => user.userId == id),
  roleById: state => id => state.role.rolelist.records.find(role => role.roleId == id),
  resById: state => id => state.res.resList.records.find(res => res.id == id),
  serverInfo: state => state.livegbs.serverInfo,
  userInfo: state => state.livegbs.userInfo
}

export default getters
