import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import ResourceCrud from '../views/ResourceCrud.vue'
import Login from '../views/login/index.vue'
import Icon from '../views/icons/index.vue'
// import WebStackList from '../views/webstack/WebStackList.vue'
// import WebStackEdit from '../views/webstack/WebStackEdit.vue'

Vue.use(VueRouter)
// 标记好对应的数据类型，就有提示，这就是 TypeScript 好处
const routes: RouteConfig[] = [
  {
    path: '/',
    component: Main,
    children: [
      { name: 'home', path: '/', component: Home },
      {
        name: 'courses-crud',
        path: '/:resource/list',
        component: ResourceCrud,
        props: true,
      },
      // { name: 'courses-list', path: '/courses/list', component: CourseList },
      // { name: 'courses-edit', path: '/courses/edit/:id', component: CourseEdit, props: true },
      // { name: 'courses-create', path: '/courses/create', component: CourseEdit },
      {
        name: 'icon',
        path: 'icon',
        component: Icon,
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to: Route, _: Route, next: any) => {
  const token = localStorage.getItem('bearer')
  const whiteList = ['/login']
  if (token) {
    if (to.path === '/login') {
      // 如果登录了 还访问 login 直接跳转到首页
      next({ path: '/' })
    } else {
      // 正常项目这里应该还要从后台获取下用户权限
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      // In the free login whitelist, go directly
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})

export default router
