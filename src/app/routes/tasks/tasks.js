import Tasks from '@/views/core/tasks/Tasks.vue'
import TaskForm from '@/views/core/tasks/forms/TaskForm.vue'
import tab from '@/views/core/tasks/Tabs.vue'
export default [
    {
        path: '/tasks',
        component: Tasks,
        children: [
            {
                path: 'form/:id?',
                component: TaskForm,
                meta: {
                    popup: 'modal',
                    title: 'Task Form'
                }
            }
        ]
    },
    {
        path: '/tasks/tab/:tab',
        component: tab,
    }
]
