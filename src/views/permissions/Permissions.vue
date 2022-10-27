<script setup>
//
const props = defineProps(['record'])
import ShDynamicTabs from '@/lib/components/ShDynamicTabs.vue'
import Details from './tabs/Details.vue'
import Users from './tabs/Users.vue'

</script>
<template>
  <h5>{{ record.name }}</h5>
  <sh-dynamic-tabs
  :tabs="[
      {
        label: 'Details',
        component: Details,
        department: record
      },
      {
        label: 'Users',
        component: Users,
        department: record
      }
  ]"
  />
</template>

<style scoped>

</style>
