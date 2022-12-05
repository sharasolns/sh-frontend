<script setup>
import ShAutoForm from '../../lib/components/ShAutoForm.vue'
import ShModal from '../../lib/components/ShModal.vue'
const data = [
  {
    field: 'task',
    type: 'select',
    dataUrl: 'tasks/list/any'
  },
  {
    field: 'name',
  },
  {
    field: 'phone'
  },
  {
    field: 'email',
  },
  {
    field: 'password',
    type: 'select'
  },
  {
    field: 'age',
    type: 'number',
    // min: 0,
    // max: 10
  },
  {
    field: 'gender',
    type: 'select',
    data: [
      {
        id: 'Male',
      },
      {
        label: 'Female',
        value: 'female'
      }
    ]
  },
  {
    field: 'description'
  }
]
</script>
<template>
  <h5>Auto Form Test</h5>
  <sh-auto-form :fields="data" action="tasks/store" success-message="Task addedd successfully" :place-holders="{
    name: 'Your full name'
  }"  :labels="{
    // name: false,
    address:`<i class='bi-list'></i> Your home town`,
    phone_no: `<span>I</span>`
  }" :helper-texts="{
    // name: 'Your full name',
    address: 'Your village name'
  }"/>
</template>