<script setup>
import {onMounted, ref} from 'vue'
import ShForm from './ShForm.vue'
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
const dropdownId = 'rand' + (Math.random() + 1).toString(36).substring(2)

</script>
<template>
  <h5 class="d-none">To prevent default class</h5>
  <div class="dropdown">
    <a :class="btnClass"  href="#" role="button" :id="dropdownId" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
      <slot></slot>
    </a>
    <div class="dropdown-menu px-2 py-1" :aria-labelledby="dropdownId">
        <sh-form v-bind="props"/>
    </div>
  </div>
</template>
