import { createApp } from 'vue'
import router from './router'
import axios from 'axios'
import AntD, { message } from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import store from './store'
import App from './App.vue'
// import env from './env'
// mock开关
const mock = false
if (mock) {
  require('./mock/api')
}
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 8000
// 根据环境变量获取不同的请求地址
// axios.defaults.baseURL = env.baseURL;
// 接口错误拦截
axios.interceptors.response.use(
  function(response) {
    let res = response.data
    if (res.status == 0) {
      return res.data
    } else if (res.status == 10) {
      window.location.href = '/#/login'
      return Promise.reject(res)
    } else {
      message.warning(res.msg)
      return Promise.reject(res)
    }
  },
  (error) => {
    let res = error.response
    message.error(res.data.message)
    return Promise.reject(error)
  }
)
const app = createApp(App)
app.config.globalProperties.$axios = axios
app
  .use(AntD)
  .use(router)
  .use(store)
  .mount('#app')
