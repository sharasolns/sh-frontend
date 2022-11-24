<script setup>
import ShAutoForm from '@/lib/components/ShAutoForm.vue'
import ShModal from '@/lib/components/ShModal.vue'
const data = [
  {
    field: 'name'
  },
  {
    field: 'description'
  }
]
</script>
<template>
  <h5>Auto Form Test</h5>
  <a href="#modalForm" class="btn btn-primary" data-bs-toggle="modal">Test Form</a>
  <sh-modal modal-id="modalForm">
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
  </sh-modal>
</template>