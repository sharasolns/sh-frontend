<script setup>
import {onMounted,ref,shallowRef} from 'vue'
const props = defineProps(['tabs','data'])
const tabs = props.tabs
let currentTab = shallowRef(null)
const generatedId = ref(null)
const isResponsive = ref(null)
onMounted(()=>{
  generatedId.value =  'tab' + Math.random().toString(36).slice(2)
  if(tabs.length > 0) {
    currentTab.value = tabs[0]
  }
})

function setTab(tab){
  currentTab.value = tab
}
</script>
<template>
  <ul class="nav nav-tabs" role="tablist">
    <li class="nav-item" role="presentation" v-for="tab in tabs">
      <button @click="setTab(tab)" class="nav-link" :class="currentTab === tab ? 'active':''">
        {{ tab.label }}
      </button>
    </li>
  </ul>
  <div class="tab-content">
    <template v-if="currentTab">
      <component v-bind="currentTab" :is="currentTab.component" />
    </template>
  </div>
</template>
<style scoped>
</style>

