import Vue from 'vue'
import http from './utils/request'
import App from './App.vue'

// import './plugins/element.js'
import './plugins/element'
import './plugins/avue'
import './plugins/svgicon'
import router from './router'

// import EleForm from 'vue-ele-form'
// // 注册 vue-ele-form
// // 因 EleForm 不是用 TS 写的，所以要创建 packages.d.ts 声明文件
// Vue.use(EleForm)

Vue.config.productionTip = false

// 插件可以增加 Vue 的全局/实例 property 和组件选项。
// 这些情况下，在 TypeScript 中制作插件需要类型声明
// 需要在新建 custom-vue.d.ts 文件中申明，再重启编辑器(或 CMD + Shift + P ，reload window)
// https://cn.vuejs.org/v2/guide/typescript.html#%E5%A2%9E%E5%BC%BA%E7%B1%BB%E5%9E%8B%E4%BB%A5%E9%85%8D%E5%90%88%E6%8F%92%E4%BB%B6%E4%BD%BF%E7%94%A8
// const http = Axios.create({
//   baseURL: process.env.VUE_APP_API_URL,
// })

Vue.prototype.$axios = http

// Avue 2.4.0 使用的是 $httpajax 上传文件,也需要注册一下
// Vue.prototype.$httpajax = http

// AVue 2.6.1 使用 window.axios，坑挺多
;(window as any).axios = http

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
