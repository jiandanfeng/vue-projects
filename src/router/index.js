import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import Index from '@/components/index'
import store from '../vuex/store'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/login', // 登陆页面
      name: 'Login',
      component: Login
    }, {
      path: '/index', // 主页
      name: 'Index',
      component: Index,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/helloworld',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '*',
      redirect: '/index'
    }
  ]
})
// 路由即将改变前触发
router.beforeEach((to, from, next) => {
  // 切换标题
  window.document.title = to.meta.title

  // 检测路由配置中是否有requiresAuth这个meta属性
  if (to.matched.some(record => record.meta.requireAuth)) {
    alert('需要登陆' + store.getters.isLoggedIn)
    // 判断是否已经登陆
    if (store.getters.isLoggedIn) {
      next()
    } else {
      // 未登陆则跳转到登陆页面
      next('/login')
    }
  } else {
    alert('不需要登陆')
    next()
  }
  // 判断是否登陆
  /* if(window.localStorage.getItem('token')){
      next();
  }else{
      next('/login')
  } */
})
// 路由改变后触发
router.afterEach((to, from, next) => {
  // 切换页面后，把滚动条重新定位到顶端
  window.scrollTo(0, 0)
})

export default router
