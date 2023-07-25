import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Main from '../views/Main.vue'
import NotFound from '../views/NotFound.vue'
import { userStore } from '../store/user'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: Main,
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/:catchAll(.*)',
    name: 'notfound',
    component: NotFound,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const usr = userStore()
  if (to.path === '/' && to.meta.requiresAuth && !usr.user) {
    next({ name: 'login' })
  } else {
    next();
  }
});

export default router
