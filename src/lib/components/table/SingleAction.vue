<script setup>
import { onMounted, ref } from 'vue'
import ShConfirmAction from '../ShConfirmAction.vue'
import ShSilentAction from '../ShSilentAction.vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '../../repo/stores/ShUser'

const props = defineProps(['action','record','actionClass','emitAction', 'type'])




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




const doEmitAction = (callBack,item)=>{
  if(typeof callBack === 'function'){
    callBack(props.record)
  } else {
    props.emitAction(callBack,item)
  }
}

const actionSuccessful = (res)=>{
  doEmitAction('actionSuccessful',res,props.record)
}

const actionFailed = (res)=>{
  doEmitAction('actionFailed',res,props.record)
}
const {user} = storeToRefs(useUserStore())
</script>

<template>
  <template v-if="!action.permission || user.isAllowedTo(action.permission)">
    <template v-if="!action.validator || action.validator(record)">
  <sh-confirm-action
      v-if="['confirmAction','confirmaction','confirm-action','confirm'].includes(action.type)"
      @actionSuccessful="actionSuccessful"
      @actionFailed="actionFailed"
      @actionCanceled="doEmitAction('actionCanceled',record)"
      :loading-message="action.label"
      :class="action.class + actionClass" :url="url">
    <span v-if="action.icon" :class="action.icon"></span>
    {{ action.label }}
  </sh-confirm-action>
  <sh-silent-action
      v-else-if="['silentAction','silentaction','silent-action','silent'].includes(action.type)"
      @actionSuccessful="actionSuccessful"
      @actionFailed="actionFailed"
      @actionCanceled="doEmitAction('actionCanceled',record)"
      :loading-message="action.label"
      :class="action.class +' '+ actionClass" :url="url">
    <span v-if="action.icon" :class="action.icon"></span>
    {{ action.label }}
  </sh-silent-action>
  <a v-else-if="action.canvasId || action.type === 'offcanvas'" :href="'#' + action.canvasId"
     data-bs-toggle="offcanvas" :class="action.class + ' '  + actionClass">
    <span v-if="action.icon" :class="action.icon"></span>
    {{ action.label }}
  </a>
  <span :title="action.title"
        :class="[
            action.class,
            {
              'sh-dropdown-action dropdown-item': type && type.includes('dropdown'),
            },
            actionClass
        ]"
          v-else-if="action.emits"
          @click="doEmitAction(action.emits, record)">
    <span v-if="action.icon" :class="action.icon"></span>
    {{ action.label }}
  </span>
  <router-link v-else-if="!action.emits" :title="action.title"
               :to="url"
               :class="action.class +' '+ actionClass">
    <span v-if="action.icon" :class="action.icon"></span>
    {{ action.label }}

  </router-link>
    </template>
  </template>
</template>

<style >
.sh-dropdown-action{
  cursor: pointer;

}

</style>