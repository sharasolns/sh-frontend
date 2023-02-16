import { createRouter, createWebHistory } from 'vue-router'
import Home from '../../views/Home.vue'
import tasks from '@/app/routes/tasks/tasks.js'

let routes = [
  {
    path: '/',
    component: Home
  }
]
routes = routes.concat(tasks)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
