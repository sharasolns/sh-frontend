import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/home.vue'
import Forms from './pages/Forms.vue'
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/forms',
    component: Forms
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
