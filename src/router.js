import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/home.vue'
import Forms from './views/Forms.vue'
import Profile from './views/Profile.vue'
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/forms',
    component: Forms
  },
  {
    path: '/profile',
    component: Profile
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
