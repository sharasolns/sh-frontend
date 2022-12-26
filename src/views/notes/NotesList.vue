<script setup>
import ShTable from '../../lib/components/ShTable.vue'
</script>
<template>
  <sh-table end-point="notes/list" :headers="['id','title','note']"
  :links="{
    id: {
      url: '/notes/note/{id}'
    }
  }"
  >
  </sh-table>
</template>
<style scoped>

</style>