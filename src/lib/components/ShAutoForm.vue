<script setup>
import { inject, onMounted, ref } from 'vue'
import _ from 'lodash'
import shApis from '../repo/helpers/ShApis.js'

const props = defineProps(['action','fields','customComponents','placeHolders','formClasses','helperTexts','labels','data', 'actionLabel'])

const formFields = ref([])
const getFieldComponent = (field)=>{
  if(props.customComponents && props.customComponents[field]) {
    return props.customComponents[field]
  }
  return inject('formTextInput')
}
const shFormElementClasses = ref(null)
shFormElementClasses.value = inject('shFormElementClasses')
const getLabel = field => (props.labels && (props.labels[field] !== undefined)) ? props.labels[field]:_.startCase(_.camelCase(field))
const getComponentClass = field=>getElementClass('formControl')
const getHelperText = field => (props.helperTexts && props.helperTexts[field]) ? props.helperTexts[field]:false
const getElementClass = section => (props.formClasses && props.formClasses[section]) ? props.formClasses[section]:shFormElementClasses.value[section] ?? _.snakeCase(section).replace(/_/gi,'-')
const getPlaceholder = field => (props.placeHolders && props.placeHolders[field]) ? props.placeHolders[field]:''
const isFloating = getElementClass('formGroup').includes('form-floating')
const loading = ref(false)
const submitBtn = ref(false)
const submitForm = e => {
  e.preventDefault()
  loading.value = true
  console.log(submitBtnWidth.value)
  const data = {}
  formFields.value.map(field=>data[field.field] = field.value)
  shApis.doPost(props.action,data).then(res=>{
    loading.value = false
  }).catch((reason,responseData)=>{
    // loading.value = false
  })
  console.log(data)
  return false
}
const submitBtnWidth = ref(null)
onMounted(()=>{
  console.log(submitBtn.value)
  submitBtnWidth.value = submitBtn.value.getBoundingClientRect().width + 'px !important'
  props.fields && props.fields.map(field=>{
    if(typeof field === 'object') {
      formFields.value.push({
        field:field.field,
        label: field.label !== undefined ? field.label:getLabel(field.field),
        helper: field.helperText ?? field.helper ?? getHelperText(field.field),
        component: field.component ?? getFieldComponent(field.field),
        placeholder: (field.placeHolder ?? field.placeholder) ?? getPlaceholder(field.field),
        value: null
      })
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
  <form class="sh-form" @submit="e => submitForm(e)">
    <div v-for="(field,index) in formFields" :key="field" :class="getElementClass('formGroup')">
      <label v-if="!isFloating && field.label" :class="getElementClass('formLabel')" v-html="field.label"></label>
      <component v-model="formFields[index].value" :placeholder="isFloating ? field.label:field.placeholder" :class="getComponentClass(field.field)" :is="getFieldComponent(field.field)"/>
      <label v-if="isFloating && field.label" :class="getElementClass('formLabel')" v-html="field.label"></label>
      <div v-if="field.helper" :class="getElementClass('helperText')" v-html="field.helper"></div>
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