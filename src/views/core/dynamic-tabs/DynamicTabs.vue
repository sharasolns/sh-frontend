<script setup>

import  ShDynamicTabs from '@/lib/components/ShDynamicTabs.vue'
import DynamicTabView from '@/views/core/dynamic-tabs/DynamicTabView.vue'
</script>

<template>
<h5>Dynamic Tabs</h5>
  <sh-dynamic-tabs :tabs="[
    {
      key: 'tab1',
      label: 'Tab 1'
    },
    {
      key: 'tab2',
      label: 'Tab 2'
    },
    {
      key: 'tab3',
      label: 'Tab 3'
    }
  ]" :defaultComponent="DynamicTabView"/>
</template>

<style scoped>

</style>