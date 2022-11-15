<script setup>

import ShTable from '@/lib/components/ShTable.vue'
import ShModalForm from '@/lib/components/ShModalForm.vue'
import { ref } from 'vue'
import ViewTask from '@/views/tasks/ViewTask.vue'
const reload = ref(0)
function taskAdded(){

}
function reloadTable(res){
  reload.value++
}
const isActive = (task)=>{
  return task.status === 1
}
const isInActive = (task)=>{
  return task.status === 0
}
</script>
<template>
  <sh-modal-form class="btn btn-info btn-sm" success-message="Task added successfully" @success="reloadTable" :fields="['name','description']" action="tasks/store">
    <i class="bi-plus"></i> Add Task
  </sh-modal-form>
  <sh-table
      :headers="['id','user','name','description']"
      @actionSuccessful="reloadTable"
      :reload="reload"
      :actions="{
        label: '...',
        actions: [
            {
              type: 'confirmAction',
              url: 'tasks/delete/{id}',
              label: 'Delete',
              class: 'btn btn-danger badge',
              icon: 'bi-x',
              validator: isInActive
            },
            {
              type: 'silentAction',
              url: 'tasks/update-status/1/{id}',
              label: 'Activate',
              class: 'btn btn-success badge mx-1',
              icon: 'bi-check',
              validator: isInActive
            },
            {
              type: 'silentAction',
              url: 'tasks/update-status/0/{id}',
              label: 'Deactivate',
              class: 'btn btn-warning badge',
              icon: 'bi-x',
              validator: isActive
            },
            {
             type:'offcanvas',
             label: 'More',
             class: 'btn btn-info badge',
             icon: 'bi-eye',
             canvasId:'simpleOffcanvasId',
             canvasPosition: 'end',
             canvasSize: 'md',
             canvasComponent: ViewTask
            }
        ]
      }"
    end-point="tasks/list/any"
  />
</template>