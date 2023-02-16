<script setup>
import { useRoute } from 'vue-router'
import shApis from '@/lib/repo/helpers/ShApis.js'
import { onMounted, ref } from 'vue'
import shGql from '@/lib/repo/graphql/shGql.js'

const route = useRoute()
const taskId = route.query.taskId
const task = ref(null)
onMounted( async ()=>{
  task.value = await shGql.query(`{
    task (id: ${taskId}) {
      id
      name
      phone
      description
      created_at
    }
  }`)
})
</script>
<template>
<h4>View Task</h4>
  {{ task }}
</template>

<style scoped>

</style>