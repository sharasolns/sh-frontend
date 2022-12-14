<script setup>
import ShAutoForm from '../../lib/components/ShAutoForm.vue'
import ShModal from '../../lib/components/ShModal.vue'
import SearchInput from '../../lib/components/form-components/SearchInput.vue'
const data = [
  {
    field: 'name',
    label:'Full Name',
    helper: 'Surname is a must',
    // type: 'password',
    placeHolder: 'Your surname or both'
  },
  {
    field: 'email',
    placeHolder: 'Email address'
  },
  {
    field: 'password',
    type: 'text'
  },
  {
    field: 'task_id',
    component: SearchInput,
    url: 'tasks/list/any'
  }
]
</script>
<template>
<!--  <search-input-->
  <h5>Auto Form Test</h5>
  <sh-auto-form :fields="data" action="tasks/store" :current-data="{
    name: 'John Doe'
  }" success-message="Task added successfully"/>
</template>