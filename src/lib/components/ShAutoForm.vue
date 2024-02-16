<script setup>
import { inject, onMounted, ref, watch } from 'vue'
import _ from 'lodash'
import shApis from '../repo/helpers/ShApis.js'
import shRepo from '../repo/helpers/ShRepo.js'
import PhoneInput from './form-components/PhoneInput.vue'
import EmailInput from './form-components/EmailInput.vue'
import NumberInput from './form-components/NumberInput.vue'
import TextInput from './form-components/TextInput.vue'
import TextAreaInput from './form-components/TextAreaInput.vue'
import SelectInput from './form-components/SelectInput.vue'
import PasswordInput from './form-components/PasswordInput.vue'
import ShSuggest from './form-components/ShSuggest.vue'

const props = defineProps([
  'action', 'successCallback', 'retainDataAfterSubmission',
  'successMessage', 'fields', 'customComponents', 'placeHolders',
  'formClasses',
  'helperTexts', 'labels', 'data',
  'fillSelects',
  'formClass',
  'actionLabel',
  'textAreas',
  'currentData',
  'emails',
  'phones', 'numbers', 'selects', 'dates', 'gqlMutation',
    'required'
])
const emit = defineEmits(['success', 'fieldChanged', 'formSubmitted', 'formError'])
const formFields = ref([])
const getFieldComponent = (fieldObj) => {
  if (fieldObj.component) {
    return fieldObj.component
  }
  const field = fieldObj.field ?? fieldObj.name
  const defaultTextareas = ['message', 'meta_description', 'comment', 'call_response', 'comments', 'description']
  const defaultSelects = ['gender', 'payment_method', 'allow_view_mode', 'reasons_name', 'has_free_tier', 'payment_period', 'role', 'register_as', 'account_type']
  const defaultNumbers = ['age']
  const defaultDates = ['free_tier_days', 'recurring_date', 'date', 'paid_at']
  const passwords = ['password', 'password_confirmation', 'pin']
  const defaultPhones = ['phone']
  const defaultEmails = ['email']
  const formComponents = inject('formComponents')
  const TextComponent = formComponents.text ?? TextInput
  const TextAreaComponent = formComponents.textArea ?? TextAreaInput
  const EmailComponent = formComponents.email ?? EmailInput
  const PhoneComponent = formComponents.phone ?? PhoneInput
  const NumberComponent = formComponents.number ?? NumberInput
  const SelectComponent = formComponents.select ?? SelectInput
  const PasswordComponent = formComponents.password ?? PasswordInput
  if (props.customComponents && props.customComponents[field]) {
    return props.customComponents[field]
  }
  if (props.fillSelects && props.fillSelects[field]) {
    Object.assign(fieldObj, props.fillSelects[field])
    if (fieldObj.suggests || fieldObj.suggest) {
      fieldObj.type = 'suggests'
    } else {
      fieldObj.type = 'select'
    }
  }
  if(fieldObj.suggests || fieldObj.suggest){
    fieldObj.type = 'suggests'
  }

  if (fieldObj.type) {
    if (fieldObj.type === 'suggest' || fieldObj.type === 'suggests') {
      return ShSuggest
    }
    return fieldObj.type === 'number' ? NumberComponent : fieldObj.type === 'textarea' ? TextAreaComponent : fieldObj.type === 'email' ? EmailComponent : fieldObj.type === 'phone' ? PhoneComponent : fieldObj.type === 'password' ? PasswordComponent : fieldObj.type === 'select' ? SelectComponent : TextComponent
  } else if (passwords.includes(field)) {
    return PasswordComponent
  } else if ((props.textAreas && props.textAreas.includes(field)) || defaultTextareas.includes(field)) {
    return formComponents.textArea ?? TextAreaInput
  } else if ((props.emails && props.emails.includes(field)) || defaultEmails.includes(field)) {
    return formComponents.email ?? EmailInput
  } else if ((props.phones && props.phones.includes(field)) || defaultPhones.includes(field)) {
    return formComponents.phone ?? PhoneInput
  } else if ((props.numbers && props.numbers.includes(field)) || defaultNumbers.includes(field)) {
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
  setTimeout(() => {
    const modal = shAutoForm.value.closest('.modal-dialog');
    if (modal) {
      const closeBtn = modal.querySelector('[data-bs-dismiss="modal"]')
      closeBtn && closeBtn.click()
    }
  }, 1500)
}
const getLabel = field => (props.labels && (props.labels[field] !== undefined)) ? props.labels[field] : _.startCase(_.camelCase(field))
const getComponentClass = field => validationErrors.value[field] ? getElementClass('formControl') + ' is-invalid' : getElementClass('formControl')
const getHelperText = field => (props.helperTexts && props.helperTexts[field]) ? props.helperTexts[field] : false
const getElementClass = section => (props.formClasses && props.formClasses[section]) ? props.formClasses[section] : shFormElementClasses.value[section] ?? _.snakeCase(section).replace(/_/gi, '-')
const getPlaceholder = field => (props.placeHolders && props.placeHolders[field]) && props.placeHolders[field]
const fieldChanged = field => {
  delete validationErrors.value[field]
  emit('fieldChanged', field, formFields.value.filter(f => f.field === field)[0].value)
}
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
  submitBtnWidth.value = submitBtn.value.getBoundingClientRect().width + 'px !important'
  validationErrors.value = {}
  e.preventDefault()
  loading.value = true
  const data = {}
  formFields.value.map(field => {
    data[field.field] = field.value
  })
  if (props.gqlMutation) {
    let args = `(`
    let selectFields = Object.keys(data)
    selectFields.forEach(key => {
      if (data[key]) {
        args += `${key}: "${data[key]}",`
      }
    })
    args += `)`
    args = args.replace(',)', ')')
    if (args == '()') {
      args = ''
    }
    const mutation = `{\n${props.gqlMutation} ${args} {\n${selectFields.join(`\n`)}\n}\n}`
    shApis.graphQlMutate(mutation).then(res => handleSuccessRequest(res)).catch(reason => handlefailedRequest(reason))
  } else {
    shApis.doPost(props.action, data).then(res => handleSuccessRequest(res)).catch(reason => handlefailedRequest(reason))
  }
  return false
}

