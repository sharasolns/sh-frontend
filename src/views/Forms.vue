<script setup>
import ShForm from '../lib/components/ShForm.vue'
import ShModal from '../lib/components/ShModal.vue'
import CkEditor from '@/lib/components/FormComponent/CkEditor.vue'
import ShModalForm from '@/lib/components/ShModalForm.vue'
import ShDropDownForm from '@/lib/components/ShDropDownForm.vue'
function userLoggedIn(res){
  console.log(res)
}
</script>
<template>
  <h5>Dropdown and Modal Forms</h5>
  <div>
    <sh-modal-form :success-callback="userLoggedIn" modal-title="Test modal Form" action="auth/login" :fields="['email','password']" class="btn btn-info">Sh Modal Form</sh-modal-form>
  </div>
  <div>
    <sh-drop-down-form :success-callback="userLoggedIn" modal-title="Test modal Form" action="auth/login" :fields="['email','password']">Sh Dropdown Form</sh-drop-down-form>
  </div>
  <h5> Form</h5>
  <a href="#modalForm" class="btn btn-info btn-sm" data-bs-toggle="modal">Modal Form</a>
  <sh-form
      :fields="['mail','name']"
      :custom-component="{
    mail: CkEditor
      }"
      :current-data="{
        name: 'Jackson',
        email: 'jack@gmail.com'
      }"
      action="auth/register"
  />
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
