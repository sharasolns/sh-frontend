<script setup>

import ShTabs from '@/lib/components/ShTabs.vue'
</script>

<template>
  <sh-tabs
      :tabs="['tasks','tab']"
      :baseUrl="`/tasks`"
      :tab-counts="{
        tasks: 2,
        tab: 3
      }"
      :active-tab="`tab`"

  /></template>

<style scoped>

</style>
