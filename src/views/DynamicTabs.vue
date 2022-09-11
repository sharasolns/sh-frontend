<script setup>
import ShDynamicTabs from '../lib/components/ShDynamicTabs.vue'
import TabOne from './tabs/TabOne.vue'
import TabTwo from './tabs/TabTwo.vue'

</script>
<template>
  <H5>DynamicTabs</H5>
  <sh-dynamic-tabs
  :tabs="[
      {
    label: 'Tab One',
    component: TabOne
    },
    {
    label: 'Tab Two',
    component: TabTwo
    }
  ]"
  />
</template>

<style scoped>

</style>
