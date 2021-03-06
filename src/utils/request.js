import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

import {refreshToken} from '@/utils/refreshToken'
// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = store.getters.token
    } else if (getToken()) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 后端建议换token
    if(response.headers.advance){
      refreshToken()
    }
    const res = response.data
    // 如果是2进制流直接放回
    if (res instanceof Blob) {
      return res
    }
    if(res =='/ydhb/file'){
      return res
    }
    // if the custom code is not 20000, it is judged as an error.
    // 添加为0 的情况以支持soul网关
    if (res.code !== 0 && res.code !== 200 && res.code != 20000) {
      Message({
        message:  res.msg || res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 508 || res.code === 512 || res.code === 514) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg|| res.message || 'Error'))
    } else {
      // 添加res.value 的情况以支持dataway
      if(res.value != undefined) return res.value;
      else return res.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: "网络超时,请刷新后重试!",
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
