<script setup>
import ShTable from "@/lib/components/ShTable.vue";
import FormatTitle from '@/views/core/notes/FormatTitle.vue'
import { ref } from 'vue'

const selected = ref([])
const rowSelected = row=> {
  // selected.value.push(row)
}

const edit = item=>{
  alert('Edit')
}

const deleteItem = item=>{
  alert('Delete')
}

const viewItem = item=>{
  alert('View')
}

const formatTitle = row=>{
  return `<h3>${row.title}</h3>`
}
</script>
<template>
    <div class="max-2">
      <h5 v-if="false">false</h5>
      <button v-if="true" @click="deleteItem({id:1})">Delete</button>
        <h5 v-if-user-can="'notes'">Notes</h5>
        <div class="card shadow rounded">
            <div class="card-body">
              <sh-table :end-point="`notes/list`" no-records-message="No notes">
                <template v-slot:records="slotProps">
                  <h3>{{ records }}</h3>
                </template>
              </sh-table>
              {{ selected}}
                <sh-table :disable-mobile-responsive="true" :has-range="false" :end-point="`notes/list`" :headers="['id',{
                  label:'Summary',
                  key:'title',
                  callback:formatTitle,
                  sortable:true
                },'title','note','created_at']"
                          :onViewItem="viewItem"
                :actions="{
                  label: '&nbsp;',
                  type: 'dropdown',
                  icon: 'bi-person',
                  actions:[
                      {
                          label: 'Edit',
                          icon: 'edit',
                          emits: edit
                      },
                      {
                          label: 'Delete',
                          icon: 'delete',
                          class: 'text-danger btn',
                          emits: deleteItem
                      },
                      {
                          label: 'View',
                          icon: 'view',
                          class: 'text-primary btn',
                          emits: 'viewItem'
                      }
                  ]
                }"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
