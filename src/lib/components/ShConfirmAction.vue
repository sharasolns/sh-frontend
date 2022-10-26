<script setup>
import {ref} from 'vue'
import ShApis from '../repo/helpers/ShApis.js'
import ShRepo from '../repo/helpers/ShRepo.js'

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
    default: 'Processing'
  }
})
const processing = ref(false)
const emit = defineEmits(['actionSuccessful', 'actionFailed','actionCanceled'])

function runAction () {
  processing.value = true
  ShRepo.runPlainRequest(props.url, props.message, props.title, props.data).then(res => {
    if(res.isConfirmed){
      const value = res.value
      if(value.status){
        emit('actionSuccessful', res)
        processing.value = false
      } else {
        emit('actionFailed', value)
        processing.value = false
      }
    } else {
      emit('actionCanceled')
      processing.value = false
    }
  }).catch(ex => {
    emit('actionFailed', ex)
    processing.value = false
  })
}

function actionSuccessful (res) {

}

function actionFailed (res) {

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
