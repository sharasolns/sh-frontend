<script setup>
import ShTable from '../../lib/components/ShTable.vue'
import { ref } from 'vue'
import ShRange from '../../lib/components/ShRange.vue'
import shApis from '../../lib/repo/helpers/ShApis.js'

const range = ref(null)
const rangeSelected = (range) => {
  shApis.doGet(`reports/place-logs/stats?${range.query}`).then(res=>{
    drawGraph(res.data)
  }).catch(ex=>{
    shRepo.showToast(ex.message,'error')
  })
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