<script setup>

import ShTable from '@/lib/components/ShTable.vue'
import ShRange from '@/lib/components/ShRange.vue'
import shRepo from '@/lib/repo/helpers/ShRepo'
const query = `{
  tasks (id:{gt: 4}) {
      name
      description
      id
      created_at
      user_id
      state
      phone
      user {
          name
          id
      }
  }
}`
const showUser = (row)=>{
  if(!row) {
    return 'User'
  } else {
   return row.user.name
  }
}
const rangeSelected = range=>{
  console.log(range)
}

const deleteTask = item=>{
  shRepo.runPlainRequest(`tasks/delete/${item.id}`).then(res=>{
    console.log(res)
    res.isConfirmed && shRepo.showToast('Task deleted')
  }).catch(ex=>{
    shRepo.showToast(ex.message, 'error')
  })
}
</script>
<template>
<h5>All Tasks</h5>
  <div class="card">
    <div class="card-body">
      <router-link to="/tasks/form" class="btn btn-info btn-sm"><i class="bi-plus"></i> Add Task</router-link>
      <router-link to="/tasks?popup=modal&title=New Task&comp=ShQueryForm&fields=name,email,phone&action=tasks/store" class="btn btn-info btn-sm ms-2"><i class="bi-plus"></i> PopupQuery Form</router-link>
      <sh-range @range-selected="rangeSelected"/>
      <sh-table
          :headers="['id',showUser,'name','description','phone','created_at']"
          :query="query"
          :actions="{
            label: '...',
            actions: [
                {
                label: 'Edit',
                path: 'tasks/form/{id}',
                class: 'btn btn-info btn-sm'
              },
              {
                label: 'More',
                path: '?taskId={id}&popup=canvas&comp=ViewTask&title=View Task',
                class: 'btn btn-info btn-sm'
              },
              {
                label: 'Delete',
                icon: 'bi bi-trash',
                class: 'btn btn-outline-danger btn-sm',
                emits: deleteTask
              }
            ]
          }"
      >
      </sh-table>
    </div>
  </div>
</template>

<style scoped>

</style>
