// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/store'
// 导入element-ui组件库
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 导入axios插件
import axios from 'axios'
// 使用element-ui
Vue.use(ElementUI)
// element-ui全局配置
Vue.use(ElementUI, {size: 'small', zIndex: 3000})
// 使用axios插件
Vue.prototype.axios = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
// 创建Vue实例
/* new Vue({
  el: '#app',
  // 使用路由
  router: router,
  render: h => h(App)
}) */
