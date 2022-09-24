<script setup>
//
import ShTable from '../lib/components/ShTable.vue'
import ViewDepartment from '@/views/ViewDepartment.vue'
</script>
<template>
  <sh-table :headers="['id','name','description', 'created_at']" end-point="admin/departments/list" :actions="{
      label: 'Action',
      actions: [
        {
          label: 'Permissions',
          canvasPosition: 'start',
          canvasTitle: 'View Department',
          canvasId: 'departmentsCanvas',
          canvasSize: 'lg',
          canvasComponent: ViewDepartment,
          class: 'btn btn-info btn-sm',
          icon: 'bi-plus',
        }
      ]
    }"></sh-table>
</template>

<style scoped>

</style>
