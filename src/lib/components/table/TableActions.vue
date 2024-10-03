<script setup>
import SingleAction from '@/lib/components/table/SingleAction.vue'

const props = defineProps(['actions','record'])

const actionItems = props.actions.actions
const type = props.actions.type // dropdown, button
</script>

<template>
  <template v-if="type.includes('dropdown')">
    <div class="dropdown">
      <strong class="sh-table-dropdown" type="button"  data-bs-toggle="dropdown" aria-expanded="false">
        <i class="bi bi-three-dots" v-if="type === 'dropdown-horizontal'"></i>
        <i class="bi bi-three-dots-vertical" v-else></i>
      </strong>
      <ul class="dropdown-menu">
        <li v-for="act in actionItems" :key="act.label">
          <single-action :class="act.class" :action="act" :record="record"/>
        </li>
      </ul>
    </div>
  </template>
  <template v-else>
    <single-action v-for="act in actionItems" :key="act.label" :action="act" :record="record"/>
  </template>
</template>

<style scoped>

</style>