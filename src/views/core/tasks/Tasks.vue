<script setup>

import ShTable from '@/lib/components/ShTable.vue'
import ShRange from '@/lib/components/ShRange.vue'
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
</script>
<template>
<h5>All Tasks</h5>
  <div class="card">
    <div class="card-body">
      <router-link to="tasks/form" class="btn btn-info btn-sm"><i class="bi-plus"></i> Add Task</router-link>
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
                path: '?taskId={id}&popup=canvas&comp=ViewTask',
                class: 'btn btn-info btn-sm'
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