const handleSuccessRequest = res => {
  loading.value = false
  emit('formSubmitted', res.data)
  emit('success', res.data)
  props.successMessage && shRepo.showToast(props.successMessage)
  props.successCallback && props.successCallback(res.data)
  !props.retainDataAfterSubmission && formFields.value.map(field => field.value = null)
  closeModal()
}

const handlefailedRequest = reason => {
  loading.value = false
  const httpStatus = reason.response ? reason.response.status : 0
  formError.value = httpStatus === 422 ? formError.value = null : reason.message ?? null
  let httpErrors = {}
  httpStatus === 422 && typeof reason.response.data.errors === 'object' && (httpErrors = reason.response.data.errors)
  if (httpErrors && reason.response) {
    Object.keys(httpErrors).map(key => validationErrors.value[key] = typeof httpErrors[key] === 'string' ? httpErrors[key] : httpErrors[key][0])
  }
  (httpStatus !== 422 && formError.value) && shRepo.showToast(formError.value, 'error')
  validationErrors.value
}
const submitBtnWidth = ref(null)
const setExistingData = (existingData) => {
  console.log(existingData,props)
  if (existingData) {
    const newFields = formFields.value.map(fl => {
      if (existingData[fl.field]) {
        fl.value = existingData[fl.field]
      }
      return fl
      // console.log(fl)
      // console.log(field, existingData)
      // existingData[field.field] && (field.value = existingData[field.field])
    })
    formFields.value = null
    formFields.value = newFields
  }
}
watch(() => props.currentData, (newData) => {
  setExistingData(newData)
})
onMounted((ev) => {
  console.log(props)
  props.fields && props.fields.map(field => {
    let fieldObj = {}
    if (typeof field === 'object') {
      fieldObj = {...field}
      fieldObj.field = fieldObj.field ?? fieldObj.name
      // fieldObj.label && getLabel(fieldObj.field)
      fieldObj.helper = fieldObj.helperText ?? fieldObj.helper
      // !fieldObj.helper && fieldObj.helperText ? fieldObj.helper = fieldObj.helperText : fieldObj.helper = getHelperText(fieldObj.field)
      // fieldObj.helperText === undefined && ()
      fieldObj.label = fieldObj.label ?? getLabel(fieldObj.field ?? fieldObj.name)
      // fieldObj.placeholder && fieldObj.placeHolder && getPlaceholder(fieldObj.field)
      fieldObj.value = null
    } else {
      fieldObj = {
        field: field, label: getLabel(field),
        helper: getHelperText(field),
        placeholder: getPlaceholder(field),
        value: null
      }

      if(props.fillSelects && props.fillSelects[fieldObj.field]){
        Object.assign(fieldObj, props.fillSelects[fieldObj.field])
      }
    }
    if(props.required && props.required.includes(fieldObj.field)){
      fieldObj.required = true
    }
    formFields.value.push(fieldObj)
    formFields.value.push({
      field: 'id',
      type: 'hidden'
      // label: 'IF'
    })
  })
  setExistingData(props.currentData)
})

</script>
<template>
  <div/>
  <form :class="formClass" ref="shAutoForm" class="sh-auto-form" @submit="e => submitForm(e)">
    <div v-for="(field,index) in formFields" :key="field" :class="getElementClass('formGroup')">
      <template v-if="field.type === 'hidden'">
        <input type="hidden" v-model="formFields[index].value">
      </template>
      <template v-else>
        <label v-if="!isFloating && field.label" :class="getElementClass('formLabel')">
          <span v-html="field.label" class="sh-label"></span>
          <span v-if="field.required" class="text-danger sh-required">*</span>
        </label>
        <component v-bind="getComponentProps(field)" :isInvalid="typeof validationErrors[field.field] !== 'undefined'"
                   @click="fieldChanged(field.field)" @update:modelValue="fieldChanged(field.field)"
                   v-model="formFields[index].value" :class="getComponentClass(field.field)"
                   :is="getFieldComponent(field)"/>
        <label v-if="isFloating && field.label" :class="getElementClass('formLabel')" v-html="field.label"></label>
        <div class="form-notch" v-if="isFloating">
          <div class="form-notch-leading"></div>
          <div class="form-notch-middle"></div>
          <div class="form-notch-trailing"></div>
        </div>
        <div v-if="field.helper" :class="getElementClass('helperText')" v-html="field.helper"></div>
        <div v-if="validationErrors[field.field]" :class="getElementClass('invalidFeedback')">
          {{ validationErrors[field.field] }}
        </div>
      </template>
    </div>
    <div :class="getElementClass('formGroup')">
      <button :style="{width: submitBtnWidth}" ref="submitBtn" :disabled="loading"
              :class="getElementClass('actionBtn')">
        <template v-if="loading">
          <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        </template>
        <span v-if="!loading">Submit</span>
      </button>
    </div>
    <slot/>
  </form>
</template>
