import {getById, getList,  getPageList,getPageListFuzzy, saveOrUpdate, deleteById, getListByUserId} from '@/api/sys/role'

const getDefaultState = () => {
  return {
    role: {},
    roleList: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_ROLE_LIST: (state, rolelist) => {
    state.rolelist = rolelist
  }
}

const actions = {

  getPageList({commit}, param) {
    return new Promise((resolve, reject) => {
      getPageList(param).then(response => {
        const data = response
        commit('SET_ROLE_LIST', data)
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
        commit('SET_ROLE_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  saveOrUpdate({dispatch, commit}, param) {
    return new Promise((resolve, reject) => {
      saveOrUpdate(param).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getById({commit}, id) {
    return new Promise((resolve, reject) => {
      getById(id).then(response => {
        const data = response
        commit('SET_ROLE', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  deleteById({commit}, id) {
    return new Promise((resolve, reject) => {
      deleteById(id).then(response => {
        const data = response
        // commit('SET_ROLE', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getList({commit}, param) {
    return new Promise((resolve, reject) => {
      getList(param).then(response => {
        const data = response
        // commit('SET_ROLE_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getListByUserId({commit}, id){
    console.log(id)
    return new Promise((resolve, reject) => {
      getListByUserId(id).then(response => {
        const data = response
        // commit('SET_ROLE_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

