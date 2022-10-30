<script setup>
//
import {ref} from 'vue'
import ShTable from '../lib/components/ShTable.vue'
import ViewDepartment from '@/views/ViewDepartment.vue'
import shRepo from '@/lib/repo/helpers/ShRepo.js'
const hideIds = ref([])
const reload = ref(0)
function actionFailed(record){
  console.log(record)
  // reload.value++
  hideIds.value.push(record.id)
  shRepo.showToast('Action failed', 'error')
}
</script>
<template>
  <strong>{{ hideIds }}</strong>
  <sh-table :hide-ids="hideIds" :reload="reload" @actionFailed="actionFailed" :headers="['id','name','description', 'created_at']" end-point="admin/departments/list" :actions="{
      label: 'Action',
      actions: [
        {
          label: 'Permissions',
          canvasPosition: 'start',
          canvasTitle: 'View Department',
          canvasId: 'departmentsCanvas',
          canvasSize: 'lg',
          canvasComponent: ViewDepartment,
          class: 'btn btn-info btn-sm labek',
          icon: 'bi-plus',
          type: 'offCanvas'
        },
        {
          label: 'ConfirmAction',
          class: 'btn btn-sm label btn-danger',
          icon: 'bi-x',
          type: 'confirmAction',
          url: 'users/delete/{id}'
        },
        {
          label: 'SilentAction',
          class: 'btn btn-sm label btn-info',
          icon: 'bi-info',
          type: 'silentAction',
          url: 'users/delete/{id}'
        }
      ]
    }"></sh-table>
</template>

<style scoped>

</style>
