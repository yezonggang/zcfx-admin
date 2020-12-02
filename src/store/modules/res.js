import {deleteById, getById, getPageList, saveOrUpdate} from '@/api/sys/res'

const getDefaultState = () => {
  return {
    res: {},
    resList: []
  }
}

const state = getDefaultState()

const mutations = {
  SET_RES: (state, res) => {
    state.res = res
  },
  SET_RES_LIST: (state, resList) => {
    state.resList = resList
  }
}

const actions = {

  getPageList({commit}, param) {
    return new Promise((resolve, reject) => {
      getPageList(param).then(response => {
        const data = response
        commit('SET_RES_LIST', data)
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
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  getById({commit}, id) {
    return new Promise((resolve, reject) => {
      getById(id).then(response => {
        const data = response
        commit('SET_RES', data)
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
        resolve()
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

