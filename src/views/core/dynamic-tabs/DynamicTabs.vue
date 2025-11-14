<script setup>

import  ShDynamicTabs from '@/lib/components/ShDynamicTabs.vue'
import DynamicTabView from '@/views/core/dynamic-tabs/DynamicTabView.vue'
</script>

<template>
<h5>Dynamic Tabs</h5>
  <sh-dynamic-tabs :tabs="[
    {
      key: 'tab1',
      label: 'Tab 1',
      permission: 'commons.real',
      me: 'yes'
    },
    {
      key: 'tab2',
      label: 'Tab 2',
      count: 23
    },
    {
      key: 'tab3',
      label: 'Tab 3'
    }
  ]" :add-tab-query="true" :defaultComponent="DynamicTabView"/>
</template>

<style scoped>

</style>