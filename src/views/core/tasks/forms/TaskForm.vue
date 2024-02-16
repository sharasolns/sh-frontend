<script setup>

import ShAutoForm from '@/lib/components/ShAutoForm.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import shGql from '@/lib/repo/graphql/shGql.js'
import shRepo from '@/lib/repo/helpers/ShRepo.js'
import { ShSuggest, useAppStore } from '@'
import ShForm from '@/lib/components/ShForm.vue'
const route = useRoute()
const id = route.params.id
const editTask = ref(null)
const mutation = ref('addTask')

const appStore = useAppStore()
if(id){
  mutation.value = 'updateTask'
  shGql.query(`{
    task (id: ${id}) {
      id
      name
      description
      phone
    }
    }`).then(res=>{
    editTask.value = res.task
  })
}
onMounted(()=>{
  // shRepo.showToast('Hello','success', {position: 'top-start'})
})

const fieldChanged = (field, value)=>{
  console.log(field, value )
}
const fields = [
  {
    field: 'task_id',
    label: 'Task',
    component: ShSuggest,
    url: 'tasks/list',
    datas: [
      {
        id: 1,
        name: 'Task 1'
      },
      {
        id: 2,
        name: 'Task 2'
      },
      {
        id: 3,
        name: 'Task 3'
      }
    ]
  },
  {
    field: 'name',
    label: 'Name',
    type: 'text',
    required: true
  },
  {
    field: 'description',
    label: 'Description',
    type: 'textarea',
    required: true
  },
  {
    field: 'phone',
    label: 'Phone',
    type: 'phone',
    required: true
  }
]
</script>
<template>
  <sh-auto-form :fields="['task_id']" :fill-selects="{
    task_id: {
          dataUrl: 'tasks/list?all=1'
        }
  }" action="/tasks" />
<sh-auto-form :currentDataa="{
  task_id: 41

}" @field-changed="fieldChanged" :current-data="editTask" @success="appStore.refresh()" success-message="Task added successfully" :fields="fields" :gqlMutation="mutation"></sh-auto-form>
</template>

<style scoped>

</style>
