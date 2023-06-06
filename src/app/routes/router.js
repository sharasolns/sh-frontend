import { createRouter, createWebHistory } from 'vue-router'
import Home from '../../views/Home.vue'
import tasks from '@/app/routes/tasks/tasks.js'
import notes from "@/app/routes/notes/notes";

let routes = [
  {
    path: '/',
    component: Home
  }
]
routes = routes.concat(tasks,notes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
