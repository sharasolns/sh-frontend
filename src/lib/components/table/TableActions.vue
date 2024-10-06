<script setup>
import SingleAction from './SingleAction.vue'

const props = defineProps(['actions','record','emitAction'])

const actionItems = props.actions.actions
const type = props.actions.type // dropdown, button
const icon = props.actions.icon
</script>

<template>
  <template v-if="type && type.includes('dropdown')">
    <div class="dropdown sh-table-dropdown">
      <strong class="sh-table-dropdown-btn" type="button"  data-bs-toggle="dropdown" aria-expanded="false">
        <span v-if="icon" :class="icon"></span>
        <i class="bi bi-three-dots" v-else-if="type === 'dropdown-horizontal'"></i>
        <i class="bi bi-three-dots-vertical" v-else></i>
      </strong>
      <ul class="dropdown-menu">
        <li v-for="act in actionItems" :key="act.label">
          <single-action action-class=" dropdown-item" :emit-action="emitAction" :class="act.class" :action="act" :record="record"/>
        </li>
      </ul>
    </div>
  </template>
  <template v-else>
    <single-action v-for="act in actionItems" :key="act.label" :emit-action="emitAction" :action="act" :record="record"/>
  </template>
</template>

<style scoped>

</style>