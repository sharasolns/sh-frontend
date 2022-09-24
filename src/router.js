import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/home.vue'
import Forms from './views/Forms.vue'
import Tables from './views/Tables.vue'
import Profile from './views/Profile.vue'
import DynamicTabs from './views/DynamicTabs.vue'
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
    path: '/tables',
    component: Tables
  },
  {
    path: '/dynamic-tabs',
    component: DynamicTabs
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
