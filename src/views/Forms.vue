<script setup>
import ShForm from '../lib/components/ShForm.vue'
import ShModal from '../lib/components/ShModal.vue'

</script>
<template>
  <h5>Forms</h5>
  <a href="#modalForm" class="btn btn-info btn-sm" data-bs-toggle="modal">Modal Form</a>
  <sh-modal modal-id="modalForm" modal-title="Modal Form">
    <sh-form
    :fields="['name','email']"
    action="auth/register"
    />
  </sh-modal>
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
            user_id: {
              url: 'users/all?all=1'
            }
           }"></sh-form>
</template>
