<script setup>
import ShAutoForm from '@/lib/components/ShAutoForm.vue'
const data = ['email',
  {
    field: 'name',
    helperText: 'your full',
    // placeHolder: 'Your full name'
    // label: 'Force'
  }
]
</script>
<template>
  <h5>Auto Form Test</h5>
  <sh-auto-form :fields="data" :place-holders="{
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