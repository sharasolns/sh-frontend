<script setup>
import {ref} from 'vue'
import ShApis from '../repo/helpers/ShApis.js'
import shRepo from '../repo/helpers/ShRepo.js'
const props = defineProps({
  data: Object,
  loadingMessage: {
    type: String,
    default: 'Processing'
  },
  successMessage: {
    type: String,
    default: 'Action Successful'
  },
  failMessage: {
    type: String,
    default: 'Action failed'
  },
  method: {
    type: String,
    default: 'POST'
  },
  url: {
    type: String,
    required: true
  }
})
const processing = ref(false)
const emit = defineEmits(['actionSuccessful','actionFailed','success'])
const actionSuccessful = (res)=>{
  processing.value = false
  res.actionType = 'silentAction'
  console.log(res.data,props.successMessage)
  emit('actionSuccessful',res)
  emit('success',res)
  shRepo.showToast(res.data.message ?? props.successMessage)
}

const actionFailed = reason =>{
  processing.value = false
  console.log(reason)
  shRepo.showToast('Failed')
  reason.actionType = 'silentAction'
  emit('actionFailed', reason)
  shRepo.showToast(reason.message ?? props.failMessage,'error')
}
function runAction(){
  processing.value = true
  if(props.method === 'POST'){
    ShApis.doPost(props.url,props.data).then(res=>{
      actionSuccessful(res)
    }).catch(reason=>{
      actionFailed(reason)
    })
  }
  if(props.method === 'GET'){
    ShApis.doGet(props.url,props.data).then(res=>{
      actionSuccessful(res)
    }).catch(reason=>{
      actionFailed(reason)
    })
  }
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
