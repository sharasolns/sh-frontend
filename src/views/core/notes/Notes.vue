<script setup>
import ShTable from "@/lib/components/ShTable.vue";
</script>
<template>
    <div class="max-2">
      <h5 v-if="false">false</h5>
        <h5 v-if-user-can="'notes'">Notes</h5>
        <div class="card shadow rounded">
            <div class="card-body">
              <sh-table :end-point="`notes/list`" no-records-message="No notes">
                <template v-slot:records="slotProps">
                  <h3>{{ records }}</h3>
                </template>
              </sh-table>
                <sh-table :has-range="true" :end-point="`notes/list`" :headers="['id','title','note','created_at']"/>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
