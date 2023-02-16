<script setup>

import ShAutoForm from '@/lib/components/ShAutoForm.vue'
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import shGql from '@/lib/repo/graphql/shGql.js'
import shRepo from '@/lib/repo/helpers/ShRepo.js'
const route = useRoute()
const id = route.params.id
const editTask = ref(null)
const mutation = ref('addTask')
if(id){
  mutation.value = 'updateTask'
  shGql.query(`{
    task (id: ${id}) {
      id
      name
      description
      phone
    }
    }`).then(res=>{
    editTask.value = res.task
  })
}
onMounted(()=>{
  shRepo.showToast('Hello','success', {position: 'top-left'})
})
</script>
<template>
<sh-auto-form :current-data="editTask" success-message="Task added successfully" :fields="['name','description','phone']" :gqlMutation="mutation"></sh-auto-form>
</template>

<style scoped>

</style>