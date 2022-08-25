<script setup>
import ShForm from '../views/ShForm.vue'
</script>
<template>
  <h5>Forms</h5>
  <sh-form :fields="['name','email','gender']" :fill-selects="{
    gender: {
      suggest: true,
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
