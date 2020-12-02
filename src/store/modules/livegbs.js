import dayjs from 'dayjs';
import AdvancedFormat from 'dayjs/plugin/advancedFormat'
import duration from 'dayjs/plugin/duration'
dayjs.extend(duration)
dayjs.extend(AdvancedFormat)
const state = {
        serverInfo: {},
        userInfo: null
    }

const mutations = {
        updateUserInfo: (state, userInfo) => {
            state.userInfo = userInfo;
        },
        updateServerInfo: (state, serverInfo) => {
            state.serverInfo = serverInfo;
        }
    }
const actions = {
        getUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                $.get("/api/v1/userinfo").then(msg => {
                    var userInfo = msg;
                    commit('updateUserInfo', userInfo);
                    resolve(userInfo);
                }).fail(() => {
                    resolve(null);
                })
            })
        },
        getServerInfo({ commit }) {
            return new Promise((resolve, reject) => {
                $.get("/api/v1/getserverinfo").then(serverInfo => {
                    try {
                        if (serverInfo.ServerTime) {
                            var stime = dayjs(serverInfo.ServerTime, "YYYY-MM-DD HH:mm:ss");
                            serverInfo.DiffDuration = dayjs.duration(stime.diff(dayjs()))
                        }
                        commit('updateServerInfo', serverInfo);
                        resolve(serverInfo)
                        return
                    } catch (error) {
                        console.log(error)
                    }
                    resolve({});
                }).fail(() => {
                    resolve({});
                })
            })
        }
    }
export default {
    state,
    mutations,
    actions
}