import {deleteById, getInfo, refreshToken, getPageList ,getPageListFuzzy, login, logout, saveOrUpdate, getAuthByUserId, changeStatus, changePwd , resetPwd} from '@/api/sys/user'
import {getToken, removeToken, setToken} from '@/utils/auth'
import router, {resetRouter} from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  organName: '',
  userlist: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_ORGAN: (state, organName) => {
    state.organName = organName
  },
  SET_USER_LIST: (state, userlist) => {
    state.userlist = userlist
  },
}

const actions = {
  // user login
  login({commit}, userInfo) {
    const {username, password} = userInfo
    return new Promise((resolve, reject) => {
      login({loginName: username.trim(), passwd: password}).then(response => {
        const data = response
        commit('SET_TOKEN', data)
        setToken(data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  refreshToken({commit}) {
    return new Promise((resolve, reject) => {
      // 确保同一时间段内只执行一次
      const refreshTokenStatus = localStorage.getItem('refreshTokenStatus')
      if (!refreshTokenStatus) {
        localStorage.setItem('refreshTokenStatus', 'true')
        refreshToken().then(response => {
          const data = response
          //console.log("刷新完成，开始更新token",data)
          commit('SET_TOKEN', data)
          setToken(data)
          // 请求成功，清除状态值
          localStorage.removeItem('refreshTokenStatus')
          resolve()
        }).catch(error => {
          // 请求成功，清除状态值
          localStorage.removeItem('refreshTokenStatus')
          reject(error)
        })
      }
    })
  },

  // get user info
  getInfo({commit, state}) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const data = response
        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const {organName, roles, userName, avatar} = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }
        let roleTypes = roles.map((role)=>{
          return role.roleType
        })
        commit('SET_ORGAN', organName)
        commit('SET_ROLES', roleTypes)
        commit('SET_NAME', userName)
        commit('SET_AVATAR', avatar)
        // commit('SET_INTRODUCTION', introduction)
        data.roles = roleTypes
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({commit, state, dispatch}) {
    return new Promise((resolve, reject) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, {root: true})
      resolve()
    })
  },

  // remove token
  resetToken({commit}) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({commit, dispatch}, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const {roles} = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, {root: true})

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, {root: true})

      resolve()
    })
  },
  getPageList({commit}, param) {
    return new Promise((resolve, reject) => {
      getPageList(param).then(response => {
        const data = response
        commit('SET_USER_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getPageListFuzzy({commit}, param) {
    return new Promise((resolve, reject) => {
      getPageListFuzzy(param).then(response => {
        const data = response
        commit('SET_USER_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveOrUpdate({dispatch, commit}, userInfo) {
    return new Promise((resolve, reject) => {
      saveOrUpdate(userInfo).then(response => {
        const data = response
        // dispatch('user/getPageList')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteById({commit}, id) {
    return new Promise((resolve, reject) => {
      deleteById(id).then(response => {
        const data = response
        // console.log(data)
        // commit('DEL_USER', data)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAuthByUserId({commit}, id) {
    return new Promise((resolve, reject) => {
      getAuthByUserId(id).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changeStatus({commit}, param) {
    return new Promise((resolve, reject) => {
      changeStatus(param).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  changePwd({commit}, param) {
    return new Promise((resolve, reject) => {
      changePwd(param).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  resetPwd({commit}, param) {
    return new Promise((resolve, reject) => {
      resetPwd(param).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
