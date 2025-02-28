<script setup>
import {onMounted, ref} from 'vue'
import ShModal from './ShModal.vue'
import ShAutoForm from './ShAutoForm.vue'
const props = defineProps(['action',
  'classes',
  'method',
  'hasTerms',
  'country_code',
  'submitBtnClass',
  'fields',
  'columns', 'placeholders', 'field_permissions', 'retainDataAfterSubmission',
  'currentData', 'actionLabel', 'fillSelects', 'phones', 'successCallback',
  'failedCallback', 'labels', 'editors',
  'datePickers',
  'required',
  'textAreas',
  'files',
  'phones',
  'numbers',
  'customComponent','modalTitle','class','successMessage', 'modalId'])
const emit = defineEmits(['success','fieldChanged','formSubmitted','formError','modalId'])
const formProps = ref(props)
let btnClass=props.class
const realModalId = props.modalId ?? 'rand' + (Math.random() + 1).toString(36).substring(2)
const success = (res)=>{
  emit('success',res)
}
onMounted(()=>{
  emit('modalId',realModalId)
})

const fieldChanged = (field, value)=>{
  emit('fieldChanged',field, value)
}

const formSubmitted = (res)=>{
  emit('formSubmitted',res)
}

const formError = (res)=>{
  emit('formError',res)
}
</script>
<template>
  <h5 class="d-none">To prevent default class</h5>
  <div class="dropdown sh-dropdown-form">
    <a :class="btnClass"  href="#" role="button" :id="dropdownId" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
      <slot></slot>
    </a>
    <div class="dropdown-menu px-2 py-1" :aria-labelledby="dropdownId">
      <sh-auto-form
          @success="success"
          @field-changed="fieldChanged"
          @form-submitted="formSubmitted"
          @form-error="formError"
          :key="JSON.stringify(currentData ?? {})"
          v-bind="props"/>
    </div>
  </div>
</template>
