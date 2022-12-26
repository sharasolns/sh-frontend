import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import Forms from '../views/Forms.vue'
import Tables from '../views/Tables.vue'
import Profile from '../views/Profile.vue'
import DynamicTabs from '../views/DynamicTabs.vue'
import Actions from '../views/Actions.vue'
import Summary from '../views/Summary.vue'
import Tasks from '../views/tasks/Tasks.vue'
import Notes from '../views/notes/Notes.vue'
import FormTest from '../views/autoform/FormTest.vue'
import ViewNote from '../views/notes/note/ViewNote.vue'
import NoteComment from '../views/notes/note/NoteComment.vue'
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
    path: '/tasks',
    component: Tasks
  },
  {
    path: '/notes',
    component: Notes,
    children: [
      {
        path: 'note/:id',
        component: ViewNote,
        meta: {
          popup: 'canvas',
          side: 'end',
          size: 'md'
        },
        children: [
          {
            path: 'add-comment',
            component: NoteComment,
            meta: {
              popup: 'modal',
            }
          }
        ]
      }
    ]
  },
  {
    path: '/autoform',
    component: FormTest
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
    path: '/actions',
    component: Actions
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/summary',
    component: Summary
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
