import axios from 'axios'
import { Message } from 'element-ui'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 10000,
})

// Request interceptors
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('bearer')
    if (token) {
      config.headers['Authorization'] = `Bearer ${JSON.parse(token).token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
http.interceptors.response.use(
  (response) => {
    const res = response.data
    if (![200, 201].includes(response.status)) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000,
      })

      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return response
      // return response.data || response
    }
  },
  (error) => {
    let msg = error.message
    if (error.response) {
      msg = error.response.data.message
      if (error.response.status === 401) {
        localStorage.removeItem('bearer')
        msg += ' 您的登录状态已过期，请重新登录。。'
      }
    }

    Message({
      message: msg,
      type: 'error',
      duration: 5 * 1000,
    })

    return Promise.reject(error)
  }
)

export default http
