<script setup>
import ShTable from '../../lib/components/ShTable.vue'
import { ref } from 'vue'
import ShRange from '../../lib/components/ShRange.vue'

const range = ref(null)
const rangeSelected = selected => {
  range.value = selected
}
</script>
<template>
  <sh-range @range-selected="rangeSelected"/>
  <sh-table v-if="range" :end-point="`notes/list?${range.query}`" :headers="['id','title','note','created_at']"
  :links="{
    id: {
      url: '/notes/qp/note/{id}',
    }
  }"
  >
  </sh-table>
</template>
<style scoped>

</style>