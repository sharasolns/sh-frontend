<script setup>
import {onMounted, ref} from 'vue'
import ShModal from './ShModal.vue'
import ShForm from './ShForm.vue'
import ShAutoForm from '@/lib/components/ShAutoForm.vue'
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
  'textAreas',
  'files',
  'phones',
  'numbers',
  'customComponent','modalTitle','class','successMessage'])
const emit = defineEmits(['success'])
const formProps = ref(props)
let btnClass=props.class
const modalId = 'rand' + (Math.random() + 1).toString(36).substring(2)
const success = (res)=>{
  emit('success',res)
}
delete formProps.class
</script>
<template>
  <a :class="btnClass" :href="'#' + modalId" data-bs-toggle="modal">
    <slot></slot>
  </a>
  <sh-modal :modal-id="modalId" :modal-title="modalTitle">
    <sh-auto-form @success="success" v-bind="props"/>
  </sh-modal>
</template>
