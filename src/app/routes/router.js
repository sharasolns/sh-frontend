import { createRouter, createWebHistory } from 'vue-router'
import Home from '../../views/Home.vue'
import tasks from '@/app/routes/tasks/tasks.js'
import notes from "@/app/routes/notes/notes";
import Forms from '@/views/core/forms/Forms.vue'
let routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/forms',
    component: Forms
  }
]
routes = routes.concat(tasks,notes)
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
