import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import ResourceCrud from '../views/ResourceCrud.vue'
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
    ],
  },
]

const router = new VueRouter({
  routes,
})

export default router
