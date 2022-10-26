<script setup>
import {ref} from 'vue'
import ShApis from '../repo/helpers/ShApis.js'
const props = defineProps({
  data: Object,
  loadingMessage: {
    type: String,
    default: 'Processing'
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
const emit = defineEmits(['actionSuccessful','actionFailed'])

function runAction(){
  processing.value = true
  if(props.method === 'POST'){
    ShApis.doPost(props.url,props.data).then(res=>{
      emit('actionSuccessful',res)
      processing.value = false
    }).catch(reason=>{
      emit('actionFailed', reason)
      processing.value = false
    })
  }
  if(props.method === 'GET'){
    ShApis.doGet(props.url,props.data).then(res=>{
      emit('actionSuccessful',res)
      processing.value = false
    }).catch(reason=>{
      emit('actionFailed', reason)
      processing.value = false
    })
  }
}

function actionSuccessful(res){

}

function actionFailed(res){

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
