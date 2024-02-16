<script setup>
import {onMounted, ref} from 'vue'
import ShModal from './ShModal.vue'
import ShAutoForm from './ShAutoForm.vue'
const props = defineProps(['action',
  'classes',
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
  'customComponent','modalTitle','class','successMessage'])
const emit = defineEmits(['success','fieldChanged','formSubmitted','formError','modalId'])
const formProps = ref(props)
let btnClass=props.class
const modalId = 'rand' + (Math.random() + 1).toString(36).substring(2)
const success = (res)=>{
  emit('success',res)
}
onMounted(()=>{
  emit('modalId',modalId)
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
  <a :class="btnClass" :href="'#' + modalId" data-bs-toggle="modal">
    <slot></slot>
  </a>
  <sh-modal :modal-id="modalId" :modal-title="modalTitle">
    <sh-auto-form
        @success="success"
        @field-changed="fieldChanged"
        @form-submitted="formSubmitted"
        @form-error="formError"
        v-bind="props"/>
  </sh-modal>
</template>
