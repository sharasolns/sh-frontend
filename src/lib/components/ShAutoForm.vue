<script setup>
import { inject, onMounted, ref } from 'vue'
import _ from 'lodash'
import shApis from '../repo/helpers/ShApis.js'
import shRepo from '../repo/helpers/ShRepo.js'
import PhoneInput from './form-components/ShPhone.vue'
import EmailInput from './form-components/EmailInput.vue'
import NumberInput from './form-components/NumberInput.vue'
import TextInput from './form-components/TextInput.vue'
import TextAreaInput from './form-components/TextAreaInput.vue'

const props = defineProps([
    'action','successCallback','retainDataAfterSubmission',
  'successMessage','fields','customComponents','placeHolders',
  'formClasses',
  'helperTexts','labels','data',
  'actionLabel',
    'textAreas',
    'emails',
    'phones','numbers','selects','dates'
])
const emit = defineEmits(['success'])
const formFields = ref([])
const getFieldComponent = (field)=>{
  const defaultTextareas = ['message', 'meta_description', 'comment', 'call_response', 'comments', 'description']
  const defaultSelects = ['gender', 'payment_method', 'allow_view_mode', 'reasons_name', 'has_free_tier', 'payment_period', 'role', 'register_as', 'account_type']
  const defaultNumbers = ['age']
  const defaultDates = ['free_tier_days', 'recurring_date', 'date', 'paid_at']
  const defaultPhones = ['phone']
  const defaultEmails = ['phone']
  const formComponents = inject('formComponents')
  if(props.customComponents && props.customComponents[field]) {
    return props.customComponents[field]
  } else
  if((props.textAreas && props.textAreas.includes(field)) || defaultTextareas.includes(field)){
    return formComponents.textArea ?? TextAreaInput
  } else
  if((props.emails && props.emails.includes(field)) || defaultEmails.includes(field)){
    return formComponents.email ?? EmailInput
  } else
  if((props.phones && props.phones.includes(field)) || defaultPhones.includes(field)){
    return formComponents.phone ?? PhoneInput
  } else
  if((props.numbers && props.numbers.includes(field)) || defaultNumbers.includes(field)){
    return formComponents.number ?? NumberInput
  }
  // else
  // if((props.selects && props.selects.includes(field)) || defaultSelects.includes(field)){
  //   return formComponents.select ?? SelectInput
  // } else
  // if((props.dates && props.dates.includes(field)) || defaultDates.includes(field)){
  //   return formComponents.date ?? DateInput
  // }
  return formComponents.text ?? TextInput
}
const shFormElementClasses = ref(null)
shFormElementClasses.value = inject('shFormElementClasses')
const shAutoForm = ref(null)
const closeModal = e => {
  setTimeout(()=>{
    const closeBtn = shAutoForm.value.closest('.modal-dialog').querySelector('[data-bs-dismiss="modal"]')
    closeBtn && closeBtn.click()
  },1000)
}
const getLabel = field => (props.labels && (props.labels[field] !== undefined)) ? props.labels[field]:_.startCase(_.camelCase(field))
const getComponentClass = field => validationErrors.value[field] ? getElementClass('formControl') + ' is-invalid':getElementClass('formControl')
const getHelperText = field => (props.helperTexts && props.helperTexts[field]) ? props.helperTexts[field]:false
const getElementClass = section => (props.formClasses && props.formClasses[section]) ? props.formClasses[section]:shFormElementClasses.value[section] ?? _.snakeCase(section).replace(/_/gi,'-')
const getPlaceholder = field => (props.placeHolders && props.placeHolders[field]) && props.placeHolders[field]
const removeValidationError = field => delete validationErrors.value[field]
const getComponentProps = field => {
  const newField = {...field}
  delete newField.component
  delete newField.value
  return newField
}
const isFloating = getElementClass('formGroup').includes('form-floating')
const loading = ref(false)
const submitBtn = ref(false)
const validationErrors = ref({})
const formError = ref(null)
const submitForm = e => {
  console.log(formFields.value)
  submitBtnWidth.value = submitBtn.value.getBoundingClientRect().width + 'px !important'
  validationErrors.value = {}
  e.preventDefault()
  loading.value = true
  const data = {}
  formFields.value.map(field=>data[field.field] = field.value)
  shApis.doPost(props.action,data).then(res=>{
    loading.value = false
    emit('formSubmitted',res.data)
    emit('success',res.data)
    props.successMessage && shRepo.showToast(props.successMessage)
    props.successCallback && props.successCallback(res.data)
    !props.retainDataAfterSubmission && formFields.value.map(field=>field.value = null)
    closeModal()
  }).catch(reason=>{
    console.log(reason)
    loading.value = false
    const httpStatus = reason.response ? reason.response.status:0
    formError.value = httpStatus === 422 ? formError.value = null:reason.message ?? null
    let httpErrors = {}
    httpStatus === 422 && typeof reason.response.data.errors === 'object' && (httpErrors = reason.response.data.errors)
    if(httpErrors && reason.response){
      Object.keys(httpErrors).map(key=>validationErrors.value[key] = typeof httpErrors[key] === 'string' ? httpErrors[key]:httpErrors[key][0])
    }
    (httpStatus !== 422 && formError.value) && shRepo.showToast(formError.value,'error')
    validationErrors.value
  })
  return false
}
const submitBtnWidth = ref(null)
onMounted((ev)=>{
  props.fields && props.fields.map(field=>{
    if(typeof field === 'object') {
      const fieldObj = {...field}
      fieldObj.label && getLabel(fieldObj.field)
      !fieldObj.helper && fieldObj.helperText ? fieldObj.helper = fieldObj.helperText : fieldObj.helper = getHelperText(fieldObj.field)
      fieldObj.helperText === undefined && (fieldObj.label = getLabel(fieldObj.field))
      fieldObj.component && getfieldObjComponent(fieldObj.field)
      fieldObj.placeholder && fieldObj.placeHolder && getPlaceholder(fieldObj.field)
      fieldObj.value = null
      formFields.value.push(fieldObj)
    } else {
      formFields.value.push({
        field:field,label: getLabel(field),
        helper: getHelperText(field),
        component: getFieldComponent(field),
        placeholder: getPlaceholder(field),
        value: null
      })
    }
  })
})

</script>
<template>
  <div/>
  <form ref="shAutoForm" class="sh-form" @submit="e => submitForm(e)">
    <div v-for="(field,index) in formFields" :key="field" :class="getElementClass('formGroup')">
      <label v-if="!isFloating && field.label" :class="getElementClass('formLabel')" v-html="field.label"></label>
      <component v-bind="getComponentProps(field)" @click="removeValidationError(field.field)" @update:modelValue="removeValidationError(field.field)" v-model="formFields[index].value" :placeholder="isFloating ? field.label:field.placeholder" :class="getComponentClass(field.field)" :is="getFieldComponent(field.field)"/>
      <label v-if="isFloating && field.label" :class="getElementClass('formLabel')" v-html="field.label"></label>
      <div v-if="field.helper" :class="getElementClass('helperText')" v-html="field.helper"></div>
      <div v-if="validationErrors[field.field]" :class="getElementClass('invalidFeedback')">
        {{  validationErrors[field.field] }}
      </div>
    </div>
    <div :class="getElementClass('formGroup')">
      <button :style="{width: submitBtnWidth}" ref="submitBtn" :disabled="loading" :class="getElementClass('actionBtn')">
        <template v-if="loading">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </template>
        <span v-if="!loading">Submit</span>
      </button>
    </div>
  </form>
</template>