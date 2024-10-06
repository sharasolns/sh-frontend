<script setup>
import { onMounted, ref } from 'vue'

const props = defineProps(['action','record','actionClass'])

import ShConfirmAction from '../ShConfirmAction.vue'
import ShSilentAction from '../ShSilentAction.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../repo/stores/ShUser'

const doEmitAction = defineEmits(['actionSuccessful','actionFailed','actionCanceled'])

const url = ref(props.action.path || props.action.url || props.action.link)

onMounted(()=>{
  if(!url.value) {
    url.value = ''
  }
  // replace params in url with record key e.g {id} replaced with record.id
  url.value = url.value.replace(/{(\w+)}/g, (match, key) => {
    return props.record[key]
  })

  // replace params e.g :id replaced with record.id
  url.value = url.value.replace(/:(\w+)/g, (match, key) => {
    return props.record[key]
  })
})


const actionClicked = callBack=>{
  if(typeof callBack === 'function'){
    callBack(props.record)
  } else {
    doEmitAction(callBack,props.record)
  }
}

const {user} = storeToRefs(useUserStore())
</script>

<template>
  <template v-if="!action.permission || user.isAllowedTo(action.permission)">
    <template v-if="!action.validator || action.validator(record)">
  <sh-confirm-action
      v-if="['confirmAction','confirmaction','confirm-action','confirm'].includes(action.type)"
      @actionSuccessful="doEmitAction('actionSuccessful',record)"
      @actionFailed="doEmitAction('actionFailed',record)"
      @actionCanceled="doEmitAction('actionCanceled',record)"
      :loading-message="action.label"
      :class="action.class + actionClass" :url="url">
    <span v-if="action.icon" :class="action.icon"></span>
    {{ action.label }}
  </sh-confirm-action>
  <sh-silent-action
      v-else-if="['silentAction','silentaction','silent-action','silent'].includes(action.type)"
      @actionSuccessful="doEmitAction('actionSuccessful',record)"
      @actionFailed="doEmitAction('actionFailed',record)"
      @actionCanceled="doEmitAction('actionCanceled',record)"
      :loading-message="action.label"
      :class="action.class + actionClass" :url="url">
    <span v-if="action.icon" :class="action.icon"></span>
    {{ action.label }}
  </sh-silent-action>
  <a v-else-if="action.canvasId || action.type === 'offcanvas'" :href="'#' + action.canvasId"
     data-bs-toggle="offcanvas" :class="action.class  + actionClass">
    <span v-if="action.icon" :class="action.icon"></span>
    {{ action.label }}
  </a>
  <button :title="action.title" :class="action.class ? action.class:'btn btn-default' + actionClass"
          v-else-if="action.emits"
          @click="actionClicked(action.emits)">
    <span v-if="action.icon" :class="action.icon"></span>
    {{ action.label }}
  </button>
  <router-link v-else-if="!action.emits" :title="action.title"
               :to="url"
               :class="action.class + actionClass">
    <span v-if="action.icon" :class="action.icon"></span>
    {{ action.label }}
  </router-link>
    </template>
  </template>
</template>

<style scoped>

</style>