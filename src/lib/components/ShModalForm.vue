<script setup>
import {onMounted, ref} from 'vue'
import ShModal from '@/lib/components/ShModal.vue'
import ShForm from '@/lib/components/ShForm.vue'
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
  'customComponent','modalTitle','class'])

const formProps = ref(props)
let btnClass=props.class
const modalId = 'rand' + (Math.random() + 1).toString(36).substring(2)

</script>
<template>
  <a :class="btnClass" :href="'#' + modalId" data-bs-toggle="modal">
    <slot></slot>
  </a>
  <sh-modal :modal-id="modalId" :modal-title="modalTitle">
    <sh-form v-bind="props"/>
  </sh-modal>
</template>
