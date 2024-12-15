<script setup>
import {ref} from 'vue'
import ShApis from '../repo/helpers/ShApis.js'
import ShRepo from '../repo/helpers/ShRepo.js'
import shRepo from '../repo/helpers/ShRepo.js'

const props = defineProps({
  data: Object,
  title: String,
  message: String,
  url: {
    type: String,
    required: true
  },
  loadingMessage: {
    type: String,
    default: 'Processing...'
  },
  successMessage: {
    type: String,
    default: 'Action Successful'
  },
  failMessage: {
    type: String,
    default: 'Action failed'
  }
})

const processing = ref(false)
const emit = defineEmits(['actionSuccessful', 'actionFailed','success','failed','canceled','actionCanceled'])
const actionSuccessful = (res)=>{
  processing.value = false
  res.actionType = 'silentAction'
  emit('actionSuccessful',res)
  emit('success',res)
  if(props.successMessage || res.message){
    shRepo.showToast(res.message ?? props.successMessage)
  }
}

const actionFailed = reason =>{
  processing.value = false
  reason.actionType = 'silentAction'
  emit('actionFailed', reason)
  emit('failed', reason)
  if (props.failMessage || reason.value?.message) {
    shRepo.showToast(reason.value.message ?? props.failMessage,'error')
  }
}
function runAction () {
  processing.value = true
  ShRepo.runPlainRequest(props.url, props.message, props.title, props.data).then(res => {
    if(res.isConfirmed){
      const value = res.value
      if(value.success){
        actionSuccessful(res.value.response)
      } else {
        actionFailed(res)
      }
    } else {
      emit('actionCanceled')
      emit('canceled')
      processing.value = false
    }
  }).catch(ex => {
    actionFailed(ex)
  })
}
</script>
<template>
  <a :class="processing ? 'disabled':''" @click="runAction">
    <template v-if="processing">
      <span class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
      <span>{{ loadingMessage }}</span>
    </template>
    <slot v-if="!processing"/>
  </a>
</template>
