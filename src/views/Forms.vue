<script setup>
import ShForm from '../lib/components/ShForm.vue'
</script>
<template>
  <h5>Forms</h5>
  <sh-form action="auth/login" :fields="['name','email','gender', 'date_created','user_id','file_type','logo']"
           :files="['logo']"
           :date-pickers="['date_created']"
           :labels="{
            date_created: 'Registration Date'
           }"
           :current-data="{
    email:'johnss@gmail.com'
           }"
           :fill-selects="{
    gender: {
      data: [
          {
            id: 'Male',
            name: 'Male'
          },
          {
            id: 'Female',
            name: 'Female'
          }
      ]
    }
  }"></sh-form>
</template>
