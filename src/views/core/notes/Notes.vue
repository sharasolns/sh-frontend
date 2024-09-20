<script setup>
import ShTable from "@/lib/components/ShTable.vue";
import FormatTitle from '@/views/core/notes/FormatTitle.vue'
import { ref } from 'vue'

const selected = ref([])
const rowSelected = row=>{
  selected.value.push(row)
import shRepo from '@/lib/repo/helpers/ShRepo'

const deleteItem = item=>{
  shRepo.confirmAction(()=>{
    console.log('Deleting item',item)
    return 'deleted'
  },'Wee?','ii imeenda')
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
                <sh-table @rowSelected="rowSelected" :disable-mobile-responsive="true" :has-range="true" :end-point="`notes/list`" :headers="['id',{
                  label:'Summary',
                  key:'title',
                  component: FormatTitle,
                  sortable:true
                },'title','note','created_at']"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
